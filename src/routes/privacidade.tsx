import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";

export const Route = createFileRoute("/privacidade")({
  head: () => ({ meta: [{ title: "Política de Privacidade — iPhones Premium" }] }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <Layout>
      <article className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl font-bold">Política de Privacidade</h1>
        <div className="space-y-5 mt-6 text-foreground/85 leading-relaxed">
          <p>A iPhones Premium respeita a sua privacidade e está comprometida em proteger seus dados pessoais conforme a LGPD (Lei 13.709/2018).</p>
          <h2 className="text-xl font-bold text-primary mt-6">Dados coletados</h2>
          <p>Coletamos apenas os dados necessários para processar seu pedido: nome, CPF, e-mail, telefone e endereço de entrega.</p>
          <h2 className="text-xl font-bold text-primary mt-6">Uso dos dados</h2>
          <p>Utilizamos seus dados exclusivamente para emissão de nota fiscal, envio do produto, comunicação sobre o pedido e suporte pós-venda.</p>
          <h2 className="text-xl font-bold text-primary mt-6">Segurança</h2>
          <p>Todas as transações são criptografadas com SSL. Não armazenamos dados de cartão de crédito.</p>
          <h2 className="text-xl font-bold text-primary mt-6">Seus direitos</h2>
          <p>Você pode solicitar exclusão, correção ou exportação dos seus dados a qualquer momento pelo e-mail contato@iphonespremium.com.</p>
        </div>
      </article>
    </Layout>
  );
}
