import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/data/products";
import { useState } from "react";
import { CreditCard, QrCode, FileText, Store, Truck, Lock, Check } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — iPhones Premium" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, total, clear } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<"info" | "delivery" | "payment">("info");
  const [delivery, setDelivery] = useState<"entrega" | "retirada">("entrega");
  const [payment, setPayment] = useState<"pix" | "cartao" | "boleto">("pix");
  const [installments, setInstallments] = useState(1);

  const subtotal = total();
  const pixDiscount = payment === "pix" ? subtotal * 0.05 : 0;
  const finalTotal = subtotal - pixDiscount;

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold">Carrinho vazio</h1>
          <Link to="/catalogo" className="text-primary underline">Ver produtos</Link>
        </div>
      </Layout>
    );
  }

  const submit = () => {
    toast.success("Pedido realizado com sucesso! Você receberá os dados por e-mail.");
    clear();
    setTimeout(() => navigate({ to: "/" }), 1500);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Finalizar compra</h1>
        <div className="flex items-center gap-2 text-sm text-success mb-6">
          <Lock className="w-4 h-4" /> Ambiente seguro com criptografia SSL
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-6">
          <div className="space-y-4">
            {/* Steps */}
            <div className="flex gap-2">
              {(["info", "delivery", "payment"] as const).map((s, i) => (
                <button
                  key={s}
                  onClick={() => setStep(s)}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold border-2 ${
                    step === s ? "border-primary bg-accent text-primary" : "border-border bg-card"
                  }`}
                >
                  {i + 1}. {s === "info" ? "Dados" : s === "delivery" ? "Entrega" : "Pagamento"}
                </button>
              ))}
            </div>

            {step === "info" && (
              <div className="bg-card rounded-2xl border border-border p-6 shadow-card space-y-4">
                <h2 className="font-bold">Seus dados</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field label="Nome completo" />
                  <Field label="CPF" placeholder="000.000.000-00" />
                  <Field label="E-mail" type="email" />
                  <Field label="Telefone" placeholder="(00) 00000-0000" />
                </div>
                <button onClick={() => setStep("delivery")} className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-xl">
                  Continuar
                </button>
              </div>
            )}

            {step === "delivery" && (
              <div className="bg-card rounded-2xl border border-border p-6 shadow-card space-y-4">
                <h2 className="font-bold">Como deseja receber?</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  <OptionCard active={delivery === "entrega"} onClick={() => setDelivery("entrega")} icon={Truck} title="Receber em casa" desc="Frete calculado pelo CEP" />
                  <OptionCard active={delivery === "retirada"} onClick={() => setDelivery("retirada")} icon={Store} title="Retirar na loja" desc="Grátis — BH/MG" />
                </div>
                {delivery === "entrega" && (
                  <div className="grid sm:grid-cols-3 gap-3 pt-3 border-t border-border">
                    <Field label="CEP" placeholder="00000-000" />
                    <div className="sm:col-span-2"><Field label="Endereço" /></div>
                    <Field label="Número" />
                    <div className="sm:col-span-2"><Field label="Complemento" /></div>
                    <Field label="Bairro" />
                    <Field label="Cidade" />
                    <Field label="UF" />
                  </div>
                )}
                <button onClick={() => setStep("payment")} className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-xl">
                  Continuar para pagamento
                </button>
              </div>
            )}

            {step === "payment" && (
              <div className="bg-card rounded-2xl border border-border p-6 shadow-card space-y-4">
                <h2 className="font-bold">Forma de pagamento</h2>
                <div className="grid sm:grid-cols-3 gap-3">
                  <OptionCard active={payment === "pix"} onClick={() => setPayment("pix")} icon={QrCode} title="PIX" desc="5% de desconto" badge="Recomendado" />
                  <OptionCard active={payment === "cartao"} onClick={() => setPayment("cartao")} icon={CreditCard} title="Cartão" desc="Em até 12x" />
                  <OptionCard active={payment === "boleto"} onClick={() => setPayment("boleto")} icon={FileText} title="Boleto" desc="Aprovação em 1-2 dias" />
                </div>

                {payment === "cartao" && (
                  <div className="space-y-3 pt-3 border-t border-border">
                    <div className="grid sm:grid-cols-2 gap-3">
                      <Field label="Número do cartão" placeholder="0000 0000 0000 0000" />
                      <Field label="Nome impresso" />
                      <Field label="Validade" placeholder="MM/AA" />
                      <Field label="CVV" placeholder="000" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground mb-1 block">Parcelas</label>
                      <select value={installments} onChange={(e) => setInstallments(+e.target.value)} className="w-full px-3 py-2 border border-input rounded-lg text-sm">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}x de {formatPrice(subtotal / (i + 1))} sem juros
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {payment === "pix" && (
                  <div className="bg-success/10 text-success-foreground border border-success/30 rounded-lg p-4 text-sm">
                    <p className="font-semibold flex items-center gap-2 text-success"><Check className="w-4 h-4" /> Pague no PIX e ganhe 5% de desconto!</p>
                    <p className="text-foreground/70 mt-1">Após confirmar, você receberá o QR Code para pagamento imediato.</p>
                  </div>
                )}

                <button onClick={submit} className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-bold py-3.5 rounded-xl">
                  Finalizar pedido — {formatPrice(finalTotal)}
                </button>
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start bg-card rounded-2xl border border-border p-6 shadow-card space-y-3">
            <h2 className="font-bold">Resumo</h2>
            {items.map((it) => (
              <div key={it.product.id} className="flex gap-3 text-sm">
                <img src={it.product.image} alt="" className="w-12 h-12 rounded object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{it.product.name}</p>
                  <p className="text-xs text-muted-foreground">Qtd: {it.quantity}</p>
                </div>
                <p className="font-semibold">{formatPrice(it.product.price * it.quantity)}</p>
              </div>
            ))}
            <div className="border-t border-border pt-3 space-y-1 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              {pixDiscount > 0 && (
                <div className="flex justify-between text-success"><span>Desconto PIX</span><span>-{formatPrice(pixDiscount)}</span></div>
              )}
              <div className="flex justify-between"><span className="text-muted-foreground">Frete</span><span>{delivery === "retirada" ? "Grátis" : "A calcular"}</span></div>
              <div className="flex justify-between text-lg font-bold pt-2"><span>Total</span><span className="text-price">{formatPrice(finalTotal)}</span></div>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}

function Field({ label, type = "text", placeholder }: { label: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="text-xs font-semibold text-muted-foreground mb-1 block">{label}</label>
      <input type={type} placeholder={placeholder} className="w-full px-3 py-2 border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
    </div>
  );
}

function OptionCard({
  active, onClick, icon: Icon, title, desc, badge,
}: { active: boolean; onClick: () => void; icon: any; title: string; desc: string; badge?: string }) {
  return (
    <button
      onClick={onClick}
      className={`relative text-left p-4 rounded-xl border-2 transition-all ${
        active ? "border-primary bg-accent" : "border-border hover:border-primary/40"
      }`}
    >
      {badge && <span className="absolute -top-2 right-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded">{badge}</span>}
      <Icon className={`w-5 h-5 mb-2 ${active ? "text-primary" : "text-muted-foreground"}`} />
      <p className={`font-semibold text-sm ${active ? "text-primary" : ""}`}>{title}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
    </button>
  );
}
