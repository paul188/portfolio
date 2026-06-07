import { About, Blog, Gallery, Home, Misc, Newsletter, Person, Social, Work } from "@/types";

const person: Person = {
  firstName: "Paul",
  lastName: "Johannssen",
  name: `Paul Johannssen`,
  role: "PhD Candidate · Software Lead",
  avatar: "/images/avatar.jpg",
  email: "pauljoh@gmx.de",
  location: "Europe/Berlin",
  displayLocation: "Europe/Bonn",
  languages: ["German", "English"],
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>Updates on my research and projects</>,
};

const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/paul188",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio of Paul Johannssen — PhD candidate, software lead, and full-stack engineer specialising in cloud infrastructure for regulated medical data.`,
  headline: <>Engineering at the intersection of medicine, math, and software</>,
  featured: {
    display: true,
    title: <>Featured Project</>,
    href: "/work/noten-und-neuronen",
  },
  subline: (
    <>
      I'm Paul — a PhD candidate at{" "}
      <strong>University Hospital Bonn</strong> building cloud infrastructure
      for complex neuroimaging datasets, and leading agile development of
      real-time web apps that scale to thousands of simultaneous users.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} based in Bonn, Germany`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        PhD candidate at the Translational Neuroimaging Group, University
        Hospital Bonn, with a Master's degree in Mathematics from the University
        of Bonn. I design and operate cloud infrastructure for highly regulated
        neuroradiological datasets, lead a team of freelance developers, and
        build production systems that handle thousands of concurrent users. I
        also co-lecture on advanced cryptography — including Fully Homomorphic
        Encryption — in the university's cybersecurity faculty.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Translational Neuroimaging Group, University Hospital Bonn",
        timeframe: "Nov. 2025 – Present",
        role: "PhD Candidate, Software Lead & Co-Lecturer",
        achievements: [
          <>
            Designed, built, and deployed a fully functional secure cloud
            infrastructure and data platform for complex, highly regulated
            neuroradiological datasets using a microservices architecture.
          </>,
          <>
            Managed a team of two freelance developers; owned end-to-end
            responsibility for full-stack development, DevOps, automated data
            pipelines, and SQL database architecture.
          </>,
          <>
            Led agile development of{" "}
            <strong>Noten und Neuronen</strong> — a high-concurrency real-time
            web app scaling to 2,500 simultaneous mobile users for a live
            neuroscience concert series.
          </>,
          <>
            Co-lectured on advanced cryptographic techniques (Fully Homomorphic
            Encryption, Keyed Hash-Maps) for the cybersecurity faculty.
          </>,
        ],
        images: [
          {
            src: "/images/projects/noten-neuronen-about.jpg",
            alt: "Noten und Neuronen concert",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Life & Medical Sciences Institute Bonn",
        timeframe: "Jul. 2024 – Sep. 2025",
        role: "Working Student — Machine Learning Engineering",
        achievements: [
          <>
            Developed and optimised ML surrogate models to simulate complex,
            high-dimensional cellular interactions and tissue structures.
          </>,
          <>
            Implemented cutting-edge deep learning architectures including
            generative diffusion models, U-Nets, and PointNets.
          </>,
        ],
        images: [],
      },
      {
        company: "German Aerospace Center (DLR), Institute for Software Technology",
        timeframe: "Mar. 2023 – Mar. 2024",
        role: "Working Student — Data Engineering",
        achievements: [
          <>
            Processed, cleaned, and analysed large-scale sensitive demographic
            datasets within a professional engineering team.
          </>,
          <>
            Maintained strict coding standards and enterprise CI/CD workflows
            using Git, pull requests, rigorous code reviews, and GitHub Actions.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "Rheinische Friedrich-Wilhelms-Universität Bonn",
        description: (
          <>M.Sc. in Mathematics — Grade 1.3 (Oct. 2022 – Sep. 2025)</>
        ),
      },
      {
        name: "Ludwig-Maximilians-Universität München",
        description: (
          <>
            B.Sc. in Mathematics — Grade 1.19; Minor in Theoretical Physics
            (Jan. 2019 – Jul. 2022)
          </>
        ),
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills",
    skills: [
      {
        title: "Backend & Infrastructure",
        description: (
          <>
            Python, FastAPI, PostgreSQL, Docker, Linux hosting, CI/CD pipelines,
            microservices architecture, cloud infrastructure for regulated data.
          </>
        ),
        tags: [],
        images: [],
      },
      {
        title: "Frontend & Real-time Systems",
        description: (
          <>
            TypeScript, Vue 3, Firebase (Firestore, Realtime DB, Cloud
            Functions), Vite — including systems scaled to 2,500 concurrent
            users.
          </>
        ),
        tags: [],
        images: [],
      },
      {
        title: "Machine Learning & Mathematics",
        description: (
          <>
            PyTorch, diffusion models, U-Nets, PointNets, surrogate learning.
            Strong theoretical foundation in mathematics and numerical
            optimisation (C++, Eigen3).
          </>
        ),
        tags: [],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about engineering and research",
  description: `Read what ${person.name} has been up to recently`,
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Engineering and research projects by ${person.name}`,
};

const misc: Misc = {
  path: "/misc",
  label: "Misc",
  title: `Misc – ${person.name}`,
  description: `Papers, preprints, and open-source contributions by ${person.name}`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  images: [],
};

export { person, social, newsletter, home, about, blog, work, misc, gallery };
