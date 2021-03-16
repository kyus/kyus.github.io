import React from "react";
import {RouteComponentProps} from "react-router-dom";

function Main({match}:RouteComponentProps) {
    console.log('props', match);
    return (
        <div>this is content area</div>
    )
}

export default Main;