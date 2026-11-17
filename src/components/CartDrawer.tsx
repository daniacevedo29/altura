import { FormEvent, useEffect, useState } from 'react';
import { Check, MapPin, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { Product, STORE_INFO, formatARS } from '../data/storeData';
import { ResilientImage } from './ResilientImage';

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onClearCart: () => void;
  onBrowseCatalog: () => void;
}

export function CartDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onBrowseCatalog,
}: CartDrawerProps) {
  const [deliveryMode, setDeliveryMode] = useState<'pickup' | 'delivery'>('pickup');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<{
    code: string;
    total: number;
    mode: 'pickup' | 'delivery';
  } | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingCost = deliveryMode === 'delivery' && subtotal > 0 && subtotal < 150000 ? 6500 : 0;
  const total = subtotal + shippingCost;

  const handleConfirm = (e: FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) return;
    const orderCode = `APX-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedOrder({
      code: orderCode,
      total,
      mode: deliveryMode,
    });
    onClearCart();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/55 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl border-l border-zinc-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-zinc-900" aria-hidden="true" />
            <h2 id="cart-drawer-title" className="font-display text-2xl font-bold text-zinc-950">
              Tu Bolsa
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar bolsa de compras"
            className="w-10 h-10 flex items-center justify-center rounded-md text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {confirmedOrder ? (
            <div className="py-8 space-y-5">
              <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                <Check className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-zinc-950">
                  Pedido #{confirmedOrder.code} Confirmado
                </h3>
                <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                  {confirmedOrder.mode === 'pickup'
                    ? `Preparamos tu pedido para retirar hoy en ${STORE_INFO.address} dentro de las próximas 2 horas.`
                    : 'Coordinaremos el envío al domicilio indicado y te enviaremos el seguimiento por teléfono.'}
                </p>
              </div>
              <div className="p-4 bg-[#F6F6F4] border border-zinc-200 rounded-lg text-sm flex justify-between">
                <span className="text-zinc-600">Total confirmado</span>
                <span className="font-semibold text-zinc-950 tabular-nums">
                  {formatARS(confirmedOrder.total)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setConfirmedOrder(null);
                  onClose();
                }}
                className="w-full h-11 text-sm font-semibold text-white bg-zinc-950 hover:bg-[#D9381E] rounded-md transition-colors cursor-pointer"
              >
                Seguir recorriendo la tienda
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
              <ShoppingBag className="w-10 h-10 text-zinc-300 stroke-[1.5]" />
              <div className="space-y-1">
                <p className="text-base font-semibold text-zinc-900">Tu bolsa está vacía</p>
                <p className="text-sm text-zinc-500 max-w-xs">
                  Explorá el catálogo de indumentaria, calzado y accesorios disponibles en el local.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBrowseCatalog();
                }}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-zinc-950 hover:bg-[#D9381E] rounded-md transition-colors cursor-pointer"
              >
                Ir al Catálogo
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <ul className="divide-y divide-zinc-200">
                {items.map((item) => (
                  <li key={`${item.product.id}-${item.size}`} className="py-4 flex gap-4">
                    <div className="w-20 h-20 rounded-md overflow-hidden bg-zinc-100 shrink-0 border border-zinc-200">
                      <ResilientImage
                        src={item.product.image}
                        alt={item.product.imageAlt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="flex justify-between gap-2">
                        <div>
                          <h3 className="text-sm font-semibold text-zinc-950 truncate">
                            {item.product.name}
                          </h3>
                          <p className="text-xs text-zinc-500 mt-0.5">
                            Talle: <span className="font-medium text-zinc-800">{item.size}</span>
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.product.id, item.size)}
                          aria-label={`Quitar ${item.product.name}`}
                          className="text-zinc-400 hover:text-[#D9381E] transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="inline-flex items-center border border-zinc-300 rounded">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, item.size, -1)}
                            aria-label="Restar unidad"
                            className="w-7 h-7 flex items-center justify-center text-zinc-700 hover:bg-zinc-100 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center text-xs font-semibold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, item.size, 1)}
                            aria-label="Sumar unidad"
                            className="w-7 h-7 flex items-center justify-center text-zinc-700 hover:bg-zinc-100 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-sm font-semibold text-zinc-950 tabular-nums">
                          {formatARS(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Delivery / Pickup Selector */}
              <form id="checkout-form" onSubmit={handleConfirm} className="space-y-4 pt-4 border-t border-zinc-200">
                <div>
                  <span className="block text-xs font-semibold text-zinc-900 mb-2">
                    Modalidad de entrega
                  </span>
                  <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-100 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setDeliveryMode('pickup')}
                      className={`py-2 px-3 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                        deliveryMode === 'pickup'
                          ? 'bg-white text-zinc-950 shadow-sm'
                          : 'text-zinc-600 hover:text-zinc-950'
                      }`}
                    >
                      Retiro en local (Gratis)
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryMode('delivery')}
                      className={`py-2 px-3 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                        deliveryMode === 'delivery'
                          ? 'bg-white text-zinc-950 shadow-sm'
                          : 'text-zinc-600 hover:text-zinc-950'
                      }`}
                    >
                      Envío a domicilio
                    </button>
                  </div>
                </div>

                {deliveryMode === 'pickup' && (
                  <div className="p-3 bg-[#F6F6F4] border border-zinc-200 rounded-md flex items-start gap-2 text-xs text-zinc-700">
                    <MapPin className="w-4 h-4 text-[#D9381E] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      Retirás en <strong>{STORE_INFO.address}</strong> (disponible en 2 hs).
                    </span>
                  </div>
                )}

                <div className="space-y-3">
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Tu nombre y apellido"
                    className="w-full h-10 px-3 text-sm border border-zinc-300 rounded-md focus:outline-none focus:border-zinc-950"
                  />
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Teléfono de contacto"
                    className="w-full h-10 px-3 text-sm border border-zinc-300 rounded-md focus:outline-none focus:border-zinc-950 tabular-nums"
                  />
                  {deliveryMode === 'delivery' && (
                    <input
                      type="text"
                      required
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="Dirección de entrega y código postal"
                      className="w-full h-10 px-3 text-sm border border-zinc-300 rounded-md focus:outline-none focus:border-zinc-950"
                    />
                  )}
                </div>
              </form>
            </div>
          )}
        </div>

        {items.length > 0 && !confirmedOrder && (
          <div className="p-6 border-t border-zinc-200 bg-[#F6F6F4] space-y-4">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-zinc-600">
                <span>Subtotal</span>
                <span className="tabular-nums">{formatARS(subtotal)}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>{deliveryMode === 'pickup' ? 'Retiro en local' : 'Envío'}</span>
                <span className="tabular-nums">
                  {shippingCost === 0 ? 'Sin cargo' : formatARS(shippingCost)}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-zinc-950 pt-2 border-t border-zinc-200">
                <span>Total</span>
                <span className="tabular-nums">{formatARS(total)}</span>
              </div>
            </div>

            <button
              type="submit"
              form="checkout-form"
              className="w-full h-12 text-sm font-semibold text-white bg-zinc-950 hover:bg-[#D9381E] rounded-md transition-colors cursor-pointer"
            >
              {deliveryMode === 'pickup' ? 'Confirmar reserva en local' : 'Confirmar pedido'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
