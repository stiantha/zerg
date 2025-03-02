import { Categories } from '../types/index';

export const categories: Categories = {
  pages: [
    { name: "Home", keybind: "h" },
    { name: "About", keybind: "a" },
    { name: "Contact", keybind: "c" },
    { name: "Blog", keybind: "b" }
  ],
  main: [
    {
      name: "Programming Languages",
      color: "text-pink-400",
      subItems: [
        { name: "JavaScript" },
        { name: "Python" },
        { name: "Java" },
        { name: "C++" },
        { name: "Ruby" }
      ]
    },
    {
      name: "Web Development",
      color: "text-pink-400",
      subItems: [
        { name: "HTML/CSS" },
        { name: "Frontend" },
        { name: "Backend" },
        { name: "RESTful APIs" }
      ]
    },
    {
      name: "Databases",
      color: "text-pink-400",
      subItems: [
        { name: "SQL" },
        { name: "NoSQL" },
        { name: "ORM" },
        { name: "Database Design" }
      ]
    },
    {
      name: "DevOps",
      color: "text-pink-400",
      subItems: [
        { name: "CI/CD" },
        { name: "Docker" },
        { name: "Kubernetes" },
        { name: "Cloud" }
      ]
    },
    {
      name: "Data Structures",
      color: "text-pink-400",
      subItems: [
        { name: "Arrays" },
        { name: "Strings" },
        { name: "Linked Lists" },
        { name: "Trees and Graphs" },
      ]
    },
    {
      name: "Algorithms",
      color: "text-pink-400",
      subItems: [
        { name: "Sorting" },
        { name: "Searching" },
      ]
    },
    {
      name: "Software Architecture",
      color: "text-pink-400",
      subItems: [
        { name: "Design Patterns" },
        { name: "Microservices" },
        { name: "Serverless" },
      ]
    },
    {
      name: "Testing",
      color: "text-pink-400",
      subItems: [
        { name: "Unit Testing" },
        { name: "Integration Testing" },
        { name: "E2E Testing" },
        { name: "TDD" }
      ]
    },
    {
      name: "Mobile Development",
      color: "text-pink-400",
      subItems: [
        { name: "Swift" },
        { name: "Kotlin" },
        { name: "React Native" },
        { name: "Flutter" }
      ]
    },
  ],
};