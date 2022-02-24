import Map, { FullscreenControl, GeolocateControl, Marker, NavigationControl, Popup } from "react-map-gl";
import React, { useState, useEffect, useRef, Fragment } from "react";
import { listPosts, me } from "../api";
import { ConvertBack } from "../convert";
import { Dialog, Transition } from "@headlessui/react";
import "../styles/index.css";
import PostEntry from "../components/PostEntry";
import SideBar from "../components/SideBar";
import Login from "../components/Login";


const App = (Component, pageProps) => {
  const [posts, setPosts] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [postLocation, setPostLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 37.6,
    longitude: -95.665,
    zoom: 4,
  });
  const [open, setOpen] = useState(false);

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({});

  const [mapStyle, setmapStyle] = useState("mapbox://styles/sebastiantia/ckzkv00yo000315klmq7isiez");


  const getPosts = async () => {
    const result = await listPosts();
    setPosts(result);
  };

  useEffect(() => {
    (async () => {
      getPosts();
      const data = await me();
      setUser(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      getPosts();
    })();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     setMessage(user)
  //     console.log("Message is:", message)
  //   })
  // },[user])

  // console.log(showPopup);
  const showAddMarkerPopup = (event) => {
    const info = event.lngLat;
    setPostLocation(info);
  };

  return (
    <>
      {/* <Login/> */}
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <SideBar setUser={setUser} user={user} setmapStyle={setmapStyle} />
      </div>
      <link
        href="https://api.tiles.mapbox.com/mapbox-gl-js/v2.7.0/mapbox-gl.css"
        rel="stylesheet"
      />

      <div
        style={{
          display: "block",
          position: "absolute",
          top: "0",
          bottom: "0",
          left: "0",
        }}
      >
        <Map
          initialViewState={{
            longitude: -80.5204,
            latitude: 43.4643,
            zoom: 12,
          }}
          style={{ width: "100vw", height: "100vh" }}
          mapStyle={mapStyle}
          mapboxAccessToken="pk.eyJ1Ijoic2ViYXN0aWFudGlhIiwiYSI6ImNremdlYmY4NDNxb3cydnA0dWhkOG5iNnEifQ.JkzYAdHjchrXHiSGnZtlZA"
          onDblClick={showAddMarkerPopup}
          renderWorldCopies={true}
        >
          {posts.map((post) => {
            return (
              <>
                <Marker
                  longitude={ConvertBack(post.longitude)}
                  latitude={ConvertBack(post.latitude)}
                  anchor="center"
                >
                  <div
                    onClick={() => {
                      setShowPopup({ [post.id]: true });
                    }}
                  >
                    <svg
                      style={{
                        height: `${6 * viewport.zoom}px`,
                        width: `${6 * viewport.zoom}px`,
                        fill: "orange",
                      }}
                      version="1.1"
                      id="Layer_1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 512 512"
                    >
                      <g>
                        <g>
                          <path
                            d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                        c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                        c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                </Marker>

                {showPopup[post.id] ? (
                  <div>
                    <Popup
                      longitude={ConvertBack(post.longitude)}
                      latitude={ConvertBack(post.latitude)}
                      anchor="top"
                      closeButton={true}
                      closeOnClick={false}
                      onClose={() => {
                        setShowPopup({});
                      }}
                      style={{
                        maxWidth: "800px",
                      }}
                    >
                      <div className="max-w-sm rounded overflow-hidden shadow-lg">
                        <div className="px-2 py-2">
                          <img className="rounded-t-lg" src="" alt="" />

                          {post.image && (
                            <img
                              className="font-bold max-h-80  text-xl= mb-2"
                              src={post.image}
                            />
                          )}

                          <div className="text-gray-900 text-xl font-medium mb-">
                            {post.title}
                          </div>

                        

                          <p className="text-gray-700 text-base">
                            {post.description}
                          </p>
                          {post?.visitDate ? (
                            <p className=" text-gray-600 text-xs">
                              Visit Date: {post.visitDate.slice(0, 10)}
                            </p>
                          ) : null}
                            <p className=" text-gray-600 text-xs">User: {post?.creator}</p>
                          
                          
                        </div>
                      </div>
                    </Popup>
                  </div>
                ) : null}
              </>
            );
          })}

          {postLocation && user ? (
            <>
              <Marker
                longitude={postLocation.lng}
                latitude={postLocation.lat}
                anchor="center"
              >
                <svg
                  style={{
                    height: `${6 * viewport.zoom}px`,
                    width: `${6 * viewport.zoom}px`,
                    fill: "red",
                  }}
                  version="1.1"
                  id="Layer_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <g>
                      <path
                        d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                        c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                        c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"
                      />
                    </g>
                  </g>
                </svg>
              </Marker>

              <PostEntry
                location={postLocation}
                setPostLocation={setPostLocation}
                getPosts={getPosts}
                user={user}
              />
            </>
          ) : null}
          {/* style={{position:"relative", top:"90px", left: "-30px"}} */}
           <GeolocateControl position='top-left' trackUserLocation={true}/>
           <FullscreenControl position="top-left"/>
           <NavigationControl position="top-left" visualizePitch={true}/>

        </Map>
      </div>
    </>
  );
};

export default App;
