import React from 'react';
import { useState } from 'react';
import heroPic from "../../assets/hero-pic.png";
import { Eye, EyeOff } from "lucide-react";
import { Link } from 'react-router-dom';

export const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // New state for password visibility

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Sign In:', { email, password });
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
                <form onSubmit={handleSubmit}>
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
                                href={"#"}
                                className="font-medium text-[#f1bf60] underline"
                            >
                                Forget Password
                            </Link>
                        </p>
                    </article>
                    <button 
                        type="submit" 
                        className="w-full py-3 bg-[#213721] text-white font-semibold shadow-md hover:bg-green-600 transition duration-300"
                    >
                        Sign In
                    </button>
                    <p className="pt-4 text-center text-sm text-[#7B8499] lg:text-end">
                        New to Occupy?{" "}
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