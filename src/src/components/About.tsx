import React from "react";
import { RouteComponentProps } from "react-router-dom";
import {ErrorPage} from "./index";

function About({ history }: RouteComponentProps) {
  return (
    <div>
      <ErrorPage />
    </div>
  );
}

export default About;
