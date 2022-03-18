import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { register } from "../api";


const Signup = ({ setShowSignup, setUser }) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usererror, setuserError] = useState("");
  const [passworderror, setpasswordError] = useState("");

  return (
    <>
      <Transition.Root show={true} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={() => {
            // setPostLocation(null);
          }}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out durattailion-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in durattailion-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-500"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-500"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="ease-in-out duration-300 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="justify-center py-3 sm:max-w-xl sm:max-h-8xl sm:mx-auto">
                  <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                    <div className="max-w-md mx-auto">
                      <div className="flex items-center space-x-5">
                        <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
                          i
                        </div>
                        <div className="block pl-2 font-semibold text-xl self-start text-gray-700 items-start">
                          <h2 className="leading-normal font-bold text-4xl">
                            Sign Up
                          </h2>
                        </div>
                      </div>
                      <div className="divide-y divide-gray-200">
                        <div className="py-4 text-base leading-6 space-y-2 text-gray-700 sm:text-lg sm:leading-7">
                          <div className="flex flex-col">
                            <label className="leading-loose">Username</label>
                            <input
                              type="text"
                              className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                              onChange={(e) => {
                                setUsername(e.target.value)
                              }}
                            />
                          </div>
                        </div>
                        <div className="divide-y divide-gray-200">
                          <div className="flex flex-col">
                            <label className="leading-loose">Password</label>
                            <input
                              type="password"
                              className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                              onChange={(e) => {
                                setPassword(e.target.value)
                              }}
                            />
                          </div>
                        </div>
                        {usererror || passworderror ?
                        <div
                          className="bg-red-100 border mt-4 border-red-400 text-red-700 px-4 py-3 rounded relative"
                          role="alert"
                        >
                          <strong className="font-bold">Holy smokes!{" "}</strong>
                          <span className="block sm:inline">
                            {usererror ? usererror : null}
                            {passworderror ? passworderror : null}
                          </span>
                          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                            <svg
                              className="fill-current h-6 w-6 text-red-500"
                              role="button"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <title>Close</title>
                              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                            </svg>
                          </span>
                        </div> : null}
                        <div className="pt-4 flex items-center space-x-4">
                          <button
                            className="bg-red-400 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none hover:bg-red-500"
                            onClick={() => {
                              setLoading(true);
                                
                              setShowSignup(false);
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            className="bg-green-400 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none hover:bg-green-500"
                            disabled={loading}

                            onClick={async () => {
                              setLoading(true);

                              const { data }  = await register({username: username, password: password})


                              if(data?.usererror){
                                setpasswordError("")
                                setuserError(data.usererror)
                                setLoading(false)
                              }
                              if(data.passworderror){
                                setuserError("")
                                setpasswordError(data.passworderror)
                                setLoading(false)
                              }
                              if(data.username && data.password){
                                setUser(data);
                                setLoading(false)
                                setShowSignup(false);
                              }

                            }}
                          >
                            {loading ? "Loading..." : "Sign up"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default Signup;
