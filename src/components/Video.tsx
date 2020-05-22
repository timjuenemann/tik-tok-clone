import React, { useState, useEffect } from 'react';
import { ReactComponent as HeartFilled } from '../assets/svg/heart_filled.svg';
import { useSelector, useDispatch } from 'react-redux';
import { selectVideos, likeVideo } from '../store/screenSlice';
import VideoDetails from './VideoDetails';
import classes from './Video.module.css';
import VideoActions from './VideoActions';
import { ReactComponent as Play } from '../assets/svg/play.svg';

enum VideoState {
  play,
  pause,
}

interface OwnProps {
  id: string;
  active: boolean;
}

export default function Video({ id, active }: OwnProps) {
  // get video by id
  const videos = useSelector(selectVideos);
  const item = videos[id];

  const dispatch = useDispatch();

  // get video node
  const [videoNode, setVideoNode] = useState<HTMLVideoElement | null>(null);
  const videoRef = (node: any) => {
    if (node !== null) {
      setVideoNode(node);
    }
  };

  // video state logic (play/pause)
  const [videoState, setVideoState] = useState<VideoState>(VideoState.pause);
  useEffect(() => {
    if (videoNode) {
      if (videoState === VideoState.pause || !active) {
        videoNode.pause();
      } else {
        videoNode.play();
      }
    }
  }, [active, videoNode, videoState]);

  // play video if its currently active
  useEffect(() => {
    if (active) {
      setVideoState(VideoState.play);
    } else {
      setVideoState(VideoState.pause);
    }
  }, [active]);

  // pause on click
  const singleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setVideoState(
      videoState === VideoState.play ? VideoState.pause : VideoState.play
    );
  };

  // set doubleClick position
  const [dblClickPos, setDblClickPos] = useState<{
    x: number | null;
    y: number | null;
  }>({
    x: null,
    y: null,
  });

  // show big heart animation on doubleCLick
  const doubleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    dispatch(likeVideo(id));
    setDblClickPos({
      x: event.nativeEvent.clientX,
      y: event.nativeEvent.clientY,
    });
    setTimeout(() => {
      setDblClickPos({
        x: null,
        y: null,
      });
    }, 400);
  };

  // handle single and double click
  const [clickTimer, setClickTimer] = useState<any>(0);
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // normal click
    if (event.detail === 1) {
      setClickTimer(
        setTimeout(() => {
          singleClick(event);
        }, 200)
      );
    }
    // double click
    else if (event.detail === 2) {
      clearTimeout(clickTimer);
      doubleClick(event);
    }
  };

  return (
    <div className={classes.Video} onClick={handleClick}>
      {/* heart that pops up on dblClick */}
      <HeartFilled
        fill={'#fff'}
        className={`dblClickHeart ${
          !dblClickPos.x && !dblClickPos.y ? '' : 'is-active'
        }`}
        style={{
          position: 'absolute',
          top: dblClickPos.y ?? 0,
          left: dblClickPos.x ?? 0,
          zIndex: 100,
        }}
      />
      <div className={classes.videoContainer}>
        {/* video element */}
        <video ref={videoRef} className={classes.videoElement} loop>
          <source
            src={process.env.PUBLIC_URL + item.videoURL}
            type="video/mp4"
          />
          Your browser does not support HTML video.
        </video>
        {/* show playButton if video is paused */}
        {videoState === VideoState.pause && active ? (
          <div className={classes.playButtonContainer}>
            <Play height={80} width={80} fill={'#fff'} />
          </div>
        ) : null}
        {/* Video details and actions */}
        <div className={classes.gridContainer}>
          <div className={classes.grid}>
            <VideoDetails item={item} />
            <VideoActions item={item} />
          </div>
        </div>
      </div>
    </div>
  );
}
