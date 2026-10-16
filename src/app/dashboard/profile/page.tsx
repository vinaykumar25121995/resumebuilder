"use client";

import { useState, useEffect } from "react";
import {
  User, Briefcase, GraduationCap, Code, FolderGit2, Award,
  Globe, Save, Plus, Trash2, CheckCircle, AlertCircle, Languages,
  Link as LinkIcon, ChevronDown, ChevronUp, Upload
} from "lucide-react";

const sections = [
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Code },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'certifications', label: 'Certifications', icon: Award },
  { id: 'achievements', label: 'Achievements', icon: Award },
  { id: 'languages', label: 'Languages', icon: Globe },
  { id: 'links', label: 'Links', icon: LinkIcon },
];

function Notification({ message, type }: { message: string; type: 'success' | 'error' }) {
  return (
    <div className={`flex items-center gap-2 p-4 rounded-lg text-sm font-medium ${
      type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
    }`}>
      {type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
      {message}
    </div>
  );
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>({
    fullName: '', professionalTitle: '', phone: '', summary: '',
    city: '', state: '', country: '',
    photoUrl: '', customLinks: [],
    linkedinUrl: '', githubUrl: '', portfolioUrl: '',
    experiences: [], educations: [], projects: [], skills: [],
    certifications: [], achievements: [], languages: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [activeSection, setActiveSection] = useState('personal');
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => { fetchProfile(); }, []);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) {
      showNotification('Image size should be less than 3MB', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setProfile((p: any) => ({ ...p, photoUrl: base64 }));
      showNotification('Profile photo uploaded!', 'success');
    };
    reader.readAsDataURL(file);
  };

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/profile');
      if (res.ok) {
        const data = await res.json();
        let parsedLinks: any[] = [];
        try {
          if (data.customLinks) {
            parsedLinks = typeof data.customLinks === 'string' ? JSON.parse(data.customLinks) : data.customLinks;
          }
        } catch {
          parsedLinks = [];
        }

        setProfile({
          fullName: data.userName || '',
          professionalTitle: data.professionalTitle || '',
          phone: data.phone || '',
          summary: data.summary || '',
          city: data.city || '',
          state: data.state || '',
          country: data.country || '',
          photoUrl: data.photoUrl || '',
          customLinks: Array.isArray(parsedLinks) ? parsedLinks : [],
          linkedinUrl: data.linkedinUrl || '',
          githubUrl: data.githubUrl || '',
          portfolioUrl: data.portfolioUrl || '',
          experiences: data.experiences || [],
          educations: data.educations || [],
          projects: data.projects || [],
          skills: data.skills || [],
          certifications: data.certifications || [],
          achievements: data.achievements || [],
          languages: data.languages || [],
        });
      }
    } catch (err) {
      showNotification('Failed to load profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        ...profile,
        customLinks: Array.isArray(profile.customLinks) ? JSON.stringify(profile.customLinks) : profile.customLinks,
      };
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        showNotification('Profile saved successfully!', 'success');
      } else {
        showNotification('Failed to save profile', 'error');
      }
    } catch (err) {
      showNotification('An error occurred while saving', 'error');
    } finally {
      setSaving(false);
    }
  };

  const calcCompletion = () => {
    let score = 0;
    if (profile.fullName) score += 10;
    if (profile.professionalTitle) score += 10;
    if (profile.phone) score += 5;
    if (profile.summary?.length > 50) score += 15;
    if (profile.city) score += 5;
    if (profile.educations?.length > 0) score += 15;
    if (profile.experiences?.length > 0) score += 15;
    if (profile.skills?.length > 0) score += 10;
    if (profile.projects?.length > 0) score += 10;
    if (profile.linkedinUrl) score += 5;
    return Math.min(100, score);
  };

  const addItem = (key: string, template: any) => {
    setProfile((p: any) => ({ ...p, [key]: [...(p[key] || []), { ...template, _id: Date.now() }] }));
  };

  const updateItem = (key: string, index: number, field: string, value: string) => {
    setProfile((p: any) => {
      const arr = [...p[key]];
      arr[index] = { ...arr[index], [field]: value };
      return { ...p, [key]: arr };
    });
  };

  const removeItem = (key: string, index: number) => {
    setProfile((p: any) => ({ ...p, [key]: p[key].filter((_: any, i: number) => i !== index) }));
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setProfile((p: any) => ({ ...p, skills: [...p.skills, { name: newSkill.trim(), category: 'Technical', _id: Date.now() }] }));
      setNewSkill('');
    }
  };

  const completion = calcCompletion();

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Master Profile</h1>
          <p className="text-gray-600 text-sm mt-1">Your career information — the source of truth for all tailored resumes.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </div>

      {notification && <div className="mb-6"><Notification {...notification} /></div>}

      {/* Profile Completion */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-8 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-gray-700">Profile Completion</span>
          <span className="text-sm font-bold text-blue-600">{completion}%</span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              completion >= 80 ? 'bg-green-500' : completion >= 50 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${completion}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {completion < 50 ? 'Add more information to improve your resume quality.' :
           completion < 80 ? 'Good progress! Add skills and projects to reach 80%+.' :
           'Great profile! You can now generate high-quality tailored resumes.'}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Section Nav */}
        <div className="lg:w-56 flex-shrink-0">
          <nav className="bg-white rounded-xl border border-gray-100 shadow-sm p-2 lg:sticky lg:top-4">
            {sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === sec.id ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <sec.icon className={`w-4 h-4 ${activeSection === sec.id ? 'text-blue-600' : 'text-gray-400'}`} />
                {sec.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Section Content */}
        <div className="flex-1 space-y-0">
          
          {/* Personal Info */}
          {activeSection === 'personal' && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="border-b border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900">Personal Information</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Profile Photo Upload */}
                <div className="md:col-span-2 flex items-center gap-5 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="w-20 h-20 rounded-full border-2 border-blue-500 overflow-hidden bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    {profile.photoUrl ? (
                      <img src={profile.photoUrl} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-10 h-10 text-gray-400" />
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-gray-800">Profile Photo</div>
                    <p className="text-xs text-gray-500">Upload a headshot (JPG, PNG or WebP, max 3MB). Used in photo resume templates.</p>
                    <div className="flex items-center gap-3">
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors shadow-xs">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Image</span>
                        <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                      </label>
                      {profile.photoUrl && (
                        <button
                          type="button"
                          onClick={() => setProfile((p: any) => ({ ...p, photoUrl: '' }))}
                          className="text-xs text-red-600 hover:text-red-700 font-medium px-2 py-1 hover:bg-red-50 rounded transition-colors"
                        >
                          Remove Photo
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input type="text" className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={profile.fullName} onChange={e => setProfile((p: any) => ({ ...p, fullName: e.target.value }))} placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Professional Title</label>
                  <input type="text" className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:ring-2 focus:ring-blue-500" value={profile.professionalTitle} onChange={e => setProfile((p: any) => ({ ...p, professionalTitle: e.target.value }))} placeholder="Data Analyst" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input type="text" className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:ring-2 focus:ring-blue-500" value={profile.phone} onChange={e => setProfile((p: any) => ({ ...p, phone: e.target.value }))} placeholder="+91 9876543210" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input type="text" className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:ring-2 focus:ring-blue-500" value={profile.city} onChange={e => setProfile((p: any) => ({ ...p, city: e.target.value }))} placeholder="Mumbai" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input type="text" className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:ring-2 focus:ring-blue-500" value={profile.state} onChange={e => setProfile((p: any) => ({ ...p, state: e.target.value }))} placeholder="Maharashtra" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <input type="text" className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:ring-2 focus:ring-blue-500" value={profile.country} onChange={e => setProfile((p: any) => ({ ...p, country: e.target.value }))} placeholder="India" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
                  <textarea className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:ring-2 focus:ring-blue-500 h-28" value={profile.summary} onChange={e => setProfile((p: any) => ({ ...p, summary: e.target.value }))} placeholder="Experienced data analyst with expertise in SQL, Python, and Tableau..."></textarea>
                  <p className="text-xs text-gray-400 mt-1">{profile.summary?.length || 0} characters (aim for 150+)</p>
                </div>
              </div>
            </div>
          )}

          {/* Links */}
          {activeSection === 'links' && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="border-b border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900">Professional Links</h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  {[{key:'linkedinUrl', label:'LinkedIn URL', ph:'https://linkedin.com/in/yourname'},
                    {key:'githubUrl', label:'GitHub URL', ph:'https://github.com/yourname'},
                    {key:'portfolioUrl', label:'Portfolio URL', ph:'https://yourportfolio.com'}].map(({key,label,ph}) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                      <input type="url" className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:ring-2 focus:ring-blue-500" value={(profile as any)[key]} onChange={e => setProfile((p: any) => ({ ...p, [key]: e.target.value }))} placeholder={ph} />
                    </div>
                  ))}
                </div>

                {/* Custom Links Section */}
                <div className="pt-5 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">Custom & Additional Links</h3>
                      <p className="text-xs text-gray-500">Add custom URLs such as LeetCode, Medium, Kaggle, Dribbble, Behance, Blog, etc.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const links = profile.customLinks || [];
                        setProfile((p: any) => ({
                          ...p,
                          customLinks: [...links, { label: "", url: "" }],
                        }));
                      }}
                      className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-200 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Custom Link
                    </button>
                  </div>

                  {(!profile.customLinks || profile.customLinks.length === 0) ? (
                    <p className="text-xs text-gray-400 italic py-2">No custom links added yet. Click &quot;Add Custom Link&quot; above to add any link you want.</p>
                  ) : (
                    <div className="space-y-3">
                      {profile.customLinks.map((link: any, idx: number) => (
                        <div key={idx} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                          <div className="w-1/3">
                            <label className="block text-[11px] font-medium text-gray-600 mb-0.5">Label (e.g. LeetCode)</label>
                            <input
                              type="text"
                              className="w-full text-xs p-2 bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
                              placeholder="LeetCode, Medium, etc."
                              value={link.label || ""}
                              onChange={(e) => {
                                const updated = [...profile.customLinks];
                                updated[idx] = { ...updated[idx], label: e.target.value };
                                setProfile((p: any) => ({ ...p, customLinks: updated }));
                              }}
                            />
                          </div>
                          <div className="flex-1">
                            <label className="block text-[11px] font-medium text-gray-600 mb-0.5">URL</label>
                            <input
                              type="url"
                              className="w-full text-xs p-2 bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
                              placeholder="https://..."
                              value={link.url || ""}
                              onChange={(e) => {
                                const updated = [...profile.customLinks];
                                updated[idx] = { ...updated[idx], url: e.target.value };
                                setProfile((p: any) => ({ ...p, customLinks: updated }));
                              }}
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = profile.customLinks.filter((_: any, i: number) => i !== idx);
                              setProfile((p: any) => ({ ...p, customLinks: updated }));
                            }}
                            className="mt-4 p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                            title="Delete link"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Experience */}
          {activeSection === 'experience' && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="border-b border-gray-100 p-6 flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-900">Work Experience</h2>
                <button onClick={() => addItem('experiences', { company:'', jobTitle:'', location:'', startDate:'', endDate:'', responsibilities:'', achievements:'', technologies:'' })} className="flex items-center text-blue-600 text-sm font-medium hover:text-blue-700">
                  <Plus className="w-4 h-4 mr-1" /> Add Experience
                </button>
              </div>
              <div className="p-6 space-y-6">
                {profile.experiences?.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-8">No experience added yet. Click "Add Experience" to start.</p>
                ) : profile.experiences.map((exp: any, i: number) => (
                  <div key={exp.id || exp._id || i} className="border border-gray-200 rounded-xl p-5 relative">
                    <button onClick={() => removeItem('experiences', i)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Job Title *</label>
                        <input className="w-full rounded-lg border border-gray-300 p-2 text-sm" value={exp.jobTitle} onChange={e => updateItem('experiences', i, 'jobTitle', e.target.value)} placeholder="Data Analyst" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Company *</label>
                        <input className="w-full rounded-lg border border-gray-300 p-2 text-sm" value={exp.company} onChange={e => updateItem('experiences', i, 'company', e.target.value)} placeholder="ABC Technologies" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Location</label>
                        <input className="w-full rounded-lg border border-gray-300 p-2 text-sm" value={exp.location || ''} onChange={e => updateItem('experiences', i, 'location', e.target.value)} placeholder="Mumbai, India" />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Start Date</label>
                          <input type="month" className="w-full rounded-lg border border-gray-300 p-2 text-sm" value={exp.startDate || ''} onChange={e => updateItem('experiences', i, 'startDate', e.target.value)} placeholder="Jan 2023" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">End Date</label>
                          <input type="month" className="w-full rounded-lg border border-gray-300 p-2 text-sm" value={exp.endDate || ''} onChange={e => updateItem('experiences', i, 'endDate', e.target.value)} placeholder="Present" />
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Responsibilities (one per line)</label>
                        <textarea className="w-full rounded-lg border border-gray-300 p-2 text-sm h-20" value={exp.responsibilities || ''} onChange={e => updateItem('experiences', i, 'responsibilities', e.target.value)} placeholder="Analyzed business and operational data using SQL and Excel..." />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Technologies Used</label>
                        <input className="w-full rounded-lg border border-gray-300 p-2 text-sm" value={exp.technologies || ''} onChange={e => updateItem('experiences', i, 'technologies', e.target.value)} placeholder="SQL, Python, Tableau, Excel" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {activeSection === 'education' && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="border-b border-gray-100 p-6 flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-900">Education</h2>
                <button onClick={() => addItem('educations', { degree:'', institution:'', fieldOfStudy:'', startDate:'', endDate:'', score:'', location:'' })} className="flex items-center text-blue-600 text-sm font-medium hover:text-blue-700">
                  <Plus className="w-4 h-4 mr-1" /> Add Education
                </button>
              </div>
              <div className="p-6 space-y-6">
                {profile.educations?.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-8">No education added yet.</p>
                ) : profile.educations.map((edu: any, i: number) => (
                  <div key={edu.id || edu._id || i} className="border border-gray-200 rounded-xl p-5 relative">
                    <button onClick={() => removeItem('educations', i)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Degree *</label>
                        <input className="w-full rounded-lg border border-gray-300 p-2 text-sm" value={edu.degree} onChange={e => updateItem('educations', i, 'degree', e.target.value)} placeholder="Bachelor of Technology" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Institution *</label>
                        <input className="w-full rounded-lg border border-gray-300 p-2 text-sm" value={edu.institution} onChange={e => updateItem('educations', i, 'institution', e.target.value)} placeholder="Mumbai University" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Field of Study</label>
                        <input className="w-full rounded-lg border border-gray-300 p-2 text-sm" value={edu.fieldOfStudy || ''} onChange={e => updateItem('educations', i, 'fieldOfStudy', e.target.value)} placeholder="Computer Science" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">GPA / Percentage</label>
                        <input className="w-full rounded-lg border border-gray-300 p-2 text-sm" value={edu.score || ''} onChange={e => updateItem('educations', i, 'score', e.target.value)} placeholder="8.5 CGPA" />
                      </div>
                      <div className="grid grid-cols-2 gap-2 md:col-span-2">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Start Date</label>
                          <input type="month" className="w-full rounded-lg border border-gray-300 p-2 text-sm" value={edu.startDate || ''} onChange={e => updateItem('educations', i, 'startDate', e.target.value)} placeholder="Aug 2019" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">End Date</label>
                          <input type="month" className="w-full rounded-lg border border-gray-300 p-2 text-sm" value={edu.endDate || ''} onChange={e => updateItem('educations', i, 'endDate', e.target.value)} placeholder="May 2023" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {activeSection === 'skills' && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="border-b border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900">Skills</h2>
              </div>
              <div className="p-6">
                <div className="flex gap-3 mb-6">
                  <input
                    type="text"
                    className="flex-1 rounded-lg border border-gray-300 p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="E.g., Python, SQL, Project Management..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
                  />
                  <button onClick={addSkill} className="bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700">Add</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.skills?.map((skill: any, i: number) => (
                    <div key={skill._id || i} className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full text-sm font-medium text-gray-800">
                      <span>{skill.name}</span>
                      <button onClick={() => removeItem('skills', i)} className="text-gray-500 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  ))}
                  {(!profile.skills || profile.skills.length === 0) && (
                    <p className="text-gray-500 text-sm">No skills added yet.</p>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Projects */}
          {activeSection === 'projects' && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="border-b border-gray-100 p-6 flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-900">Projects</h2>
                <button onClick={() => addItem('projects', { name:'', description:'', technologies:'', url:'' })} className="flex items-center text-blue-600 text-sm font-medium hover:text-blue-700">
                  <Plus className="w-4 h-4 mr-1" /> Add Project
                </button>
              </div>
              <div className="p-6 space-y-6">
                {profile.projects?.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-8">No projects added yet.</p>
                ) : profile.projects.map((proj: any, i: number) => (
                  <div key={proj._id || i} className="border border-gray-200 rounded-xl p-5 relative">
                    <button onClick={() => removeItem('projects', i)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Project Name *</label>
                        <input className="w-full rounded-lg border border-gray-300 p-2 text-sm" value={proj.name} onChange={e => updateItem('projects', i, 'name', e.target.value)} placeholder="Sales Dashboard" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Description / Key Results</label>
                        <textarea className="w-full rounded-lg border border-gray-300 p-2 text-sm h-20" value={proj.description || ''} onChange={e => updateItem('projects', i, 'description', e.target.value)} placeholder="Built a responsive sales dashboard..." />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Technologies Used</label>
                          <input className="w-full rounded-lg border border-gray-300 p-2 text-sm" value={proj.technologies || ''} onChange={e => updateItem('projects', i, 'technologies', e.target.value)} placeholder="React, Node.js" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Project URL</label>
                          <input type="url" className="w-full rounded-lg border border-gray-300 p-2 text-sm" value={proj.url || ''} onChange={e => updateItem('projects', i, 'url', e.target.value)} placeholder="https://github.com/..." />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {activeSection === 'certifications' && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="border-b border-gray-100 p-6 flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-900">Certifications</h2>
                <button onClick={() => addItem('certifications', { name:'', issuer:'', date:'', url:'' })} className="flex items-center text-blue-600 text-sm font-medium hover:text-blue-700">
                  <Plus className="w-4 h-4 mr-1" /> Add Certification
                </button>
              </div>
              <div className="p-6 space-y-6">
                {profile.certifications?.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-8">No certifications added yet.</p>
                ) : profile.certifications.map((cert: any, i: number) => (
                  <div key={cert._id || i} className="border border-gray-200 rounded-xl p-5 relative">
                    <button onClick={() => removeItem('certifications', i)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Name *</label>
                        <input className="w-full rounded-lg border border-gray-300 p-2 text-sm" value={cert.name} onChange={e => updateItem('certifications', i, 'name', e.target.value)} placeholder="AWS Certified Solutions Architect" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Issuer</label>
                        <input className="w-full rounded-lg border border-gray-300 p-2 text-sm" value={cert.issuer || ''} onChange={e => updateItem('certifications', i, 'issuer', e.target.value)} placeholder="Amazon Web Services" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Date</label>
                        <input type="month" className="w-full rounded-lg border border-gray-300 p-2 text-sm" value={cert.date || ''} onChange={e => updateItem('certifications', i, 'date', e.target.value)} placeholder="2023-01" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">URL / Credential ID</label>
                        <input type="url" className="w-full rounded-lg border border-gray-300 p-2 text-sm" value={cert.url || ''} onChange={e => updateItem('certifications', i, 'url', e.target.value)} placeholder="https://..." />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements */}
          {activeSection === 'achievements' && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="border-b border-gray-100 p-6 flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-900">Achievements</h2>
                <button onClick={() => addItem('achievements', { title:'', description:'' })} className="flex items-center text-blue-600 text-sm font-medium hover:text-blue-700">
                  <Plus className="w-4 h-4 mr-1" /> Add Achievement
                </button>
              </div>
              <div className="p-6 space-y-6">
                {profile.achievements?.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-8">No achievements added yet.</p>
                ) : profile.achievements.map((ach: any, i: number) => (
                  <div key={ach._id || i} className="border border-gray-200 rounded-xl p-5 relative">
                    <button onClick={() => removeItem('achievements', i)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Title *</label>
                        <input className="w-full rounded-lg border border-gray-300 p-2 text-sm" value={ach.title} onChange={e => updateItem('achievements', i, 'title', e.target.value)} placeholder="Employee of the Year" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                        <textarea className="w-full rounded-lg border border-gray-300 p-2 text-sm h-16" value={ach.description || ''} onChange={e => updateItem('achievements', i, 'description', e.target.value)} placeholder="Awarded for outstanding performance..." />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {activeSection === 'languages' && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="border-b border-gray-100 p-6 flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-900">Languages</h2>
                <button onClick={() => addItem('languages', { name:'', proficiency:'' })} className="flex items-center text-blue-600 text-sm font-medium hover:text-blue-700">
                  <Plus className="w-4 h-4 mr-1" /> Add Language
                </button>
              </div>
              <div className="p-6 space-y-6">
                {profile.languages?.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-8">No languages added yet.</p>
                ) : profile.languages.map((lang: any, i: number) => (
                  <div key={lang._id || i} className="border border-gray-200 rounded-xl p-5 relative">
                    <button onClick={() => removeItem('languages', i)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Language *</label>
                        <input className="w-full rounded-lg border border-gray-300 p-2 text-sm" value={lang.name} onChange={e => updateItem('languages', i, 'name', e.target.value)} placeholder="English" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Proficiency</label>
                        <select className="w-full rounded-lg border border-gray-300 p-2 text-sm" value={lang.proficiency || ''} onChange={e => updateItem('languages', i, 'proficiency', e.target.value)}>
                          <option value="">Select proficiency</option>
                          <option value="Native">Native</option>
                          <option value="Fluent">Fluent</option>
                          <option value="Proficient">Proficient</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Beginner">Beginner</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
