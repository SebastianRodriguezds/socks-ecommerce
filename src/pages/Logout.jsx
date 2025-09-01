import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await login({ email, password })
            navigate("/");
        } catch (err) {
            setError(err.message || "Login failed");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-12 p-6 border rounded shadow">
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} action="" className="space-y-4">
                <div>
                    <label htmlFor="">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border px-3 py-2 rounded" required />
                </div>
                <div>
                    <label htmlFor="">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border px-3 py-2 rounded" required />
                </div>

                <button 
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Login
                </button>
            </form>
            <p className="mt-4 text-center">
                Don't have an account?{" "}
                <Link to="/register" className="text-blue-600">
                Sign Up</Link>
            </p>
        </div>
    );
}

export default Login;