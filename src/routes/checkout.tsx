import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { useCart } from "@/store/cart";
import { formatPrice, buildWhatsAppLink } from "@/data/products";
import { useMemo, useState } from "react";
import { QrCode, Store, Truck, Lock, Check, Copy, MessageCircle, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — iPhones Premium" }] }),
  component: CheckoutPage,
});

type FormState = {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  cep: string;
  address: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  state: string;
};

const initialForm: FormState = {
  name: "", cpf: "", email: "", phone: "",
  cep: "", address: "", number: "", complement: "",
  district: "", city: "", state: "",
};

const PIX_KEY = "00020101021126580014br.gov.bcb.pix013622866713-d87f-44f9-a788-35312a9ef36a5204000053039865802BR5916BRUNO G M JUNIOR6008CONTAGEM62070503***63045D85";

function CheckoutPage() {
  const { items, total, clear } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [delivery, setDelivery] = useState<"entrega" | "retirada">("entrega");
  const [form, setForm] = useState<FormState>(initialForm);
  const [confirmed, setConfirmed] = useState(false);
  const [pixPaid, setPixPaid] = useState(false);

  const subtotal = total();
  const pixDiscount = subtotal * 0.05;
  const finalTotal = subtotal - pixDiscount;

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const validateStep1 = () => {
    if (!form.name.trim()) return "Informe seu nome.";
    if (form.cpf.replace(/\D/g, "").length !== 11) return "CPF inválido.";
    if (!/\S+@\S+\.\S+/.test(form.email)) return "E-mail inválido.";
    if (form.phone.replace(/\D/g, "").length < 10) return "Telefone inválido.";
    return null;
  };
  const validateStep2 = () => {
    if (delivery === "retirada") return null;
    if (form.cep.replace(/\D/g, "").length !== 8) return "CEP inválido.";
    if (!form.address.trim()) return "Endereço obrigatório.";
    if (!form.number.trim()) return "Número obrigatório.";
    if (!form.city.trim() || !form.state.trim()) return "Cidade e UF obrigatórios.";
    return null;
  };

  const goStep2 = () => {
    const err = validateStep1();
    if (err) return toast.error(err);
    setStep(2);
  };
  const goStep3 = () => {
    const err = validateStep2();
    if (err) return toast.error(err);
    setStep(3);
  };

  const orderText = useMemo(() => {
    const list = items.map((it) => `• ${it.product.name} (x${it.quantity}) — ${formatPrice(it.product.price * it.quantity)}`).join("\n");
    const addr = delivery === "retirada"
      ? "Retirada na loja"
      : `${form.address}, ${form.number}${form.complement ? " - " + form.complement : ""}\n${form.district} - ${form.city}/${form.state}\nCEP: ${form.cep}`;
    return `*NOVO PEDIDO — iPhones Premium*\n\n*Cliente:* ${form.name}\n*CPF:* ${form.cpf}\n*E-mail:* ${form.email}\n*Telefone:* ${form.phone}\n\n*Itens:*\n${list}\n\n*Subtotal:* ${formatPrice(subtotal)}\n*Desconto PIX (5%):* -${formatPrice(pixDiscount)}\n*Total:* ${formatPrice(finalTotal)}\n\n*Entrega:*\n${addr}\n\nPagamento: PIX`;
  }, [items, form, delivery, subtotal, pixDiscount, finalTotal]);

  const cepLookup = async () => {
    const cep = form.cep.replace(/\D/g, "");
    if (cep.length !== 8) return;
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();
      if (data.erro) return toast.error("CEP não encontrado.");
      setForm((f) => ({
        ...f,
        address: data.logradouro || f.address,
        district: data.bairro || f.district,
        city: data.localidade || f.city,
        state: data.uf || f.state,
      }));
      toast.success("Endereço preenchido automaticamente.");
    } catch {
      toast.error("Não foi possível buscar o CEP.");
    }
  };

  const copyPix = () => {
    navigator.clipboard.writeText(PIX_KEY);
    toast.success("Chave PIX copiada!");
  };

  const sendWhatsApp = () => {
    window.open(buildWhatsAppLink(orderText), "_blank");
  };

  const finishOrder = () => {
    setConfirmed(true);
    toast.success("Pedido registrado! Aguarde nosso contato.");
    setTimeout(() => {
      clear();
      navigate({ to: "/" });
    }, 2500);
  };

  if (items.length === 0 && !confirmed) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-2">Seu carrinho está vazio</h1>
          <p className="text-muted-foreground mb-6">Adicione produtos para finalizar a compra.</p>
          <Link to="/catalogo" className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold">Ver produtos</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Finalizar compra</h1>
        <div className="flex items-center gap-2 text-sm text-success mb-6">
          <Lock className="w-4 h-4" /> Ambiente seguro com criptografia SSL
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-6">
          <div className="space-y-4">
            {/* Progress */}
            <div className="flex gap-2">
              {[1, 2, 3].map((n) => {
                const labels = ["Dados", "Entrega", "Pagamento"];
                const active = step === n;
                const done = step > n;
                return (
                  <button
                    key={n}
                    onClick={() => (done ? setStep(n as 1 | 2 | 3) : null)}
                    className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold border-2 flex items-center justify-center gap-2 ${
                      active ? "border-primary bg-accent text-primary"
                      : done ? "border-success/40 bg-success/10 text-success"
                      : "border-border bg-card text-muted-foreground"
                    }`}
                  >
                    {done ? <Check className="w-4 h-4" /> : <span>{n}.</span>} {labels[n - 1]}
                  </button>
                );
              })}
            </div>

            {/* Step 1 — Dados */}
            {step === 1 && (
              <div className="bg-card rounded-2xl border border-border p-6 shadow-card space-y-4">
                <h2 className="font-bold text-lg">Seus dados</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field label="Nome completo" value={form.name} onChange={set("name")} />
                  <Field label="CPF" placeholder="000.000.000-00" value={form.cpf} onChange={set("cpf")} />
                  <Field label="E-mail" type="email" value={form.email} onChange={set("email")} />
                  <Field label="Telefone" placeholder="(00) 00000-0000" value={form.phone} onChange={set("phone")} />
                </div>
                <button onClick={goStep2} className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-semibold py-3 rounded-xl transition-colors">
                  Continuar para entrega
                </button>
              </div>
            )}

            {/* Step 2 — Entrega */}
            {step === 2 && (
              <div className="bg-card rounded-2xl border border-border p-6 shadow-card space-y-4">
                <h2 className="font-bold text-lg">Como deseja receber?</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  <OptionCard active={delivery === "entrega"} onClick={() => setDelivery("entrega")} icon={Truck} title="Receber em casa" desc="Combine entrega pelo WhatsApp" />
                  <OptionCard active={delivery === "retirada"} onClick={() => setDelivery("retirada")} icon={Store} title="Retirar na loja" desc="Grátis — BH/MG" />
                </div>
                {delivery === "entrega" && (
                  <div className="grid sm:grid-cols-3 gap-3 pt-3 border-t border-border">
                    <div className="sm:col-span-1 flex gap-2 items-end">
                      <div className="flex-1"><Field label="CEP" placeholder="00000-000" value={form.cep} onChange={set("cep")} /></div>
                      <button type="button" onClick={cepLookup} className="px-3 py-2 bg-accent text-primary border border-primary/30 rounded-lg text-sm font-semibold whitespace-nowrap">Buscar</button>
                    </div>
                    <div className="sm:col-span-2"><Field label="Endereço" value={form.address} onChange={set("address")} /></div>
                    <Field label="Número" value={form.number} onChange={set("number")} />
                    <div className="sm:col-span-2"><Field label="Complemento" value={form.complement} onChange={set("complement")} /></div>
                    <Field label="Bairro" value={form.district} onChange={set("district")} />
                    <Field label="Cidade" value={form.city} onChange={set("city")} />
                    <Field label="UF" value={form.state} onChange={set("state")} />
                  </div>
                )}
                <div className="flex gap-2">
                  <button onClick={() => setStep(1)} className="px-5 py-3 rounded-xl border border-border font-semibold">Voltar</button>
                  <button onClick={goStep3} className="flex-1 bg-primary hover:bg-primary-hover text-primary-foreground font-semibold py-3 rounded-xl transition-colors">
                    Continuar para pagamento
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 — Pagamento PIX */}
            {step === 3 && !confirmed && (
              <div className="bg-card rounded-2xl border border-border p-6 shadow-card space-y-4">
                <h2 className="font-bold text-lg">Pagamento via PIX</h2>

                <div className="rounded-xl border-2 border-primary bg-accent p-4 flex items-start gap-4">
                  <QrCode className="w-10 h-10 text-primary shrink-0" />
                  <div className="flex-1">
                    <p className="font-bold text-primary flex items-center gap-2"><Check className="w-4 h-4" /> 5% de desconto no PIX</p>
                    <p className="text-sm text-foreground/70 mt-1">Pagamento confirmado em poucos segundos. Após o envio do comprovante, processamos seu pedido imediatamente.</p>
                  </div>
                </div>

                <div className="bg-muted/40 rounded-xl p-4 space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold">PIX COPIA E COLA</p>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="flex-1 bg-card border border-border rounded-lg px-3 py-2 text-xs font-mono break-all max-h-24 overflow-auto">{PIX_KEY}</code>
                      <button onClick={copyPix} className="px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold flex items-center gap-1.5">
                        <Copy className="w-4 h-4" /> Copiar
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><p className="text-muted-foreground text-xs">Beneficiário</p><p className="font-semibold">Bruno G M Junior</p></div>
                    <div><p className="text-muted-foreground text-xs">Valor a pagar</p><p className="font-bold text-price text-base">{formatPrice(finalTotal)}</p></div>
                  </div>
                </div>

                <div className="bg-success/10 border border-success/30 text-foreground rounded-xl p-4 text-sm space-y-2">
                  <p className="font-semibold text-success flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Como funciona</p>
                  <ol className="list-decimal pl-5 space-y-1 text-foreground/80">
                    <li>Realize o PIX com o valor exato exibido acima.</li>
                    <li>Envie o comprovante pelo WhatsApp clicando no botão abaixo.</li>
                    <li>Confirmamos o pagamento e iniciamos a separação do seu pedido.</li>
                  </ol>
                </div>

                <button onClick={sendWhatsApp} className="w-full bg-[oklch(0.65_0.17_150)] hover:opacity-90 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-opacity">
                  <MessageCircle className="w-5 h-5" /> Enviar pedido pelo WhatsApp
                </button>

                <button onClick={finishOrder} className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-bold py-3.5 rounded-xl transition-colors">
                  Confirmar pedido — {formatPrice(finalTotal)}
                </button>

                <button onClick={() => setStep(2)} className="w-full text-sm text-muted-foreground hover:text-foreground">← Voltar para entrega</button>
              </div>
            )}

            {confirmed && (
              <div className="bg-card rounded-2xl border border-success/30 p-8 shadow-card text-center space-y-3">
                <div className="w-16 h-16 bg-success/15 text-success rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h2 className="font-bold text-xl">Pedido recebido!</h2>
                <p className="text-muted-foreground">Em instantes você será redirecionado para a página inicial.</p>
              </div>
            )}
          </div>

          {/* Resumo */}
          <aside className="lg:sticky lg:top-24 lg:self-start bg-card rounded-2xl border border-border p-6 shadow-card space-y-3">
            <h2 className="font-bold">Resumo do pedido</h2>
            <div className="space-y-3 max-h-72 overflow-auto pr-1">
              {items.map((it) => (
                <div key={it.product.id} className="flex gap-3 text-sm">
                  <img src={it.product.image} alt="" className="w-12 h-12 rounded object-cover bg-muted" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{it.product.name}</p>
                    <p className="text-xs text-muted-foreground">Qtd: {it.quantity}</p>
                  </div>
                  <p className="font-semibold whitespace-nowrap">{formatPrice(it.product.price * it.quantity)}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3 space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between text-success"><span>Desconto PIX (5%)</span><span>-{formatPrice(pixDiscount)}</span></div>
              
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-border"><span>Total</span><span className="text-price">{formatPrice(finalTotal)}</span></div>
            </div>
            <p className="text-xs text-muted-foreground pt-2 border-t border-border">Pagamento exclusivo via PIX com 5% de desconto.</p>
          </aside>
        </div>
      </div>
    </Layout>
  );
}

function Field({
  label, type = "text", placeholder, value, onChange,
}: { label: string; type?: string; placeholder?: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div>
      <label className="text-xs font-semibold text-muted-foreground mb-1 block">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background"
      />
    </div>
  );
}

function OptionCard({
  active, onClick, icon: Icon, title, desc,
}: { active: boolean; onClick: () => void; icon: any; title: string; desc: string }) {
  return (
    <button
      onClick={onClick}
      className={`relative text-left p-4 rounded-xl border-2 transition-all ${
        active ? "border-primary bg-accent" : "border-border hover:border-primary/40"
      }`}
    >
      <Icon className={`w-5 h-5 mb-2 ${active ? "text-primary" : "text-muted-foreground"}`} />
      <p className={`font-semibold text-sm ${active ? "text-primary" : ""}`}>{title}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
    </button>
  );
}
