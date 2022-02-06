import { replaceSpaceWithUnderscore } from "../../core/utils";

const Heading2 = ({ children }: any) => {
  console.log(children);
  const idText = replaceSpaceWithUnderscore(children);

  return <h2 id={idText}>{children}</h2>;
};
export default Heading2;
