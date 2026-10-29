import { useEffect, useRef, useState } from 'react';
import { applyChoices, measurement, savedChoices, saveChoices, watchChoices } from './external-measurement';
import { DENIED, type Choices } from './measurement-policy';
import './measurement.css';

export function MeasurementConsent() {
  const [saved, setSaved] = useState(savedChoices);
  const [draft, setDraft] = useState<Choices>(saved || DENIED);
  const [status, setStatus] = useState('');
  const [details, setDetails] = useState(false);
  const [opened, setOpened] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  useEffect(() => {
    applyChoices(savedChoices() || DENIED);
    return watchChoices(setSaved);
  }, []);
  useEffect(() => {
    if (measurement.enabled && !saved) { setDetails(false); setOpened(true); }
    else setOpened(false);
  }, [saved]);
  useEffect(() => {
    if (!opened || !dialog.current) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current.showModal(); title.current?.focus({ preventScroll: true });
    return () => { dialog.current?.close(); document.body.style.overflow = previousOverflow; };
  }, [opened]);
  useEffect(() => { if (opened && details) title.current?.focus({ preventScroll: true }); }, [opened, details]);
  if (!measurement.enabled) return null;
  function close() {
    dialog.current?.close(); setOpened(false);
    (returnFocus.current || document.querySelector<HTMLElement>('header a'))?.focus({ preventScroll: true });
  }
  function choose(choices: Choices) {
    saveChoices(choices); setSaved(choices); setDraft(choices);
    setStatus('Preferencias de medición guardadas.');
    close();
  }
  function dismiss() { if (!saved) choose(DENIED); else close(); }
  function open() { returnFocus.current = trigger.current; setDraft(saved || DENIED); setDetails(true); setOpened(true); }
  return <section className="measurement" aria-label="Medición opcional">
    <button ref={trigger} className="text-button" type="button" onClick={open}>Preferencias de medición</button>
    <span className="measurement-status" role="status">{status}</span>
    <dialog ref={dialog} className="measurement-dialog" aria-labelledby="measurement-title" aria-describedby="measurement-intro" onCancel={e => { e.preventDefault(); dismiss(); }} onKeyDown={e => {
      if (e.key !== 'Tab') return;
      const controls = e.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], input:not(:disabled)');
      const first = controls[0], last = controls[controls.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === title.current)) { e.preventDefault(); last?.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
    }}>
      <div className="modal-header"><h2 ref={title} tabIndex={-1} id="measurement-title">Tú eliges las cookies.</h2><button type="button" className="close" aria-label={saved ? 'Cerrar preferencias' : 'Continuar sin cookies opcionales'} onClick={dismiss}>×</button></div>
      <p id="measurement-intro">Con tu permiso, usamos cookies de Google Analytics para entender las visitas y de Meta para medir visitas desde anuncios. Puedes aceptar, rechazar o elegir. El formulario funciona igual.</p>
      {!details && <div className="measurement-actions">
        <button type="button" onClick={() => choose(DENIED)}>Rechazar opcionales</button>
        <button type="button" onClick={() => setDetails(true)}>Elegir medición</button>
        <button type="button" onClick={() => choose({ analytics: Boolean(measurement.gaId), ads: Boolean(measurement.metaId) })}>Aceptar opcionales</button>
      </div>}
      <p className="small">Guardamos tu elección durante 180 días. Puedes cambiarla en «Preferencias de medición», al final de la página.{!saved && ' Cerrar este aviso sin elegir mantiene las cookies opcionales desactivadas.'}</p>
      {details && <div>
      {measurement.gaId && <label className="measurement-option"><input type="checkbox" checked={draft.analytics} onChange={e => setDraft({ ...draft, analytics: e.target.checked })}/><span><strong>Analítica de visitas · Google Analytics</strong><br/>Permite entender las visitas y su origen. No enviamos los campos del formulario ni habilitamos personalización de anuncios en Google.</span></label>}
      {measurement.metaId && <label className="measurement-option"><input type="checkbox" checked={draft.ads} onChange={e => setDraft({ ...draft, ads: e.target.checked })}/><span><strong>Medición publicitaria · Meta</strong><br/>Permite relacionar las visitas con anuncios. Meta recibe datos del navegador y puede asociarlos con tu cuenta. No enviamos los campos del formulario.</span></label>}
      </div>}
      <p className="small">Los proveedores reciben información técnica, como la dirección IP, y pueden tratarla fuera de Colombia. Consulta las políticas de <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google</a> y <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noreferrer">Meta</a>. Retirar el permiso detiene esta medición futura; no elimina datos ya enviados.</p>
      {details && <div className="measurement-actions"><button type="button" onClick={() => choose(DENIED)}>Rechazar opcionales</button><button type="button" onClick={() => choose(draft)}>Guardar preferencias</button></div>}
    </dialog>
  </section>;
}

export function MeasurementPrivacy() {
  return <p>La medición opcional de Google Analytics y Meta solo se activa si la autorizas en el aviso inicial de cookies o en «Preferencias de medición», al final de la página. Utiliza cookies para medir visitas y su origen publicitario; los proveedores reciben información técnica del navegador y pueden tratarla fuera de Colombia. No enviamos los campos del formulario a estos servicios. Puedes rechazarla o retirar el permiso sin afectar tu registro. Aviso de medición: moni-measurement-v1.</p>;
}
