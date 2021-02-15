import React from 'react';

export default function Classroom() {
  const myNavigator =
    navigator.mediaDevices.getUserMedia ||
    navigator.mediaDevices.webkitGetUserMedia ||
    navigator.mediaDevices.mozGetUserMedia ||
    navigator.mediaDevices.msGetUserMedia;
  console.log(myNavigator);
  return (
    <div>
      <h1>Classroom</h1>
    </div>
  );
}

// let getUserMedia;
// let browserUserMedia =	navigator.webkitGetUserMedia	||
// 						navigator.mozGetUserMedia	||
// 						navigator.getUserMedia;
// if ( !browserUserMedia ) throw 'Your browser doesn\'t support WebRTC';

// getUserMedia = browserUserMedia.bind( navigator );

// getUserMedia(
// 	{
// 		audio: true,
// 		video: true
// 	},t
// 	function( stream ) {
// 		console.log( stream );
// 	},
// 	function( err ) {
// 		console.log( err );
// 	}
// );
