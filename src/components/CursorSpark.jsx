import { useEffect, useState } from 'react';
import './CursorSpark.css';

const CursorSpark = () => {
  const [position, setPosition] = useState({ x: -100, y: -100, visible: false });

  useEffect(() => {
    const move = (event) => {
      setPosition({ x: event.clientX, y: event.clientY, visible: true });
    };
    const hide = () => setPosition((current) => ({ ...current, visible: false }));

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('mouseleave', hide);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('mouseleave', hide);
    };
  }, []);

  return (
    <span
      className={`cursor-spark ${position.visible ? 'is-visible' : ''}`}
      style={{ transform: `translate3d(${position.x + 11}px, ${position.y + 13}px, 0)` }}
      aria-hidden="true"
    />
  );
};

export default CursorSpark;
