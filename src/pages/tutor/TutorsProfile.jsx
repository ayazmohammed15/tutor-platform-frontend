import { useEffect, useState } from 'react';
import { tutorService } from '../../services/tutorService';
import { UPLOADS_BASE_URL } from '../../services/api';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';
import { Pencil, CheckCircle, XCircle, Clock, BookOpen, Briefcase, GraduationCap, Video } from 'lucide-react';

const TutorProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Track which specific sections are in edit mode
  const [editSections, setEditSections] = useState({
    credentials: true, // We can set this to true initially if no profile exists
    bio: true
  });
  
  const [formData, setFormData] = useState({
    bio: '',
    education: '',
    experience_years: '',
    hourly_rate: '',
    subject_id: '',
    demo_link: '',
    teaching_mode: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await tutorService.getMyProfile();
      if (response.success && response.data.profile) {
        const data = response.data.profile;

        console.log("Fetched profile data:", data);
        setProfile(data);
        
        setFormData({
          bio: data.bio || '',
          education: data.education || '',
          experience_years: data.experience_years || '',
          hourly_rate: data.hourly_rate || '',
          subject_id: data.subject_id || '',
          demo_link: data.demo_link || '',
          teaching_mode: data.teaching_mode || ''
        });

        // If profile exists, close all edit sections by default
        setEditSections({ credentials: false, bio: false });
      }
    } catch (error) {
      console.log("No profile exists yet, keeping edit mode open.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleSection = (section) => {
    setEditSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const cancelAllEdits = () => {
    // Revert form data back to original profile data
    if (profile) {
      setFormData({
        bio: profile.bio || '',
        education: profile.education || '',
        experience_years: profile.experience_years || '',
        hourly_rate: profile.hourly_rate || '',
        subject_id: profile.subject_id || '',
        demo_link: profile.demo_link || '',
        teaching_mode: profile.teaching_mode || ''
      });
      setEditSections({ credentials: false, bio: false });
    }
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      if (profile && profile.id) {
        await tutorService.updateProfile(formData);
        toast.success('Profile updated successfully');
      } else {
        await tutorService.createProfile(formData);
        toast.success('Profile created. Pending admin approval.');
      }
      await fetchProfile(); // Refresh data and close edit modes
    } catch (error) {
      toast.error('Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  const renderStatusBadge = (status) => {
    if (status === 'approved') return <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold"><CheckCircle className="w-4 h-4"/> Approved</span>;
    if (status === 'rejected') return <span className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold"><XCircle className="w-4 h-4"/> Rejected</span>;
    return <span className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold"><Clock className="w-4 h-4"/> Pending</span>;
  };

  if (loading) return <LoadingSpinner fullScreen />;

  // Check if any section is currently being edited to show the global save button
  const isAnySectionEditing = Object.values(editSections).some(Boolean);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6 pb-24">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

      {/* 1. Static Header Card (Never in edit mode, usually comes from Users table) */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-5">
          
          {/* PROFILE IMAGE LOGIC ADDED HERE */}
          <div className="w-20 h-20 rounded-full bg-[#0fb673] flex items-center justify-center flex-shrink-0 text-2xl font-bold text-white uppercase overflow-hidden">
            {profile?.profile_image ? (
              <img 
                src={`${UPLOADS_BASE_URL}/${profile.profile_image}`} 
                alt={`${profile.first_name} ${profile.last_name}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                {profile?.first_name ? profile.first_name.charAt(0) : 'T'}
                {profile?.last_name ? profile.last_name.charAt(0) : ''}
              </>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 capitalize">
              {profile?.first_name || 'New'} {profile?.last_name || 'Tutor'}
            </h2>
            <p className="text-gray-500 font-medium">{profile?.email}</p>
            <p className="text-gray-400 text-sm mt-1">{profile?.phone}</p>
          </div>
        </div>
        <div>
          {renderStatusBadge(profile?.approval_status)}
        </div>
      </div>

      {/* 2. Teaching Credentials Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-all">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-900">Teaching Credentials</h3>
          <button 
            onClick={() => toggleSection('credentials')}
            className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
          >
            {editSections.credentials ? 'Close' : 'Edit'} <Pencil className="w-3.5 h-3.5" />
          </button>
        </div>

        {!editSections.credentials ? (
          /* View Mode */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
            <div>
              <p className="flex items-center gap-2 text-sm text-gray-500 mb-1"><GraduationCap className="w-4 h-4"/> Education</p>
              <p className="text-base font-semibold text-gray-900">{formData.education || 'Not provided'}</p>
            </div>
            <div>
              <p className="flex items-center gap-2 text-sm text-gray-500 mb-1"><Briefcase className="w-4 h-4"/> Experience</p>
              <p className="text-base font-semibold text-gray-900">{formData.experience_years ? `${formData.experience_years} Years` : 'Not provided'}</p>
            </div>
            
            {/* SUBJECT NAME LOGIC ADDED HERE */}
            <div>
              <p className="flex items-center gap-2 text-sm text-gray-500 mb-1"><BookOpen className="w-4 h-4"/> Subject</p>
              <p className="text-base font-semibold text-gray-900">
                {profile?.subject_name || (formData.subject_id ? `Subject ID: ${formData.subject_id}` : 'Not specified')}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Hourly Rate (₹)</p>
              <p className="text-base font-semibold text-gray-900">{formData.hourly_rate ? `₹${formData.hourly_rate}/hr` : 'Not set'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Teaching Mode</p>
              <p className="text-base font-semibold text-gray-900">{formData.teaching_mode || 'Not set'}</p>
            </div>
          </div>
        ) : (
          /* Edit Mode */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-200">
            <Input label="Education" name="education" value={formData.education} onChange={handleChange} placeholder="e.g. B.Tech in Computer Science" />
            <Input label="Experience (Years)" type="number" name="experience_years" value={formData.experience_years} onChange={handleChange} placeholder="e.g. 2" />
            <Input label="Hourly Rate (₹)" type="number" name="hourly_rate" value={formData.hourly_rate} onChange={handleChange} placeholder="e.g. 500" />
            <Input label="Subject ID" type="number" name="subject_id" value={formData.subject_id} onChange={handleChange} placeholder="e.g. 3" />
            <Input label="Teaching Mode" name="teaching_mode" value={formData.teaching_mode} onChange={handleChange} placeholder="e.g. Online, Offline" />
          </div>
        )}
      </div>

      {/* 3. Bio & Media Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-all">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-900">About & Media</h3>
          <button 
            onClick={() => toggleSection('bio')}
            className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
          >
            {editSections.bio ? 'Close' : 'Edit'} <Pencil className="w-3.5 h-3.5" />
          </button>
        </div>

        {!editSections.bio ? (
          /* View Mode */
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Bio</p>
              <p className="text-base text-gray-900 bg-gray-50 p-4 rounded-xl border border-gray-100 min-h-[80px]">
                {formData.bio || 'No bio provided yet.'}
              </p>
            </div>
            <div>
              <p className="flex items-center gap-2 text-sm text-gray-500 mb-1"><Video className="w-4 h-4"/> Demo Link</p>
              {formData.demo_link ? (
                <a href={formData.demo_link} target="_blank" rel="noreferrer" className="text-[#0fb673] hover:underline font-medium">
                  {formData.demo_link}
                </a>
              ) : (
                <p className="text-gray-900 font-medium">No demo video linked</p>
              )}
            </div>
          </div>
        ) : (
          /* Edit Mode */
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell students about your teaching style..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0fb673] focus:border-transparent outline-none min-h-[120px]"
              />
            </div>
            <Input label="Demo Link (Optional)" type="url" name="demo_link" value={formData.demo_link} onChange={handleChange} placeholder="e.g. https://youtube.com/..." />
          </div>
        )}
      </div>

      {/* Global Save Button - Only visible if AT LEAST ONE section is in edit mode */}
      {isAnySectionEditing && (
        <div className="fixed bottom-0 left-0 right-0 md:left-[260px] bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40 flex justify-end gap-3 px-8 animate-in slide-in-from-bottom-4">
          <Button 
            type="button" 
            onClick={cancelAllEdits} 
            className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            loading={saving} 
            className="bg-[#0fb673] hover:bg-[#0da065] text-white px-8"
          >
            Save All Changes
          </Button>
        </div>
      )}

    </div>
  );
};

export default TutorProfile;