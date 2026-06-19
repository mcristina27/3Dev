"use client";

/* model-viewer es un web component de Google — declaramos los tipos para TypeScript */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          alt?: string;
          "auto-rotate"?: boolean | string;
          "camera-controls"?: boolean | string;
          "shadow-intensity"?: string;
          "environment-image"?: string;
          exposure?: string;
          "rotation-per-second"?: string;
          style?: React.CSSProperties;
          loading?: string;
          reveal?: string;
          "disable-zoom"?: boolean | string;
          "interaction-prompt"?: string;
        },
        HTMLElement
      >;
    }
  }
}

interface Model3DViewerProps {
  src: string;
  height?: number;
  autoRotate?: boolean;
  cameraControls?: boolean;
  className?: string;
}

export function Model3DViewer({
  src,
  height = 520,
  autoRotate = false,
  cameraControls = false,
  className = "",
}: Model3DViewerProps) {
  return (
    <div className={`w-full ${className}`} style={{ height }}>
      {/* @ts-expect-error model-viewer web component */}
      <model-viewer
        src={src}
        alt="Modelo 3D interactivo"
        {...(cameraControls ? { "camera-controls": true } : {})}
        {...(autoRotate ? { "auto-rotate": true } : {})}
        interaction-prompt="none"
        shadow-intensity="1"
        exposure="1"
        loading="eager"
        reveal="auto"
        style={{
          width: "100%",
          height: "100%",
          background: "transparent",
          "--progress-bar-color": "#FFE500",
          "--progress-mask": "none",
        } as React.CSSProperties}
      />
    </div>
  );
}

export default Model3DViewer;
