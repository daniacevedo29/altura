import { useState } from 'react';
import { MapPin, Menu, ShoppingBag, X } from 'lucide-react';

interface NavbarProps {
  activeView: 'home' | 'catalog';
  cartCount: number;
  onNavigateHome: (sectionId?: string) => void;
  onOpenCatalog: () => void;
  onOpenContact: () => void;
  onOpenCart: () => void;
}

export function Navbar({
  activeView,
  cartCount,
  onNavigateHome,
  onOpenCatalog,
  onOpenContact,
  onOpenCart,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F6F6F4]/95 backdrop-blur-sm border-b border-zinc-200">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand Wordmark (single line, no descriptors or badges) */}
        <button
          type="button"
          onClick={() => {
            setMobileMenuOpen(false);
            onNavigateHome();
          }}
          className="font-display text-2xl font-bold tracking-tight text-zinc-950 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9381E] rounded"
        >
          APEX ATHLETICA
        </button>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav
          aria-label="Navegación principal"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-600"
        >
          <button
            type="button"
            onClick={() => onNavigateHome()}
            className={`whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-150 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9381E] rounded ${
              activeView === 'home' ? 'text-zinc-950 underline underline-offset-8 decoration-zinc-950' : ''
            }`}
          >
            Inicio
          </button>
          <button
            type="button"
            onClick={() => onNavigateHome('espacios')}
            className="whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-150 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9381E] rounded"
          >
            Espacios
          </button>
          <button
            type="button"
            onClick={onOpenContact}
            className="inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer text-zinc-800 hover:text-[#D9381E] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9381E] rounded"
          >
            <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Dirección y Contacto</span>
          </button>
          <button
            type="button"
            onClick={onOpenCart}
            className="inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-150 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9381E] rounded tabular-nums"
          >
            <ShoppingBag className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Bolsa ({cartCount})</span>
          </button>
        </nav>

        {/* Zone 3: Primary CTA Action (Catálogo) + Mobile controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenContact}
            aria-label="Dirección y contacto del local"
            className="md:hidden inline-flex items-center justify-center h-10 px-3 text-xs font-semibold text-zinc-900 border border-zinc-300 rounded-md hover:bg-zinc-200/70 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 mr-1 shrink-0" aria-hidden="true" />
            <span>Local</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCatalog();
            }}
            className={`h-10 px-4 sm:px-5 text-xs sm:text-sm font-semibold rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9381E] focus-visible:ring-offset-2 ${
              activeView === 'catalog'
                ? 'bg-[#D9381E] text-white'
                : 'bg-zinc-950 text-white hover:bg-[#D9381E]'
            }`}
          >
            Ver Catálogo
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 text-zinc-800 hover:bg-zinc-200/60 rounded-md transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Compact Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-200 bg-[#F6F6F4] px-4 py-3 space-y-1">
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigateHome();
            }}
            className="w-full text-left px-3 py-2.5 text-sm font-medium text-zinc-800 hover:bg-zinc-200/60 rounded-md"
          >
            Inicio
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigateHome('espacios');
            }}
            className="w-full text-left px-3 py-2.5 text-sm font-medium text-zinc-800 hover:bg-zinc-200/60 rounded-md"
          >
            Espacios de la Tienda
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenContact();
            }}
            className="w-full text-left px-3 py-2.5 text-sm font-medium text-zinc-800 hover:bg-zinc-200/60 rounded-md"
          >
            Dirección y Contacto
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCart();
            }}
            className="w-full text-left px-3 py-2.5 text-sm font-medium text-zinc-800 hover:bg-zinc-200/60 rounded-md tabular-nums"
          >
            Bolsa de compras ({cartCount})
          </button>
        </div>
      )}
    </header>
  );
}
