import React, { useEffect } from 'react';
import Video from './Video';
import useScreenDrag from '../common/hooks/screenDragHook';
import { useSelector, useDispatch } from 'react-redux';
import {
  setActiveView,
  selectSortedVideoIds,
  selectActiveVideoId,
} from '../store/screenSlice';

function Screen() {
  const [screenRef, activeView] = useScreenDrag();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveView(activeView));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeView]);

  const sortedVideoIds = useSelector(selectSortedVideoIds);
  const activeVideoId = useSelector(selectActiveVideoId);

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
        {sortedVideoIds.map((id) => (
          <Video key={id} id={id} active={id === activeVideoId} />
        ))}
      </div>
    </div>
  );
}

export default Screen;
