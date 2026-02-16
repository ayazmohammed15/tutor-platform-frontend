import { useEffect, useState } from 'react';
import { tutorService } from '../../services/tutorService';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const TutorProfile = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    bio: '',
    education: '',
    experience_years: '',
    hourly_rate: '',
    subjects: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await tutorService.getMyProfile();
      if (response.success) {
        setProfile(response.data.profile);
        setFormData({
          bio: response.data.profile.bio || '',
          education: response.data.profile.education || '',
          experience_years: response.data.profile.experience_years || '',
          hourly_rate: response.data.profile.hourly_rate || '',
          subjects: response.data.profile.subjects || '',
        });
      }
    } catch (error) {
      // Profile doesn't exist yet
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (profile) {
        await tutorService.updateProfile(formData);
        toast.success('Profile updated successfully');
      } else {
        await tutorService.createProfile(formData);
        toast.success('Profile created. Pending admin approval.');
      }
      fetchProfile();
    } catch (error) {
      toast.error('Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Tutor Profile
      </h1>

      {profile && (
        <Card className="mb-6">
          <div className="flex justify-between items-center">
            <span className="font-medium">Approval Status:</span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                profile.approval_status === 'approved'
                  ? 'bg-green-100 text-green-800'
                  : profile.approval_status === 'rejected'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {profile.approval_status}
            </span>
          </div>
        </Card>
      )}

      <Card>
        <form onSubmit={handleSubmit}>
          <Input
            label="Bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            required
          />

          <Input
            label="Education"
            name="education"
            value={formData.education}
            onChange={handleChange}
            required
          />

          <Input
            label="Experience (Years)"
            type="number"
            name="experience_years"
            value={formData.experience_years}
            onChange={handleChange}
            required
          />

          <Input
            label="Hourly Rate (₹)"
            type="number"
            name="hourly_rate"
            value={formData.hourly_rate}
            onChange={handleChange}
            required
          />

          <Input
            label="Subjects (comma separated)"
            name="subjects"
            value={formData.subjects}
            onChange={handleChange}
            required
          />

          <Button type="submit" loading={saving} fullWidth className="mt-6">
            {profile ? 'Update Profile' : 'Create Profile'}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default TutorProfile;
