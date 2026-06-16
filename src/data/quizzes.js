// Quiz questions keyed by module ID
// Format: { question, options: [string], correct: 0-indexed int, explanation }

export const QUIZZES = {

  // ── UNIVERSAL ──────────────────────────────────────────────────────
  u1: {
    title: 'Welcome & Mission',
    passPct: 80,
    questions: [
      {
        q: 'What is the mission statement of Advanced Oral Surgery of Tampa?',
        options: [
          'Providing affordable oral surgery to the Tampa Bay area',
          'Delivering Smiles With Compassion and Excellence',
          'Building the most advanced surgical practice in Florida',
          'Putting patients first in everything we do',
        ],
        correct: 1,
        explanation: 'AOST\'s mission is "Delivering Smiles With Compassion and Excellence" — the standard every team member is held to in every interaction.',
      },
      {
        q: 'How many locations does AOST operate across the greater Tampa Bay area?',
        options: ['Two', 'Three', 'Four', 'Five'],
        correct: 2,
        explanation: 'AOST operates four locations: Tampa, Land O\'Lakes, Wesley Chapel, and Valrico.',
      },
      {
        q: 'Which of the following is NOT one of AOST\'s core values?',
        options: ['Compassion', 'Efficiency', 'Excellence', 'Team First'],
        correct: 1,
        explanation: 'The three AOST core values are Compassion, Excellence, and Team First. Efficiency is an operational goal but not a stated value.',
      },
      {
        q: 'All four AOST surgeons are:',
        options: [
          'Licensed dentists with additional oral surgery training',
          'Board-certified oral and maxillofacial surgeons',
          'General practitioners who specialize in extractions',
          'Periodontal specialists with implant training',
        ],
        correct: 1,
        explanation: 'Drs. Edwards, Backeris, Blundell, and Gaus are all board-certified oral and maxillofacial surgeons — one of the most demanding credentials in all of healthcare.',
      },
      {
        q: 'AOST has more than how many 5-star Google reviews?',
        options: ['500', '750', '1,000', '1,500'],
        correct: 2,
        explanation: 'AOST has 1,000+ five-star Google reviews — a reflection of what happens when every team member delivers on the mission consistently.',
      },
    ],
  },

  u2: {
    title: 'What We Do — Oral Surgery',
    passPct: 80,
    questions: [
      {
        q: 'What is the most important distinction between oral surgery and general dentistry?',
        options: [
          'Oral surgery is more expensive',
          'Oral surgery practices have better equipment',
          'Oral surgery is a surgical specialty — no cleanings, no hygienists, only procedures',
          'Oral surgeons have more years of school',
        ],
        correct: 2,
        explanation: 'Oral surgery is a surgical specialty. We perform procedures only — no preventive care, no cleanings, no hygienists. Every patient is here for a clinical intervention.',
      },
      {
        q: 'AOST bills which types of insurance for patient procedures?',
        options: [
          'Dental insurance only',
          'Medical insurance only',
          'Both dental AND medical insurance, depending on the procedure',
          'Neither — AOST is a fee-for-service practice',
        ],
        correct: 2,
        explanation: 'This is one of the most important distinctions in OMS. We bill BOTH medical and dental insurance depending on the procedure. Many OMS services are medically necessary and covered under medical plans.',
      },
      {
        q: 'Which of the following is NOT a procedure performed at AOST?',
        options: [
          'Dental implant placement',
          'Routine teeth cleaning',
          'Bone grafting',
          'Wisdom tooth removal',
        ],
        correct: 1,
        explanation: 'We do not perform routine cleanings. That is general dentistry. AOST performs surgical procedures including implants, extractions, bone grafts, jaw surgery, and sedation-based care.',
      },
      {
        q: 'What makes AOST\'s sedation offering a competitive differentiator?',
        options: [
          'We offer the lowest-cost sedation in Tampa Bay',
          'Every member of our team is trained to support and monitor sedation',
          'We partner with an outside anesthesia group',
          'Sedation is only available at the Tampa location',
        ],
        correct: 1,
        explanation: 'Every AOST team member is trained in sedation support. This means patients can receive IV sedation, general anesthesia, or nitrous oxide with a fully trained team — not just one anesthesiologist.',
      },
      {
        q: 'Who sends most patients to AOST?',
        options: [
          'Walk-in patients who found us online',
          'Hospital emergency departments',
          'Referring general dentists',
          'Insurance companies',
        ],
        correct: 2,
        explanation: 'AOST is a referral-based practice. General dentists refer patients to us when cases are beyond their scope. This means referring dentist relationships are the business foundation of everything we do.',
      },
    ],
  },

  u3: {
    title: 'Our Patients',
    passPct: 80,
    questions: [
      {
        q: 'How should a patient be acknowledged upon arrival at AOST?',
        options: [
          'When they reach the front desk after completing paperwork',
          'Within 30 seconds of arrival, by name when possible',
          'After checking their insurance has been verified',
          'When their surgical assistant is ready to bring them back',
        ],
        correct: 1,
        explanation: 'Every patient is acknowledged within 30 seconds of arrival, by name when possible. This is non-negotiable — it sets the emotional tone for the entire visit.',
      },
      {
        q: 'Most AOST patients arrive in what emotional state?',
        options: [
          'Comfortable and routine — they\'ve had surgery before',
          'Excited about improving their smile',
          'Anxious, in pain, or both — often for the first time',
          'Indifferent — they just need the procedure done',
        ],
        correct: 2,
        explanation: 'Unlike general dental patients, most OMS patients are anxious, in pain, or both. Many have never had surgery. Our emotional approach to patient care is as important as our clinical excellence.',
      },
      {
        q: 'What is service recovery at AOST?',
        options: [
          'The billing process after a procedure',
          'The immediate, empathetic response when a patient is unhappy',
          'Follow-up calls to collect overdue balances',
          'The process of scheduling a second appointment',
        ],
        correct: 1,
        explanation: 'Service recovery is the immediate, warm response when a patient has a poor experience. At AOST, service recovery happens immediately — never "let me have someone get back to you."',
      },
      {
        q: 'When a surgeon explains every step of a procedure before it happens, this serves what primary purpose?',
        options: [
          'Legal protection for the practice',
          'Reduces procedure time',
          'Removes patient uncertainty and transforms anxiety into trust',
          'Helps the surgical assistant prepare the room',
        ],
        correct: 2,
        explanation: 'Explaining every step before it happens removes uncertainty — which is the root of most patient anxiety. This is how AOST transforms fear into trust, reflected in 1,000+ five-star reviews.',
      },
    ],
  },

  u4: {
    title: 'HIPAA & Privacy',
    passPct: 100,
    questions: [
      {
        q: 'PHI stands for:',
        options: [
          'Patient History Information',
          'Protected Health Information',
          'Primary Health Insurance',
          'Personal Handling Instruction',
        ],
        correct: 1,
        explanation: 'PHI — Protected Health Information — includes any data that can identify a patient: name, DOB, diagnosis, treatment, photos, insurance, or any combination of identifying information.',
      },
      {
        q: 'You overhear a colleague discussing a patient\'s procedure by name in the AOST waiting room. What do you do?',
        options: [
          'Nothing — it was a brief conversation',
          'Note it but wait to see if it happens again',
          'Address it privately with your colleague immediately',
          'Report it to your manager as a potential HIPAA incident',
        ],
        correct: 3,
        explanation: 'Discussing a patient by name in a public or semi-public area is a HIPAA violation. Report it to your manager immediately. Early reporting reduces harm and demonstrates the integrity AOST requires.',
      },
      {
        q: 'You step away from your workstation for 60 seconds to answer a colleague\'s question. What must you do first?',
        options: [
          'Nothing if you\'ll be right back',
          'Log out only if you\'re leaving for lunch',
          'Lock your screen before stepping away',
          'Close any patient tabs but keep the screen unlocked',
        ],
        correct: 2,
        explanation: 'Lock your screen every time you step away — even for 60 seconds. An unlocked screen with patient data visible is a HIPAA exposure, regardless of duration.',
      },
      {
        q: 'A patient calls asking for their friend\'s appointment information. The friend is also an AOST patient. You:',
        options: [
          'Provide the information if they can confirm the friend\'s date of birth',
          'Cannot share any information about another patient without written authorization',
          'Transfer the call to a supervisor',
          'Verify the caller\'s identity first, then share basic information',
        ],
        correct: 1,
        explanation: 'PHI cannot be shared with third parties — including friends and family — without the patient\'s explicit written authorization. This includes appointment information.',
      },
      {
        q: 'HIPAA violations can result in penalties of:',
        options: [
          'A formal warning only',
          '$100 to $50,000 per violation with possible criminal prosecution',
          '$50 to $500 per incident',
          'Termination of employment but no legal consequences',
        ],
        correct: 1,
        explanation: 'HIPAA violations carry civil penalties from $100 to $50,000 per violation, with criminal prosecution possible for willful violations. The practice and the individual team member can both be liable.',
      },
    ],
  },

  u5: {
    title: 'OSHA & Safety',
    passPct: 80,
    questions: [
      {
        q: 'In the Spaulding Classification, "critical instruments" that contact bone or sterile tissue must be:',
        options: [
          'Wiped with a disinfectant wipe between patients',
          'Soaked in a high-level disinfectant solution',
          'Sterilized — no exceptions',
          'Inspected visually and reused if clean',
        ],
        correct: 2,
        explanation: 'Critical instruments that contact bone or tissue must be sterilized via autoclave — no exceptions. If sterilization status is uncertain, the instrument goes back through processing before entering any clinical area.',
      },
      {
        q: 'A bloodborne pathogen exposure occurs when you experience a needlestick. You should:',
        options: [
          'Clean the wound and monitor for symptoms over the next week',
          'Report it immediately and follow the Exposure Control Protocol — time matters',
          'Report it at your next scheduled check-in with your manager',
          'Document it yourself and only report if symptoms develop',
        ],
        correct: 1,
        explanation: 'Any exposure incident must be reported immediately. The Exposure Control Protocol exists precisely for this — time-sensitive steps reduce risk. Never delay reporting a sharps injury or exposure.',
      },
      {
        q: 'PPE in clinical areas at AOST is:',
        options: [
          'Recommended for complex surgical cases',
          'Required only when direct patient contact is expected',
          'Mandatory in all clinical areas — non-negotiable',
          'Optional during consultations',
        ],
        correct: 2,
        explanation: 'PPE is mandatory in all clinical areas. This protects you and every patient. There are no exceptions for "quick" entries into a clinical space.',
      },
      {
        q: 'Before your first patient-facing shift, you must confirm the locations of:',
        options: [
          'Patient parking and the nearest pharmacy',
          'The break room and supply closet',
          'Fire extinguisher, eyewash station, first aid kit, and AED',
          'The surgery schedule and instrument trays',
        ],
        correct: 2,
        explanation: 'Every team member must know the location of emergency equipment at their site: fire extinguisher, eyewash station, first aid kit, and AED. Your office manager will walk you through this during orientation.',
      },
    ],
  },

  u6: {
    title: 'Professional Standards',
    passPct: 80,
    questions: [
      {
        q: 'AOST operates four locations. Which statement best reflects how standards apply across them?',
        options: [
          'Each location develops its own standards based on its patient population',
          'Standards are guidelines that managers interpret based on their team',
          'The AOST standard is identical at all four locations — you are its steward',
          'Standards are set by the surgeons at each individual location',
        ],
        correct: 2,
        explanation: 'The AOST standard is not location-specific. Four locations run as one practice with one standard. Every team member is responsible for maintaining that consistency wherever they work.',
      },
      {
        q: 'In a surgical practice, documentation discipline is:',
        options: [
          'Important but secondary to speed and patient throughput',
          'A legal requirement and a direct patient safety function',
          'Primarily the responsibility of the billing department',
          'Required only for clinical staff with patient contact',
        ],
        correct: 1,
        explanation: 'Documentation in a surgical environment is both a legal requirement and a patient safety function. Every entry is a legal document. Accuracy and timeliness are required, not optional.',
      },
      {
        q: 'When you witness a conflict between two colleagues affecting the team\'s work, the AOST approach is:',
        options: [
          'Ignore it unless it affects patient care directly',
          'Discuss it with other colleagues to understand both sides',
          'Address it directly and professionally between parties, or escalate to management',
          'Wait for management to notice and intervene',
        ],
        correct: 2,
        explanation: 'Conflicts at AOST are addressed directly and professionally, never through gossip or avoidance. If direct resolution isn\'t possible, escalate to management. Unresolved tension affects patient care.',
      },
    ],
  },

  u7: {
    title: 'Communication Standards',
    passPct: 80,
    questions: [
      {
        q: 'Why does AOST use scripted communication standards for patient interactions?',
        options: [
          'Scripts sound more professional than natural conversation',
          'Consistent scripting ensures every patient receives the same excellent experience regardless of who they interact with',
          'Scripts are required by HIPAA',
          'Scripts reduce the need to train staff extensively',
        ],
        correct: 1,
        explanation: 'Consistent scripting means every patient — at every location, with every team member — receives the same excellent experience. It removes the variance of individual performance from the patient experience equation.',
      },
      {
        q: 'A patient calls clearly distressed about pain and an upcoming procedure. Your first response should be:',
        options: [
          'Ask for their date of birth to pull up the account',
          'Explain what to expect at their appointment',
          'Acknowledge their concern warmly before anything else',
          'Transfer them to a clinical team member',
        ],
        correct: 2,
        explanation: 'In an OMS environment, emotion comes before logistics. Acknowledge the patient\'s concern first — "I hear you, let\'s take care of that" — before you ask for account information or explain procedures.',
      },
      {
        q: 'When a patient is waiting and experiencing a delay, the best AOST response is:',
        options: [
          'Wait until a team member is available to address it',
          'Proactively acknowledge the wait and provide a realistic update',
          'Offer a discount on their procedure',
          'Have the front desk avoid the topic unless the patient asks directly',
        ],
        correct: 1,
        explanation: 'Proactive communication about delays eliminates uncertainty. "I know you\'ve been waiting — we\'re about 10 minutes behind and haven\'t forgotten about you" completely changes a patient\'s emotional experience.',
      },
    ],
  },

  // ── FRONT DESK ─────────────────────────────────────────────────────
  fd1: {
    title: 'Scheduling in OMS',
    passPct: 80,
    questions: [
      {
        q: 'Why must OMS scheduling include buffer time between cases?',
        options: [
          'To give team members rest breaks',
          'Because procedure time in surgery varies significantly — anatomy, complexity, and sedation can all extend cases',
          'Insurance companies require minimum gaps between procedures',
          'To allow equipment to cool between uses',
        ],
        correct: 1,
        explanation: 'OMS procedure time is not predictable the way a dental cleaning is. Impaction depth, root morphology, patient response to sedation, and unexpected findings can all extend case time. Buffer protects the day.',
      },
      {
        q: 'Schedule compression in an OMS practice most directly impacts:',
        options: [
          'Only the patients who are waiting',
          'Only the surgeon\'s productivity metrics',
          'Patient safety, staff wellbeing, and the entire back half of the surgical day',
          'Insurance claims processing',
        ],
        correct: 2,
        explanation: 'Schedule compression cascades through the entire day. Under pressure, errors increase, staff stress escalates, and patient experience degrades. Protecting schedule architecture is a patient safety function.',
      },
    ],
  },

  fd2: {
    title: 'Dual Insurance Billing',
    passPct: 80,
    questions: [
      {
        q: 'OMS billing uses which type(s) of procedure codes?',
        options: [
          'CDT codes only (dental)',
          'CPT codes only (medical)',
          'Both CDT and CPT codes depending on the procedure',
          'ICD-10 codes exclusively',
        ],
        correct: 2,
        explanation: 'OMS uses both CDT codes (dental) and CPT codes (medical) depending on the procedure and payer. This dual-billing capability is one of the most important operational distinctions in oral surgery.',
      },
      {
        q: 'Insurance verification at AOST should be completed:',
        options: [
          'When the patient arrives for their appointment',
          'The morning of the procedure',
          'Well in advance of the appointment — not day-of',
          'Only for patients without prior authorization',
        ],
        correct: 2,
        explanation: 'Insurance verification must happen in advance — never day-of. A day-of surprise about coverage creates financial stress for the patient and operational problems for the practice.',
      },
    ],
  },

  fd3: {
    title: 'Referral Network Management',
    passPct: 80,
    questions: [
      {
        q: 'When a referring dentist\'s office calls AOST, that call should be treated as:',
        options: [
          'A standard patient inquiry like any other call',
          'A business relationship touchpoint that deserves priority and professional handling',
          'Transferred immediately to the surgery schedule coordinator',
          'Handled when general patient calls have been addressed',
        ],
        correct: 1,
        explanation: 'Referring offices are AOST\'s primary business partners. How quickly we respond, how warmly we communicate, and how seamlessly we handle their patients determines whether they refer again.',
      },
      {
        q: 'A referring dentist\'s patient has a negative experience at AOST. Who is affected?',
        options: [
          'The patient only',
          'The patient and AOST\'s reputation directly',
          'The patient, AOST, AND the referring dentist\'s reputation with their own patient',
          'Only the team member who was involved',
        ],
        correct: 2,
        explanation: 'When a referring dentist sends a patient to AOST, they are lending their relationship. A poor experience damages trust at three levels: the patient, AOST, and the referring dentist who recommended us.',
      },
    ],
  },

  // ── TREATMENT COORD ────────────────────────────────────────────────
  tc1: {
    title: 'Procedures for Presentation',
    passPct: 80,
    questions: [
      {
        q: 'As a Treatment Coordinator, your primary role in a patient\'s decision-making is:',
        options: [
          'To ensure maximum case acceptance for revenue targets',
          'To educate and empower patients to make informed decisions about their care',
          'To present the most expensive treatment options first',
          'To schedule cases as quickly as possible',
        ],
        correct: 1,
        explanation: 'Treatment coordination is a care function, not a sales function. Your role is to help patients understand their options and make confident, informed decisions — not to close a transaction.',
      },
      {
        q: 'When a patient says "I need to think about it," the best response is:',
        options: [
          'Explain urgency to motivate a faster decision',
          'Offer a discount if they schedule today',
          'Acknowledge the need for time and ask how you can help them reach a decision',
          'Schedule a follow-up call for the next day',
        ],
        correct: 2,
        explanation: 'Respect the patient\'s process. Acknowledge their need for time, ask what would help them decide — more information, family consultation, written materials — and make yourself available. Pressure destroys trust.',
      },
    ],
  },

  tc2: {
    title: 'Financial Conversations',
    passPct: 80,
    questions: [
      {
        q: 'The financial conversation with a patient should happen:',
        options: [
          'Only after the procedure is scheduled',
          'As early as possible in the process, clearly and without jargon',
          'By the billing department after the consultation',
          'After the patient asks about cost',
        ],
        correct: 1,
        explanation: 'Financial clarity early prevents anxiety, dropped cases, and post-treatment billing disputes. The earlier and more clearly cost is communicated, the better the patient experience — and the higher case acceptance.',
      },
      {
        q: 'AOST accepts CareCredit because:',
        options: [
          'It generates referral revenue for AOST',
          'Cost should never be the reason a patient who needs surgical care doesn\'t get it',
          'It is required by major insurance plans',
          'It simplifies the billing process',
        ],
        correct: 1,
        explanation: 'CareCredit and flexible financing exist because AOST believes access to care should not be determined by a patient\'s ability to pay the full amount upfront. Financing removes that barrier.',
      },
    ],
  },

  // ── SURGICAL ASST ──────────────────────────────────────────────────
  sa1: {
    title: 'Surgical Suite Standards',
    passPct: 80,
    questions: [
      {
        q: 'If you are uncertain about the sterilization status of an instrument before a case, you should:',
        options: [
          'Use it if it appears visually clean',
          'Check with the surgeon',
          'Send it back through the sterilization process — it does not enter the room',
          'Wipe it with a disinfectant before use',
        ],
        correct: 2,
        explanation: 'If sterilization status is uncertain, the instrument goes back through processing. There is no grey area. An unsterile instrument entering a surgical field is a patient safety failure.',
      },
      {
        q: 'Room setup in oral surgery is case-specific because:',
        options: [
          'Each surgeon has different preferences about room temperature',
          'Procedure requirements, instruments, and medications vary significantly by case type',
          'Insurance requires different documentation per procedure',
          'OSHA mandates case-specific room configurations',
        ],
        correct: 1,
        explanation: 'A wisdom tooth extraction and a full-arch implant reconstruction require completely different instrumentation, medication setups, and positioning. Case-specific preparation is fundamental to surgical quality.',
      },
    ],
  },

  sa2: {
    title: 'Sedation Awareness',
    passPct: 100,
    questions: [
      {
        q: 'A sedated patient is different from an awake patient because:',
        options: [
          'They require less monitoring',
          'They cannot self-report if something feels wrong — continuous monitoring is the team\'s responsibility',
          'Procedure time is automatically shorter',
          'HIPAA requirements are suspended during sedation',
        ],
        correct: 1,
        explanation: 'A sedated patient cannot tell you if something is wrong. Your continuous monitoring of vital signs and patient status is not a background task — it is the primary patient safety function during sedated procedures.',
      },
      {
        q: 'If vital signs begin to deviate from normal ranges during a procedure, you:',
        options: [
          'Wait to see if they self-correct',
          'Note it in the record and continue monitoring',
          'Alert the surgeon immediately',
          'Adjust the sedation level independently',
        ],
        correct: 2,
        explanation: 'Any deviation from normal vital sign ranges is communicated to the surgeon immediately. You do not wait, you do not self-correct, and you do not make independent sedation adjustments. Alert and communicate.',
      },
    ],
  },

  sa3: {
    title: 'Room Turnover',
    passPct: 80,
    questions: [
      {
        q: 'The correct order for room turnover is:',
        options: [
          'Disinfect surfaces, then remove instruments, then set up for next case',
          'Patient out, instruments removed, all surfaces disinfected, fresh setup completed',
          'Set up next case first while the current patient is in recovery',
          'Wait for sterilization tech to clear the room before anything else begins',
        ],
        correct: 1,
        explanation: 'Patient first — discharge and escort before breakdown begins. Then instruments to sterilization, then full surface disinfection with proper contact time, then fresh case setup. This sequence is non-negotiable.',
      },
    ],
  },

  // ── STERILIZATION ──────────────────────────────────────────────────
  st1: {
    title: 'Infection Control',
    passPct: 100,
    questions: [
      {
        q: 'Which category of instruments requires sterilization before every patient use?',
        options: [
          'Semi-critical instruments only',
          'Non-critical surfaces',
          'Critical instruments that contact bone or sterile tissue',
          'All instruments regardless of contact level',
        ],
        correct: 2,
        explanation: 'Critical instruments — those that contact bone, tissue, or sterile areas — must be sterilized before every use. This is not a guideline, it is the standard on which patient safety depends.',
      },
      {
        q: 'Your role in infection control as a Sterilization Technician is best described as:',
        options: [
          'A support function that assists clinical staff',
          'A compliance function that keeps the practice out of trouble',
          'A patient safety function that is as consequential as any clinical role',
          'An administrative function that processes equipment',
        ],
        correct: 2,
        explanation: 'Sterilization is not background work. A compromised instrument entering a surgical field can cause infection, surgical site complications, and patient harm. Your role is patient safety — treat it that way.',
      },
    ],
  },

  st2: {
    title: 'Instrument Processing',
    passPct: 80,
    questions: [
      {
        q: 'Why must instruments be decontaminated promptly after use, before biofilm can dry?',
        options: [
          'To prevent rust and equipment degradation',
          'Dried biofilm is significantly harder to remove and can compromise sterilization efficacy',
          'OSHA requires immediate decontamination after patient contact',
          'To keep the processing area organized',
        ],
        correct: 1,
        explanation: 'Biofilm that dries on instruments becomes much harder to remove. Pre-rinsing or enzyme soaking before instruments reach the ultrasonic cleaner ensures effective decontamination and protects sterilization outcomes.',
      },
      {
        q: 'What information must be on every instrument package before sterilization?',
        options: [
          'The patient\'s name and procedure type',
          'Content description, date, cycle number, and expiration',
          'The technician\'s initials and processing time',
          'The surgeon\'s name and location',
        ],
        correct: 1,
        explanation: 'Every package must be labeled with its content, processing date, sterilization cycle number, and expiration. This traceability is a compliance requirement and a quality control mechanism.',
      },
    ],
  },

  // ── OFFICE MANAGER ─────────────────────────────────────────────────
  om1: {
    title: 'The Operations Leader Role',
    passPct: 80,
    questions: [
      {
        q: 'As the Operations Leader at your AOST location, your primary responsibility is:',
        options: [
          'Assisting surgeons with complex cases',
          'Ensuring every non-clinical aspect of the practice runs to the AOST standard',
          'Managing the billing department\'s daily output',
          'Coordinating between insurance companies and patients',
        ],
        correct: 1,
        explanation: 'The Operations Leader owns everything non-clinical: systems, team, compliance, patient experience, schedule performance, and operational consistency. The surgeons own the medicine; you own the machine.',
      },
      {
        q: 'The three things AOST surgeons should exclusively focus on are:',
        options: [
          'Surgery, billing, and team hiring',
          'Clinical excellence, patient relations, and referring doctor relationships',
          'Production targets, training, and compliance audits',
          'Surgery, scheduling, and team management',
        ],
        correct: 1,
        explanation: 'Everything that pulls a surgeon away from those three areas is an operational failure. Every system you build, every problem you solve, protects those three lanes.',
      },
      {
        q: 'Managing "up" as an Operations Leader means:',
        options: [
          'Supervising higher-level staff at other locations',
          'Reporting production numbers to corporate headquarters',
          'Navigating the relationship with ownership, communicating operational reality, and earning trust at the leadership level',
          'Advocating for staff compensation increases',
        ],
        correct: 2,
        explanation: 'Managing up is one of the hardest aspects of this role. It means earning the surgeons\' and ownership\'s trust, communicating operational performance with clarity, and being a reliable source of truth — not a filter.',
      },
    ],
  },

  om2: {
    title: 'KPIs & Practice Performance',
    passPct: 80,
    questions: [
      {
        q: 'Days in Accounts Receivable (AR) measures:',
        options: [
          'How many days until the practice\'s next major expense',
          'How long outstanding balances sit before being collected',
          'The number of patients with unpaid balances',
          'Average treatment plan value',
        ],
        correct: 1,
        explanation: 'Days in AR tells you how efficiently the practice collects what it has produced. A healthy OMS practice targets under 30 days. Rising AR is cash sitting outside the practice that belongs inside it.',
      },
      {
        q: 'A high insurance claim denial rate most likely indicates:',
        options: [
          'Patients are choosing not to use their insurance',
          'The practice is seeing more complex cases',
          'Coding errors, missing documentation, or authorization failures in the billing workflow',
          'Insurance companies are becoming more selective',
        ],
        correct: 2,
        explanation: 'Denials are workflow failures, not random events. High denial rates point to specific breakdowns — wrong codes, missing documentation, authorization gaps. Each denial is rework, delayed revenue, and a solvable problem.',
      },
      {
        q: 'Schedule utilization measures:',
        options: [
          'How efficiently the sterilization team processes instruments',
          'The percentage of available surgical time that is filled with cases',
          'How many patients are seen per surgeon per day',
          'Room turnover speed',
        ],
        correct: 1,
        explanation: 'Schedule utilization tells you how much of your available surgical capacity is being used. Empty slots are permanently lost revenue. High cancellation and no-show rates drag this number down.',
      },
    ],
  },

  om3: {
    title: 'Referral Intelligence',
    passPct: 80,
    questions: [
      {
        q: 'When a referring dentist\'s patient has an outstanding experience at AOST, the primary business result is:',
        options: [
          'The patient leaves a Google review',
          'The referring dentist is more likely to refer again and refer more patients',
          'The patient refers their family members directly',
          'AOST improves its insurance contract terms',
        ],
        correct: 1,
        explanation: 'Every great patient experience from a referred patient strengthens the referring dentist\'s confidence in AOST. The downstream effect is more referrals, better relationships, and sustained practice growth.',
      },
      {
        q: 'A referring office that used to send 8 patients per month now sends 3. As Operations Leader, your first move is:',
        options: [
          'Assume it\'s a seasonal variation and monitor next month',
          'Contact the referring office, understand the change, and diagnose whether it\'s relationship or operational',
          'Offer the referring office a gift to re-engage them',
          'Report the decline to the surgeons and ask them to handle it',
        ],
        correct: 1,
        explanation: 'A referral volume drop is a relationship and operational signal. Contact the office directly, listen, and diagnose. Was there a patient experience issue? A competitor? A communication gap? Know before you act.',
      },
    ],
  },

  om4: {
    title: 'Building & Keeping the Team',
    passPct: 80,
    questions: [
      {
        q: 'The most effective approach to interviewing candidates for OMS positions is:',
        options: [
          'Asking "Are you a team player?" and "Do you work well under pressure?"',
          'Using behavioral questions that reveal how candidates have actually handled real situations',
          'Focusing primarily on technical dental knowledge',
          'Reviewing their resume and checking references only',
        ],
        correct: 1,
        explanation: 'Behavioral questions — "Tell me about a time when..." — reveal actual character and capability. Closed questions get rehearsed answers. Behavioral questions get real ones.',
      },
      {
        q: 'The onboarding process at AOST is valuable for retention because:',
        options: [
          'It fulfills a legal requirement for new employee training',
          'A structured, mentorship-based start builds confidence and connection — both key predictors of retention',
          'It reduces the time a new hire requires supervision',
          'It ensures compliance documentation is completed',
        ],
        correct: 1,
        explanation: 'Staffing is one of the biggest challenges in oral surgery. A structured onboarding with assigned mentorship doesn\'t just accelerate performance — it builds the belonging that makes people stay.',
      },
      {
        q: 'Transparency with your team means:',
        options: [
          'Sharing all financial information with every staff member',
          'Being honest about practice performance, expectations, and decisions that affect the team',
          'Allowing staff to review each other\'s performance evaluations',
          'Making all management decisions by team consensus',
        ],
        correct: 1,
        explanation: 'Transparency builds trust and commitment. Teams that understand why decisions are made, what the practice is working toward, and where they stand perform better and stay longer.',
      },
    ],
  },

  om5: {
    title: 'Culture, Accountability & Managing Up',
    passPct: 80,
    questions: [
      {
        q: 'Managing "up" as an Operations Leader means:',
        options: [
          'Supervising higher-level staff at other locations',
          'Reporting production numbers to corporate headquarters',
          'Navigating the relationship with ownership, communicating operational reality, and earning trust at the leadership level',
          'Advocating for staff compensation increases',
        ],
        correct: 2,
        explanation: 'Managing up means earning trust, communicating performance with clarity, and being a reliable source of truth — not a filter.',
      },
      {
        q: 'Culture at AOST is primarily defined by:',
        options: [
          'The mission statement on the website',
          'What a leader allows, rewards, and corrects — one response at a time',
          'The physical environment of the practice',
          'How new team members are introduced to the team',
        ],
        correct: 1,
        explanation: 'Culture is not aspirational language. It is built or eroded by every response a leader makes to every situation.',
      },
    ],
  },
  om6: {
    title: 'Referral Intelligence',
    passPct: 80,
    questions: [
      {
        q: 'When a referring office that used to send 8 patients a month now sends 3, your first move is:',
        options: [
          'Assume it\'s seasonal and monitor next month',
          'Contact the referring office, understand the change, and diagnose whether it\'s relationship or operational',
          'Offer the office a gift to re-engage',
          'Report the decline to the surgeons and ask them to handle it',
        ],
        correct: 1,
        explanation: 'A referral volume drop is a signal. Contact the office directly, listen, and diagnose before acting.',
      },
      {
        q: 'Every process that touches a referred patient is:',
        options: [
          'A clinical quality issue',
          'A billing department function',
          'A referral relationship management process owned by operations',
          'A surgeon communication matter',
        ],
        correct: 2,
        explanation: 'Scheduling responsiveness, patient experience, consultation report turnaround — these are all referral management processes.',
      },
    ],
  },
  om7: {
    title: 'The Operations Leader as Growth Driver',
    passPct: 80,
    questions: [
      {
        q: 'As an AOST Operations Leader, what best defines your success at the highest level?',
        options: [
          'The practice runs well when you are present',
          'The surgeons recognize you by name and appreciate your work',
          'The practice runs consistently regardless of whether you are physically present',
          'You have successfully reduced overhead costs',
        ],
        correct: 2,
        explanation: 'The highest expression of this role is a practice that runs to standard through systems and trained people — not through your constant presence.',
      },
      {
        q: 'Strategic thinking at the Operations Leader level means:',
        options: [
          'Focusing exclusively on this week\'s schedule and staffing',
          'Understanding how today\'s operational decisions affect the practice\'s growth trajectory',
          'Creating long business plans for the surgeons to review',
          'Analyzing competitors and adjusting pricing',
        ],
        correct: 1,
        explanation: 'Strategic thinking connects daily operations to long-term outcomes. Today\'s culture affects next year\'s retention.',
      },
    ],
  },
}
