import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { getUserPosts } from "../api";
import { Post } from "../types/Post";
import Confirmation from "./Confirmation";
import Update from "./UpdatePost";

interface SidebarProps {
  setshowviewPosts: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdate: React.Dispatch<React.SetStateAction<number>>;
}


const ViewPosts = ({ setshowviewPosts, setUpdate } : SidebarProps) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [userPosts, setuserPosts] = React.useState<[Post] | []>([]);
  const [confirmDelete, setconfirmDelete] = React.useState<boolean>(false);
  const [deletePost, setdeletePost] = React.useState<number>(0);
  const [updateModal, setupdateModal] = React.useState<boolean>(false);
  const [updatePost, setupdatePost] = React.useState<number>(0);

  const viewUserPosts = async () => {
    const result = await getUserPosts();
    console.log(result)
    setuserPosts(result);
  };

  useEffect(() => {
    (() => {
      viewUserPosts();
    })();
  }, [confirmDelete]);

  return (
    <>
      {confirmDelete ? (
        <Confirmation
          setconfirmDelete={setconfirmDelete}
          deletePost={deletePost}
          setdeletePost={setdeletePost}
          setUpdate={setUpdate}
        />
      ) : (
        <>
          {updateModal ? (
            <Update
              setupdateModal={setupdateModal}
              updatePost={updatePost}
              setupdatePost={setupdatePost}
            />
          ) : (
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
                            <div className="divide-y divide-gray-200">
                              {userPosts.map((post) => {
                                return (
                                  <>
                                    <div className="w-auto  justify-center pt-2">
                                      <div className="pt-3 flex flex-col md:flex-row w- rounded-lg bg-white shadow-lg">
                                        <img
                                          className=" w-full h-10 md:h-auto object-cover md:w-36 rounded-t-lg md:rounded-none md:rounded-l-lg"
                                          src={post.image}
                                        />
                                        <div className="p-6 flex flex-col justify-start">
                                          <h5 className="text-gray-900 text-xl font-medium mb-2">
                                            {post.title}
                                          </h5>
                                          {post.description ? (
                                            <p className="text-gray-700 text-base mb-4">
                                              {post.description}
                                            </p>
                                          ) : null}

                                          {post.visitDate ? (
                                            <p className="text-gray-600 text-xs">
                                              {post.visitDate.slice(0, 10)}
                                            </p>
                                          ) : null}

                                          <div>
                                            <button
                                              className="ml-2 text-white rounded-md focus:outline-none "
                                              onClick={async () => {
                                                setLoading(true);

                                                setupdatePost(post.id);
                                                setupdateModal(true);
                                                console.log(updatePost);

                                                // setshowviewPosts(false);
                                              }}
                                            >
                                              <svg
                                                className="h-8 w-8 text-yellow-500"
                                                viewBox="0 0 24 24"
                                                stroke-width="2"
                                                stroke="currentColor"
                                                fill="none"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              >
                                                {" "}
                                                <path
                                                  stroke="none"
                                                  d="M0 0h24v24H0z"
                                                />{" "}
                                                <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />{" "}
                                                <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />{" "}
                                                <line
                                                  x1="16"
                                                  y1="5"
                                                  x2="19"
                                                  y2="8"
                                                />
                                              </svg>
                                            </button>

                                            <button
                                              className=" text-white px-2 py-2 rounded-md  focus:outline-none "
                                              onClick={() => {
                                                setLoading(true);
                                                // const data = await deletePost(post.id)
                                                setdeletePost(post.id);
                                                setconfirmDelete(true);
                                                // setshowviewPosts(false);
                                              }}
                                            >
                                              <svg
                                                className="h-8 w-8 text-red-500"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                              >
                                                {" "}
                                                <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />{" "}
                                                <line
                                                  x1="18"
                                                  y1="9"
                                                  x2="12"
                                                  y2="15"
                                                />{" "}
                                                <line
                                                  x1="12"
                                                  y1="9"
                                                  x2="18"
                                                  y2="15"
                                                />
                                              </svg>
                                            </button>
                                            {post.heartcount > 0 ? (
                                              <button className="ml-2">
                                                <svg
                                                  className="h-4 w-4 flex hover:fill-red-500 text-red-500"
                                                  viewBox="0 0 24 24"
                                                  fill={"red"}
                                                  stroke="currentColor"
                                                  stroke-width="2"
                                                  stroke-linecap="round"
                                                  stroke-linejoin="round"
                                                >
                                                  {" "}
                                                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                                </svg>
                                                <span className="flex-row">
                                                {post.heartcount}
                                                </span>
                                              </button>
                                            ) : null}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                );
                              })}

                              <div className="pt-4 flex items-center space-x-2">
                                <button
                                  className="bg-slate-400 flex justify-center items-center w-full text-white px-2 py-2 rounded-md focus:outline-none hover:bg-slate-500"
                                  onClick={() => {
                                    setLoading(true);
                                    setshowviewPosts(false);
                                  }}
                                >
                                  Finish
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
          )}
        </>
      )}
    </>
  );
};

export default ViewPosts;
