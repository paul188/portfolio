import { About, Blog, Gallery, Home, Misc, Newsletter, Person, Social, Work } from "@/types";

const person: Person = {
  firstName: "Paul",
  lastName: "Johannssen",
  name: `Paul Johannssen`,
  role: "PhD Candidate · Software Engineer",
  avatar: "/images/avatar.jpg",
  email: "pauljoh@gmx.de",
  location: "Europe/Berlin",
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
  description: `Portfolio of Paul Johannssen — PhD candidate and full-stack engineer specialising in cloud infrastructure for regulated medical data.`,
  headline: (
    <>
      I'm Paul, a PhD candidate at University Hospital Bonn.
    </>
  ),
  featured: {
    display: false,
    title: <>Featured Project</>,
    href: "/work/neurodare",
  },
  subline: (
    <>
      I build cloud infrastructure for complex neuroimaging datasets and lead
      development of real-time web apps that scale to thousands of users at
      once.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About Me",
  title: `About Me – ${person.name}`,
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
        Hospital Bonn, with a Master's in Mathematics. I build cloud
        infrastructure for highly regulated medical-imaging data and web apps
        that thousands of people use at once. I also co-lecture on applied
        cryptography.
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
        role: "PhD Candidate & Co-Lecturer",
        achievements: [
          <>
            Built and deployed a secure cloud data platform for highly
            regulated neuroradiological datasets, using a microservices
            architecture.
          </>,
          <>
            Managed two freelance developers and owned full-stack development,
            DevOps, data pipelines, and SQL database architecture.
          </>,
          <>
            Co-lectured on Fully Homomorphic Encryption and Keyed Hash-Maps
            for the cybersecurity faculty.
          </>,
          <>
            Led development of{" "}
            <strong>Noten und Neuronen</strong> (
            <a className="text-link" href="https://notenundneuronen.de" target="_blank" rel="noopener noreferrer">
              notenundneuronen.de
            </a>
            ), a real-time web app that scaled to 2,500 simultaneous mobile
            users for a live neuroscience concert series.
          </>,
        ],
        images: [
          {
            src: "/images/projects/noten-neuronen-about.jpg",
            alt: "Pianist and orchestra on stage at a Noten und Neuronen concert",
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
            Developed ML surrogate models that simulate cellular interactions
            and tissue structures.
          </>,
          <>
            Implemented generative diffusion models, U-Nets, and PointNets.
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
            Processed and analysed large, sensitive demographic datasets in an
            engineering team.
          </>,
          <>
            Worked with pull requests, code reviews, and CI/CD on GitHub
            Actions.
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
        timeframe: "Oct. 2022 – Sep. 2025",
        description: <>M.Sc. in Mathematics — Grade 1.3</>,
      },
      {
        name: "Ludwig-Maximilians-Universität München",
        timeframe: "Jan. 2019 – Jul. 2022",
        description: (
          <>B.Sc. in Mathematics — Grade 1.19; Minor in Theoretical Physics</>
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
            TypeScript, Vue 3, Vite, Firebase (Firestore, Realtime DB, Cloud
            Functions).
          </>
        ),
        tags: [],
        images: [],
      },
      {
        title: "Machine Learning & Mathematics",
        description: (
          <>
            PyTorch, diffusion models, U-Nets, PointNets, numerical
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
  label: "Projects",
  title: `Projects – ${person.name}`,
  description: `Engineering and research projects by ${person.name}`,
};

const misc: Misc = {
  path: "/misc",
  label: "Misc",
  title: `Misc – ${person.name}`,
  description: `Awards, publications, and open-source contributions by ${person.name}`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  images: [],
};

export { person, social, newsletter, home, about, blog, work, misc, gallery };
