import React from 'react';
import { useEffect } from 'react';

const Classroom = () => {
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        const video = document.querySelector('video');
        video.srcObject = stream;
      })
      .catch((error) => {
        console.log(`error occured(( ${error.name}`);
      });
  }, []);

  return (
    <div>
      <h1>Classroom</h1>
      <div className="videoWrapper">
        <video muted autoPlay={true} id="videoElement" controls></video>
      </div>
    </div>
  );
};

export default Classroom;
