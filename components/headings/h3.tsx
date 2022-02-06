import { replaceSpaceWithUnderscore } from "../../core/utils";

const Heading3 = ({ children }: any) => {
  const idText = replaceSpaceWithUnderscore(children);

  return <h3 id={idText}>{children}</h3>;
};
export default Heading3;
