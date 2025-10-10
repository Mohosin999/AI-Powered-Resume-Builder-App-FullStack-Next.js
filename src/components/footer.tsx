import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white shadow-md dark:bg-[#1C2434] pt-8">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 active:scale-105 mb-4 sm:mb-0"
          >
            <Image
              src="/logo.png"
              alt="AI Resume Logo"
              width={40}
              height={40}
              className="w-6 h-6"
            />
            <span className="text-[#272044] dark:text-amber-50 text-xl font-semibold tracking-wide">
              resumia
            </span>
          </Link>

          <ul className="flex flex-wrap justify-center items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <hr className="my-3 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 text-center dark:text-gray-400">
          © 2025 AI Resume Builder. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
