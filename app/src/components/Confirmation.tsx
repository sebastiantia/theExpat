import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { postDelete } from "../api";


interface SidebarProps {
  setconfirmDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdate: React.Dispatch<React.SetStateAction<number>>;
  setdeletePost: React.Dispatch<React.SetStateAction<number>>;
  deletePost: number;
}


const Confirmation = ({
  setconfirmDelete,
  deletePost,
  setdeletePost,
  setUpdate,
}) => {
  const [loading, setLoading] = useState(false);
  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={() => {
          // setPostLocation(null);
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
                <div className="relative px-4  bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                  <div className="max-w-md mx-auto">
                    <div className="divide-y divide-gray-200">
                      <div
                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                        role="alert"
                      >
                        <strong className="font-bold">Holy smokes! </strong>
                        <span className="block sm:inline">Are you sure?</span>
                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                          {!loading ? (
                            <>
                              <button
                                className="block sm:inline hover:font"
                                onClick={async () => {
                                    setLoading(true);
                                    const data = await postDelete({id: deletePost})
                                    setconfirmDelete(false);
                                    setLoading(false);
                                    setUpdate(1)
                                }}
                              >
                                Yes
                              </button>
                              <button
                                className="ml-4 block sm:inline hover:text-red-700"
                                onClick={() => {
                                    setLoading(true)
                                  setdeletePost(0);
                                  setconfirmDelete(false);
                                  setLoading(false)
                                }}
                              >
                                No
                              </button>
                            </>
                          ) : null}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Confirmation;
