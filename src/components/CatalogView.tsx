import { useMemo, useState } from 'react';
import { ArrowLeft, Search, ShoppingBag } from 'lucide-react';
import {
  CATEGORIES,
  PRODUCTS,
  Product,
  ProductCategory,
} from '../data/storeData';
import { ProductCard } from './ProductCard';

interface CatalogViewProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  onBackHome: () => void;
  onOpenCart: () => void;
  cartCount: number;
}

export function CatalogView({
  selectedCategory,
  onSelectCategory,
  onSelectProduct,
  onQuickAdd,
  onBackHome,
  onOpenCart,
  cartCount,
}: CatalogViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = PRODUCTS.filter((p) => {
      const matchesCat = selectedCategory === 'Todos' || p.category === selectedCategory;
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.discipline.toLowerCase().includes(q) ||
        p.color.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-desc') {
      return [...list].sort((a, b) => b.price - a.price);
    }
    return list;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Top Catalog Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-200">
        <div className="space-y-3">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-600 hover:text-zinc-950 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a la portada</span>
          </button>

          <h1 className="font-display text-4xl sm:text-5xl font-bold text-zinc-950 tracking-tight leading-none">
            Catálogo Completo del Local
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 max-w-2xl">
            Todas las prendas técnicas, zapatillas y accesorios disponibles en nuestra tienda física
            para compra directa o retiro en el día.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenCart}
          className="inline-flex items-center justify-center gap-2 h-11 px-5 text-sm font-semibold text-zinc-950 bg-white border border-zinc-300 hover:border-zinc-950 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer tabular-nums"
        >
          <ShoppingBag className="w-4 h-4" aria-hidden="true" />
          <span>Ver Bolsa ({cartCount})</span>
        </button>
      </div>

      {/* Interactive Filter Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-200/70 rounded-lg">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => onSelectCategory(category)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === category
                  ? 'bg-white text-zinc-950 shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search
              className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar prenda o disciplina..."
              aria-label="Buscar en el catálogo"
              className="w-full h-10 pl-10 pr-3 text-sm bg-white border border-zinc-300 rounded-md focus:outline-none focus:border-zinc-950"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc')}
            aria-label="Ordenar productos"
            className="h-10 px-3 text-xs font-semibold bg-white border border-zinc-300 rounded-md text-zinc-800 focus:outline-none focus:border-zinc-950 cursor-pointer"
          >
            <option value="featured">Orden: Destacados</option>
            <option value="price-asc">Precio: Menor a mayor</option>
            <option value="price-desc">Precio: Mayor a menor</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-xs text-zinc-500 tabular-nums">
        Mostrando {filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'}
        {selectedCategory !== 'Todos' ? ` en ${selectedCategory}` : ''}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center bg-white border border-zinc-200 rounded-lg space-y-3">
          <p className="text-base font-semibold text-zinc-900">
            No encontramos prendas con ese criterio.
          </p>
          <p className="text-sm text-zinc-500">
            Probá quitando los filtros o buscando otra categoría.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              onSelectCategory('Todos');
            }}
            className="px-4 py-2 text-xs font-semibold text-white bg-zinc-950 rounded-md hover:bg-[#D9381E] transition-colors cursor-pointer"
          >
            Restablecer catálogo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onQuickAdd={onQuickAdd}
            />
          ))}
        </div>
      )}
    </section>
  );
}
