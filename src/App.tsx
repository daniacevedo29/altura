/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ArrowRight, Clock, MapPin, Phone } from 'lucide-react';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { CatalogView } from './components/CatalogView';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { ResilientImage } from './components/ResilientImage';
import { StoreContactModal } from './components/StoreContactModal';
import {
  PRODUCTS,
  Product,
  ProductCategory,
  SPACE_DIVISIONS,
  STORE_ASSETS,
  STORE_INFO,
} from './data/storeData';

export default function App() {
  const [activeView, setActiveView] = useState<'home' | 'catalog'>('home');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('Todos');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const featuredProducts = PRODUCTS.filter((product) => product.featured);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2400);
  };

  const handleNavigateHome = (sectionId?: string) => {
    setActiveView('home');
    if (sectionId) {
      requestAnimationFrame(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenCatalog = (category: ProductCategory = 'Todos') => {
    setSelectedCategory(category);
    setActiveView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product: Product, size: string, quantity: number) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size,
      );
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      return [...prev, { product, size, quantity }];
    });
    showToast(`${product.name} (${size}) agregado a la bolsa`);
  };

  const handleQuickAdd = (product: Product) => {
    const defaultSize = product.sizes[0] ?? 'Único';
    handleAddToCart(product, defaultSize, 1);
  };

  const handleUpdateQuantity = (productId: string, size: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId && item.size === size
            ? { ...item, quantity: item.quantity + delta }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const handleRemoveItem = (productId: string, size: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.size === size)),
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F6F4] text-zinc-900">
      <Navbar
        activeView={activeView}
        cartCount={cartCount}
        onNavigateHome={handleNavigateHome}
        onOpenCatalog={() => handleOpenCatalog('Todos')}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="flex-1">
        {activeView === 'catalog' ? (
          <CatalogView
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onSelectProduct={setSelectedProduct}
            onQuickAdd={handleQuickAdd}
            onBackHome={() => handleNavigateHome()}
            onOpenCart={() => setIsCartOpen(true)}
            cartCount={cartCount}
          />
        ) : (
          <>
            {/* Espacio 1: Hero Visual del Local y la Ropa */}
            <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-14 sm:pt-8 sm:pb-20">
              <div className="relative rounded-xl overflow-hidden bg-zinc-900 border border-zinc-200 min-h-[480px] sm:min-h-[560px] lg:min-h-[620px] flex items-end">
                <ResilientImage
                  src={STORE_ASSETS.heroStore}
                  alt="Interior del local deportivo Apex Athletica exhibiendo camperas técnicas, buzos y zapatillas"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/15"
                  aria-hidden="true"
                />

                <div className="relative z-10 w-full p-6 sm:p-10 lg:p-14 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                  <div className="max-w-2xl space-y-4">
                    <p className="text-xs sm:text-sm font-medium tracking-wide text-zinc-200">
                      Local de indumentaria deportiva · {STORE_INFO.address}
                    </p>
                    <h1 className="font-display text-[clamp(2.5rem,5vw,4.25rem)] font-bold text-white leading-[0.98] tracking-tight text-balance">
                      Indumentaria técnica pensada para tu próximo entrenamiento.
                    </h1>
                    <p className="text-sm sm:text-base text-zinc-200 max-w-xl leading-relaxed">
                      Conocé nuestro espacio físico en Palermo y equipate con prendas de running,
                      entrenamiento funcional, calzado y conjuntos de recuperación.
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleOpenCatalog('Todos')}
                        className="h-12 px-6 inline-flex items-center gap-2 text-sm font-semibold text-white bg-[#D9381E] hover:bg-[#b82d17] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <span>Explorar Catálogo</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsContactOpen(true)}
                        className="h-12 px-5 inline-flex items-center gap-2 text-sm font-semibold text-white bg-black/45 hover:bg-black/70 border border-white/35 backdrop-blur-sm rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <MapPin className="w-4 h-4" aria-hidden="true" />
                        <span>Dirección y Teléfono</span>
                      </button>
                    </div>
                  </div>

                  {/* Quick Store Hours / Phone Summary in Hero Corner */}
                  <div className="hidden lg:block bg-black/55 backdrop-blur-sm border border-white/20 rounded-lg p-5 text-white min-w-[260px] space-y-2">
                    <p className="text-xs text-zinc-300">Atención presencial</p>
                    <p className="text-sm font-semibold">{STORE_INFO.address}</p>
                    <p className="text-sm font-semibold text-zinc-100 tabular-nums">
                      Tel. {STORE_INFO.phone}
                    </p>
                    <p className="text-xs text-zinc-300 tabular-nums">
                      Lun a Vie 10:00–20:00 · Sáb 10:00–19:00
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Espacio 2: División por Espacios y Disciplinas */}
            <section
              id="espacios"
              className="border-t border-zinc-200 bg-white py-14 sm:py-20"
            >
              <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="space-y-2 max-w-2xl">
                    <p className="text-xs font-semibold text-zinc-500">
                      Sectores del local
                    </p>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-zinc-950 tracking-tight text-balance">
                      Tres espacios pensados para cada disciplina
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenCatalog('Todos')}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-950 hover:text-[#D9381E] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Ver todo el catálogo</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {SPACE_DIVISIONS.map((space) => (
                    <article
                      key={space.id}
                      className="group flex flex-col justify-between border border-zinc-200 rounded-lg overflow-hidden bg-[#F6F6F4]"
                    >
                      <div>
                        <div className="aspect-[4/3] overflow-hidden bg-zinc-200">
                          <ResilientImage
                            src={space.image}
                            alt={space.imageAlt}
                            fallbackLabel={space.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          />
                        </div>
                        <div className="p-6 space-y-2.5">
                          <p className="text-xs font-semibold text-zinc-500 tabular-nums">
                            {space.number} {space.subtitle}
                          </p>
                          <h3 className="font-display text-2xl font-bold text-zinc-950 tracking-tight">
                            {space.title}
                          </h3>
                          <p className="text-sm text-zinc-600 leading-relaxed">
                            {space.description}
                          </p>
                        </div>
                      </div>

                      <div className="px-6 pb-6">
                        <button
                          type="button"
                          onClick={() => handleOpenCatalog(space.categoryFilter)}
                          className="w-full h-10 inline-flex items-center justify-between px-4 text-xs font-semibold text-zinc-950 bg-white border border-zinc-300 hover:border-zinc-950 hover:bg-zinc-950 hover:text-white rounded-md transition-colors cursor-pointer"
                        >
                          <span>Explorar {space.categoryFilter}</span>
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            {/* Espacio 3: Selección Destacada del Catálogo */}
            <section className="border-t border-zinc-200 bg-[#F6F6F4] py-14 sm:py-20">
              <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="space-y-2 max-w-2xl">
                    <p className="text-xs font-semibold text-zinc-500">
                      Selección de temporada
                    </p>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-zinc-950 tracking-tight text-balance">
                      Prendas y calzado disponibles hoy en el local
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOpenCatalog('Todos')}
                    className="h-10 px-5 inline-flex items-center gap-2 text-xs font-semibold text-white bg-zinc-950 hover:bg-[#D9381E] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Abrir catálogo completo ({PRODUCTS.length})</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {featuredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onSelect={setSelectedProduct}
                      onQuickAdd={handleQuickAdd}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Espacio 4: Nuestro Local, Probadores y Ubicación */}
            <section className="border-t border-zinc-200 bg-white py-14 sm:py-20">
              <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">
                  <div className="rounded-xl overflow-hidden border border-zinc-200 bg-zinc-100 aspect-[4/3] lg:aspect-auto">
                    <ResilientImage
                      src={STORE_ASSETS.storeLounge}
                      alt="Sector de calzado y probadores dentro del local Apex Athletica"
                      className="w-full h-full lg:h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col justify-between py-2 space-y-8">
                    <div className="space-y-4">
                      <p className="text-xs font-semibold text-zinc-500">
                        Visitá la tienda física
                      </p>
                      <h2 className="font-display text-3xl sm:text-4xl font-bold text-zinc-950 tracking-tight text-balance">
                        Proba tu talle con asesoramiento directo en nuestro local
                      </h2>
                      <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
                        Contamos con un espacio dedicado para que puedas comparar calces, testear
                        amortiguación de calzado y retirar compras realizadas desde la web en el día.
                      </p>
                    </div>

                    <div className="divide-y divide-zinc-200 border-y border-zinc-200">
                      <div className="py-4 flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-[#D9381E] mt-1 shrink-0" aria-hidden="true" />
                        <div>
                          <p className="text-sm font-semibold text-zinc-950">
                            {STORE_INFO.address} — {STORE_INFO.city}
                          </p>
                          <p className="text-xs text-zinc-500 mt-0.5">{STORE_INFO.reference}</p>
                        </div>
                      </div>

                      <div className="py-4 flex items-start gap-3">
                        <Phone className="w-4 h-4 text-[#D9381E] mt-1 shrink-0" aria-hidden="true" />
                        <div>
                          <p className="text-sm font-semibold text-zinc-950 tabular-nums">
                            {STORE_INFO.phone} · WhatsApp {STORE_INFO.whatsapp}
                          </p>
                          <p className="text-xs text-zinc-500 mt-0.5">
                            Consultas de stock, talles y reservas telefónicas
                          </p>
                        </div>
                      </div>

                      <div className="py-4 flex items-start gap-3">
                        <Clock className="w-4 h-4 text-[#D9381E] mt-1 shrink-0" aria-hidden="true" />
                        <div>
                          <p className="text-sm font-semibold text-zinc-950 tabular-nums">
                            Lunes a Viernes 10:00–20:00 hs · Sábados 10:00–19:00 hs
                          </p>
                          <p className="text-xs text-zinc-500 mt-0.5">
                            Retiro sin cargo en 2 horas desde tu confirmación
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setIsContactOpen(true)}
                        className="h-11 px-5 text-sm font-semibold text-white bg-zinc-950 hover:bg-[#D9381E] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Ver dirección y contacto completo
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenCatalog('Todos')}
                        className="h-11 px-5 text-sm font-semibold text-zinc-900 border border-zinc-300 hover:border-zinc-950 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Ir al Catálogo
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Clean Quiet Footer */}
      <footer className="border-t border-zinc-200 bg-[#EFEFED] text-zinc-700">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <p className="font-display text-xl font-bold text-zinc-950">APEX ATHLETICA</p>
            <p className="text-xs text-zinc-600">
              {STORE_INFO.address}, {STORE_INFO.city} · Tel.{' '}
              <span className="tabular-nums font-medium">{STORE_INFO.phone}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-zinc-700">
            <button
              type="button"
              onClick={() => handleNavigateHome()}
              className="hover:text-zinc-950 transition-colors cursor-pointer"
            >
              Inicio
            </button>
            <button
              type="button"
              onClick={() => handleOpenCatalog('Todos')}
              className="hover:text-zinc-950 transition-colors cursor-pointer"
            >
              Catálogo completo
            </button>
            <button
              type="button"
              onClick={() => setIsContactOpen(true)}
              className="hover:text-zinc-950 transition-colors cursor-pointer"
            >
              Dirección y Contacto
            </button>
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="hover:text-zinc-950 transition-colors cursor-pointer tabular-nums"
            >
              Bolsa ({cartCount})
            </button>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenContact={() => setIsContactOpen(true)}
      />

      <StoreContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        items={cartItems}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCartItems([])}
        onBrowseCatalog={() => handleOpenCatalog('Todos')}
      />

      {/* Subtle Add-to-Bag Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 bg-zinc-950 text-white text-xs font-medium rounded-lg shadow-lg border border-zinc-800"
        >
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => {
              setToastMessage(null);
              setIsCartOpen(true);
            }}
            className="text-[#ff7a63] hover:text-white font-semibold underline underline-offset-2 cursor-pointer"
          >
            Ver bolsa
          </button>
        </div>
      )}
    </div>
  );
}
