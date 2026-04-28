import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";

export const Route = createFileRoute("/trocas")({
  head: () => ({ meta: [{ title: "Trocas e devoluções — iPhones Premium" }] }),
  component: TrocasPage,
});

function TrocasPage() {
  return (
    <Layout>
      <article className="container mx-auto px-4 py-12 max-w-3xl prose prose-slate">
        <h1 className="text-4xl font-bold">Política de Trocas e Devoluções</h1>
        <p className="text-muted-foreground mt-2">Sua tranquilidade é nossa prioridade.</p>

        <section className="mt-8 space-y-6 text-foreground/85 leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-primary">Direito de arrependimento (7 dias)</h2>
            <p>Conforme o Código de Defesa do Consumidor, você tem 7 dias corridos a partir do recebimento para desistir da compra. Reembolso integral via PIX, estorno do cartão ou novo boleto.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-primary">Garantia (3 meses a 1 ano)</h2>
            <p>iPhones novos: 1 ano de garantia Apple. Seminovos: 3 meses de garantia da loja, cobrindo defeitos de fábrica (bateria, tela, conectores e funcionalidades originais).</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-primary">Como solicitar</h2>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Entre em contato pelo WhatsApp em até 7 dias.</li>
              <li>Envie fotos/vídeo do problema (se for defeito).</li>
              <li>Faremos a coleta sem custo via Correios.</li>
              <li>Após análise (até 5 dias úteis), efetuamos a troca ou reembolso.</li>
            </ol>
          </div>
          <div>
            <h2 className="text-xl font-bold text-primary">Condições</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Aparelho na embalagem original e com todos os acessórios.</li>
              <li>Sem sinais de uso indevido, queda ou contato com líquidos.</li>
              <li>Sem bloqueio de iCloud ou conta vinculada.</li>
            </ul>
          </div>
        </section>
      </article>
    </Layout>
  );
}
