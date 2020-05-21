import React from 'react';
import Video from './Video';
import useScreenDrag from '../common/hooks/screenDragHook';
import { useSelector } from 'react-redux';
import { selectVideos } from '../store/screenSlice';

function Screen() {
  const [screenRef] = useScreenDrag();

  const videos = useSelector(selectVideos);

  return (
    <div>
      <div
        style={{
          height: 800,
          width: 450,
          backgroundColor: '#000',
          overflow: 'hidden',
          userSelect: 'none',
        }}
        ref={screenRef}
      >
        {Object.keys(videos).map((id) => (
          <Video key={id} id={id} color="red" />
        ))}
      </div>
    </div>
  );
}

export default Screen;
