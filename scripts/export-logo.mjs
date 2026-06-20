import sharp from "sharp";
import { writeFileSync } from "fs";

const SIZE = 1080;
const LOGO_H = 600;
const LOGO_W = Math.round(600 * (80 / 108));
const X = Math.round((SIZE - LOGO_W) / 2);
const Y = Math.round((SIZE - LOGO_H) / 2);

const mainColor   = "#6E2E34";
const accentColor = "#5E7B9B";

// SVG 1080×1080 con fondo blanco y logo centrado
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <!-- Fondo blanco -->
  <rect width="${SIZE}" height="${SIZE}" fill="white"/>

  <!-- Logo centrado -->
  <g transform="translate(${X}, ${Y}) scale(${LOGO_W / 80}, ${LOGO_H / 108})">
    <!-- ANTENA -->
    <rect x="32" y="0" width="16" height="16" rx="4" fill="${mainColor}"/>
    <!-- CABEZA -->
    <rect x="6" y="14" width="68" height="60" rx="16" fill="${mainColor}"/>
    <!-- PANEL CARA -->
    <rect x="14" y="21" width="52" height="46" rx="11" fill="white"/>
    <!-- PANEL ACENTO -->
    <rect x="14" y="44" width="30" height="23" rx="9" fill="${accentColor}"/>
    <!-- OJO IZQUIERDO -->
    <rect x="22" y="27" width="13" height="18" rx="5" fill="${mainColor}"/>
    <!-- OJO DERECHO -->
    <rect x="45" y="27" width="13" height="18" rx="5" fill="${mainColor}"/>
    <!-- CUERPO -->
    <rect x="24" y="76" width="32" height="24" rx="8" fill="${mainColor}"/>
    <!-- PIERNA IZQUIERDA -->
    <rect x="24" y="96" width="12" height="16" rx="5" fill="${mainColor}"/>
    <!-- PIERNA DERECHA -->
    <rect x="44" y="96" width="12" height="16" rx="5" fill="${mainColor}"/>
    <!-- BRAZO IZQUIERDO -->
    <rect x="8"  y="80" width="14" height="10" rx="4" fill="${mainColor}"/>
    <!-- BRAZO DERECHO -->
    <rect x="58" y="80" width="14" height="10" rx="4" fill="${mainColor}"/>
  </g>
</svg>`;

const outPath = "/Users/cristinaruelas/Downloads/logo-3dev.png";

await sharp(Buffer.from(svg))
  .png()
  .toFile(outPath);

console.log(`✅ PNG exportado en: ${outPath}`);
