import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");
        if (savedToken && savedUser) {
            setToken(savedToken);
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const register = async ({ name, email, password }) => {
        const res = await fetch("https://socks-ecommerce.onrender.com/api/users/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),

        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || "Registration failed");
        }
        const data = await res.json();
        setUser(data.user);
    };

    const login = async ({ email, password }) => {
        const res = await fetch("https://socks-ecommerce.onrender.com/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })

        });

        console.log("Frontend sending:", { email, password });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || "Login failed");
        }

        const data = await res.json();
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, token, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
