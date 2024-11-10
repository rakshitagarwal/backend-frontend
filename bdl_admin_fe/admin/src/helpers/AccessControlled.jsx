import { Redirect } from "react-router-dom"
import React from 'react';

function AccessControlled(props) {
    const {
        permission,
        match
    } = props
    if (permission.length) {
        console.log(match, "match");
        return(
            props.children
        )
    }
    if (!permission.length) {
        return(
            <Redirect
                to={{
                pathname: '/unauthorized',
                state: { from: props.location },
                }}
            />
        )
    }
}

export default AccessControlled