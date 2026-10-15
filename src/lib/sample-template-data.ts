import { ResumeData } from "@/components/ResumeTemplateRenderer";

/**
 * Fictional demonstration data for template selection preview.
 * Strictly isolated from real user profiles and saved documents.
 * Provides realistic, fully populated demonstration content for every template.
 */

export const SAMPLE_PRO_CLAIRE: ResumeData = {
  personalInfo: {
    fullName: "Claire Russel",
    title: "Computer Science Student",
    email: "email@clairemurh.south",
    phone: "023-456-7920",
    location: "Champaign, IL",
    linkedin: "linkedin.org/in/clairerussel",
    github: "github.com/clairerussel",
    portfolio: "clairelooon.dev",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  },
  summary:
    "Hard working and passionate Computer Science student with an intensive coding background, algorithmic problem solving foundation, and hands-on software development experience. Seeking to leverage strong data structures knowledge and full-stack capabilities to contribute to cutting-edge technical initiatives and software products.",
  skills: {
    technical: [
      "Data Structures & Algorithms",
      "Software Engineering",
      "Machine Learning",
      "Database Management Systems",
      "Object-Oriented Design",
      "Python",
      "Java",
      "C++",
    ],
    tools: ["Git & GitHub", "Linux / Unix", "Docker", "VS Code", "PostgreSQL"],
    concepts: ["Algorithmic Complexity", "REST APIs", "System Architecture", "Unit Testing"],
    soft: ["Global Thinking", "Leadership", "Creativity", "Teamwork", "Adaptability"],
  },
  experience: [
    {
      id: "exp-1",
      title: "Lead Programming Instructor",
      company: "CodeWar Youth Initiative",
      location: "Chicago, IL",
      date: "2022 – Present",
      bullets: [
        "Spearheaded comprehensive programming curriculum and hands-on workshops for underrepresented students across the state.",
        "Mentored 45+ aspiring junior coders in Python foundations, algorithm design, and collaborative open-source workflows.",
      ],
    },
    {
      id: "exp-2",
      title: "Event Coordinator",
      company: "Community STEM Outreach Program",
      location: "Springfield, IL",
      date: "2021 – 2022",
      bullets: [
        "Coordinated large-scale logistics for annual STEM hackathons, hosting 250+ student participants and university sponsors.",
        "Secured competitive grant funding and corporate sponsorships totaling over $15,000 for student computing kits.",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "Bachelor of Science in Computer Science",
      school: "Illinois University",
      date: "Attending – Present",
      location: "Urbana-Champaign, IL",
      bullets: [
        "Data Structures & Algorithms",
        "Software Engineering Principles",
        "Statistical Machine Learning",
        "Database Management Systems",
        "Object-Oriented Development",
      ],
    },
  ],
  projects: [
    {
      id: "proj-1",
      name: "Algorithmic Code Visualizer",
      description: "Interactive browser application rendering pathfinding algorithms and binary search trees in real-time.",
      tech: "React, TypeScript, Web Canvas",
    },
    {
      id: "proj-2",
      name: "Autonomous STEM Drone Firmware",
      description: "Embedded C++ controller for micro quadcopters executing indoor obstacle avoidance routines.",
      tech: "C++, FreeRTOS, Arduino",
    },
  ],
  achievements: [
    {
      id: "ach-1",
      title: "NextGen Coder Society",
      description: "Active Chapter Member & Hackathon Team Lead (2021 – Present)",
    },
    {
      id: "ach-2",
      title: "Be We Tomorrow Initiative",
      description: "Scholarship Recipient & STEM Ambassador (2019 – Present)",
    },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "Google IT Support Professional Certificate",
      issuer: "Google / Coursera",
      date: "2023",
    },
    {
      id: "cert-2",
      name: "Microsoft Azure Fundamentals Certificate (AZ-900)",
      issuer: "Microsoft",
      date: "2023",
    },
    {
      id: "cert-3",
      name: "Certified Cloud Leader",
      issuer: "AWS",
      date: "2022",
    },
  ],
  languages: [
    { id: "lang-1", name: "English", proficiency: "Native / Bilingual Proficiency" },
    { id: "lang-2", name: "Spanish", proficiency: "Professional Working Proficiency" },
    { id: "lang-3", name: "German", proficiency: "Elementary Technical Proficiency" },
  ],
};

export const SAMPLE_PRO_JESSICA: ResumeData = {
  personalInfo: {
    fullName: "Jessica Blakely",
    title: "Senior Game Designer",
    email: "jessica@fectsresums.com",
    phone: "(04) 336-3200",
    location: "Phoenix, AZ",
    portfolio: "jessica.designs.com",
    linkedin: "linkedin.com/in/jessicablakely",
    photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
  },
  summary:
    "Results-driven Game Designer with 8+ years of experience in level design, 3D modeling, and interactive systems. Proven track record leading core design mechanics from concept to multi-platform launch. Proficient in Unreal Engine 5, Blueprints scripting, and procedural level generation with an emphasis on player engagement, intuitive mechanics, and cinematic pacing.",
  skills: {
    technical: [
      "Unreal Engine 5",
      "Blueprints Scripting",
      "Game Systems",
      "Map Drafting",
      "Level Testing & QA",
      "Unity 3D",
      "3D Blocking",
      "Level Design",
      "3D Animation",
      "Behavior Trees",
    ],
    tools: ["Unreal Engine 5", "Blender", "Maya", "Jira", "Perforce (P4)", "Figma"],
    concepts: ["Level Pacing", "Combat Encounters", "Procedural Generation", "Spatial Aesthetics"],
    soft: ["Teamwork", "Pioneering Vision", "Creative Writing", "Player Psychology", "Deadline Driven"],
  },
  experience: [
    {
      id: "exp-1",
      title: "3D Game Designer",
      company: "Octo-tailboard Studios ↗",
      location: "Phoenix, AZ",
      date: "November 2021 – Present",
      bullets: [
        "Spearheaded gameplay mechanics and combat balance for an acclaimed action-RPG, earning the Epic Storytelling Award.",
        "Created interactive encounters and puzzle topologies across 14 diverse biomes, optimizing real-time framerate stability by 30%.",
        "Coordinated with concept artists and technical animators to prototype 40+ boss fight mechanics and physics interactions.",
      ],
    },
    {
      id: "exp-2",
      title: "3D Level & Environment Designer",
      company: "TriQuiet Interactive ↗",
      location: "Tempe, AZ",
      date: "August 2018 – November 2021",
      bullets: [
        "Collaborated with narrative directors to design environmental storytelling beats across 25 expansive game zones.",
        "Constructed high-density 3D level whiteboxes, lighting passes, and collision meshes in Unreal Engine.",
        "Gathered qualitative telemetry feedback from focus playtests to tune platforming navigation and player retention curves.",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "BA in Computer Science, Minor in Game Design",
      school: "Arizona State University ↗",
      date: "June 2021",
      location: "Tempe, AZ",
    },
  ],
  achievements: [
    {
      id: "ach-1",
      title: "Epic Storytelling Award (2021)",
      description: "Awarded by Game Dev Guild for standout narrative integration into environmental level geometry.",
    },
    {
      id: "ach-2",
      title: "Top Design Award — 'Chaotic Realms' (2022)",
      description: "Recognized as Best Emerging Indie Design at United States Independent Game Showcase.",
    },
    {
      id: "ach-3",
      title: "Breakthrough Gameplay Innovation — IndieCade (2019)",
      description: "Honored for pioneering dynamic gravity puzzle mechanics in student capstone game.",
    },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "Unreal Engine 5 Design Specialist (2022) ↗",
      issuer: "Epic Games Academy",
      date: "2022",
    },
    {
      id: "cert-2",
      name: "Comprehensive Level Design Certification ↗",
      issuer: "CG Master Academy",
      date: "2021",
    },
    {
      id: "cert-3",
      name: "Game Architecture & Player Experience ↗",
      issuer: "Frankenment Masterclass",
      date: "2020",
    },
  ],
  languages: [
    { id: "lang-1", name: "English", proficiency: "Native / Bilingual" },
    { id: "lang-2", name: "French", proficiency: "Full Professional" },
    { id: "lang-3", name: "Spanish", proficiency: "Professional Working" },
  ],
};

export const SAMPLE_PRO_ADAM: ResumeData = {
  personalInfo: {
    fullName: "Adam Stotch",
    title: "Licensed Realtor & Property Specialist",
    email: "adam@moresumes.com",
    phone: "(122) 234-7890",
    location: "Orlando, FL",
    linkedin: "adam.development.com",
    portfolio: "linkedin.com/in/adamstotch",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  },
  summary:
    "Dedicated Realtor with 8+ years of high-volume residential and commercial property management experience. Closed over $45M in successful real estate transactions as buyer and seller representative. Recognized as a Certified Property Manager (CPM) committed to maximizing asset value, mitigating closing risks, and delivering five-star client experiences.",
  skills: {
    technical: [
      "Market & Price Analysis",
      "Property Management",
      "Property Manager Software",
      "MLS Database & CMA",
      "Contract Negotiation",
      "Written & Oral Communication",
      "Client Relationship Management",
      "Strategic Networking",
    ],
    tools: ["MLS Matrix", "Dotloop", "Zillow Premier Agent", "AppFolio", "DocuSign"],
    concepts: ["Comparative Market Analysis", "Escrow Logistics", "1031 Exchange", "Title Verification"],
    soft: ["Client Advisory", "High-Stakes Negotiation", "Active Listening", "Integrity & Discretion"],
  },
  experience: [
    {
      id: "exp-1",
      title: "Senior Realtor",
      company: "American Realty & Associates ↗",
      location: "Orlando, FL",
      date: "2018 – Present",
      bullets: [
        "Promoted client listings via targeted digital marketing and MLS syndication, boosting inquiry velocity by 65%.",
        "Closed 85+ residential and commercial transactions totaling $32M in career gross volume with 98% client retention.",
        "Accompanied buyer delegations to evaluate properties, inspect structural foundations, and estimate renovation margins.",
        "Drafted and negotiated compliant purchase agreements, addendums, title insurance, and lender escrow contracts.",
      ],
    },
    {
      id: "exp-2",
      title: "Real Estate Agent",
      company: "Penny Realty Inc. ↗",
      location: "Winter Park, FL",
      date: "2014 – 2018",
      bullets: [
        "Managed end-to-end listing lifecycle for 40+ single-family residences, conducting weekly open houses and private showings.",
        "Assisted first-time homebuyers with loan pre-approvals, FHA financing programs, and title deed transfers.",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "Bachelor of Arts in Business Administration",
      school: "University of Florida",
      date: "2010 – 2014",
      location: "Gainesville, FL",
    },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "Certified Real Estate Broker (CRB) ↗",
      issuer: "Real Estate Business Institute",
      date: "2020",
    },
    {
      id: "cert-2",
      name: "Certified Property Manager (CPM) ↗",
      issuer: "Institute of Real Estate Management (IREM)",
      date: "2019",
    },
    {
      id: "cert-3",
      name: "Certified Real Estate Specialist (CRS) ↗",
      issuer: "Residential Real Estate Council",
      date: "2018",
    },
    {
      id: "cert-4",
      name: "Accredited Buyer's Representative (ABR) ↗",
      issuer: "National Association of Realtors",
      date: "2016",
    },
  ],
  achievements: [
    {
      id: "ach-1",
      title: "National Association of Realtors (NAR) ↗",
      description: "Active Member & Certified Florida Board Representative",
    },
    {
      id: "ach-2",
      title: "Institute of Real Estate Management (IREM) ↗",
      description: "Orlando Chapter Committee Member",
    },
  ],
  languages: [
    { id: "lang-1", name: "English", proficiency: "● ● ● ● ●" },
    { id: "lang-2", name: "Spanish", proficiency: "● ● ● ● ●" },
    { id: "lang-3", name: "French", proficiency: "● ● ● ● ○" },
    { id: "lang-4", name: "German", proficiency: "● ● ○ ○ ○" },
  ],
};

export const SAMPLE_PRO_NICK: ResumeData = {
  personalInfo: {
    fullName: "Nick Koe",
    title: "Professional Event Photographer",
    email: "nick@koephotography.com",
    phone: "+1 (123) 444-2222",
    location: "San Francisco, CA",
    portfolio: "nick-koe.com",
    linkedin: "linkedin.com/in/nickkoe",
    photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
  },
  summary:
    "Creative and detail-oriented Event Photographer with 6+ years of professional experience capturing high-profile weddings, corporate summits, and intimate private events. Highly proficient in multi-point strobe lighting, documentary photojournalism, and post-production color grading. Renowned for curated editorial albums delivering a 25% subscriber growth for lifestyle magazines. Expert in Adobe Lightroom and Capture One Pro.",
  skills: {
    technical: [
      "Composition & Framing",
      "Studio & Ambient Lighting",
      "Editorial Photo Editing",
      "Color Grading & LUTs",
      "Candid Documentary Photography",
      "Event & Gala Coverage",
      "Adobe Photoshop CC",
      "Adobe Lightroom Classic",
      "Capture One Pro",
    ],
    tools: ["Sony A7R V", "Profoto Strobe Systems", "Adobe Lightroom", "Capture One", "Photoshop"],
    concepts: ["Documentary Storytelling", "High-Dynamic-Range Lighting", "Color Science", "Fast Ingestion Workflows"],
    soft: ["Creativity", "Attention to Detail", "Adaptability Under Pressure", "Client Rapport", "Fast Turnaround"],
  },
  experience: [
    {
      id: "exp-1",
      title: "Wedding & Editorial Photographer",
      company: "Elegant Bride Magazine ↗",
      location: "San Francisco, CA",
      date: "08/2021 – Present",
      bullets: [
        "Produced over 250 high-fashion bridal editorials, showcasing diverse venue lighting conditions and wedding couture.",
        "Collaborated closely with creative directors and editors to curate cover imagery and 12-page centerfold feature spreads.",
        "Engineered a digital raw ingestion pipeline in Capture One Pro, reducing client gallery turnaround from 14 days to 4 days.",
      ],
    },
    {
      id: "exp-2",
      title: "Lead Event Photographer",
      company: "Freelance Visual Media ↗",
      location: "San Francisco, CA",
      date: "12/2018 – 08/2021",
      bullets: [
        "Captured bespoke photo sets for 45+ premier corporate galas, tech conferences, and celebrity private receptions.",
        "Achieved unanimous 5-star reviews on freelance vendor platforms, resulting in an 80% repeat booking client base.",
        "Operated multi-camera setups with synchronized speedlights to photograph low-light evening celebrations without disruption.",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "Bachelor of Fine Arts (B.F.A.) in Photography",
      school: "Columbus State University",
      date: "2014 – 2018",
      location: "Columbus, GA",
    },
  ],
  projects: [
    {
      id: "proj-1",
      name: "Wedding Photography Portfolio ↗",
      description: "Captured both candid and editorial images using natural and artificial lighting setups for over 40+ high-budget weddings.",
      url: "https://www.koephotography.com/weddings",
    },
    {
      id: "proj-2",
      name: "Corporate Photography Portfolio ↗",
      description: "Documented 30+ corporate summits, tech product launches, and charity galas with same-day press deliverables.",
      url: "https://www.koephotography.com/corporate",
    },
    {
      id: "proj-3",
      name: "Fine Art Event Collection ↗",
      description: "Vast archival collection of candid portraits capturing authentic emotions and cinematic compositions.",
      url: "https://www.koephotography.com/fine-art",
    },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "Adobe Lightroom: Advanced Techniques (2022) ↗",
      issuer: "Philanthropy & Arts Guild",
      date: "2022",
    },
    {
      id: "cert-2",
      name: "Adobe Photoshop: Advanced Techniques (2020) ↗",
      issuer: "Creative University",
      date: "2020",
    },
    {
      id: "cert-3",
      name: "Capture One Pro: Mastering Workflow and Editing (2020) ↗",
      issuer: "Udemy / Phase One",
      date: "2020",
    },
  ],
  languages: [
    { id: "lang-1", name: "English", proficiency: "Native / Bilingual" },
    { id: "lang-2", name: "French", proficiency: "Professional Working" },
    { id: "lang-3", name: "Spanish", proficiency: "Professional Working" },
  ],
};

export const SAMPLE_PRO_LISA: ResumeData = {
  personalInfo: {
    fullName: "Lisa Neumann",
    title: "Senior Mechanical Engineer",
    email: "lisa.neumann@resumesite.com",
    phone: "(123) 456-0233",
    location: "Philadelphia, PA",
    linkedin: "linkedin.com/in/lisa.neumann",
    portfolio: "neumann-engineering.com",
  },
  summary:
    "Methodical, results-oriented Mechanical Engineering professional with 8+ years of expertise designing industrial HVAC, thermodynamics, and high-efficiency mechanical systems for commercial facilities. Proven track record managing $15M+ engineering capital budgets, delivering compliant engineering blueprints, and spearheading Six Sigma process optimizations that boosted industrial manufacturing output by 8%.",
  skills: {
    technical: [
      "Autodesk Revit",
      "Building Information Modeling (BIM)",
      "Energy Modeling Programs",
      "AutoCAD Mechanical",
      "MS Office Advanced",
      "Intermediate Python & MATLAB",
      "City of Philadelphia Building Codes",
      "Scrum & Agile Methodology",
      "Master Tech & Trello",
    ],
    tools: ["Revit BIM", "AutoCAD", "Carrier HAP", "Trane TRACE 700", "SolidWorks", "Python"],
    concepts: ["HVAC Psychrometrics", "Hydronic Piping", "ASHRAE 90.1 Compliance", "Thermal Load Calculations"],
    soft: [
      "Time Management",
      "Analytical Mathematics",
      "Technical Documentation",
      "Cross-Functional Leadership",
      "Engineering Communication",
      "Project Management",
    ],
  },
  experience: [
    {
      id: "exp-1",
      title: "Mechanical / HVAC Project Engineer",
      company: "TechWise Systems",
      location: "Philadelphia, PA",
      date: "11/2021 – Present",
      bullets: [
        "Spearheaded multiple complex projects designing mechanical and HVAC systems for high-profile commercial facilities.",
        "Managed 5 concurrent projects with an individual capital budget of over $4 million each, ensuring on-schedule completion.",
        "Developed and fully implemented technical drawings and innovative schematics, resulting in an 8% increase in industrial output.",
        "Led and collaborated with a team of 20+ junior mechanical engineers to design, establish, and validate cooling tower preservation statistics.",
      ],
    },
    {
      id: "exp-2",
      title: "Mechanical Application Engineer",
      company: "Systematic Engineering Co.",
      location: "Philadelphia, PA",
      date: "03/2016 – 10/2021",
      bullets: [
        "Revamped and streamlined project management methodologies to ensure all equipment specifications, budgets, and schedules were strictly tracked.",
        "Extensively optimized hand/AO and navigation tools to identify structural stresses and implement critical engineering improvements.",
      ],
    },
    {
      id: "exp-3",
      title: "Junior Mechanical Engineer",
      company: "Flextronics Corporation",
      location: "Philadelphia, PA",
      date: "08/2014 – 01/2016",
      bullets: [
        "Demonstrated strong attention to detail, focus, and expert inspection to analyze assembly line throughput and elevate quality standards by 7%.",
        "Assisted in planning for efficient workforce allocation and assisted teams to optimize business workflow, resulting in more than 15% annual production capacity growth.",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "Bachelor of Science in Mechanical Engineering",
      school: "Western Michigan University",
      date: "09/2010 – 06/2014",
      location: "Kalamazoo, MI",
    },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "Six Sigma Green Belt Certified (2014)",
      issuer: "American Society for Quality (ASQ)",
      date: "2014",
    },
    {
      id: "cert-2",
      name: "Pennsylvania Professional Engineer (PE #88491) (2012)",
      issuer: "Commonwealth of Pennsylvania",
      date: "2012",
    },
    {
      id: "cert-3",
      name: "EPA 608 Universal Certification for HVAC Systems",
      issuer: "Environmental Protection Agency",
      date: "2015",
    },
  ],
  languages: [
    { id: "lang-1", name: "English", proficiency: "Native or Bilingual Proficiency" },
    { id: "lang-2", name: "Spanish", proficiency: "Full Professional Proficiency" },
    { id: "lang-3", name: "French", proficiency: "Full Professional Proficiency" },
  ],
};

export const SAMPLE_PRO_MICHELLE: ResumeData = {
  personalInfo: {
    fullName: "Michelle Dhamar",
    title: "Healthcare Industry Volunteer",
    email: "michelle@example.com",
    phone: "(123) 456-7890",
    location: "Oklahoma City, OK",
    linkedin: "michelle.com/n/michelledhamar",
    portfolio: "@michelledhamar",
    photoUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80",
  },
  summary:
    "Dedicated healthcare volunteer with hands-on experience in patient care and patient reception protocols. Proficient in managing clinical operations, supporting healthcare teams in fast-paced clinical environments, and fostering modern compassionate patient experience. Fluent in English, Spanish, and Mandarin with a steadfast commitment to cultural sensitivity in clinical delivery.",
  skills: {
    technical: [
      "Time Management",
      "Strong Interpersonal Skills",
      "Reception & Patient Fronting",
      "Records Maintenance",
      "First Aid & Patient Care",
      "Teamwork & Collaboration",
      "Inventory Management",
    ],
    tools: [
      "Epic EHR",
      "Cerner",
      "Vital Signs Monitoring",
      "HIPAA Compliance",
      "Sterilization Protocols",
    ],
    concepts: [
      "Patient Triage",
      "Clinical Documentation",
      "Compassionate Care",
      "Outpatient Transport",
    ],
    soft: [
      "Time Management",
      "Strong Interpersonal Skills",
      "Reception & Patient Fronting",
      "Records Maintenance",
      "First Aid & Patient Care",
      "Teamwork & Collaboration",
      "Inventory Management",
    ],
  },
  experience: [
    {
      id: "exp-1",
      title: "Hospital Volunteer",
      company: "Care & Cure Premium Hospital",
      location: "Oklahoma City, OK",
      date: "03/2021 – Present",
      bullets: [
        "Deliver efficient assistance to nurses and clinical care staff in coordinating patient admittance and outpatient transport.",
        "Provide patient reception support, resolving inquiries promptly and maintaining accurate triage logs across department units.",
        "Participate in outreach campaigns and local community wellness events to guide preventative health education.",
        "Maintain sanitary standards and replenish sterilized supplies across clinical preparation and examination bays.",
      ],
    },
    {
      id: "exp-2",
      title: "Volunteer Nursing Assistant",
      company: "Healthy&More Medicare",
      location: "Oklahoma City, OK",
      date: "07/2017 – 02/2021",
      bullets: [
        "Monitored patient records to ensure that all clinical documentation adhered strictly to HIPAA compliance protocols.",
        "Observed patient vital signs, logged physical symptoms, and reported condition shifts immediately to supervising doctors.",
        "Assisted in patient mobilization, rehabilitation exercises, and daily comfort routines under supervision.",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "Master of Science in Healthcare Administration (Anticipated May 2026)",
      school: "University of Oklahoma Health Sciences Center",
      date: "Anticipated May 2026",
      location: "Oklahoma City, OK",
    },
    {
      id: "edu-2",
      degree: "Bachelor of Science in Nursing",
      school: "Oklahoma University",
      date: "2017 – 2021",
      location: "Norman, OK",
    },
  ],
  projects: [
    {
      id: "proj-1",
      name: "Patient Education Initiative",
      description: "Developed suite of bilingual educational booklets and digital resources to educate patients on care management and post-discharge recovery.",
      tech: "Bilingual Patient Outreach",
    },
    {
      id: "proj-2",
      name: "Volunteer Induction Coordinator Study",
      description: "Authored structured orientation workflows and onboarding checklists, training 25+ incoming hospital volunteers on patient interaction ethics.",
      tech: "Healthcare Operations",
    },
  ],
  achievements: [
    {
      id: "ach-1",
      title: "National Association of Healthcare Assistants (NAHCA)",
      description: "Active Member & Volunteer Chapter Lead (2021 – Present)",
    },
    {
      id: "ach-2",
      title: "National Network of Career Nursing Assistants",
      description: "Member & Annual Conference Delegate (2017 – Present)",
    },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "Basic Life Support (BLS) (2021)",
      issuer: "American Heart Association (AHA)",
      date: "2021",
    },
    {
      id: "cert-2",
      name: "Certified Nursing Assistant (CNA) (2021)",
      issuer: "Oklahoma State Department of Health",
      date: "2021",
    },
    {
      id: "cert-3",
      name: "Mental Health First Aid Certification (2022)",
      issuer: "National Council for Mental Wellbeing",
      date: "2022",
    },
  ],
  languages: [
    { id: "lang-1", name: "English", proficiency: "Native / Bilingual Proficiency" },
    { id: "lang-2", name: "Spanish", proficiency: "Professional Working Proficiency" },
    { id: "lang-3", name: "Chinese (Mandarin)", proficiency: "Clinical Healthcare Proficiency" },
    { id: "lang-4", name: "Japanese", proficiency: "Conversational Healthcare Proficiency" },
  ],
};

export const SAMPLE_PRO_CATHERINE: ResumeData = {
  personalInfo: {
    fullName: "Catherine Barnett",
    title: "Senior 3D Character Animator & VFX Artist",
    email: "catherine.barnett@animstudio.com",
    phone: "+1 (310) 555-0192",
    location: "Los Angeles, CA",
    linkedin: "linkedin.com/in/catherinebarnett",
    portfolio: "catherinebarnett.art",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  },
  summary:
    "Award-winning 3D Character Animator with 8+ years of experience bringing lifelike characters and cinematic sequences to life in AAA video games and feature animated films. Expert in Autodesk Maya, Blender, and Unreal Engine 5 with deep expertise in character rigging, facial mocap retargeting, and physics-based kinematics. Recognized for leading animation sequences on two multi-million unit grossing studio titles.",
  skills: {
    technical: [
      "Autodesk Maya",
      "Blender 4.0",
      "Unreal Engine 5",
      "ZBrush",
      "Houdini FX",
      "Substance 3D Painter",
      "Python Scripting",
      "Mel Scripting",
    ],
    tools: [
      "Perforce (P4)",
      "Git",
      "ShotGrid / Flow Production",
      "Jira",
      "Adobe After Effects",
      "Premiere Pro",
      "Figma",
    ],
    concepts: [
      "Character Rigging",
      "Facial Mocap Retargeting",
      "Keyframe Animation",
      "Kinematics & Weight",
      "Cloth & Hair Dynamics",
      "Blend Trees",
    ],
    soft: [
      "Creative Direction",
      "Cross-Disciplinary Teamwork",
      "Mentorship & Training",
      "Visual Storytelling",
      "Problem Solving Under Tight Deadlines",
    ],
  },
  experience: [
    {
      id: "exp-1",
      title: "Lead Character Animator",
      company: "Titanium Interactive Games",
      location: "Los Angeles, CA",
      date: "2021 – Present",
      bullets: [
        "Directed a core squad of 7 animators producing 45+ minutes of cinematic gameplay animations in Unreal Engine 5.",
        "Engineered an automated facial rigging pipeline in Maya, accelerating motion-capture processing times by 35%.",
        "Partnered with combat designers to sculpt over 140 fluid, 60-FPS combat attack chains and boss battle movements.",
        "Mentored junior and mid-level artists in kinematic balance, silhouette clarity, and facial expression nuance.",
      ],
    },
    {
      id: "exp-2",
      title: "Senior 3D Animator",
      company: "Blue Horizon Animation Studios",
      location: "Burbank, CA",
      date: "2018 – 2021",
      bullets: [
        "Keyframed hero character performances and creature motion for two critically acclaimed animated feature films.",
        "Supervised optical motion-capture sessions with professional stunt actors and calibrated marker point datasets.",
        "Optimized character blend trees and animation state machines, reducing real-time memory footprint by 22%.",
      ],
    },
    {
      id: "exp-3",
      title: "3D Generalist & Rigging Specialist",
      company: "Vanguard Visual Media",
      location: "San Francisco, CA",
      date: "2016 – 2018",
      bullets: [
        "Constructed production-ready bipedal and quadruped skeletal rigs equipped with inverse kinematics and squash-and-stretch controls.",
        "Delivered 3D animated visual assets for high-impact commercial campaigns airing on national broadcast television.",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "Bachelor of Fine Arts (B.F.A.) in Character Animation",
      school: "California Institute of the Arts (CalArts)",
      field: "Character Animation & Digital Arts",
      date: "2012 – 2016",
      location: "Valencia, CA",
      score: "3.92 GPA — Summa Cum Laude",
    },
  ],
  projects: [
    {
      id: "proj-1",
      name: "Chronicles of Aethelgard (Unreal Engine 5)",
      tech: "Unreal Engine 5, Maya, ZBrush",
      description:
        "Authored all hero character locomotion and combat cinematic trailers, garnering over 4.5 million global views.",
      url: "https://catherinebarnett.art/chronicles",
    },
    {
      id: "proj-2",
      name: "AutoRig Pro Tools for Maya",
      tech: "Python, PySide, Maya API",
      description:
        "Open-source modular rigging suite downloaded by over 14,000 independent artists and game development studios.",
      url: "https://github.com/catherinebarnett/autorig-maya",
    },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "Autodesk Certified Professional: Maya 3D Animation",
      issuer: "Autodesk",
      date: "2022",
    },
    {
      id: "cert-2",
      name: "Unreal Engine Authorized Instructor — Virtual Production",
      issuer: "Epic Games",
      date: "2023",
    },
  ],
  achievements: [
    {
      id: "ach-1",
      title: "Annie Award Nominee (2022)",
      description: "Nominated for Outstanding Achievement in Character Animation for Feature Production.",
    },
    {
      id: "ach-2",
      title: "SIGGRAPH Electronic Theater Official Selection (2020)",
      description: "Short animated film 'Pulse' showcased in the prestigious international animation showcase.",
    },
  ],
  languages: [
    { id: "lang-1", name: "English", proficiency: "Native / Bilingual" },
    { id: "lang-2", name: "French", proficiency: "Professional Working" },
  ],
};

export const SAMPLE_PRO_CHRIS_FLIMS: ResumeData = {
  personalInfo: {
    fullName: "Chris Flims",
    title: "Senior Technical Project Manager & Agile Delivery Lead",
    email: "chris.flims@pmadvisory.io",
    phone: "+1 (212) 555-0841",
    location: "New York, NY (Remote)",
    linkedin: "linkedin.com/in/chrisflims",
    portfolio: "chrisflims.pm",
  },
  summary:
    "Certified PMP and Agile Delivery Director with 9+ years managing cross-functional distributed engineering squads across North America and Europe. Specializes in cloud infrastructure transitions, enterprise SaaS release governance, and high-velocity Scrum workflows. Champion of transparent sprint reporting with a 98.4% on-time milestone delivery track record across $15M+ technology portfolios.",
  skills: {
    technical: [
      "Agile & Scrum Delivery",
      "SAFe Enterprise Framework",
      "Cloud Migration (AWS/Azure)",
      "CI/CD Release Governance",
      "Software Development Lifecycle (SDLC)",
      "Sprint Velocity Analytics",
      "SLA & KPI Tracking",
    ],
    tools: [
      "Jira Enterprise & Align",
      "Confluence",
      "Linear",
      "Asana",
      "GitHub Projects",
      "Miro",
      "Tableau",
      "Power BI",
      "Slack API",
    ],
    concepts: [
      "Risk Governance & Mitigation",
      "Capacity & Resource Planning",
      "Budget Allocation ($15M+)",
      "Vendor Contract Negotiations",
      "Executive Stakeholder Alignment",
    ],
    soft: [
      "Servant Leadership",
      "Cross-Cultural Team Alignment",
      "Conflict Resolution",
      "Executive Board Presentations",
      "Change Management",
    ],
  },
  experience: [
    {
      id: "exp-1",
      title: "Principal Technical Project Manager",
      company: "CloudScale Enterprise Systems",
      location: "New York, NY (Remote)",
      date: "2021 – Present",
      bullets: [
        "Steer end-to-end delivery of multi-tenant cloud modernization initiatives serving 2.4M enterprise end-users.",
        "Lead 4 distributed Scrum pods (34 engineers, QA, and UX designers) through bi-weekly CI/CD production releases.",
        "Introduced automated sprint risk telemetry in Jira, decreasing delivery estimation variances by 28%.",
        "Governed an annual technology capital budget of $6.5M, consistently finishing deliverables 8% under budget.",
      ],
    },
    {
      id: "exp-2",
      title: "Senior Scrum Master & Delivery Manager",
      company: "Apex Digital Solutions",
      location: "Boston, MA",
      date: "2017 – 2021",
      bullets: [
        "Transformed traditional waterfall teams to agile methodology, increasing squad deployment frequency by 4x.",
        "Facilitated backlog grooming, sprint planning, daily stand-ups, and retrospectives for 3 cross-functional teams.",
        "Mitigated cross-dependency blockers across mobile, backend, and data engineering departments with zero outages.",
      ],
    },
    {
      id: "exp-3",
      title: "IT Project Coordinator",
      company: "Beacon Global Technologies",
      location: "Boston, MA",
      date: "2015 – 2017",
      bullets: [
        "Monitored work breakdowns, sprint schedules, and milestone burn-down charts across 12 concurrent software releases.",
        "Maintained stakeholder dashboards and centralized knowledge bases, reducing onboarding time for new hires by 40%.",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "Master of Science in Information Systems & Technology Management",
      school: "New York University (NYU)",
      field: "Information Systems Management",
      date: "2015 – 2017",
      location: "New York, NY",
      score: "3.88 GPA",
    },
    {
      id: "edu-2",
      degree: "Bachelor of Science in Computer Science",
      school: "Boston University",
      field: "Computer Science",
      date: "2011 – 2015",
      location: "Boston, MA",
      score: "Magna Cum Laude",
    },
  ],
  projects: [
    {
      id: "proj-1",
      name: "Global Multi-Tenant Cloud Migration",
      tech: "AWS, Kubernetes, Terraform, Jira",
      description:
        "Orchestrated cross-continental cutover of 180 microservices to AWS cloud with zero unplanned customer downtime.",
      url: "https://chrisflims.pm/cloud-migration",
    },
    {
      id: "proj-2",
      name: "Enterprise Agile Playbook Standard",
      tech: "SAFe, Scrum, Confluence, Jira Align",
      description:
        "Drafted standard operating framework and sprint governance model adopted by over 450 engineers globally.",
      url: "https://chrisflims.pm/agile-playbook",
    },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "Project Management Professional (PMP)",
      issuer: "Project Management Institute (PMI)",
      date: "2020",
    },
    {
      id: "cert-2",
      name: "Certified ScrumMaster (CSM)",
      issuer: "Scrum Alliance",
      date: "2018",
    },
    {
      id: "cert-3",
      name: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "2022",
    },
  ],
  achievements: [
    {
      id: "ach-1",
      title: "Global Delivery Excellence Award (2023)",
      description: "Recognized as Top Project Leader across CloudScale's worldwide engineering organization.",
    },
    {
      id: "ach-2",
      title: "24 Consecutive Sprints at 100% Commitment (2022)",
      description: "Maintained unprecedented 100% sprint commitment fulfillment across all 4 engineering squads.",
    },
  ],
  languages: [
    { id: "lang-1", name: "English", proficiency: "Native" },
    { id: "lang-2", name: "Spanish", proficiency: "Professional Working" },
  ],
};

export const SAMPLE_PRO_WILL_TRIBIAN: ResumeData = {
  personalInfo: {
    fullName: "Will Tribian",
    title: "Creative Director & Professional Performance Artist",
    email: "will.tribian@theaterarts.co.uk",
    phone: "+44 20 7946 0912",
    location: "London, UK & Los Angeles, CA",
    linkedin: "linkedin.com/in/willtribian",
    portfolio: "willtribian.com",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  },
  summary:
    "Versatile Creative Director and accomplished stage and screen performer with 10+ years leading theatrical productions, voice artistry, and narrative direction. Trained at the Royal Academy of Dramatic Art (RADA) with extensive West End and international festival credits. Proven expertise directing ensemble casts of 40+, designing immersive soundscapes, and executing complex physical stagecraft.",
  skills: {
    technical: [
      "Stage Direction & Blocking",
      "Classical & Contemporary Acting",
      "Vocal Projection & Dialects",
      "Voiceover & ADR Narration",
      "Stage Combat (BASSC Certified)",
      "Physical Theater & Mime",
    ],
    tools: [
      "QLab Sound Automation",
      "Pro Tools HD",
      "Logic Pro X",
      "Final Draft 12",
      "Audacity",
      "Sibelius Notation",
    ],
    concepts: [
      "Textual Analysis & Deconstruction",
      "Ensemble Choreography",
      "Immersive Theatre Design",
      "Rehearsal Room Leadership",
      "Acoustic Staging & Spatialization",
    ],
    soft: [
      "Dynamic Presence & Charisma",
      "Emotional Intelligence",
      "Mentorship of Emerging Actors",
      "Crisis Management in Live Performance",
    ],
  },
  experience: [
    {
      id: "exp-1",
      title: "Associate Director & Lead Performer",
      company: "West End National Players",
      location: "London, UK",
      date: "2020 – Present",
      bullets: [
        "Headlined 190+ live performances across critically acclaimed classical drama revivals in London's West End.",
        "Directed daily staging rehearsals, fight choreography, and vocal warm-up regimens for an ensemble of 28 artists.",
        "Co-designed soundscapes and lighting triggers with Olivier-winning technical teams for seamless multi-sensory execution.",
      ],
    },
    {
      id: "exp-2",
      title: "Voice Artist & Narrative Lead",
      company: "SoundStage Creative Media",
      location: "Bristol, UK",
      date: "2016 – 2020",
      bullets: [
        "Voiced 16 primary characters across BAFTA-nominated video game franchises and BBC audio drama broadcasts.",
        "Supervised voice casting, character dialect authenticity, and dialogue localization for European releases.",
      ],
    },
    {
      id: "exp-3",
      title: "Resident Ensemble Actor",
      company: "Royal Shakespeare Company Tour",
      location: "Stratford-upon-Avon & International",
      date: "2014 – 2016",
      bullets: [
        "Performed in 3 flagship Shakespearean productions across 14 international touring venues to sold-out audiences.",
        "Conducted educational masterclasses on classical meter and physical expression for youth drama institutes.",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "Bachelor of Arts (B.A. Hons) in Acting & Performance",
      school: "Royal Academy of Dramatic Art (RADA)",
      field: "Dramatic Arts & Performance",
      date: "2011 – 2014",
      location: "London, UK",
      score: "First Class Honours",
    },
  ],
  projects: [
    {
      id: "proj-1",
      name: "The Tempest Reimagined (West End)",
      tech: "Live Ensemble, QLab, Spatialized Audio",
      description:
        "Sold-out 14-week engagement at The Old Vic Theatre; garnered widespread acclaim and 5-star reviews from The Times and The Guardian.",
      url: "https://willtribian.com/the-tempest",
    },
    {
      id: "proj-2",
      name: "Echoes of Eternity Audio Drama Series",
      tech: "Binaural Audio, Voice Acting, Pro Tools",
      description:
        "Original 8-part historical fantasy podcast series achieving over 2.1 million unique downloads globally.",
      url: "https://willtribian.com/echoes",
    },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "British Academy of Stage & Screen Combat (BASSC) Advanced Certification",
      issuer: "BASSC",
      date: "2018",
    },
    {
      id: "cert-2",
      name: "Estill Voice Training — Complete Levels 1 & 2",
      issuer: "Estill Voice International",
      date: "2020",
    },
  ],
  achievements: [
    {
      id: "ach-1",
      title: "Laurence Olivier Award Nominee (2021)",
      description: "Nominated for Best Actor in a Supporting Role for 'The Tempest Reimagined'.",
    },
    {
      id: "ach-2",
      title: "Ian Charleson Award Special Commendation (2016)",
      description: "Recognized for exceptional classical performance by an actor under 30 in the UK.",
    },
  ],
  languages: [
    { id: "lang-1", name: "English", proficiency: "Native" },
    { id: "lang-2", name: "French", proficiency: "Fluent" },
    { id: "lang-3", name: "Italian", proficiency: "Conversational" },
  ],
};

export const SAMPLE_PRO_AMANDA_SMITH: ResumeData = {
  personalInfo: {
    fullName: "Amanda Smith",
    title: "Chief Information Officer & VP Technology",
    email: "amanda.smith@pearsystems.com",
    phone: "+1 (312) 555-4412",
    location: "Chicago, IL",
    linkedin: "linkedin.com/in/amandasmith-cio",
    portfolio: "amandasmith.cio",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
  },
  summary:
    "Visionary Enterprise CIO and digital transformation executive with 15+ years steering modern multi-cloud architectures, cybersecurity compliance, and organizational restructuring. Manages $45M+ technology capital budgets and 140+ IT personnel across North America, EMEA, and APAC. Track record of reducing infrastructure operating costs by 34% while scaling enterprise uptime to 99.995%.",
  skills: {
    technical: [
      "Enterprise Cloud Architecture (AWS / Azure)",
      "Zero-Trust Cybersecurity & SOC2",
      "Disaster Recovery & Business Continuity",
      "Global ERP & CRM Consolidation",
      "Data Governance & Modern Lakehouses",
      "AI & Machine Learning Infrastructure",
    ],
    tools: [
      "ServiceNow Enterprise",
      "SAP S/4HANA Cloud",
      "Salesforce Platform",
      "Snowflake Data Cloud",
      "CrowdStrike Falcon",
      "Datadog Enterprise",
      "Okta Identity Cloud",
      "Splunk SIEM",
    ],
    concepts: [
      "P&L & Capital Budget Governance ($45M+)",
      "Regulatory Compliance (GDPR, HIPAA, PCI-DSS)",
      "M&A Technology Due Diligence & Integration",
      "Vendor Contract Optimization",
      "SLA Architecture (99.995%)",
    ],
    soft: [
      "Board of Directors Governance",
      "Executive Strategic Foresight",
      "Global Talent Retention",
      "Organizational Culture Evolution",
    ],
  },
  experience: [
    {
      id: "exp-1",
      title: "Chief Information Officer",
      company: "Pear Global Enterprise Systems",
      location: "Chicago, IL",
      date: "2019 – Present",
      bullets: [
        "Steer global corporate IT roadmap, enterprise cybersecurity posture, data platform governance, and cloud procurement.",
        "Architected enterprise zero-trust security paradigm, mitigating 100% of advanced external intrusion attempts over 4 years.",
        "Consolidated 14 disparate ERP and CRM instances into a unified SAP S/4HANA cloud core, unlocking $12.8M in annualized OPEX.",
        "Spearheaded enterprise infrastructure modernization, lifting availability from 99.8% to 99.995% across 22 worldwide locations.",
      ],
    },
    {
      id: "exp-2",
      title: "Vice President of Infrastructure & Enterprise IT",
      company: "Vanguard Financial Group",
      location: "Chicago, IL",
      date: "2014 – 2019",
      bullets: [
        "Governed hybrid cloud infrastructure and data center footprint supporting $85B in daily real-time transactional throughput.",
        "Supervised annual SOC2 Type II, ISO 27001, and PCI-DSS compliance audits with zero non-conformity findings.",
        "Restructured engineering teams to autonomous DevOps pods, improving deployment cadence by 350%.",
      ],
    },
    {
      id: "exp-3",
      title: "Director of Systems Architecture",
      company: "Summit Healthcare Solutions",
      location: "Evanston, IL",
      date: "2010 – 2014",
      bullets: [
        "Engineered secure, HIPAA-compliant patient data exchange network linking 48 regional hospital facilities.",
        "Executed datacenter virtualization, reducing hardware procurement expenditure by $4.2M over a three-year cycle.",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "Master of Science in Computer Science & Distributed Networks",
      school: "Northwestern University",
      field: "Distributed Computing & Network Architecture",
      date: "2008 – 2010",
      location: "Evanston, IL",
      score: "3.95 GPA",
    },
    {
      id: "edu-2",
      degree: "Bachelor of Science in Electrical & Computer Engineering",
      school: "University of Illinois Urbana-Champaign",
      field: "Computer Engineering",
      date: "2004 – 2008",
      location: "Urbana, IL",
      score: "Summa Cum Laude",
    },
  ],
  projects: [
    {
      id: "proj-1",
      name: "Global Zero-Trust Network Architecture",
      tech: "Okta, Zscaler, CrowdStrike, AWS",
      description:
        "Modernized access and endpoint security across 15,000 corporate devices in 34 countries with biometric MFA.",
      url: "https://amandasmith.cio/zero-trust",
    },
    {
      id: "proj-2",
      name: "Enterprise Data Fabric & Predictive AI",
      tech: "Snowflake, Databricks, AWS SageMaker",
      description:
        "Centralized transactional and analytical data, enabling automated executive forecasting and real-time BI.",
      url: "https://amandasmith.cio/data-fabric",
    },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "Certified Information Security Manager (CISM)",
      issuer: "ISACA",
      date: "2018",
    },
    {
      id: "cert-2",
      name: "Certified Information Systems Security Professional (CISSP)",
      issuer: "(ISC)²",
      date: "2016",
    },
    {
      id: "cert-3",
      name: "AWS Certified Solutions Architect — Professional",
      issuer: "Amazon Web Services",
      date: "2021",
    },
  ],
  achievements: [
    {
      id: "ach-1",
      title: "Chicago CIO of the Year ORBIE Award Winner (2023)",
      description: "Honored by the Premier CIO Association for transformative technological excellence and leadership.",
    },
    {
      id: "ach-2",
      title: "Top 50 Women in Enterprise Technology (2022)",
      description: "Featured in National Technology Review for ground-breaking multi-cloud governance and innovation.",
    },
  ],
  languages: [
    { id: "lang-1", name: "English", proficiency: "Native" },
    { id: "lang-2", name: "German", proficiency: "Professional Working" },
  ],
};

export const SAMPLE_ATS_SUPPLY_CHAIN: ResumeData = {
  personalInfo: {
    fullName: "David Vance, CSCP",
    title: "Director of Global Supply Chain & Logistics Operations",
    email: "david.vance@supplychainexec.com",
    phone: "+1 (214) 555-0371",
    location: "Dallas, TX",
    linkedin: "linkedin.com/in/davidvance-supplychain",
    portfolio: "davidvance.logistics",
  },
  summary:
    "Results-driven Global Supply Chain Executive with 12+ years optimizing international freight, warehouse automation, multi-site distribution networks, and strategic supplier procurement. Expert in SAP S/4HANA, Lean Six Sigma methodologies, and inventory forecasting. Successfully reduced end-to-end cycle times by 32% and delivered $18M in procurement cost reductions across multinational consumer and industrial manufacturing portfolios.",
  skills: {
    technical: [
      "Global Supply Chain Optimization",
      "Warehouse Management Systems (WMS)",
      "SAP S/4HANA & Oracle SCM",
      "Strategic Sourcing & Vendor Negotiation",
      "Demand Planning & S&OP",
      "Customs Compliance & Trade Regulations",
      "Fleet & Carrier Route Optimization",
    ],
    tools: [
      "SAP Integrated Business Planning",
      "Manhattan WMS",
      "Blue Yonder (JDA)",
      "Tableau SCM Analytics",
      "Power BI",
      "Microsoft Excel (Advanced VBA)",
    ],
    concepts: [
      "Lean Six Sigma Black Belt",
      "Total Cost of Ownership (TCO)",
      "Inventory Turn Optimization",
      "Cold Chain & Safety Compliance",
      "KPI Dashboards (OTIF, DSI, Fill Rate)",
    ],
    soft: [
      "Executive Negotiation",
      "Multi-Facility Team Leadership",
      "Vendor Relationship Management",
      "Cross-Functional Strategic Planning",
    ],
  },
  experience: [
    {
      id: "exp-1",
      title: "Director of Global Supply Chain Operations",
      company: "Apex Industrial Logistics Corp",
      location: "Dallas, TX",
      date: "2020 – Present",
      bullets: [
        "Oversee global supply chain operations spanning 6 distribution fulfillment centers, 1,200 fleet vehicles, and 850 personnel.",
        "Pioneered automated goods-to-person robotic picking systems, driving a 44% increase in daily fulfillment throughput.",
        "Renegotiated ocean and air freight master service agreements with top carriers, cutting annual transport expenditures by $6.8M.",
        "Maintained 99.4% On-Time In-Full (OTIF) fulfillment rate across 4.2 million customer shipments annually.",
      ],
    },
    {
      id: "exp-2",
      title: "Senior Supply Chain & Procurement Manager",
      company: "Titanium Manufacturing International",
      location: "Fort Worth, TX",
      date: "2016 – 2020",
      bullets: [
        "Governed strategic raw material sourcing and inventory planning across 18 tier-one suppliers in North America and Asia.",
        "Implemented Lean Six Sigma Kaizen initiatives across assembly hubs, eliminating $3.2M in annual manufacturing waste.",
        "Implemented vendor performance scorecards that increased supplier compliance and quality conformance from 88% to 98.7%.",
      ],
    },
    {
      id: "exp-3",
      title: "Logistics Analyst & Warehouse Supervisor",
      company: "Centurion Freight Systems",
      location: "Houston, TX",
      date: "2013 – 2016",
      bullets: [
        "Built predictive inventory restocking algorithms in SAP, reducing inventory stockout events by 38% in year one.",
        "Audited customs documentation and hazardous material handling records to guarantee 100% DOT and OSHA compliance.",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "Master of Business Administration (MBA) in Supply Chain & Operations",
      school: "University of Texas at Austin — McCombs School of Business",
      field: "Supply Chain & Operations",
      date: "2014 – 2016",
      location: "Austin, TX",
      score: "3.91 GPA",
    },
    {
      id: "edu-2",
      degree: "Bachelor of Science in Industrial Engineering",
      school: "Texas A&M University",
      field: "Industrial & Systems Engineering",
      date: "2009 – 2013",
      location: "College Station, TX",
    },
  ],
  projects: [
    {
      id: "proj-1",
      name: "Robotic Automated Distribution Center Launch",
      tech: "Manhattan WMS, Autonomous Mobile Robots (AMRs), SAP S/4HANA",
      description:
        "Designed and executed 450,000 sq ft smart distribution facility completed on-time and $1.2M below budget.",
      url: "https://davidvance.logistics/amr-launch",
    },
    {
      id: "proj-2",
      name: "Global Freight Optimization Model",
      tech: "Python, Tableau, Oracle Transportation Management",
      description:
        "Engineered multi-modal transport routing algorithm saving 1,800 metric tons of carbon emissions and $2.4M annually.",
      url: "https://davidvance.logistics/freight-model",
    },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "Certified Supply Chain Professional (CSCP)",
      issuer: "APICS / Association for Supply Chain Management",
      date: "2018",
    },
    {
      id: "cert-2",
      name: "Lean Six Sigma Black Belt (LSSBB)",
      issuer: "American Society for Quality (ASQ)",
      date: "2017",
    },
  ],
  achievements: [
    {
      id: "ach-1",
      title: "National Supply Chain Leader of the Year (2022)",
      description: "Recognized by CSCMP for groundbreaking supply chain resilience during global container disruptions.",
    },
    {
      id: "ach-2",
      title: "Zero Lost-Time Incidents Across 3 Years",
      description: "Led multi-facility operations with a perfect OSHA safety record across 850 frontline personnel.",
    },
  ],
  languages: [
    { id: "lang-1", name: "English", proficiency: "Native" },
    { id: "lang-2", name: "Spanish", proficiency: "Professional Working" },
  ],
};

export const SAMPLE_ATS_HEALTHCARE: ResumeData = {
  personalInfo: {
    fullName: "Dr. Evelyn Reed, MD, CPHIMS",
    title: "Director of Clinical Operations & Health Informatics",
    email: "evelyn.reed@clinicalsystems.org",
    phone: "+1 (617) 555-0482",
    location: "Boston, MA",
    linkedin: "linkedin.com/in/evelynreed-md",
    portfolio: "evelynreed.health",
  },
  summary:
    "Board-certified physician and healthcare executive with 11+ years leading clinical workflow transformation, hospital administration, and Electronic Health Record (EHR) optimization. Proven track record directing large hospital system clinical operations across 640 beds and 1,800 medical staff. Expert in Epic EHR rollout, Joint Commission compliance, patient safety metrics, and reducing diagnostic turnaround times by 40%.",
  skills: {
    technical: [
      "Clinical Workflow Optimization",
      "Epic EHR System Architecture",
      "Inpatient & Outpatient Hospital Operations",
      "Healthcare Quality & Patient Safety (CQI)",
      "Telehealth Strategy & Implementation",
      "Joint Commission (JCAHO) & HIPAA Compliance",
      "Clinical Decision Support Systems (CDSS)",
    ],
    tools: [
      "Epic Systems (Hyperspace/Cogito)",
      "Cerner Millennium",
      "MEDITECH",
      "Tableau Healthcare Analytics",
      "SAS Clinical Data Integration",
      "Microsoft Power BI",
    ],
    concepts: [
      "Evidence-Based Medicine Protocols",
      "ICD-10 / CPT Clinical Documentation Improvement (CDI)",
      "Patient Satisfaction (HCAHPS) Enhancement",
      "Clinical Resource Allocation",
    ],
    soft: [
      "Interprofessional Medical Staff Governance",
      "Patient-Centered Empathy & Communication",
      "Executive Crisis Management",
      "Clinical Ethics Guidance",
    ],
  },
  experience: [
    {
      id: "exp-1",
      title: "Director of Clinical Operations & Chief Medical Informatics Officer",
      company: "Beacon Hill Memorial Health System",
      location: "Boston, MA",
      date: "2019 – Present",
      bullets: [
        "Direct clinical operations, patient safety protocols, and health informatics across an academic medical center with 640 beds.",
        "Spearheaded enterprise-wide Epic EHR optimization, reducing physician clinical documentation time by 1.8 hours per shift.",
        "Boosted institutional HCAHPS patient satisfaction percentiles from the 62nd to the 94th percentile nationally over 3 years.",
        "Governed clinical resource allocation during high-census operational surges, preserving a 0% emergency diversion record.",
      ],
    },
    {
      id: "exp-2",
      title: "Associate Medical Director — Quality & Safety",
      company: "New England Regional Health",
      location: "Cambridge, MA",
      date: "2015 – 2019",
      bullets: [
        "Instituted standardized hospital-acquired infection (HAI) prevention protocols, driving a 52% reduction in central line infections.",
        "Chaired institutional morbidity and mortality reviews, establishing computerized order entry safety alerts preventing medication errors.",
        "Collaborated with nursing leadership to launch multi-disciplinary daily bedside rounding across 8 inpatient departments.",
      ],
    },
    {
      id: "exp-3",
      title: "Attending Physician & Clinical Instructor",
      company: "Boston Academic Medical Center",
      location: "Boston, MA",
      date: "2013 – 2015",
      bullets: [
        "Provided comprehensive diagnostic and therapeutic care in high-acuity inpatient settings while training 24 resident physicians.",
        "Authored 8 peer-reviewed clinical research papers on hospital informatics and diagnostic workflow speed.",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "Doctor of Medicine (M.D.)",
      school: "Harvard Medical School",
      field: "Medicine",
      date: "2005 – 2009",
      location: "Boston, MA",
      score: "Alpha Omega Alpha Honor Society",
    },
    {
      id: "edu-2",
      degree: "Master of Science in Health Informatics (MSHI)",
      school: "Boston University",
      field: "Health Informatics",
      date: "2010 – 2012",
      location: "Boston, MA",
    },
  ],
  projects: [
    {
      id: "proj-1",
      name: "Enterprise Clinical Decision Support AI",
      tech: "Epic Cogito, Python, Machine Learning Alert Engine",
      description:
        "Deployed real-time sepsis early-warning telemetry algorithm, reducing septic shock mortality by 31% hospital-wide.",
      url: "https://evelynreed.health/sepsis-ai",
    },
    {
      id: "proj-2",
      name: "Regional Telehealth Network",
      tech: "Epic MyChart, WebRTC, HIPAA Cloud",
      description:
        "Expanded outpatient telehealth care network to over 85,000 rural and specialized consultations annually.",
      url: "https://evelynreed.health/telehealth",
    },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "Certified Professional in Healthcare Information & Management Systems (CPHIMS)",
      issuer: "HIMSS",
      date: "2018",
    },
    {
      id: "cert-2",
      name: "Board Certified in Internal Medicine & Clinical Informatics",
      issuer: "American Board of Internal Medicine (ABIM)",
      date: "2013",
    },
  ],
  achievements: [
    {
      id: "ach-1",
      title: "Healthcare Leadership Innovation Award (2022)",
      description: "Recognized by Massachusetts Hospital Association for outstanding physician burnout reduction programs.",
    },
    {
      id: "ach-2",
      title: "Top 40 Under 40 in Healthcare Technology",
      description: "Featured in Modern Healthcare for pioneering digital bedside charting.",
    },
  ],
  languages: [
    { id: "lang-1", name: "English", proficiency: "Native" },
    { id: "lang-2", name: "Spanish", proficiency: "Medical Bilingual" },
  ],
};

export const SAMPLE_ATS_ENGINEERING: ResumeData = {
  personalInfo: {
    fullName: "Marcus Chen",
    title: "Principal Distributed Systems & Cloud Infrastructure Engineer",
    email: "marcus.chen@distributedstack.io",
    phone: "+1 (206) 555-0914",
    location: "Seattle, WA",
    linkedin: "linkedin.com/in/marcuschen-eng",
    portfolio: "marcuschen.dev",
    github: "github.com/marcuschen-dev",
  },
  summary:
    "Principal Software & Systems Engineer with 10+ years architecting high-throughput distributed architectures, cloud-native Kubernetes orchestration, and mission-critical payment pipelines. Creator and core maintainer of open-source cloud tooling. Proven expertise in Go, Rust, and AWS/GCP infrastructure handling over 450,000 requests per second with sub-10ms p99 latency SLAs and 99.999% availability.",
  skills: {
    technical: [
      "Go (Golang)",
      "Rust",
      "Kubernetes & Docker",
      "Distributed Consensus (Raft/Paxos)",
      "Apache Kafka & RabbitMQ",
      "gRPC & Protocol Buffers",
      "PostgreSQL & CockroachDB",
      "Redis & Memcached",
    ],
    tools: [
      "Terraform & Pulumi",
      "Prometheus & Grafana",
      "Jaeger & OpenTelemetry",
      "GitHub Actions & ArgoCD",
      "AWS (EKS, RDS, SQS, DynamoDB)",
      "Linux Kernel Performance Profiling (eBPF)",
    ],
    concepts: [
      "Event-Driven Architecture",
      "CAP Theorem & High Availability",
      "Zero-Downtime Database Migrations",
      "Disaster Recovery & Chaos Engineering",
      "Site Reliability Engineering (SRE)",
    ],
    soft: [
      "Technical Architecture Mentorship",
      "Cross-Squad Technical Roadmapping",
      "Incident Response & Post-Mortem Leadership",
    ],
  },
  experience: [
    {
      id: "exp-1",
      title: "Principal Infrastructure Engineer",
      company: "Stratosphere Cloud Platforms",
      location: "Seattle, WA",
      date: "2021 – Present",
      bullets: [
        "Architect and lead the global platform engineering group overseeing 8 multi-region Kubernetes clusters running 4,500+ microservices.",
        "Engineered an event streaming ingestion engine in Go and Kafka that processes 450,000 msgs/sec at p99 latency <8ms.",
        "Spearheaded zero-trust service mesh transition using Istio and mTLS, satisfying SOC2 Type II and FedRAMP standards.",
        "Decreased annualized AWS cloud infrastructure expenditure by $3.4M through automated spot instance bin-packing.",
      ],
    },
    {
      id: "exp-2",
      title: "Senior Distributed Systems Engineer",
      company: "Apex Payments Corporation",
      location: "San Francisco, CA",
      date: "2017 – 2021",
      bullets: [
        "Re-architected core debit payment ledger using CockroachDB and Go, scaling transactional capacity by 500% with zero downtime.",
        "Implemented automated Canary deployments and automated rollbacks via ArgoCD, reducing release defect incidents by 70%.",
        "Conducted chaos engineering drills with Gremlin to validate automatic failover under multi-datacenter network partition scenarios.",
      ],
    },
    {
      id: "exp-3",
      title: "Software Engineer — Backend Infrastructure",
      company: "HyperScale Digital Media",
      location: "San Jose, CA",
      date: "2014 – 2017",
      bullets: [
        "Built low-latency real-time video transcoding and CDN routing endpoints in Go and C++ serving 35M monthly viewers.",
        "Authored custom eBPF network monitoring probes to diagnose TCP latency spikes across AWS VPC gateways.",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "Master of Science in Computer Science & Distributed Systems",
      school: "University of Washington",
      field: "Distributed Systems & Cloud Computing",
      date: "2012 – 2014",
      location: "Seattle, WA",
      score: "3.94 GPA",
    },
    {
      id: "edu-2",
      degree: "Bachelor of Science in Computer Engineering",
      school: "University of California, Berkeley",
      field: "Computer Science & Engineering",
      date: "2008 – 2012",
      location: "Berkeley, CA",
      score: "High Honors",
    },
  ],
  projects: [
    {
      id: "proj-1",
      name: "FluxRaft — High-Performance Consensus Engine (Rust)",
      tech: "Rust, Raft Consensus, Async Tokio, RocksDB",
      description:
        "Open-source distributed state-machine consensus engine with over 3,800 GitHub stars and 120,000 crates.io downloads.",
      url: "https://github.com/marcuschen-dev/fluxraft",
    },
    {
      id: "proj-2",
      name: "KubeAutoscale Operator (Go)",
      tech: "Go, Kubernetes Operator SDK, Prometheus Metrics",
      description:
        "Custom Kubernetes CRD controller autoscaling workloads according to real-time Kafka consumer lag metrics.",
      url: "https://github.com/marcuschen-dev/kube-autoscale",
    },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "Certified Kubernetes Administrator (CKA)",
      issuer: "Cloud Native Computing Foundation (CNCF)",
      date: "2021",
    },
    {
      id: "cert-2",
      name: "AWS Certified Solutions Architect — Professional",
      issuer: "Amazon Web Services",
      date: "2020",
    },
  ],
  achievements: [
    {
      id: "ach-1",
      title: "Keynote Speaker at KubeCon North America (2022)",
      description: "Delivered keynote on 'Zero-Downtime Cloud Migration at 500k RPS' to an audience of 8,000+ engineers.",
    },
    {
      id: "ach-2",
      title: "Stratosphere Engineering Innovation Prize (2023)",
      description: "Awarded top honor for engineering the multi-region automated disaster recovery platform.",
    },
  ],
  languages: [
    { id: "lang-1", name: "English", proficiency: "Native" },
    { id: "lang-2", name: "Mandarin Chinese", proficiency: "Fluent" },
  ],
};

export const SAMPLE_ATS_MANAGEMENT: ResumeData = {
  personalInfo: {
    fullName: "Sarah Jenkins, MBA",
    title: "Vice President of Operations & General Manager",
    email: "sarah.jenkins@execops.org",
    phone: "+1 (404) 555-0829",
    location: "Atlanta, GA",
    linkedin: "linkedin.com/in/sarahjenkins-exec",
    portfolio: "sarahjenkins.ops",
  },
  summary:
    "Executive Vice President with 14+ years commanding multi-site enterprise operations, cross-border business integrations, and global P&L management exceeding $80M. Proven track record leading 600+ personnel across North America and Europe, driving 28% compound revenue growth, and orchestrating 3 successful post-merger integrations. Expert in operational restructuring, Lean management, and digital customer excellence.",
  skills: {
    technical: [
      "Executive P&L Management ($80M+)",
      "Post-Merger Integration (M&A)",
      "Strategic Business Expansion",
      "Multi-Facility Enterprise Governance",
      "Lean Operations & Continuous Improvement",
      "Customer Success & NPS Acceleration",
    ],
    tools: [
      "Workday HCM",
      "Salesforce CRM Enterprise",
      "NetSuite ERP",
      "Power BI Executive Dashboards",
      "Tableau",
      "Microsoft Teams / Slack Enterprise",
    ],
    concepts: [
      "Balanced Scorecard Methodology",
      "EBITDA Margin Optimization",
      "Talent Succession Planning",
      "Enterprise Change Management",
      "Regulatory Compliance & Risk Governance",
    ],
    soft: [
      "Executive Board Presentations",
      "High-Performance Culture Cultivation",
      "Strategic Visionary Leadership",
      "High-Stakes Contract Negotiations",
    ],
  },
  experience: [
    {
      id: "exp-1",
      title: "Vice President of Operations & General Manager",
      company: "Pinnacle Commercial Enterprises",
      location: "Atlanta, GA",
      date: "2019 – Present",
      bullets: [
        "Hold full P&L accountability for a $85M operating unit with 12 operating facilities and 580 cross-functional team members.",
        "Elevated EBITDA margins from 14.2% to 22.8% within 3 fiscal years by eliminating redundant processes and deploying automated ERP workflows.",
        "Supervised the seamless operational integration of a $28M acquisition, consolidating systems and retaining 96% of key leadership talent.",
        "Increased Net Promoter Score (NPS) from +42 to +76 by introducing white-glove client success and rapid-response protocols.",
      ],
    },
    {
      id: "exp-2",
      title: "Senior Director of Global Operations",
      company: "Centurion Industrial Corporation",
      location: "Charlotte, NC",
      date: "2015 – 2019",
      bullets: [
        "Managed 6 manufacturing and fulfillment plants delivering $120M in commercial customer shipments annually.",
        "Pioneered enterprise-wide Lean Six Sigma transformation, yielding $9.5M in cumulative operating expense reductions over 4 years.",
        "Negotiated multi-year strategic vendor agreements that curtailed raw materials expenditure by 16%.",
      ],
    },
    {
      id: "exp-3",
      title: "Operations Manager & Senior Strategic Analyst",
      company: "Deloitte Consulting LLP",
      location: "Atlanta, GA",
      date: "2011 – 2015",
      bullets: [
        "Advised Fortune 500 C-suite executives on organizational restructuring, cost takeout strategies, and operational benchmarking.",
        "Conducted operational due diligence on 8 private equity acquisition targets valued collectively over $1.4B.",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "Master of Business Administration (MBA)",
      school: "Harvard Business School",
      field: "General Management & Operations",
      date: "2009 – 2011",
      location: "Boston, MA",
      score: "Baker Scholar (Top 5% of Class)",
    },
    {
      id: "edu-2",
      degree: "Bachelor of Science in Economics",
      school: "Duke University",
      field: "Economics & Public Policy",
      date: "2005 – 2009",
      location: "Durham, NC",
      score: "Summa Cum Laude",
    },
  ],
  projects: [
    {
      id: "proj-1",
      name: "Enterprise Digital Operating System Rollout",
      tech: "NetSuite ERP, Salesforce, Power BI",
      description:
        "Unified 12 regional operational databases into centralized cloud reporting cockpit, saving 25,000 administrative hours annually.",
      url: "https://sarahjenkins.ops/digital-os",
    },
    {
      id: "proj-2",
      name: "M&A Integration Blueprint",
      tech: "Change Management, Workday, Asana Enterprise",
      description:
        "Created end-to-end post-merger integration framework reducing operational harmonization timeframes from 14 to 5 months.",
      url: "https://sarahjenkins.ops/ma-blueprint",
    },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "Lean Six Sigma Master Black Belt (MBB)",
      issuer: "Six Sigma Management Institute",
      date: "2018",
    },
    {
      id: "cert-2",
      name: "Executive Certificate in Strategy & Innovation",
      issuer: "MIT Sloan School of Management",
      date: "2021",
    },
  ],
  achievements: [
    {
      id: "ach-1",
      title: "Executive of the Year Award (2023)",
      description: "Honored by the Atlanta Business Chronicle for exceptional operational growth and community impact.",
    },
    {
      id: "ach-2",
      title: "Zero Lost-Time Workdays Across 5 Years",
      description: "Recognized with National Safety Council Excellence Honor for safeguarding 600+ personnel.",
    },
  ],
  languages: [
    { id: "lang-1", name: "English", proficiency: "Native" },
    { id: "lang-2", name: "German", proficiency: "Professional Working" },
  ],
};

export const SAMPLE_ATS_TWO_COLUMN_BLUE: ResumeData = {
  personalInfo: {
    fullName: "Alex Morgan",
    title: "Lead Business Intelligence & Data Architect",
    email: "alex.morgan@databiapp.com",
    phone: "+1 (415) 555-0184",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/alexmorgan-bi",
    portfolio: "alexmorgan.data",
    github: "github.com/alexmorgan-data",
  },
  summary:
    "Data Architect and Business Intelligence Lead with 8+ years creating modern cloud data warehouses, ELT streaming pipelines, and executive dashboards. Proven track record turning raw transactional event streams into predictive data models supporting $200M in digital sales. Expert in Snowflake, dbt, PostgreSQL, Python, and Tableau, reducing report generation times by 75% while maintaining 99.9% pipeline SLA compliance.",
  skills: {
    technical: [
      "Snowflake Data Cloud",
      "SQL (Advanced Windowing)",
      "Python (Pandas, Polars)",
      "dbt (Data Build Tool)",
      "Apache Airflow & Prefect",
      "Tableau & Power BI",
      "PostgreSQL & BigQuery",
      "Data Modeling (Kimball / Inmon)",
    ],
    tools: [
      "Fivetran & Airbyte",
      "Docker",
      "Git & GitHub Actions",
      "AWS (S3, Redshift, Glue)",
      "Jira",
      "Looker & Metabase",
    ],
    concepts: [
      "Star & Snowflake Schemas",
      "Slowly Changing Dimensions (SCD)",
      "Data Quality & Great Expectations",
      "Automated CI/CD for Analytics",
      "Data Governance & GDPR Masking",
    ],
    soft: [
      "Executive Storytelling with Data",
      "Cross-Functional Stakeholder Alignment",
      "Data Literacy Coaching",
      "Agile Analytics Sprints",
    ],
  },
  experience: [
    {
      id: "exp-1",
      title: "Lead BI & Data Architect",
      company: "Starlight Digital Commerce",
      location: "San Francisco, CA",
      date: "2021 – Present",
      bullets: [
        "Architect and maintain modern Snowflake and dbt lakehouse processing 120M+ customer clickstream events daily.",
        "Built 24 executive and departmental Tableau dashboards leveraged daily by C-suite leaders and 180 product managers.",
        "Decreased cloud warehouse computing costs by 38% via automated clustering keys, query pruning, and warehouse scaling.",
        "Implemented automated data testing with Great Expectations, catching 99.6% of schema drifts prior to production tables.",
      ],
    },
    {
      id: "exp-2",
      title: "Senior Data Analytics Engineer",
      company: "Apex Financial Analytics",
      location: "San Francisco, CA",
      date: "2018 – 2021",
      bullets: [
        "Engineered reliable batch and streaming ELT pipelines connecting Stripe, Salesforce, and Google Ads into BigQuery.",
        "Constructed customer churn prediction model in Python that lifted retention marketing campaign conversions by 24%.",
        "Mentored a team of 4 junior data analysts on SQL query optimization and reproducible version-controlled analytics.",
      ],
    },
    {
      id: "exp-3",
      title: "Data Analyst & SQL Specialist",
      company: "Pacific Horizon Media",
      location: "Oakland, CA",
      date: "2016 – 2018",
      bullets: [
        "Authored complex SQL queries and automated weekly sales KPI reporting, saving 15 manual analyst hours every week.",
        "Audited data integrity across marketing attribution pipelines to ensure accurate CAC and LTV metrics.",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "Bachelor of Science in Data Science & Computer Science",
      school: "University of California, Berkeley",
      field: "Data Science & Statistics",
      date: "2012 – 2016",
      location: "Berkeley, CA",
      score: "3.85 GPA — Honors",
    },
  ],
  projects: [
    {
      id: "proj-1",
      name: "Automated dbt Cloud CI/CD Pipeline",
      tech: "dbt Core, Snowflake, GitHub Actions, Docker",
      description:
        "Open-source template for zero-downtime analytics deployments with automated pull-request preview environments.",
      url: "https://github.com/alexmorgan-data/dbt-snowflake-ci",
    },
    {
      id: "proj-2",
      name: "Executive KPI Cockpit (Tableau & Snowflake)",
      tech: "Tableau, SQL, Airflow",
      description:
        "Real-time revenue attribution engine serving 8,000+ daily queries with sub-second dashboard rendering speed.",
      url: "https://alexmorgan.data/kpi-cockpit",
    },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "Snowflake SnowPro Core Certified Architect",
      issuer: "Snowflake",
      date: "2022",
    },
    {
      id: "cert-2",
      name: "dbt Certified Developer",
      issuer: "dbt Labs",
      date: "2021",
    },
  ],
  achievements: [
    {
      id: "ach-1",
      title: "Tableau Public Featured Author (2022)",
      description: "Interactive data visualization on global renewable energy adoption viewed over 250,000 times.",
    },
    {
      id: "ach-2",
      title: "Starlight Annual Innovation Award",
      description: "Recognized for building the automated revenue forecasting engine supporting enterprise IPO readiness.",
    },
  ],
  languages: [
    { id: "lang-1", name: "English", proficiency: "Native" },
    { id: "lang-2", name: "Mandarin", proficiency: "Conversational" },
  ],
};

export const SAMPLE_ATS_TWO_COLUMN_DARK: ResumeData = {
  personalInfo: {
    fullName: "Michael Scott",
    title: "Senior Full-Stack Software Architect",
    email: "michael.scott@fullstackcloud.io",
    phone: "+1 (512) 555-0294",
    location: "Austin, TX",
    linkedin: "linkedin.com/in/michaelscott-dev",
    portfolio: "michaelscott.tech",
    github: "github.com/michaelscott-arch",
  },
  summary:
    "Full-Stack Architect with 9+ years architecting web applications, cloud-native services, and real-time collaboration engines. Expert in TypeScript, React, Next.js, Node.js, and PostgreSQL. Architected SaaS products serving 3M+ active users with 99.98% reliability. Focused on modern web performance, automated testing suites, and developer experience.",
  skills: {
    technical: [
      "TypeScript & JavaScript (ESNext)",
      "React 19 & Next.js App Router",
      "Node.js & Express / NestJS",
      "PostgreSQL & Prisma ORM",
      "Tailwind CSS & Radix UI",
      "GraphQL & RESTful APIs",
      "Redis & BullMQ Caching",
      "Docker & Kubernetes",
    ],
    tools: [
      "Git & GitHub Actions",
      "Vercel & AWS (ECS, RDS, S3)",
      "Jest, Vitest & Playwright",
      "Datadog & Sentry",
      "Figma",
      "Linear & Jira",
    ],
    concepts: [
      "Server-Side Rendering (SSR) & Streaming",
      "Microservices & Event Sourcing",
      "Domain-Driven Design (DDD)",
      "Zero-Downtime Database Migrations",
      "WCAG 2.1 AA Web Accessibility",
    ],
    soft: [
      "Technical Roadmapping",
      "Developer Mentorship & Pair Programming",
      "Code Review Standards",
      "Cross-Functional Collaboration",
    ],
  },
  experience: [
    {
      id: "exp-1",
      title: "Principal Full-Stack Architect",
      company: "Novus SaaS Technologies",
      location: "Austin, TX",
      date: "2021 – Present",
      bullets: [
        "Lead technical architecture for a multi-tenant B2B platform servicing 3.2M monthly active professional users.",
        "Migrated legacy monolithic application to Next.js App Router and microservices, slashing initial page load times by 55%.",
        "Engineered real-time collaborative document editing engine using WebSockets and CRDTs with sub-20ms synchronization.",
        "Instituted standardized CI/CD automated test suites achieving 88% branch coverage across 140,000 lines of TypeScript.",
      ],
    },
    {
      id: "exp-2",
      title: "Senior Full-Stack Engineer",
      company: "Apex Cloud Innovations",
      location: "Austin, TX",
      date: "2018 – 2021",
      bullets: [
        "Architected high-throughput payment and subscription management service handling $35M in ARR transactions.",
        "Engineered reusable design system component library in React, accelerating product feature shipping velocity by 40%.",
        "Optimized complex PostgreSQL query execution plans and database indexes, reducing p95 API response times to 45ms.",
      ],
    },
    {
      id: "exp-3",
      title: "Full-Stack Software Developer",
      company: "Starlight Digital Studio",
      location: "Dallas, TX",
      date: "2015 – 2018",
      bullets: [
        "Developed custom client web applications using React, Node.js, and MongoDB for Fortune 500 enterprise accounts.",
        "Integrated third-party APIs including Stripe, Auth0, Twilio, and SendGrid with automated error logging.",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "Bachelor of Science in Computer Science",
      school: "University of Texas at Austin",
      field: "Software Engineering & Computer Science",
      date: "2011 – 2015",
      location: "Austin, TX",
      score: "3.88 GPA — High Honors",
    },
  ],
  projects: [
    {
      id: "proj-1",
      name: "HyperSync — Collaborative State Engine",
      tech: "TypeScript, WebSockets, CRDT, Redis",
      description:
        "Open-source conflict-free replicated data type engine for real-time collaborative apps with 2,400+ GitHub stars.",
      url: "https://github.com/michaelscott-arch/hypersync",
    },
    {
      id: "proj-2",
      name: "NextJS Production Enterprise Starter",
      tech: "Next.js 15, Tailwind CSS, Prisma, Postgres",
      description:
        "Production-ready SaaS template downloaded by over 18,000 developers with built-in auth, billing, and tenancy.",
      url: "https://michaelscott.tech/next-starter",
    },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "AWS Certified Solutions Architect — Associate",
      issuer: "Amazon Web Services",
      date: "2021",
    },
    {
      id: "cert-2",
      name: "Certified Kubernetes Application Developer (CKAD)",
      issuer: "Linux Foundation / CNCF",
      date: "2022",
    },
  ],
  achievements: [
    {
      id: "ach-1",
      title: "Austin Tech Innovator Award (2023)",
      description: "Recognized for architecting resilient distributed SaaS software during hyper-growth scaling.",
    },
    {
      id: "ach-2",
      title: "HackAustin Grand Prize Winner",
      description: "Built decentralized real-time document signing platform in 48 hours out of 120 participating teams.",
    },
  ],
  languages: [
    { id: "lang-1", name: "English", proficiency: "Native" },
    { id: "lang-2", name: "Spanish", proficiency: "Conversational" },
  ],
};

export const SAMPLE_ATS_TWO_COLUMN_CREAM: ResumeData = {
  personalInfo: {
    fullName: "Elena Rostova",
    title: "Creative Design Director & Brand Strategist",
    email: "elena.rostova@designstudio.ny",
    phone: "+1 (917) 555-0319",
    location: "New York, NY",
    linkedin: "linkedin.com/in/elenarostova",
    portfolio: "elenarostova.design",
  },
  summary:
    "Creative Design Director and Brand Strategist with 10+ years shaping visual identities, human-centered digital experiences, and global consumer design languages. Former design agency lead directing 22 visual artists, UI/UX designers, and brand copywriters. Winner of 3 D&AD Pencils and 2 Cannes Lions for boundary-pushing branding campaigns and accessible enterprise design systems.",
  skills: {
    technical: [
      "Creative Brand Identity Systems",
      "UI/UX Design Systems (Figma)",
      "Editorial Typography & Layout",
      "User Experience Research & Testing",
      "Art Direction & Campaign Concepting",
      "Motion Graphics & Micro-Interactions",
      "Design System Token Architecture",
    ],
    tools: [
      "Figma (Variables & Auto-Layout)",
      "Adobe Creative Cloud (Photoshop, Illustrator, InDesign)",
      "Principle & ProtoPie",
      "Cinema 4D",
      "Storybook UI",
      "Miro & Notion",
    ],
    concepts: [
      "Design Thinking Methodology",
      "WCAG 2.1 Accessible Color & Type",
      "Consumer Brand Positioning",
      "Design System Governance",
      "Visual Hierarchy & Storytelling",
    ],
    soft: [
      "Creative Team Mentorship",
      "Client Pitch Presentations",
      "Empathetic Design Leadership",
      "Critique Facilitation & Cross-Pollination",
    ],
  },
  experience: [
    {
      id: "exp-1",
      title: "Executive Creative Director",
      company: "Rostova & Co. Creative Agency",
      location: "New York, NY",
      date: "2020 – Present",
      bullets: [
        "Direct visual identity creation, brand overhauls, and flagship digital products for luxury, tech, and lifestyle clients.",
        "Lead a creative studio of 20 multidisciplinary designers, animators, and copywriters across New York and London.",
        "Constructed universal multi-brand design system in Figma adopted across 6 subsidiary client brands, speeding time-to-market by 45%.",
        "Pioneered inclusive design audits that brought 100% of client digital web properties into full WCAG AA accessibility compliance.",
      ],
    },
    {
      id: "exp-2",
      title: "Senior Brand & UI/UX Director",
      company: "Vanguard Studio London",
      location: "London, UK",
      date: "2016 – 2020",
      bullets: [
        "Headlined international rebrand for a premier fintech platform with 14M users, boosting brand recall metrics by 38%.",
        "Mentored junior and senior design staff in bespoke typography, editorial pacing, and responsive grid alignment.",
        "Collaborated with frontend engineering teams in Storybook to build zero-drift component design tokens.",
      ],
    },
    {
      id: "exp-3",
      title: "Visual Brand Designer",
      company: "Starlight Creative Lab",
      location: "New York, NY",
      date: "2014 – 2016",
      bullets: [
        "Crafted packaging systems, typography suites, and marketing collateral for high-growth direct-to-consumer lifestyle brands.",
        "Directed commercial photo shoots and supervised post-production retouching and color grading.",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "Master of Fine Arts (M.F.A.) in Graphic & Communication Design",
      school: "Rhode Island School of Design (RISD)",
      field: "Graphic Design",
      date: "2012 – 2014",
      location: "Providence, RI",
      score: "Honor Roll",
    },
    {
      id: "edu-2",
      degree: "Bachelor of Arts (B.A.) in Visual Arts",
      school: "Central Saint Martins — University of the Arts London",
      field: "Fine Arts & Design",
      date: "2008 – 2012",
      location: "London, UK",
      score: "First Class Honours",
    },
  ],
  projects: [
    {
      id: "proj-1",
      name: "Luminary FinTech Global Rebrand",
      tech: "Figma, Custom Typography, Motion Design",
      description:
        "Complete brand transformation across mobile app, web platform, and physical cards recognized with a D&AD Wood Pencil.",
      url: "https://elenarostova.design/luminary",
    },
    {
      id: "proj-2",
      name: "Aura Design System Tokens",
      tech: "Figma Variables, Style Dictionary, Web Components",
      description:
        "Open-source multi-platform design token system with over 80,000 Figma community duplicate installations.",
      url: "https://elenarostova.design/aura-tokens",
    },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "Nielsen Norman Group UX Master Certified (NN/g)",
      issuer: "Nielsen Norman Group",
      date: "2019",
    },
    {
      id: "cert-2",
      name: "Executive Design Leadership Fellow",
      issuer: "AIGA",
      date: "2021",
    },
  ],
  achievements: [
    {
      id: "ach-1",
      title: "D&AD Graphite Pencil Winner (2022)",
      description: "Awarded for Outstanding Creative Direction in Digital Brand Transformation.",
    },
    {
      id: "ach-2",
      title: "Cannes Lions Bronze Lion for Design (2020)",
      description: "Recognized for innovative packaging and interactive spatial retail branding.",
    },
  ],
  languages: [
    { id: "lang-1", name: "English", proficiency: "Native" },
    { id: "lang-2", name: "Russian", proficiency: "Bilingual" },
    { id: "lang-3", name: "French", proficiency: "Professional Working" },
  ],
};

export const SAMPLE_ATS_PHOTO_MODERN: ResumeData = {
  personalInfo: {
    fullName: "Jonathan Davis",
    title: "Senior Marketing & Growth Director",
    email: "jonathan.davis@growthstrategy.co",
    phone: "+1 (303) 555-0178",
    location: "Denver, CO",
    linkedin: "linkedin.com/in/jonathandavis-growth",
    portfolio: "jonathandavis.marketing",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  },
  summary:
    "Data-driven Growth Marketing Executive with 10+ years driving omnichannel demand generation, customer acquisition (CAC), and customer lifetime value (LTV) for hyper-growth B2B SaaS and high-volume consumer apps. Scaled annual recurring revenues from $8M to $48M. Expert in performance marketing, marketing automation, SEO/SEM strategies, and product-led growth (PLG) loops.",
  skills: {
    technical: [
      "Omnichannel Growth Marketing",
      "Paid Performance (Google, Meta, LinkedIn)",
      "Search Engine Optimization (SEO/SEM)",
      "Marketing Automation (HubSpot, Marketo)",
      "Conversion Rate Optimization (CRO)",
      "Customer Lifecycle & Retention Strategy",
      "Attribution Modeling & Unit Economics",
    ],
    tools: [
      "HubSpot Marketing Hub",
      "Google Analytics 4 & Tag Manager",
      "Looker & Tableau",
      "Mixpanel & Amplitude",
      "Semrush & Ahrefs",
      "Stripe Billing & Segment",
      "Optimizely",
    ],
    concepts: [
      "Funnel Velocity & Churn Reduction",
      "Customer Acquisition Cost (CAC) Optimization",
      "Account-Based Marketing (ABM)",
      "Multi-Touch Attribution Modeling",
      "Brand Equity & Content Strategy",
    ],
    soft: [
      "Executive Marketing Leadership",
      "Cross-Functional Squad Leadership",
      "Budget Stewardship ($12M+)",
      "Compelling Brand Storytelling",
    ],
  },
  experience: [
    {
      id: "exp-1",
      title: "Senior Director of Growth & Demand Generation",
      company: "Elevation Cloud Software",
      location: "Denver, CO",
      date: "2020 – Present",
      bullets: [
        "Head the marketing department overseeing 18 specialists across performance ads, content, lifecycle CRM, and marketing ops.",
        "Scaled annual pipeline generated from inbound marketing by 210%, driving $26M in net-new enterprise ARR in 2023.",
        "Optimized paid search and LinkedIn campaigns, decreasing blended CAC by 34% while boosting enterprise lead qualification by 48%.",
        "Engineered automated lifecycle email nurture flows in HubSpot that accelerated sales demo-to-close cycle times by 18 days.",
      ],
    },
    {
      id: "exp-2",
      title: "Director of Performance Marketing",
      company: "Apex Consumer Technologies",
      location: "Boulder, CO",
      date: "2016 – 2020",
      bullets: [
        "Directed $14M annual performance advertising budget across Google Ads, Meta, YouTube, and programmatic ad exchanges.",
        "Instituted rigorous A/B multivariate testing framework on conversion landing pages, lifting site conversion rates from 2.8% to 5.4%.",
        "Collaborated with product teams to build viral referral reward loops that brought in 320,000 new active consumers organically.",
      ],
    },
    {
      id: "exp-3",
      title: "Digital Marketing Specialist",
      company: "Summit Horizon Media",
      location: "Denver, CO",
      date: "2014 – 2016",
      bullets: [
        "Managed SEO content optimization and paid search bidding, achieving top 3 organic Google rankings for 85 high-intent keywords.",
        "Tracked multi-channel attribution and delivered weekly executive performance summaries to the Chief Marketing Officer.",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "Bachelor of Science in Business Administration & Marketing",
      school: "University of Colorado Boulder — Leeds School of Business",
      field: "Marketing & Analytics",
      date: "2010 – 2014",
      location: "Boulder, CO",
      score: "3.84 GPA",
    },
  ],
  projects: [
    {
      id: "proj-1",
      name: "Enterprise Account-Based Marketing (ABM) Engine",
      tech: "HubSpot, 6sense, LinkedIn Ads, Salesforce",
      description:
        "Built account-tiering framework targeting 500 Global 2000 prospects; generated $18.4M in qualified pipeline in first year.",
      url: "https://jonathandavis.marketing/abm-engine",
    },
    {
      id: "proj-2",
      name: "SaaS PLG Growth Funnel Optimization",
      tech: "Segment, Amplitude, Mixpanel, Optimizely",
      description:
        "Redesigned self-serve onboarding flow, increasing trial-to-paid subscription conversions by 42%.",
      url: "https://jonathandavis.marketing/plg-funnel",
    },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "Google Ads & Google Analytics 4 Master Certified",
      issuer: "Google",
      date: "2023",
    },
    {
      id: "cert-2",
      name: "HubSpot Certified Inbound & Marketing Automation Master",
      issuer: "HubSpot Academy",
      date: "2022",
    },
  ],
  achievements: [
    {
      id: "ach-1",
      title: "Colorado Tech Marketer of the Year (2022)",
      description: "Recognized by Denver Tech Association for outsized pipeline generation and innovative digital attribution.",
    },
    {
      id: "ach-2",
      title: "Elevation Cloud MVP Leadership Award (2023)",
      description: "Awarded highest company accolade for orchestrating the record-breaking product launch campaign.",
    },
  ],
  languages: [
    { id: "lang-1", name: "English", proficiency: "Native" },
    { id: "lang-2", name: "Spanish", proficiency: "Conversational" },
  ],
};

export const SAMPLE_ATS_PHOTO_SIDEBAR: ResumeData = {
  personalInfo: {
    fullName: "Sophia Martinez",
    title: "Enterprise Product Strategy & Portfolio Lead",
    email: "sophia.martinez@productinnovate.io",
    phone: "+1 (415) 555-0831",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/sophiamartinez-pm",
    portfolio: "sophiamartinez.io",
    photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
  },
  summary:
    "Distinguished Enterprise Product Strategy Director with 9+ years delivering market-leading B2B cloud products, automated AI copilots, and platform APIs. Orchestrated roadmap discovery and execution across 6 product teams generating $65M in annual contract value. Champion of deep customer empathy, data-informed discovery, and agile delivery with zero customer churn on flagship SaaS modules.",
  skills: {
    technical: [
      "B2B SaaS Product Strategy",
      "User Discovery & Qualitative Research",
      "Product Roadmapping & Prioritization",
      "API Platform Ecosystems",
      "AI & Machine Learning Copilot UX",
      "Agile Product Management (Scrum/Kanban)",
      "Pricing & Tier Packaging Strategy",
    ],
    tools: [
      "Jira & Productboard",
      "Figma",
      "Amplitude & Pendo",
      "FullStory",
      "Postman",
      "Salesforce CRM",
      "Tableau",
    ],
    concepts: [
      "Product-Led Growth (PLG) Loops",
      "Jobs-to-be-Done (JTBD) Framework",
      "Feature Adoption & Retention Cohorts",
      "Continuous Discovery Habits",
      "Design Sprints & Prototyping",
    ],
    soft: [
      "C-Suite Stakeholder Consensus",
      "Cross-Functional Vision Alignment",
      "Customer Interviewing & Empathy",
      "High-Impact Public Keynote Speaking",
    ],
  },
  experience: [
    {
      id: "exp-1",
      title: "Director of Enterprise Product Strategy",
      company: "Kinect Enterprise Cloud",
      location: "San Francisco, CA",
      date: "2021 – Present",
      bullets: [
        "Own strategic vision, product roadmaps, and P&L discovery for flagship enterprise platform serving 650+ Global 2000 customers.",
        "Spearheaded launch of generative AI workflow assistant, achieving 74% monthly active user adoption within 90 days of release.",
        "Partnered with engineering leadership to migrate 12 core APIs to open GraphQL gateway, expanding partner integrations by 300%.",
        "Decreased quarterly churn rate from 3.8% to an industry-leading 0.7% through proactive workflow friction telemetry.",
      ],
    },
    {
      id: "exp-2",
      title: "Senior Product Manager — Platform & Core UX",
      company: "Starlight Software Systems",
      location: "San Francisco, CA",
      date: "2018 – 2021",
      bullets: [
        "Led product lifecycle from customer discovery through GA release for enterprise role-based security and audit logging module.",
        "Conducted 120+ direct customer interviews with enterprise CIOs and security architects, shaping product requirements documents.",
        "Increased feature adoption velocity by 45% via in-app interactive walkthroughs and contextual guidance.",
      ],
    },
    {
      id: "exp-3",
      title: "Product Manager & UX Analyst",
      company: "Pacific Horizon Digital",
      location: "San Jose, CA",
      date: "2015 – 2018",
      bullets: [
        "Analyzed user funnel drop-offs using Amplitude, identifying checkout friction points and improving completion rates by 22%.",
        "Authored user stories, acceptance criteria, and sprint backlogs for a 10-person agile development team.",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "Master of Science in Product Management & Human-Computer Interaction",
      school: "Carnegie Mellon University",
      field: "Human-Computer Interaction & Product Design",
      date: "2013 – 2015",
      location: "Pittsburgh, PA",
      score: "3.92 GPA",
    },
    {
      id: "edu-2",
      degree: "Bachelor of Science in Cognitive Science & Computer Science",
      school: "University of California, San Diego",
      field: "Cognitive Science & Human-Computer Interaction",
      date: "2009 – 2013",
      location: "La Jolla, CA",
      score: "Magna Cum Laude",
    },
  ],
  projects: [
    {
      id: "proj-1",
      name: "Enterprise AI Copilot Assistant",
      tech: "LLMs, React, Python, Productboard",
      description:
        "Shipped natural-language workflow query interface that automates complex data aggregation for enterprise customers.",
      url: "https://sophiamartinez.io/ai-copilot",
    },
    {
      id: "proj-2",
      name: "Continuous Product Discovery Toolkit",
      tech: "Miro, Figma, Productboard",
      description:
        "Open-source interview synthesis framework used by over 6,000 product managers across Silicon Valley tech firms.",
      url: "https://sophiamartinez.io/discovery-toolkit",
    },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "Pragmatic Institute Certified (PMC-III: Build, Focus, Foundations)",
      issuer: "Pragmatic Institute",
      date: "2020",
    },
    {
      id: "cert-2",
      name: "Certified Scrum Product Owner (CSPO)",
      issuer: "Scrum Alliance",
      date: "2017",
    },
  ],
  achievements: [
    {
      id: "ach-1",
      title: "Women in Product Leader of the Year (2022)",
      description: "Recognized by Women in Product for pioneering ethical AI product design frameworks.",
    },
    {
      id: "ach-2",
      title: "Product of the Year Award — TechCrunch Disrupt",
      description: "Kinect platform named Top Enterprise Innovation out of 200 competing enterprise platforms.",
    },
  ],
  languages: [
    { id: "lang-1", name: "English", proficiency: "Native" },
    { id: "lang-2", name: "Spanish", proficiency: "Bilingual" },
  ],
};

/**
 * Mapping of all 19 active templates to their dedicated, fully populated sample data.
 */
export const TEMPLATE_SAMPLE_MAP: Record<string, ResumeData> = {
  "pro-michelle": SAMPLE_PRO_MICHELLE,
  "pro-claire": SAMPLE_PRO_CLAIRE,
  "pro-jessica": SAMPLE_PRO_JESSICA,
  "pro-adam": SAMPLE_PRO_ADAM,
  "pro-nick": SAMPLE_PRO_NICK,
  "pro-lisa": SAMPLE_PRO_LISA,
  "pro-catherine": SAMPLE_PRO_CATHERINE,
  "pro-chris-flims": SAMPLE_PRO_CHRIS_FLIMS,
  "pro-will-tribian": SAMPLE_PRO_WILL_TRIBIAN,
  "pro-amanda-smith": SAMPLE_PRO_AMANDA_SMITH,
  "ats-supply-chain": SAMPLE_ATS_SUPPLY_CHAIN,
  "ats-healthcare": SAMPLE_ATS_HEALTHCARE,
  "ats-engineering": SAMPLE_ATS_ENGINEERING,
  "ats-management": SAMPLE_ATS_MANAGEMENT,
  "ats-two-column-blue": SAMPLE_ATS_TWO_COLUMN_BLUE,
  "ats-two-column-dark": SAMPLE_ATS_TWO_COLUMN_DARK,
  "ats-two-column-cream": SAMPLE_ATS_TWO_COLUMN_CREAM,
  "ats-photo-modern": SAMPLE_ATS_PHOTO_MODERN,
  "ats-photo-sidebar": SAMPLE_ATS_PHOTO_SIDEBAR,
};

/**
 * Retrieve fully populated, authentic sample demonstration data for any template.
 * If templateId is not specifically mapped, returns default comprehensive sample data.
 */
export function getSampleResumeData(templateId?: string): ResumeData {
  if (templateId && TEMPLATE_SAMPLE_MAP[templateId]) {
    return TEMPLATE_SAMPLE_MAP[templateId];
  }
  return SAMPLE_ATS_TWO_COLUMN_BLUE;
}
