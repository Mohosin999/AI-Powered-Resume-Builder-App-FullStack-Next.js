"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { GithubIcon, LinkedinIcon } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import GetStartedButton from "@/components/ui/get-started-button";
import { aiFeatures, features } from "./../utils/features";
import AnimatedHeading from "./animated-heading";
import GoToTop from "./go-to-top";
import { syncUser } from "@/actions/user-actions";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
        <div className="relative w-full py-10 lg:py-14 px-3 md:px-10 lg:px-14">
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-15 dark:opacity-30"
            style={{ backgroundImage: "url('./img/blue-bg.jpg')" }}
          />

          {/* Content overlay */}
          <div className="relative z-10 px-4 md:px-10 lg:px-14">
            <AnimatedHeading
              text="Build Your Professional Resume"
              className="text-3xl md:text-5xl font-bold text-center"
            />

            <p className="text-center mt-4 mb-6 paragraph">
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
                <Button variant="ghost" className="ghost-btn-2nd">
                  View GitHub Repository <GithubIcon className="ml-2 w-5 h-5" />
                </Button>
              </a>
            </div>

            {/* Social links */}
            <div className="mt-6 md:mt-12">
              <h2 className="text-center mt-5 h2 text-white">
                Connect With Me
              </h2>
              <div className="flex items-center justify-center gap-6 mt-3">
                <a
                  href="https://www.linkedin.com/in/mohosinh99/"
                  target="_blank"
                >
                  <LinkedinIcon className="social-icon-btn" />
                </a>
                <a href="https://x.com/mohosinh99" target="_blank">
                  <FaXTwitter size={21} className="social-icon-btn" />
                </a>
                <a href="https://github.com/Mohosin999" target="_blank">
                  <GithubIcon className="social-icon-btn" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/*======================== End of hero section =====================*/}

        {/*=====================================================================
        =                           Key features                               =
        =====================================================================*/}
        <div className="w-full pt-12 md:pt-16">
          {/* <div className="w-full pt-12 pb-10 md:pt-16 md:pb-6"> */}
          <div className="px-3 md:px-10 lg:px-14">
            <h1 className="h1">Why Our Resume Builder?</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8">
              {features.map((feature, index) => (
                <div key={index} className="card lg:!p-10">
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

        <div className="w-full py-12 md:py-16 px-3 md:px-10 lg:px-14">
          <h1 className="h1 text-center mb-8">How AI Enhances Your Resume</h1>

          <Carousel className="relative overflow-hidden">
            <CarouselContent>
              {aiFeatures.map((item, index) => (
                <CarouselItem key={index} className="basis-full lg:basis-1/2">
                  <div className="p-2">
                    <div className="mb-2 relative">
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
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation buttons - overlay on images */}
            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white hover:bg-black/70" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white hover:bg-black/70" />
          </Carousel>
        </div>

        {/*==================== End of AI Features section ==================*/}
      </div>

      {/* <Go to top button /> */}
      <GoToTop />
    </div>
  );
};

export default HomePage;
