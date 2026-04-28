import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { products } from "@/data/products";
import { Shield, Truck, CreditCard, Award, ArrowRight, Zap } from "lucide-react";
import heroImg from "@/assets/iphones-17.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "iPhones Premium — Loja oficial de iPhones novos e seminovos" },
      { name: "description", content: "iPhones novos e seminovos com garantia, parcelamento em 12x, PIX e entrega rápida. Procedência comprovada." },
      { property: "og:title", content: "iPhones Premium — Loja oficial" },
      { property: "og:description", content: "iPhones novos e seminovos com garantia. Parcele em 12x." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = products.filter((p) => p.featured);
  const recent = products.slice(0, 8);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero text-white">
        <div className="container mx-auto px-4 py-12 md:py-20 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-5">
            <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
              <Zap className="w-3 h-3" /> iPhone 17 já disponível
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
              O iPhone dos seus<br />sonhos está aqui.
            </h1>
            <p className="text-lg text-white/85 max-w-md">
              Aparelhos 100% originais, com garantia, parcelados em até 12x. Novos e seminovos com procedência.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/catalogo"
                className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-6 py-3 rounded-full hover:bg-white/90 transition-colors"
              >
                Ver catálogo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/ofertas"
                className="inline-flex items-center gap-2 border border-white/40 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition-colors"
              >
                Ofertas em destaque
              </Link>
            </div>
            <div className="flex gap-6 pt-4 text-sm">
              <div className="flex items-center gap-2"><Shield className="w-4 h-4" /> Garantia inclusa</div>
              <div className="flex items-center gap-2"><Truck className="w-4 h-4" /> Frete para todo Brasil</div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-white/10 rounded-3xl blur-3xl" />
            <img
              src={heroImg}
              alt="iPhones em destaque"
              className="relative rounded-3xl shadow-elegant w-full object-cover aspect-[4/3]"
              width={800}
              height={600}
            />
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-b border-border">
        <div className="container mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Shield, title: "100% Originais", desc: "Sem vitrine, com lacre" },
            { icon: CreditCard, title: "12x sem juros", desc: "Cartão, PIX ou boleto" },
            { icon: Truck, title: "Envio rápido", desc: "Postagem em 24h" },
            { icon: Award, title: "Garantia oficial", desc: "Até 1 ano" },
          ].map((b) => (
            <div key={b.title} className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
              <div className="w-11 h-11 rounded-full bg-accent text-primary flex items-center justify-center shrink-0">
                <b.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">{b.title}</p>
                <p className="text-xs text-muted-foreground">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">Em destaque</span>
            <h2 className="text-3xl font-bold mt-1">Ofertas Imperdíveis</h2>
          </div>
          <Link to="/ofertas" className="text-sm font-semibold text-primary hover:underline hidden sm:flex items-center gap-1">
            Ver todas <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Banner promo */}
      <section className="container mx-auto px-4 py-6">
        <div className="bg-gradient-primary text-white rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-sm font-semibold opacity-90 uppercase tracking-wider">Pague no PIX</p>
            <h3 className="text-2xl md:text-3xl font-bold mt-1">Ganhe 5% de desconto extra</h3>
            <p className="text-white/85 mt-2">Aprovação imediata e desconto aplicado direto no carrinho.</p>
          </div>
          <Link to="/catalogo" className="bg-white text-primary font-bold px-6 py-3 rounded-full whitespace-nowrap hover:bg-white/90">
            Aproveitar agora
          </Link>
        </div>
      </section>

      {/* All products */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">Catálogo</span>
            <h2 className="text-3xl font-bold mt-1">Todos os modelos</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {recent.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            to="/catalogo"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-full hover:bg-primary-hover transition-colors"
          >
            Ver catálogo completo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
