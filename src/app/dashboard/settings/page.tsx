"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { User, Bell, Lock, Key, Save, Eye, EyeOff } from "lucide-react";

export default function SettingsPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("account");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const tabs = [
    { id: "account", label: "Account Profile", icon: User },
    { id: "security", label: "Security & Passwords", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "api", label: "API Integrations", icon: Key },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your account preferences and application settings.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mt-8">
        {/* Settings Navigation */}
        <div className="w-full md:w-64 flex-shrink-0">
          <nav className="flex flex-col space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <tab.icon className={`w-5 h-5 mr-3 ${activeTab === tab.id ? "text-blue-700" : "text-gray-400"}`} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          {activeTab === "account" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">Account Profile</h2>
                <p className="text-sm text-gray-500 mt-1">Update your basic account information.</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-6">
                  <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-2xl">
                    {session?.user?.name?.charAt(0) || "U"}
                  </div>
                  <div>
                    <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                      Change Avatar
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
                    <input 
                      type="text" 
                      defaultValue={session?.user?.name || ""} 
                      className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      defaultValue={session?.user?.email || ""} 
                      disabled
                      className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 cursor-not-allowed" 
                    />
                    <p className="text-xs text-gray-500 mt-1">Email address cannot be changed.</p>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button className="flex items-center bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    <Save className="w-4 h-4 mr-2" /> Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">Security & Passwords</h2>
                <p className="text-sm text-gray-500 mt-1">Manage your password and security preferences.</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                    <div className="relative max-w-md">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="w-full rounded-lg border border-gray-300 p-2.5 pr-10 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-1"
                        aria-label={showCurrentPassword ? "Hide password" : "Show password"}
                        tabIndex={-1}
                      >
                        {showCurrentPassword ? <EyeOff className="w-4 h-4 text-blue-600" /> : <Eye className="w-4 h-4 text-gray-400" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                    <div className="relative max-w-md">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="w-full rounded-lg border border-gray-300 p-2.5 pr-10 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-1"
                        aria-label={showNewPassword ? "Hide password" : "Show password"}
                        tabIndex={-1}
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4 text-blue-600" /> : <Eye className="w-4 h-4 text-gray-400" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                    <div className="relative max-w-md">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="w-full rounded-lg border border-gray-300 p-2.5 pr-10 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-1"
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4 text-blue-600" /> : <Eye className="w-4 h-4 text-gray-400" />}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <button className="bg-gray-900 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm">
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          )}

          {(activeTab === "notifications" || activeTab === "api") && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Coming Soon</h3>
              <p className="text-gray-500">This settings panel is currently under development.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
