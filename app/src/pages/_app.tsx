import Map, { Marker, Popup } from "react-map-gl";
import React, { useState, useEffect } from "react";
import { listPosts } from "../listPosts";
import { ConvertBack } from "../convert";


const App = (Component, pageProps) => {
  const [posts, setPosts] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [postLocation, setPostLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 37.6,
    longitude: -95.665,
    zoom: 3,
  });

  useEffect(() => {
    (async () => {
      const result = await listPosts();
      setPosts(result);
    })();
  }, []);

  // console.log(showPopup);
  const showAddMarkerPopup= (event) => {
    const info = event.lngLat;
    setPostLocation(info);
    console.log(postLocation)
  }


  return (
    <>
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
          mapStyle="mapbox://styles/sebastiantia/ckzgf993a000014o69t7d98rs"
          mapboxAccessToken="pk.eyJ1Ijoic2ViYXN0aWFudGlhIiwiYSI6ImNremdlYmY4NDNxb3cydnA0dWhkOG5iNnEifQ.JkzYAdHjchrXHiSGnZtlZA"
          onDblClick={showAddMarkerPopup}
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
                      console.log(showPopup);
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
                        console.log(showPopup);
                      }}
                    >
                      <div>
                        <h3>{post.title}</h3>
                        <p>{post.description}</p>
                      </div>
                    </Popup>
                  </div>
                ) : null}
              </>
            );
          })}
          {
            postLocation ? (
              (post) => {
                <Popup
                      longitude={(postLocation.lng)}
                      latitude={(postLocation.lat)}
                      anchor="top"
                      closeButton={true}
                      closeOnClick={false}
                    >
                      <div>
                        <h3>ASKDJNASKDJNAKSN</h3>
                      </div>
                    </Popup>
              }
            ) : null
          }
        </Map>
      </div>
    </>
  );
};

export default App;
