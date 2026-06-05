'use client';

import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';

export const BackgroundGradientAnimation = ({
  // Paleta 3Dev — verdes naturales (valores en RGB)
  firstColor  = '108, 153, 104',   // #6C9968 — verde suave
  secondColor = '67, 117, 64',     // #437540 — verde medio
  thirdColor  = '39, 70, 51',      // #274633 — verde oscuro
  fourthColor = '173, 190, 146',   // #ADBE92 — sage claro
  fifthColor  = '108, 153, 104',   // #6C9968 — verde suave
  pointerColor = '67, 117, 64',    // #437540 — verde medio
  size          = '60%',
  blendingValue = 'hard-light',
  children,
  className,
  interactive       = true,
  containerClassName,
}: {
  firstColor?:        string;
  secondColor?:       string;
  thirdColor?:        string;
  fourthColor?:       string;
  fifthColor?:        string;
  pointerColor?:      string;
  size?:              string;
  blendingValue?:     string;
  children?:          React.ReactNode;
  className?:         string;
  interactive?:       boolean;
  containerClassName?: string;
}) => {
  const interactiveRef = useRef<HTMLDivElement>(null);

  const curXRef = useRef(0);
  const curYRef = useRef(0);
  const tgXRef  = useRef(0);
  const tgYRef  = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  const [isSafari, setIsSafari] = useState(false);

  // Fondo champagne claro — paleta 3Dev
  const gradientBackgroundStart = '#FDF5EE';
  const gradientBackgroundEnd   = '#FAF0E6';

  // Variables CSS
  useEffect(() => {
    document.body.style.setProperty('--gradient-background-start', gradientBackgroundStart);
    document.body.style.setProperty('--gradient-background-end',   gradientBackgroundEnd);
    document.body.style.setProperty('--first-color',    firstColor);
    document.body.style.setProperty('--second-color',   secondColor);
    document.body.style.setProperty('--third-color',    thirdColor);
    document.body.style.setProperty('--fourth-color',   fourthColor);
    document.body.style.setProperty('--fifth-color',    fifthColor);
    document.body.style.setProperty('--pointer-color',  pointerColor);
    document.body.style.setProperty('--size',           size);
    document.body.style.setProperty('--blending-value', blendingValue);
  }, [firstColor, secondColor, thirdColor, fourthColor, fifthColor, pointerColor, size, blendingValue]);

  // Safari detection
  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  // Loop de animación del puntero
  useEffect(() => {
    if (!interactive) return;

    function animateMovement() {
      if (!interactiveRef.current) {
        animationFrameRef.current = requestAnimationFrame(animateMovement);
        return;
      }
      curXRef.current += (tgXRef.current - curXRef.current) / 20;
      curYRef.current += (tgYRef.current - curYRef.current) / 20;
      interactiveRef.current.style.transform =
        `translate(${Math.round(curXRef.current)}px, ${Math.round(curYRef.current)}px)`;
      animationFrameRef.current = requestAnimationFrame(animateMovement);
    }

    animationFrameRef.current = requestAnimationFrame(animateMovement);
    return () => {
      if (animationFrameRef.current !== null)
        cancelAnimationFrame(animationFrameRef.current);
    };
  }, [interactive]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!interactiveRef.current) return;
    const rect = interactiveRef.current.getBoundingClientRect();
    tgXRef.current = event.clientX - rect.left;
    tgYRef.current = event.clientY - rect.top;
  };

  return (
    <div
      className={classNames(
        'h-screen w-screen relative overflow-hidden top-0 left-0',
        'bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]',
        containerClassName,
      )}
    >
      {/* Filtro SVG para el efecto goo */}
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Contenido hijo (el hero content) */}
      <div className={classNames('relative z-10', className)}>{children}</div>

      {/* Gradientes animados */}
      <div
        className={classNames(
          'gradients-container h-full w-full blur-lg absolute inset-0',
          isSafari ? 'blur-2xl' : '[filter:url(#blurMe)_blur(40px)]',
        )}
      >
        {/* Orbe 1 */}
        <div className={classNames(
          'absolute [background:radial-gradient(circle_at_center,_rgba(var(--first-color),_0.9)_0,_rgba(var(--first-color),_0)_50%)_no-repeat]',
          '[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)]',
          'top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]',
          '[transform-origin:center_center] animate-first opacity-100',
        )} />

        {/* Orbe 2 */}
        <div className={classNames(
          'absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat]',
          '[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)]',
          'top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]',
          '[transform-origin:calc(50%-400px)] animate-second opacity-100',
        )} />

        {/* Orbe 3 */}
        <div className={classNames(
          'absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]',
          '[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)]',
          'top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]',
          '[transform-origin:calc(50%+400px)] animate-third opacity-100',
        )} />

        {/* Orbe 4 */}
        <div className={classNames(
          'absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat]',
          '[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)]',
          'top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]',
          '[transform-origin:calc(50%-200px)] animate-fourth opacity-70',
        )} />

        {/* Orbe 5 */}
        <div className={classNames(
          'absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat]',
          '[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)]',
          'top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]',
          '[transform-origin:calc(50%-800px)_calc(50%+800px)] animate-fifth opacity-100',
        )} />

        {/* Orbe interactivo (sigue al mouse) */}
        {interactive && (
          <div
            ref={interactiveRef}
            onMouseMove={handleMouseMove}
            className={classNames(
              'absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]',
              '[mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2',
              'opacity-70',
            )}
          />
        )}
      </div>
    </div>
  );
};
