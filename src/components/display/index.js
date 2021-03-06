import React from "react";
import Screen from "./Screen";

const Display = ({ history, currentOutput }) => {
  return (
    <section className="display">
      <Screen purpose="history" value={history} />
      <Screen purpose="currentOutput" value={currentOutput} />
    </section>
  );
};

export default Display;
