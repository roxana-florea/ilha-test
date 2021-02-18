import { useState, useRef } from 'react';
import Peer from 'peerjs';

const useVideo = () => {
  const myVideoRef = useRef();
  const incomingVideoRef = useRef();
  const [myVideoId, setMyVideoId] = useState(null);

  const getUserMedia = (callback) => {
    navigator.mediaDevices
      .getUserMedia({ video: {width: 1280, height:720}, audio: true, })
      .then(callback)
      .catch((error) => {
        console.log(`error occured(( ${error.name}`);
      });
  };

  const createPeer = () => {
    return process.env.REACT_APP_PEER_USE_CLOUD
      ? new Peer()
      : new Peer({
          host: process.env.REACT_APP_PEER_HOST,
          port: process.env.REACT_APP_PEER_PORT,
          path: process.env.REACT_APP_PEER_PATH,
        });
  };

  const start = () => {
    const peer = createPeer();
    peer.on('open', (id) => {
      setMyVideoId(id);
      getUserMedia((stream) => {
        myVideoRef.current.srcObject = stream;
        peer.on('call', (call) => {
          call.answer(stream);
          call.on('stream', (incomingStream) => {
            incomingVideoRef.current.srcObject = incomingStream;
          });
        });
      });
    });
  };

  const connect = (incomingVideoId) => {
    const peer = createPeer();
    peer.on('open', (id) => {
      getUserMedia((stream) => {
        myVideoRef.current.srcObject = stream;
        const call = peer.call(incomingVideoId, stream);
        call.on('stream', (incomingStream) => {
          incomingVideoRef.current.srcObject = incomingStream;
        });
      });
    });
  };

  return { start, connect, myVideoId, myVideoRef, incomingVideoRef };
};

export default useVideo;
