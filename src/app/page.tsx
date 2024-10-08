import { ReactFlowProvider } from "@xyflow/react";

import { Toaster } from "@/components/ui/toaster";

import { DnDProvider } from "@/app/contexts/DnDContext";

import AutomationBuilder from "@/app/components/AutomationBuilder";

import styles from "./page.module.css";

const Home = () => {
  return (
    <div className={styles.main}>
      <ReactFlowProvider>
        <DnDProvider>
          <Toaster />
          <AutomationBuilder />
        </DnDProvider>
      </ReactFlowProvider>
    </div>
  );
};

export default Home;
