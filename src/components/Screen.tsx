import React, { useState, useEffect, useRef } from 'react';
import Video from './Video';

function Screen() {
  // screen div element reference
  const screenRef = useRef<HTMLDivElement>(null);

  // screen height
  const screenHeight = screenRef.current
    ? screenRef.current.getBoundingClientRect().height
    : 0;

  // defines how hard it is to drag to the next video
  const dragResistance = screenHeight / 5;

  // indicates wheather the screen is currently dragged by the user
  const [isDragging, setIsDragging] = useState(false);

  // listen for mouseUp in whole window scope
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  });

  // drag distance since drag started
  const [dragDistance, setDragDistance] = useState(0);

  // updates the drag distance if `isDragging` is true
  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.persist();
    if (isDragging) {
      setDragDistance((d) => d + event.movementY);
    }
  };

  // current scroll position
  const [scrollPos, setScrollPos] = useState(0);

  // check if scrollPos is within range
  const scrollPosCheck = (num: number) => {
    if (screenRef.current) {
      if (num <= 0) {
        return 0;
      } else if (num >= screenRef.current.scrollHeight) {
        return screenRef.current.scrollHeight;
      }
    }
    return num;
  };

  // resets the drag distance when `isDragging` returns to false
  useEffect(() => {
    if (!isDragging) {
      if (-dragDistance > dragResistance) {
        setScrollPos((scrollPos) => scrollPosCheck(scrollPos + screenHeight));
      } else if (dragDistance > dragResistance) {
        setScrollPos((scrollPos) => scrollPosCheck(scrollPos - screenHeight));
      }
      setDragDistance(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);

  // sets the screen scrollPosition in relation to the drag distance
  useEffect(() => {
    if (screenRef.current) {
      if (isDragging) {
        screenRef.current.scrollTo({ top: scrollPos - dragDistance });
      } else {
        screenRef.current.scrollTo({ top: scrollPos, behavior: 'smooth' });
      }
    }
  }, [dragDistance, isDragging, scrollPos]);

  return (
    <div
      style={{
        height: 800,
        width: 450,
        backgroundColor: '#000',
        overflow: 'hidden',
      }}
      ref={screenRef}
      onMouseDown={() => setIsDragging(true)}
      onMouseMoveCapture={handleMouseMove}
    >
      <Video text="1" />
      <Video text="2" />
      <Video text="3" />
      <Video text="4" />
    </div>
  );
}

export default Screen;
