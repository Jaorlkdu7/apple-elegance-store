import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({ meta: [{ title: "Perguntas frequentes — iPhones Premium" }] }),
  component: FaqPage,
});

const faqs = [
  { q: "Os iPhones são originais?", a: "Sim! Todos os nossos aparelhos são 100% originais, com peças de fábrica e procedência comprovada. Não trabalhamos com aparelhos de vitrine." },
  { q: "Qual a garantia oferecida?", a: "iPhones novos têm 1 ano de garantia oficial Apple. Seminovos contam com 3 meses de garantia da loja contra defeitos de fábrica." },
  { q: "Quais formas de pagamento aceitam?", a: "Aceitamos PIX (com 5% de desconto), cartão de crédito em até 12x sem juros e boleto bancário." },
  { q: "Vocês entregam para todo o Brasil?", a: "Sim! Enviamos para todo o território nacional via Correios (PAC e SEDEX) ou transportadora. O cálculo é feito pelo CEP." },
  { q: "Posso retirar na loja?", a: "Pode! Atendemos em Belo Horizonte/MG. Combine pelo WhatsApp e retire sem custo de frete." },
  { q: "E se o produto vier com defeito?", a: "Você tem 7 dias para arrependimento (devolução total) e até 90 dias de garantia para troca em caso de defeito. Faremos a coleta sem custo." },
  { q: "Como funciona o seminovo?", a: "Cada aparelho seminovo passa por revisão completa: bateria, tela, câmeras e conectores. Vendemos apenas em ótimo estado, sem riscos visíveis." },
  { q: "Posso parcelar no boleto?", a: "Não. O boleto é em parcela única. Para parcelar, utilize o cartão de crédito (até 12x sem juros)." },
  { q: "Em quanto tempo recebo?", a: "Pedidos aprovados até 14h são postados no mesmo dia. Os prazos variam de 1 a 8 dias úteis dependendo da modalidade escolhida." },
];

function FaqPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl font-bold">Perguntas frequentes</h1>
        <p className="text-muted-foreground mt-2">Tire suas dúvidas sobre compras, garantia e envio.</p>

        <Accordion type="single" collapsible className="mt-8 space-y-2">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`i-${i}`} className="border border-border rounded-xl px-4 bg-card shadow-card">
              <AccordionTrigger className="text-left font-semibold hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-foreground/80">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Layout>
  );
}
