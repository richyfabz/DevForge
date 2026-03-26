// This is your mock database.
// In a real app, this data would come from an API call.
// We export it as a named constant so any file can import it.

export const courses = [
  {
    id: '1',
    title: 'React from Zero to Production',
    instructor: 'Sarah Chen',
    level: 'Intermediate',
    duration: '12h 30m',
    students: 4821,
    rating: 4.9,
    category: 'Frontend',
    description:
      'Master React hooks, context, performance optimization, and real-world patterns used in production codebases.',
    thumbnail: '⚛️',
    lessons: [
      { id: 'l1', title: 'Why React? The Virtual DOM explained', duration: '12m' },
      { id: 'l2', title: 'JSX is not HTML — key differences', duration: '9m' },
      { id: 'l3', title: 'useState and the re-render cycle', duration: '18m' },
      { id: 'l4', title: 'useEffect — side effects done right', duration: '22m' },
      { id: 'l5', title: 'Building your first custom hook', duration: '15m' },
    ],
  },
  {
    id: '2',
    title: 'Node.js API Engineering',
    instructor: 'Marcus Webb',
    level: 'Advanced',
    duration: '10h 15m',
    students: 3102,
    rating: 4.8,
    category: 'Backend',
    description:
      'Build production-grade REST APIs with Node.js, Express, JWT auth, and PostgreSQL from scratch.',
    thumbnail: '🟢',
    lessons: [
      { id: 'l1', title: 'Node.js event loop deep dive', duration: '20m' },
      { id: 'l2', title: 'Express routing and middleware', duration: '25m' },
      { id: 'l3', title: 'JWT authentication from scratch', duration: '30m' },
      { id: 'l4', title: 'PostgreSQL with raw SQL and ORM', duration: '28m' },
      { id: 'l5', title: 'Error handling patterns', duration: '16m' },
    ],
  },
  {
    id: '3',
    title: 'Solidity & Smart Contract Dev',
    instructor: 'Ade Okafor',
    level: 'Intermediate',
    duration: '8h 45m',
    students: 2650,
    rating: 4.7,
    category: 'Web3',
    description:
      'Write, test, and deploy Solidity smart contracts on Ethereum. Covers ERC-20, security patterns, and Hardhat.',
    thumbnail: '🔷',
    lessons: [
      { id: 'l1', title: 'How the EVM executes code', duration: '18m' },
      { id: 'l2', title: 'Writing your first contract', duration: '22m' },
      { id: 'l3', title: 'ERC-20 token from scratch', duration: '35m' },
      { id: 'l4', title: 'Common security vulnerabilities', duration: '28m' },
      { id: 'l5', title: 'Deploying with Hardhat', duration: '20m' },
    ],
  },
  {
    id: '4',
    title: 'Python for Data Engineering',
    instructor: 'Priya Nair',
    level: 'Beginner',
    duration: '14h 00m',
    students: 5930,
    rating: 4.9,
    category: 'Data',
    description:
      'ETL pipelines, pandas, SQLAlchemy, and building production data workflows with Python.',
    thumbnail: '🐍',
    lessons: [
      { id: 'l1', title: 'Python environments and packaging', duration: '14m' },
      { id: 'l2', title: 'pandas DataFrames in depth', duration: '30m' },
      { id: 'l3', title: 'Building an ETL pipeline', duration: '40m' },
      { id: 'l4', title: 'SQLAlchemy ORM basics', duration: '25m' },
      { id: 'l5', title: 'Scheduling and automation', duration: '20m' },
    ],
  },
]