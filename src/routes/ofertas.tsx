import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { products } from "@/data/products";
import { Flame } from "lucide-react";

export const Route = createFileRoute("/ofertas")({
  head: () => ({ meta: [{ title: "Ofertas — iPhones Premium" }] }),
  component: OfertasPage,
});

function OfertasPage() {
  const ofertas = [...products].sort((a, b) => b.discount - a.discount).slice(0, 12);
  return (
    <Layout>
      <section className="bg-gradient-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider opacity-90">
            <Flame className="w-4 h-4" /> Ofertas relâmpago
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mt-2">Os melhores descontos</h1>
          <p className="text-white/85 mt-2 max-w-xl">Aproveite as ofertas exclusivas em iPhones novos e seminovos. Estoque limitado.</p>
        </div>
      </section>
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {ofertas.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </Layout>
  );
}
