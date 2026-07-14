import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Hero = () => {
  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <>
      <div className="min-h-screen pb-20">
        {/* Navbar */}
        <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-40 text-sm">
          <a href="#">
            <img src="/logo.svg" alt="logo" className="h-11 w-auto" />
          </a>

          <div className="hidden md:flex items-center gap-8 transition duration-500 text-slate-800">
            <a href="#" className="hover:text-green-600 transition">
              Home
            </a>
            <a href="#features" className="hover:text-green-600 transition">
              Features
            </a>
            <a href="#testimonials" className="hover:text-green-600 transition">
              Testimonials
            </a>
            <a href="#cta" className="hover:text-green-600 transition">
              Contact
            </a>
          </div>

          <div className="flex gap-2">
            <Link
              to="/app?state=register"
              className="hidden md:block px-6 py-2 bg-green-500 hover:bg-green-700 active:scale-95 transition-all rounded-full text-white"
              hidden={user}
            >
              Get started
            </Link>
            <Link
              to="/app?state=login"
              className="hidden md:block px-6 py-2 border active:scale-95 hover:bg-slate-50 transition-all rounded-full text-slate-700 hover:text-slate-900"
              hidden={user}
            >
              Login
            </Link>

            <Link
              to="/app"
              className="hidden md:block px-8 py-2 bg-green-500 hover:bg-green-700 active:scale-95 transition-all rounded-full text-white"
              hidden={!user}
            >
              Dashboard
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden active:scale-90 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="lucide lucide-menu"
            >
              <path d="M4 5h16M4 12h16M4 19h16" />
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 z-100 bg-black/40 text-black backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <a href="#" className="text-white">
            Home
          </a>
          <a href="#features" className="text-white">
            Features
          </a>
          <a href="#testimonials" className="text-white">
            Testimonials
          </a>
          <a href="#cta" className="text-white">
            Contact
          </a>
          <button
            onClick={() => setMenuOpen(false)}
            className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-green-600 hover:bg-green-700 transition text-white rounded-md flex"
          >
            X
          </button>
        </div>

        {/* Hero Section */}
        <div className="relative flex flex-col items-center justify-center text-sm px-4 md:px-16 lg:px-24 xl:px-40 text-black">
          <div className="absolute top-28 xl:top-10 -z-10 left-1/4 size-72 sm:size-96 xl:size-120 2xl:size-132 bg-green-300 blur-[100px] opacity-30"></div>

          {/* Avatars + Stars */}
          <div className="flex items-center mt-24">
            <div className="flex -space-x-3 pr-3">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200"
                alt="user3"
                className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-1"
              />
              <img
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
                alt="user1"
                className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-2"
              />
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
                alt="user2"
                className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-3"
              />
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200"
                alt="user3"
                className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-4"
              />
              <img
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt="user5"
                className="size-8 rounded-full border-2 border-white hover:-translate-y-0.5 transition z-5"
              />
            </div>

            <div>
              <div className="flex ">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-star text-transparent fill-green-600"
                      aria-hidden="true"
                    >
                      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                    </svg>
                  ))}
              </div>
              <p className="text-sm text-gray-700">Used by 10,000+ users</p>
            </div>
          </div>

          {/* Headline + CTA */}
          <h1 className="text-5xl md:text-6xl font-semibold max-w-5xl text-center mt-4 md:leading-17.5">
            Land your dream job with{" "}
            <span className=" bg-linear-to-r from-green-700 to-green-600 bg-clip-text text-transparent text-nowrap">
              {" "}
              AI-powered{" "}
            </span>{" "}
            resumes.
          </h1>

          <p className="max-w-md text-center text-base my-7">
            Create, edit and download professional resumes with AI-powered
            assistance.
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4 ">
            <Link
              to="/app"
              className="bg-green-500 hover:bg-green-600 text-white rounded-full px-9 h-12 m-1 ring-offset-2 ring-1 ring-green-400 flex items-center transition-colors"
            >
              Get started
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-right ml-1 size-4"
                aria-hidden="true"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
            <button className="flex items-center gap-2 border border-slate-400 hover:bg-green-50 transition rounded-full px-7 h-12 text-slate-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-video size-5"
                aria-hidden="true"
              >
                <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path>
                <rect x="2" y="6" width="14" height="12" rx="2"></rect>
              </svg>
              <span>Try demo</span>
            </button>
          </div>

          <p className="py-6 text-slate-600 mt-14">
            Trusted by leading brands, including
          </p>

          {/* Clean, pure vector SVGs styled globally with standard Tailwind slate fills */}
          <div
            className="flex flex-wrap justify-center gap-12 md:gap-16 max-w-3xl w-full mx-auto py-4 items-center fill-slate-400 text-slate-400 opacity-50"
            id="logo-container"
          >
            {/* Google */}
            <svg className="h-6 w-auto" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09zM12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23zM5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.87-2.6-2.87-4.53-6.16-4.53zM12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>

            {/* Microsoft */}
            <svg className="h-5 w-auto" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="11" height="11" />
              <rect x="12" y="0" width="11" height="11" />
              <rect x="0" y="12" width="11" height="11" />
              <rect x="12" y="12" width="11" height="11" />
            </svg>

            {/* Apple */}
            <svg className="h-6 w-auto" viewBox="0 0 170 170" xmlns="http://www.w3.org/2000/svg">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.38.13-9.13-1.78-14.21-5.74-3.56-2.77-7.46-7.51-11.69-14.21-9.66-15.21-16.18-31.42-19.57-48.65-2.22-11.24-3.33-21.94-3.33-32.1 0-16.15 3.82-29.83 11.45-41.03 6.81-10.05 15.61-15.19 26.41-15.42 4.41 0 9.53 1.34 15.38 4.02 5.85 2.68 9.77 4.02 11.75 4.02 1.45 0 5.41-1.39 11.88-4.18 6.47-2.78 11.58-4.11 15.34-3.97 14.16.59 25.16 5.86 32.99 15.82-11.52 6.99-17.18 16.59-16.97 28.8 0 9.8 3.65 18.04 10.94 24.71 7.29 6.67 16.17 10.42 26.65 11.26-2.31 6.87-5.59 13.78-9.83 20.73zM119.5 33.72c0-7.79 2.76-14.99 8.29-21.6A43.43 43.43 0 0 0 117.13 0c-8.45.39-16.29 3.73-23.51 10.03-6.2 5.37-10.84 12.19-13.91 20.47 7.92.59 15.06-2.18 21.43-8.32 5.61-5.4 8.36-12.19 8.36-20.46z"/>
            </svg>

            {/* Amazon */}
            <svg className="h-6 w-auto" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.035 15.155c-.502.39-1.298.814-1.905.814-.954 0-1.127-.585-1.127-1.456v-4.162c0-1.257-.044-2.818-1.864-2.818-1.777 0-2.037 1.474-2.037 2.73v4.25c0 .872-.217 1.456-1.127 1.456-.563 0-1.256-.347-1.777-.814L5 16.262c.78.694 1.864 1.127 3.034 1.127 2.167 0 2.861-1.387 2.861-3.25v-3.772c0-.737.174-1.344.91-1.344.78 0 .867.52.867 1.344v3.772c0 1.863.694 3.25 2.86 3.25 1.171 0 2.255-.433 3.035-1.127l-1.532-1.107zM22.564 15.11a5.9 5.9 0 0 1-3.415 1.112c-2.32 0-3.953-1.47-3.953-3.987 0-2.73 1.864-4.25 4.343-4.25 2.124 0 3.165 1.17 3.165 3.033v.78h-5.462c.087 1.257.824 1.95 2.037 1.95a3.633 3.633 0 0 0 2.125-.736l1.16.898zm-1.95-3.033c-.043-.91-.433-1.43-1.256-1.43-.824 0-1.214.52-1.3 1.43h2.556zM1.387 18.82C6.155 21.64 12.31 23 18.553 23c2.08 0 4.12-.173 6.11-.52a.37.37 0 0 0 .26-.52.394.394 0 0 0-.434-.217c-1.863.303-3.77.477-5.72.477-5.938 0-11.833-1.257-16.386-3.945a.434.434 0 0 0-.563.13c-.173.26-.043.564.165.715z"/>
            </svg>
          </div>
        </div>
      </div>
      <style>
        {`
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

                    * {
                        font-family: 'Poppins', sans-serif;
                    }
                `}
      </style>
    </>
  );
};

export default Hero;