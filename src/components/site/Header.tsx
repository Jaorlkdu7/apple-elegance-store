import { Link } from "@tanstack/react-router";
import { ShoppingCart, Search, Menu, Phone } from "lucide-react";
import { useCart } from "@/store/cart";
import logo from "@/assets/logo.png";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const nav = [
  { to: "/", label: "Início" },
  { to: "/catalogo", label: "Catálogo" },
  { to: "/ofertas", label: "Ofertas" },
  { to: "/faq", label: "FAQ" },
  { to: "/contato", label: "Contato" },
];

export function Header() {
  const count = useCart((s) => s.count());
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="bg-primary text-primary-foreground py-1.5 text-xs">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <span className="hidden sm:inline">✅ iPhones originais com garantia • Pagamento via PIX</span>
          <a href="https://wa.me/553175082558" className="flex items-center gap-1.5 hover:underline">
            <Phone className="w-3 h-3" /> (31) 97508-2558
          </a>
        </div>
      </div>

      <div className="container mx-auto px-4 h-16 flex items-center gap-4">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="md:hidden p-2" aria-label="Menu">
            <Menu className="w-6 h-6" />
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <nav className="mt-8 flex flex-col gap-1">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 rounded-lg hover:bg-secondary font-medium"
                  activeProps={{ className: "px-4 py-3 rounded-lg bg-accent text-accent-foreground font-semibold" }}
                >
                  {n.label}
                </Link>
              ))}
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-lg hover:bg-secondary font-medium mt-4 border-t pt-4"
              >
                Entrar / Cadastrar
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="iPhones Premium" width={140} height={40} className="h-10 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-1 ml-6">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              activeProps={{ className: "px-3 py-2 text-sm font-semibold text-primary" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex flex-1 max-w-md mx-auto">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Buscar iPhone..."
              className="w-full pl-9 pr-4 h-10 rounded-full border border-input bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Link to="/login" className="hidden sm:block px-3 py-2 text-sm font-medium hover:text-primary">
            Entrar
          </Link>
          <Link
            to="/carrinho"
            className="relative p-2.5 rounded-full hover:bg-secondary transition-colors"
            aria-label="Carrinho"
          >
            <ShoppingCart className="w-5 h-5" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
