import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

// import components
import Login from "./Login";
import Modal from "../common/Modal";
import { auth } from "../../firebase/firebase.utils";

interface Props {
  isOpen: boolean;
  toggle: () => void;
  signIn?: boolean;
  changeUserName?: boolean;
  deleteAccount?: boolean;
}

const Account = (props: Props) => {
  // useAuthState
  const [user, loading] = useAuthState(auth);

  let accwindow = <></>;

  if (loading) {
    return (
      <Modal
        children={<div>Loading...</div>}
        width={"12rem"}
        isOpen={props.isOpen}
        toggle={props.toggle}
      ></Modal>
    );
  }

  if (props.signIn) {
    accwindow = <Login></Login>;
  } else if (props.changeUserName) {
    accwindow = (
      <div>
        <h4>Change user name</h4>
        <p>Input a new name below</p>
        <input type="text" />
        <button>Save</button>
      </div>
    );
  } else if (props.deleteAccount) {
    accwindow = (
      <div>
        <h2>Delete user</h2>
        <p>Your account will be deleted permanently.</p>
        <p>Are you sure you want to delete your account?</p>
        <button>Delete</button>
      </div>
    );
  }

  return (
    <Modal
      children={accwindow}
      width={"18rem"}
      isOpen={props.isOpen}
      toggle={props.toggle}
    ></Modal>
  );
};

export default Account;
