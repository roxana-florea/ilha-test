import React from 'react';
import { useState } from 'react';
import useVideo from './useVideo';
import './Video.css';
import WidgetsIcon from '@material-ui/icons/Widgets';
import styled from 'styled-components';
import MicIcon from '@material-ui/icons/Mic';
import StopIcon from '@material-ui/icons/Stop';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';




const Video = () => {
  const [incomingVideoId, setIncomingVideoId] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [popup, setPopUp] = useState(false);

  const {
    start,
    connect,
    myVideoId,
    myVideoRef,
    incomingVideoRef,
    startRecording,
    stopRecording,
  } = useVideo();


  const WidgetButton = styled.button`
  @media (max-width: 1920px){
    display: flex;
    justify-content: center;
    position: absolute;
    top: 90%;
    left: 95%;
    color: grey;
    background-color: white;
    box-shadow: 0px 0px 5px 2px grey;
    border-radius: 100%;
    border: none;
    width: 3vw;
    height: 3vw;
    opacity: 0.8;
    outline: none;
  }
  @media (max-width: 1279px){
    left: 90%;
    width: 5vw;
    height: 5vw;
  }
  @media(max-width:811px){
    left: 90%;
    width: 8vw;
    height: 8vw;
  }
    &:hover {
      transform: scale(1.2);
      cursor: pointer;
    }
  `;

  const ControlContainer = styled.div`
  @media (max-width: 1920px){
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 10vw;
    position: absolute;
    top: 90%;
    left: 45%;
  }
  @media (max-width: 1279px){
    width: 15vw;
  }
  @media(max-width:811px){
    width: 20vw;
  }

  `;
  const MicButton = styled.button`
  @media (max-width: 1920px){
    display: flex;
    justify-content: center;
    background-color: white;
    box-shadow: 0px 0px 5px 2px grey;
    border-radius: 100%;
    border: none;
    width: 3vw;
    height: 3vw;
    opacity: 0.8;
    outline: none;
  }
  @media (max-width: 1279px){
    left: 90%;
    width: 5vw;
    height: 5vw;
  }
  @media(max-width:811px){
    left: 90%;
    width: 8vw;
    height: 8vw;
  }
    &:hover {
      transform: scale(1.2);
      cursor: pointer;
    }
  `;

  const RecordButton = styled.button`
  @media (max-width: 1920px){
    display: flex;
    justify-content: center;
    background-color: rgb(177, 27, 27);
    box-shadow: 0px 0px 5px 2px grey;
    border-radius: 100%;
    border: none;
    width: 3vw;
    height: 3vw;
    opacity: 0.8;
    outline: none;
  }
  @media (max-width: 1279px){
    left: 90%;
    width: 5vw;
    height: 5vw;
  }
  @media(max-width:811px){
    left: 90%;
    width: 8vw;
    height: 8vw;
  }
    &:hover {
      transform: scale(1.2);
      cursor: pointer;
    }
  `;

  const toggleRecord = () => {
    if (!isRecording) {
      startRecording();
      setIsRecording(true);
    } else {
      stopRecording();
      setIsRecording(false);
    }
  };
  
  const WidegetPopUp = styled.div`
  @keyframes fadeInX{
    from {width:0vw}
    to {width: 20vw}
  }
  @keyframes fadeInY{
    from {height: 0vh}
    to {height: 40vh}
  }
    position: absolute;
    display: flex;
    justify-content: center;
    text-shadow: 0px 0px 10px black;
    color: white;
    top: 3%;
    right: 1%;
    width: 20vw;
    height: 40vh;
    border-radius: 15px;
    box-shadow: 0px 0px 5px 5px grey;
    animation-name: fadeInX, fadecaInY;
    animation-duration: 0.2s;
`
const test4 = () =>{
  if (popup) {
    setPopUp(false)
  }
  else {
    setPopUp(true)
  }
}

  return (
    <div>
      <video
        muted
        autoPlay={true}
        ref={myVideoRef}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: '-2',
          overflowX: 'hidden',
          overflowY: 'hidden',
          webkitTransform: 'rotateY(180deg)',
          mozTransform: 'rotateY(180deg)',
        }}
      ></video>

      <div style={{ position: 'absolute', top: '87%' }}>
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
        {popup ? (
          <WidegetPopUp>
            <p>PLANS</p>
          </WidegetPopUp>
        ) : (
          <WidegetPopUp style={{display: 'none'}}></WidegetPopUp>
          )
        }
      <WidgetButton onClick={test4}>
        <WidgetsIcon
          style={{
            color: 'rgb(39, 25, 90)',
            alignSelf: 'center',
            width: '70%',
            height: '70%',
          }}
        />
      </WidgetButton>
      <ControlContainer>
        <MicButton>
          <MicIcon
            style={{
              color: 'rgb(39, 25, 90)',
              alignSelf: 'center',
              width: '70%',
              height: '70%'
            }}
          />
        </MicButton>
        <RecordButton onClick={toggleRecord}>
          {isRecording ? (
            <StopIcon
              style={{
                color: 'rgb(39, 25, 90)',
                alignSelf: 'center',
                width: '70%',
                height: '70%'
              }}
            />
          ) : (
            <FiberManualRecordIcon
              style={{
                color: 'rgb(39, 25, 90)',
                alignSelf: 'center',
                width: '70%',
                height: '70%'
              }}
            />
          )}
        </RecordButton>
      </ControlContainer>
      <div>
        <video
          muted
          autoPlay={true}
          ref={incomingVideoRef}
          style={{
            position: 'absolute',
            top: '3%',
            left: '1%',
            width: '20%',
            height: 'auto',
            objectFit: 'contain',
            zIndex: '-1',
            borderRadius: '15px',
            boxShadow: '0px 0px 5px 5px grey',
            webkitTransform: 'rotateY(180deg)',
            mozTransform: 'rotateY(180deg)',
          }}
        ></video>
      </div>
    </div>
  );
};

export default Video;
