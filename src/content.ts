import type { Variant } from './attribution';
export const WAITLIST_LABEL = 'Únete a la lista de espera';
export type Preview = 'limits' | 'purchases' | 'savings';
type Benefit = { title: string; body: string; preview: Preview; color: string };
export const variants = {
 a: {
  title: 'Su primera tarjeta débito.\nCon tu acompañamiento.',
  description: 'Conoce cómo tu hijo usa su dinero y acuerda límites de gasto desde tu app.',
  principle: 'Su autonomía. Tu acompañamiento.', principles: 'Límites claros · Compras visibles · Metas compartidas',
  benefitsTitle: 'Así acompañas su dinero.', benefitsDescription: 'Tres herramientas para darle autonomía con acuerdos claros.',
  benefits: [
   { title:'Acuerda cuánto puede gastar', body:'Define un límite con tu hijo y consúltalo desde tu app.', preview:'limits', color:'soft' },
   { title:'Conoce sus compras', body:'Revisa sus movimientos para acompañar sus decisiones.', preview:'purchases', color:'pink' },
   { title:'Acompaña sus metas', body:'Ayúdale a separar dinero y ver cómo avanza hacia lo que quiere.', preview:'savings', color:'yellow' }
  ] as Benefit[],
  demoTitle:'Sus compras a la vista.\nTu acompañamiento, cerca.',
  demoDescription:'Consulta cuánto ha gastado y qué ha comprado. Usa esa información para conversar con tu hijo y ajustar sus acuerdos.',
  steps:['Acuerden un límite de gasto.','Revisen juntos sus movimientos.','Acompaña su próxima decisión.'],
  registration:'Da el primer paso para acompañar las compras de tu hijo con límites claros.',
  appAnswer:'La propuesta incluye definir límites de gasto, consultar movimientos y acompañar metas de ahorro. Las pantallas muestran cómo funcionarían estas herramientas.'
 },
 b: {
  title:'Su primera tarjeta débito.\nPara aprender contigo.',
  description:'Ayuda a tu hijo a decidir qué gastar y qué ahorrar, con una tarjeta y una app para aprender juntos.',
  principle:'Sus primeras decisiones. Tú le acompañas.', principles:'Decidir · Ahorrar · Aprender contigo',
  benefitsTitle:'Así aprende a manejar su dinero.', benefitsDescription:'Pequeñas decisiones de hoy que le ayudan a construir hábitos.',
  benefits:[
   { title:'Aprende a ahorrar con una meta', body:'Ayúdale a elegir lo que quiere y a separar dinero para conseguirlo.', preview:'savings', color:'yellow' },
   { title:'Entiende en qué gasta', body:'Revisen sus compras juntos y conversen sobre sus decisiones.', preview:'purchases', color:'pink' },
   { title:'Practica cómo organizarse', body:'Acuerden cuánto puede gastar para que aprenda a planear.', preview:'limits', color:'soft' }
  ] as Benefit[],
  demoTitle:'De “lo quiero”\na “lo estoy logrando”.',
  demoDescription:'Una meta hace visible el progreso. Acompaña a tu hijo mientras decide cuánto ahorrar y revisa cómo usa su dinero.',
  steps:['Elijan una meta que le motive.','Decidan cuánto apartar.','Celebren cada avance.'],
  registration:'Da el primer paso para ayudar a tu hijo a aprender a manejar su dinero.',
  appAnswer:'La propuesta incluye acompañar metas de ahorro, revisar compras y acordar límites. Estas herramientas buscan ayudar a tu hijo a practicar decisiones sobre su dinero.'
 }
};
export const questions = (variant: Variant) => [
 ['¿La tarjeta tendrá cuota de manejo?','Las tarifas de la tarjeta y la app aún no están definidas. Unirte a la lista de espera es gratis y no implica contratar el producto.'],
 ['¿Cómo recibiré la tarjeta?','La entrega, la cobertura y los posibles costos de envío se confirmarán antes del piloto. Unirte a la lista de espera todavía no solicita una tarjeta.'],
 ['¿Qué podré hacer desde la app?',variants[variant].appAnswer],
 ['¿Para quién está pensada Moni?','Para padres, madres y cuidadores de niños y niñas de 8 a 14 años. La investigación inicial se centra en familias de Cali.'],
 ['¿Qué pasa al unirme a la lista de espera?','Podremos contactarte con novedades de Moni y del futuro piloto. El registro no abre una cuenta, no tiene costo y no garantiza un cupo.']
];
