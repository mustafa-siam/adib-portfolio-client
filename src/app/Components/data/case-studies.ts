export type KeyStat = {
  value: string;
  label: string;
};

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  avatar: string;
};

export type CaseStudy = {
  id: string; // "1", "2", "3", "4"
  slug: string;
  title: string;
  category: string;
  tags: string[];
  poster: string;
  videoUrl?: string;
  summary: string;
  clientBadge?: string;
  roleBadge?: string;
  liveLink?: string;

  // Overview Data
  overview: {
    heading: string;
    description: string;
    stats: KeyStat[];
  };

  // Process Data
  process: {
    heading: string;
    description: string;
    steps: ProcessStep[];
    image: string;
  };

  // Testimonial Data
  testimonial?: Testimonial;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "1",
    slug: "strida",
    title: "EBL Startup Explainer Film",
    category: "Video Editing Portfolio",
    tags: ["portfolio", "sidebar"],
    poster: "/vedio.jpeg",
    videoUrl: "https://youtu.be/wa_1jCRZb24",
    summary:
      "A two-minute product story shaped for a startup stage, edited in 48 hours with clarity, pace, and a polished final finish.",
    clientBadge: "Zagle.ai / EBL Undergrad Startup Challenge 2025",
    roleBadge: "Creative direction + post production",
    liveLink: "https://youtu.be/wa_1jCRZb24",

    overview: {
      heading: "Built to make the pitch feel obvious.",
      description:
        "The edit removed friction from the idea. The final film moved from problem to product to proof without asking the audience to work too hard.",
      stats: [
        { value: "48h", label: "from rough brief to final delivery" },
        { value: "2:00", label: "runtime built for stage attention" },
        { value: "2nd", label: "place in the startup challenge" },
        { value: "4", label: "core services in one edit sprint" },
      ],
    },

    process: {
      heading: "Less confusion. More momentum.",
      description:
        "The work was to make the idea feel inevitable: simple story, sharp pacing, quiet motion, clean sound, and a final export that felt ready for judges.",
      steps: [
        {
          number: "01",
          title: "Story spine",
          description: "Problem, promise, proof, close.",
        },
        {
          number: "02",
          title: "Rhythm edit",
          description: "Every cut kept the pitch moving.",
        },
        {
          number: "03",
          title: "Motion polish",
          description: "Product moments were lifted without taking over.",
        },
      ],
      image: "/vedio2.jpeg",
    },

    testimonial: {
      quote: "Adib took full charge of the creative direction and post production.",
      author: "Fahim Ahmed Nafis",
      role: "Founder & CEO, Zagle.ai",
      avatar: "/vedio1.jpeg",
    },
  },
  {
    id: "2",
    slug: "bravo",
    title: "Bravo App Showcase",
    category: "UI/UX Design",
    tags: ["UI/UX", "App"],
    poster: "/vedio1.jpeg",
    videoUrl: "https://youtu.be/4GFq-MGiemw",
    summary:
      "An intuitive and streamlined mobile banking experience created for seamless micro-transactions.",
    clientBadge: "Bravo Mobile Inc.",
    roleBadge: "UI/UX & Interactive Design",
    liveLink: "https://youtu.be/4GFq-MGiemw",

    overview: {
      heading: "Designed for effortless user navigation.",
      description:
        "Redesigned the onboarding funnel to reduce drop-offs and improve user retention across mobile platforms.",
      stats: [
        { value: "3x", label: "faster user onboarding" },
        { value: "98%", label: "user satisfaction rating" },
        { value: "12k+", label: "daily active users" },
      ],
    },

    process: {
      heading: "Iterative design backed by feedback.",
      description:
        "We mapped user flows, stress-tested high-friction screens, and implemented clean micro-interactions.",
      steps: [
        {
          number: "01",
          title: "Wireframing",
          description: "Core journeys mapped for intuitive flow.",
        },
        {
          number: "02",
          title: "Prototyping",
          description: "High-fidelity interactive visual models.",
        },
      ],
      image: "/vedio3.jpeg",
    },

    testimonial: {
      quote: "The interface simplified complex financial workflows into a delight for users.",
      author: "Alex Rivera",
      role: "Product Lead, Bravo Inc.",
      avatar: "/vedio2.jpeg",
    },
  },
  {
    id: "3",
    slug: "quattro",
    title: "Quattro Brand Experience",
    category: "Branding & Web",
    tags: ["branding", "web"],
    poster: "/vedio2.jpeg",
    videoUrl: "https://youtu.be/-oeIg7eQ6us",
    summary:
      "A complete digital overhaul blending high-end typography with interactive visual storytelling.",
    clientBadge: "Quattro Studio Design",
    roleBadge: "Brand Identity & Front-end Development",
    liveLink: "https://youtu.be/-oeIg7eQ6us",

    overview: {
      heading: "Evolving brand identity for a modern web.",
      description:
        "Shifted Quattro from traditional media presence to a cutting-edge web-first brand system with interactive webGL elements.",
      stats: [
        { value: "+150%", label: "increase in web engagement" },
        { value: "1.2s", label: "average page load speed" },
        { value: "5", label: "awards won in web design" },
      ],
    },

    process: {
      heading: "Precision in brand architecture.",
      description:
        "Built modular design systems and fluid motion guidelines to ensure consistent visual presence across all digital touchpoints.",
      steps: [
        {
          number: "01",
          title: "Brand Discovery",
          description: "Defining core positioning and voice.",
        },
        {
          number: "02",
          title: "Visual Identity",
          description: "Typography, grid systems, and motion rules.",
        },
        {
          number: "03",
          title: "Web Engineering",
          description: "Optimized Next.js frontend implementation.",
        },
      ],
      image: "/vedio.jpeg",
    },

    testimonial: {
      quote: "Our visual presence underwent a complete rebirth that resonated deeply with clients.",
      author: "Samantha Vance",
      role: "Design Director, Quattro",
      avatar: "/vedio3.jpeg",
    },
  },
  {
    id: "4",
    slug: "nitro",
    title: "Nitro Product Platform",
    category: "Product Design",
    tags: ["product", "landing"],
    poster: "/vedio3.jpeg",
    videoUrl: "https://youtu.be/tU5MbLX5R70",
    summary:
      "A high-conversion landing page and design system created for an AI-powered productivity tool.",
    clientBadge: "Nitro Tech Labs",
    roleBadge: "Product Design & Motion Polish",
    liveLink: "https://youtu.be/tU5MbLX5R70",

    overview: {
      heading: "Engineered for maximum conversion.",
      description:
        "Transformed complex technical capabilities into clear, digestible product demonstrations that convert passive viewers into active signups.",
      stats: [
        { value: "42%", label: "boost in signup conversion" },
        { value: "100k", label: "first-month active users" },
        { value: "0.4s", label: "time-to-interactive metric" },
      ],
    },

    process: {
      heading: "Frictionless story progression.",
      description:
        "Eliminated fluff to highlight core value props through interactive micro-demos embedded directly into the scroll sequence.",
      steps: [
        {
          number: "01",
          title: "Funnel Analysis",
          description: "Pinpointed high drop-off interaction points.",
        },
        {
          number: "02",
          title: "Interactive Demos",
          description: "Integrated inline functional product previews.",
        },
      ],
      image: "/vedio1.jpeg",
    },

    testimonial: {
      quote: "The bounce rate dropped instantly once the new product landing page went live.",
      author: "David Chen",
      role: "Head of Growth, Nitro",
      avatar: "/vedio.jpeg",
    },
  },
];