import { FormEvent, useEffect, useState } from 'react';
import { Check, Clock, Copy, Mail, MapPin, MessageSquare, Phone, X } from 'lucide-react';
import { STORE_ASSETS, STORE_INFO } from '../data/storeData';
import { ResilientImage } from './ResilientImage';

interface StoreContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StoreContactModal({ isOpen, onClose }: StoreContactModalProps) {
  const [copiedField, setCopiedField] = useState<'address' | 'phone' | null>(null);
  const [name, setName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = async (text: string, field: 'address' | 'phone') => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback handled visually regardless of clipboard permissions
    }
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1800);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contactPhone.trim()) return;
    const refNumber = `APX-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedCode(refNumber);
    setName('');
    setContactPhone('');
    setMessage('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="store-contact-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-xl border border-zinc-200 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar dirección y contacto"
          className="absolute top-3 right-3 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/95 text-zinc-800 border border-zinc-200 hover:bg-zinc-950 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Address, Phone, Hours & Store Photo */}
        <div className="md:w-1/2 bg-[#F6F6F4] p-6 sm:p-8 flex flex-col justify-between gap-6 border-b md:border-b-0 md:border-r border-zinc-200 overflow-y-auto">
          <div className="space-y-6">
            <div>
              <p className="text-xs font-medium text-zinc-500 mb-1">
                Tienda física y punto de retiro
              </p>
              <h2
                id="store-contact-title"
                className="font-display text-3xl sm:text-4xl font-bold text-zinc-950 tracking-tight leading-none"
              >
                Dirección y Contacto
              </h2>
            </div>

            {/* Address block */}
            <div className="p-4 bg-white border border-zinc-200 rounded-lg space-y-2.5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#D9381E] mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-zinc-950">{STORE_INFO.address}</p>
                    <p className="text-xs text-zinc-600">{STORE_INFO.city}</p>
                    <p className="text-xs text-zinc-500 mt-1">{STORE_INFO.reference}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    handleCopy(`${STORE_INFO.address}, ${STORE_INFO.city}`, 'address')
                  }
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {copiedField === 'address' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Copiada</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Phone & Direct Contact block */}
            <div className="p-4 bg-white border border-zinc-200 rounded-lg space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#D9381E] shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-xs text-zinc-500">Teléfono del local</p>
                    <a
                      href={`tel:${STORE_INFO.phoneRaw}`}
                      className="text-base font-semibold text-zinc-950 hover:text-[#D9381E] transition-colors tabular-nums"
                    >
                      {STORE_INFO.phone}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(STORE_INFO.phone, 'phone')}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {copiedField === 'phone' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>

              <div className="pt-2.5 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 text-zinc-700">
                  <MessageSquare className="w-3.5 h-3.5 text-zinc-500" aria-hidden="true" />
                  <span>WhatsApp:</span>
                  <span className="font-semibold text-zinc-950 tabular-nums">
                    {STORE_INFO.whatsapp}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-zinc-700">
                  <Mail className="w-3.5 h-3.5 text-zinc-500" aria-hidden="true" />
                  <span className="font-medium">{STORE_INFO.email}</span>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-900">
                <Clock className="w-4 h-4 text-zinc-600" aria-hidden="true" />
                <span>Horarios de atención</span>
              </div>
              <dl className="space-y-1 text-xs">
                {STORE_INFO.hours.map((item) => (
                  <div key={item.days} className="flex justify-between text-zinc-600">
                    <dt>{item.days}</dt>
                    <dd className="font-medium text-zinc-900 tabular-nums">{item.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="hidden sm:block aspect-[16/9] rounded-lg overflow-hidden border border-zinc-200">
            <ResilientImage
              src={STORE_ASSETS.storeLounge}
              alt="Interior del local Apex Athletica con exhibidor de zapatillas y probadores"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Column: Direct Store Inquiry / Reservation Form */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-center overflow-y-auto">
          {submittedCode ? (
            <div className="space-y-4 py-6">
              <div className="w-11 h-11 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                <Check className="w-5 h-5" />
              </div>
              <h3 className="font-display text-2xl font-bold text-zinc-950">
                Consulta recibida — Ref. {submittedCode}
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Nuestro equipo en {STORE_INFO.address} revisará tu consulta de stock o talle y se
                comunicará al número indicado dentro del horario comercial.
              </p>
              <button
                type="button"
                onClick={() => setSubmittedCode(null)}
                className="px-4 py-2.5 text-xs font-semibold text-white bg-zinc-950 hover:bg-[#D9381E] rounded-md transition-colors cursor-pointer"
              >
                Enviar otra consulta
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h3 className="font-display text-2xl font-bold text-zinc-950 tracking-tight">
                  Consultá stock o reservá tu visita
                </h3>
                <p className="mt-1 text-sm text-zinc-600">
                  Escribinos para confirmar talles disponibles antes de acercarte al local.
                </p>
              </div>

              <div>
                <label htmlFor="contact-name" className="block text-xs font-semibold text-zinc-800 mb-1.5">
                  Nombre completo
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Martín Gómez"
                  className="w-full h-11 px-3.5 text-sm bg-white border border-zinc-300 rounded-md focus:outline-none focus:border-zinc-950"
                />
              </div>

              <div>
                <label htmlFor="contact-phone" className="block text-xs font-semibold text-zinc-800 mb-1.5">
                  Teléfono o WhatsApp
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  required
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="+54 9 11 ..."
                  className="w-full h-11 px-3.5 text-sm bg-white border border-zinc-300 rounded-md focus:outline-none focus:border-zinc-950 tabular-nums"
                />
              </div>

              <div>
                <label htmlFor="contact-msg" className="block text-xs font-semibold text-zinc-800 mb-1.5">
                  Prenda, talle o consulta
                </label>
                <textarea
                  id="contact-msg"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ej. Quisiera probarme las Zapatillas Stride Velocity en talle 42 hoy por la tarde."
                  className="w-full p-3.5 text-sm bg-white border border-zinc-300 rounded-md focus:outline-none focus:border-zinc-950 resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 h-11 px-5 text-sm font-semibold text-white bg-zinc-950 hover:bg-[#D9381E] rounded-md transition-colors cursor-pointer"
                >
                  Enviar consulta al local
                </button>
                <a
                  href={`tel:${STORE_INFO.phoneRaw}`}
                  className="h-11 px-4 inline-flex items-center justify-center gap-2 text-sm font-semibold text-zinc-900 border border-zinc-300 hover:border-zinc-950 rounded-md transition-colors whitespace-nowrap"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  <span>Llamar ahora</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
