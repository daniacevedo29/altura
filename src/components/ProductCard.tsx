import { Plus } from 'lucide-react';
import { Product, formatARS } from '../data/storeData';
import { ResilientImage } from './ResilientImage';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export function ProductCard({ product, onSelect, onQuickAdd }: ProductCardProps) {
  return (
    <article className="group flex flex-col bg-white border border-zinc-200 rounded-lg overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <button
        type="button"
        onClick={() => onSelect(product)}
        className="relative w-full aspect-[4/3] bg-zinc-100 overflow-hidden text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9381E]"
      >
        <ResilientImage
          src={product.image}
          alt={product.imageAlt}
          fallbackLabel={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </button>

      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1.5">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.stockStatus}</span>
          </div>

          <button
            type="button"
            onClick={() => onSelect(product)}
            className="text-left cursor-pointer focus-visible:outline-none focus-visible:underline"
          >
            <h3 className="text-base font-semibold text-zinc-950 leading-snug group-hover:text-[#D9381E] transition-colors">
              {product.name}
            </h3>
          </button>

          <p className="mt-1 text-xs text-zinc-500 line-clamp-1">{product.color}</p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-zinc-100">
          <span className="text-[15px] font-semibold text-zinc-950 tabular-nums">
            {formatARS(product.price)}
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onSelect(product)}
              className="px-3 py-2 text-xs font-medium text-zinc-700 hover:text-zinc-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Detalles
            </button>
            <button
              type="button"
              onClick={() => onQuickAdd(product)}
              aria-label={`Agregar ${product.name} a la bolsa`}
              className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-white bg-zinc-950 hover:bg-[#D9381E] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Agregar</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
