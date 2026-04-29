import iphone17ProMax from "@/assets/photos/iphone-17-pro-max.jpg";
import iphone17Pro from "@/assets/photos/iphone-17-pro.jpg";
import iphone16ProMax from "@/assets/photos/iphone-16-pro-max.jpg";
import iphone16Pro from "@/assets/photos/iphone-16-pro.jpg";
import iphone16 from "@/assets/photos/iphone-16.jpg";
import iphone16e from "@/assets/photos/iphone-16e.jpg";
import iphone16eA from "@/assets/photos/iphone-16e-a.jpg";
import iphone15ProMax from "@/assets/photos/iphone-15-pro-max.jpg";
import iphone15Pro from "@/assets/photos/iphone-15-pro.jpg";
import iphone15Plus from "@/assets/photos/iphone-15-plus.jpg";
import iphone15 from "@/assets/photos/iphone-15.jpg";
import iphone14ProMax from "@/assets/photos/iphone-14-pro-128.jpg";
import iphone14Pro from "@/assets/photos/iphone-14-pro.jpg";
import iphone14Plus from "@/assets/photos/iphone-14-plus.jpg";
import iphone14 from "@/assets/photos/iphone-14.jpg";
import iphone13ProMax from "@/assets/photos/iphone-13-pro-max.jpg";
import iphone13Pro from "@/assets/photos/iphone-13-pro.jpg";
import iphone13 from "@/assets/photos/iphone-13.jpg";
import iphone12ProMax from "@/assets/photos/iphone-12-pro-max.jpg";
import iphone11 from "@/assets/photos/iphone-11.jpg";

export type Product = {
  id: string;
  name: string;
  model: string;
  storage: string;
  colors: string[];
  condition: "Novo" | "Seminovo";
  price: number;
  oldPrice: number;
  discount: number;
  image: string;
  gallery: string[];
  category: string;
  description: string;
  specs: { label: string; value: string }[];
  rating: number;
  reviews: number;
  installments: number;
  featured?: boolean;
};

export const categories = [
  "Todos",
  "iPhone 17",
  "iPhone 16",
  "iPhone 15",
  "iPhone 14",
  "iPhone 13",
  "iPhone 12",
  "iPhone 11",
  "Seminovos",
];

const baseSpecs = (cam: string, bat: string, chip: string) => [
  { label: "Câmera", value: cam },
  { label: "Bateria", value: bat },
  { label: "Processador", value: chip },
  { label: "Tela", value: "Super Retina XDR" },
  { label: "Garantia", value: "3 meses" },
];

const calcDiscount = (oldP: number, p: number) => Math.round(((oldP - p) / oldP) * 100);

export const products: Product[] = [
  // ============ iPhone 17 ============
  {
    id: "iphone-17-pro-max",
    name: "iPhone 17 Pro Max",
    model: "iPhone 17 Pro Max",
    storage: "256GB",
    colors: ["Titânio Preto", "Titânio Natural", "Laranja Cósmico"],
    condition: "Novo",
    price: 7500,
    oldPrice: 8200,
    discount: calcDiscount(8200, 7500),
    image: iphone17ProMax,
    gallery: [iphone17ProMax],
    category: "iPhone 17",
    description: "O mais avançado iPhone já criado. Chip A19 Pro, sistema de câmeras profissional triplo de 48MP, tela ProMotion 120Hz e bateria para o dia inteiro.",
    specs: baseSpecs("Tripla 48MP Pro", "Até 33h vídeo", "Apple A19 Pro"),
    rating: 5,
    reviews: 87,
    installments: 12,
    featured: true,
  },
  {
    id: "iphone-17-pro",
    name: "iPhone 17 Pro",
    model: "iPhone 17 Pro",
    storage: "256GB",
    colors: ["Titânio Preto", "Laranja", "Prata"],
    condition: "Novo",
    price: 7500,
    oldPrice: 8000,
    discount: calcDiscount(8000, 7500),
    image: iphone17Pro,
    gallery: [iphone17Pro],
    category: "iPhone 17",
    description: "Performance profissional. Câmeras de 48MP, ProMotion e design em titânio.",
    specs: baseSpecs("Tripla 48MP Pro", "Até 27h vídeo", "Apple A19 Pro"),
    rating: 5,
    reviews: 54,
    installments: 12,
    featured: true,
  },

  // ============ iPhone 16 ============
  {
    id: "iphone-16-pro-max",
    name: "iPhone 16 Pro Max",
    model: "iPhone 16 Pro Max",
    storage: "256GB",
    colors: ["Titânio Natural", "Titânio Preto", "Titânio Branco"],
    condition: "Novo",
    price: 5200,
    oldPrice: 5800,
    discount: calcDiscount(5800, 5200),
    image: iphone16ProMax,
    gallery: [iphone16ProMax],
    category: "iPhone 16",
    description: "Chip A18 Pro, câmeras profissionais e tela ProMotion 120Hz.",
    specs: baseSpecs("Tripla 48MP Pro", "Até 33h vídeo", "Apple A18 Pro"),
    rating: 5,
    reviews: 122,
    installments: 12,
    featured: true,
  },
  {
    id: "iphone-16-pro",
    name: "iPhone 16 Pro",
    model: "iPhone 16 Pro",
    storage: "128GB",
    colors: ["Titânio Natural", "Titânio Preto"],
    condition: "Novo",
    price: 5200,
    oldPrice: 5600,
    discount: calcDiscount(5600, 5200),
    image: iphone16Pro,
    gallery: [iphone16Pro],
    category: "iPhone 16",
    description: "Performance Pro em design titânio premium.",
    specs: baseSpecs("Tripla 48MP Pro", "Até 27h vídeo", "Apple A18 Pro"),
    rating: 5,
    reviews: 95,
    installments: 12,
    featured: true,
  },
  {
    id: "iphone-16",
    name: "iPhone 16",
    model: "iPhone 16",
    storage: "128GB",
    colors: ["Rosa", "Branco", "Preto", "Azul-petróleo", "Ultramarino"],
    condition: "Novo",
    price: 4799,
    oldPrice: 5000,
    discount: calcDiscount(5000, 4799),
    image: iphone16,
    gallery: [iphone16],
    category: "iPhone 16",
    description: "iPhone 16 lacrado com todas as cores disponíveis.",
    specs: baseSpecs("Dupla 48MP", "Até 22h vídeo", "Apple A18"),
    rating: 5,
    reviews: 67,
    installments: 12,
  },
  {
    id: "iphone-16e",
    name: "iPhone 16e",
    model: "iPhone 16e",
    storage: "128GB",
    colors: ["Preto", "Branco"],
    condition: "Novo",
    price: 2949.99,
    oldPrice: 3100,
    discount: calcDiscount(3100, 2949.99),
    image: iphone16e,
    gallery: [iphone16e, iphone16eA],
    category: "iPhone 16",
    description: "O iPhone 16 mais acessível, com todo desempenho Apple.",
    specs: baseSpecs("Câmera 48MP", "Até 26h vídeo", "Apple A18"),
    rating: 4,
    reviews: 41,
    installments: 12,
  },

  // ============ iPhone 15 ============
  {
    id: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    model: "iPhone 15 Pro Max",
    storage: "256GB",
    colors: ["Titânio Natural", "Titânio Preto"],
    condition: "Seminovo",
    price: 3400,
    oldPrice: 3800,
    discount: calcDiscount(3800, 3400),
    image: iphone15ProMax,
    gallery: [iphone15ProMax],
    category: "iPhone 15",
    description: "Topo de linha com zoom óptico de 5x e tela de 6,7 polegadas.",
    specs: baseSpecs("Tripla 48MP + 5x", "Até 29h vídeo", "Apple A17 Pro"),
    rating: 5,
    reviews: 201,
    installments: 12,
    featured: true,
  },
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro",
    model: "iPhone 15 Pro",
    storage: "128GB",
    colors: ["Titânio Natural", "Titânio Preto", "Titânio Azul"],
    condition: "Seminovo",
    price: 3400,
    oldPrice: 3700,
    discount: calcDiscount(3700, 3400),
    image: iphone15Pro,
    gallery: [iphone15Pro],
    category: "iPhone 15",
    description: "iPhone 15 Pro com chassi em titânio, chip A17 Pro e câmeras profissionais.",
    specs: baseSpecs("Tripla 48MP Pro", "Até 23h vídeo", "Apple A17 Pro"),
    rating: 5,
    reviews: 156,
    installments: 12,
  },
  {
    id: "iphone-15-plus",
    name: "iPhone 15 Plus",
    model: "iPhone 15 Plus",
    storage: "128GB",
    colors: ["Preto", "Verde", "Azul"],
    condition: "Seminovo",
    price: 3349,
    oldPrice: 3500,
    discount: calcDiscount(3500, 3349),
    image: iphone15Plus,
    gallery: [iphone15Plus],
    category: "iPhone 15",
    description: "Tela maior de 6,7 polegadas e bateria de longa duração.",
    specs: baseSpecs("Dupla 48MP", "Até 26h vídeo", "Apple A16 Bionic"),
    rating: 5,
    reviews: 89,
    installments: 12,
  },
  {
    id: "iphone-15",
    name: "iPhone 15",
    model: "iPhone 15",
    storage: "128GB",
    colors: ["Verde", "Rosa", "Azul", "Preto", "Amarelo"],
    condition: "Seminovo",
    price: 3099,
    oldPrice: 3350,
    discount: calcDiscount(3350, 3099),
    image: iphone15,
    gallery: [iphone15],
    category: "iPhone 15",
    description: "iPhone 15 com Dynamic Island e USB-C.",
    specs: baseSpecs("Dupla 48MP", "Até 20h vídeo", "Apple A16 Bionic"),
    rating: 5,
    reviews: 178,
    installments: 12,
  },

  // ============ iPhone 14 ============
  {
    id: "iphone-14-pro-max",
    name: "iPhone 14 Pro Max",
    model: "iPhone 14 Pro Max",
    storage: "128GB",
    colors: ["Roxo Profundo", "Preto Espacial", "Prata", "Dourado"],
    condition: "Seminovo",
    price: 2300,
    oldPrice: 2700,
    discount: calcDiscount(2700, 2300),
    image: iphone14ProMax,
    gallery: [iphone14ProMax],
    category: "iPhone 14",
    description: "iPhones 100% originais com peças de fábrica. Dynamic Island, câmeras Pro de 48MP e tela Always-On.",
    specs: baseSpecs("Tripla 48MP Pro", "Até 29h vídeo", "Apple A16 Bionic"),
    rating: 5,
    reviews: 312,
    installments: 12,
    featured: true,
  },
  {
    id: "iphone-14-pro",
    name: "iPhone 14 Pro",
    model: "iPhone 14 Pro",
    storage: "128GB",
    colors: ["Roxo Profundo", "Preto Espacial"],
    condition: "Seminovo",
    price: 2300,
    oldPrice: 2600,
    discount: calcDiscount(2600, 2300),
    image: iphone14Pro,
    gallery: [iphone14Pro],
    category: "iPhone 14",
    description: "Dynamic Island, câmeras Pro e desempenho excepcional.",
    specs: baseSpecs("Tripla 48MP Pro", "Até 23h vídeo", "Apple A16 Bionic"),
    rating: 5,
    reviews: 245,
    installments: 12,
    featured: true,
  },
  {
    id: "iphone-14-plus",
    name: "iPhone 14 Plus",
    model: "iPhone 14 Plus",
    storage: "128GB",
    colors: ["Estelar", "Roxo", "Azul"],
    condition: "Seminovo",
    price: 2150,
    oldPrice: 2400,
    discount: calcDiscount(2400, 2150),
    image: iphone14Plus,
    gallery: [iphone14Plus],
    category: "iPhone 14",
    description: "Tela grande de 6,7\" com bateria de longa duração.",
    specs: baseSpecs("Dupla 12MP", "Até 26h vídeo", "Apple A15 Bionic"),
    rating: 5,
    reviews: 112,
    installments: 12,
  },
  {
    id: "iphone-14",
    name: "iPhone 14",
    model: "iPhone 14",
    storage: "128GB",
    colors: ["Estelar", "Meia-noite", "Roxo", "Azul"],
    condition: "Seminovo",
    price: 1999,
    oldPrice: 2200,
    discount: calcDiscount(2200, 1999),
    image: iphone14,
    gallery: [iphone14],
    category: "iPhone 14",
    description: "Excelente custo-benefício com câmeras avançadas e bateria duradoura.",
    specs: baseSpecs("Dupla 12MP", "Até 20h vídeo", "Apple A15 Bionic"),
    rating: 5,
    reviews: 198,
    installments: 12,
  },

  // ============ iPhone 13 ============
  {
    id: "iphone-13-pro-max",
    name: "iPhone 13 Pro Max",
    model: "iPhone 13 Pro Max",
    storage: "128GB",
    colors: ["Grafite", "Prata", "Azul-Sierra"],
    condition: "Seminovo",
    price: 1900,
    oldPrice: 2200,
    discount: calcDiscount(2200, 1900),
    image: iphone13ProMax,
    gallery: [iphone13ProMax],
    category: "iPhone 13",
    description: "Tela grande, ProMotion e a melhor bateria da geração.",
    specs: baseSpecs("Tripla 12MP Pro", "Até 28h vídeo", "Apple A15 Bionic"),
    rating: 5,
    reviews: 203,
    installments: 12,
    featured: true,
  },
  {
    id: "iphone-13-pro",
    name: "iPhone 13 Pro",
    model: "iPhone 13 Pro",
    storage: "128GB",
    colors: ["Grafite", "Prata", "Azul-Sierra"],
    condition: "Seminovo",
    price: 1900,
    oldPrice: 2100,
    discount: calcDiscount(2100, 1900),
    image: iphone13Pro,
    gallery: [iphone13Pro],
    category: "iPhone 13",
    description: "ProMotion 120Hz e câmeras profissionais com modo Cinema.",
    specs: baseSpecs("Tripla 12MP Pro", "Até 22h vídeo", "Apple A15 Bionic"),
    rating: 5,
    reviews: 167,
    installments: 12,
  },
  {
    id: "iphone-13",
    name: "iPhone 13",
    model: "iPhone 13",
    storage: "128GB",
    colors: ["Estelar", "Meia-noite", "Vermelho", "Rosa"],
    condition: "Seminovo",
    price: 1599,
    oldPrice: 1800,
    discount: calcDiscount(1800, 1599),
    image: iphone13,
    gallery: [iphone13],
    category: "iPhone 13",
    description: "iPhone 13 com chip A15 e câmera dupla de 12MP.",
    specs: baseSpecs("Dupla 12MP", "Até 19h vídeo", "Apple A15 Bionic"),
    rating: 5,
    reviews: 287,
    installments: 12,
  },

  // ============ iPhone 12 / 11 ============
  {
    id: "iphone-12-pro-max",
    name: "iPhone 12 Pro Max",
    model: "iPhone 12 Pro Max",
    storage: "128GB",
    colors: ["Azul-Pacífico", "Grafite", "Prata", "Dourado"],
    condition: "Seminovo",
    price: 1799,
    oldPrice: 2000,
    discount: calcDiscount(2000, 1799),
    image: iphone12ProMax,
    gallery: [iphone12ProMax],
    category: "iPhone 12",
    description: "Câmeras Pro com LiDAR e tela Super Retina XDR.",
    specs: baseSpecs("Tripla 12MP + LiDAR", "Até 20h vídeo", "Apple A14 Bionic"),
    rating: 5,
    reviews: 234,
    installments: 12,
  },
  {
    id: "iphone-11",
    name: "iPhone 11",
    model: "iPhone 11",
    storage: "128GB",
    colors: ["Branco", "Preto", "Roxo", "Amarelo", "Vermelho"],
    condition: "Seminovo",
    price: 1199,
    oldPrice: 1400,
    discount: calcDiscount(1400, 1199),
    image: iphone11,
    gallery: [iphone11],
    category: "iPhone 11",
    description: "Excelente entrada para o universo Apple. Câmera dupla e bateria duradoura.",
    specs: baseSpecs("Dupla 12MP", "Até 17h vídeo", "Apple A13 Bionic"),
    rating: 5,
    reviews: 478,
    installments: 12,
    featured: true,
  },
];

export const FALLBACK_IMAGE = iphone16;

export const getProductById = (id: string) => {
  const p = products.find((prod) => prod.id === id);
  if (!p) return undefined;
  const image = p.image || FALLBACK_IMAGE;
  const gallery = p.gallery && p.gallery.length > 0 ? p.gallery : [image];
  return { ...p, image, gallery };
};

export const formatPrice = (price: number) =>
  price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const WHATSAPP_NUMBER = "5531975082558";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
export const buildWhatsAppLink = (text: string) =>
  `${WHATSAPP_LINK}?text=${encodeURIComponent(text)}`;
