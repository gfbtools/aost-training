// AOST Training University — Complete Curriculum
// All content is original and written for AOST specifically.
// OMS is a surgical specialty, not a dental practice.

const B  = (text) => ({ type: 'body', text })
const H  = (text) => ({ type: 'heading', text })
const C  = (label, text) => ({ type: 'callout', label, text })
const CG = (label, text) => ({ type: 'callout-gold', label, text })
const CB = (label, text) => ({ type: 'callout-blue', label, text })
const L  = (...items) => ({ type: 'list', items })
const M  = (text) => ({ type: 'mission', text })
const PL = (...procedures) => ({ type: 'procedure-list', procedures })
const VS = (left, right) => ({ type: 'comparison', left, right })
const VB = (...values) => ({ type: 'value-block', values })
const ST = (...items) => ({ type: 'standards', items })
const PH = (label, text) => ({ type: 'placeholder', label, text })

const LV = (...levels) => ({ type: 'levels', levels })

export const TRACKS = {

// ════════════════════════════════════════════════════════════════════
//  UNIVERSAL — Required by all team members before any role track
// ════════════════════════════════════════════════════════════════════
universal: {
  id: 'universal',
  title: 'Core Onboarding',
  subtitle: 'Required for all AOST team members',
  color: '#0E7C7B',
  locked: false,
  modules: [

    // ── MODULE U1 ──────────────────────────────────────────────────
    {
      id: 'u1', title: 'Welcome to Advanced Oral Surgery of Tampa', scope: 'aost',
      duration: '15 min', hasQuiz: true,
      lessons: [
        {
          id: 'u1-l1', title: 'Our Practice, Our People',
          content: [
            H('Welcome to AOST'),
            B('Advanced Oral Surgery of Tampa serves the greater Tampa Bay area across four state-of-the-art surgical locations. The practice was built from the ground up by Dr. Jason Edwards and Karen Edwards — both trained oral surgeons — who have spent more than a decade creating something that didn\'t exist in this market: a multi-location oral surgery group that operates as one team, with one standard, across every location.'),
            M('"Delivering Smiles With Compassion and Excellence"'),
            B('That mission is not aspirational language. It is the operational standard every decision at this practice is measured against. How quickly we answer the phone, how we prepare a surgical suite, how we greet a patient who hasn\'t slept in three days — all of it flows from that mission.'),
            H('Our Surgeons'),
            L(
              'Dr. Jason Edwards, DMD — Board-Certified OMS. Practicing since 2008, serving Tampa since 2011. AAOMS member. Performs surgical missions to Mexico helping underprivileged children.',
              'Dr. Thomas Backeris, DMD — Board-Certified Diplomate, ABOMS. Biomedical engineering, Duke University. Dental school, University of Pittsburgh. Residency, Loyola University Medical Center. Maintains hospital privileges for maxillofacial trauma.',
              'Dr. Jason Blundell, DDS — Board-Certified OMS. Active-duty Naval Officer 2008–2018. Residency at Naval Medical Center Portsmouth. Served at Camp Lejeune and USS Harry S. Truman.',
              'Dr. Pat Gaus, DMD — Board-Certified OMS. US Air Force 2012–2023. Specializes in orthognathic surgery, full arch reconstruction, and pediatric sedation.',
            ),
            C('Our Four Locations', 'Tampa: 2401 S Dale Mabry Hwy · (813) 254-4568\nLand O\'Lakes: 2100 Livingston Rd · (813) 528-8999\nWesley Chapel: 27446 Cashford Cir Ste #101 · (813) 625-6755\nValrico: 2922 Lithia Pinecrest Rd · (813) 452-6380'),
          ],
        },
        {
          id: 'u1-l2', title: 'Our Values and What They Actually Mean',
          content: [
            H('Three Values. Every Role. Every Day.'),
            B('At AOST, values are not a poster on a wall. They are the operational definition of excellence. Every team member — at every location, in every role — is evaluated against these three standards.'),
            VB(
              { title: 'Compassion', body: 'Our patients arrive anxious, in pain, or both. Many have avoided this procedure for months or years. The way our team receives them — with genuine warmth, patience, and calm — is what transforms that anxiety into trust. Compassion is not a soft skill here. It is a clinical outcome driver. When patients trust us, they follow post-op instructions. When they trust us, they refer their families. When they trust us, they leave five-star reviews that sustain the practice.' },
              { title: 'Excellence', body: 'We use the latest technology available in oral surgery — 3D Cone Beam imaging, Virtual Surgical Planning, intraoral scanners, Digital Smile Design. We maintain state-of-the-art surgical suites at all four locations. Our surgeons are all board-certified. Excellence is not a bar we occasionally clear — it is the floor. Every team member brings that standard to their role, whether they are behind the front desk, in the surgical suite, or running a location.' },
              { title: 'Team First', body: 'Four locations run as one practice. What happens at the Valrico location affects how a referring dentist in Tampa perceives us. We cover for each other. We communicate. We do not manage in silos or develop location-specific cultures that dilute the AOST standard. When one location is struggling, the team notices and responds. That is what Team First means in a multi-location organization.' },
            ),
          ],
        },
      ],
    },

    // ── MODULE U2 ──────────────────────────────────────────────────
    {
      id: 'u2', title: 'Oral Surgery — What We Are and What We Are Not', scope: 'aost',
      duration: '20 min', hasQuiz: true,
      lessons: [
        {
          id: 'u2-l1', title: 'Understanding the Specialty',
          content: [
            H('We Are Not a Dental Office'),
            B('This distinction matters in every interaction you have — with patients, with referring offices, with staff from other healthcare organizations. Oral and Maxillofacial Surgery (OMS) is a recognized medical surgical specialty. Our surgeons completed dental school plus a 4–6 year hospital-based surgical residency that included medical school rotations, general surgery, anesthesiology, and emergency medicine. The scope of what we do has no meaningful overlap with what happens in a general dental practice.'),
            VS(
              { title: 'General Dentistry', color: '#5A6A7A', items: [
                'Routine cleanings and checkups',
                'Fillings, crowns, and restorations',
                'Hygienists perform most preventive work',
                'Patients come on regular preventive schedules',
                'Dental insurance only',
                'Direct-to-patient marketing',
                'Same predictable visit types daily',
              ]},
              { title: 'Oral & Maxillofacial Surgery — AOST', color: '#0E7C7B', items: [
                'Surgical procedures only — no cleanings, no hygienists',
                'Wisdom tooth extractions, including complex impacted cases',
                'Dental implants — including same-day placement',
                'Bone grafting and sinus lifts',
                'Jaw surgery and facial trauma care',
                'Pathology, biopsy, and lesion removal',
                'IV sedation and general anesthesia for all procedures',
                'Bills BOTH medical AND dental insurance',
                'Referral-based — patients sent by their dentist',
              ]},
            ),
            C('Why This Distinction Matters for Your Role', 'Because we are a surgical practice, every process you are part of has higher operational consequence than in a general dental office. A scheduling error does not just inconvenience a patient — it affects a surgeon\'s operative day and cascades through the entire schedule. An insurance verification oversight is not a billing nuisance — it is a financial surprise for a patient who is already stressed about surgery. Everything here runs at surgical stakes.'),
          ],
        },
        {
          id: 'u2-l2', title: 'What We Do — Our Procedures',
          content: [
            H('Understanding What Happens Here'),
            B('You do not need to perform these procedures. You do need to understand what each one is, why a patient needs it, and what their experience will be — so you can speak to patients intelligently, empathetically, and accurately.'),
            PL(
              { name: 'Wisdom Tooth Removal', detail: 'Our highest volume procedure. Many wisdom teeth are impacted — trapped beneath gumline or bone — which makes removal more complex than a standard extraction. Difficulty ranges from straightforward to surgically demanding depending on root formation, depth, and proximity to nerves. IV sedation is standard. Our approach prioritizes patient comfort from arrival through recovery.' },
              { name: 'Dental Implants & Same-Day Implants', detail: 'Titanium posts placed into the jawbone to replace missing tooth roots. AOST\'s state-of-the-art technology enables same-day implant placement for qualifying patients — meaning a patient can arrive with missing teeth and leave with a temporary restoration in a single appointment. This is one of our most significant clinical differentiators.' },
              { name: 'Bone Grafting & Sinus Lifts', detail: 'When a patient lacks sufficient bone to support an implant — due to tooth loss, gum disease, or anatomy — bone grafting rebuilds the foundation before implant placement. Sinus lifts are a specific bone grafting technique for the upper jaw. These procedures demonstrate why OMS is a surgical specialty: they require the precision and training of a surgical team.' },
              { name: 'Sedation & Anesthesia', detail: 'Every AOST team member is trained in sedation support. We offer nitrous oxide, IV sedation, and general anesthesia. Our sedation capability is what allows patients who are genuinely fearful of dental care to access the surgical treatment they need in comfort and safety. This differentiates us from most dental practices and general oral surgeons.' },
              { name: 'Orthognathic Surgery (Jaw Surgery)', detail: 'Surgical correction of jaw alignment — the upper jaw, lower jaw, or both. Often coordinated with orthodontic treatment. These are among our most transformative cases, producing dramatic improvements in bite function, breathing, and facial appearance. Dr. Gaus specializes in this area.' },
              { name: 'Pathology, Biopsy & Lesion Removal', detail: 'Surgical evaluation and removal of abnormal tissue in the mouth, jaw, and face. These cases carry particular urgency and require careful coordination with pathology labs. Early detection through our biopsy services has real clinical consequences for our patients\' long-term health.' },
              { name: 'Full Arch Rehabilitation', detail: 'Comprehensive reconstruction of an entire arch using implants and fixed prosthetics. Also known as "All-on-4" or "New Teeth in One Day." Among our most life-changing services — patients who have struggled with failing or missing teeth experience transformational functional and aesthetic outcomes.' },
            ),
          ],
        },
      ],
    },

    // ── MODULE U3 ──────────────────────────────────────────────────
    {
      id: 'u3', title: 'Our Patients — Who They Are and How We Treat Them', scope: 'aost',
      duration: '15 min', hasQuiz: true,
      lessons: [
        {
          id: 'u3-l1', title: 'The Patient Who Walks Through Our Door',
          content: [
            H('Our Patients Are Not Routine'),
            B('Unlike a general dental practice where patients come in on predictable schedules for preventive care, our patients arrive because something is wrong. They\'ve been referred because their dentist identified a case beyond their scope. They\'re in pain. They\'re pre-surgical. They may have been avoiding this visit for months or years because of fear, cost, or both.'),
            L(
              'Teenagers and young adults needing wisdom tooth removal — often their first surgery, often genuinely frightened',
              'Adults referred for extractions too complex for their dentist — already stressed by the referral',
              'Patients who have lost teeth and feel self-conscious — emotionally invested in the outcome',
              'Patients who delayed care for years out of dental fear — fragile trust that must be earned',
              'Pediatric patients requiring sedation — and nervous parents watching every interaction your team has',
              'Trauma patients in acute pain — urgent, overwhelmed, sometimes coming directly from an ER',
            ),
            H('The AOST Standard for Patient Care'),
            B('We welcome every patient with the same care and respect we\'d give our own family. This is stated on our website, but more importantly, it is reflected in our 1,000+ five-star Google reviews. Those reviews are a direct measure of how well our team delivers on that promise, every day.'),
            ST(
              { title: 'Acknowledge within 30 seconds', body: 'Every patient is recognized upon arrival. By name when possible. Not when the paperwork is complete. Not when their assistant is ready. Immediately.' },
              { title: 'Explain before you act', body: 'Tell patients what is happening before it happens. Uncertainty is the engine of anxiety. Clarity is how we eliminate it.' },
              { title: 'Meet fear with calm', body: 'When a patient is visibly anxious, your response sets the emotional tone. Calm, warm, unhurried. The speed of your speech and the steadiness of your demeanor directly regulate the patient\'s nervous system.' },
              { title: 'Service recovery is immediate', body: 'When a patient is unhappy — with a wait, an experience, anything — it is addressed immediately. Not "let me have someone get back to you." Now.' },
            ),
          ],
        },
      ],
    },

    // ── MODULE U4 ──────────────────────────────────────────────────
    {
      id: 'u4', title: 'HIPAA & Patient Privacy', scope: 'aost',
      duration: '25 min', hasQuiz: true,
      lessons: [
        {
          id: 'u4-l1', title: 'Privacy in a Surgical Practice',
          content: [
            H('Why HIPAA Carries Extra Weight Here'),
            B('Every healthcare provider operates under HIPAA. But in a surgical practice, the information patients share with us is particularly sensitive. They share medical histories they may not have told their closest friends. They share financial details. They share fears. They do it because they must — because receiving surgical care requires disclosure. That trust is sacred.'),
            C('What is PHI?', 'Protected Health Information includes any data that can identify a patient: name, date of birth, address, phone number, Social Security number, medical record number, diagnosis, treatment, payment information, photographs, images, or any combination of data elements that could reasonably identify a person. PHI exists in written, electronic, and verbal forms — all equally protected.'),
            H('Your Obligations at AOST'),
            L(
              'Access only the patient records required for your specific role and duties — nothing beyond that',
              'Never discuss a patient by name, diagnosis, or procedure in public areas, hallways, waiting rooms, the break room, or any space where unauthorized persons may overhear',
              'Never communicate patient information via personal phone, text, or personal email — only authorized practice systems',
              'Lock your workstation every time you step away — even for 30 seconds',
              'Never photograph, record, or capture any patient, clinical area, or patient record without explicit written authorization',
              'Never post anything patient-related on social media — including anonymized descriptions that could permit identification',
              'Report any actual or suspected privacy incident to your manager immediately — early reporting protects patients and the practice',
            ),
            CG('Consequence of Non-Compliance', 'HIPAA violations carry civil penalties from $100 to $50,000 per violation, with criminal prosecution possible for willful disclosure. The practice and the individual team member can both bear personal legal liability. HIPAA is not a policy — it is federal law. Treat it that way.'),
            B('You are required to complete formal HIPAA training within your first three business days. Annual recertification is mandatory. The acknowledgment you signed at orientation is your legal agreement to comply.'),
          ],
        },
      ],
    },

    // ── MODULE U5 ──────────────────────────────────────────────────
    {
      id: 'u5', title: 'OSHA & Surgical Safety', scope: 'aost',
      duration: '20 min', hasQuiz: true,
      lessons: [
        {
          id: 'u5-l1', title: 'Safety in a Surgical Environment',
          content: [
            H('Our Environment Has Surgical-Level Risk'),
            B('General dental practices operate under OSHA guidelines. We do too — but our environment includes risks that are materially different. We perform surgery with anesthesia. We generate more biological waste. We work with patients who are sedated and cannot self-report discomfort or distress during procedures. Every team member — clinical or not — operates in this environment and must understand its safety requirements.'),
            H('Bloodborne Pathogen Awareness'),
            B('Bloodborne pathogens — including HIV, Hepatitis B, and Hepatitis C — are transmitted through blood and certain body fluids. In a surgical environment, exposure risk is real and present. OSHA\'s Bloodborne Pathogen Standard requires us to have an Exposure Control Plan, maintain appropriate PPE in all clinical areas, and ensure all team members are trained.'),
            L(
              'PPE (gloves, masks, eye protection) is mandatory in all clinical areas — not recommended, mandatory',
              'Sharps are never recapped by hand — use single-hand scoop technique or a safety device',
              'Sharps containers are never filled beyond the designated fill line — a needlestick from an overfull container is a preventable harm',
              'Any exposure incident is reported immediately and the Exposure Control Protocol is followed without delay — time matters',
              'All biohazardous waste is disposed of in proper red biohazard containers — never standard trash',
            ),
            C('Before Your First Patient-Facing Shift', 'Confirm the locations of: fire extinguisher, eyewash station, first aid kit, AED, emergency oxygen, and posted emergency numbers at your location. Your office manager walks you through this during orientation. Know these before you are in a position to need them.'),
            H('Infection Control in Oral Surgery'),
            B('Infection control in OMS follows CDC and OSHA guidelines for surgical environments. All instruments that contact tissue or bone must be either sterilized via autoclave or single-use disposable. Surface disinfection between every patient uses EPA-registered hospital-grade disinfectants. Hand hygiene is strictly observed. If you are ever uncertain whether an instrument or surface meets our infection control standard, do not use it — ask first.'),
          ],
        },
      ],
    },

    // ── MODULE U6 ──────────────────────────────────────────────────
    {
      id: 'u6', title: 'Professional Standards', scope: 'aost',
      duration: '15 min', hasQuiz: true,
      lessons: [
        {
          id: 'u6-l1', title: 'The AOST Standard',
          content: [
            H('One Standard. Four Locations.'),
            B('One of the defining challenges in a multi-location practice is maintaining consistency. It is easy for each site to drift — to develop its own informal norms, its own workarounds, its own interpretation of expectations. That drift is how a unified brand becomes an inconsistent one, and how "AOST" stops meaning the same thing at all four locations.'),
            B('The AOST standard is not aspirational. It is operational. It applies to Tampa, Land O\'Lakes, Wesley Chapel, and Valrico equally. You are a steward of that standard wherever you work.'),
            ST(
              { title: 'Appearance', body: 'Uniform or professional attire as required by your role, worn correctly. Name badge visible at all times. Your appearance is the first signal a patient receives about the quality of care they are about to receive. Make it the right signal.' },
              { title: 'Punctuality', body: 'Arrive ready to work at your scheduled start time. If you cannot be there, your manager hears from you no later than one hour before your shift — not 15 minutes before the first patient. Unplanned absences create real operational consequences for surgical schedules and patients.' },
              { title: 'Communication', body: 'Professional and warm in every interaction — with patients, families, referring offices, and teammates. Under pressure, tone is the first thing to degrade. At AOST, it is the last thing we allow to. The more stressful the moment, the more important your composure.' },
              { title: 'Documentation', body: 'In a surgical practice, documentation is patient safety. Every note, every record, every entry in the practice management system is a legal document. Accuracy and timeliness are required, not suggested. "If it isn\'t documented, it didn\'t happen" is a clinical-legal reality in this environment.' },
              { title: 'Teamwork', body: 'We cover for each other. We support each other. We do not allow personal tensions to affect patient care. Conflicts are resolved directly and professionally — never through gossip, passive avoidance, or social media. If direct resolution isn\'t possible, management is the path forward.' },
            ),
          ],
        },
      ],
    },

    // ── MODULE U7 ──────────────────────────────────────────────────
    {
      id: 'u7', title: 'The AOST Communication Standard', scope: 'aost',
      duration: '20 min', hasQuiz: true,
      lessons: [
        {
          id: 'u7-l1', title: 'Why We Script for Excellence',
          content: [
            H('Scripted Excellence vs. Good Intentions'),
            B('There is a meaningful difference between a team that tries hard and a team that performs consistently. Good intentions depend on individual variation — how someone feels on a given day, their natural communication style, how much sleep they got. Scripted systems create consistency that transcends individual variation. When every team member at every location handles the same situation the same way, we stop relying on heroics and start delivering reliability.'),
            B('Scripted communication at AOST is not about sounding robotic. It is about ensuring that every patient — regardless of which location they visit or which team member they speak with — receives the same warm, professional, clear experience. The script is the floor, not the ceiling.'),
            CG('The New Patient Phone Call', 'First ring: three rings maximum before answering.\n\nAnswer: "Advanced Oral Surgery of Tampa, this is [Name], how can I help you today?"\n\nIf placing on hold: "May I place you on a brief hold? I\'ll be right with you."\n\nReturn: "Thank you for holding, I appreciate your patience — now, how can I help you?"\n\nNever: "Can I call you back?" / "She\'s busy." / "I\'m not sure, let me find out." without an immediate resolution path.'),
            C('The Anxious Patient', 'When a patient arrives or calls in a state of visible anxiety:\n\n1. Acknowledge the emotion first: "I completely understand — this can feel overwhelming. You\'re in the right place."\n2. Ground them: "We do this every day, and we\'re going to take great care of you."\n3. Then address the logistics.\n\nNever jump to paperwork or account questions before acknowledging what they\'re feeling.'),
            CB('The Financial Conversation Opener', '"I want to make sure you have a clear picture of what to expect financially before we get to your appointment. Can I walk you through your benefits and what your estimated out-of-pocket will be?"\n\nThe goal is clarity, not pressure. A patient who understands their financial responsibility is a patient who shows up, follows through, and leaves satisfied.'),
            H('Post-Operative Discharge'),
            B('Every patient receives written post-operative instructions AND a verbal walkthrough of those instructions before discharge. This is not optional. A patient who leaves without understanding their recovery instructions is more likely to experience complications, more likely to call panicked after hours, and more likely to have a negative outcome that affects their experience and our reviews.'),
            L(
              'Written instructions in hand before departure — always',
              'Verbal review of key points: what is normal, what is not, when to call, emergency contact',
              'Confirm a responsible adult is with them if they received sedation',
              'Confirm they have transportation — never allow a sedated patient to drive',
            ),
          ],
        },
      ],
    },

  ],
},

// ════════════════════════════════════════════════════════════════════
//  FRONT DESK TRACK
// ════════════════════════════════════════════════════════════════════
'front-desk': {
  id: 'front-desk',
  title: 'Patient Coordinator Track',
  subtitle: 'Front Desk Specialization',
  color: '#1B6CA8',
  locked: false,
  modules: [

    {
      id: 'fd1', title: 'The Surgical Schedule', scope: 'aost',
      duration: '25 min', hasQuiz: true,
      lessons: [
        {
          id: 'fd1-l1', title: 'Scheduling in an OMS Practice',
          content: [
            H('A Surgical Schedule Is Not an Appointment Book'),
            B('In general dentistry, scheduling is relatively predictable. A cleaning takes 45 minutes, a filling takes an hour. In oral surgery, procedure time depends on anatomy, impaction depth, the number of extractions, patient response to sedation, unexpected surgical findings, and dozens of other variables that cannot be predicted from a referral note. You are scheduling around a surgeon\'s operative day — and every scheduling decision you make has downstream consequences.'),
            C('The Cardinal Rule', 'Never compress the schedule to the point where there is no buffer for a complex case. A surgeon who is running 90 minutes behind is not just an operational problem. It is a patient safety risk, a team stress event, and an experience degradation for every patient in the afternoon. Protect the schedule architecture. It is your highest operational responsibility.'),
            H('Understanding Procedure Time Variables'),
            L(
              'Impaction depth and angle — a deeply impacted wisdom tooth can take 3–5x longer than a straightforward erupted tooth',
              'Root morphology — curved, fused, or dilacerated roots require additional surgical time',
              'Bone density — varies significantly between patients and affects how quickly bone can be moved',
              'Patient response to sedation — some patients require more careful titration and monitoring',
              'Unexpected findings — pathology, fractured roots, or anatomical anomalies discovered during surgery',
            ),
            PH('📌 Location-Specific Content', 'Block scheduling templates, time allocations per procedure type, daily case limits, and surgeon preference cards for scheduling are covered in your site-specific training. This section will be updated with location-specific protocols as they are documented.'),
          ],
        },
      ],
    },

    {
      id: 'fd2', title: 'Insurance — Medical AND Dental', scope: 'aost',
      duration: '30 min', hasQuiz: true,
      lessons: [
        {
          id: 'fd2-l1', title: 'The Dual Billing Reality',
          content: [
            H('This Is What Separates OMS from Dental Billing'),
            B('Most dental practices bill dental insurance only. AOST bills both medical and dental insurance depending on the procedure. This dual-billing reality is one of the most operationally complex aspects of running an OMS practice — and it is a key reason insurance verification at AOST is more involved than at a general dental office.'),
            B('Many OMS procedures are medically necessary. Impacted wisdom teeth causing infection are a medical condition. Jaw surgery is a medical procedure. Biopsies are medical care. When a procedure is medically indicated, it may be covered — partially or fully — under the patient\'s medical insurance rather than their dental plan. Failing to check medical benefits is leaving coverage — and patient financial relief — on the table.'),
            L(
              'Always collect BOTH medical and dental insurance information at the time of scheduling — not as an afterthought',
              'Verify both plans in advance — benefits verification is never done day-of',
              'Understand CDT codes (dental procedure codes) vs. CPT codes (medical procedure codes)',
              'Medical billing for OMS requires medical necessity documentation from the clinical team — coordinate accordingly',
              'The No Surprises Act requires good-faith cost estimates for uninsured and self-pay patients — know the process',
            ),
            CG('The Verification Priority', 'A patient who arrives for surgery with an unresolved insurance question is a stress event — for them, for the team, and for the schedule. Thorough, advance verification is not administrative overhead. It is patient experience management.'),
            PH('📌 Software Training', 'Your practice management software training covers the specific insurance verification workflow, benefits entry, coordination of benefits between medical and dental, and EOB posting. This will be added to your learning path once system access is confirmed.'),
          ],
        },
      ],
    },

    {
      id: 'fd3', title: 'Referral Relationships', scope: 'aost',
      duration: '20 min', hasQuiz: true,
      lessons: [
        {
          id: 'fd3-l1', title: 'Understanding How We Get Patients',
          content: [
            H('Referrals Are the Engine of This Practice'),
            B('AOST does not primarily market directly to patients the way a retail business markets to consumers. The primary driver of new patient volume is referrals from general dentists. When a dentist encounters a case beyond their scope — a complicated extraction, a patient needing implants, a lesion that requires biopsy — they refer that patient to us.'),
            B('This means general dentists are not just referring sources. They are our primary business partners. Every interaction AOST has with a referring office is a relationship touchpoint that either strengthens or weakens that partnership.'),
            H('What Referring Dentists Evaluate Us On'),
            L(
              'Scheduling responsiveness: How quickly can their patient get an appointment?',
              'Patient experience: Did their patient feel well-cared-for? Did they call the dentist afterward to say so?',
              'Communication: Did they receive a timely, professional consultation report after seeing their patient?',
              'Operational consistency: Is AOST reliable and predictable, or does quality vary?',
            ),
            C('How You Protect Referring Relationships', 'Every phone call from a referring office is a relationship data point. Pick up quickly. Be warm and professional. Make scheduling easy. When a referring dentist\'s patient has a great experience at AOST, that dentist refers again and refers more. When they have a poor one, you have potentially damaged two relationships at once — theirs with AOST, and theirs with the patient who trusted their recommendation.'),
            H('Thinking About Referring Sources Strategically'),
            B('Not all referring relationships are the same. Some dentists send us dozens of patients a month. Others send a few. Some are growing, some are static. As a Patient Coordinator, you see referral patterns in your daily work. Developing the awareness to notice when a previously active referring office goes quiet — and communicating that to your manager — is how operational observation becomes business intelligence.'),
            PH('📌 Referring Office Protocol', 'Location-specific protocols for logging referrals, returning calls to referring offices, sending consultation reports, and managing referring relationships will be documented here.'),
          ],
        },
      ],
    },

    {
      id: 'fd4', title: 'Patient Communication Excellence', scope: 'foundations',
      duration: '20 min', hasQuiz: false,
      lessons: [
        {
          id: 'fd4-l1', title: 'The Voice of AOST',
          content: [
            H('You Are the First Impression'),
            B('Before a patient meets a surgeon, before they sit in a surgical chair, before they experience any aspect of AOST\'s clinical excellence — they have already formed an impression. Based on how quickly someone answered. Based on the warmth in the voice. Based on whether they felt heard or processed.'),
            B('That first impression belongs to you.'),
            ST(
              { title: 'Answering the phone', body: '"Advanced Oral Surgery of Tampa, this is [Name], how can I help you today?" Within three rings. Energy in the voice — this patient may have been working up the courage to call for weeks.' },
              { title: 'Anxious callers', body: 'When a patient calls in distress — pain, fear, confusion about their referral — acknowledge the emotion before addressing the logistics. "I understand, let\'s make sure we take care of you right away." Then the account pull.' },
              { title: 'Wait time', body: 'If a patient is waiting — in person or on hold — they know. Silence is not neutral. A brief acknowledgment of the wait ("I haven\'t forgotten about you, it\'ll be about five more minutes") changes the entire experience.' },
              { title: 'Language to avoid', body: '"I\'m not sure" without a follow-up resolution. "That\'s not my department." "The doctor is busy." Own the patient\'s question even when the answer requires a handoff. "Let me find that out for you right now" is always better than a redirect.' },
            ),
          ],
        },
      ],
    },

  ],
},

// ════════════════════════════════════════════════════════════════════
//  TREATMENT COORDINATOR TRACK
// ════════════════════════════════════════════════════════════════════
'treatment-coord': {
  id: 'treatment-coord',
  title: 'Treatment Coordinator Track',
  subtitle: 'Case Presentation Specialization',
  color: '#0E7C7B',
  locked: false,
  modules: [

    {
      id: 'tc1', title: 'Clinical Literacy for Case Presentation', scope: 'foundations',
      duration: '30 min', hasQuiz: true,
      lessons: [
        {
          id: 'tc1-l1', title: 'What You Must Understand to Present Well',
          content: [
            H('You Cannot Present What You Do Not Understand'),
            B('A Treatment Coordinator\'s value is built on trust. Patients who have just come from a consultation with a surgeon turn to you — sometimes confused, sometimes anxious, sometimes overwhelmed by information they couldn\'t fully process — and ask: "What does this mean?" Your ability to answer that question clearly, accurately, and calmly is what determines whether they move forward with care or leave uncertain.'),
            B('You are the bridge between the surgeon\'s diagnosis and the patient\'s decision. That requires genuine clinical literacy — not clinical expertise, but enough understanding to translate complex surgical information into language that helps patients say yes to the care they need.'),
            C('The Standard', 'Every Treatment Coordinator at AOST should be able to explain, in plain language, what each of our core procedures involves, why a patient might need it, what the recovery looks like, and what the likely outcome is. Not as a script — as genuine knowledge.'),
            PH('📌 Procedure Presentation Guides', 'Patient-facing explanations for each procedure — wisdom teeth, implants, bone grafts, jaw surgery, sedation options, full arch rehabilitation, same-day implants — will be developed in collaboration with the clinical team and added here. These will become your reference library for every patient conversation.'),
          ],
        },
      ],
    },

    {
      id: 'tc2', title: 'The Financial Conversation', scope: 'aost',
      duration: '25 min', hasQuiz: true,
      lessons: [
        {
          id: 'tc2-l1', title: 'Care Coordination, Not Sales',
          content: [
            H('This Is a Care Conversation, Not a Sales Pitch'),
            B('Treatment coordination at AOST is not a revenue generation function. It is a care coordination function. The goal is not to maximize case acceptance — it is to remove every barrier between a patient who needs surgical care and their ability to receive it. When that is done well, case acceptance follows naturally. When it is done as pressure selling, patients leave, don\'t come back, and don\'t refer others.'),
            L(
              'Present insurance benefits clearly — what is covered, what the patient owes, and why — without jargon',
              'Offer all available financing options proactively, including CareCredit, before patients ask',
              'Never apply pressure or manufacture urgency to accelerate a decision',
              'When patients need time to discuss with family, build that in as a normal and expected part of the process',
              'Follow up with patients who haven\'t scheduled — not as a sales call, but as a care check-in: "I wanted to make sure you had everything you need to make a decision."',
            ),
            C('The CareCredit Philosophy', 'AOST accepts CareCredit and offers flexible financing because we believe that cost should never be the reason a patient who needs surgical care does not get it. Your job is to make the financial path as clear and accessible as possible. That is a healthcare function, not a retail one.'),
            H('Handling the "I need to think about it"'),
            B('This is the most important moment in case presentation. The instinctive response — to address objections, offer discounts, or manufacture urgency — usually makes things worse. The better response is to acknowledge the need for time as legitimate, ask what would help them decide, and make yourself available without pressure.'),
            B('"Absolutely — this is an important decision and you should feel confident before moving forward. Is there anything I can give you more information on? Would it help to have the written treatment plan to review at home?"'),
            PH('📌 Financial Presentation Workflow', 'Step-by-step financial consultation process, fee presentation templates, CareCredit application workflow, and staging treatment for financial manageability will be documented here.'),
          ],
        },
      ],
    },

  ],
},

// ════════════════════════════════════════════════════════════════════
//  SURGICAL ASSISTANT TRACK
// ════════════════════════════════════════════════════════════════════
'surgical-asst': {
  id: 'surgical-asst',
  title: 'Surgical Assistant Track',
  subtitle: 'Clinical Specialization',
  color: '#1A7A4A',
  locked: false,
  modules: [

    {
      id: 'sa1', title: 'The Surgical Suite', scope: 'aost',
      duration: '30 min', hasQuiz: true,
      lessons: [
        {
          id: 'sa1-l1', title: 'Room Preparation Is Patient Safety',
          content: [
            H('What Happens Before the Patient Sits Down Determines What Happens After'),
            B('A properly prepared surgical suite is the foundation of a safe, efficient, predictable procedure. When a surgeon walks into an operatory, they should be able to begin without searching for instruments, adjusting equipment, or discovering missing items during the case. Your preparation is what makes that possible. Your omissions are what make it impossible.'),
            C('The Non-Negotiable', 'If anything about a room\'s setup is uncertain, incomplete, or inconsistent with the case requirements — stop. Correct it before the patient enters. A surgeon\'s momentum interrupted mid-procedure by a missing instrument is a patient safety event, a surgeon frustration event, and a schedule impact. None of those are recoverable.'),
            H('Case-Specific Preparation'),
            B('Room setup in oral surgery is not generic. A wisdom tooth extraction, an implant placement, a jaw surgery case, and a biopsy have completely different instrument requirements, medication setups, table arrangements, and equipment positioning. You will learn surgeon preference cards — what each surgeon at AOST wants, how they want it positioned, and what is non-negotiable for their cases.'),
            PH('📌 Surgeon Preference Cards & Setup Checklists', 'Specific setup checklists by procedure type and surgeon preference cards for each AOST provider will be documented here. This is clinical proprietary content developed with the lead surgical assistant and clinical leadership at each location.'),
          ],
        },
      ],
    },

    {
      id: 'sa2', title: 'Sedation Awareness & Monitoring', scope: 'aost',
      duration: '30 min', hasQuiz: true,
      lessons: [
        {
          id: 'sa2-l1', title: 'Every Team Member Is Trained in Sedation',
          content: [
            H('This Is What Makes AOST Different'),
            B('Most dental offices cannot offer IV sedation. Those that can often have limited staff sedation training. At AOST, every team member is trained in sedation support. This commitment — which we communicate clearly to patients and referring dentists — is both a clinical differentiator and a patient safety mandate.'),
            B('This does not mean every team member administers anesthesia. It means every person who is in a clinical space with a sedated patient understands what normal monitoring looks like, recognizes deviation from normal, and knows exactly what to do if something changes.'),
            L(
              'Nitrous oxide: mild sedation, patient remains conscious and responsive, can self-report',
              'Oral sedation: pill-based, moderate relaxation, patient conscious but may be drowsy',
              'IV sedation: administered intravenously, deep relaxation, limited memory of procedure',
              'General anesthesia: full unconsciousness for complex or highly anxious cases',
            ),
            C('The Core Obligation', 'A sedated patient cannot tell you if something is wrong. They cannot self-report pain, discomfort, or distress. Your continuous monitoring of vital signs — pulse oximetry, blood pressure, heart rate, respiratory observation — is not a background task. It is the primary patient safety function during sedated procedures. Your eyes on that patient are what stand between them and an undetected problem.'),
            PH('📌 Vital Sign Monitoring & Emergency Protocols', 'Normal ranges, documentation requirements, emergency response protocols, crash cart locations, and emergency contact procedures will be covered in your clinical orientation and documented here.'),
          ],
        },
      ],
    },

    {
      id: 'sa3', title: 'Room Turnover', scope: 'aost',
      duration: '20 min', hasQuiz: true,
      lessons: [
        {
          id: 'sa3-l1', title: 'Efficient and Safe — Both, Always',
          content: [
            H('Speed and Thoroughness Are Not Opposites'),
            B('Efficient room turnover is not about moving fast — it is about executing a disciplined sequence the same way every time, so that nothing is missed even when the schedule is under pressure. Speed without thoroughness is a patient safety failure. Thoroughness without efficiency is a schedule failure. The goal is both.'),
            L(
              'Patient is discharged and escorted out before room breakdown begins — never overlap departure with setup',
              'All soiled instruments removed to sterilization in covered cassettes — never carried loose',
              'All sharps disposed of immediately into appropriate sharps containers',
              'All surfaces disinfected with EPA-registered surgical-grade disinfectant — observe required contact time, it is not optional',
              'Every contact surface wiped: chair, light handles, bracket table, counters, spit sink, door handles',
              'Fresh supplies stocked, room confirmed ready before next patient is brought back',
              'Room status communicated to front desk verbally or via system — never assumed',
            ),
            PH('📌 Location-Specific Turnover Standards', 'Specific disinfectant products, required contact times, target turnover time windows, and sign-off procedures by location will be documented here by clinical leadership.'),
          ],
        },
      ],
    },

  ],
},

// ════════════════════════════════════════════════════════════════════
//  STERILIZATION TRACK
// ════════════════════════════════════════════════════════════════════
sterilization: {
  id: 'sterilization',
  title: 'Sterilization Technician Track',
  subtitle: 'Infection Control Specialization',
  color: '#7B3F00',
  locked: false,
  modules: [

    {
      id: 'st1', title: 'Infection Control in Oral Surgery', scope: 'aost',
      duration: '30 min', hasQuiz: true,
      lessons: [
        {
          id: 'st1-l1', title: 'Your Role Is Patient Safety',
          content: [
            H('Sterilization Is Not a Support Function'),
            B('No matter how skilled the surgeon. No matter how well the room is prepared. No matter how smoothly the patient experience has been managed. If an instrument is not properly sterilized, the patient is at risk. Surgical site infections are a real, preventable complication of oral surgery. Your role in infection control is not background work. It is patient safety — as consequential as any clinical function in this practice.'),
            H('The Spaulding Classification — Know Your Instruments'),
            L(
              'Critical instruments (forceps, elevators, implant drills, scalers): contact bone or sterile tissue — must be STERILIZED via autoclave before every use. No exceptions.',
              'Semi-critical instruments (impression trays, some imaging equipment): contact mucous membranes — must be sterilized or high-level disinfected.',
              'Non-critical surfaces (blood pressure cuffs, chair surface, light handles): contact intact skin — must be disinfected with EPA-registered product between patients.',
            ),
            C('The Only Standard That Matters', 'Any instrument that contacts tissue or bone is either sterile or it does not enter the room. If you are uncertain about the sterilization status of any instrument, it returns to processing. The question is never "is it probably okay?" The question is "can I confirm it is sterile?" If the answer is no, it goes back through.'),
            H('Infection Control Governance'),
            B('AOST infection control follows CDC and OSHA guidelines for surgical environments and AAOMS standards specific to oral and maxillofacial surgery. Our compliance is documented, tracked, and auditable. Every processing cycle is recorded. Spore testing is performed on a scheduled basis per OSHA and CDC requirements.'),
          ],
        },
      ],
    },

    {
      id: 'st2', title: 'The Instrument Processing Workflow', scope: 'foundations',
      duration: '25 min', hasQuiz: true,
      lessons: [
        {
          id: 'st2-l1', title: 'Transport → Decontaminate → Inspect → Package → Sterilize',
          content: [
            H('The Five-Stage Process'),
            B('Instrument processing in oral surgery is a precise, documented, sequenced workflow. Every stage exists for a reason. Skipping or shortcutting any stage compromises the stages that follow it. The sequence is the standard.'),
            ST(
              { title: 'Stage 1 — Transport', body: 'Contaminated instruments leave the operatory in covered cassettes or sealed transport containers. Never carried loose. Never stacked uncovered on a tray. Contaminated instruments in transit are a sharps injury and cross-contamination risk.' },
              { title: 'Stage 2 — Decontamination', body: 'Pre-rinse or enzyme soak immediately — before biofilm can dry. Dried biofilm significantly reduces decontamination efficacy and can survive sterilization. Ultrasonic cleaning or instrument washer removes debris. Manual scrubbing is a sharps injury risk and a last resort.' },
              { title: 'Stage 3 — Inspection', body: 'Every instrument inspected for cleanliness, function, and integrity. Visibly soiled instruments do not proceed — they return to decontamination. Damaged instruments are removed from service. Hinged instruments checked for full range of motion.' },
              { title: 'Stage 4 — Packaging', body: 'Instruments packaged in appropriate pouches or wrapped cassettes for the sterilization method used. Every package labeled with content, date, cycle number, and expiration. Traceability is a compliance requirement and a quality control mechanism.' },
              { title: 'Stage 5 — Sterilization', body: 'Autoclave cycle parameters verified against the load and packaging type. Load documentation completed. Biological indicator (spore test) performed per scheduled protocol. Sterilized items stored properly in a clean, dry area away from contamination risk.' },
            ),
            PH('📌 Location-Specific Equipment', 'Autoclave models, cycle parameters, spore testing schedule, biological monitoring log, and quality control procedures for your location will be documented here by your office manager and clinical lead.'),
          ],
        },
      ],
    },

  ],
},

// ════════════════════════════════════════════════════════════════════
//  OFFICE MANAGER / OPERATIONS LEADER TRACK
//  THE AOST LEADERSHIP PATH — Foundation → Leadership → Strategic
//  Original framework: our language, our structure, our content.
// ════════════════════════════════════════════════════════════════════
'office-manager': {
  id: 'office-manager',
  title: 'Operations Leader Track',
  subtitle: 'The AOST Leadership Path',
  color: '#4A1A6A',
  locked: false,
  modules: [

    // ── FOUNDATION LEVEL ──────────────────────────────────────────
    {
      id: 'om1', scope: 'aost', title: 'Your Role: The AOST Leadership Path',
      duration: '25 min', hasQuiz: true,
      levelLabel: 'Foundation',
      lessons: [
        {
          id: 'om1-l1', title: 'The Operations Leader Role',
          content: [
            H('Not an Office Manager. An Operations Leader.'),
            B('The title "office manager" describes a clerical function — managing paperwork, answering phones, booking appointments. That is not what this role is at AOST. The Operations Leader at each location is the chief non-clinical authority at that site. You own everything that is not clinical. Systems. Team. Patient experience. Compliance. Schedule performance. Operational consistency with the other three locations.'),
            B('The surgeons\' three lanes are: clinical excellence, patient relationships, and referring doctor relationships. Everything that pulls them out of those three lanes is an operational failure. Your job is to prevent those failures — not reactively, by fixing problems as they arise, but proactively, by building the systems that prevent problems from occurring in the first place.'),
            B('The surgeons\' three lanes are: clinical excellence, patient relationships, and referring doctor relationships. Everything that pulls them out of those three lanes is an operational failure. Your job is to prevent those failures — not reactively, but proactively, by building the systems that make the practice reliable without requiring constant intervention.'),
            LV(
              { title: 'Foundation', subtitle: 'Running the Operation', color: '#4A1A6A', desc: 'Systems, daily operations, KPIs, compliance, schedule integrity. The practice runs correctly every day.' },
              { title: 'Leadership', subtitle: 'Building the Team', color: '#1B6CA8', desc: 'Hiring, onboarding, culture, accountability, and managing both up and down. The team performs without your constant presence.' },
              { title: 'Strategic', subtitle: 'Driving Growth', color: '#0E7C7B', desc: 'Referral intelligence, practice growth, five-year thinking, and becoming a true operational partner to ownership.' },
            ),
            B('You will work through each level deliberately. The Foundation level must be solid before the Leadership level is meaningful. The Leadership level must be solid before Strategic thinking is possible. This is the path.'),
          ],
        },
      ],
    },

    {
      id: 'om2', scope: 'aost', title: 'Foundation: KPIs and Practice Performance',
      duration: '30 min', hasQuiz: true,
      levelLabel: 'Foundation',
      lessons: [
        {
          id: 'om2-l1', title: 'The Numbers That Tell the Story',
          content: [
            H('Running Operations Without Metrics Is Driving Without a Dashboard'),
            B('Key performance indicators are not administrative overhead. They are the instruments that tell you whether the practice is healthy, where it is losing money it should be capturing, and where problems are developing before they become crises. As Operations Leader, these numbers are yours to own and understand.'),
            PL(
              { name: 'Production', detail: 'The total dollar value of procedures performed. Production is what the practice generates before collections are applied. Track daily against targets. Falling production usually signals schedule problems, cancellations, or case complexity shifts.' },
              { name: 'Collections', detail: 'What is actually received from patients and insurance. Collection rate = (Collections ÷ Adjusted Production) × 100. A healthy OMS practice collects 95–98% of adjusted production. Persistent gaps below 90% indicate billing workflow failures, not just slow payers.' },
              { name: 'Days in Accounts Receivable', detail: 'How long outstanding balances sit before collection. Target: under 30 days for a well-run OMS practice. Rising AR means cash is sitting outside the practice that belongs inside it. Aging AR by bucket (0–30, 31–60, 61–90, 90+) shows you where to focus collection efforts.' },
              { name: 'Denial Rate', detail: 'Percentage of insurance claims denied on first submission. High denial rates point to coding errors, missing documentation, or prior authorization failures. Every denial is rework, delayed revenue, and a diagnosed workflow failure — not bad luck.' },
              { name: 'Schedule Utilization', detail: 'Percentage of available surgical time filled with cases. Empty slots are permanently lost revenue. Cancellation rate and no-show rate are the primary drivers. Reducing these directly improves this metric.' },
              { name: 'New Patient Volume by Referral Source', detail: 'How many new patients, and which referring offices sent them. This tells you which relationships are growing, which are static, and which may need attention. Trend this month-over-month, not just in absolute numbers.' },
            ),
          ],
        },
      ],
    },

    {
      id: 'om3', scope: 'aost', title: 'Foundation: Systems and Operational Discipline',
      duration: '20 min', hasQuiz: false,
      levelLabel: 'Foundation',
      lessons: [
        {
          id: 'om3-l1', title: 'Proactive Systems vs. Reactive Fire-Fighting',
          content: [
            H('The Difference Between Operators and Leaders'),
            B('An operator responds to problems. A leader designs systems that prevent them. Most practices that struggle operationally are not struggling because their people are incapable. They are struggling because the systems do not exist that would allow capable people to perform consistently. The Operations Leader\'s job is to build those systems — not just fix today\'s fire, but eliminate the conditions that allowed the fire to start.'),
            B('A system is a documented, repeatable process with a defined owner, a defined trigger, and a defined outcome. "We handle scheduling X way" is a preference. "The scheduling coordinator follows the AOST Scheduling Protocol document, which covers case time allocation, buffer rules, cancellation procedures, and daily confirmation" is a system.'),
            L(
              'Every critical operational process at your location should be documented, not carried in someone\'s head',
              'Documentation protects the practice from key-person dependency — if your best employee is out, the operation continues',
              'Systems are tested regularly: what breaks when you are not there is what needs a better system',
              'Systems are improved continuously: every operational problem is a signal that a system needs refinement',
            ),
            CG('The Test', 'If your location cannot function normally for two days without you present, you have built a dependency, not a system. The goal of Foundation-level operations is a location that runs to AOST standard every day — regardless of whether you are physically in the building.'),
          ],
        },
      ],
    },

    // ── LEADERSHIP LEVEL ──────────────────────────────────────────
    {
      id: 'om4', scope: 'aost', title: 'Leadership: Building and Keeping the Team',
      duration: '30 min', hasQuiz: true,
      levelLabel: 'Leadership',
      lessons: [
        {
          id: 'om4-l1', title: 'The OMS Staffing Reality',
          content: [
            H('Staffing in Oral Surgery Has Always Been a Challenge'),
            B('There has historically been a staffing challenge in oral surgery practices — a shortage of trained surgical assistants, high turnover in front desk roles, and difficulty finding candidates who understand the demands of a surgical environment. This challenge has intensified in recent years. The Operations Leader who develops a genuine capability for recruiting, interviewing, onboarding, and retaining staff has a competitive operational advantage.'),
            B('The financial impact is direct. A staffing gap in a surgical practice does not just mean one fewer staff member. It means delayed patients, compressed surgeons, stressed remaining staff, and degraded patient experience. Turnover in an OMS practice costs — in recruiting time, in training time, and in the temporary performance drop of every replacement hire. Retention is revenue.'),
            H('Interviewing for Character, Not Just Competence'),
            B('Most interviews reveal what candidates want you to know about them. Behavioral questions reveal how candidates have actually behaved in real situations — which is a far better predictor of how they will behave in yours.'),
            CB('The Behavioral Question Approach', 'Instead of: "Are you good under pressure?"\nAsk: "Tell me about a time when everything went wrong at once during a busy day. What happened and what did you do?"\n\nInstead of: "Are you a team player?"\nAsk: "Describe a time when a colleague was struggling. How did you handle it and what was the outcome?"\n\nInstead of: "Can you handle difficult patients?"\nAsk: "Tell me about the most difficult patient interaction you\'ve had. How did you manage it?"'),
            H('Onboarding as a Retention Tool'),
            B('Most practices lose new hires in the first 90 days — not because the employee was wrong for the role, but because they were left to figure it out alone. A structured onboarding with assigned mentorship, clear milestones, and regular check-ins builds the confidence and connection that make people stay. The AOST Training University exists precisely to make that structure systematic — not dependent on whoever happens to have time to show the new person around.'),
            L(
              'Assign a mentor on Day 1 — someone with both the skills to teach and the patience to do it well',
              'Weekly check-ins for the first month: "What\'s making sense? What\'s still unclear? How are you feeling about the role?"',
              'Celebrate completion milestones — finishing this training program is an achievement worth acknowledging',
              'Address problems in the first 30 days when they are small — not at 90 days when they are habits',
            ),
          ],
        },
      ],
    },

    {
      id: 'om5', scope: 'aost', title: 'Leadership: Culture, Accountability, and Managing Up',
      duration: '25 min', hasQuiz: true,
      levelLabel: 'Leadership',
      lessons: [
        {
          id: 'om5-l1', title: 'Building Culture and Managing Both Directions',
          content: [
            H('Culture Is Not What You Post on a Wall. It Is What You Tolerate.'),
            B('Organizational culture is defined not by mission statements but by what a leader allows, rewards, and corrects. If a team member is chronically late and no action is taken, the cultural message is that punctuality does not matter. If a colleague is dismissive to a patient and a manager looks away, the message is that patient experience is negotiable. Culture is built or eroded one response at a time.'),
            L(
              'Transparency: Share what you know with your team. People who understand the "why" behind decisions perform better and stay longer. You do not need to share everything — but hoarding operational information is a trust killer.',
              'Accountability without contempt: Hold the standard consistently and calmly. Accountability is not about catching people doing wrong — it is about being clear about expectations and consistent in responding when they are not met.',
              'Recognition: A well-functioning team does extraordinary things routinely and receives no acknowledgment. Notice it. Say it specifically. "The way you handled that patient who was in tears this morning was exactly what AOST is supposed to look like."',
              'Delegation: Your job is not to do everything. Your job is to ensure everything is done to standard. Identify who can own what, give them the authority to do it, and hold them accountable for the outcome.',
            ),
            H('Managing Up — The Hardest Part of This Role'),
            B('Managing down to your team is what most people picture when they hear "office manager." Managing up — your relationship with the surgeons and ownership — is what separates the operations leaders who thrive from those who burn out.'),
            B('Managing up means: communicating operational performance with honesty, not with filtered optimism. It means raising problems before they become crises, not after. It means being the reliable source of truth that the practice owners trust completely — because they know you tell them what is real, not what you think they want to hear.'),
            C('The Standard for Managing Up at AOST', 'The surgeons at AOST should be able to focus entirely on their three lanes — clinical, patient, and referring relationships — because they trust that you have everything else. That trust is built through consistent, accurate communication and through operational reliability. When something goes wrong, you have already told them. You have a plan. You do not need to be managed.'),
          ],
        },
      ],
    },

    // ── STRATEGIC LEVEL ───────────────────────────────────────────
    {
      id: 'om6', scope: 'aost', title: 'Strategic: Referral Intelligence',
      duration: '25 min', hasQuiz: true,
      levelLabel: 'Strategic',
      lessons: [
        {
          id: 'om6-l1', title: 'Referral Relationships as Business Strategy',
          content: [
            H('Strategic Operations Includes Understanding Where Patients Come From'),
            B('At the Foundation level, you learn to run the day. At the Leadership level, you learn to build the team. At the Strategic level, you begin to understand how the practice grows — and the primary growth engine for an oral surgery practice is referral relationships with general dentists.'),
            B('Strategic thinking about referrals is not the surgeon\'s job alone. The quality of every patient\'s experience at AOST — how they were greeted, how their insurance was handled, how their post-op instructions were explained, how quickly the referring dentist received a consultation report — determines whether that referring dentist sends the next patient. Operations owns all of those touchpoints.'),
            H('Thinking in Tiers'),
            B('Not all referring relationships are the same. Some dentists are consistent, high-volume referrers. Others refer occasionally. Some have referred in the past but have gone quiet. Some have never referred but represent relationship opportunities.'),
            L(
              'High-volume, consistent referrers: your priority relationships — maintain contact, acknowledge their value, ensure their patients always receive exceptional experiences',
              'Moderate referrers: relationship growth opportunity — what would make them more comfortable sending more patients?',
              'Occasional referrers: understand what is limiting their volume — patient mix, competitive alternatives, or simply limited awareness of our full capabilities',
              'Lapsed referrers: a referral pattern drop is a signal — investigate proactively before the relationship is lost entirely',
            ),
            C('The Operational Connection', 'Every process that touches a referred patient is a referral relationship management process. Scheduling responsiveness. Insurance handling. Patient experience. Consultation report turnaround time. When these work flawlessly, referring dentists send more patients. When they fail, referring dentists stop. The Operations Leader\'s work is the business development strategy of the practice.'),
          ],
        },
      ],
    },

    {
      id: 'om7', scope: 'aost', title: 'Strategic: The Operations Leader as Growth Driver',
      duration: '20 min', hasQuiz: true,
      levelLabel: 'Strategic',
      lessons: [
        {
          id: 'om7-l1', title: 'When the Practice Runs Through Systems, Not People',
          content: [
            H('The Highest Expression of This Role'),
            B('AOST is a growing practice built by owners who have invested over a decade in constructing something exceptional. They built the locations. They hired the surgeons. They developed the brand and the patient base. Their goal is continued growth — more patients served excellently across multiple locations, with the consistency and reliability that makes that possible.'),
            B('The highest expression of the Operations Leader role is the moment when the practice runs to AOST standard regardless of whether you are physically present. Not because everyone is doing what they want, but because the systems are right, the team is trained, the accountability structures function, and the culture holds the standard from within rather than requiring your constant presence to enforce it.'),
            B('That is the practice that can add a fifth location. That is the practice that a referring dentist describes as "always reliable." That is the practice whose team members stay because they work in an organization that knows what it is doing.'),
            H('Strategic Questions for This Role'),
            L(
              'What systems currently depend on your personal knowledge rather than documented processes? Build the documentation.',
              'Which team members are capable of leading in your absence? Develop them deliberately.',
              'What is the single biggest operational friction that, if removed, would most improve the surgeon experience or patient experience?',
              'Which referral relationships are growing? Which are declining? What is driving both?',
              'In three years, what does this location look like at its best? What needs to be built to get there?',
            ),
            CG('The Measure of Success', 'When a surgeon who has been in clinic all day says — without prompting — "I don\'t know what we would do without you," that is the measure of success at the Strategic level. Not because you did everything. Because you built the machine that runs while they practice.'),
          ],
        },
      ],
    },

  ],
},

}

export const getTrack = (id) => TRACKS[id]
export const getModule = (trackId, moduleId) => TRACKS[trackId]?.modules.find(m => m.id === moduleId)
export const getLesson = (trackId, moduleId, lessonId) => getModule(trackId, moduleId)?.lessons.find(l => l.id === lessonId)
