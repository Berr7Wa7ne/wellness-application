import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import heroPic from "../../assets/hero-pic.png";
import { Eye, EyeOff } from "lucide-react";
import { Link } from 'react-router-dom';

export const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Basic validation
        if (password !== confirmPassword) {
            setError("Passwords don't match");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/auth/register`, {
                name,
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Registration successful:', response.data);
            
            // Redirect to login page after successful registration
            navigate('/', { 
                state: { 
                    registrationSuccess: true,
                    email: email 
                } 
            });

        } catch (err) {
            console.error('Registration error:', err.response?.data);
            setError(
                err.response?.data?.message || 
                err.message || 
                'Registration failed. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center" style={{ backgroundImage: `url(${heroPic})` }}>
            <div className="bg-white bg-opacity-80 p-8 shadow-lg max-w-md w-full my-10">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium mb-2">Full Name</label>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            className="w-full p-3 border border-gray-300 rounded-lg" 
                            placeholder="Enter your full name" 
                            required 
                        />
                    </div>
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
                    <div className="mb-4 relative">
                        <label className="block text-gray-600 text-sm font-medium mb-2">Password</label>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                className="w-full p-3 border border-gray-300 rounded-lg pr-10" 
                                placeholder="Create a password" 
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
                    <div className="mb-6 relative">
                        <label className="block text-gray-600 text-sm font-medium mb-2">Confirm Password</label>
                        <div className="relative">
                            <input 
                                type={showConfirmPassword ? "text" : "password"} 
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                className="w-full p-3 border border-gray-300 rounded-lg pr-10" 
                                placeholder="Confirm password" 
                                required 
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                onClick={toggleConfirmPasswordVisibility}
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                    <article className="inline-flex gap-3 mb-4">
                        <p className="text-sm font-light text-[#7B8499]">
                            {" "}
                            By continuing you agree to the Occupy{" "}
                            <Link
                                href={"#"}
                                className="font-medium text-[#f1bf60] underline"
                            >
                                terms of service{" "}
                            </Link>{" "}
                            and{" "}
                            <Link
                                href={"#"}
                                className="font-medium text-[#f1bf60] underline"
                            >
                                privacy policy
                            </Link>
                            .
                        </p>
                    </article>
                    <button 
                        type="submit" 
                        className="w-full py-3 bg-[#213721] text-white font-semibold shadow-md hover:bg-green-600 transition duration-300"
                        disabled={loading}
                    >
                        {loading ? 'Creating account...' : 'Sign Up'}
                    </button>
                    <p className="pt-4 text-center text-sm text-[#7B8499] lg:text-end">
                        Already registered?{" "}
                        <Link
                            to="/"
                            className="font-medium text-[#f1bf60] underline"
                        >
                            Sign In
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};