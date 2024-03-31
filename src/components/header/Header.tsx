import React, { useContext, useEffect, useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useAuthState } from "react-firebase-hooks/auth";

// import components
import Info from "./Info";
import Settings from "./Settings";
import Account from "./Account";
import {
  TimerModesContext,
  TimerModesContextType,
} from "../../context/TimerModesContext";
import { auth } from "../../firebase/firebase.utils";

import logo from "../../img/pomotimer_logo.svg";

const Header = () => {
  const [user] = useAuthState(auth);

  // useContext
  const { pomodoroMode } = useContext(
    TimerModesContext
  ) as TimerModesContextType;

  // useState
  const [infoIsOpen, setInfoIsOpen] = useState(false);
  const [settingsIsOpen, setSettingsIsOpen] = useState(false);
  const [accountIsOpen, setAccountIsOpen] = useState(false);
  const [signInFlg, setSignInFlg] = useState(false);
  const [dropDownIsOpen, setDropDownIsOpen] = useState(false);
  const [changeUserNameFlg, setChangeUserNameFlg] = useState(false);
  const [deleteAccountFlg, setDeleteAccountFlg] = useState(false);

  // useEffect
  useEffect(() => {
    if (!accountIsOpen) {
      setSignInFlg(false);
      setChangeUserNameFlg(false);
      setDeleteAccountFlg(false);
    }
  }, [accountIsOpen]);

  let dropdownLogin = user ? (
    <ul>
      <li>Hello, {user.displayName}!</li>
      <li
        className="dropdown-item"
        onClick={() => {
          setChangeUserNameFlg(true);
          setAccountIsOpen(true);
        }}
      >
        Change user name
      </li>
      <li
        className="dropdown-item"
        onClick={() => {
          setDeleteAccountFlg(true);
          setAccountIsOpen(true);
        }}
      >
        Delete account
      </li>
      <li
        className="dropdown-item"
        onClick={() => {
          auth.signOut().then(() => {
            window.location.reload();
          });
        }}
      >
        Log out
      </li>
    </ul>
  ) : (
    <ul>
      <li
        className="dropdown-item"
        onClick={() => {
          setSignInFlg(true);
          setAccountIsOpen(!accountIsOpen);
        }}
      >
        Sign in
      </li>
    </ul>
  );

  return (
    <header className={pomodoroMode}>
      <div className="container">
        <a href="/" className="logolink">
          <img src={logo} alt="Pomotimer" />
          <div>Pomotimer</div>
        </a>
        <nav>
          <div className="header-menu">
            <div className="menu-item">
              <InfoOutlinedIcon
                className="menu-icon"
                onClick={() => setInfoIsOpen(true)}
              />
            </div>
            <div className="menu-item">
              <SettingsOutlinedIcon
                className="menu-icon"
                onClick={() => setSettingsIsOpen(true)}
              />
            </div>
            <div className="dropdown-login menu-item">
              <AccountCircleOutlinedIcon
                className="menu-icon"
                onClick={() => setDropDownIsOpen(!dropDownIsOpen)}
              />
              <div
                className={`dropdown-menu ${dropDownIsOpen ? "visible" : ""}`}
              >
                {dropdownLogin}
              </div>
            </div>
          </div>
        </nav>
      </div>
      <Info isOpen={infoIsOpen} toggle={() => setInfoIsOpen(!infoIsOpen)} />
      <Settings
        isOpen={settingsIsOpen}
        toggle={() => setSettingsIsOpen(!settingsIsOpen)}
      />
      <Account
        isOpen={accountIsOpen}
        toggle={() => setAccountIsOpen(!accountIsOpen)}
        signIn={signInFlg}
        changeUserName={changeUserNameFlg}
        deleteAccount={deleteAccountFlg}
      />
    </header>
  );
};

export default Header;
