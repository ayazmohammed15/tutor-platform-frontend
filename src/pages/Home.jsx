import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


const learningTabs = {
  tutoring: {
    title: "Online Tutoring",
    desc: "One-to-one sessions with expert tutors who adapt to your child's pace and goals.",
    points: [
      { icon: "⭐", text: "Personalized sessions", color: "yellow" },
      { icon: "⚡", text: "Flexible scheduling", color: "blue" },
      { icon: "✓", text: "Enhanced DBS-checked tutors", color: "green" },
    ],
  },
  courses: {
    title: "Courses",
    desc: "Structured courses designed to build strong foundations and long-term success.",
    points: [
      { icon: "📘", text: "Structured curriculum", color: "blue" },
      { icon: "🎯", text: "Goal-oriented learning", color: "yellow" },
      { icon: "📊", text: "Progress tracking", color: "green" },
    ],
  },
  group: {
    title: "Group Classes",
    desc: "Collaborative learning with peers to enhance understanding and communication skills.",
    points: [
      { icon: "👥", text: "Peer interaction", color: "blue" },
      { icon: "💬", text: "Discussion-based learning", color: "yellow" },
      { icon: "🚀", text: "Affordable sessions", color: "green" },
    ],
  },
};
const Home = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("tutoring");

  const tab = learningTabs[activeTab];
  const getColorClasses = (color) => {
    const colors = {
      yellow: "bg-yellow-100 text-yellow-600",
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600",
    };
    return colors[color];
  };
  return (
    <div className="min-h-screen font-sans text-gray-900">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-8 py-5 bg-white max-w-7xl mx-auto">
        <div className="text-2xl font-bold tracking-tight">TutorBook</div>
        <div className="hidden md:flex space-x-8 font-medium text-sm text-gray-700">
          <a href="/register" className="hover:text-blue-600">Find a Tutor</a>
          <Link to="/about-us" className="hover:text-blue-600">About Us</Link>
          <Link to="/how-it-works" className="hover:text-blue-600">How it Works</Link>
          <a href="#" className="hover:text-blue-600"></a>
        </div>
        <div className="flex items-center space-x-6">
          <Link to="/login" className="text-sm font-medium hover:text-blue-600">Sign In</Link>
          <button className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            onClick={() => {
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
                onClick={(e) => {
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
            <img src="/student.jpg" alt="Student online" className="w-full h-48 object-cover rounded-tl-[40px] rounded-br-[40px] rounded-tr-lg rounded-bl-lg shadow-lg" />
            <img src="/boyWaving.png" alt="Student writing" className="w-full h-48 object-cover rounded-tr-[40px] rounded-bl-[40px] rounded-tl-lg rounded-br-lg shadow-lg" />
            <img src="/tutoring.jpg" alt="Tutor teaching" className="w-full h-48 object-cover rounded-bl-[40px] rounded-tr-[40px] rounded-tl-lg rounded-br-lg shadow-lg" />
            <img src="/studentOnline.png" alt="Boy waving" className="w-full h-48 object-cover rounded-br-[40px] rounded-tl-[40px] rounded-tr-lg rounded-bl-lg shadow-lg" />
            {/* Decorative Dots */}
            {/* <div className="  absolute -bottom-6 -right-6 grid grid-cols-4 gap-1 opacity-40 ">
              {[...Array()].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-gray-900 rounded-full"></div>)}
            </div> */}
          </div>
        </div>
      </section>

      {/* YOUR LEARNING, YOUR WAY SECTION */}
      <section className="py-24 bg-gradient-to-b from-[#F8FAFC] to-[#EEF2FF] relative">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-center mb-12">
            Your Learning, Your Way
          </h2>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-12">
            {/* LEFT */}
            <div className="flex-1">
              {/* Tabs */}
              <div className="flex space-x-2 bg-gray-50 p-1.5 rounded-xl w-fit mb-8">
                <button
                  onClick={() => setActiveTab("tutoring")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTab === "tutoring"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                  Online Tutoring
                </button>

                <button
                  onClick={() => setActiveTab("courses")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTab === "courses"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                  Courses
                </button>

                <button
                  onClick={() => setActiveTab("group")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTab === "group"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                  Group Classes
                </button>
              </div>

              {/* Dynamic Content */}
              <h3 className="text-2xl font-bold mb-4">{tab.title}</h3>
              <p className="text-gray-600 mb-6">{tab.desc}</p>

              <ul className="space-y-4 mb-8">
                {tab.points.map((item, i) => (
                  <li key={i} className="flex items-center text-sm font-medium text-gray-700">
                    <span
                      className={`w-6 h-6 flex items-center justify-center rounded-full mr-3 text-xs ${getColorClasses(
                        item.color
                      )}`}
                    >
                      {item.icon}
                    </span>
                    {item.text}
                  </li>
                ))}
              </ul>

              <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700"
              onClick={(e) => {
                  navigate("/register")
                }}
              >
                Find a Tutor
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <div className="flex-1 flex items-center justify-center">
                <div className="relative w-full max-w-[420px] h-[320px] bg-gray-50 rounded-2xl p-6">

                  {/* TOP IMAGE */}
                  <img
                    src="/tutor1.jpg"
                    alt="Tutor"
                    className="w-56 h-40 object-cover absolute top-4 left-6 
      rounded-bl-[40px] rounded-tr-[40px] rounded-tl-lg rounded-br-lg shadow-lg"
                  />

                  {/* BOTTOM IMAGE */}
                  <img
                    src="/mom.jpg"
                    alt="Learning"
                    className="w-60 h-44 object-cover absolute bottom-4 right-6 
      rounded-br-[40px] rounded-tl-[40px] rounded-tr-lg rounded-bl-lg shadow-lg"
                  />

                  {/* BLUE CIRCLES */}
                  <div className="absolute top-6 right-10 w-3 h-3 bg-blue-400 rounded-full"></div>
                  <div className="absolute top-12 right-4 w-6 h-6 bg-blue-300 rounded-full"></div>

                  {/* DOTTED GRID */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 grid grid-cols-5 gap-1 opacity-40">
                    {[...Array(25)].map((_, i) => (
                      <div key={i} className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    ))}
                  </div>

                </div>
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

     
      {/* <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-8 grid md:grid-cols-2 gap-8">
         
          <div className="bg-[#FDD853] rounded-3xl p-10 flex flex-col items-center text-center relative overflow-hidden">
            <h3 className="text-2xl font-bold mb-3">Start Learning Your Way</h3>
            <p className="text-gray-800 text-sm mb-8 max-w-xs">Find the right tutor for your goals, schedule, and style — learning built around you.</p>
            <div className="flex gap-4 mb-8">
              
              <img src="/cta-student1.jpg" alt="Student 1" className="w-24 h-24 object-cover rounded-full border-4 border-[#FDD853] shadow-md" />
              <img src="/cta-student2.jpg" alt="Student 2" className="w-24 h-24 object-cover rounded-full border-4 border-[#FDD853] shadow-md" />
            </div>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 w-full max-w-[200px]">
              Get started
            </button>
          </div>

          
          <div className="bg-[#F9A8D4] rounded-3xl p-10 flex flex-col items-center text-center relative overflow-hidden">
            <h3 className="text-2xl font-bold mb-3">Become a Tutor</h3>
            <p className="text-gray-800 text-sm mb-8 max-w-xs">Join a thriving community of tutors sharing their expertise and shaping futures.</p>
            <div className="flex gap-4 mb-8 relative">
              
              <img src="/cta-tutor1.jpg" alt="Tutor 1" className="w-24 h-24 object-cover rounded-t-full rounded-bl-full shadow-md" />
              <img src="/cta-tutor2.jpg" alt="Tutor 2" className="w-24 h-24 object-cover rounded-full shadow-md" />
            </div>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 w-full max-w-[200px]">
              Get started
            </button>
          </div>
        </div>
      </section> */}

      <section className="py-20 bg-[#F1F5F9]">
  <div className="max-w-6xl mx-auto px-8">
    
    {/* Heading */}
    <h2 className="text-4xl font-bold text-center mb-4">
      What Students Say
    </h2>
    <p className="text-gray-500 text-center mb-12">
      Real feedback from students and parents who trust TutorBook
    </p>

    {/* Reviews Grid */}
    <div className="grid md:grid-cols-3 gap-8">

      {/* Review Card 1 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
        <div className="flex items-center gap-4 mb-4">
          <img src="/student.jpg" className="w-12 h-12 rounded-full object-cover" />
          <div>
            <h4 className="font-semibold">Rahul Kumar</h4>
            <p className="text-xs text-gray-500">Class 8th JEE Fundation</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          “The tutors are amazing! I improved my math scores within 2 months. Highly recommended.”
        </p>

        <div className="text-yellow-500">⭐⭐⭐⭐⭐</div>
      </div>

      {/* Review Card 2 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
        <div className="flex items-center gap-4 mb-4">
          <img src="/studentOnline.png" className="w-12 h-12 rounded-full object-cover" />
          <div>
            <h4 className="font-semibold">Anjali Sharma</h4>
            <p className="text-xs text-gray-500">Parent</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          “Very flexible scheduling and great tutors. My child enjoys learning now.”
        </p>

        <div className="text-yellow-500">⭐⭐⭐⭐⭐</div>
      </div>

      {/* Review Card 3 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
        <div className="flex items-center gap-4 mb-4">
          <img src="/boyWaving.png" className="w-12 h-12 rounded-full object-cover" />
          <div>
            <h4 className="font-semibold">Suresh Reddy</h4>
            <p className="text-xs text-gray-500">9th class IIT Fundation 

            </p>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          “The one-to-one sessions helped me understand concepts clearly. Great platform!”
        </p>

        <div className="text-yellow-500">⭐⭐⭐⭐⭐</div>
      </div>

    </div>

  </div>
</section>

      {/* FOOTER */}
      <footer className="bg-[#111827] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="text-2xl font-bold mb-4">TutorBook</div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Officia Deserunt Mollitia Animi, Id Est Laborum Fuga. Et Harum Quidem Rerum Facilis Est Et Expedita Distinctio.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-6">Quick Link</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors"
              onClick={(e) => {
                  navigate("/register")
                }}
              >Find a Tutor</a></li>
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