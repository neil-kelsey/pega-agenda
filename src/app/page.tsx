import Image from "next/image";
import styles from "./page.module.css";
import exampleData from "./data/test-data.json";

export default function Home() {
  return (
    <main className={styles.main}>
      {exampleData.activities.map((activity, index) => (
        <p key={index}>Hello world</p>
      ))}
    </main>
  );
}
