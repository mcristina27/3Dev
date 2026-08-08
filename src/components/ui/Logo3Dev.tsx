"use client";

interface Logo3DevProps {
  size?       : number;
  showText?   : boolean;
  mainColor?  : string;
}

export function Logo3Dev({
  size      = 48,
  showText  = false,
  mainColor = "#0A0A0A",
}: Logo3DevProps) {
  const h = size * (693 / 577);

  return (
    <div className="inline-flex flex-col items-center gap-1.5" style={{ width: size }}>
      <svg
        viewBox="0 0 577 693"
        width={size}
        height={h}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="3Dev logo"
      >
        <path d="M497.638 74.9883C541.268 74.9883 576.637 110.358 576.638 153.988V417.478C576.638 461.108 541.268 496.478 497.638 496.478H79C35.3695 496.478 0 461.108 0 417.478V153.988C0.000213761 110.358 35.3696 74.9883 79 74.9883H497.638ZM160.534 129.291C138.995 129.291 121.534 146.752 121.534 168.291V392.832C121.534 414.371 138.995 431.832 160.534 431.832H489.801C511.34 431.832 528.801 414.371 528.801 392.832V168.291C528.801 146.752 511.34 129.291 489.801 129.291H160.534Z" fill={mainColor}/>
        <rect x="171.957" y="480.963" width="243.067" height="121.534" fill={mainColor}/>
        <rect x="42.666" y="514.578" width="102.14" height="143.513" rx="17" fill={mainColor}/>
        <rect x="426.661" y="514.578" width="149.978" height="94.3825" rx="17" fill={mainColor}/>
        <rect x="240.481" width="104.726" height="94.3825" rx="17" fill={mainColor}/>
        <rect x="171.957" y="586.981" width="104.726" height="106.019" rx="17" fill={mainColor}/>
        <rect x="310.298" y="586.981" width="104.726" height="106.019" rx="17" fill={mainColor}/>
        <rect x="250" y="189" width="76" height="143" rx="17" fill={mainColor}/>
        <rect x="387.873" y="188.765" width="76.2817" height="143.513" rx="17" fill={mainColor}/>
      </svg>

      {showText && (
        <p
          className="font-black tracking-tight leading-none select-none"
          style={{ fontSize: size * 0.28, color: mainColor }}
        >
          3Dev
        </p>
      )}
    </div>
  );
}
