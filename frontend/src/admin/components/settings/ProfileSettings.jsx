import React, { useState, useEffect } from 'react'
import { User2, Mail, Phone, BadgeCheck, UploadCloud } from 'lucide-react'
import { useAdminProfileContext } from '../../../context/admin/settings/AdminProfileContext';

const ProfileSettings = () => {
    const { profile, loading, error, saving, updateProfile } = useAdminProfileContext();
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        bio: '',
        profilePhoto: null,
    });
    const [preview, setPreview] = useState(null);
    const [success, setSuccess] = useState(false);

    // Populate form when profile loads
    useEffect(() => {
        if (profile) {
            console.log('ProfileSettings: profile =', profile); // Log profile object
            setForm({
                name: profile.name || '',
                email: profile.email || '',
                phone: profile.phone || '',
                bio: profile.bio || '',
                profilePhoto: '',
            });
            setPreview(profile.profilePhotoUrl || null);
            console.log('ProfileSettings: profilePhotoUrl =', profile.profilePhotoUrl); // Log profilePhotoUrl
        }
    }, [profile]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'profilePhoto' && files && files[0]) {
            setForm(f => ({ ...f, profilePhoto: files[0] }));
            setPreview(URL.createObjectURL(files[0]));
        } else {
            setForm(f => ({ ...f, [name]: value }));
        }
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(false);
        const updates = { ...form };
        if (!form.profilePhoto) delete updates.profilePhoto;
        const result = await updateProfile(updates);
        console.log('Updated profile:', result);
        if (result.success) setSuccess(true);
    };

    if (loading) return <div>Loading profile...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="flex flex-col md:flex-row gap-6 p-6">
          {/* LEFT CARD - PROFILE SIDEBAR */}
          <div className="w-full md:w-1/3 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex flex-col items-center text-center mb-10">
              <div className="bg-gray-100 rounded-full h-20 w-20 flex items-center justify-center text-gray-500 overflow-hidden">
                {preview ? (
                  <img src={preview} alt="Profile" className="h-20 w-20 object-cover rounded-full" />
                ) : (
                  <User2 size={32} />
                )}
              </div>
              <h2 className="mt-3 font-semibold text-lg">{profile?.name || 'Admin Name'}</h2>
              <p className="text-sm text-gray-500">Administrator</p>
    
              <label className="mt-4 flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 cursor-pointer">
                <UploadCloud size={16} /> Upload Photo
                <input type="file" name="profilePhoto" accept="image/*" className="hidden" onChange={handleChange} />
              </label>
            </div>
    
            <div className="mt-6 space-y-4 text-sm border-t border-gray-200 pt-7">
              <div className="flex items-center space-x-3 text-gray-600">
                <Mail size={16} className="text-green-500" /> 
                <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-sm text-gray-900">{profile?.email || '-'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Phone size={16} className="text-green-500" /> 
                <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="text-sm text-gray-900">{profile?.phone || '-'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <BadgeCheck size={16} className="text-green-500" /> 
                <div>
                    <p className="text-sm text-gray-500">Role</p>
                    <p className="text-sm text-gray-900">Administrator</p>
                </div>
              </div>
            </div>
          </div>
    
          {/* RIGHT CARD - PROFILE FORM */}
          <div className="w-full md:w-2/3 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2">
              <User2 size={18} />
              <h3 className="font-semibold text-lg">Profile Information</h3>
            </div>
            <p className="text-sm text-gray-500 mb-4">Update your personal information and bio</p>
            {success && <div className="text-green-600 mb-2">Profile updated!</div>}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 border rounded-md text-sm bg-gray-100"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 border rounded-md text-sm bg-gray-100"
                    required
                  />
                </div>
              </div>
    
              <div>
                <label className="text-sm font-medium">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 border rounded-md text-sm bg-gray-100"
                />
              </div>
    
              <div>
                <label className="text-sm font-medium">Bio</label>
                <textarea
                  name="bio"
                  rows={3}
                  value={form.bio}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                  placeholder="Brief description for your profile."
                />
              </div>
    
              <button
                type="submit"
                className="mt-2 px-5 py-2 bg-[#213721] hover:bg-green-800 text-white text-sm rounded-md"
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      )
    }    

export default ProfileSettings