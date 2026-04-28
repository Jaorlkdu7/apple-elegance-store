import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { getProductById, formatPrice, products, FALLBACK_IMAGE } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";
import { useCart } from "@/store/cart";
import { useState } from "react";
import { Star, Shield, Truck, CreditCard, RefreshCw, MessageCircle, Check, ChevronRight } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/produto/$id")({
  loader: ({ params }) => {
    const product = getProductById(params.id);
    if (!product) throw notFound();
    return { product } as const;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — iPhones Premium` },
          { name: "description", content: loaderData.product.description.slice(0, 160) },
          { property: "og:title", content: `${loaderData.product.name} — iPhones Premium` },
          { property: "og:description", content: loaderData.product.description.slice(0, 160) },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <Layout>
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold">Produto não encontrado</h1>
        <Link to="/catalogo" className="text-primary underline mt-4 inline-block">Voltar ao catálogo</Link>
      </div>
    </Layout>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: NonNullable<ReturnType<typeof getProductById>> };
  const addItem = useCart((s) => s.addItem);
  const [color, setColor] = useState(product.colors[0]);
  const [storage, setStorage] = useState(product.storage);
  const [activeImg, setActiveImg] = useState(0);
  const [cep, setCep] = useState("");
  const [shipping, setShipping] = useState<{ days: string; price: string }[] | null>(null);
  const [shippingLoading, setShippingLoading] = useState(false);

  const calcShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (cep.replace(/\D/g, "").length !== 8) {
      toast.error("Informe um CEP válido (8 dígitos)");
      return;
    }
    setShippingLoading(true);
    setTimeout(() => {
      setShipping([
        { days: "PAC — 5 a 8 dias úteis", price: formatPrice(34.9) },
        { days: "SEDEX — 2 a 3 dias úteis", price: formatPrice(58.9) },
        { days: "Expresso — 1 dia útil", price: formatPrice(89.9) },
      ]);
      setShippingLoading(false);
    }, 700);
  };

  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-5">
          <Link to="/" className="hover:text-primary">Início</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/catalogo" className="hover:text-primary">Catálogo</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground font-medium">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-[1fr_420px] gap-8">
          {/* Gallery */}
          <div>
            <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-card">
              <div className="relative aspect-square bg-secondary">
                {product.discount > 0 && (
                  <span className="absolute top-3 left-3 bg-discount text-discount-foreground text-sm font-bold px-3 py-1 rounded z-10">
                    -{product.discount}%
                  </span>
                )}
                <img
                  src={product.gallery[activeImg] ?? FALLBACK_IMAGE}
                  alt={product.name}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE; }}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.gallery.length > 1 && (
                <div className="flex gap-2 p-3 border-t border-border">
                  {product.gallery.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                        i === activeImg ? "border-primary" : "border-border"
                      }`}
                    >
                      <img src={img} alt="" onError={(e) => { (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE; }} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mt-6 bg-card rounded-2xl border border-border p-6 shadow-card">
              <h2 className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Descrição</h2>
              <p className="text-foreground/85 leading-relaxed whitespace-pre-line">{product.description}</p>

              <h3 className="text-sm font-semibold mt-6 mb-3">Especificações</h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.specs.map((s) => (
                  <div key={s.label} className="flex justify-between text-sm py-2 border-b border-border">
                    <dt className="text-muted-foreground">{s.label}</dt>
                    <dd className="font-medium">{s.value}</dd>
                  </div>
                ))}
              </dl>

              <a
                href={`https://wa.me/5531991195308?text=${encodeURIComponent(`Olá! Tenho dúvidas sobre o ${product.name}`)}`}
                target="_blank"
                rel="noreferrer"
                className="mt-6 flex items-center gap-2 bg-secondary hover:bg-accent rounded-lg p-3 text-sm transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-primary" />
                Dúvidas sobre o produto? Entre em contato pelo <span className="font-bold underline">WhatsApp</span>
              </a>
            </div>

            {/* Reviews */}
            <div className="mt-6 bg-card rounded-2xl border border-border p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-bold text-primary uppercase tracking-wider">Avaliações</h2>
                <div className="flex items-center gap-1.5">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < product.rating ? "fill-warning text-warning" : "text-muted"}`} />
                    ))}
                  </div>
                  <span className="text-sm font-semibold">{product.rating.toFixed(1)}</span>
                  <span className="text-xs text-muted-foreground">({product.reviews} avaliações)</span>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { name: "Carlos M.", text: "Aparelho perfeito, exatamente como descrito. Entrega super rápida!", stars: 5 },
                  { name: "Ana P.", text: "Comprei seminovo e veio impecável. Recomendo demais!", stars: 5 },
                  { name: "Rafael S.", text: "Atendimento nota 10. Tiraram todas minhas dúvidas pelo WhatsApp.", stars: 5 },
                ].map((r) => (
                  <div key={r.name} className="border-b border-border pb-4 last:border-b-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm">{r.name}</span>
                      <div className="flex">
                        {Array.from({ length: r.stars }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-warning text-warning" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-foreground/80">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Buy box */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
            <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
              <p className="text-xs font-bold text-primary uppercase tracking-wider">{product.model}</p>
              <h1 className="text-2xl font-bold mt-1 leading-tight">{product.name}</h1>

              <div className="flex items-center gap-2 mt-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < product.rating ? "fill-warning text-warning" : "text-muted"}`} />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">({product.reviews})</span>
                <span className="ml-auto text-xs font-semibold px-2 py-0.5 rounded bg-accent text-accent-foreground">
                  {product.condition}
                </span>
              </div>

              <div className="mt-5 pt-5 border-t border-border">
                <p className="text-sm text-muted-foreground line-through">{formatPrice(product.oldPrice)}</p>
                <p className="text-4xl font-bold text-price leading-none mt-1">{formatPrice(product.price)}</p>
                <p className="text-sm text-success font-semibold mt-1">
                  ou {formatPrice(product.price * 0.95)} no PIX (5% off)
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  em até <strong>{product.installments}x</strong> de {formatPrice(product.price / product.installments)} sem juros
                </p>
              </div>

              {/* Color */}
              <div className="mt-5">
                <p className="text-sm font-semibold mb-2">
                  Cor: <span className="text-muted-foreground font-normal">{color}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className={`px-3 py-1.5 text-xs rounded-full border-2 transition-colors ${
                        color === c ? "border-primary bg-accent text-primary font-semibold" : "border-border hover:border-primary/50"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Storage */}
              <div className="mt-4">
                <p className="text-sm font-semibold mb-2">Armazenamento</p>
                <div className="flex gap-2">
                  {["64GB", "128GB", "256GB", "512GB"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setStorage(s)}
                      className={`flex-1 px-3 py-2 text-xs rounded-lg border-2 transition-colors ${
                        storage === s ? "border-primary bg-accent text-primary font-semibold" : "border-border hover:border-primary/50"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 space-y-2">
                <button
                  onClick={() => {
                    addItem(product, color);
                    toast.success("Adicionado ao carrinho");
                  }}
                  className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-bold py-3.5 rounded-xl transition-colors"
                >
                  Adicionar ao carrinho
                </button>
                <Link
                  to="/checkout"
                  onClick={() => addItem(product, color)}
                  className="w-full block text-center bg-foreground text-background hover:opacity-90 font-bold py-3.5 rounded-xl transition-opacity"
                >
                  Comprar agora ⚡
                </Link>
              </div>

              {/* Trust */}
              <ul className="mt-5 pt-5 border-t border-border space-y-2 text-xs">
                {[
                  { icon: Shield, text: "Garantia de 1 ano contra defeitos de fábrica" },
                  { icon: RefreshCw, text: "7 dias para troca ou devolução" },
                  { icon: Truck, text: "Entrega segura para todo o Brasil" },
                  { icon: CreditCard, text: "Pague no cartão, PIX ou boleto" },
                ].map((b) => (
                  <li key={b.text} className="flex items-start gap-2">
                    <b.icon className="w-4 h-4 text-success shrink-0 mt-0.5" />
                    <span>{b.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Shipping */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
              <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-3">Calcular frete e prazo</h3>
              <form onSubmit={calcShipping} className="flex gap-2">
                <input
                  type="text"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  placeholder="00000-000"
                  maxLength={9}
                  className="flex-1 px-3 py-2 border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  type="submit"
                  disabled={shippingLoading}
                  className="bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-lg hover:bg-primary-hover disabled:opacity-50"
                >
                  {shippingLoading ? "..." : "Calcular"}
                </button>
              </form>
              {shipping && (
                <ul className="mt-3 space-y-2 text-sm">
                  {shipping.map((s) => (
                    <li key={s.days} className="flex justify-between border-b border-border pb-2 last:border-b-0">
                      <span className="text-muted-foreground">{s.days}</span>
                      <span className="font-semibold">{s.price}</span>
                    </li>
                  ))}
                  <li className="flex items-center gap-2 text-success font-semibold pt-1">
                    <Check className="w-4 h-4" /> Retirada grátis na loja (BH/MG)
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-5">Você também pode gostar</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
