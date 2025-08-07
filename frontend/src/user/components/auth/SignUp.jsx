import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/auth/AuthContext';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, AlertCircle, Shield, Eye, EyeOff, Phone as PhoneIcon, FileText, Image as ImageIcon } from 'lucide-react';
import heroPic from '../../../assets/hero-pic.png';

const SignUp = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        isAdmin: false,
        adminCode: '',
        phone: '',
        bio: '',
        profilePhoto: ''
    });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showAdminCode, setShowAdminCode] = useState(false);
    const [profilePhotoFile, setProfilePhotoFile] = useState(null);
    const [profilePhotoPreview, setProfilePhotoPreview] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (name === 'profilePhoto' && files && files[0]) {
            setProfilePhotoFile(files[0]);
            setFormData(prev => ({ ...prev, profilePhoto: '' }));
            setProfilePhotoPreview(URL.createObjectURL(files[0]));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const userData = new FormData();
            userData.append('name', formData.name);
            userData.append('email', formData.email);
            userData.append('password', formData.password);
            userData.append('role', formData.isAdmin ? 'admin' : 'user');
            if (formData.isAdmin) {
                userData.append('adminCode', formData.adminCode);
                userData.append('phone', formData.phone);
                userData.append('bio', formData.bio);
            }
            if (profilePhotoFile) {
                userData.append('profilePhoto', profilePhotoFile);
            }

            const user = await register(userData);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to register');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative px-4">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={heroPic}
                    alt="Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
            </div>

            <div className="max-w-md w-full space-y-8 p-6 sm:p-8 bg-white/90 backdrop-blur-sm rounded-lg shadow-xl relative z-10">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create your account
                    </h2>
                </div>
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-400 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <AlertCircle className="h-5 w-5 text-red-400" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#213721] focus:border-[#213721] focus:z-10 sm:text-sm"
                                placeholder="Full name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#213721] focus:border-[#213721] focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#213721] focus:border-[#213721] focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center z-20">
                                <button
                                    type="button"
                                    className="cursor-pointer hover:bg-gray-100 rounded-md p-1"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ pointerEvents: 'auto' }}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#213721] focus:border-[#213721] focus:z-10 sm:text-sm"
                                placeholder="Confirm password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center z-20">
                                <button
                                    type="button"
                                    className="cursor-pointer hover:bg-gray-100 rounded-md p-1"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    style={{ pointerEvents: 'auto' }}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <input
                            id="isAdmin"
                            name="isAdmin"
                            type="checkbox"
                            className="h-4 w-4 text-[#213721] focus:ring-[#213721] border-gray-300 rounded"
                            checked={formData.isAdmin}
                            onChange={handleChange}
                        />
                        <label htmlFor="isAdmin" className="ml-2 block text-sm text-gray-900">
                            Register as Admin
                        </label>
                    </div>

                    {formData.isAdmin && (
                        <>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Shield className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="adminCode"
                                name="adminCode"
                                type={showAdminCode ? "text" : "password"}
                                required
                                className="appearance-none rounded relative block w-full px-3 py-2 pl-10 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#213721] focus:border-[#213721] focus:z-10 sm:text-sm"
                                placeholder="Admin registration code"
                                value={formData.adminCode}
                                onChange={handleChange}
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center z-20">
                                <button
                                    type="button"
                                    className="cursor-pointer hover:bg-gray-100 rounded-md p-1"
                                    onClick={() => setShowAdminCode(!showAdminCode)}
                                    style={{ pointerEvents: 'auto' }}
                                >
                                    {showAdminCode ? (
                                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="relative mt-4">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <PhoneIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="phone"
                                name="phone"
                                type="text"
                                className="appearance-none rounded relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#213721] focus:border-[#213721] focus:z-10 sm:text-sm"
                                placeholder="Phone number (admin only)"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="relative mt-4">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FileText className="h-5 w-5 text-gray-400" />
                            </div>
                            <textarea
                                id="bio"
                                name="bio"
                                rows={2}
                                className="appearance-none rounded relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#213721] focus:border-[#213721] focus:z-10 sm:text-sm"
                                placeholder="Short bio (admin only)"
                                value={formData.bio}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="relative mt-4">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <ImageIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="profilePhoto"
                                name="profilePhoto"
                                type="file"
                                accept="image/*"
                                className="appearance-none rounded relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#213721] focus:border-[#213721] focus:z-10 sm:text-sm"
                                onChange={handleChange}
                            />
                            {profilePhotoPreview && (
                                <div className="mt-2 flex justify-center">
                                    <img src={profilePhotoPreview} alt="Preview" className="h-16 w-16 object-cover rounded-full border" />
                                </div>
                            )}
                        </div>
                        </>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#213721] hover:bg-[#617C5F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#213721]"
                        >
                            Sign Up
                        </button>
                    </div>

                    <div className="text-center">
                        <Link to="/" className="font-medium text-[#213721] hover:text-[#617C5F]">
                            Already have an account? Sign In
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;