export type ProductCategory =
  | 'Todos'
  | 'Running'
  | 'Training'
  | 'Calzado'
  | 'Buzos y Abrigo'
  | 'Accesorios';

export interface Product {
  id: string;
  name: string;
  category: Exclude<ProductCategory, 'Todos'>;
  discipline: string;
  price: number;
  sizes: string[];
  color: string;
  material: string;
  fit: string;
  stockStatus: string;
  featured: boolean;
  description: string;
  image: string;
  imageAlt: string;
}

export interface SpaceDivision {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  categoryFilter: Exclude<ProductCategory, 'Todos'>;
  image: string;
  imageAlt: string;
}

export const STORE_ASSETS = {
  heroStore: '/src/assets/images/hero_sportswear_store_1794918752286.jpg',
  runningGear: '/src/assets/images/section_running_gear_1794918752860.jpg',
  trainingApparel: '/src/assets/images/section_training_apparel_1794918752715.jpg',
  storeLounge: '/src/assets/images/section_store_lounge_1794918755139.jpg',
  trackJacket: '/src/assets/images/product_track_jacket_1794918753748.jpg',
  trainingSet: '/src/assets/images/product_training_set_1794918754032.jpg',
  runningShoes: '/src/assets/images/product_running_shoes_1794918754661.jpg',
  accessories: '/src/assets/images/product_sport_accessories_1794918755080.jpg',
};

export const STORE_INFO = {
  name: 'Apex Athletica',
  address: 'Av. del Libertador 2480, Local 4',
  city: 'Palermo, Ciudad Autónoma de Buenos Aires',
  reference: 'A dos cuadras de Parque Las Heras, esquina Billinghurst',
  phone: '+54 11 4829-7340',
  phoneRaw: '+541148297340',
  whatsapp: '+54 9 11 5412-8900',
  whatsappUrl: 'https://wa.me/5491154128900',
  email: 'hola@apexathletica.com',
  hours: [
    { days: 'Lunes a Viernes', time: '10:00 – 20:00 hs' },
    { days: 'Sábados', time: '10:00 – 19:00 hs' },
    { days: 'Domingos y Feriados', time: 'Cerrado' },
  ],
  services: [
    'Retiro en tienda sin cargo en 2 horas',
    'Asesoramiento técnico de talle y pisada en el local',
    'Cambios directos en mostrador hasta 30 días',
  ],
};

export const CATEGORIES: ProductCategory[] = [
  'Todos',
  'Running',
  'Training',
  'Calzado',
  'Buzos y Abrigo',
  'Accesorios',
];

export const SPACE_DIVISIONS: SpaceDivision[] = [
  {
    id: 'space-running',
    number: '01.',
    title: 'Running & Ruta',
    subtitle: 'Cortavientos ultralivianos y musculosas técnicas',
    description:
      'Tejidos microperforados de secado rápido, costuras planas antiroce y capas externas repelentes al agua para entrenar en cualquier clima.',
    categoryFilter: 'Running',
    image: STORE_ASSETS.runningGear,
    imageAlt: 'Indumentaria técnica de running: cortaviento naranja técnico, musculosa respirable y zapatillas sobre piedra',
  },
  {
    id: 'space-training',
    number: '02.',
    title: 'Training & Fuerza',
    subtitle: 'Compresión elástica, shorts y bolsos deportivos',
    description:
      'Prendas pensadas para alta intensidad y movilidad completa, con refuerzos en zonas de fricción y elasticidad multidireccional.',
    categoryFilter: 'Training',
    image: STORE_ASSETS.trainingApparel,
    imageAlt: 'Conjunto de entrenamiento: short técnico negro, remera compresiva y bolso deportivo sobre concreto',
  },
  {
    id: 'space-footwear',
    number: '03.',
    title: 'Calzado & Recuperación',
    subtitle: 'Amortiguación reactiva y algodón pesado post-entreno',
    description:
      'Modelos seleccionados para asfalto y gimnasio, junto a buzos y conjuntos de frisa de alto gramaje para antes y después de entrenar.',
    categoryFilter: 'Calzado',
    image: STORE_ASSETS.runningShoes,
    imageAlt: 'Zapatillas deportivas blancas y negras sobre pedestal de piedra',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'apx-shell-01',
    name: 'Campera Técnica Storm Shell',
    category: 'Running',
    discipline: 'Running / Clima Variable',
    price: 148000,
    sizes: ['S', 'M', 'L', 'XL'],
    color: 'Negro Carbón / Bermellón',
    material: 'Nylon ripstop 3 capas impermeable (15.000 mm)',
    fit: 'Corte atlético articulado',
    stockStatus: 'Disponible en local',
    featured: true,
    description:
      'Campera rompevientos e impermeable con cierres termosellados, ventilación dorsal láser y detalles reflectivos de alta visibilidad.',
    image: STORE_ASSETS.trackJacket,
    imageAlt: 'Campera técnica impermeable negro carbón con cierres en color bermellón',
  },
  {
    id: 'apx-run-02',
    name: 'Kit Running Terracota & Singlet',
    category: 'Running',
    discipline: 'Maratón / Pista',
    price: 96500,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    color: 'Terracota / Grafito',
    material: 'Poliéster reciclado ultraliviano 95 g/m²',
    fit: 'Ajuste liviano respirable',
    stockStatus: 'Disponible en local',
    featured: true,
    description:
      'Cortaviento plegable de bolsillo combinado con musculosa técnica de malla abierta para tiradas largas y días ventosos.',
    image: STORE_ASSETS.runningGear,
    imageAlt: 'Cortaviento deportivo terracota y musculosa técnica grafito sobre piedra travertino',
  },
  {
    id: 'apx-trn-03',
    name: 'Short & Remera Compresión Pro',
    category: 'Training',
    discipline: 'Gimnasio / Funcional',
    price: 89000,
    sizes: ['S', 'M', 'L', 'XL'],
    color: 'Carbón Mate',
    material: 'Poliamida elastizada 4-way stretch con tratamiento anti-olor',
    fit: 'Compresión media ergonómica',
    stockStatus: 'Disponible en local',
    featured: true,
    description:
      'Conjunto de entrenamiento con short de 7 pulgadas con bolsillos con cierre oculto y remera sin costuras laterales.',
    image: STORE_ASSETS.trainingApparel,
    imageAlt: 'Short técnico de entrenamiento y remera compresiva carbón mate',
  },
  {
    id: 'apx-sho-04',
    name: 'Zapatillas Stride Velocity Obsidian',
    category: 'Calzado',
    discipline: 'Asfalto / Ritmo',
    price: 185000,
    sizes: ['39', '40', '41', '42', '43', '44'],
    color: 'Tiza / Negro Obsidiana',
    material: 'Upper de engineered mesh y mediasuela de espuma reactiva',
    fit: 'Horma estándar neutra (Drop 8 mm)',
    stockStatus: 'Últimos pares en local',
    featured: true,
    description:
      'Calzado de entrenamiento diario con geometría basculante para transiciones fluidas y suela de caucho de alta abrasión.',
    image: STORE_ASSETS.runningShoes,
    imageAlt: 'Zapatillas de running color blanco tiza con suela negra esculpida',
  },
  {
    id: 'apx-hud-05',
    name: 'Conjunto Hoodie & Jogger Mineral',
    category: 'Buzos y Abrigo',
    discipline: 'Pre y Post Entreno',
    price: 132000,
    sizes: ['S', 'M', 'L', 'XL'],
    color: 'Gris Mineral',
    material: 'Algodón peinado 440 g/m² con interior de rizo suave',
    fit: 'Relajado estructurado',
    stockStatus: 'Disponible en local',
    featured: true,
    description:
      'Buzo canguro de hombro caído y pantalón jogger cónico diseñados para mantener el calor corporal antes y después de entrenar.',
    image: STORE_ASSETS.trainingSet,
    imageAlt: 'Buzo con capucha y pantalón jogger deportivo color gris mineral',
  },
  {
    id: 'apx-acc-06',
    name: 'Pack Esenciales de Entrenamiento',
    category: 'Accesorios',
    discipline: 'Hidratación & Ruta',
    price: 54000,
    sizes: ['Único'],
    color: 'Negro / Acero / Blanco',
    material: 'Nylon perforado, acero inoxidable 18/8 y algodón técnico',
    fit: 'Talle universal ajustable',
    stockStatus: 'Disponible en local',
    featured: true,
    description:
      'Incluye gorra técnica respirable con perforación láser, botella térmica de 750 ml y par de medias acanaladas con soporte plantar.',
    image: STORE_ASSETS.accessories,
    imageAlt: 'Gorra deportiva negra, botella térmica de acero y medias blancas técnicas',
  },
  {
    id: 'apx-trn-07',
    name: 'Bolso Deportivo Urban Canvas 38L',
    category: 'Accesorios',
    discipline: 'Gimnasio / Viaje Corto',
    price: 112000,
    sizes: ['38L'],
    color: 'Negro Mate',
    material: 'Lona balística 1000D resistente al agua con base reforzada',
    fit: 'Apto cabina y locker estándar',
    stockStatus: 'Disponible en local',
    featured: false,
    description:
      'Bolso de entrenamiento con compartimento independiente ventilado para zapatillas, bolsillo interno acolchado y correa desmontable.',
    image: STORE_ASSETS.trainingApparel,
    imageAlt: 'Bolso deportivo negro de lona técnica sobre concreto',
  },
  {
    id: 'apx-run-08',
    name: 'Rompeviento Aero Ripstop',
    category: 'Running',
    discipline: 'Trail / Ruta',
    price: 118000,
    sizes: ['S', 'M', 'L', 'XL'],
    color: 'Terracota Intenso',
    material: 'Micro-ripstop DWR cortaviento de 110 g',
    fit: 'Corte anatómico',
    stockStatus: 'Disponible en local',
    featured: false,
    description:
      'Capa intermedia ultraliviana con cuello alto protector, puños elastizados y ribetes reflectivos en chevron delantero.',
    image: STORE_ASSETS.runningGear,
    imageAlt: 'Campera rompeviento color terracota con cierre frontal',
  },
  {
    id: 'apx-hud-09',
    name: 'Buzo Heavyweight Atelier',
    category: 'Buzos y Abrigo',
    discipline: 'Urbano / Recuperación',
    price: 78000,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    color: 'Pizarra Oscuro',
    material: 'Algodón orgánico 440 g/m² prelavado',
    fit: 'Boxy fit con puños acanalados',
    stockStatus: 'Disponible en local',
    featured: false,
    description:
      'Sudadera con capucha forrada en doble capa, cordones de algodón crudo con punteras metálicas y estructura firme.',
    image: STORE_ASSETS.trainingSet,
    imageAlt: 'Buzo con capucha color pizarra oscuro doblado sobre piedra',
  },
  {
    id: 'apx-sho-10',
    name: 'Zapatillas Tempo Carbon Pro',
    category: 'Calzado',
    discipline: 'Competición / Fondo',
    price: 215000,
    sizes: ['39', '40', '41', '42', '43'],
    color: 'Blanco / Azul Marino / Naranja',
    material: 'Malla monofilamento + espuma de doble densidad',
    fit: 'Ajuste de competición',
    stockStatus: 'Stock limitado en local',
    featured: false,
    description:
      'Diseñadas para ritmos sostenidos y medias maratones, con retorno de energía optimizado y talón biselado de aterrizaje suave.',
    image: STORE_ASSETS.runningGear,
    imageAlt: 'Zapatillas deportivas de competición blancas con detalles azul marino y naranja',
  },
];

export function formatARS(amount: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(amount);
}
