import { useEffect, useRef, useState } from 'react';
import { applyChoices, measurement, savedChoices, saveChoices, watchChoices } from './external-measurement';
import { DENIED, type Choices } from './measurement-policy';
import './measurement.css';

export function MeasurementConsent() {
  const [saved, setSaved] = useState(savedChoices);
  const [draft, setDraft] = useState<Choices>(saved || DENIED);
  const [status, setStatus] = useState('');
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    applyChoices(savedChoices() || DENIED);
    return watchChoices(setSaved);
  }, []);
  if (!measurement.enabled) return null;
  function choose(choices: Choices) {
    saveChoices(choices); setSaved(choices); setDraft(choices);
    setStatus('Preferencias de medición guardadas.');
    dialog.current?.close(); trigger.current?.focus({ preventScroll: true });
  }
  function open() { setDraft(saved || DENIED); dialog.current?.showModal(); }
  return <section className="measurement" aria-label="Medición opcional">
    {!saved && <div className="measurement-banner">
      <div><h2>Tú eliges cómo medimos.</h2><p>Con tu permiso, Google Analytics mide visitas y Meta mide el resultado de nuestros anuncios mediante cookies. Puedes rechazarlo y usar el formulario igual.</p></div>
      <div className="measurement-actions">
        <button type="button" onClick={() => choose(DENIED)}>Rechazar opcionales</button>
        <button type="button" onClick={open}>Elegir medición</button>
        <button type="button" onClick={() => choose({ analytics: Boolean(measurement.gaId), ads: Boolean(measurement.metaId) })}>Aceptar opcionales</button>
      </div>
    </div>}
    <button ref={trigger} className="text-button" type="button" onClick={open}>Preferencias de medición</button>
    <span className="measurement-status" role="status">{status}</span>
    <dialog ref={dialog} className="measurement-dialog" aria-labelledby="measurement-title">
      <div className="modal-header"><h2 id="measurement-title">Elige tu medición</h2><button type="button" className="close" aria-label="Cerrar preferencias" onClick={() => dialog.current?.close()}>×</button></div>
      <p>Estas opciones son independientes de tu registro en la lista de espera. Recordamos tu elección durante 180 días. Puedes cambiarla aquí cuando quieras.</p>
      {measurement.gaId && <label className="measurement-option"><input type="checkbox" checked={draft.analytics} onChange={e => setDraft({ ...draft, analytics: e.target.checked })}/><span><strong>Analítica de visitas · Google Analytics</strong><br/>Permite entender las visitas y su origen. No enviamos los campos del formulario ni habilitamos personalización de anuncios en Google.</span></label>}
      {measurement.metaId && <label className="measurement-option"><input type="checkbox" checked={draft.ads} onChange={e => setDraft({ ...draft, ads: e.target.checked })}/><span><strong>Medición publicitaria · Meta</strong><br/>Permite relacionar las visitas con anuncios. Meta recibe datos del navegador y puede asociarlos con tu cuenta. No enviamos los campos del formulario.</span></label>}
      <p className="small">Los proveedores reciben información técnica, como la dirección IP, y pueden tratarla fuera de Colombia. Consulta las políticas de <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google</a> y <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noreferrer">Meta</a>. Retirar el permiso detiene esta medición futura; no elimina datos ya enviados.</p>
      <div className="measurement-actions"><button type="button" onClick={() => choose(DENIED)}>Rechazar opcionales</button><button type="button" onClick={() => choose(draft)}>Guardar preferencias</button></div>
    </dialog>
  </section>;
}

export function MeasurementPrivacy() {
  return <p>La medición opcional de Google Analytics y Meta solo se activa si la autorizas en «Preferencias de medición», al final de la página. Utiliza cookies para medir visitas y su origen publicitario; los proveedores reciben información técnica del navegador y pueden tratarla fuera de Colombia. No enviamos los campos del formulario a estos servicios. Puedes rechazarla o retirar el permiso sin afectar tu registro. Aviso de medición: moni-measurement-v1.</p>;
}
