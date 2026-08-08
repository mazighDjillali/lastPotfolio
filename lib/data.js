/**
 * All portfolio content in one place.
 * Voice: first-person, confident but understated. Sentence case.
 * Pop-culture references live here as content — never as skin.
 */

export const person = {
  name: "DJILLALI Mazigh",
  headline: "AI & Software Engineer",
  location: "El Marsa, Algiers",
  email: "mazigh.DJILLALI@gmail.com",
  phone: "+213 7 76 78 81 22",
  linkedin: "https://linkedin.com/in/mazigh-DJILLALI-76b4a71a5",
  github: "https://github.com/mazighDJILLALI",
  about:
    "Computer vision, monitoring pipelines, and intelligent tooling for public services. Currently at Algérie Poste, where my work runs in front of real users every day. I care about reliability first, then speed, then polish.",
  languages: ["French", "English", "Arabic"],
};

export const heroTerminal = {
  title: "dmazigh@console:~",
  lines: [
    { text: "whoami" },
    { text: "ai-engineer · computer-vision · full-stack", prompt: false, dim: true },
    { text: "status --build" },
    { text: "✓ all systems nominal", prompt: false, dim: true },
    { text: "uptime --career" },
    { text: "shipping since 2021 · Algiers, DZ", prompt: false, dim: true },
  ],
};

export const experiences = [
  {
    company: "Algérie Poste — Head Office",
    role: "AI & Software Engineer",
    location: "Algiers",
    start: "Nov 2023",
    end: "Present",
    current: true,
    points: [
      "Developed a transaction monitoring tool using machine learning to detect suspicious behavior.",
      "Built a facial recognition-based access control system with liveness detection.",
      "Designed and developed monitoring systems for internal platforms.",
      "Implemented traffic prediction in post offices using video stream analysis.",
      "Supervised graduation and internship projects: video anomaly detection, cash prediction, registration platforms.",
      "Built a React Native + Express.js mobile app reporting ATM statuses nationwide.",
      "Mentored teams during the Algérie Poste hackathon on new postal solutions.",
    ],
  },
  {
    company: "CERIST",
    role: "Web Development Intern",
    location: "Algiers",
    start: "Jan 2021",
    end: "Jul 2021",
    points: [
      "Contributed to a scientific document repository for the R&D division.",
      "Built the user interface with Vue.js.",
      "Customized Drupal for access rights, document structure, and advanced search.",
    ],
  },
];

/* `icon` names the lead technology, and must match a key in lib/logos.js —
   TechMark falls back to a monogram for anything unmapped. `context` is the
   place the work was done, shown as the card's eyebrow. */
export const projects = [
  {
    title: "Transaction Monitoring",
    description:
      "Machine learning that flags suspicious transaction behaviour across the network, so review effort lands where it matters.",
    tags: ["Python", "scikit-learn", "SQL"],
    icon: "Python",
    context: "Algérie Poste",
    status: "now",
  },
  {
    title: "Facial Access Control",
    description:
      "Face recognition powered access control for secure entry points, with liveness checks against spoofing.",
    tags: ["OpenCV", "TensorFlow", "Vision"],
    icon: "OpenCV",
    image: "/art/project-access.svg",
    context: "Algérie Poste",
    status: "now",
  },
  {
    title: "Post Office Traffic Prediction",
    description:
      "Forecasts footfall from live video streams so branches can staff against demand instead of guesswork.",
    tags: ["OpenCV", "TensorFlow", "Python"],
    icon: "TensorFlow",
    context: "Algérie Poste",
    status: "now",
  },
  {
    title: "ATM Status Mobile App",
    description:
      "Real-time ATM statuses nationwide. React Native client, Express.js backend, live at Algérie Poste.",
    tags: ["React Native", "Express.js", "REST"],
    icon: "React Native",
    image: "/art/project-atm.svg",
    context: "Algérie Poste",
    status: "now",
  },
  {
    title: "Internal Platform Monitoring",
    description:
      "Monitoring for the internal platforms — uptime, throughput and failures in one place, rather than scattered across teams.",
    tags: ["Django", "Docker", "SQL"],
    icon: "Django",
    context: "Algérie Poste",
    status: "now",
  },
  {
    title: "Scientific Document Repository",
    description:
      "A repository centralising the R&D division's academic publications, with structured access rights and advanced search.",
    tags: ["Vue.js", "Drupal", "PHP"],
    icon: "Drupal",
    context: "CERIST",
  },
  {
    title: "Video Colorization with Deep Learning",
    description:
      "End-to-end pipeline for colorizing grayscale video using CNNs and RNNs, built on Keras and TensorFlow.",
    tags: ["Python", "TensorFlow", "Keras"],
    icon: "Keras",
    image: "/art/project-color.svg",
    context: "Master's project",
  },
  {
    title: "AR Campus Tours",
    description:
      "Augmented reality mobile app for virtual tours of USTHB, overlaying contextual info on campus landmarks.",
    tags: ["Android", "AR", "OpenCV"],
    icon: "Android Studio",
    image: "/art/project-ar.svg",
    context: "Academic project",
  },
];

export const skills = [
  { group: "Languages", items: ["Python", "JavaScript", "Java", "C"] },
  { group: "AI & vision", items: ["OpenCV", "TensorFlow", "Keras", "scikit-learn", "LangChain"] },
  { group: "Frameworks & tools", items: ["Django", "Express.js", "Next.js", "React Native", "Drupal", "Android Studio"] },
  { group: "Infrastructure", items: ["Git", "Docker", "SQL", "MongoDB", "RESTful APIs"] },
];

/* The three-beat at the end of person.about, spelled out for the About
   section — MeetSponsors makes the same move with its founder's reasons. */
export const principles = [
  {
    title: "Reliability first",
    body: "A cash machine that answers at six in the morning beats a clever model that answers most of the time.",
  },
  {
    title: "Then speed",
    body: "Queues, video streams and monitoring all fall apart if the answer arrives late. Latency is a feature.",
  },
  {
    title: "Then polish",
    body: "Once it holds up and keeps pace, it should be pleasant to use — but never at the cost of the first two.",
  },
];

export const education = [
  {
    degree: "Master's degree — Visual Computing",
    school: "USTHB, Algiers",
    start: "2021",
    end: "2023",
  },
  {
    degree: "Bachelor's degree — Computer Science",
    school: "USTHB, Algiers",
    start: "2019",
    end: "2021",
  },
];

/* The personal shelf — real titles, shown as content on the same
   PosterCard as projects. Reads as a shelf, not a movie site. */
export const favorites = [
  {
    title: "A New Hope",
    description: "Where it all started. Still the one I rewatch first.",
    rating: 9.8,
    runtime: "2h 1m",
    tags: ["Film", "1977"],
    image: "/art/fav-newhope.svg",
  },
  {
    title: "The Dark Side of the Moon",
    description: "Forty-three minutes, zero skips.",
    rating: 9.9,
    runtime: "43 min",
    tags: ["Album", "1973"],
    image: "/art/fav-darkside.svg",
  },
  {
    title: "Cinema night — sci-fi & noir",
    description: "Classics and modern sci-fi, with a soft spot for moody noir.",
    rating: 9.5,
    runtime: "2h 10m",
    tags: ["Movies", "Ritual"],
    image: "/art/fav-cinema.svg",
  },
  {
    title: "Handball",
    description: "Fast team play, strategy, and endurance on the court.",
    rating: 9.2,
    runtime: "90 min",
    tags: ["Team sport"],
    trending: true,
    image: "/art/fav-handball.svg",
  },
  {
    title: "Powerlifting",
    description: "Squat, bench, deadlift. Progressive overload, no shortcuts.",
    rating: 9.0,
    runtime: "75 min",
    tags: ["Strength"],
    image: "/art/fav-lifting.svg",
  },
  {
    title: "Co-op video games",
    description: "Strategy and teamwork sessions with friends.",
    rating: 8.8,
    runtime: "1h 30m",
    tags: ["Games", "Co-op"],
    image: "/art/fav-coop.svg",
  },
];

/* About-section wall board. Abstract slots captioned by title —
   no reproduced cover art. */
export const memorabilia = [
  { type: "vinyl", title: "The Dark Side of the Moon", subtitle: "1973 · on repeat" },
  { type: "poster", title: "A New Hope", subtitle: "1977" },
  { type: "photo", title: "El Marsa, Algiers", subtitle: "home base", image: "/portrait.jpeg" },
];
