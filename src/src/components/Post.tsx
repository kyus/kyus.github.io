import React from "react";
import {RouteComponentProps} from "react-router-dom";
import {ErrorPage} from "./index";

interface postingProps {
    category?:string|undefined,
    postNumber?:string|undefined
}
function Post({match}:RouteComponentProps<postingProps>) {
    console.log('matchPost', match);
    return (
      <>
        <div>_emptyPost {`${match.params.category} : ${match.params.postNumber}`}</div>
        <ErrorPage />
      </>
    )
}

export default Post;