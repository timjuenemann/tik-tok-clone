import { useCallback, useEffect, useState } from 'react';

export default function useScreenDrag() {
  // handle node (ref) init
  const [node, setNode] = useState<HTMLElement | null>(null);
  const ref = useCallback((refNode) => {
    if (refNode) {
      setNode(refNode);
    }
  }, []);

  // indicates wheather the screen is currently dragged by the user
  const [isDragging, setIsDragging] = useState(false);

  // set `isDragging` to true as soon as a mousedown event is registered
  useEffect(() => {
    const handleMouseDown = () => setIsDragging(true);

    if (node) {
      node.addEventListener('mousedown', handleMouseDown);
      return () => node.removeEventListener('mousedown', handleMouseDown);
    }
  }, [node]);

  // set `isDragging` to true as soon as a mouseup event is registered in the window scope
  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);

    if (node) {
      window.addEventListener('mouseup', handleMouseUp);
      return () => window.removeEventListener('mouseup', handleMouseUp);
    }
  });

  // defines the drag distance since the drag started
  const [dragDistance, setDragDistance] = useState(0);

  // set drag distance from mousemove
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging) {
        setDragDistance((d) => d + event.movementY);
      }
    };

    if (node) {
      node.addEventListener('mousemove', handleMouseMove);
      return () => node.removeEventListener('mousemove', handleMouseMove);
    }
  });

  // set screen height
  const [screenHeight, setScreenHeight] = useState(0);
  useEffect(() => {
    if (node) {
      setScreenHeight(node.getBoundingClientRect().height);
    }
  }, [node]);

  // defines how hard it is to drag to the next video
  const dragResistance = screenHeight / 5;

  // current scroll position
  const [scrollPos, setScrollPos] = useState(0);

  // check if scrollPos is within range
  const scrollPosCheck = (num: number) => {
    if (node) {
      if (num <= 0) {
        return 0;
      } else if (num >= node.scrollHeight - screenHeight) {
        return node.scrollHeight - screenHeight;
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
    if (node) {
      if (isDragging) {
        node.scrollTo({ top: scrollPos - dragDistance });
      } else {
        node.scrollTo({ top: scrollPos, behavior: 'smooth' });
      }
    }
  }, [dragDistance, isDragging, node, scrollPos]);

  return [ref] as const;
}
