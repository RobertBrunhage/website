interface modules {
  name: string;
  description: string;
}

const modules: modules[] = [
  {
    name: "Module 1: Structure and Building UI",
    description:
      "Setting up the base structure of the project as well as building out the UI are two very important parts",
  },
  {
    name: "Module 2: State Management",
    description:
      "We are going to utilize Riverpod to build a robust state management solution and it will also be fully testable",
  },
  {
    name: "Module 3: Architecture & API",
    description:
      "Getting into the fun part of API calls we also have to think about a solid architecture, entities, repositories, services and so on",
  },
  {
    name: "Module 4: Error handling",
    description:
      "Making API or any other request with a chance of failure needs to be handled correctly. That is why we will utilize our architecture to make it easy to handle",
  },
  {
    name: "Module 5: Testing",
    description:
      "Learning Unit, Widget, and Integration testing and how to test using stub and mock data",
  },
  {
    name: "Module 6: Solid Animations",
    description:
      "Solid animations are animations that aren’t over the top but enhances the users’ experience, such as staggered animations",
  },
];

export default modules;
