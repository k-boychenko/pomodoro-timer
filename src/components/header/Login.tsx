import React, { useState, useEffect, useRef } from "react";
// import GoogleButton from "react-google-button";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

// import components
import { auth } from "../../firebase/firebase.utils";
// import { signInWithGoogle } from '../../firebase/firebase.utils';
import { LogInFormTypes } from "../../common/Const";
import UsersService from "../../services/UsersService";
import { IUser } from "../../common/interfaces/users.interface";

const Login = () => {
  // useNavigate
  const navigate = useNavigate();

  // useRef
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  // useState
  const [error, setError] = useState("");
  const [formType, setFormType] = useState(LogInFormTypes.logIn);

  /** Authentication */
  // Google
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      signInWithPopup(auth, googleProvider).then((result) => {
        UsersService.getUserById(result.user.uid).then((user) => {
          if (!user.data) {
            UsersService.createUser({
              uid: result.user.uid,
              display_name: result.user.displayName,
              email: result.user.email,
              last_login: result.user.metadata.lastSignInTime,
            } as IUser)
              .then((res) => {
                console.log("created a google user", res);
              })
              .catch((err) => {
                console.log("oops, error. ", err);
              });
          }
        });
      });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // Facebook
  const fbProbider = new FacebookAuthProvider();
  const FacebookLogin = async () => {
    try {
      await signInWithPopup(auth, fbProbider).then((result) => {
        UsersService.getUserById(result.user.uid).then((user) => {
          if (!user.data) {
            UsersService.createUser({
              uid: result.user.uid,
              display_name: result.user.displayName,
              email: result.user.email,
              last_login: result.user.metadata.lastSignInTime,
            } as IUser)
              .then((res) => {
                console.log("created a fb user", res);
              })
              .catch((err) => {
                console.log("oops, error. ", err);
              });
          }
        });
      });
      // const credantial = FacebookAuthProvider.credentialFromResult(result);
      // const token = credantial?.accessToken;
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // E-mail & password
  // TODO
  const signup = async (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    event.preventDefault();

    try {
      setError("");

      createUserWithEmailAndPassword(
        auth,
        emailRef.current!.value,
        passwordRef.current!.value
      )
        .then((res) => {
          UsersService.createUser({
            uid: res.user.uid,
            display_name: "Pomodoro User",
            email: res.user.email,
            last_login: res.user.metadata.lastSignInTime,
          } as IUser);
        })
        .then((res) => {
          console.log("success ", res);
          navigate("/");
        })
        .catch((err) => {
          console.log("error ", err);
        });
    } catch (error) {
      setError("Failed to log in");
    }
  };
  const login = async (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    event.preventDefault();

    try {
      setError("");

      await signInWithEmailAndPassword(
        auth,
        emailRef.current!.value,
        passwordRef.current!.value
      );
    } catch (error) {
      setError("Failed to log in");
    }
  };

  // handlers
  const handleFormTypeChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (formType === LogInFormTypes.logIn) {
      setFormType(LogInFormTypes.signUp);
    } else {
      setFormType(LogInFormTypes.logIn);
    }
  };

  return (
    <div className="login-form">
      <form>
        {error && <div>{error}</div>}
        {formType === LogInFormTypes.logIn ? (
          <>
            <div className="login-input-title">Email address</div>
            <div>
              <input
                className="login-email login-inputs-size login-input-border-radius"
                type="email"
                placeholder="Email address"
                ref={emailRef}
                required
              />
            </div>
            <div className="login-input-title">Password</div>
            <div>
              <input
                className="login-password login-inputs-size login-input-border-radius"
                type="password"
                placeholder="Password"
                ref={passwordRef}
                required
              />
            </div>

            <div className="login-input-sub">Forgotten your password?</div>

            <div>
              <input
                className="login-btn login-btns-size login-border-none login-btn-border-radius"
                type="submit"
                value="Log in"
                onClick={login}
              />
            </div>

            <div className="login-input-sub">
              Don't have an account yet?
              <button className="login-link-btn" onClick={handleFormTypeChange}>
                Sign up
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="login-input-title">Email address</div>
            <div>
              <input
                className="login-email login-inputs-size login-input-border-radius"
                type="email"
                placeholder="Email address"
                ref={emailRef}
                required
              />
            </div>
            <div className="login-input-title">Password</div>
            <div>
              <input
                className="login-password login-inputs-size login-input-border-radius"
                type="password"
                placeholder="Password"
                ref={passwordRef}
                required
              />
            </div>
            <div>
              <input
                className="login-password login-inputs-size login-input-border-radius"
                type="password"
                placeholder="Confirm the password"
                ref={passwordConfirmRef}
                required
              />
            </div>

            <div>
              <input
                className="login-btn login-btns-size login-border-none login-btn-border-radius"
                type="submit"
                value="Sign up"
                onClick={signup}
              />
            </div>

            <div className="login-input-sub">
              Already have an account?
              <button className="login-link-btn" onClick={handleFormTypeChange}>
                Log in
              </button>
            </div>
          </>
        )}
      </form>

      <div className="login-input-title center">OR</div>

      {/* <GoogleButton onClick={signInWithGoogle}>Sign in with Google</GoogleButton> */}
      <div className="sns-btns">
        <div>
          <button
            className="google-btn login-btns-size login-btn-border-radius"
            onClick={GoogleLogin}
          >
            Sign in with Google
          </button>
        </div>
        <div>
          <button
            className="facebook-btn login-btns-size login-border-none login-btn-border-radius"
            onClick={FacebookLogin}
          >
            Sign in with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
