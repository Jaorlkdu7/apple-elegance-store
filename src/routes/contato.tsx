import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { MapPin, Phone, Mail, MessageCircle, Clock } from "lucide-react";

export const Route = createFileRoute("/contato")({
  head: () => ({ meta: [{ title: "Contato — iPhones Premium" }] }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 grid md:grid-cols-2 gap-8">
        <div>
          <h1 className="text-4xl font-bold">Fale com a gente</h1>
          <p className="text-muted-foreground mt-2">Atendimento humano, rápido e sem robôs.</p>
          <ul className="mt-6 space-y-4">
            <Item icon={MessageCircle} title="WhatsApp" text="+55 (31) 97508-2558" href="https://wa.me/5531975082558" />
            <Item icon={Phone} title="Telefone" text="(31) 99119-5308" />
            <Item icon={Mail} title="E-mail" text="contato@iphonespremium.com" />
            <Item icon={MapPin} title="Endereço" text="Rua Capitão Antônio Joaquim da Paixão, 123 — Belo Horizonte/MG" />
            <Item icon={Clock} title="Horário" text="Segunda a Sábado, 9h às 19h" />
          </ul>
        </div>
        <form className="bg-card border border-border rounded-2xl p-6 shadow-card space-y-3 self-start">
          <h2 className="font-bold text-lg">Envie uma mensagem</h2>
          <input placeholder="Seu nome" className="w-full px-3 py-2.5 border border-input rounded-lg text-sm" />
          <input placeholder="E-mail" type="email" className="w-full px-3 py-2.5 border border-input rounded-lg text-sm" />
          <input placeholder="Telefone" className="w-full px-3 py-2.5 border border-input rounded-lg text-sm" />
          <textarea placeholder="Sua mensagem" rows={5} className="w-full px-3 py-2.5 border border-input rounded-lg text-sm" />
          <button type="button" className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:bg-primary-hover">
            Enviar mensagem
          </button>
        </form>
      </div>
    </Layout>
  );
}

function Item({ icon: Icon, title, text, href }: any) {
  const content = (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-full bg-accent text-primary flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="font-semibold text-sm">{title}</p>
        <p className="text-foreground/80">{text}</p>
      </div>
    </div>
  );
  return href ? <li><a href={href} target="_blank" rel="noreferrer" className="hover:text-primary">{content}</a></li> : <li>{content}</li>;
}
