import React from 'react';
import { useRef } from 'react';
import RecordRTCPromisesHandler from 'recordrtc';
import invokeSaveAsDialog from 'recordrtc';

export default function Videorecording() {
  const myVideoRef = useRef();

  const streamRef = useRef();
  const recorederRef = useRef();

  const record = async () => {
    let stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    myVideoRef.current.srcObject = stream;
    let recorder = new RecordRTCPromisesHandler(stream, {
      type: 'video',
      mimeType: 'video/webm',
    });
    recorder.startRecording();

    streamRef.current = stream;
    recorederRef.current = recorder;
  };

  const stop = async () => {
    let recorder = recorederRef.current;

    recorder.stopRecording(function () {
      let blob = recorder.getBlob();

      let file = new File([blob], 'chtoto.webm', {
        type: 'video/webm',
      });
      invokeSaveAsDialog(file);
      // invokeSaveAsDialog(blob, 'testvideo.webm');
    });
  };

  return (
    <div>
      <video ref={myVideoRef} muted autoPlay={true}></video>
      <button onClick={record}>Record</button>
      <button onClick={stop}>Stop and Download</button>
    </div>
  );
}
