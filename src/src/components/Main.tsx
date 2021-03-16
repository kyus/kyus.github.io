import React from "react";
import { RouteComponentProps } from "react-router-dom";

function Main({ history, location, match }: RouteComponentProps) {
  console.log("props", location, match);
  return <div>this is content area</div>;
}

export default Main;
