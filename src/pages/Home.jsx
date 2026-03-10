import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen font-sans text-gray-900">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-8 py-5 bg-white max-w-7xl mx-auto">
        <div className="text-2xl font-bold tracking-tight">Tutorly</div>
        <div className="hidden md:flex space-x-8 font-medium text-sm text-gray-700">
          <a href="/register" className="hover:text-blue-600">Find a Tutor</a>
          <a href="#" className="hover:text-blue-600">Become a Tutor</a>
          <a href="#" className="hover:text-blue-600">How it Works</a>
          <a href="#" className="hover:text-blue-600">Pricing</a>
        </div>
        <div className="flex items-center space-x-6">
          <a href="/login" className="text-sm font-medium hover:text-blue-600">Sign In</a>
          <button className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
           onClick={(e)=>{
            navigate("/register")
           }}
          >
            Get started
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="bg-[#FDD853] w-full pt-16 pb-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center">
          {/* Hero Text */}
          <div className="z-10">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-gray-900">
              Unlocking Brighter <br /> Potential, One Lesson <br /> at a Time
            </h1>
            <p className="text-gray-800 text-lg mb-8 max-w-md">
              Find expert tutors who make learning flexible, fun, and effective — all from the comfort of home.
            </p>
            <div className="flex space-x-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 shadow-md"
              onClick={(e)=>{
            navigate("/register")
           }}
              >
                Find a Tutor
              </button>
              {/* <button className="bg-white text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 shadow-md">
                Become a Tutor
              </button> */}
            </div>
          </div>
          
          {/* Hero Images Collage */}
          <div className="relative grid grid-cols-2 gap-4">
            {/* Image placeholders - replace src with your downloaded images */}
            <img src="/studentOnline.png" alt="Student online" className="w-full h-48 object-cover rounded-tl-[40px] rounded-br-[40px] rounded-tr-lg rounded-bl-lg shadow-lg" />
            <img src="/studentOnline.png" alt="Student writing" className="w-full h-48 object-cover rounded-tr-[40px] rounded-bl-[40px] rounded-tl-lg rounded-br-lg shadow-lg" />
            <img src="/hero-bottom-left.jpg" alt="Tutor teaching" className="w-full h-48 object-cover rounded-bl-[40px] rounded-tr-[40px] rounded-tl-lg rounded-br-lg shadow-lg" />
            <img src="/boyWaving.png" alt="Boy waving" className="w-full h-48 object-cover rounded-br-[40px] rounded-tl-[40px] rounded-tr-lg rounded-bl-lg shadow-lg" />
            {/* Decorative Dots */}
            {/* <div className="  absolute -bottom-6 -right-6 grid grid-cols-4 gap-1 opacity-40 ">
              {[...Array()].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-gray-900 rounded-full"></div>)}
            </div> */}
          </div>
        </div>
      </section>

      {/* YOUR LEARNING, YOUR WAY SECTION */}
      <section className="py-24 bg-gray-50 relative bg-cream">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Your Learning, Your Way</h2>
          
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-12">
            {/* Left Content */}
            <div className="flex-1">
              {/* Tabs */}
              <div className="flex space-x-2 bg-gray-50 p-1.5 rounded-xl w-fit mb-8">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm">Online Tutoring</button>
                <button className="px-4 py-2 text-gray-500 hover:text-gray-700 text-sm font-medium rounded-lg">Courses</button>
                <button className="px-4 py-2 text-gray-500 hover:text-gray-700 text-sm font-medium rounded-lg">Group Classes</button>
              </div>

              <h3 className="text-2xl font-bold mb-4">Online Tutoring</h3>
              <p className="text-gray-600 mb-6">One-to-one sessions with expert tutors who adapt to your child's pace and goals.</p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-sm font-medium text-gray-700">
                  <span className="w-6 h-6 bg-yellow-100 text-yellow-600 flex items-center justify-center rounded-full mr-3 text-xs">⭐</span>
                  Personalized sessions
                </li>
                <li className="flex items-center text-sm font-medium text-gray-700">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full mr-3 text-xs">⚡</span>
                  Flexible scheduling
                </li>
                <li className="flex items-center text-sm font-medium text-gray-700">
                  <span className="w-6 h-6 bg-green-100 text-green-600 flex items-center justify-center rounded-full mr-3 text-xs">✓</span>
                  Enhanced DBS-checked tutors
                </li>
              </ul>
              
              <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700">
                Find a Tutor
              </button>
            </div>

            {/* Right Images */}
            <div className="flex-1 relative flex items-center justify-center">
               <div className="relative w-full max-w-sm">
                  {/* Insert downloaded images here */}
                  <img src="/learning-top.jpg" alt="Tutor online" className="w-48 h-48 object-cover rounded-full absolute top-0 right-0 z-10 border-4 border-white shadow-md" />
                  <img src="/learning-bottom.jpg" alt="Mother and child" className="w-64 h-56 object-cover rounded-[40px] rounded-br-sm relative z-0 mt-16 shadow-md" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW TUTORING WORKS SECTION */}
      <section className="py-24 bg-white relative">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-center mb-16">How Tutoring Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-gray-50 rounded-2xl p-8 text-center flex flex-col items-center relative border border-gray-100">
              <div className="absolute top-4 right-6 text-6xl font-black text-gray-100">1</div>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 relative z-10 border border-gray-100">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-bold mb-3 relative z-10">Find</h3>
              <p className="text-gray-500 text-sm relative z-10">Browse trusted tutors by subject, experience, and ratings — and find your perfect match.</p>
            </div>

            {/* Step 2 */}
            <div className="bg-gray-50 rounded-2xl p-8 text-center flex flex-col items-center relative border border-gray-100">
              <div className="absolute top-4 right-6 text-6xl font-black text-gray-100">2</div>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 relative z-10 border border-gray-100">
                <span className="text-2xl">📅</span>
              </div>
              <h3 className="text-xl font-bold mb-3 relative z-10">Book</h3>
              <p className="text-gray-500 text-sm relative z-10">Easily schedule sessions that fit your family's busy life.</p>
            </div>

            {/* Step 3 */}
            <div className="bg-gray-50 rounded-2xl p-8 text-center flex flex-col items-center relative border border-gray-100">
              <div className="absolute top-4 right-6 text-6xl font-black text-gray-100">3</div>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 relative z-10 border border-gray-100">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-bold mb-3 relative z-10">Learn</h3>
              <p className="text-gray-500 text-sm relative z-10">Engage in interactive lessons designed for real progress and confidence building.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-8 grid md:grid-cols-2 gap-8">
          {/* Yellow Card */}
          <div className="bg-[#FDD853] rounded-3xl p-10 flex flex-col items-center text-center relative overflow-hidden">
            <h3 className="text-2xl font-bold mb-3">Start Learning Your Way</h3>
            <p className="text-gray-800 text-sm mb-8 max-w-xs">Find the right tutor for your goals, schedule, and style — learning built around you.</p>
            <div className="flex gap-4 mb-8">
               {/* Replace src */}
               <img src="/cta-student1.jpg" alt="Student 1" className="w-24 h-24 object-cover rounded-full border-4 border-[#FDD853] shadow-md" />
               <img src="/cta-student2.jpg" alt="Student 2" className="w-24 h-24 object-cover rounded-full border-4 border-[#FDD853] shadow-md" />
            </div>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 w-full max-w-[200px]">
              Get started
            </button>
          </div>

          {/* Pink Card */}
          <div className="bg-[#F9A8D4] rounded-3xl p-10 flex flex-col items-center text-center relative overflow-hidden">
            <h3 className="text-2xl font-bold mb-3">Become a Tutor</h3>
            <p className="text-gray-800 text-sm mb-8 max-w-xs">Join a thriving community of tutors sharing their expertise and shaping futures.</p>
            <div className="flex gap-4 mb-8 relative">
               {/* Replace src */}
               <img src="/cta-tutor1.jpg" alt="Tutor 1" className="w-24 h-24 object-cover rounded-t-full rounded-bl-full shadow-md" />
               <img src="/cta-tutor2.jpg" alt="Tutor 2" className="w-24 h-24 object-cover rounded-full shadow-md" />
            </div>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 w-full max-w-[200px]">
              Get started
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#111827] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="text-2xl font-bold mb-4">Tutorly</div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Officia Deserunt Mollitia Animi, Id Est Laborum Fuga. Et Harum Quidem Rerum Facilis Est Et Expedita Distinctio.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-6">Quick Link</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Find a Tutor</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Become a Tutor</a></li>
              <li><a href="#" className="hover:text-white transition-colors">How it works</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Safeguarding Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Review</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-6">Subscribe to our newsletter.</h4>
            <p className="text-sm text-gray-400 mb-4">Want to stay up to date with news and updates about our product? Subscribe.</p>
            <div className="flex bg-gray-800 rounded-lg p-1">
              <input 
                type="email" 
                placeholder="email@example.com" 
                className="bg-transparent border-none text-sm px-4 py-2 w-full text-white focus:outline-none placeholder-gray-500"
              />
            </div>
            <p className="text-xs text-gray-500 mt-3">
              By subscribing to our newsletter you agree to our privacy policy and will get commercial communication.
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="max-w-7xl mx-auto px-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm">
          <div className="flex space-x-4 mb-4 md:mb-0">
             {/* Social Icons Placeholders */}
            <a href="#" className="hover:text-white">f</a>
            <a href="#" className="hover:text-white">X</a>
            <a href="#" className="hover:text-white">ig</a>
            <a href="#" className="hover:text-white">in</a>
          </div>
          <p>© 2024 Tutoring Ambitions. ALL rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;