const blogs = [
  {
    id: 1,
    title: "Getting Started with React",
    author: "Rajath S",
    date: "March 1, 2025",
    category: "React",
    summary: "A beginner's guide to understanding React components, props, and state.",
    content: `React is a JavaScript library for building user interfaces. It lets you build reusable components that manage their own state. In this post we cover the basics of JSX, props, and useState. Once you understand these three things, you are well on your way to building full React applications. Components are the building blocks of any React app. Each component is a function that returns JSX — a syntax that looks like HTML but is actually JavaScript. Props allow you to pass data from a parent component to a child component. State allows a component to manage its own data and re-render when that data changes.`,
  },
  {
    id: 2,
    title: "Understanding useEffect",
    author: "R Pradhyumna",
    date: "March 5, 2025",
    category: "React",
    summary: "Learn how and when to use the useEffect hook in your React apps.",
    content: `The useEffect hook lets you perform side effects in function components. Side effects include things like fetching data, setting up subscriptions, or manually changing the DOM. useEffect runs after every render by default. You can control when it runs by passing a dependency array as the second argument. If you pass an empty array, it only runs once after the first render. If you pass variables in the array, it runs whenever those variables change. You can also return a cleanup function from useEffect to clean up subscriptions or timers when the component unmounts.`,
  },
  {
    id: 3,
    title: "React Router Basics",
    author: "Ravi P",
    date: "March 10, 2025",
    category: "Routing",
    summary: "How to set up multi-page navigation in a React SPA using React Router.",
    content: `React Router is the standard library for routing in React. It allows you to build single-page applications with multiple views. You wrap your app in a BrowserRouter, then define Routes and Route components to map URLs to components. The NavLink component is like a regular anchor tag but it automatically adds an active class when its route is active. Dynamic routes use a colon before the parameter name, like /blog/:id. You can access the parameter inside the component using the useParams hook. This lets you build pages that change content based on the URL.`,
  },
  {
    id: 4,
    title: "Styling in React",
    author: "Rocky",
    date: "March 14, 2025",
    category: "CSS",
    summary: "Exploring different ways to style your React components.",
    content: `There are many ways to style React components. The simplest is plain CSS files imported into your component. You can also use inline styles by passing a JavaScript object to the style prop. CSS Modules scope your styles locally to avoid conflicts. For more advanced setups, libraries like Tailwind CSS or styled-components give you more control. Each approach has its own trade-offs. Plain CSS is simple and familiar. Inline styles are easy for dynamic values. CSS Modules are great for larger projects. Tailwind speeds up development with utility classes.`,
  },
];

export default blogs;