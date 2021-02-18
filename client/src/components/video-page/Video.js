import React from 'react';
import { useState } from 'react';
import useVideo from './useVideo';
import './Video.css';
import WidgetsIcon from '@material-ui/icons/Widgets';
import styled from 'styled-components';
import MicIcon from '@material-ui/icons/Mic';
import StopIcon from '@material-ui/icons/Stop';

const Video = () => {
  const [incomingVideoId, setIncomingVideoId] = useState(null);

  const {
    start,
    connect,
    myVideoId,
    myVideoRef,
    incomingVideoRef,
  } = useVideo();

  const WidgetButton = styled.button`
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

    &:hover {
      transform: scale(1.2);
      cursor: pointer;
    }
  `;

  const ControlContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 10vw;
    position: absolute;
    top: 90%;
    left: 45%;
  `;
  const MicButton = styled.button`
    display: flex;
    justify-content: center;
    background-color: white;
    box-shadow: 0px 0px 5px 2px grey;
    border-radius: 100%;
    border: none;
    width: 3vw;
    height: 3vw;
    opacity: 0.8;

    &:hover {
      transform: scale(1.2);
      cursor: pointer;
    }
  `;

  const RecordButton = styled.button`
    display: flex;
    justify-content: center;
    background-color: rgb(177, 27, 27);
    box-shadow: 0px 0px 5px 2px grey;
    border-radius: 100%;
    border: none;
    width: 3vw;
    height: 3vw;
    opacity: 0.8;

    &:hover {
      transform: scale(1.2);
      cursor: pointer;
    }
  `;

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
      <WidgetButton>
        <WidgetsIcon
          style={{
            color: 'rgb(39, 25, 90)',
            alignSelf: 'center',
          }}
        />
      </WidgetButton>
      <ControlContainer>
        <MicButton>
          <MicIcon
            style={{
              color: 'rgb(39, 25, 90)',
              alignSelf: 'center',
            }}
          />
        </MicButton>
        <RecordButton>
          <StopIcon
            style={{
              color: 'rgb(39, 25, 90)',
              alignSelf: 'center',
            }}
          />
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
