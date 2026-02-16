import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tutorService } from '../../services/tutorService';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Select from '../../components/common/Select';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const StudentDashboard = () => {
  const [filters, setFilters] = useState({
    class_name: '',
    chapter_name: '',
    topic_name: '',
  });
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const navigate = useNavigate();

  const classOptions = [
    { value: 'Class 10', label: 'Class 10' },
    { value: 'Class 11', label: 'Class 11' },
    { value: 'Class 12', label: 'Class 12' },
    { value: 'College', label: 'College' },
  ];

  const chapterOptions = {
    'Class 10': [
      { value: 'Algebra', label: 'Algebra' },
      { value: 'Geometry', label: 'Geometry' },
      { value: 'Trigonometry', label: 'Trigonometry' },
    ],
    'Class 11': [
      { value: 'Calculus', label: 'Calculus' },
      { value: 'Physics', label: 'Physics' },
      { value: 'Chemistry', label: 'Chemistry' },
    ],
    'Class 12': [
      { value: 'Calculus', label: 'Calculus' },
      { value: 'Physics', label: 'Physics' },
      { value: 'Chemistry', label: 'Chemistry' },
    ],
    'College': [
      { value: 'Computer Science', label: 'Computer Science' },
      { value: 'Mathematics', label: 'Mathematics' },
      { value: 'Statistics', label: 'Statistics' },
    ],
  };

  const topicOptions = {
    'Algebra': [
      { value: 'Linear Equations', label: 'Linear Equations' },
      { value: 'Quadratic Equations', label: 'Quadratic Equations' },
    ],
    'Geometry': [
      { value: 'Circles', label: 'Circles' },
      { value: 'Triangles', label: 'Triangles' },
    ],
    'Trigonometry': [
      { value: 'Basic Functions', label: 'Basic Functions' },
      { value: 'Heights and Distances', label: 'Heights and Distances' },
    ],
    'Calculus': [
      { value: 'Limits', label: 'Limits' },
      { value: 'Derivatives', label: 'Derivatives' },
      { value: 'Integration', label: 'Integration' },
      { value: 'Differential Equations', label: 'Differential Equations' },
    ],
    'Physics': [
      { value: 'Mechanics', label: 'Mechanics' },
      { value: 'Thermodynamics', label: 'Thermodynamics' },
      { value: 'Electromagnetism', label: 'Electromagnetism' },
      { value: 'Modern Physics', label: 'Modern Physics' },
    ],
    'Chemistry': [
      { value: 'Organic Chemistry', label: 'Organic Chemistry' },
      { value: 'Inorganic Chemistry', label: 'Inorganic Chemistry' },
      { value: 'Chemical Kinetics', label: 'Chemical Kinetics' },
      { value: 'Electrochemistry', label: 'Electrochemistry' },
    ],
    'Computer Science': [
      { value: 'Data Structures', label: 'Data Structures' },
      { value: 'Algorithms', label: 'Algorithms' },
      { value: 'Database Management', label: 'Database Management' },
    ],
    'Mathematics': [
      { value: 'Linear Algebra', label: 'Linear Algebra' },
      { value: 'Discrete Mathematics', label: 'Discrete Mathematics' },
    ],
    'Statistics': [
      { value: 'Probability Theory', label: 'Probability Theory' },
      { value: 'Statistical Inference', label: 'Statistical Inference' },
    ],
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
      ...(name === 'class_name' && { chapter_name: '', topic_name: '' }),
      ...(name === 'chapter_name' && { topic_name: '' }),
    });
  };

  const handleSearch = async () => {
    setLoading(true);
    setSearched(true);

    try {
      const response = await tutorService.searchTutors(filters);
      setTutors(response.data.tutors);

      if (response.data.tutors.length === 0) {
        toast.info('No tutors found matching your criteria');
      } else {
        toast.success(`Found ${response.data.tutors.length} tutor(s)`);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTutorClick = (tutorId) => {
    navigate(`/student/tutor/${tutorId}`);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Find Your Tutor</h1>

      <Card className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Search Filters</h2>

        <div className="grid md:grid-cols-3 gap-4">
          <Select
            label="Class"
            name="class_name"
            value={filters.class_name}
            onChange={handleFilterChange}
            options={classOptions}
            placeholder="Select class"
          />

          <Select
            label="Chapter"
            name="chapter_name"
            value={filters.chapter_name}
            onChange={handleFilterChange}
            options={filters.class_name ? chapterOptions[filters.class_name] : []}
            placeholder="Select chapter"
            disabled={!filters.class_name}
          />

          <Select
            label="Topic"
            name="topic_name"
            value={filters.topic_name}
            onChange={handleFilterChange}
            options={filters.chapter_name ? topicOptions[filters.chapter_name] : []}
            placeholder="Select topic"
            disabled={!filters.chapter_name}
          />
        </div>

        <Button onClick={handleSearch} loading={loading} className="mt-6">
          Find My Tutor
        </Button>
      </Card>

      {loading && (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      )}

      {!loading && searched && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            {tutors.length > 0 ? 'Available Tutors' : 'No Tutors Found'}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutors.map((tutor) => (
              <Card
                key={tutor.user_id}
                hover
                onClick={() => handleTutorClick(tutor.user_id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {tutor.full_name}
                    </h3>
                    <p className="text-sm text-gray-600">{tutor.email}</p>
                  </div>
                  <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    Approved
                  </div>
                </div>

                <p className="text-gray-700 mb-4 line-clamp-3">
                  {tutor.bio || 'No bio available'}
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience:</span>
                    <span className="font-medium">
                      {tutor.experience_years} years
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rate:</span>
                    <span className="font-medium text-blue-600">
                      ₹{tutor.hourly_rate}/hour
                    </span>
                  </div>
                </div>

                <Button variant="outline" fullWidth className="mt-4">
                  View Profile
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8">
        <Button
          variant="secondary"
          onClick={() => navigate('/student/sessions')}
        >
          View My Sessions
        </Button>
      </div>
    </div>
  );
};

export default StudentDashboard;
