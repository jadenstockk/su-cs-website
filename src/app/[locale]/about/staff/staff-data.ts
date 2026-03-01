export interface StaffMember {
  name: string;
  title?: string;
  office?: string;
  email?: string;
  website?: string;
  telephone?: string;
  researchInterests?: string;
  image?: string;
}

export const academicStaff: StaffMember[] = [
  {
    name: "George Azzopardi",
    title: "Associate Professor Extraordinary",
    office: "Remote",
    website: "https://www.rug.nl/staff/g.azzopardi/?lang=en",
    telephone: "+27 21 808 4232",
    researchInterests:
      "Brain-inspired computing, Computer Vision, Pattern Recognition, Machine Learning",
    image: "/assets/images/staff/gazzopardi.jpg",
  },
  {
    name: "Willem Bester",
    title: "Junior Lecturer",
    office: "A508",
    email: "whkbester@cs.sun.ac.za",
    website: "https://www.cs.sun.ac.za/~whkbester/",
    telephone: "+27 21 808 4232",
    researchInterests:
      "Software Engineering, Formal Methods, Formal Language and Automata Theory",
    image: "/assets/images/staff/whkbester.jpg",
  },
  {
    name: "Judith Bishop",
    title: "Professor Extraordinary",
    email: "jbishop@sun.ac.za",
    website: "https://www.linkedin.com/in/judith-bishop",
    researchInterests:
      "Programming languages, software engineering, mobile computing, open source software",
    image: "/assets/images/staff/jbishop.jpg",
  },
  {
    name: "Loek Cleophas",
    title: "Associate Professor Extraordinary",
    office: "Remote",
    website: "https://www.tue.nl/en/research/researchers/loek-cleophas",
    telephone: "+27 21 808 4232",
    researchInterests:
      "Model-driven engineering, Digital Twins, Algorithm + model variability",
    image: "/assets/images/staff/lcleophas.jpg",
  },
  {
    name: "Marcel Dunaiski",
    title: "Senior Lecturer",
    office: "A519",
    email: "marceldunaiski@sun.ac.za",
    website: "https://marceldunaiski.pages.cs.sun.ac.za/",
    telephone: "+27 21 808 4232",
    researchInterests: "Data Science, Informetrics, Scientometrics",
    image: "/assets/images/staff/mdunaiski.jpg",
  },
  {
    name: "David Baker Effendi",
    title: "Research Fellow",
    office: "Remote",
    website: "https://davidbakereffendi.github.io/",
    telephone: "+27 21 808 4232",
    researchInterests: "Program analysis, static analysis",
    image: "/assets/images/staff/deffendi.jpg",
  },
  {
    name: "Andries Engelbrecht",
    title: "Professor",
    office: "B2023, Industrial Engineering Building",
    email: "engel@sun.ac.za",
    website: "https://engel.pages.cs.sun.ac.za/",
    telephone: "+27 21 808 9259",
    researchInterests:
      "Swarm intelligence, Evolutionary computation, Hyper-heuristics, Neural networks, Machine learning, Data analytics, Optimization, Fitness landscape analysis",
    image: "/assets/images/staff/engel.jpg",
  },
  {
    name: "Bernd Fischer",
    title: "Professor",
    office: "A513",
    email: "bfischer@cs.sun.ac.za",
    website: "https://www.cs.sun.ac.za/~bfischer/",
    telephone: "+27 21 808 2527",
    researchInterests:
      "Software engineering, formal methods, program analysis, program generation, program verification, artificial intelligence",
    image: "/assets/images/staff/bfischer.jpg",
  },
  {
    name: "Trienko Grobler",
    title: "Lecturer",
    office: "A510",
    email: "tlgrobler@sun.ac.za",
    website: "http://www.cs.sun.ac.za/~tlgrobler/",
    telephone: "+27 21 808 4232",
    researchInterests:
      "Machine learning, remote sensing, radio interferometry, coding theory and the epoch of reionization",
    image: "/assets/images/staff/tlgrobler.jpg",
  },
  {
    name: "McElory Hoffmann",
    title: "Senior Lecturer Extraordinary",
    office: "Remote",
    email: "mcelory@praelexis.co.za",
    website: "https://www.linkedin.com/in/mcelory/",
    researchInterests: "Computer vision, machine learning, smart cameras",
    image: "/assets/images/staff/mcelory.jpg",
  },
  {
    name: "Cornelia Inggs",
    title: "Senior Lecturer",
    office: "A509",
    email: "cinggs@cs.sun.ac.za",
    website: "https://www.cs.sun.ac.za/~cinggs/",
    telephone: "+27 21 808 4232",
    researchInterests: "Formal methods, model checking, concurrency",
    image: "/assets/images/staff/cinggs.jpg",
  },
  {
    name: "Maria Keet",
    title: "Professor Extraordinary",
    office: "Remote",
    website: "http://www.meteck.org/",
    telephone: "+27 21 808 4232",
    researchInterests:
      "Ontology, Semantic Web, Conceptual Modeling, Knowledge Representation and reasoning",
    image: "/assets/images/staff/mkeet.png",
  },
  {
    name: "Steve Kroon",
    title: "Associate Professor",
    office: "A515",
    email: "kroon@sun.ac.za",
    website: "https://www.cs.sun.ac.za/~kroon/",
    telephone: "+27 21 808 9375",
    researchInterests:
      "Artificial intelligence/machine learning, statistical learning theory, probability and computing",
    image: "/assets/images/staff/kroon.jpg",
  },
  {
    name: "Mkhuseli Ngxande",
    title: "Lecturer",
    office: "A518",
    email: "ngxandem@sun.ac.za",
    website: "http://www.cs.sun.ac.za/~ngxandem",
    telephone: "+27 21 808 4232",
    researchInterests:
      "Machine learning, computer vision, bioinformatics, wide area surveillance",
    image: "/assets/images/staff/ngxandem.jpg",
  },
  {
    name: "Francesco Petruccione",
    title: "Visiting Academic",
    office: "MIV 1003",
    email: "petruccione@sun.ac.za",
    website: "https://www.sun.ac.za/english/Lists/news/DispForm.aspx?ID=9203",
    telephone: "+27 21 808 4562",
    researchInterests:
      "Interim director of the National Institute for Theoretical and Computational Sciences (NITheCS) and Professor Extraordinary in the Department of Physics at SU.",
    image: "/assets/images/staff/petruccione.jpg",
  },
  {
    name: "Laurette Pretorius",
    title: "Associate Professor Extraordinary",
    website:
      "https://w2.unisa.ac.za/CW/SITES/CORPORAT/DEFAULT/COLLEGES/COLLEGE_/RESEARCH/ACADEMIC/PROF_LAU.HTM",
    telephone: "+27 21 808 4232",
    researchInterests:
      "Multilingual NLP, Semantic computing, Ontology development, Machine translation, Language generation",
    image: "/assets/images/staff/lpretorius.jpg",
  },
  {
    name: "Moeketsi Raselimo",
    title: "Lecturer Extraordinary",
    office: "Remote",
    website: "https://de.linkedin.com/in/moeketsi-raselimo",
    telephone: "+27 21 808 4232",
    researchInterests: "Programming Languages, Software Testing, Fuzzing",
    image: "/assets/images/staff/mraselimo.jpg",
  },
  {
    name: "Gavin Rens",
    title: "Lecturer",
    office: "A508",
    email: "gavinrens@sun.ac.za",
    website: "https://kognitiv.systems/",
    telephone: "+27 21 808 4232",
    researchInterests:
      "Cognitive Robotics focusing on knowledge representation and reasoning under uncertainty. Probabilistic planning. Reinforcement learning.",
    image: "/assets/images/staff/grens.jpg",
  },
  {
    name: "William (Bill) Tucker",
    title: "Professor",
    office: "A522",
    email: "btucker@sun.ac.za",
    website: "https://researcherprofiles.sun.ac.za/37639-bill-tucker",
    telephone: "+27 21 808 3382",
    researchInterests:
      "Computer networks and their applications; human computer interaction; social impact; ethical, responsible, and sustainable computing",
    image: "/assets/images/staff/btucker.jpg",
  },
  {
    name: "Brink van der Merwe",
    title: "Professor, Head of Division",
    office: "A511",
    email: "abvdm@cs.sun.ac.za",
    website: "https://www.cs.sun.ac.za/~abvdm/",
    telephone: "+27 21 808 4232",
    researchInterests:
      "Tree automata and applications, Learning of grammars and languages from data",
    image: "/assets/images/staff/abvdm.jpg",
  },
  {
    name: "Lynette van Zijl",
    title: "Professor",
    office: "A520",
    email: "lvzijl@sun.ac.za",
    website: "https://www.cs.sun.ac.za/~lvzijl/",
    telephone: "+27 21 808 4232",
    researchInterests:
      "Implementation and applications of automata; assistive technologies",
    image: "/assets/images/staff/lvzijl.jpg",
  },
  {
    name: "Wolf-Tilo Balke and Florian Plötzky",
    title: "Visiting Academic",
    email: "balke@ifis.cs.tu-bs.de",
    website: "http://www.ifis.cs.tu-bs.de/staff/balke",
    telephone: "+27 21 808 4232",
    researchInterests:
      "Query Processing, User Preferences and Personalization, Cognitive User Modeling and Conceptualization, Peer-to-Peer Networks and Distributed Retrieval",
    image: "/assets/images/staff/tbalke.jpg",
  },
  {
    name: "Willem Visser",
    title: "Part-time Professor",
    office: "A517",
    email: "visserw@sun.ac.za",
    website: "https://www.cs.sun.ac.za/~wvisser/",
    telephone: "+27 21 808 4232",
    researchInterests:
      "Software engineering, testing, symbolic execution, and model checking",
    image: "/assets/images/staff/visserw.jpg",
  },
  {
    name: "Fabian Yamaguchi",
    title: "Professor Extraordinary",
    email: "fabs@shiftleft.io",
    website: "https://fabs.codeminers.org/",
    researchInterests: "Computer security, Program analysis, Machine learning",
    image: "/assets/images/staff/fabian3.jpg",
  },
];

export const administrativeStaff: StaffMember[] = [
  {
    name: "Emile Dreyer",
    office: "A507",
    email: "edreyer@sun.ac.za",
    telephone: "+27 21 808 4232",
  },
  {
    name: "Gaynor Fortuin",
    title: "Administrative Officer",
    office: "A514",
    email: "gfortuin@sun.ac.za",
    telephone: "+27 21 808 4232",
    image: "/assets/images/staff/gfortuin.jpg",
  },
  {
    name: "Derrick Stephanus",
    title: "Assistant",
    office: "A507",
    email: "djstep@sun.ac.za",
    telephone: "+27 21 808 4232",
    image: "/assets/images/staff/djstep.jpg",
  },
];
