import React from "react";
import { panicIcon } from "../lib/svgIcons";

function ErrorPage() {
  return (
    <div className={"not-found-wrapper"}>
      <div className={"not-found"}>
        {panicIcon(200, 200)}
        <div className={"title"}>404 page not found ....TT^TT...</div>
        <div className={"sub-title"}>요청하신 페이지를 못찾겠어요....</div>
      </div>
    </div>
  );
}

export default ErrorPage;
