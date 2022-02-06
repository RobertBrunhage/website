export const replaceSpaceWithUnderscore = (text: string) => {
  return text.replace(/ /g, "_").toLowerCase();
};

export const getHeadings = (rawContent: string) => {
  const headingLines = rawContent.split("\n").filter((line) => {
    return line.match(/^###*\s/);
  });
  console.log(headingLines);

  return headingLines.map((raw) => {
    const text = raw.replace(/^###*\s/, "");
    const id = replaceSpaceWithUnderscore(text);

    const level = raw.slice(0, 3) === "###" ? 3 : 2;
    console.log(text, level);

    return { text, id, level };
  });
};
