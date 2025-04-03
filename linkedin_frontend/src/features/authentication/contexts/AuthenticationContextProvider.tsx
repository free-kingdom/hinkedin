import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Loader } from "../../../components/Loader/Loader";

export interface UserProps {
    id: string;
    email: string;
    emailVerified: boolean
}

interface AuthenticationContextType {
    user: UserProps | null;
    login: (email:string, password:string) => Promise<void>;
    sign: (email:string, password:string) => Promise<void>;
    logout: () => void;
}

const AuthenticationContext = createContext<AuthenticationContextType | null>();

export function useAuthentication() {
    return useContext(AuthenticationContext);
}

export function AuthenticationContextProvider () {
    const [user, setUser] = useState<UserProps | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    /* location.pathname 这个 state 变化时重新通过 effect 获取用户 context */
    const location = useLocation();

    const isOnAuthPage =
        location.pathname === "/authentication/login" ||
        location.pathname === "/authentication/signup" ||
        location.pathname === "/authentication/request-password-reset";

    const login = async (email: string, password: string) => {
        const response = await fetch(import.meta.env.VITE_API_URL + "/api/authentication/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password})
        });

        if (response.ok) {
            const { token } = await response.json();
            localStorage.setItem("token", token);
        } else {
            const { message } = await response.json();
            throw new Error(message);
        }
    };

    const signup = async (email: string, password: string) => {
        const response = await fetch(import.meta.env.VITE_API_URL + `/api/authentication/register`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password})
        });

        if (response.ok) {
            const { token } = await response.json();
            localStorage.setItem("token", token);
        } else {
            const { message } = await response.json();
            throw new Error(message);
        }
    };

    const logout = async () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    const fetchUser = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_API_URL + "/api/authentication/user", {
                headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
            });

            if (!response.ok) {
                throw new Error("Authentication failed.");
            }
            const user = await response.json();
            setUser(user);
        } catch(e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(()=> {
        if (user) {
            return;
        } else {
            fetchUser();
        }
    }, [user, location.pathname]);

    if (isLoading) {
        return (
            <Loader/>
        )
    }

    /* 如果用户还没有登录且不在不需要保护的页面，导航到登录页面 */
    if (!isLoading && !user && !isOnAuthPage){
        return (
            <Navigate to="/authentication/login"></Navigate>
        );
    }

    if (user && user.emailVerified && isOnAuthPage) {
        return (
            <Navigate to="/"></Navigate>
        );
    }

    return (
        <AuthenticationContext value={{user, login, signup, logout}}>
            {/* /verify-email需要有user context，因此放在这里面 */}
            {user && !user.emailVerified ? <Navigate to="/authentication/verify-email"></Navigate> : null}
            <Outlet />
        </AuthenticationContext>
    );
}
