import React, { useEffect, useState } from 'react'
import { Bell } from 'lucide-react'
// Uses the AdminNotificationContext for fetching and updating notification preferences
import { useAdminNotificationContext } from '../../../context/admin/notification/AdminNotificationContext';

const NotificationPreferences = () => {
  const { preferences, loading, error, saving, getPreferences, updatePreferences } = useAdminNotificationContext();
  const [localPrefs, setLocalPrefs] = useState({
    email: true,
    push: false,
    weekly: true,
    marketing: false,
  });

  useEffect(() => {
    console.log('[NotificationPreference] Component mounted');
  }, []);

  useEffect(() => {
    if (preferences) {
      setLocalPrefs(preferences);
      console.log('[NotificationPreference] Loaded preferences from context:', preferences);
    }
  }, [preferences]);

  const toggleSwitch = (key) => {
    setLocalPrefs((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSave = async () => {
    console.log('[NotificationPreference] Save button clicked. Saving:', localPrefs);
    await updatePreferences(localPrefs);
    // Optionally, show a toast or feedback
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm max-w-xl mx-auto mt-5">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="w-6 h-6 text-gray-600" />
        <p className="text-lg font-semibold"> Notification Preferences</p>
      </div>
      <p className="text-sm text-gray-500 mb-4">
        Configure how you want to receive notifications
      </p>

      <div className="space-y-4">
        {/* Email Notifications */}
        <div className="flex items-center justify-between border border-gray-200 rounded-md px-4 py-3">
          <div>
            <h4 className="font-medium">Email Notifications</h4>
            <p className="text-sm text-gray-500">
              Receive notifications via email
            </p>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={!!localPrefs.email}
              onChange={() => toggleSwitch('email')}
            />
            <div className={`w-11 h-6 rounded-full p-1 transition-all duration-300 ${localPrefs.email ? 'bg-[#213721]' : 'bg-gray-200'}`}>
              <div
                className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform duration-300 ${localPrefs.email ? 'translate-x-5' : ''}`}
              />
            </div>
          </label>
        </div>

        {/* Push Notifications */}
        <div className="flex items-center justify-between border border-gray-200 rounded-md px-4 py-3">
          <div>
            <h4 className="font-medium">Push Notifications</h4>
            <p className="text-sm text-gray-500">
              Receive push notifications in your browser
            </p>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={!!localPrefs.push}
              onChange={() => toggleSwitch('push')}
            />
            <div className={`w-11 h-6 rounded-full p-1 transition-all duration-300 ${localPrefs.push ? 'bg-[#213721]' : 'bg-gray-200'}`}>
              <div
                className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform duration-300 ${localPrefs.push ? 'translate-x-5' : ''}`}
              />
            </div>
          </label>
        </div>

        {/* Weekly Reports */}
        <div className="flex items-center justify-between border border-gray-200 rounded-md px-4 py-3">
          <div>
            <h4 className="font-medium">Weekly Reports</h4>
            <p className="text-sm text-gray-500">
              Receive weekly activity reports
            </p>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={!!localPrefs.weekly}
              onChange={() => toggleSwitch('weekly')}
            />
            <div className={`w-11 h-6 rounded-full p-1 transition-all duration-300 ${localPrefs.weekly ? 'bg-[#213721]' : 'bg-gray-200'}`}>
              <div
                className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform duration-300 ${localPrefs.weekly ? 'translate-x-5' : ''}`}
              />
            </div>
          </label>
        </div>

        {/* Marketing Emails */}
        <div className="flex items-center justify-between border border-gray-200 rounded-md px-4 py-3">
          <div>
            <h4 className="font-medium">Marketing Emails</h4>
            <p className="text-sm text-gray-500">
              Receive emails about new features and updates
            </p>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={!!localPrefs.marketing}
              onChange={() => toggleSwitch('marketing')}
            />
            <div className={`w-11 h-6 rounded-full p-1 transition-all duration-300 ${localPrefs.marketing ? 'bg-[#213721]' : 'bg-gray-200'}`}>
              <div
                className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform duration-300 ${localPrefs.marketing ? 'translate-x-5' : ''}`}
              />
            </div>
          </label>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="mt-6 px-5 py-2 bg-[#213721] hover:bg-green-800 text-white text-sm rounded-md"
        disabled={saving}
      >
        {saving ? 'Saving...' : 'Save Preferences'}
      </button>
    </div>
  )
}

export default NotificationPreferences
