import React from 'react';

export default function Footer() {
  return (
    
    <footer className="bg-slate-950 pt-16 pb-8 mt-20 font-sans">
      <div className="max-w-7xl mx-auto px-8 lg:px-20">
        
        {/* Top Section: Newsletter / Final CTA */}
        {/* Added a subtle gradient to make it pop against the dark background */}
        <div className="flex flex-col lg:flex-row justify-between items-center bg-gradient-to-r from-blue-600 to-blue-500 rounded-3xl p-10 mb-16 shadow-2xl shadow-blue-900/50">
          <div className="mb-6 lg:mb-0 text-center lg:text-left">
            <h3 className="text-2xl font-bold text-white mb-2">Ready to ace your exams?</h3>
            <p className="text-blue-100">Join thousands of students upgrading their grades today.</p>
          </div>
          <div className="flex w-full lg:w-auto flex-col sm:flex-row gap-3">
             <input 
               type="email" 
               placeholder="Enter your email address" 
               className="px-6 py-3 rounded-full text-gray-800 w-full sm:w-72 focus:outline-none focus:ring-4 focus:ring-blue-300"
             />
             <button className="bg-slate-950 text-white px-8 py-3 rounded-full font-bold hover:bg-slate-800 transition-colors shadow-md">
               Subscribe
             </button>
          </div>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Column 1: Brand & Contact */}
          <div className="lg:col-span-2 space-y-6">
            {/* Kept brand text white for contrast */}
            <div className="text-3xl font-extrabold text-white tracking-tight">TutorBook.</div>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              India's premier 1-on-1 online tutoring platform for CBSE and Stateboard students in classes 6th to 10th. Empowering students with expert educators.
            </p>
            <div className="text-slate-300 space-y-2 text-sm font-medium">
              <p>📍 Tech Park, Hyderabad, Telangana</p>
              <p>📞 +91 98765 43210</p>
              <p>✉️ support@tutorbook.in</p>
            </div>
          </div>

          {/* Column 2: Subjects & Classes */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Explore Classes</h4>
            <ul className="space-y-4 text-slate-400 font-medium text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Class 10 CBSE Math</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Class 9 Science</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Class 8 Stateboard</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Class 7 English</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Foundation Courses</a></li>
            </ul>
          </div>

          {/* Column 3: Useful Links */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">For Students</h4>
            <ul className="space-y-4 text-slate-400 font-medium text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">How it Works</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Browse All Tutors</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Pricing & Plans</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Student Success Stories</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Help Center / FAQ</a></li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-4 text-slate-400 font-medium text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Become a Tutor</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">EdTech Blog</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Press & Media</a></li>
            </ul>
          </div>
          
        </div>

        {/* Bottom Bar: Legal & Socials */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm font-medium">
            © {new Date().getFullYear()} TutorBook Inc. All rights reserved.
          </p>
          
          <div className="flex space-x-6 text-sm text-slate-400 font-medium">
            <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Refund Policy</a>
          </div>

          {/* Social Icons updated for dark mode */}
          <div className="flex space-x-4">
            <a href="#" className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
               <span className="text-xs">FB</span>
            </a>
            <a href="#" className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:bg-blue-400 hover:text-white transition-all">
               <span className="text-xs">TW</span>
            </a>
            <a href="#" className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:bg-pink-600 hover:text-white transition-all">
               <span className="text-xs">IG</span>
            </a>
            <a href="#" className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:bg-blue-800 hover:text-white transition-all">
               <span className="text-xs">IN</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}