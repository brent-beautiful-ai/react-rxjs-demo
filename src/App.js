import React from "react";
import { TallyGrid } from "./components/TallyGrid";
import { UserInput } from "./components/UserInput";
import { VoteFeed } from "./components/VoteFeed";
import "./style.css";

export default function App() {
  return (
    <div className="mainView">
      <div className="col-left">
        <UserInput></UserInput>
        <TallyGrid></TallyGrid>
      </div>
      <div className="col-right">
        <VoteFeed></VoteFeed>
      </div>
    </div>
  );
}
