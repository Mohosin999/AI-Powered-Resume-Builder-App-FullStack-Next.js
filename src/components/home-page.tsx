import React from "react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import GetStartedButton from "@/components/ui/get-started-button";
import AnimatedHeading from "@/components/ui/animated-heading";

interface HomePageProps {
  isAuthenticated: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ isAuthenticated }) => {
  const features = [
    "AI-Powered Suggestions",
    "Customizable Templates",
    "Real-Time Feedback",
    "AI Calculate Resume Score",
  ];

  return (
    <div className="bg-[#131A25]">
      <Navbar />

      <div className="min-h-screen">
        <div className="w-[90%] md:w-[80%] lg:w-[70%] mx-auto text-center">
          <AnimatedHeading
            text="Build Your Professional Resume"
            className="mt-14 text-emerald-400"
          />

          <p className="mt-4 mb-6 paragraph-text-style">
            Take your career to the next level by creating a polished,
            professional resume with the help of cutting-edge AI technology.
            Whether you are just starting out or looking to upgrade your
            existing resume, our intelligent platform guides you every step of
            the way. Receive personalized feedback, formatting suggestions, and
            a professionalism score to ensure your resume is not only visually
            appealing but also optimized to impress employers.
          </p>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-3">
            <GetStartedButton isAuthenticated={isAuthenticated} />

            <a
              href="https://github.com/Mohosin999/AI-Resume-Builder-Application-Frontend"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto"
            >
              <Button variant="ghost" className="homepage-button-style">
                View GitHub Repository <GithubIcon className="ml-2 w-5 h-5" />
              </Button>
            </a>
          </div>

          {/* Social Links */}
          <div className="mt-6 md:mt-12">
            <h3 className="mt-5 text-xl text-[#72839E] font-semibold">
              Connect With Me
            </h3>
            <div className="flex items-center justify-center gap-6 mt-3">
              <a href="https://www.linkedin.com/in/mohosinh99/" target="_blank">
                <LinkedinIcon className="text-emerald-400 hover:text-blue-600" />
              </a>
              <a href="https://x.com/mohosinh99" target="_blank">
                <TwitterIcon className="text-emerald-400 hover:text-blue-400" />
              </a>
              <a href="https://github.com/Mohosin999" target="_blank">
                <GithubIcon className="text-emerald-400 hover:text-gray-700" />
              </a>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="w-full py-10 md:pt-16 md:pb-6">
          <div className="w-[90%] md:w-[80%] lg:w-[70%] mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-8">
              Why Our Resume Builder?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-[#1C2434] p-6 rounded-lg shadow-sm lg:shadow-md transition hover:scale-[1.02]"
                >
                  <h3 className="text-lg md:text-xl font-semibold text-gray-200 mb-3">
                    {feature}
                  </h3>
                  <p className="paragraph-text-style">
                    Vestibulum ante ipsum primis in faucibus orci luctus et
                    ultrices posuere cubilia curae; Duis consequat, metus ac
                    aliquam luctus.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="w-full md:pt-16 pb-10 md:pb-20">
          <div className="w-[90%] md:w-[80%] lg:w-[70%] mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-8">
              What Our Users Are Saying
            </h2>

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
                <div
                  key={i}
                  className="bg-[#1C2434] p-6 rounded-lg shadow-sm lg:shadow-md transition hover:scale-[1.02]"
                >
                  <p className="italic paragraph-text-style">
                    {testimonial.comment}
                  </p>
                  <h4 className="mt-4 text-gray-300 font-semibold">
                    - {testimonial.name}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
