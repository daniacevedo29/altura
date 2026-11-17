import { useEffect, useState } from 'react';
import { Check, MapPin, ShoppingBag, X } from 'lucide-react';
import { Product, STORE_INFO, formatARS } from '../data/storeData';
import { ResilientImage } from './ResilientImage';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
  onOpenContact: () => void;
}

export function ProductModal({
  product,
  onClose,
  onAddToCart,
  onOpenContact,
}: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] ?? 'Único');
      setQuantity(1);
      setAddedFeedback(false);
    }
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, selectedSize || product.sizes[0], quantity);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-xl border border-zinc-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar ficha de producto"
          className="absolute top-3 right-3 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 text-zinc-800 border border-zinc-200 hover:bg-zinc-950 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Product Image */}
        <div className="md:w-1/2 bg-zinc-100 flex items-center justify-center aspect-[4/3] md:aspect-auto">
          <ResilientImage
            src={product.image}
            alt={product.imageAlt}
            fallbackLabel={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Contiguous Purchase Module */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <span>{product.category}</span>
              <span aria-hidden="true">·</span>
              <span>{product.discipline}</span>
            </div>

            <div>
              <h2
                id="product-modal-title"
                className="font-display text-3xl font-bold text-zinc-950 tracking-tight leading-none"
              >
                {product.name}
              </h2>
              <p className="mt-2 text-xl font-semibold text-zinc-950 tabular-nums">
                {formatARS(product.price)}
              </p>
            </div>

            <p className="text-sm text-zinc-600 leading-relaxed">{product.description}</p>

            {/* Technical specs */}
            <dl className="grid grid-cols-1 gap-2 pt-3 border-t border-zinc-200 text-xs">
              <div className="flex justify-between gap-4">
                <dt className="text-zinc-500">Color</dt>
                <dd className="font-medium text-zinc-900 text-right">{product.color}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-zinc-500">Material</dt>
                <dd className="font-medium text-zinc-900 text-right">{product.material}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-zinc-500">Calce</dt>
                <dd className="font-medium text-zinc-900 text-right">{product.fit}</dd>
              </div>
            </dl>

            {/* Size selector */}
            <div className="pt-2">
              <span className="block text-xs font-semibold text-zinc-900 mb-2">
                Seleccioná tu talle
              </span>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[44px] h-10 px-3 text-xs font-semibold rounded-md border transition-colors cursor-pointer tabular-nums ${
                      selectedSize === size
                        ? 'bg-zinc-950 text-white border-zinc-950'
                        : 'bg-white text-zinc-800 border-zinc-300 hover:border-zinc-950'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-semibold text-zinc-900">Cantidad</span>
              <div className="inline-flex items-center border border-zinc-300 rounded-md">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Disminuir cantidad"
                  className="w-10 h-10 flex items-center justify-center text-zinc-700 hover:bg-zinc-100 cursor-pointer"
                >
                  −
                </button>
                <span className="w-10 text-center text-sm font-semibold tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Aumentar cantidad"
                  className="w-10 h-10 flex items-center justify-center text-zinc-700 hover:bg-zinc-100 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-zinc-200">
            <button
              type="button"
              onClick={handleAdd}
              className="w-full h-12 flex items-center justify-center gap-2 rounded-md text-sm font-semibold text-white bg-zinc-950 hover:bg-[#D9381E] transition-colors cursor-pointer"
            >
              {addedFeedback ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Agregado a tu bolsa</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Agregar a la bolsa — {formatARS(product.price * quantity)}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="w-full h-10 flex items-center justify-center gap-1.5 text-xs font-medium text-zinc-700 hover:text-zinc-950 transition-colors cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Retirá hoy en {STORE_INFO.address}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
