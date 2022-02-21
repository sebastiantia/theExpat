import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { NavigationControl } from "react-map-gl";
import { login } from "../api";

interface MapStylesProps {
  setShowMapStyles: React.Dispatch<React.SetStateAction<boolean>>;
  setmapStyle: React.Dispatch<React.SetStateAction<string>>;
}

const MapStyles = ({ setShowMapStyles, setmapStyle }) => {
  const [loading, setLoading] = useState(false);

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
                      <div className="flex items-center space-x-4 overflow-auto">
                        <button
                          className=" hover:scale-110 motion-reduce:transform-none flex justify-center items-center w-full text-white  rounded-md focus:outline-none"
                          onClick={() => {
                            setmapStyle(
                              "mapbox://styles/sebastiantia/ckzsrleku000j15muudr5oyb0"
                            );
                          }}
                        >
                          <img src="./Basic.png" />
                        </button>
                        <button
                          className=" hover:scale-110 motion-reduce:transform-none flex justify-center items-center w-full text-white  rounded-md focus:outline-none"
                          onClick={() => {
                            setmapStyle(
                              "mapbox://styles/sebastiantia/ckzw86eni001614lqbtjpcjn5"
                            );
                          }}
                        >
                          <img src="./Blueprint.png" />
                        </button>
                        <button
                          className=" hover:scale-110 motion-reduce:transform-none flex justify-center items-center w-full text-white  rounded-md focus:outline-none"
                          onClick={() => {
                            setmapStyle(
                              "mapbox://styles/sebastiantia/ckzw83sus000e14mhk1la4tm1"
                            );
                          }}
                        >
                          <img src="./Standard.png" />
                        </button>
                      </div>
                      <div className="mt-4 flex items-center space-x-4 overflow-auto">
                        <button
                          className=" hover:scale-110 motion-reduce:transform-none flex justify-center items-center w-full text-white  rounded-md focus:outline-none"
                          onClick={() => {
                            setmapStyle(
                              "mapbox://styles/sebastiantia/ckzsrlmq9000w14k58uo2bx94"
                            );
                          }}
                        >
                          <img src="./Satellite.png" />
                        </button>
                        <button
                          className="hover:scale-110 motion-reduce:transform-none  flex justify-center items-center w-full text-white  rounded-md focus:outline-none"
                          onClick={() => {
                            setmapStyle(
                              
                              "mapbox://styles/sebastiantia/ckzw833ha000k14o1oge5oi2e"
                            );
                          }}
                        >
                          <img src="./Bubble..png" />
                        </button>
                        <button
                          className=" hover:scale-110 motion-reduce:transform-none flex justify-center items-center w-full text-white  rounded-md focus:outline-none"
                          onClick={() => {
                            setmapStyle(
                              "mapbox://styles/sebastiantia/ckzsrm0wv000h15qbd9ap8cie"
                            );
                          }}
                        >
                          <img src="./navigation.png" />
                        </button>
                      </div>

                      <div className="pt-4 flex items-center space-x-2">
                        <button
                          className="bg-slate-400 flex justify-center items-center w-full text-white px-2 py-2 rounded-md focus:outline-none hover:bg-slate-500"
                          onClick={() => {
                            setShowMapStyles();
                          }}
                        >
                          Finish
                        </button>
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

export default MapStyles;
