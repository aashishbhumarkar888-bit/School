import { HouseInfo, WingInfo, PedagogicalPillar, NoticeItem, NewsItem, EventItem, GalleryItem } from "@/lib/types";

export const SCHOOL_FACTS = {
  name: "Sri Aurobindo School",
  locationName: "Bhopal",
  fullName: "Sri Aurobindo School, Bhopal",
  tagline: "Integral Education for the Sun-Eyed Children of a Marvellous Dawn",
  society: "Sri Aurobindo Education Centre (SAEC)",
  foundedYear: 1989,
  foundedMonth: "July 1989",
  affiliation: "Madhya Pradesh Board of Secondary Education (MPBSE)",
  pattern: "Co-educational K–12 Public School",
  address: "Auro Mandir Parisar, Behind Kannad Bhawan, 2nd Stop, Tulsi Nagar, Bhopal, Madhya Pradesh – 462003",
  shortAddress: "Tulsi Nagar, Bhopal, MP – 462003",
  phone: "0755-2558286",
  phoneInternational: "+91 755 2558286",
  email: "aurobhopal@gmail.com",
  officeHours: "Monday – Saturday: 7:45 AM – 1:30 PM",
  registrationWindow: "8:00 AM – 1:00 PM (Monday – Saturday)",
  chairman: {
    name: "Mr. Umesh Trivedi",
    title: "Chairman, Sri Aurobindo Education Centre & School",
    messageExcerpt:
      "Education is not the piling of information; it is the awakening of wisdom, humility, moral courage, and confidence. At Sri Aurobindo School, we equip our students with state-of-the-art technological learning aids while grounding them deeply in integral human values, enabling every child to grow into an enlightened, responsible global citizen.",
    image: "/images/official/cm.jpg",
  },
  images: {
    sriAurobindoPortrait: "/images/official/sri-aurobindo.jpg",
    societyCampus: "/images/official/society.jpg",
    chairmanPortrait: "/images/official/cm.jpg",
    visionMission: "/images/official/vm.jpg",
    admissionsWelcome: "/images/official/admissions.jpg",
    mpbseAffiliation: "/images/official/affiliation.jpg",
    curriculumExam: "/images/official/curriculum.jpg",
    methodologyFlight: "/images/official/method.jpg",
    campusLifeEvent: "/images/official/event-01.jpg",
    logoMark: "/images/official/ll2.png",
  },
  mottoSpirit:
    "We are a happy school, because happy children learn better than unhappy ones. Our classrooms are seldom quiet, because they are filled with activity as children (and teachers) actively learn with enthusiasm.",
  savitriVerse: [
    "I saw them cross the twilight of an age,",
    "The sun-eyed children of a marvellous dawn,",
    "The great creators with wide brows of calm,",
    "The massive barrier-breakers of the world",
    "And wrestlers with destiny in her lists of will,",
    "The labourers in the quarries of the Gods,",
    "The messengers of the incommunicable,",
    "The architects of Immortality."
  ],
  savitriCitation: "Sri Aurobindo (SAVITRI: Book III, Canto 4, p. 343, Vol. 28)",
  aimsAndObjectives: [
    "To provide child-centric integral education harmonizing body, mind, intellect, and spirit.",
    "To cultivate creative self-expression, critical analytical faculties, and scientific inquiry.",
    "To instill profound civic responsibility, ecological stewardship, and mutual respect.",
    "To maintain high academic standards in full compliance with the MPBSE curriculum framework.",
    "To develop physical vitality and sportsmanship through competitive team games and athletics.",
    "To foster an environment where joy and discovery are integral to daily classroom learning."
  ],
  registrationFee: "₹100/-",
};

export const HOUSES: Record<string, HouseInfo> = {
  teresa: {
    id: "teresa",
    name: "Teresa House",
    patron: "Mother Teresa",
    colorName: "Sapphire & Electric Blue",
    accentHex: "#0EA5E9",
    secondaryHex: "#2563EB",
    darkHex: "#1E3A8A",
    gradient: "from-sky-500 via-blue-600 to-indigo-900",
    motto: "In Service and Humility We Soar",
    values: ["Compassion", "Community Service", "Empathy", "Peace", "Quiet Strength"],
    patronStory:
      "Inspired by the Nobel Peace Laureate Mother Teresa, Teresa House champions boundless kindness, selfless dedication, and tender care for every living being. Members lead community outreach, campus hygiene, and peer-mentorship programmes.",
    competitions: [
      "Inter-House Community Action Drives",
      "Social Innovation & Empathy Debates",
      "Junior Wing Storytelling & Drama",
      "Table Tennis & Badminton Tournaments"
    ],
    badgeRole: "Community, Care & Pre-Primary",
  },
  amartya: {
    id: "amartya",
    name: "Amartya House",
    patron: "Amartya Sen",
    colorName: "Solar Gold & Luminous Yellow",
    accentHex: "#FDE047",
    secondaryHex: "#F59E0B",
    darkHex: "#B45309",
    gradient: "from-yellow-300 via-amber-500 to-amber-800",
    motto: "Reason Awakens Freedom and Dignity",
    values: ["Wisdom", "Intellectual Rigour", "Human Capability", "Analytical Clarity", "Truth"],
    patronStory:
      "Honouring Nobel Laureate Professor Amartya Sen, Amartya House embodies the pursuit of intellectual enlightenment and social justice. Its members represent the school in parliamentary debates, mathematics colloquia, and quiz championships.",
    competitions: [
      "Annual Inter-House Parliament Debate",
      "Savitri Philosophical Essay Competition",
      "Vedic Mathematics & Logical Olympiads",
      "Chess Championship & Strategy League"
    ],
    badgeRole: "Academics, Scholarships & Milestones",
  },
  tagore: {
    id: "tagore",
    name: "Tagore House",
    patron: "Rabindranath Tagore",
    colorName: "Emerald & Botanical Green",
    accentHex: "#34D399",
    secondaryHex: "#10B981",
    darkHex: "#064E3B",
    gradient: "from-emerald-400 via-emerald-600 to-emerald-950",
    motto: "Where the Mind is Without Fear",
    values: ["Aesthetic Harmony", "Literary Brilliance", "Nature Fellowship", "Creative Freedom", "Joy"],
    patronStory:
      "Commemorating Gurudev Rabindranath Tagore, Tagore House is the creative soul of Sri Aurobindo School. Inspired by the lush greenery of Auro Mandir Parisar, members lead cultural assemblies, theatrical productions, poetry recitals, and environmental conservation projects.",
    competitions: [
      "Rabindra Sangeet & Folk Harmony",
      "Parisar Eco-Botany Exhibitions",
      "Creative Writing & Dramatic Monologues",
      "Badminton & Cross-Country Athletics"
    ],
    badgeRole: "Arts, Literature & Parisar Greenery",
  },
  raman: {
    id: "raman",
    name: "Raman House",
    patron: "Sir C.V. Raman",
    colorName: "Crimson & Vermilion Red",
    accentHex: "#FB7185",
    secondaryHex: "#EF4444",
    darkHex: "#881337",
    gradient: "from-rose-400 via-red-600 to-rose-950",
    motto: "Relentless Inquiry Ignites Progress",
    values: ["Scientific Curiosity", "Fearless Discovery", "Courage", "Athletic Fire", "Precision"],
    patronStory:
      "Named after Nobel Laureate Sir Chandrasekhara Venkata Raman, Raman House sparks scientific innovation and athletic supremacy. In the Physics, Chemistry, and Biology laboratories as well as the Volleyball and Basketball courts, Raman House ignites passion and determination.",
    competitions: [
      "Working Science Model Demonstrations",
      "Inter-House Basketball Championship",
      "Volleyball Premier League",
      "Speed Viva & Practical Science Relay"
    ],
    badgeRole: "Science Labs, Sports & High-Intent Energy",
  },
};

export const PEDAGOGICAL_PILLARS: PedagogicalPillar[] = [
  {
    title: "The Flight Path",
    tagline: "Harmonious Quad-Partnership in Education",
    description:
      "A synchronized collaborative bond bringing together School Management, Parents, Educators, and Students. From the initial steps of tiny tots to Class XII board preparation, every journey is co-navigated with transparency, mutual trust, and deep emotional security.",
    points: [
      "Open Parent-Teacher Dialogue & Termly Review Sessions",
      "Seamless progression from exploratory preschool to rigorous board standards",
      "Teacher-student mentorship tailored to psychological and intellectual milestones",
      "Constant feedback loops ensuring no child is left behind"
    ],
    houseAlignment: "teresa",
  },
  {
    title: "Different Strokes",
    tagline: "Multi-Modal Cognitive and Sensory Stimuli",
    description:
      "Every child possesses a distinct architecture of potential. Leveraging Howard Gardner's Multiple Intelligences, our pedagogical delivery provides diverse stimuli—spatial, musical, logical, linguistic, kinesthetic, and naturalistic—tailored to unlock individual genius.",
    points: [
      "Hands-on science laboratory sessions with tangible working models",
      "Daily scheduled library hours exploring literature, GK, and technology",
      "Interactive Smart Classroom multimedia sessions engaging auditory and visual senses",
      "Experiential field projects and creative workshops at Auro Mandir Parisar"
    ],
    houseAlignment: "amartya",
  },
  {
    title: "Joy of Flying",
    tagline: "Holistic Realization of the Sun-Eyed Children",
    description:
      "Learning must never be an anxious ordeal. In resonance with Sri Aurobindo's educational philosophy, true mastery emerges when the spirit is joyful. We cultivate physically robust, intellectually stimulated, emotionally resilient, and spiritually conscious human beings.",
    points: [
      "Year-round inter-house sports tournaments in Volleyball, Basketball, and Badminton",
      "Active encouragement of indoor strategic mastery: Chess, Carrom, and Table Tennis",
      "Celebration of cultural festivals, theatrical plays, and national heritage",
      "Spiritual poise cultivated through morning reflection and quiet mindfulness"
    ],
    houseAlignment: "tagore",
  },
];

export const ACADEMIC_WINGS: WingInfo[] = [
  {
    id: "pre-primary",
    title: "Pre-Primary Wing (Early Years)",
    gradeRange: "Nursery, KG-1 & KG-2",
    ageBracket: "2½ to 4½ Years",
    description:
      "A joyful, nurturing cocoon where little ones build sensorial motor skills, phonics foundational awareness, and social empathy in a vibrant, play-based environment.",
    keySubjects: ["Play-based Phonics", "Number Concepts", "Sensory Motor Activities", "Storytelling & Art", "Music & Movement"],
    focus: "Curiosity, motor coordination, socialization, and emotional security.",
  },
  {
    id: "primary",
    title: "Primary Wing",
    gradeRange: "Classes I to V",
    ageBracket: "5½ to 10 Years",
    description:
      "Establishing rock-solid foundations in linguistic fluency, mathematical logic, environmental awareness, and moral consciousness through activity-centred learning.",
    keySubjects: ["English & Hindi Language Arts", "Mathematics & Mental Arithmetic", "Environmental Studies (EVS)", "Computer Foundations", "Arts & Physical Education"],
    focus: "Conceptual clarity, reading habits, arithmetic confidence, and cooperative teamwork.",
  },
  {
    id: "middle",
    title: "Middle School Wing",
    gradeRange: "Classes VI to VIII",
    ageBracket: "11 to 13 Years",
    description:
      "Transitioning students into formal scientific inquiry, structured reasoning, social sciences, and experimental laboratory exposure.",
    keySubjects: ["Integrated Science (Physics, Chemistry, Biology)", "Advanced Mathematics", "Social Sciences & History", "Sanskrit / Third Language", "Computer Applications"],
    focus: "Scientific method, analytical writing, inter-house debates, and laboratory basics.",
  },
  {
    id: "secondary",
    title: "Secondary & Senior Secondary Wing",
    gradeRange: "Classes IX to XII (MPBSE)",
    ageBracket: "14 to 18 Years",
    description:
      "Comprehensive, rigorous preparation for the Madhya Pradesh Board of Secondary Education examinations alongside character development and career guidance.",
    keySubjects: ["Science Streams (Physics, Chemistry, Maths/Biology)", "Commerce & Humanities", "Language & Literature", "Practical Lab Viva & Model Design", "Physical Education"],
    focus: "MPBSE board excellence, laboratory practical viva mastery, analytical depth, and ethical leadership.",
  },
];

export const THREE_TERM_CALENDAR = [
  {
    term: "First Term Examination",
    period: "September",
    description: "Evaluates foundational half-yearly curriculum mastery with continuous class assessment feedback.",
    milestones: [
      "Comprehensive syllabus review in late August",
      "Theory examinations & practical evaluations across subjects",
      "Parent-Teacher Consultation Meeting and signed report card distribution",
      "Remedial learning plans for subjects scoring below 40%"
    ],
  },
  {
    term: "Second Term Examination",
    period: "December",
    description: "Assesses second-phase progression, project work, and laboratory practical experiments.",
    milestones: [
      "Pre-board alignment for Classes X & XII",
      "Science lab viva-voce and working model submissions",
      "Inter-house sports and cultural festival integration",
      "Detailed academic counseling based on performance trends"
    ],
  },
  {
    term: "Annual / Final Board Examination",
    period: "March – April",
    description: "The culminating academic assessment determining annual promotion in accordance with MPBSE statutory guidelines.",
    milestones: [
      "Full academic year syllabus consolidation",
      "Mandatory fee clearance prior to roll slip and hall-ticket release",
      "Passing criterion: 33% – 40% threshold across all registered subjects",
      "Supplementary examinations for candidates requiring re-assessment in 1–2 subjects"
    ],
  },
];

export const AGE_ELIGIBILITY_TABLE = [
  {
    grade: "Nursery",
    ageRange: "2½ – 3 Years",
    sessionCutoff: "As on session commencement in June",
    description: "Playful introductory setting for social, verbal, and motor development.",
    badgeColor: "teresa",
  },
  {
    grade: "KG-1 (LKG)",
    ageRange: "3½ – 4 Years",
    sessionCutoff: "As on session commencement in June",
    description: "Phonics foundations, pre-math concepts, drawing, and interactive games.",
    badgeColor: "amartya",
  },
  {
    grade: "KG-2 (UKG)",
    ageRange: "4½ Years",
    sessionCutoff: "As on session commencement in June",
    description: "Preparatory reading, sentence forming, writing skills, and numeric arithmetic.",
    badgeColor: "tagore",
  },
  {
    grade: "Class I (1st)",
    ageRange: "5½ Years",
    sessionCutoff: "As on session commencement in June",
    description: "Formal schooling inception with foundational curriculum and activity sessions.",
    badgeColor: "raman",
  },
  {
    grade: "Classes II to XII",
    ageRange: "Age Appropriate",
    sessionCutoff: "Subject to vacancy & valid transfer certificate / previous mark sheet",
    description: "Admissions granted strictly on seat vacancy and academic verification.",
    badgeColor: "teresa",
  },
];

export const CAMPUS_FACILITIES = [
  {
    id: "science-labs",
    title: "Physics, Chemistry & Biology Labs",
    category: "Science & Discovery",
    description:
      "Fully outfitted specialized laboratories equipped with authentic apparatus, working models, chemical reagents, and viva training stations for state board practicals.",
    badge: "Hands-on Viva & Models",
    house: "raman",
  },
  {
    id: "smart-classrooms",
    title: "Digital Smart Classrooms",
    category: "Interactive Learning",
    description:
      "Multimedia audio-visual instructional boards bringing complex scientific concepts, historical narratives, and geographic simulations vividly to life.",
    badge: "Multimedia Audio-Visual",
    house: "amartya",
  },
  {
    id: "central-library",
    title: "Central School Library",
    category: "Knowledge Sanctuary",
    description:
      "Thousands of curated volumes encompassing classical world literature, Indian heritage, encyclopedias, general knowledge, and computer research journals.",
    badge: "Daily Class Reading Hours",
    house: "tagore",
  },
  {
    id: "sports-infrastructure",
    title: "Playgrounds & Indoor Arena",
    category: "Athletics & Vitality",
    description:
      "Spacious outdoor courts for Volleyball, Basketball, and Badminton, alongside indoor arenas for Table Tennis, Chess, and Carrom with coach guidance.",
    badge: "Volleyball, Basketball & Chess",
    house: "raman",
  },
  {
    id: "computer-lab",
    title: "Computer & IT Center",
    category: "Digital Fluency",
    description:
      "High-speed modern computer terminals delivering foundational IT literacy, coding logic, and internet research capabilities under expert supervision.",
    badge: "Practical IT Training",
    house: "amartya",
  },
  {
    id: "safety-utilities",
    title: "Green Parisar & Safety Infrastructure",
    category: "Campus Life",
    description:
      "A serene ecological haven at Auro Mandir Parisar featuring 24/7 power backup, RO-purified drinking water, round-the-clock security, medical emergency kits, and marked fire exits.",
    badge: "RO Water & 24/7 Power",
    house: "teresa",
  },
];

export const NOTICES_DATA: NoticeItem[] = [
  {
    id: "not-01",
    title: "Admission Registration Open for Academic Session Commencing June",
    date: "15 June Onwards",
    category: "Admission",
    summary: "Registration forms for Nursery, KG-1, KG-2, and Class I are available at the School Office counter.",
    content:
      "Parents seeking admission for their wards for the upcoming session are notified that registration forms can be procured and submitted at the School Office counter between 8:00 AM and 1:00 PM on all working days. Please bring the original Certificate of Birth along with one attested photocopy and the registration fee of Rs. 100/-.",
    isImportant: true,
    attachmentName: "Admission_Guidelines_Proforma.pdf",
  },
  {
    id: "not-02",
    title: "Schedule for First Term Examination (September)",
    date: "September Cycle",
    category: "Examination",
    summary: "First term theory examinations and practical evaluations for Classes I through XII.",
    content:
      "The First Term Examination cycle will commence as per the published time-table. Parents are requested to ensure all tuition fees are cleared prior to issuance of admit cards. Minimum passing marks remain 33% to 40% across subjects. Detailed subject-wise datesheets will be distributed in classrooms.",
    isImportant: true,
    attachmentName: "First_Term_DateSheet_Signed.pdf",
  },
  {
    id: "not-03",
    title: "Annual Inter-House Sports Meet & Athletics Championship",
    date: "Upcoming Term",
    category: "Academic",
    summary: "Teresa, Amartya, Tagore, and Raman Houses will contest for the prestigious SAEC Rolling Trophy.",
    content:
      "The annual inter-house tournament comprising Volleyball, Basketball, Badminton, Chess, and Table Tennis matches will be held at Auro Mandir Parisar grounds. Students are advised to attend regular coaching practice sessions under our physical education instructors.",
    isImportant: false,
    attachmentName: "InterHouse_Sports_Rulebook.pdf",
  },
  {
    id: "not-04",
    title: "Guidelines on Science Laboratory Viva & Working Model Submission",
    date: "Second Term Cycle",
    category: "Academic",
    summary: "Physics, Chemistry, and Biology practical notebooks and working models due before December.",
    content:
      "Students of Classes IX through XII must complete their certified laboratory journals and working model prototypes for the internal assessment component of the MPBSE curriculum.",
    isImportant: false,
  },
];

export const NEWS_DATA: NewsItem[] = [
  {
    slug: "celebrating-founding-ideals-sri-aurobindo-education-centre",
    title: "Reflecting on 35+ Years of Integral Education at Auro Mandir Parisar",
    date: "Academic Journal",
    category: "Institutional Heritage",
    excerpt:
      "Founded in July 1989, Sri Aurobindo School continues its mission of harmonizing academic excellence with moral depth and spiritual poise in Bhopal.",
    body:
      "Under the patronage of Sri Aurobindo Education Centre (SAEC), the school has nurtured generations of young learners guided by the sublime vision of Sri Aurobindo and The Mother. Our motto remains unwavering: 'We are a happy school, because happy children learn better than unhappy ones.' Classrooms at Auro Mandir Parisar are active, experiential laboratories where curiosity is nurtured with love and discipline.",
    houseTag: "tagore",
  },
  {
    slug: "science-exhibition-showcases-raman-house-innovations",
    title: "Annual Science & Working Model Exhibition Ignites Young Innovators",
    date: "Campus Highlights",
    category: "Innovation & Labs",
    excerpt:
      "Students demonstrated demonstrable hydraulic lifts, optical prism refraction models, and botanical conservation exhibits.",
    body:
      "Under the mentorship of our faculty, students across Middle and Senior Secondary wings presented working models solving practical real-world problems. Raman House and Amartya House engaged in an exhilarating intellectual contest, with working models evaluated for scientific accuracy, demonstration clarity, and viva poise.",
    houseTag: "raman",
  },
  {
    slug: "inter-house-literary-and-savitri-colloquium",
    title: "Tagore and Amartya Houses Lead Annual Literary and Savitri Colloquium",
    date: "Cultural Calendar",
    category: "Arts & Literature",
    excerpt:
      "Students recited verses from Sri Aurobindo's Savitri and debated contemporary societal ethics with remarkable rhetorical fluency.",
    body:
      "The library hall witnessed an inspiring gathering where students interpreted the profound lines: 'I saw them cross the twilight of an age / The sun-eyed children of a marvellous dawn'. The colloquium celebrated literature, philosophical inquiry, and creative expression.",
    houseTag: "amartya",
  },
];

export const EVENTS_DATA: EventItem[] = [
  {
    id: "evt-01",
    title: "New Academic Session Orientation",
    date: "June",
    time: "8:00 AM – 11:30 AM",
    term: "First Term",
    location: "School Auditorium & Parisar",
    description: "Welcoming new parents and tiny tots for an intimate orientation with the faculty and leadership.",
  },
  {
    id: "evt-02",
    title: "First Term Examinations (Half-Yearly)",
    date: "September",
    time: "8:30 AM – 12:00 PM",
    term: "First Term",
    location: "Examination Halls",
    description: "Syllabus assessment for Classes I to XII, followed by parent-teacher conferences and report card signings.",
  },
  {
    id: "evt-03",
    title: "Inter-House Volleyball & Badminton Tournaments",
    date: "November",
    time: "8:00 AM – 1:00 PM",
    term: "Co-Curricular",
    location: "Main Playgrounds & Indoor Sports Arena",
    description: "Annual sports championship between Teresa (Blue), Amartya (Yellow), Tagore (Green), and Raman (Red).",
  },
  {
    id: "evt-04",
    title: "Second Term Examinations & Lab Viva",
    date: "December",
    time: "8:30 AM – 12:00 PM",
    term: "Second Term",
    location: "Science Laboratories & Classrooms",
    description: "Mid-year academic evaluation and laboratory practical testing for board classes.",
  },
  {
    id: "evt-05",
    title: "Annual MPBSE Final Examinations",
    date: "March – April",
    time: "8:30 AM – 12:30 PM",
    term: "Annual Term",
    location: "Auro Mandir Parisar Exam Wings",
    description: "Culminating promotional examinations under the Madhya Pradesh Board of Secondary Education framework.",
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-01",
    title: "Auro Mandir Parisar Green Campus",
    category: "Campus",
    caption: "The peaceful, tree-lined sanctuary at 2nd Stop, Tulsi Nagar, Bhopal.",
    aspect: "landscape",
    imageUrl: "/images/official/society.jpg",
    houseTag: "tagore",
  },
  {
    id: "gal-02",
    title: "Physics & Chemistry Practical Laboratory",
    category: "Academics",
    caption: "Students conducting working apparatus experiments and analytical titrations.",
    aspect: "landscape",
    imageUrl: "/images/official/affiliation.jpg",
    houseTag: "raman",
  },
  {
    id: "gal-03",
    title: "Central Reading Sanctuary & Library",
    category: "Academics",
    caption: "Curated research volumes and daily scheduled reading periods for every class.",
    aspect: "square",
    imageUrl: "/images/official/curriculum.jpg",
    houseTag: "amartya",
  },
  {
    id: "gal-04",
    title: "Four-House Athletic Champions",
    category: "Sports",
    caption: "Inter-house volleyball and basketball finalists celebrating sportsmanship.",
    aspect: "landscape",
    imageUrl: "/images/official/event-01.jpg",
    houseTag: "raman",
  },
  {
    id: "gal-05",
    title: "Pre-Primary Wing Discovery & Phonics",
    category: "Academics",
    caption: "Tiny tots exploring sensory-motor activity modules in joyful classrooms.",
    aspect: "portrait",
    imageUrl: "/images/official/admissions.jpg",
    houseTag: "teresa",
  },
  {
    id: "gal-06",
    title: "Annual Cultural & Savitri Recitation",
    category: "Cultural",
    caption: "Tagore House students performing classical dance and literary drama.",
    aspect: "landscape",
    imageUrl: "/images/official/vm.jpg",
    houseTag: "tagore",
  },
  {
    id: "gal-07",
    title: "Indoor Chess & Table Tennis Arena",
    category: "Sports",
    caption: "Concentration and tactical mastery during the inter-house chess qualifiers.",
    aspect: "square",
    imageUrl: "/images/official/method.jpg",
    houseTag: "amartya",
  },
  {
    id: "gal-08",
    title: "Digital Smart Classroom Sessions",
    category: "Academics",
    caption: "Audio-visual multimedia lessons delivering dynamic interactive concepts.",
    aspect: "landscape",
    imageUrl: "/images/official/cm.jpg",
    houseTag: "teresa",
  },
];
