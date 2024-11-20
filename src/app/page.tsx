"use client";
import styles from "./page.module.css";
import { Chat } from "@/components/Chat";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className="bg-white w-full">
        <div>
          {/* <SeparaterSVG bgColor="#ffffff" id="service" /> */}
          <div className="bg-[#ffffff]">
            <Chat />
          </div>
        </div>
      </div>
    </main>
  );
}
