import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About TutorBook</h1>
          <p className="text-xl text-gray-600">
            Empowering students and tutors through personalized online learning experiences.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            At TutorBook, we believe that every student deserves access to high-quality education tailored to their unique needs and pace. Our platform connects students with expert tutors across various subjects, making learning flexible, engaging, and effective from the comfort of home.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">For Students</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• One-on-one personalized tutoring sessions</li>
                <li>• Flexible scheduling to fit your lifestyle</li>
                <li>• Access to qualified, DBS-checked tutors</li>
                <li>• Progress tracking and goal-oriented learning</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">For Tutors</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Flexible work opportunities</li>
                <li>• Set your own rates and availability</li>
                <li>• Access to a wide student base</li>
                <li>• Secure payment processing</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Story</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Founded in 2023, TutorBook was born from the vision to revolutionize online education. Our founders, experienced educators and tech enthusiasts, recognized the challenges students face in traditional learning environments and the limitations of existing tutoring platforms.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Today, we serve thousands of students and tutors nationwide, fostering a community of lifelong learners and dedicated educators committed to academic excellence.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-medium text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600 text-sm">We strive for the highest standards in education and technology.</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🤝</div>
              <h3 className="font-medium text-gray-900 mb-2">Accessibility</h3>
              <p className="text-gray-600 text-sm">Making quality education accessible to everyone, everywhere.</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">💡</div>
              <h3 className="font-medium text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600 text-sm">Continuously improving our platform to enhance learning experiences.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;