import { useState, useEffect, useRef } from 'react';

const images = [
  {
    src: '/images/Mariachi1.jpeg',
    alt: 'Mariachi 1',
  },
  {
    src: '/images/Mariachi4.jpeg',
    alt: 'Mariachi 4',
  },
  {
    src: '/images/Mariachi5.jpeg',
    alt: 'Mariachi 5',
  },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef();

  // Cambia la imagen automáticamente cada 3 segundos
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const prev = () => setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const next = () => setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  // Slide effect
  const [prevIndex, setPrevIndex] = useState(current);
  const [direction, setDirection] = useState('right');

  useEffect(() => {
    if (current > prevIndex) setDirection('right');
    else if (current < prevIndex) setDirection('left');
    setPrevIndex(current);
    // eslint-disable-next-line
  }, [current]);

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-gold-500/20 bg-white w-full flex items-center justify-center h-72 sm:h-80 md:h-96">
        <div className="relative w-full h-full overflow-hidden">
          {images.map((img, idx) => (
            <img
              key={img.alt}
              src={img.src}
              alt={img.alt}
              className={`absolute top-0 left-0 w-full h-full object-contain transition-transform duration-700 ease-in-out
                ${idx === current
                  ? 'z-10 opacity-100 ' + (direction === 'right' ? 'translate-x-0' : 'translate-x-0')
                  : 'z-0 opacity-0 ' + (idx < current || (current === 0 && idx === images.length - 1)
                      ? '-translate-x-full'
                      : 'translate-x-full')
                }
              `}
              style={{
                pointerEvents: idx === current ? 'auto' : 'none',
                transitionProperty: 'transform, opacity',
              }}
              loading="lazy"
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {images.map((img, idx) => (
          <button
            key={img.alt}
            className={`w-3 h-3 rounded-full border-2 ${current === idx ? 'bg-gold-500 border-gold-700' : 'bg-cream-200 border-gold-300'}`}
            onClick={() => setCurrent(idx)}
            aria-label={`Ver imagen ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
