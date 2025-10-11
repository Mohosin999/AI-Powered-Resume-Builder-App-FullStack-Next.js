"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { Brain } from "lucide-react";
import { FaLinkedin, FaGithub, FaFacebook } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import GetStartedButton from "@/components/ui/get-started-button";
import { features } from "./../utils/features";
import GoToTop from "./go-to-top";
import { syncUser } from "@/actions/user-actions";
import { motion } from "framer-motion";

const HomePage = () => {
  // Sync user
  useEffect(() => {
    const sync = async () => await syncUser();
    sync();
  }, []);

  return (
    <div className="">
      <div className="min-h-screen">
        {/*=====================================================================
        =                           Hero section                               =
        =====================================================================*/}
        <div className="relative w-full lg:h-[100vh] py-10 lg:py-14 px-3 md:px-10 lg:px-14 flex items-center justify-center overflow-hidden">
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('./img/background.jpg')" }}
          />

          {/* Content overlay */}
          <div className="relative z-10 px-0 md:px-10 lg:px-14 text-center  lg:max-w-6xl mx-auto ">
            {/* AI badge (added extra touch) */}
            <div className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-md text-sm px-4 py-1 rounded-full mx-auto mb-5 border border-white/20 shadow-sm">
              <Brain className="w-4 h-4 text-blue-400" />
              <span className="text-gray-200">Powered by AI</span>
            </div>

            {/* Animated gradient heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.9 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-[#FFF42B] text-3xl md:text-5xl font-extrabold text-center"
            >
              Build Your Professional Resume
            </motion.h2>

            {/* Paragraph */}
            <p className="text-left !text-gray-200 md:text-center mt-4 mb-6 paragraph lg:!text-lg">
              You don’t need to worry about resume formatting here. Simply fill
              out the forms casually, and our system will automatically generate
              a world-class professional resume format for you. An even bigger
              advantage is that you can use AI to create your resume or get
              professional suggestions and ideas. Stay free from formatting
              hassles and let AI smartly enhance your resume with precision and
              style.
            </p>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-3">
              <GetStartedButton />

              <a
                href="https://github.com/Mohosin999/FullStack-AI-Resume-Builder-App-Next.js"
                target="_blank"
                rel="noopener noreferrer"
                className="text-center w-full md:w-auto"
              >
                <Button
                  variant="ghost"
                  className="ghost-btn-2nd !border-gray-200 !text-gray-200 hover:!bg-gray-800 duration-300 "
                >
                  View GitHub Repository <FaGithub className="ml-2 w-5 h-5" />
                </Button>
              </a>
            </div>

            {/* Social links */}
            <div className="mt-6 md:mt-12">
              <h2 className="text-center mt-5 h2 !text-white">
                Connect With Me
              </h2>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 0.9 }}
                viewport={{ once: true, amount: 0.9 }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.5 }}
                className="flex items-center justify-center gap-6 mt-3"
              >
                <a
                  href="https://www.facebook.com/mohosinh99"
                  target="_blank"
                  className="text-gray-900 p-2 bg-[#fdffcd] rounded-full hover:scale-105 transition-all duration-300 ease-out"
                >
                  <FaFacebook size={21} />
                </a>
                <a
                  href="https://www.linkedin.com/in/mohosinh99/"
                  target="_blank"
                  className="text-gray-900 p-3 bg-[#fdffcd] rounded-full hover:scale-105 transition-all duration-300 ease-out"
                >
                  <FaLinkedin size={30} />
                </a>
                <a
                  href="https://github.com/Mohosin999"
                  target="_blank"
                  className="text-gray-900 p-2 bg-[#fdffcd] rounded-full hover:scale-105 transition-all duration-300 ease-out"
                >
                  <FaGithub size={21} />
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        {/*=====================================================================
        =                           Key features                               =
        =====================================================================*/}
        <div className="w-full max-w-6xl mx-auto pt-12 md:pt-16">
          {/* <div className="w-full pt-12 pb-10 md:pt-16 md:pb-6"> */}
          <div className="px-3 md:px-10 lg:px-14">
            <h1 className="h1">Why Our Resume Builder?</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5">
              {features.map((feature, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.9 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  key={index}
                  className="card lg:!p-10"
                >
                  <h2 className="h2 mb-3">{feature.title}</h2>
                  <p className="paragraph">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/*=====================================================================
        =                        What our customers say                       =
        =====================================================================*/}

        <div className="w-full max-w-6xl mx-auto py-12 md:py-16 px-3 md:px-10 lg:px-14">
          <h1 className="h1 text-center lg:!mb-12">What Our Users Say</h1>

          <div className="space-y-8">
            {/* Review 1 */}
            <motion.div
              className="flex flex-col md:flex-row items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.9 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="md:w-1/2 flex justify-center mb-6 md:mb-0">
                <div className="w-60 h-60 rounded-full overflow-hidden shadow-lg">
                  <Image
                    src="/img/user1.jpg"
                    alt="User 1"
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="md:w-1/2 flex flex-col justify-center text-center md:text-left">
                <h3 className="h3 mb-4">Edward Collins</h3>
                <p className="paragraph">
                  The AI resume builder has completely transformed how I create
                  resumes. It suggests professional improvements automatically,
                  ensuring every detail is polished. My resumes now stand out
                  and impress recruiters in less time.
                </p>
              </div>
            </motion.div>

            {/* Review 2 */}
            <motion.div
              className="flex flex-col md:flex-row-reverse items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.9 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            >
              <div className="md:w-1/2 flex justify-center mb-6 md:mb-0">
                <div className="w-60 h-60 rounded-full overflow-hidden shadow-lg">
                  <Image
                    src="/img/user2.jpg"
                    alt="User 2"
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="md:w-1/2 flex flex-col justify-center text-center md:text-left">
                <h3 className="h3 mb-4">James Carter</h3>
                <p className="paragraph">
                  I was amazed at how intuitive the AI suggestions were. It
                  helped me optimize my experience and skills sections, making
                  my resume professional and recruiter-ready. I now save hours
                  on resume creation every week.
                </p>
              </div>
            </motion.div>

            {/* Review 3 */}
            <motion.div
              className="flex flex-col md:flex-row items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.9 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
            >
              <div className="md:w-1/2 flex justify-center mb-6 md:mb-0">
                <div className="w-60 h-60 rounded-full overflow-hidden shadow-lg">
                  <Image
                    src="/img/user3.jpg"
                    alt="User 3"
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="md:w-1/2 flex flex-col justify-center text-center md:text-left">
                <h3 className="h3 mb-4">John Smith</h3>
                <p className="paragraph">
                  Using this AI resume builder has been a game-changer. It
                  ensures my resumes are not only visually appealing but also
                  professionally formatted. The automated suggestions truly make
                  my profile shine.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* <Go to top button /> */}
      <GoToTop />
    </div>
  );
};

export default HomePage;
