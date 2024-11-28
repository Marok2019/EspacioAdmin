import { useEffect  } from "react";
import { createContext, useContext, useState } from "react";
import { loginRequest } from "../api/auth";
import Cookies from 'js-cookie'

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within a AuthProvider");
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    const signin = async (user) => {
        try{
            const res = await loginRequest(user);
            setUser(res.data);
            setIsAuthenticated(true);
        }catch (error) {
            console.log(error);
        } 
    }

    const logout = () => {
        Cookies.remove("token");
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
        value={{
            user,
            signin,
            logout,
            isAuthenticated,
            errors,
            loading
        }}
        >
            {children}
        </AuthContext.Provider>
    );

};

export default AuthContext;