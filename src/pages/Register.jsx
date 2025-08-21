import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            await register({ name, email, password });
            navigate("/");
        } catch (err) {
            setError(err.message || "Registration failed");
        }
    };

    return (
        <>
            <h1 className="text-3xl text-center mt-8 font-bold">New Here? Welcome!</h1>
            <p className="text-1xl text-center m-2">Create an account to checkout faster, view your previous orders and save your addresses.</p>
            <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
                <h2 className="text-2xl font-bold mb-4 text-center">Create New Account</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit} action="" className="space-y-4">
                    <div>
                        <label htmlFor="">Email<span className="text-red-700">*</span></label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border px-3 py-2 rounded" required />
                    </div>
                    <div>
                        <label htmlFor="">Password<span className="text-red-700">*</span></label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border px-3 py-2 rounded" required />
                    </div>
                    <div>
                        <label htmlFor="">Confirm Password<span className="text-red-700">*</span></label>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full border px-3 py-2 rounded" required />
                    </div>
                    <div>
                        <label htmlFor="">Name<span className="text-red-700">*</span></label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border px-3 py-2 rounded" required />
                    </div>

                    <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                        CREATE ACCOUNT
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Already have an account? {" "}
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </>
    );
}

export default Register;