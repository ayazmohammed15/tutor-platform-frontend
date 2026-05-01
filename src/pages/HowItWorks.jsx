import React from 'react';

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h1>
          <p className="text-xl text-gray-600">
            Discover how TutorBook helps students and tutors connect, schedule, and learn with confidence.
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Find the Right Tutor</h2>
            <p className="text-gray-700 leading-relaxed">
              Browse through qualified tutors, review their profiles, subjects, availability, and ratings. You can search by subject, grade level, or tutor expertise to find the best match for your learning goals.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Book a Session</h2>
            <p className="text-gray-700 leading-relaxed">
              Select a time that works for you and book a tutoring session in just a few clicks. Our calendar-based booking system makes it easy to reserve the ideal slot and confirm availability instantly.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Learn with Confidence</h2>
            <p className="text-gray-700 leading-relaxed">
              Join your tutoring session online, keep track of progress, and receive personalized support from expert tutors. Students can revisit notes, ask follow-up questions, and build confidence over time.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Stay Connected</h2>
            <p className="text-gray-700 leading-relaxed">
              Manage your bookings, payments, and profile all in one place. Tutors can update availability, set rates, and manage sessions easily while students can view their learning history and upcoming lessons.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
