const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const fmt = (v) => brl.format(v || 0);

// Puxa os dados reais do Back-end
async function carregarDados() {
  // Como você ainda não tem o login salvando o ID, vamos forçar o ID 1 (Thalia) para testar
  const idUsuario = 1; 

  try {
    const response = await axios.get(`http://localhost:3000/home/${idUsuario}`);
    return response.data;
  } catch (error) {
    console.error("Erro no back-end:", error);
    alert("Erro ao conectar com o servidor. O node está rodando?");
    return null;
  }
}

function render(dados) {
  if (!dados) return;
  
  const { usuario, viagem, checklist, reembolsos, despesas } = dados;

  // 1. Nome do usuário
  document.getElementById("nomeUsuario").textContent = usuario.nome;

  // 2. Validação de maioridade (RN01)
  if (!usuario.maiorIdade) {
    document.getElementById("avisoMenor").classList.remove("oculto");
  }

  // 3. Viagem ativa ou Estado Vazio
  const card = document.getElementById("cardViagem");
  const vazio = document.getElementById("estadoVazio");

  if (!viagem) {
    // Sem viagem: mostra o card vazio e bloqueia os atalhos
    card.classList.add("oculto");
    vazio.classList.remove("oculto");
    document.querySelectorAll(".atalho").forEach(b => b.disabled = true);
  } else {
    // Com viagem: preenche os dados
    vazio.classList.add("oculto");
    card.classList.remove("oculto");
    
    document.getElementById("destinoViagem").textContent = viagem.destino;
    document.getElementById("periodoViagem").textContent = viagem.periodo;
    document.getElementById("tipoViagem").textContent = viagem.tipo;
    document.getElementById("tetoOrcamento").textContent = fmt(viagem.teto);
    document.getElementById("gastoOrcamento").textContent = fmt(viagem.gasto);

    // Cálculo do orçamento
    const saldo = viagem.teto - viagem.gasto;
    const pct = Math.min((viagem.gasto / viagem.teto) * 100, 100);
    document.getElementById("barraProgresso").style.width = pct + "%";
    document.getElementById("saldoOrcamento").textContent = `Saldo: ${fmt(saldo)}`;
  }

  // 4. Badges (Checklist e Reembolso)
  const pctCheck = checklist.total ? Math.round((checklist.marcados / checklist.total) * 100) : 0;
  document.getElementById("checklistPct").textContent = pctCheck + "%";
  document.getElementById("badgeReembolso").textContent = reembolsos.emAnalise;

  // 5. Lista de despesas
  const lista = document.getElementById("listaDespesas");
  const semDespesas = document.getElementById("semDespesas");
  
  // Limpa a lista antes de preencher (para não duplicar se a função rodar 2x)
  lista.innerHTML = ""; 

  if (despesas.length === 0) {
    semDespesas.classList.remove("oculto");
  } else {
    semDespesas.classList.add("oculto");
    despesas.forEach(d => {
      const li = document.createElement("li");
      li.innerHTML = `<span>${d.categoria}</span><span><strong>${fmt(d.valor)}</strong></span>`;
      lista.appendChild(li);
    });
  }
}

// Inicialização
(async function init() {
  const dados = await carregarDados();
  render(dados);
})();