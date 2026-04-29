import { Link } from "@tanstack/react-router";
import { Shield, Truck, CreditCard, MessageCircle, Instagram, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="mt-16 bg-foreground text-background">
      <div className="border-b border-background/10">
        <div className="container mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Shield, title: "Compra Segura", text: "Site protegido com SSL" },
            { icon: Truck, title: "Entrega Rápida", text: "Para todo o Brasil" },
            { icon: CreditCard, title: "Parcelamos em 12x", text: "Cartão, PIX e Boleto" },
            { icon: MessageCircle, title: "Suporte WhatsApp", text: "Atendimento humano" },
          ].map((b) => (
            <div key={b.title} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary">
                <b.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">{b.title}</p>
                <p className="text-xs text-background/60">{b.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <img src={logo} alt="iPhones Premium" width={140} height={40} className="h-10 w-auto mb-4 brightness-0 invert" loading="lazy" />
          <p className="text-sm text-background/70 leading-relaxed">
            Especialistas em iPhones originais, novos e seminovos, com garantia e procedência comprovada.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="https://wa.me/5531975082558" className="w-9 h-9 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-colors" aria-label="WhatsApp">
              <MessageCircle className="w-4 h-4" />
            </a>
            <a href="https://instagram.com" className="w-9 h-9 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-colors" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm">Loja</h4>
          <ul className="space-y-2 text-sm text-background/70">
            <li><Link to="/catalogo" className="hover:text-primary">Catálogo</Link></li>
            <li><Link to="/ofertas" className="hover:text-primary">Ofertas</Link></li>
            <li><Link to="/contato" className="hover:text-primary">Contato</Link></li>
            <li><Link to="/login" className="hover:text-primary">Minha conta</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm">Ajuda</h4>
          <ul className="space-y-2 text-sm text-background/70">
            <li><Link to="/faq" className="hover:text-primary">Perguntas frequentes</Link></li>
            <li><Link to="/trocas" className="hover:text-primary">Trocas e devoluções</Link></li>
            <li><Link to="/garantia" className="hover:text-primary">Garantia</Link></li>
            <li><Link to="/privacidade" className="hover:text-primary">Política de privacidade</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm">Contato</h4>
          <ul className="space-y-2 text-sm text-background/70">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
              Rua Capitão Antônio Joaquim da Paixão, 123 — Belo Horizonte/MG
            </li>
            <li>📱 (31) 97508-2558</li>
            <li>✉ contato@iphonespremium.com</li>
            <li>🕒 Seg–Sáb 9h–19h</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-background/10 py-5 text-center text-xs text-background/60">
        © {new Date().getFullYear()} iPhones Premium • CNPJ 00.000.000/0001-00 • Todos os direitos reservados
      </div>
    </footer>
  );
}
