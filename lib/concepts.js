// lib/concepts.js
export const concepts = [
  {
    id: 1,
    slug: "closure",
    title: "JavaScript Closures",
    subtitle: "Pizza Chef Memory System",
    description:
      "Learn how closures let functions remember things from where they were created using an interactive pizza chef demo with three chefs managing their own private memories.",
    difficulty: "intermediate",
    icon: "🍕",
    estimatedTime: "15 min",
    category: "fundamentals",
    demoPath: "/demos/Closure/index.html",
    readmePath: "/demos/Closure/README.md",
    tags: ["functions", "scope", "memory", "closures", "encapsulation"],
  },
  {
    id: 2,
    slug: "debouncing",
    title: "Debouncing",
    subtitle: "Smart Search Optimization",
    description:
      "Master debouncing with a side-by-side comparison of normal vs debounced behavior. See how debouncing reduces API calls from 5 to 1 when typing 'hello' with real-world search functionality.",
    difficulty: "intermediate",
    icon: "🔍",
    estimatedTime: "12 min",
    category: "performance",
    demoPath: "/demos/Debouncing/index.html",
    readmePath: "/demos/Debouncing/README.md",
    tags: ["performance", "optimization", "events", "async", "api-calls"],
  },
  {
    id: 3,
    slug: "array-methods",
    title: "Array Methods",
    subtitle: "Travel Destination Planner",
    description:
      "Explore 6 essential array methods (map, filter, reduce, find, sort, forEach) through an interactive travel planning demo with 15 global destinations. Build your wishlist and see real-time statistics.",
    difficulty: "beginner",
    icon: "✈️",
    estimatedTime: "20 min",
    category: "fundamentals",
    demoPath:
      "/demos/Travel Destination Planner - Array Methods Demo/index.html",
    readmePath:
      "/demos/Travel Destination Planner - Array Methods Demo/README.md",
    tags: ["arrays", "map", "filter", "reduce", "functional-programming"],
  },
  {
    id: 4,
    slug: "event-delegation",
    title: "Event Delegation",
    subtitle: "Digital Fireworks Show",
    description:
      "Master event delegation through spectacular fireworks! Click anywhere to create fireworks, all handled by ONE event listener. Watch real-time stats showing how a single listener manages infinite click locations.",
    difficulty: "intermediate",
    icon: "🎆",
    estimatedTime: "12 min",
    category: "dom",
    demoPath: "/demos/Event Delegation/index.html",
    readmePath: "/demos/Event Delegation/README.md",
    tags: ["events", "dom", "performance", "bubbling", "delegation"],
  },
  {
    id: 5,
    slug: "promises-async-await",
    title: "Promises & Async/Await",
    subtitle: "Car Wash Simulator",
    description:
      "Understand async JavaScript through an interactive car wash with 6 sequential stages. Experience Promise.all (parallel lanes), Promise.race (fastest wins), and error handling with random machine failures.",
    difficulty: "intermediate",
    icon: "🚗",
    estimatedTime: "18 min",
    category: "async",
    demoPath: "/demos/Car Wash Promises & Async Await/index.html",
    readmePath: "/demos/Car Wash Promises & Async Await/README.md",
    tags: ["async", "promises", "await", "sequential", "parallel"],
  },
  {
    id: 6,
    slug: "higher-order-functions",
    title: "Higher Order Functions",
    subtitle: "Movie Rating Aggregator",
    description:
      "Build a custom movie rating algorithm using currying, partial application, and composition. Adjust weight sliders for IMDb, Rotten Tomatoes, Metacritic, and Audience scores across 12 popular movies.",
    difficulty: "intermediate",
    icon: "🎬",
    estimatedTime: "15 min",
    category: "fundamentals",
    demoPath:
      "/demos/Movie Rating Aggregator - Higher Order Functions/index.html",
    readmePath:
      "/demos/Movie Rating Aggregator - Higher Order Functions/README.md",
    tags: ["functions", "currying", "composition", "functional-programming"],
  },
];

export const getConceptBySlug = (slug) => {
  return concepts.find((concept) => concept.slug === slug);
};

export const getConceptsByDifficulty = (difficulty) => {
  return concepts.filter((concept) => concept.difficulty === difficulty);
};

export const getConceptsByCategory = (category) => {
  return concepts.filter((concept) => concept.category === category);
};

export const getAllCategories = () => {
  const categories = [...new Set(concepts.map((c) => c.category))];
  return categories;
};

export const getAllTags = () => {
  const allTags = concepts.flatMap((c) => c.tags);
  return [...new Set(allTags)];
};

// Difficulty levels with metadata
export const difficultyLevels = {
  beginner: {
    label: "Beginner",
    color: "green",
    description: "Perfect for getting started",
  },
  intermediate: {
    label: "Intermediate",
    color: "yellow",
    description: "Some JS knowledge required",
  },
  advanced: {
    label: "Advanced",
    color: "red",
    description: "Deep JavaScript concepts",
  },
};

// Categories with metadata
export const categories = {
  fundamentals: {
    label: "Fundamentals",
    icon: "🎯",
    description: "Core JavaScript concepts",
  },
  performance: {
    label: "Performance",
    icon: "⚡",
    description: "Optimization techniques",
  },
  async: {
    label: "Async",
    icon: "⏰",
    description: "Asynchronous programming",
  },
  dom: {
    label: "DOM",
    icon: "🌐",
    description: "Browser and DOM manipulation",
  },
  advanced: {
    label: "Advanced",
    icon: "🚀",
    description: "Advanced patterns and concepts",
  },
};
