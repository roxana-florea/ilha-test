import React from 'react';
import { useState, useRef } from 'react';
import Peer from 'peerjs';

const Video = () => {
  const myVideoRef = useRef();
  const incomingVideoRef = useRef();
  const [videoId, setVideoId] = useState(null);
  const [incomingVideoId, setIncomingVideoId] = useState(null);

  const start = () => {
    const peer = new Peer({
      host: 'https://d1c6493c1d92.ngrok.io/',
      // port: 5000,
      path: '/peerjs',
    });
    peer.on('open', (id) => {
      setVideoId(id);
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          myVideoRef.current.srcObject = stream;
          peer.on('call', (call) => {
            call.answer(stream);
            call.on('stream', (incomingStream) => {
              incomingVideoRef.current.srcObject = incomingStream;
            });
          });
        })
        .catch((error) => {
          console.log(`error occured(( ${error.name}`);
        });
    });
  };

  const connect = () => {
    const peer = new Peer({
      host: 'https://d1c6493c1d92.ngrok.io/',
      // port: 5000,
      path: '/peerjs',
    });

    peer.on('open', (id) => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          myVideoRef.current.srcObject = stream;
          const call = peer.call(incomingVideoId, stream);
          call.on('stream', (incomingStream) => {
            incomingVideoRef.current.srcObject = incomingStream;
          });
        })
        .catch((error) => {
          console.log(`error occured(( ${error.name}`);
        });
    });
  };

  return (
    <div>
      <h1>Classroom</h1>
      <p>{videoId}</p>
      <button onClick={start}>Start</button>
      <input
        onChange={(event) => {
          setIncomingVideoId(event.target.value);
        }}
      />
      <button onClick={connect}>Connect</button>
      <div>
        <video muted autoPlay={true} ref={myVideoRef}></video>
        <video muted autoPlay={true} ref={incomingVideoRef}></video>
      </div>
    </div>
  );
};

export default Video;
