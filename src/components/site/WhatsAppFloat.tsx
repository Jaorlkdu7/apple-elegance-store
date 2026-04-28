import { MessageCircle } from "lucide-react";

export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/5531991195308?text=Olá!%20Tenho%20interesse%20em%20um%20iPhone."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-whatsapp text-white shadow-elegant flex items-center justify-center hover:scale-110 transition-transform"
      style={{ backgroundColor: "oklch(0.65 0.17 150)" }}
    >
      <MessageCircle className="w-7 h-7 fill-white" />
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-ping" />
    </a>
  );
}
