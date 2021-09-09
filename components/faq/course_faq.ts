interface FAQ {
  question: string;
  answer: string;
}

const FAQ: FAQ[] = [
  {
    question: "If I am a beginner will I still be able to take the course?",
    answer:
      "Yes, of course! But keep in mind that I won’t explain simpler concepts like “what is a row”.",
  },
  {
    question: "Will you teach about Null safety?",
    answer:
      "I will use the latest version of Flutter so in that regard, yes. But I will not specifically teach about null safety.",
  },
  {
    question: "Will the source code be included?",
    answer: "Yes, of course!",
  },
  {
    question: "Can I buy a team bundle?",
    answer:
      "Of course, just send me an email at hello@robertbrunhage.com, and can set up a bundle for your entire team.",
  },
  {
    question: "Any other questions?",
    answer:
      "Shoot me an email at  hello@robertbrunhage.com and, I will answer any questions you may have.",
  },
];

export default FAQ;
