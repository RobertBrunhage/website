import styles from "./toc.module.scss";

interface TOCProps {
  headings: {
    text: string;
    id: string;
    level: number;
  }[];
}
export const TOC = ({ headings }: TOCProps) => {
  const headingStyles = (level: number) => {
    switch (level) {
      case 2:
        return styles.second;
      case 3:
        return styles.third;
      case 4:
        return styles.fourth;
      default:
        return styles.first;
    }
  };

  if (headings.length === 0) {
    return null;
  }
  return (
    <div className={styles.table_of_contents}>
      <h3>Table of contents</h3>
      <nav>
        <ol>
          {headings?.map((heading) => (
            <li key={heading.text} className={headingStyles(heading.level)}>
              <a href={`#${heading.id}`}>{heading.text}</a>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};
