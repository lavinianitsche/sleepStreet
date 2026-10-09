const formCadastro = document.getElementById('formCadastro');
const dataNascimentoInput = document.getElementById('dataNascimento');
const blocoResponsavel = document.getElementById('blocoResponsavel');

function calcularIdade(dataNascimento) {
  const hoje = new Date();
  const nasc = new Date(dataNascimento);
  let idade = hoje.getFullYear() - nasc.getFullYear();
  const mes = hoje.getMonth() - nasc.getMonth();
  if (mes < 0 || (mes === 0 && hoje.getDate() < nasc.getDate())) {
    idade--;
  }
  return idade;
}

// mostra ou esconde o campo do responsavel baseado na idade
if (dataNascimentoInput) {
  dataNascimentoInput.addEventListener('change', (e) => {
    const idade = calcularIdade(e.target.value);
    if (idade < 18) {
      blocoResponsavel.style.display = 'flex';
      document.getElementById('emailResponsavel').required = true;
    } else {
      blocoResponsavel.style.display = 'none';
      document.getElementById('emailResponsavel').required = false;
      document.getElementById('emailResponsavel').value = '';
    }
  });
}

if (formCadastro) {
  formCadastro.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const senha = document.getElementById('senha').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const emailResponsavel = document.getElementById('emailResponsavel').value.trim().toLowerCase();
    const consentimentoGeo = document.getElementById('consentimentoGeo').checked ? 1 : 0;

    try {
      const resposta = await axios.post('http://localhost:3000/cadastro', {
        nome,
        email,
        senha,
        dataNascimento,
        emailResponsavel: emailResponsavel || null,
        consentimentoGeo
      });

      alert(resposta.data.mensagem || 'cadastro realizado com sucesso!');
      window.location.href = 'login.html';

    } catch (erro) {
      console.error('erro ao cadastrar:', erro);
      const msgErro = erro.response?.data?.erro || 'erro ao conectar com o servidor.';
      alert(msgErro);
    }
  });
}
