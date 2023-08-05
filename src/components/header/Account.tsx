import React, { useState } from 'react';

// import components
import Login from "./Login";
import Modal from '../common/Modal';

interface Props {
    isOpen: boolean;
    toggle: () => void;
}

const Account = (props: Props) => {

    // useState
    const [loggedin, setLoggedin] = useState(false); 

    let accwindow = <></>;

    if (loggedin) {
        accwindow = (
            <div>
                <h2>You're logged in</h2>
                <p>There will be some account info here</p>
                <button>Log out</button>
            </div>
        );
    } else {
        accwindow = (
            <Login></Login>
        );
    }

    return (
        <Modal children={accwindow} isOpen={props.isOpen} toggle={props.toggle}></Modal>
    );

};

export default Account;