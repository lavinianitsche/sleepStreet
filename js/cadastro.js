/* ============================================
   CADASTRO (cadastro.html)
   ============================================ */
const formCadastro = document.getElementById('formCadastro');

if (formCadastro) {
  formCadastro.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const senha = document.getElementById('senha').value;
    const dataNascimento = document.getElementById('dataNascimento').value;

    if (!nome || !email || !senha || !dataNascimento) {
      alert('Preencha todos os campos.');
      return;
    }

    const idade = calcularIdade(dataNascimento);
    if (idade < 18) {
      alert('Você precisa ter 18 anos ou mais para criar viagens solo. (RN01)');
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const jaExiste = usuarios.find((u) => u.email === email);

    if (jaExiste) {
      alert('Este e-mail já está cadastrado.');
      return;
    }

    usuarios.push({ nome, email, senha, dataNascimento });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Cadastro realizado com sucesso! Faça login.');
    window.location.href = 'login.html';
  });
}

/* ============================================
   LOGIN (login.html)
   ============================================ */
const formLogin = document.getElementById('formLogin');

if (formLogin) {
  formLogin.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim().toLowerCase();
    const senha = document.getElementById('senha').value;

    if (!email || !senha) {
      alert('Preencha todos os campos.');
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    console.log('Usuários cadastrados:', usuarios);
    console.log('Tentando logar com:', { email, senha });

    const usuario = usuarios.find(
      (u) => u.email === email && u.senha === senha
    );

    if (!usuario) {
      alert('E-mail ou senha incorretos. Verifique ou crie uma conta.');
      return;
    }

    localStorage.setItem('usuarioLogado', usuario.email);
    alert(`Bem-vindo(a), ${usuario.nome}!`);
    window.location.href = 'index.html';
  });
}

/* ============================================
   HOME (index.html)
   ============================================ */
const btnEntrar = document.getElementById('btnEntrar');
const btnCriarViagem = document.getElementById('btnCriarViagem');

if (btnEntrar) {
  btnEntrar.addEventListener('click', () => {
    window.location.href = 'login.html';
  });
}

if (btnCriarViagem) {
  btnCriarViagem.addEventListener('click', () => {
    const usuarioLogado = localStorage.getItem('usuarioLogado');

    if (!usuarioLogado) {
      alert('Você precisa estar logado para criar uma viagem. (RF01)');
      window.location.href = 'login.html';
      return;
    }

    alert('Criar viagem — em breve (RF02)');
  });
}

/* ============================================
   UTILITÁRIO
   ============================================ */
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