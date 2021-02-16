import React from 'react';
import { useState } from 'react';
import useVideo from './useVideo';

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
      <h1>Classroom</h1>
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
      <div>
        <video muted autoPlay={true} ref={myVideoRef}></video>
        <video muted autoPlay={true} ref={incomingVideoRef}></video>
      </div>
    </div>
  );
};

export default Video;
