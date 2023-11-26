import React, { useEffect, useState} from "react";
import firebase from "firebase/compat/app";
import { auth } from "../firebase/firebase.utils";

interface Props {
    children?: React.ReactNode;
}

export const AuthContext = React.createContext<firebase.User | null>(null);

export const AuthProvider: React.FC<Props> = ({ children }) => {
    const [user, setUser] = useState<firebase.User | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            // setUser(user);
        });

        return unsubscribe;
    }, []);

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
};