const btnBuscar = document.getElementById('btnBuscar');
const filtroCategoria = document.getElementById('filtroCategoria');
const filtroFaixaPreco = document.getElementById('filtroFaixaPreco');
const listaEstabelecimentos = document.getElementById('listaEstabelecimentos');

async function buscarEstabelecimentos() {
  try {
    const params = {};

    if (filtroCategoria.value) {
      params.categoria = filtroCategoria.value;
    }

    if (filtroFaixaPreco.value) {
      params.faixa_preco = filtroFaixaPreco.value;
    }

    const response = await axios.get('http://127.0.0.1:3000/estabelecimentos', { params });
    console.log("Lista de estabelecimentos recebida:", response.data);

    const estabelecimentos = response.data;

    listaEstabelecimentos.innerHTML = '';

    if (estabelecimentos.length === 0) {
      listaEstabelecimentos.innerHTML = '<p style="font-size: 13px; color: #8a97a8; text-align: center;">Nenhum estabelecimento encontrado.</p>';
      return;
    }

    estabelecimentos.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'card-item';
      card.innerHTML = `
        <h3>${item.nome}</h3>
        <p>Categoria: ${item.categoria} | Preço: ${item.faixa_preco}</p>
        <p>Avaliação: ${item.avaliacao_media ?? 'Sem nota'} | Horário: ${item.horario_abertura ?? '--'} - ${item.horario_fechamento ?? '--'}</p>
      `;
      listaEstabelecimentos.appendChild(card);
    });
  } catch (error) {
    console.error("Erro ao buscar estabelecimentos:", error);
    alert("Erro ao carregar a lista de estabelecimentos.");
    listaEstabelecimentos.innerHTML = '<p style="font-size: 13px; color: #8a97a8; text-align: center;">Erro ao buscar estabelecimentos.</p>';
  }
}

btnBuscar.addEventListener('click', buscarEstabelecimentos);
window.addEventListener('DOMContentLoaded', buscarEstabelecimentos);