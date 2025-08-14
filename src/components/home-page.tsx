"use client";

import React from "react";
import Image from "next/image";
import { GithubIcon, LinkedinIcon } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import GetStartedButton from "@/components/ui/get-started-button";
import { aiFeatures, features } from "./../utils/features";
import AnimatedHeading from "./animated-heading";
import GoToTop from "./go-to-top";

interface HomePageProps {
  isAuthenticated: boolean;
}

/**
 * Home page component
 *
 * @param {boolean} isAuthenticated Whether the user is authenticated.
 * @returns {JSX.Element} The home page component.
 */
const HomePage = ({ isAuthenticated }: HomePageProps) => {
  return (
    <div className="px-3 md:px-10 lg:px-14">
      <div className="min-h-screen">
        {/*=====================================================================
        =                           Hero section                               =
        =====================================================================*/}
        <div>
          <AnimatedHeading
            text="Build Your Professional Resume"
            className="text-3xl md:text-5xl font-bold text-center pt-10 lg:pt-14"
          />

          <p className="text-center mt-4 mb-6 paragraph">
            You don’t need to worry about resume formatting here. Simply fill
            out the forms casually, and our system will automatically generate a
            world-class professional resume format for you. An even bigger
            advantage is that you can use AI to create your resume or get
            professional suggestions and ideas. Stay free from formatting
            hassles and let AI smartly enhance your resume with precision and
            style.
          </p>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-3">
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
          </div>

          {/* Social links */}
          <div className="mt-6 md:mt-12">
            <h2 className="text-center mt-5 h2">Connect With Me</h2>
            <div className="flex items-center justify-center gap-6 mt-3">
              <a href="https://www.linkedin.com/in/mohosinh99/" target="_blank">
                <LinkedinIcon className="social-icon-btn" />
              </a>
              <a href="https://x.com/mohosinh99" target="_blank">
                <FaXTwitter size={22} className="social-icon-btn" />
              </a>
              <a href="https://github.com/Mohosin999" target="_blank">
                <GithubIcon className="social-icon-btn" />
              </a>
            </div>
          </div>
        </div>
        {/*======================== End of hero section =====================*/}

        {/*=====================================================================
        =                           Key features                               =
        =====================================================================*/}
        <div className="w-full pt-12 pb-10 md:pt-16 md:pb-6">
          <div>
            <h1 className="h1">Why Our Resume Builder?</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
              {features.map((feature, index) => (
                <div key={index} className="card">
                  <h2 className="h2 mb-3">{feature.title}</h2>
                  <p className="paragraph">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/*======================== End of key features =====================*/}

        {/*=====================================================================
        =                        AI Features with Images                       =
        =====================================================================*/}
        <div className="w-full pt-2 pb-10 md:pt-16 md:pb-6">
          <h1 className="h1 text-center mb-8">How AI Enhances Your Resume</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
            {aiFeatures.map((item, index) => (
              <div key={index}>
                <div className="mb-1 md:mb-2">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={1280}
                    height={500}
                    className="object-cover rounded-lg"
                  />
                </div>
                <h2 className="h2">{item.title}</h2>
                <p className="paragraph">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        {/*==================== End of AI Features section ==================*/}

        {/*=====================================================================
        =                            Testimonials                              =
        =====================================================================*/}
        <div className="w-full pt-2 pb-10 md:pt-16 md:pb-20">
          <div>
            <h1 className="h1">What Our Users Are Saying</h1>

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
                <div key={i} className="card">
                  <p className="italic paragraph">{testimonial.comment}</p>
                  <h4 className="mt-4 text-gray-400 font-semibold">
                    - {testimonial.name}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/*======================== End of testimonials =====================*/}
      </div>

      {/* <Go to top button /> */}
      <GoToTop />
    </div>
  );
};

export default HomePage;
