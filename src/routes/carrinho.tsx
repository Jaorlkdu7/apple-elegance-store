import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/data/products";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/carrinho")({
  head: () => ({ meta: [{ title: "Carrinho — iPhones Premium" }] }),
  component: CartPage,
});

function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground/40" />
          <h1 className="text-2xl font-bold mt-4">Seu carrinho está vazio</h1>
          <p className="text-muted-foreground mt-1">Que tal escolher um iPhone novinho?</p>
          <Link to="/catalogo" className="inline-block mt-6 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-full hover:bg-primary-hover">
            Ver catálogo
          </Link>
        </div>
      </Layout>
    );
  }

  const subtotal = total();
  const pixPrice = subtotal * 0.95;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Meu carrinho</h1>
        <div className="grid lg:grid-cols-[1fr_380px] gap-6">
          <div className="space-y-3">
            {items.map((it) => (
              <div key={it.product.id} className="bg-card rounded-xl border border-border p-4 flex gap-4 shadow-card">
                <Link to="/produto/$id" params={{ id: it.product.id }} className="shrink-0">
                  <img src={it.product.image} alt={it.product.name} className="w-24 h-24 object-cover rounded-lg" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to="/produto/$id" params={{ id: it.product.id }} className="font-semibold text-primary hover:underline">
                    {it.product.name}
                  </Link>
                  {it.color && <p className="text-xs text-muted-foreground">Cor: {it.color}</p>}
                  <p className="text-xs text-muted-foreground">{it.product.condition} • {it.product.storage}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-border rounded-lg">
                      <button onClick={() => updateQuantity(it.product.id, it.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-secondary">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{it.quantity}</span>
                      <button onClick={() => updateQuantity(it.product.id, it.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-secondary">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="font-bold text-price">{formatPrice(it.product.price * it.quantity)}</p>
                  </div>
                </div>
                <button onClick={() => removeItem(it.product.id)} aria-label="Remover" className="text-muted-foreground hover:text-destructive">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start bg-card rounded-2xl border border-border p-6 shadow-card space-y-3">
            <h2 className="font-bold text-lg">Resumo do pedido</h2>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm pb-3 border-b border-border">
              <span className="text-muted-foreground">No PIX (5% off)</span>
              <span className="font-semibold text-success">{formatPrice(pixPrice)}</span>
            </div>
            <div className="flex justify-between text-lg pt-2">
              <span className="font-bold">Total</span>
              <span className="font-bold text-price">{formatPrice(subtotal)}</span>
            </div>
            <p className="text-xs text-muted-foreground">em até 12x de {formatPrice(subtotal / 12)} sem juros</p>
            <Link to="/checkout" className="block w-full text-center bg-primary hover:bg-primary-hover text-primary-foreground font-bold py-3.5 rounded-xl mt-2">
              Finalizar compra
            </Link>
            <Link to="/catalogo" className="block text-center text-sm text-primary hover:underline">
              Continuar comprando
            </Link>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
