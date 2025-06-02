import React from 'react'
import { User2, Mail, Phone, BadgeCheck, UploadCloud } from 'lucide-react'

const ProfileSettings = () => {
    return (
        <div className="flex flex-col md:flex-row gap-6 p-6">
          {/* LEFT CARD - PROFILE SIDEBAR */}
          <div className="w-full md:w-1/3 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex flex-col items-center text-center mb-10">
              <div className="bg-gray-100 rounded-full h-20 w-20 flex items-center justify-center text-gray-500">
                <User2 size={32} />
              </div>
              <h2 className="mt-3 font-semibold text-lg">Admin Name</h2>
              <p className="text-sm text-gray-500">Administrator</p>
    
              <button className="mt-4 flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                <UploadCloud size={16} /> Upload Photo
              </button>
            </div>
    
            <div className="mt-6 space-y-4 text-sm border-t border-gray-200 pt-7">
              <div className="flex items-center space-x-3 text-gray-600">
                <Mail size={16} className="text-green-500" /> 
                <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-sm text-gray-900">admin@example.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Phone size={16} className="text-green-500" /> 
                <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="text-sm text-gray-900">+234 810 895 2565</p>
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
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    defaultValue="Admin Name"
                    className="w-full mt-1 px-3 py-2 border rounded-md text-sm bg-gray-100"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    defaultValue="admin@example.com"
                    className="w-full mt-1 px-3 py-2 border rounded-md text-sm bg-gray-100"
                  />
                </div>
              </div>
    
              <div>
                <label className="text-sm font-medium">Phone Number</label>
                <input
                  type="text"
                  defaultValue="+234 810 895 2565"
                  className="w-full mt-1 px-3 py-2 border rounded-md text-sm bg-gray-100"
                />
              </div>
    
              <div>
                <label className="text-sm font-medium">Bio</label>
                <textarea
                  rows={3}
                  defaultValue="Web Developer"
                  className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                  placeholder="Brief description for your profile."
                />
              </div>
    
              <button
                type="submit"
                className="mt-2 px-5 py-2 bg-[#213721] hover:bg-green-800 text-white text-sm rounded-md"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )
    }    

export default ProfileSettings