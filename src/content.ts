import type { Variant } from './attribution';
export const WAITLIST_LABEL = 'Únete a la lista de espera';
export const KICKER = 'Su primera tarjeta débito.';

// Pantallas de la app C (Figma «Moni App · Versión C · Equilibrio»). Son ilustraciones, no controles.
export type Screen = 'c03' | 'c05' | 'c06' | 'c07' | 'c10' | 'c12' | 'c13' | 'c14';
export type Character = 'moneda' | 'pentagono' | 'flor' | 'luna' | 'cuadro';
export const screenLabels: Record<Screen, string> = {
 c03: 'Inicio de la app del niño con su saldo disponible y una meta de ahorro',
 c05: 'Vista «Mi tarjeta» del niño con su límite semanal y su último movimiento',
 c06: 'Pausa antes de comprar: la app pregunta si lo necesita o lo quiere',
 c07: 'Vista «Mis metas» con el avance de una meta de ahorro',
 c10: 'Pantalla de meta cumplida con Moni celebrando',
 c12: 'Resumen familiar con lo gastado en la semana frente al límite acordado',
 c13: 'Solicitudes del niño para que el adulto las apruebe o responda',
 c14: 'Controles de la tarjeta para el adulto: límite semanal y bloqueos'
};

type Benefit = { title: string; body: string; screen: Screen; tone: 'blue' | 'pink' | 'tint-blue' | 'tint-pink' | 'tint-yellow'; character?: Character };
type Content = {
 lead: string; key: string; description: string; heroScreen: Screen;
 principle: string; principles: string[];
 benefitsTitle: string; benefitsDescription: string; benefits: Benefit[];
 demoTitle: string; demoDescription: string; steps: string[]; demoScreens: [Screen, Screen];
 registration: string; appAnswer: string;
};

export const variants: Record<Variant, Content> = {
 a: {
  lead: 'Tú acuerdas', key: 'sus límites.',
  description: 'Conoce cómo tu hijo usa su dinero y acuerda límites de gasto desde tu app.',
  heroScreen: 'c14',
  principle: 'Su autonomía. Tu acompañamiento.', principles: ['Límites claros', 'Compras visibles', 'Metas compartidas'],
  benefitsTitle: 'Así acompañas su dinero.', benefitsDescription: 'Tres herramientas para darle autonomía con acuerdos claros.',
  benefits: [
   { title: 'Acuerda cuánto puede gastar', body: 'Define un límite con tu hijo y consúltalo desde tu app.', screen: 'c05', tone: 'blue', character: 'moneda' },
   { title: 'Conoce sus compras', body: 'Revisa sus movimientos para acompañar sus decisiones.', screen: 'c12', tone: 'tint-blue' },
   { title: 'Acompaña sus metas', body: 'Ayúdale a separar dinero y ver cómo avanza hacia lo que quiere.', screen: 'c07', tone: 'tint-pink', character: 'flor' }
  ],
  demoTitle: 'Sus compras a la vista.\nTu acompañamiento, cerca.',
  demoDescription: 'Consulta cuánto ha gastado y qué ha comprado. Usa esa información para conversar con tu hijo y ajustar sus acuerdos.',
  steps: ['Acuerden un límite de gasto.', 'Revisen juntos sus movimientos.', 'Acompaña su próxima decisión.'],
  demoScreens: ['c13', 'c06'],
  registration: 'Da el primer paso para acompañar las compras de tu hijo con límites claros.',
  appAnswer: 'La propuesta incluye definir límites de gasto, consultar movimientos y acompañar metas de ahorro. Las pantallas muestran cómo funcionarían estas herramientas.'
 },
 b: {
  lead: 'Aprende a', key: 'ahorrar contigo.',
  description: 'Ayuda a tu hijo a decidir qué gastar y qué ahorrar, con una tarjeta y una app para aprender juntos.',
  heroScreen: 'c07',
  principle: 'Sus primeras decisiones. Tú le acompañas.', principles: ['Decidir', 'Ahorrar', 'Aprender contigo'],
  benefitsTitle: 'Así aprende a manejar su dinero.', benefitsDescription: 'Pequeñas decisiones de hoy que le ayudan a construir hábitos.',
  benefits: [
   { title: 'Aprende a ahorrar con una meta', body: 'Ayúdale a elegir lo que quiere y a separar dinero para conseguirlo.', screen: 'c03', tone: 'pink', character: 'moneda' },
   { title: 'Entiende en qué gasta', body: 'Revisen sus compras juntos y conversen sobre sus decisiones.', screen: 'c12', tone: 'tint-blue' },
   { title: 'Practica cómo organizarse', body: 'Acuerden cuánto puede gastar para que aprenda a planear.', screen: 'c14', tone: 'tint-yellow', character: 'pentagono' }
  ],
  demoTitle: 'De “lo quiero”\na “lo estoy logrando”.',
  demoDescription: 'Una meta hace visible el progreso. Acompaña a tu hijo mientras decide cuánto ahorrar y revisa cómo usa su dinero.',
  steps: ['Elijan una meta que le motive.', 'Decidan cuánto apartar.', 'Celebren cada avance.'],
  demoScreens: ['c06', 'c10'],
  registration: 'Da el primer paso para ayudar a tu hijo a aprender a manejar su dinero.',
  appAnswer: 'La propuesta incluye acompañar metas de ahorro, revisar compras y acordar límites. Estas herramientas buscan ayudar a tu hijo a practicar decisiones sobre su dinero.'
 }
};
export const questions = (variant: Variant) => [
 ['¿La tarjeta tendrá cuota de manejo?', 'Las tarifas de la tarjeta y la app aún no están definidas. Unirte a la lista de espera es gratis y no implica contratar el producto.'],
 ['¿Cómo recibiré la tarjeta?', 'La entrega, la cobertura y los posibles costos de envío se confirmarán antes del piloto. Unirte a la lista de espera todavía no solicita una tarjeta.'],
 ['¿Qué podré hacer desde la app?', variants[variant].appAnswer],
 ['¿Para quién está pensada Moni?', 'Para padres, madres y cuidadores de niños y niñas de 8 a 14 años. La investigación inicial se centra en familias de Cali.'],
 ['¿Qué pasa al unirme a la lista de espera?', 'Podremos contactarte con novedades de Moni y del futuro piloto. El registro no abre una cuenta, no tiene costo y no garantiza un cupo.']
];
