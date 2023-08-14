import Image from "next/image";
import styles from "./infoCard.module.scss";

import checkmark from "../../public/assets/icons/checkmark.png";

interface InfoCardProps {
  info: string;
}

const InfoCard = ({ info }: InfoCardProps) => {
  return (
    <div className={styles.infoCard_container}>
      <div className={styles.icon}>
        <Image src={checkmark} alt="checkmark" />
      </div>
      <p>{info}</p>
    </div>
  );
};

export default InfoCard;
