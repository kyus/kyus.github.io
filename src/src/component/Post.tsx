import React from "react";
import {RouteComponentProps} from "react-router-dom";

interface postingProps {
    category?:string|undefined,
    postNumber?:string|undefined
}
function Post({match}:RouteComponentProps<postingProps>) {
    console.log('matchPost', match);
    return (
        <div>_emptyPost {`${match.params.category} : ${match.params.postNumber}`}</div>
    )
}

export default Post;