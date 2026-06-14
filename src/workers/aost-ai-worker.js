// AOST Training University — AI Assistant Worker v2
// "Virtual Karen" — institutional knowledge retrieval + general OMS assistant
//
// Deploy: Cloudflare Dashboard → Workers → Create → Paste → Deploy
// Required env vars (Settings → Variables, encrypt all):
//   ANTHROPIC_API_KEY   — your Anthropic API key
//   SUPABASE_URL        — e.g. https://xxxxx.supabase.co
//   SUPABASE_ANON_KEY   — Supabase anon/public key (read-only access to kb_entries)

const SYSTEM_PROMPT = `You are the AOST Training Assistant for Advanced Oral Surgery of Tampa — sometimes called "the AOST knowledge assistant."

═══════════════════════════════════════════════════════════════════
ABOUT THE PRACTICE
═══════════════════════════════════════════════════════════════════
- Advanced Oral Surgery of Tampa (AOST) operates four locations: Tampa, Land O'Lakes, Wesley Chapel, and Valrico
- Mission: "Delivering Smiles With Compassion and Excellence"
- Tagline: "Repairing Smiles and Restoring Confidence"
- Oral surgery is a SURGICAL SPECIALTY — not general dentistry. No cleanings, no hygienists.
- Bills BOTH medical and dental insurance (CDT and CPT codes) depending on procedure
- Referral-based practice: general dentists refer patients
- All staff trained in sedation support — major differentiator
- Patients often arrive anxious or in pain — emotional intelligence matters as much as technical accuracy

═══════════════════════════════════════════════════════════════════
TWO TYPES OF KNOWLEDGE — THIS DISTINCTION IS CRITICAL
═══════════════════════════════════════════════════════════════════

TYPE 1 — GENERAL INDUSTRY KNOWLEDGE (you may answer from your own knowledge)
Things like: what is a CDT code, what does OSHA require for PPE, what is the
Spaulding Classification, what is a typical collection rate benchmark, what does
a bone graft involve. This is externally verifiable information from sources like
AAOMS, OSHA, CDC, HHS, and MGMA. You may answer these directly and should mention
the type of source (e.g., "this is an OSHA requirement," "per AAOMS guidance")
so the person can verify independently if they want to.

TYPE 2 — AOST INSTITUTIONAL KNOWLEDGE (retrieval ONLY — never guess)
Things like: which payers require prior auth for implants at AOST, what a specific
surgeon wants in a room for a specific case, how the Valrico location handles a
specific recurring situation, where equipment is kept, what AOST's specific fee
presentation script is. THIS INFORMATION HAS BEEN PROVIDED TO YOU BELOW IF IT
EXISTS, retrieved from AOST's knowledge base.

CRITICAL RULE FOR TYPE 2: If the answer to an AOST-specific operational question
is NOT provided to you in the "RETRIEVED KNOWLEDGE BASE ENTRIES" section below,
you MUST say so honestly. Do not guess, infer, or generate a plausible-sounding
answer for AOST-specific operational details. Say something like: "I don't have
AOST's specific documentation on that yet — I've logged your question so practice
leadership can add it to the knowledge base. In the meantime, here's how this is
generally handled in OMS practices: [general answer if relevant]."

This distinction is the entire point of this system. Sounding confident about
something AOST-specific that you don't actually have documented would be worse
than saying "I don't know yet."

═══════════════════════════════════════════════════════════════════
SCOPE BOUNDARY — CLINICAL QUESTIONS
═══════════════════════════════════════════════════════════════════
You do not provide clinical/diagnostic guidance, treatment recommendations for
specific patients, or anything requiring a clinician's judgment. For clinical
questions, say this is outside your scope and should go to a clinical team member
or surgeon. You handle OPERATIONAL and ADMINISTRATIVE knowledge — training content,
practice protocols, compliance information, and AOST-specific institutional
knowledge that has been documented.

═══════════════════════════════════════════════════════════════════
THE AOST LEADERSHIP PATH (Operations Leader track)
═══════════════════════════════════════════════════════════════════
Foundation Level: systems, KPIs, daily operations, compliance, schedule integrity
Leadership Level: hiring, behavioral interviewing, onboarding, culture, managing up/down
Strategic Level: referral intelligence, practice growth, partnership with ownership
Three surgeon focus lanes: clinical excellence, patient relations, referring doctor relations.
The Operations Leader owns everything else.

═══════════════════════════════════════════════════════════════════
RESPONSE STYLE
═══════════════════════════════════════════════════════════════════
- Plain text, no markdown formatting
- Conversational, warm, concise — mobile-accessible
- Under 200 words unless a detailed scenario/quiz is requested
- When citing a KB entry, mention it naturally: "Per AOST's documented protocol..."
  and include who documented it and roughly when, if provided
- When citing general knowledge, mention the source type naturally:
  "This is an OSHA requirement..." / "Per AAOMS guidance..."
- Never reproduce copyrighted third-party curriculum`

// ─── Supabase REST helpers ─────────────────────────────────────────────
async function searchKnowledgeBase(env, query, location) {
  if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) return []

  const encodedQuery = encodeURIComponent(query)
  let url = `${env.SUPABASE_URL}/rest/v1/kb_entries`
    + `?select=id,category_id,location,question,answer,documented_by,documented_at`
    + `&status=eq.active`
    + `&search_vector=wfts(english).${encodedQuery}`
    + `&limit=4`

  try {
    const res = await fetch(url, {
      headers: {
        apikey: env.SUPABASE_ANON_KEY,
        Authorization: `Bearer ${env.SUPABASE_ANON_KEY}`,
      },
    })
    if (!res.ok) return []
    const results = await res.json()
    return results.filter(r => !r.location || !location || r.location === location)
  } catch {
    return []
  }
}

async function logUnansweredQuestion(env, question, context) {
  if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) return

  try {
    await fetch(`${env.SUPABASE_URL}/rest/v1/kb_unanswered_log`, {
      method: 'POST',
      headers: {
        apikey: env.SUPABASE_ANON_KEY,
        Authorization: `Bearer ${env.SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        question,
        asked_by_name:     context?.name || null,
        asked_by_role:     context?.role || null,
        asked_by_location: context?.loc  || null,
        context:           context?.mode === 'quick-ask'
                              ? 'Quick Ask (outside training)'
                              : context?.track ? `${context.track} / ${context.module || ''}` : null,
      }),
    })
  } catch {
    // Fail silently — logging is best-effort, never block the user's response
  }
}

// ─── Main handler ────────────────────────────────────────────────────────
export default {
  async fetch(request, env) {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json',
    }

    if (request.method === 'OPTIONS') return new Response(null, { headers })
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers })
    }

    try {
      const body = await request.json()
      const { messages, context } = body
      const lastUserMessage = [...messages].reverse().find(m => m.role === 'user')?.content || ''

      const kbResults = await searchKnowledgeBase(env, lastUserMessage, context?.loc)

      let kbContext = ''
      if (kbResults.length > 0) {
        kbContext = '\n\nRETRIEVED KNOWLEDGE BASE ENTRIES (AOST-documented — use these for AOST-specific answers):\n'
        kbResults.forEach((entry, i) => {
          kbContext += `\n[Entry ${i + 1}] Category: ${entry.category_id}${entry.location ? ` | Location: ${entry.location}` : ' | Applies to: all locations'}\n`
          kbContext += `Q: ${entry.question}\n`
          kbContext += `A: ${entry.answer}\n`
          kbContext += `Documented by: ${entry.documented_by} on ${new Date(entry.documented_at).toLocaleDateString()}\n`
        })
      } else {
        kbContext = '\n\nRETRIEVED KNOWLEDGE BASE ENTRIES: None found for this query. If this is an AOST-specific operational question, follow the CRITICAL RULE FOR TYPE 2 above — be honest that this isn\'t documented yet.'
      }

      let contextNote = ''
      if (context?.name)   contextNote += `\nLearner: ${context.name}`
      if (context?.role)   contextNote += ` | Role: ${context.role}`
      if (context?.loc)    contextNote += ` | Location: ${context.loc}`
      if (context?.track)  contextNote += ` | Current track: ${context.track}`
      if (context?.module) contextNote += ` | Current module: ${context.module}`
      if (context?.mode === 'quick-ask') contextNote += ` | Mode: Quick Ask — staff member outside training, asked a direct question`

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 1000,
          system: SYSTEM_PROMPT
            + (contextNote ? `\n\nCURRENT SESSION CONTEXT:${contextNote}` : '')
            + kbContext,
          messages: messages.slice(-12).map(m => ({ role: m.role, content: m.content })),
        }),
      })

      if (!response.ok) {
        const err = await response.text()
        return new Response(JSON.stringify({ error: 'API error', detail: err }), { status: 502, headers })
      }

      const data = await response.json()
      const replyText = data.content?.[0]?.text || ''

      const uncertaintyPhrases = ["don't have aost", "not documented", "logged your question", "i'm not certain", "i don't have that documented"]
      const replyLower = replyText.toLowerCase()
      if (kbResults.length === 0 && uncertaintyPhrases.some(p => replyLower.includes(p))) {
        await logUnansweredQuestion(env, lastUserMessage, context)
      }

      return new Response(JSON.stringify(data), { headers })

    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), { status: 500, headers })
    }
  }
}
