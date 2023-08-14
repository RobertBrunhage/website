import twitter from "../../public/assets/icons/twitter.svg";
import discord from "../../public/assets/icons/discord.svg";
import youtube from "../../public/assets/icons/youtube.svg";
import patreon from "../../public/assets/icons/patreon.svg";

interface Social {
  img: string;
  href: string;
  alt: string;
}

const Socials: Social[] = [
  {
    img: twitter,
    href: "https://twitter.com/RobertBrunhage",
    alt: "twitter",
  },
  {
    img: discord,
    href: "https://discord.gg/CPwSezC",
    alt: "discord",
  },
  {
    img: youtube,
    href: "https://youtube.com/robertbrunhage",
    alt: "youtube",
  },
  {
    img: patreon,
    href: "https://www.patreon.com/RobertBrunhage",
    alt: "patreon",
  },
];

export default Socials;
