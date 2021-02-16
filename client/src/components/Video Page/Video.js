import React from 'react';
import { useState } from 'react';
import useVideo from './useVideo';
import './Video.css'

const Video = () => {
  const [incomingVideoId, setIncomingVideoId] = useState(null);

  const {
    start,
    connect,
    myVideoId,
    myVideoRef,
    incomingVideoRef,
  } = useVideo();


  return (
    <div>
      <video muted autoPlay={true} ref={myVideoRef}
        style={{
            position : "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: "-2",
            overflowX:'hidden',
            overflowY:'hidden'
        }}
        > 
        </video>

        <div style={{position:'absolute', top:'87%'}}>
      <p>{myVideoId}</p>
      <button onClick={start}>Start</button>
      <input
        onChange={(event) => {
          setIncomingVideoId(event.target.value);
        }}
      />
      <button
        onClick={() => {
          connect(incomingVideoId);
        }}
      >
        Connect
      </button>
      </div>
      <div>
      <video muted autoPlay={true} ref={incomingVideoRef}
        style={{
          position : "absolute",
          top:"3%",
          left:'1%',
          width: "20%",
          height: "auto",
          objectFit: "contain",
          zIndex: "-1",
          borderRadius:'15px',
          boxShadow:'0px 0px 5px 5px grey'
      }}
      > 
        </video>
      </div>
    </div>
  );
};

export default Video;
