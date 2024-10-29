import React, { useState } from 'react';

const Setting = () => {
     const [emailNotifications, setEmailNotifications] = useState(true);

     const handleToggleNotifications = () => {
        setEmailNotifications(prevState => !prevState);
     };

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Settings</h2>
            <div className="flex items-center justify-between">
                <span>Email Notifications:</span>
                <button
                    onClick={handleToggleNotifications}
                    className={`px-4 py-2 rounded ${emailNotifications ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
                >
                    {emailNotifications ? 'Disable' : 'Enable'}
                </button>
            </div>
            <p className="mt-2 text-gray-500">
                {emailNotifications ? 'Email notifications are enabled.' : 'Email notifications are disabled.'}
            </p>
        </div>
    );
};

export default Setting;
