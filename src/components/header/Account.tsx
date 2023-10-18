import React, { useState, useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";

// import components
import Login from "./Login";
import Modal from '../common/Modal';
import { auth } from '../../firebase/firebase.utils';

interface Props {
    isOpen: boolean;
    toggle: () => void;
}


const Account = (props: Props) => {

    // useState
    // const [user, setUser] = useState(localStorage.getItem('user'));
    const [user, loading] = useAuthState(auth); 
    
    // useEffect
    // TODO: probably unnecessary
    // useEffect(() => {
    //     if (user) {
    //         // route.push("/");
    //     } else {
    //     }
    // }, [user]);

    // functions
    // TODO: keep? useAuthState seems to be enough
    // const setUserData = (user: string) => {
    //     localStorage.setItem('user', user);
    //     setUser(user);
    // }
    // const removeUserData = () => {
    //     localStorage.removeItem('user');
    //     setUser('');
    // }

    let accwindow = <></>;

    // TODO: edit with all the user details and needed account settings
    if (user) {
        accwindow = (
            <div>
                <h2>Hi, {user.displayName} You're logged in</h2>
                <p>There will be some account info here</p>
                <button onClick={() => auth.signOut()}>Log out</button>
            </div>
        );
    } else {
        accwindow = (
            <Login></Login>
        );
    }

    return (
        <Modal children={accwindow} width={"18rem"} isOpen={props.isOpen} toggle={props.toggle}></Modal>
    );

};

export default Account;