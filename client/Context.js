import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { me } from './store/auth';

export const myContext = createContext({});
export default function Context(props) {

    const [userObject, setUserObject] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        async function getLoggedInUser() {
            const res = await axios.get("/auth/getUser", { withCredentials: true });
            
            if (res.data) {
                setUserObject(res.data);
                window.localStorage.setItem("token", res.data.token);
                dispatch(me());
            }
        };

        getLoggedInUser();

    }, []);

    return (
        <myContext.Provider value={userObject}>{props.children}</myContext.Provider>
    )
}