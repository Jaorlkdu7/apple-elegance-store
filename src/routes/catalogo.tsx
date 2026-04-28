import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { categories, products } from "@/data/products";
import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";

export const Route = createFileRoute("/catalogo")({
  head: () => ({
    meta: [
      { title: "Catálogo de iPhones — iPhones Premium" },
      { name: "description", content: "Veja todos os modelos de iPhone disponíveis: iPhone 11, 12, 13, 14, 15, 16 e 17. Novos e seminovos com garantia." },
    ],
  }),
  component: CatalogPage,
});

function CatalogPage() {
  const [cat, setCat] = useState("Todos");
  const [sort, setSort] = useState("relevance");

  const filtered = useMemo(() => {
    let list = [...products];
    if (cat === "Seminovos") list = list.filter((p) => p.condition === "Seminovo");
    else if (cat !== "Todos") list = list.filter((p) => p.category === cat);
    if (sort === "asc") list.sort((a, b) => a.price - b.price);
    if (sort === "desc") list.sort((a, b) => b.price - a.price);
    if (sort === "discount") list.sort((a, b) => b.discount - a.discount);
    return list;
  }, [cat, sort]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold">Catálogo</h1>
          <p className="text-muted-foreground mt-1">Todos os iPhones disponíveis para compra imediata.</p>
        </div>

        <div className="grid lg:grid-cols-[240px_1fr] gap-6">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start space-y-5">
            <div className="bg-card rounded-xl border border-border p-4 shadow-card">
              <h3 className="text-xs font-bold text-primary uppercase mb-3 tracking-wider">Categorias</h3>
              <ul className="space-y-1">
                {categories.map((c) => (
                  <li key={c}>
                    <button
                      onClick={() => setCat(c)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        cat === c ? "bg-accent text-accent-foreground font-semibold" : "hover:bg-secondary"
                      }`}
                    >
                      {c}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card rounded-xl border border-border p-4 shadow-card">
              <h3 className="text-xs font-bold text-primary uppercase mb-3 tracking-wider">Entre em contato</h3>
              <ul className="space-y-2 text-sm">
                <li>📱 (31) 99119-5308</li>
                <li>📍 BH/MG</li>
                <li>🕒 Seg–Sáb 9h–19h</li>
              </ul>
            </div>
          </aside>

          {/* Grid */}
          <div>
            <div className="flex items-center justify-between mb-4 bg-card rounded-xl border border-border p-3">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{filtered.length}</span> produtos
              </p>
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="text-sm bg-transparent border border-border rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="relevance">Relevância</option>
                  <option value="asc">Menor preço</option>
                  <option value="desc">Maior preço</option>
                  <option value="discount">Maior desconto</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
