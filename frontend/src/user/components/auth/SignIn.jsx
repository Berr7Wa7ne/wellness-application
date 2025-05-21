import React from 'react';
import { useState } from 'react';
import heroPic from "../../../assets/hero-pic.png";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const SignIn = () => {
    const navigate = useNavigate(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // 1. Debug the request payload
            console.log("Login request payload:", { email, password });

            // 2. Make the API call
            const response = await axios({
                method: 'post',
                url: `${API_BASE_URL}/auth/login`,
                headers: { 
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    email,
                    password
                })
            });

            // 3. Debug the full response
            console.log("Login response:", response);

            // 4. Handle the response
            if (!response.data || !response.data.token) {
                throw new Error("Invalid response structure from server");
            }

            const { token, user, message } = response.data;
            const userRole = user?.role;

            // 5. Validate required fields
            if (!token || !user || !userRole) {
                throw new Error("Missing required authentication data");
            }

            // 6. Store auth data
            localStorage.setItem("token", token);
            localStorage.setItem("role", userRole);
            localStorage.setItem("user", JSON.stringify(user));

            // 7. Navigate based on role
            setTimeout(() => {
                console.log("Before navigation");
                // Navigate to different routes based on role
                if (userRole === 'admin') {
                    navigate("/admin/dashboard", { replace: true });
                } else {
                    navigate("/about", { replace: true });
                }
                console.log("After navigation");
            }, 0);

        } catch (err) {
            // 8. Enhanced error handling
            const serverError = err.response?.data;
            console.error("Full error details:", {
                status: err.response?.status,
                error: serverError,
                request: err.config?.data,
                fullError: err
            });

            // 9. User-friendly error messages
            let errorMessage = "Login failed. Please try again.";
            if (serverError?.message) {
                errorMessage = serverError.message;
            } else if (err.message.includes("401")) {
                errorMessage = "Invalid email or password";
            } else if (err.message.includes("network")) {
                errorMessage = "Network error. Please check your connection";
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div 
            className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center" 
            style={{ backgroundImage: `url(${heroPic})` }}
        >
            <div className="bg-white bg-opacity-80 p-8 shadow-lg max-w-md w-full">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Sign In</h2>
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium mb-2">Email</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="w-full p-3 border border-gray-300 rounded-lg" 
                            placeholder="Enter your email" 
                            required 
                        />
                    </div>
                    <div className="mb-6 relative">
                        <label className="block text-gray-600 text-sm font-medium mb-2">Password</label>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                className="w-full p-3 border border-gray-300 rounded-lg pr-10" 
                                placeholder="Enter your password" 
                                required 
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                    <article className="inline-flex w-full gap-3 mb-4">
                        <p className="text-sm font-light text-[#7B8499]">
                            Can&apos;t remember your password?{" "}
                            <Link
                                to="/forgot-password"
                                className="font-medium text-[#f1bf60] underline"
                            >
                                Forget Password
                            </Link>
                        </p>
                    </article>
                    <button 
                        type="submit" 
                        className="w-full py-3 bg-[#213721] text-white font-semibold shadow-md hover:bg-green-600 transition duration-300"
                        disabled={loading}
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                    <p className="pt-4 text-center text-sm text-[#7B8499] lg:text-end">
                        New to SoulScape?{" "}
                        <Link
                            to="/sign-up"
                            className="font-medium text-[#f1bf60] underline"
                        >
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};