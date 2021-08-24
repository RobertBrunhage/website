interface FAQ {
  question: string;
  answer: string;
}

const NavItems: FAQ[] = [
  { question: "Will it be free?", answer: "No 😅" },
  {
    question: "If I am a beginner will I still be able to take the course",
    answer: "Yes, but keep in mind that I won't be explaining basic topics such as 'What is a Row'",
  },
  {
    question: "Will you teach about Null safety",
    answer:
      "I will use the latest version of Flutter so in that term we will use Null safety, but I won't specifcally teach about it.",
  },
  { 
    question: "Will the source code be included?", 
    answer: "Yes 😎" 
  },
  {
    question: "What will it be priced?",
    answer:
      "I don't know yet. I want to complete the first module with as high production quality as I can. I will set a price depending on how good I can deliver the value to you.",
  },
];

export default NavItems;
