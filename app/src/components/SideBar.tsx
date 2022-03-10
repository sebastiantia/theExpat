import React, { useState } from "react";
import { getUserPosts, listPosts, logout, me } from "../api";
import { User } from "../types/User";
import Login from "./Login";
import MapStyles from "./MapStyles";
import Signup from "./Signup";
import ViewPosts from "./ViewPosts";

interface SidebarProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  setmapStyle: React.Dispatch<React.SetStateAction<string>>;
  setPosts: React.Dispatch<React.SetStateAction<[]>>;
}

const SideBar = ({ user, setUser, setmapStyle, setPosts }: SidebarProps) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showviewPosts, setshowviewPosts] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showMapStyles, setShowMapStyles] = useState(false);

  return (
    <>
      {showLogin ? (
        <Login setUser={setUser} setShowLogin={setShowLogin} />
      ) : null}
      {showSignup ? (
        <Signup setUser={setUser} setShowSignup={setShowSignup} />
      ) : null}
      {showMapStyles ? (
        <MapStyles
          setShowMapStyles={setShowMapStyles}
          setmapStyle={setmapStyle}
        />
      ) : null}
      {showviewPosts ? <ViewPosts setshowviewPosts={setshowviewPosts} /> : null}

      {showSidebar ? (
        <button
          className="flex text-4xl text-white items-center cursor-pointer fixed right-10 top-6 z-50"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          x
        </button>
      ) : (
        <svg
          onClick={() => setShowSidebar(!showSidebar)}
          className="fixed  z-30 flex items-center cursor-pointer right-10 top-6"
          fill="#808080"
          viewBox="0 0 100 80"
          width="40"
          height="40"
        >
          <rect width="100" height="10"></rect>
          <rect y="30" width="100" height="10"></rect>
          <rect y="60" width="100" height="10"></rect>
        </svg>
      )}

      <div
        className={` ease-in-out duration-300
        top-0 right-0 w-[25vw] bg-gray-400  p-10 pl-10 text-white shadow-md fixed h-full z-40 ${
          showSidebar ? "translate-x-0 " : "translate-x-full"
        }`}
      >
        {user?.username ? (
          <h3 className="mt-5 mb-8 text-4xl font-semibold text-white">
            Hi there{" "}
            <span className="font-bold text-orange-300">{user.username} </span>
          </h3>
        ) : (
          <h3 className="mt-5 mb-8 text-4xl font-semibold text-white">
            Hi there, you have not signed in!
          </h3>
        )}

        {!user?.username ? (
          <>
            <button
              className=" hover:scale-110 motion-reduce:transform-none hover:text-orange-200 flex items-center "
              onClick={() => {
                if (showSignup) {
                  setShowSignup(false);
                  setShowLogin(true);
                } else if (showMapStyles) {
                  setShowMapStyles(false);
                  setShowSignup(true);
                } else {
                  setShowLogin(true);
                }
              }}
            >
              <svg
                className="h-8 w-8 text-red-white align-middle"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h2 className="hover:scale-110 motion-reduce:transform-none hover:text-orange-200 pl-2 text-white text-2xl">
                Login
              </h2>
            </button>

            <button
              className=" hover:scale-110 motion-reduce:transform-none hover:text-orange-200 flex mt-5 items-center "
              onClick={() => {
                if (showLogin) {
                  setShowLogin(false);
                  setShowSignup(true);
                } else if (showMapStyles) {
                  setShowMapStyles(false);
                  setShowSignup(true);
                } else {
                  setShowSignup(true);
                }
              }}
            >
              <svg
                className="h-8 w-8 ml-0.5 text-red-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>

              <h2 className="hover:scale-110 motion-reduce:transform-none hover:text-orange-200  pl-1 text-white text-2xl">
                Sign-up
              </h2>
            </button>
            <button
              className=" hover:scale-110 motion-reduce:transform-none hover:text-orange-200 flex mt-5 items-center "
              onClick={() => {
                if (showLogin) {
                  setShowLogin(false);
                  setShowMapStyles(true);
                } else if (showSignup) {
                  setShowSignup(false);
                  setShowMapStyles(true);
                } else if (showviewPosts) {
                  setshowviewPosts(false);
                  setShowMapStyles(true);
                } else {
                  setShowMapStyles(true);
                }
              }}
            >
              <svg
                className="h-8 w-8 ml-0.5 text-orange"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <rect x="4" y="6" width="4" height="5" rx="1" />{" "}
                <line x1="6" y1="4" x2="6" y2="6" />{" "}
                <line x1="6" y1="11" x2="6" y2="20" />{" "}
                <rect x="10" y="14" width="4" height="5" rx="1" />{" "}
                <line x1="12" y1="4" x2="12" y2="14" />{" "}
                <line x1="12" y1="19" x2="12" y2="20" />{" "}
                <rect x="16" y="5" width="4" height="6" rx="1" />{" "}
                <line x1="18" y1="4" x2="18" y2="5" />{" "}
                <line x1="18" y1="11" x2="18" y2="20" />
              </svg>
              <h2 className="hover:scale-110 motion-reduce:transform-none hover:text-orange-200  pl-1 text-white text-2xl ">
                Map styles
              </h2>
            </button>
          </>
        ) : (
          <>
            <div className=" motion-reduce:transform-none hover:text-orange-200 ">
              <button
                className=" hover:scale-110 motion-reduce:transform-none hover:text-orange-200 flex mt-5 items-center "
                onClick={() => {
                  if (showLogin) {
                    setShowLogin(false);
                    setshowviewPosts(true);
                  } else if (showMapStyles) {
                    setShowMapStyles(false);
                    setshowviewPosts(true);
                  } else if (showSignup) {
                    setShowSignup(false);
                    setshowviewPosts(true);
                  } else {
                    setshowviewPosts(true);
                  }
                }}
              >
                <svg
                  className="h-8 w-8 text-orange "
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />{" "}
                  <path d="M17.905 13.057c2.208 1.756 3.436 3.308 3.012 4.035-.67 1.146-5.204-.204-10.129-3.016-4.924-2.812-8.374-6.022-7.705-7.168.418-.716 2.347-.458 4.936.524" />{" "}
                  <circle cx="12" cy="12" r="6" />
                </svg>
                <h2 className="hover:scale-110 motion-reduce:transform-none hover:text-orange-200  pl-1 text-white text-2xl">
                  View your posts
                </h2>
              </button>
            </div>
            <div className=" motion-reduce:transform-none hover:text-orange-200 ">
              <button
                className=" hover:scale-110 motion-reduce:transform-none hover:text-orange-200 flex mt-5 items-center "
                onClick={async () => {
                  setPosts(await getUserPosts());
                }}
              >
                <svg
                  className="h-8 w-8 text-orange"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>

                <h2 className="hover:scale-110 motion-reduce:transform-none hover:text-orange-200  pl-1 text-white text-2xl">
                  Show your posts only
                </h2>
              </button>
              </div>
              <button
                className=" hover:scale-110 motion-reduce:transform-none hover:text-orange-200 flex mt-5 items-center "
                onClick={async () => {
                  setPosts(await listPosts());
                }}
              >
                <svg
                  className="h-8 w-8 text-orange"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  {" "}
                  <path stroke="none" d="M0 0h24v24H0z" />{" "}
                  <circle cx="12" cy="12" r="9" />{" "}
                  <line x1="8" y1="12" x2="8" y2="12.01" />{" "}
                  <line x1="12" y1="12" x2="12" y2="12.01" />{" "}
                  <line x1="16" y1="12" x2="16" y2="12.01" />
                </svg>

                <h2 className="hover:scale-110 motion-reduce:transform-none hover:text-orange-200  pl-1 text-white text-2xl">
                  Show all posts
                </h2>
              </button>
            

            <button
              className=" hover:scale-110 motion-reduce:transform-none hover:text-orange-200 flex mt-5 items-center "
              onClick={() => {
                if (showLogin) {
                  setShowLogin(false);
                  setShowMapStyles(true);
                } else if (showSignup) {
                  setShowSignup(false);
                  setShowMapStyles(true);
                } else if (showviewPosts) {
                  setshowviewPosts(false);
                  setShowMapStyles(true);
                } else {
                  setShowMapStyles(true);
                }
              }}
            >
              <svg
                className="h-8 w-8 ml-0.5 text-orange"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <rect x="4" y="6" width="4" height="5" rx="1" />{" "}
                <line x1="6" y1="4" x2="6" y2="6" />{" "}
                <line x1="6" y1="11" x2="6" y2="20" />{" "}
                <rect x="10" y="14" width="4" height="5" rx="1" />{" "}
                <line x1="12" y1="4" x2="12" y2="14" />{" "}
                <line x1="12" y1="19" x2="12" y2="20" />{" "}
                <rect x="16" y="5" width="4" height="6" rx="1" />{" "}
                <line x1="18" y1="4" x2="18" y2="5" />{" "}
                <line x1="18" y1="11" x2="18" y2="20" />
              </svg>
              <h2 className="hover:scale-110 motion-reduce:transform-none hover:text-orange-200  pl-1 text-white text-2xl ">
                Map styles
              </h2>
            </button>

            <button
              className=" hover:scale-110 motion-reduce:transform-none hover:text-orange-200 flex mt-5 items-center "
              onClick={async () => {
                const data = await logout();
                // console.log(data);
                setUser(data);
              }}
            >
              <svg
                className="h-8 w-8 text-white-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6"
                />
              </svg>

              <h2 className="hover:scale-110 motion-reduce:transform-none hover:text-orange-200  pl-2 text-white text-2xl">
                Log out
              </h2>
            </button>
          </>
        )}

        {/* <button className=" pt-8 flex items-center focus:outline-none focus:ring-2 focus:ring-white">
          <svg
            className="h-8 w-8 text-white-500"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            {" "}
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <circle cx="12" cy="12" r="9" />{" "}
            <line x1="12" y1="8" x2="12.01" y2="8" />{" "}
            <polyline points="11 12 12 12 12 16 13 16" />
          </svg>
          <h2 className=" pl-2 text-white text-2xl">About</h2>
        </button> */}
      </div>
    </>
  );
};

export default SideBar;
