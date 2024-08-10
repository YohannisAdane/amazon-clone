import React from "react";
import Header from "../Header/Header";

function LeyOut({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default LeyOut;
