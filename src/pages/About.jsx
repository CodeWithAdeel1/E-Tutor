import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 md:px-10 py-8">
      <div className="max-w-5xl mx-auto bg-white text-gray-800 shadow-lg rounded-3xl px-6 sm:px-10 py-12 space-y-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#FF7043]">
          About Us
        </h1>

        <p className="text-base sm:text-lg md:text-xl leading-relaxed text-justify">
          Welcome to our platform — your trusted place to find and connect with top-tier teachers for both <strong>online</strong> and <strong>in-person</strong> learning.
        </p>

        <section>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#FF7043] mb-2">Our Story</h2>
          <p className="text-base sm:text-lg leading-relaxed text-justify">
            We are {/* <strong>Muhammad Usama Saeed</strong> and */} <strong>Muhammad Adeel</strong>, final year BS students driven by our passion for learning and teaching. This project was born out of a simple but powerful idea: to eliminate the barriers students face when trying to find the right teachers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#FF7043] mb-2">Why We Built This</h2>
          <p className="text-base sm:text-lg leading-relaxed text-justify">
            As students, we often saw the struggle of finding quality teachers — whether for school, university, or skill-based learning. So, we built this platform to make the process <strong>easier, faster, and more reliable</strong>. Whether you prefer learning online or in-person, our goal is to connect you with the right educator for your needs.
          </p>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#FF7043] mb-4">Meet the Developer</h2>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <div className="bg-[#FFE0B2] p-6 sm:p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow">
              <h3 className="text-xl font-semibold text-[#FF7043] mb-2">Muhammad Adeel</h3>
              <p className="text-base sm:text-md text-gray-800 leading-relaxed">
                Hi, I'm Muhammad Adeel, a passionate React developer with expertise in Node.js and Express. I focus on building dynamic, user-friendly interfaces and scalable back-end solutions. Currently completing my BS degree at Agriculture University Peshawar, I’m dedicated to creating impactful, full-stack applications that solve real-world problems.
              </p>
              
              {/* CV Action Buttons */}
              <div className="flex flex-wrap gap-4 mt-4">
                {/* Opens CV in a new tab */}
                <a 
                  href="/M-Adeel_CV.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <button className="px-6 py-2 bg-[#FF7043] text-white rounded-md hover:bg-[#FF5722] transition-all font-medium">
                    View CV
                  </button>
                </a>

                {/* Direct Download CV Button */}
                <a 
                  href="/M-Adeel_CV.pdf" 
                  download="Muhammad_Adeel_CV.pdf"
                >
                  <button className="px-6 py-2 border-2 border-[#FF7043] text-[#FF7043] rounded-md hover:bg-[#FF7043] hover:text-white transition-all font-medium">
                    Download CV
                  </button>
                </a>
              </div>
            </div>

            {/* 
            <div className="bg-[#FFE0B2] p-6 sm:p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow">
              <h3 className="text-xl font-semibold text-[#FF7043] mb-2">Muhammad Usama Saeed</h3>
              <p className="text-base sm:text-md text-gray-800 leading-relaxed">
                I'm Muhammad Usama Saeed, a backend developer skilled in creating scalable applications and APIs. Currently completing my BS degree at Agriculture University Peshawar, I gained practical experience as a backend developer at E Digital Pakistan Pvt Ltd. I specialize in performance, security, and efficient data handling.
              </p>
              <a href='{usamaCV}' target="_blank" rel="noopener noreferrer">
                <button className="mt-4 px-6 py-2 bg-[#FF7043] text-white rounded-md hover:bg-[#FF5722] transition-all">View Usama's CV</button>
              </a>
            </div> 
            */}
          </div>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#FF7043] mb-2">Our Mission</h2>
          <p className="text-base sm:text-lg leading-relaxed text-justify">
            To build a smart and accessible learning environment where students can find teachers effortlessly and teachers can reach students who truly value their expertise.
          </p>
        </section>

        <footer className="pt-6 border-t text-center">
          <p className="text-sm text-gray-500">Made by Muhammad Adeel {/* & Muhammad Usama Saeed */}</p>
        </footer>
      </div>
    </div>
  );
};

export default About;