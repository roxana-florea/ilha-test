import { useRef } from 'react';
import Peer from 'peerjs';
import RecordRTCPromisesHandler from 'recordrtc';
import fileSaver from 'file-saver';
import moment from 'moment';

const useVideo = (roomId) => {
  const myVideoRef = useRef();
  const incomingVideoRef = useRef();
  const recorederRef = useRef();

  const getUserMedia = (callback) => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 1280, height: 720 }, audio: true })
      .then((stream) => {
        callback(stream);
        let recorder = new RecordRTCPromisesHandler(stream, {
          type: 'video',
        });
        recorederRef.current = recorder;
      })
      .catch((error) => {
        console.log(`error occured(( ${error.name}`);
      });
  };

  const createPeer = (id) => {
    return process.env.REACT_APP_PEER_USE_CLOUD
      ? new Peer(id)
      : new Peer(id, {
          host: process.env.REACT_APP_PEER_HOST,
          port: process.env.REACT_APP_PEER_PORT,
          path: process.env.REACT_APP_PEER_PATH,
        });
  };

  const start = () => {
    const peer = createPeer(roomId);
    peer.on('open', () => {
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
      console.log(peer);
      getUserMedia((stream) => {
        myVideoRef.current.srcObject = stream;
        const call = peer.call(incomingVideoId, stream);
        call.on('stream', (incomingStream) => {
          incomingVideoRef.current.srcObject = incomingStream;
        });
      });
    });
  };

  const startRecording = () => {
    let recorder = recorederRef.current;
    recorder.startRecording();
  };

  const stopRecording = () => {
    let recorder = recorederRef.current;

    recorder.stopRecording(() => {
      let blob = recorder.getBlob();
      fileSaver.saveAs(blob, getFileName('webm'));
    });
  };

  const getFileName = (fileExtension) => {
    return `Ilha-${moment().format('YYYY-MM-DD-hh-mm-ss')}.${fileExtension}`;
  };

  return {
    start,
    connect,
    myVideoRef,
    incomingVideoRef,
    startRecording,
    stopRecording,
  };
};

export default useVideo;
