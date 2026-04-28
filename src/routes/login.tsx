import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { useState } from "react";
import { Lock } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Entrar — iPhones Premium" }] }),
  component: LoginPage,
});

function LoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-md">
        <div className="bg-card border border-border rounded-2xl shadow-card p-8">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-full bg-accent text-primary flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center">
            {mode === "login" ? "Entrar na minha conta" : "Criar conta"}
          </h1>
          <p className="text-muted-foreground text-center text-sm mt-1">
            {mode === "login" ? "Acesse pedidos e ofertas exclusivas" : "Cadastre-se em menos de 1 minuto"}
          </p>

          <form className="mt-6 space-y-3">
            {mode === "register" && (
              <input placeholder="Nome completo" className="w-full px-4 py-3 border border-input rounded-lg text-sm" />
            )}
            <input placeholder="E-mail" type="email" className="w-full px-4 py-3 border border-input rounded-lg text-sm" />
            <input placeholder="Senha" type="password" className="w-full px-4 py-3 border border-input rounded-lg text-sm" />
            {mode === "register" && (
              <input placeholder="Confirmar senha" type="password" className="w-full px-4 py-3 border border-input rounded-lg text-sm" />
            )}
            <button type="button" className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:bg-primary-hover">
              {mode === "login" ? "Entrar" : "Criar conta"}
            </button>
          </form>

          <p className="text-sm text-center text-muted-foreground mt-5">
            {mode === "login" ? "Ainda não tem conta?" : "Já tem conta?"}{" "}
            <button onClick={() => setMode(mode === "login" ? "register" : "login")} className="text-primary font-semibold hover:underline">
              {mode === "login" ? "Cadastre-se" : "Entrar"}
            </button>
          </p>
          <p className="text-xs text-center text-muted-foreground mt-4">
            <Link to="/" className="hover:text-primary">← Voltar ao início</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
