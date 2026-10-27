import { useEffect, type CSSProperties } from 'react';
import type { Character, Screen } from './content';
import { screenLabels } from './content';

// SVG de personajes (página «contenido» del Figma). Se insertan en línea para animar los ojos.
const characters = import.meta.glob<string>('./art/char-*.svg', { query: '?raw', import: 'default', eager: true });
import nube from './art/nube.svg?raw';
import eyes from './art/eyes.svg?raw';

function Svg({ markup, className, style }: { markup: string; className: string; style?: CSSProperties }) {
 return <span className={className} style={style} aria-hidden="true" dangerouslySetInnerHTML={{ __html: markup }} />;
}

export function Moni({ name, className = '', style }: { name: Character | 'nube'; className?: string; style?: CSSProperties }) {
 const markup = name === 'nube' ? nube : characters[`./art/char-${name}.svg`];
 return <Svg markup={markup ?? ''} className={`moni moni-${name} ${className}`} style={style} />;
}

// Rótulos impresos de la tarjeta: son parte del dibujo (no texto de la página), por eso van en SVG.
function CardLabel({ text, width }: { text: string; width: number }) {
 return <svg className="card-label" viewBox={`0 0 ${width} 20`} style={{ width: `${width / 6.66}cqw` }}><text x="0" y="15" fill="#fff" fontSize="16" fontWeight="500" letterSpacing=".3">{text}</text></svg>;
}

// Tarjeta de las piezas de redes: misma composición que la tarjeta débito, en coral y con ojos.
export function CardWithEyes({ className = '' }: { className?: string }) {
 return <span className={`card-eyes ${className}`} aria-hidden="true"><span className="card">
  <span className="card-top"><img src="/product/whiteLogo.svg" alt="" className="card-logo"/><CardLabel text="DÉBITO" width={62}/></span>
  <img src="/product/imgChip.svg" alt="" className="card-chip"/>
  <span className="card-bottom"><CardLabel text="TU PRIMERA TARJETA" width={190}/><img src="/product/imgSinContacto.svg" alt="" className="card-nfc"/></span>
  <span className="card-face" dangerouslySetInnerHTML={{ __html: eyes }}/>
 </span></span>;
}

// Pantalla de la app C (render del Figma a 1,75×). Es una ilustración con texto alternativo, no controles.
export function AppScreen({ screen, className = '', eager = false }: { screen: Screen; className?: string; eager?: boolean }) {
 return <img className={`app-screen ${className}`} src={`/app/screen-${screen}.webp`} width={683} height={1477} loading={eager ? 'eager' : 'lazy'} decoding="async" {...(eager ? { fetchPriority: 'high' as const } : {})} alt={`${screenLabels[screen]}. Vista ilustrativa con datos de demostración.`} />;
}

// Bloques de palabra de las piezas de redes. El texto sigue siendo parte del encabezado real.
export function Word({ children, tone, tilt, index = 0, className = '' }: { children: string; tone: 'yellow' | 'white' | 'pink' | 'red' | 'blue'; tilt: number; index?: number; className?: string }) {
 return <span className={`word word-${tone} ${className}`} style={{ '--tilt': `${tilt}deg`, '--i': index } as CSSProperties}>{children}</span>;
}

// Respuestas de movimiento solo si el sistema no pide reducirlo.
export function prefersMotion() {
 return typeof matchMedia === 'function' && !matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Aparición única al entrar en viewport. Sin JS o con movimiento reducido, todo queda visible.
export function useReveal() {
 useEffect(() => {
  if (!prefersMotion() || typeof IntersectionObserver === 'undefined') return;
  const root = document.documentElement; root.classList.add('motion');
  const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
  const io = new IntersectionObserver(entries => {
   for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  }, { threshold: 0.18 });
  items.forEach(el => { const r = el.getBoundingClientRect(); if (r.top < innerHeight) el.classList.add('is-in'); else io.observe(el); });
  return () => io.disconnect();
 }, []);
}

// La tarjeta del hero sigue el puntero con una inclinación pequeña (solo puntero fino).
export function useTilt(ref: React.RefObject<HTMLElement | null>) {
 useEffect(() => {
  const el = ref.current;
  if (!el || !prefersMotion() || !matchMedia('(pointer: fine)').matches) return;
  let frame = 0;
  const move = (e: PointerEvent) => {
   cancelAnimationFrame(frame);
   frame = requestAnimationFrame(() => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--tx', `${(x * 6).toFixed(2)}deg`); el.style.setProperty('--ty', `${(-y * 6).toFixed(2)}deg`);
    el.style.setProperty('--px', `${(x * 10).toFixed(1)}px`); el.style.setProperty('--py', `${(y * 10).toFixed(1)}px`);
   });
  };
  const leave = () => { cancelAnimationFrame(frame); ['--tx', '--ty', '--px', '--py'].forEach(p => el.style.removeProperty(p)); };
  el.addEventListener('pointermove', move); el.addEventListener('pointerleave', leave);
  return () => { cancelAnimationFrame(frame); el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); };
 }, [ref]);
}
