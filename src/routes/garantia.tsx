import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { Shield, Award, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/garantia")({
  head: () => ({ meta: [{ title: "Garantia — iPhones Premium" }] }),
  component: GarantiaPage,
});

function GarantiaPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold">Garantia</h1>
        <p className="text-muted-foreground mt-2">Compre com a tranquilidade de uma loja especialista.</p>
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          {[
            { icon: Award, title: "1 ano — iPhones novos", text: "Cobertura oficial Apple para defeitos de fábrica." },
            { icon: Shield, title: "3 meses — Seminovos", text: "Garantia da loja em bateria, tela e funcionalidades." },
            { icon: RefreshCw, title: "7 dias para troca", text: "Direito de arrependimento garantido por lei." },
          ].map((b) => (
            <div key={b.title} className="bg-card border border-border rounded-2xl p-6 shadow-card">
              <div className="w-12 h-12 rounded-full bg-accent text-primary flex items-center justify-center mb-3">
                <b.icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold">{b.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
