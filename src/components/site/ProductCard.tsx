import { Link } from "@tanstack/react-router";
import { Plus, Star } from "lucide-react";
import { type Product, formatPrice, FALLBACK_IMAGE } from "@/data/products";
import { useCart } from "@/store/cart";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((s) => s.addItem);

  return (
    <div className="group relative bg-card rounded-xl border border-border shadow-card hover:shadow-card-hover transition-all overflow-hidden flex flex-col">
      <Link to="/produto/$id" params={{ id: product.id }} className="block relative">
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <img
            src={product.image || FALLBACK_IMAGE}
            alt={product.name}
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE; }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {product.discount > 0 && (
            <span className="absolute top-2 left-2 bg-discount text-discount-foreground text-xs font-bold px-2 py-1 rounded">
              -{product.discount}%
            </span>
          )}
          {product.condition === "Novo" && (
            <span className="absolute top-2 right-2 bg-success text-success-foreground text-[10px] font-bold px-2 py-0.5 rounded uppercase">
              Novo
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            addItem(product);
            toast.success(`${product.name} adicionado ao carrinho`);
          }}
          aria-label="Adicionar ao carrinho"
          className="absolute right-3 top-[calc(100%-3.5rem)] sm:top-[calc(100%-3.5rem)] w-11 h-11 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary-hover transition-colors z-10"
          style={{ transform: "translateY(-50%)" }}
        >
          <Plus className="w-5 h-5" />
        </button>
      </Link>

      <div className="p-4 pt-3 flex flex-col flex-1">
        <Link to="/produto/$id" params={{ id: product.id }}>
          <h3 className="text-sm font-semibold text-center text-primary leading-snug line-clamp-2 hover:underline min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-center gap-1 mt-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`w-3 h-3 ${i < product.rating ? "fill-warning text-warning" : "text-muted"}`} />
          ))}
          <span className="text-[10px] text-muted-foreground ml-1">({product.reviews})</span>
        </div>

        <div className="mt-auto pt-3 text-center">
          <p className="text-xs text-muted-foreground line-through">
            {formatPrice(product.oldPrice)}
          </p>
          <p className="text-lg font-bold text-price">
            {formatPrice(product.price)}
          </p>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            ou {product.installments}x de {formatPrice(product.price / product.installments)}
          </p>
        </div>
      </div>
    </div>
  );
}
