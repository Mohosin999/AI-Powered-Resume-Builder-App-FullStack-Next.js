// import React from "react";
// import { GithubIcon, LinkedinIcon, TwitterIcon } from "lucide-react";
// import { Button } from "@/components/ui/button";
// // import Navbar from "@/components/navbar";
// // import Footer from "@/components/footer";
// import GetStartedButton from "@/components/ui/get-started-button";
// import { features } from "@/lib/helper";

// interface HomePageProps {
//   isAuthenticated: boolean;
// }

// const HomePage: React.FC<HomePageProps> = ({ isAuthenticated }) => {
//   return (
//     <div className="px-3 md:px-10 lg:px-14">
//       <div className="min-h-screen">
//         {/*=====================================================================
//         =                           Hero Section                               =
//         =====================================================================*/}
//         <div>
//           <h1 className="text-3xl md:text-5xl font-bold text-center pt-10 lg:pt-14 text-emerald-500">
//             Build Your Professional Resume
//           </h1>

//           <p className="text-center mt-4 mb-6 paragraph">
//             You don’t need to worry about resume formatting here. Simply fill
//             out the forms casually, and our system will automatically generate a
//             world-class professional resume format for you. An even bigger
//             advantage is that you can use AI to create your resume or get
//             professional suggestions and ideas. Stay free from formatting
//             hassles and let AI smartly enhance your resume with precision and
//             style.
//           </p>

//           {/* Buttons */}
//           <div className="flex flex-col md:flex-row items-center justify-center gap-3">
//             <GetStartedButton isAuthenticated={isAuthenticated} />

//             <a
//               href="https://github.com/Mohosin999/FullStack-AI-Resume-Builder-App-Next.js"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-center w-full md:w-auto"
//             >
//               <Button variant="ghost" className="ghost-btn-2nd">
//                 View GitHub Repository <GithubIcon className="ml-2 w-5 h-5" />
//               </Button>
//             </a>
//           </div>

//           {/* Social Links */}
//           <div className="mt-6 md:mt-12">
//             <h2 className="text-center mt-5 h2">Connect With Me</h2>
//             <div className="flex items-center justify-center gap-6 mt-3">
//               <a href="https://www.linkedin.com/in/mohosinh99/" target="_blank">
//                 <LinkedinIcon className="social-icon-btn" />
//               </a>
//               <a href="https://x.com/mohosinh99" target="_blank">
//                 <TwitterIcon className="social-icon-btn" />
//               </a>
//               <a href="https://github.com/Mohosin999" target="_blank">
//                 <GithubIcon className="social-icon-btn" />
//               </a>
//             </div>
//           </div>
//         </div>
//         {/*======================== End of Hero Section =====================*/}

//         {/*=====================================================================
//         =                           Key Features                               =
//         =====================================================================*/}
//         <div className="w-full py-10 md:pt-16 md:pb-6">
//           <div>
//             <h1 className="h1">Why Our Resume Builder?</h1>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
//               {features.map((feature, index) => (
//                 <div key={index} className="card">
//                   <h2 className="h2 mb-3">{feature.title}</h2>
//                   <p className="paragraph">{feature.description}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//         {/*======================== End of Key Features =====================*/}

//         {/*=====================================================================
//         =                            Testimonials                              =
//         =====================================================================*/}
//         <div className="w-full md:pt-16 pb-10 md:pb-20">
//           {/* <div className="w-[90%] md:w-[80%] lg:w-[70%] mx-auto text-center"> */}
//           <div>
//             <h1 className="h1">What Our Users Are Saying</h1>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
//               {[
//                 {
//                   name: "John Doe",
//                   comment:
//                     "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis consequat, metus ac aliquam luctus.",
//                 },
//                 {
//                   name: "Jane Smith",
//                   comment:
//                     "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis consequat, metus ac aliquam luctus.",
//                 },
//               ].map((testimonial, i) => (
//                 <div
//                   key={i}
//                   // className="bg-[#1C2434] p-6 rounded-lg shadow-sm lg:shadow-md transition hover:scale-[1.02]"
//                   className="card"
//                 >
//                   <p className="italic paragraph">{testimonial.comment}</p>
//                   <h4 className="mt-4 text-gray-400 font-semibold">
//                     - {testimonial.name}
//                   </h4>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//         {/*======================== End of Testimonials =====================*/}
//       </div>

//       {/* <Footer /> */}
//     </div>
//   );
// };

// export default HomePage;

"use client";
import React from "react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import GetStartedButton from "@/components/ui/get-started-button";
import { fadeInLeft, fadeInUp, features } from "@/lib/helper";
import { motion } from "framer-motion";

interface HomePageProps {
  isAuthenticated: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ isAuthenticated }) => {
  return (
    <div className="px-3 md:px-10 lg:px-14">
      <div className="min-h-screen">
        {/*=====================================================================
        =                           Hero Section                               =
        =====================================================================*/}
        <div>
          <motion.h1
            {...fadeInUp}
            className="text-3xl md:text-5xl font-bold text-center pt-10 lg:pt-14 text-emerald-500"
          >
            Build Your Professional Resume
          </motion.h1>

          <motion.p {...fadeInLeft} className="text-center mt-4 mb-6 paragraph">
            You don’t need to worry about resume formatting here. Simply fill
            out the forms casually, and our system will automatically generate a
            world-class professional resume format for you. An even bigger
            advantage is that you can use AI to create your resume or get
            professional suggestions and ideas. Stay free from formatting
            hassles and let AI smartly enhance your resume with precision and
            style.
          </motion.p>

          {/* Buttons */}
          <motion.div
            {...fadeInUp}
            className="flex flex-col md:flex-row items-center justify-center gap-3"
          >
            <GetStartedButton isAuthenticated={isAuthenticated} />

            <a
              href="https://github.com/Mohosin999/FullStack-AI-Resume-Builder-App-Next.js"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center w-full md:w-auto"
            >
              <Button variant="ghost" className="ghost-btn-2nd">
                View GitHub Repository <GithubIcon className="ml-2 w-5 h-5" />
              </Button>
            </a>
          </motion.div>

          {/* Social Links */}
          <div className="mt-6 md:mt-12">
            <motion.h2 {...fadeInUp} className="text-center mt-5 h2">
              Connect With Me
            </motion.h2>
            <motion.div
              {...fadeInUp}
              className="flex items-center justify-center gap-6 mt-3"
            >
              <a href="https://www.linkedin.com/in/mohosinh99/" target="_blank">
                <LinkedinIcon className="social-icon-btn" />
              </a>
              <a href="https://x.com/mohosinh99" target="_blank">
                <TwitterIcon className="social-icon-btn" />
              </a>
              <a href="https://github.com/Mohosin999" target="_blank">
                <GithubIcon className="social-icon-btn" />
              </a>
            </motion.div>
          </div>
        </div>
        {/*======================== End of Hero Section =====================*/}

        {/*=====================================================================
        =                           Key Features                               =
        =====================================================================*/}
        <div className="w-full py-10 md:pt-16 md:pb-6">
          <div>
            <motion.h1 {...fadeInUp} className="h1">
              Why Our Resume Builder?
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
              {features.map((feature, index) => (
                <motion.div {...fadeInUp} key={index} className="card">
                  <h2 className="h2 mb-3">{feature.title}</h2>
                  <p className="paragraph">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        {/*======================== End of Key Features =====================*/}

        {/*=====================================================================
        =                            Testimonials                              =
        =====================================================================*/}
        <div className="w-full md:pt-16 pb-10 md:pb-20">
          {/* <div className="w-[90%] md:w-[80%] lg:w-[70%] mx-auto text-center"> */}
          <div>
            <motion.h1 {...fadeInUp} className="h1">
              What Our Users Are Saying
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
              {[
                {
                  name: "John Doe",
                  comment:
                    "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis consequat, metus ac aliquam luctus.",
                },
                {
                  name: "Jane Smith",
                  comment:
                    "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis consequat, metus ac aliquam luctus.",
                },
              ].map((testimonial, i) => (
                <motion.div {...fadeInUp} key={i} className="card">
                  <p className="italic paragraph">{testimonial.comment}</p>
                  <h4 className="mt-4 text-gray-400 font-semibold">
                    - {testimonial.name}
                  </h4>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        {/*======================== End of Testimonials =====================*/}
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;
