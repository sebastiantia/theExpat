import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { createPost } from "../api";
import { Post } from "../types/Post";
import axios from "axios";
import { User } from "../types/User";
import { Location } from "../types/Location";

interface PostEntryProps{
  location: Location;
  setPostLocation: React.Dispatch<React.SetStateAction<null>>;
  getPosts: VoidFunction;
  user: User;
}

const PostEntry: React.FC<PostEntryProps> = ({ location, setPostLocation, getPosts, user }) => {
  const cancelButtonRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const newLng = Math.trunc(location.lng * 100000);
  const newLat = Math.trunc(location.lat * 100000);
  const [data, setData] = useState<Post>({
    creator: user?.username,
    longitude: newLng,
    latitude: newLat,
    title: null,
    description: null,
    image: null,
    visitDate: null,
  });

  useEffect(() => {
    console.log(error);
  }, [error]);
  return (
    <>
      <Transition.Root show={true} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={() => {
          }}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
           
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            
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
                            Create a Post
                          </h2>
                        </div>
                      </div>
                      <div className="divide-y divide-gray-200">
                        <div className="py-4 text-base leading-6 space-y-2 text-gray-700 sm:text-lg sm:leading-7">
                          <div className="flex flex-col">
                            <label className="leading-loose">Event Title</label>
                            <input
                              type="text"
                              className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                              placeholder="Event title"
                              onChange={(e) => {
                                setData({ ...data, title: e.target.value });
                              }}
                            />
                          </div>
                          <div className="flex flex-col">
                            <label className="leading-loose">
                              Event Description
                            </label>
                            <textarea
                              className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                              placeholder="Optional"
                              onChange={(e) => {
                                setData({
                                  ...data,
                                  description: e.target.value,
                                });
                              }}
                            />
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex flex-col">
                              <label className="leading-loose">
                                Visit Date
                              </label>
                              <div className="relative flex flex-col focus-within:text-gray-600 text-gray-400">
                                <input
                                  type="date"
                                  className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                  placeholder="25/02/2020"
                                  onChange={(e) => {
                                    setData({
                                      ...data,
                                      visitDate: e.target.value,
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <label className="leading-loose">Image URL</label>
                            <input
                              type="file"
                              className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                              placeholder="Optional"
                              onChange={(e) => {
                                setData({ ...data, image: e.target.files[0] });
                              }}
                            />
                          </div>
                        </div>
                        <div className="pt-4 flex items-center space-x-4">
                          <button
                            className="bg-red-400 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none hover:bg-red-500"
                            onClick={() => {
                              setLoading(true);
                              setPostLocation(null);
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            className="bg-green-400 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none hover:bg-green-500"
                            disabled={loading}
                            onClick={async () => {
                              setLoading(true);
                              
                              const url = await axios.get(
                                "http://localhost:4000/s3Url",
                                {
                                  headers: {
                                    "Content-Type": "multipart/form-data",
                                  },
                                  withCredentials: true,
                                  
                                }
                              );


                              console.log("IMAGE FILE : ", data.image )

                              try {
                                const pog = await axios.put(
                                  url.data,
                                  data.image,
                                  {
                                    headers: {
                                      "Content-Type": data.image.type,
                                    },
                                  }
                                );
                              } catch (e) {
                                console.log(e);
                              }
                              const imageUrl = url.data.split("?")[0];
                              
                              await createPost({ ...data, image: imageUrl });

                              setPostLocation(null);
                              getPosts();
                            }}
                          >
                            {loading ? "Loading..." : "Create Entry"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default PostEntry;
