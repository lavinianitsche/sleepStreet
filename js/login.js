const formLogin = document.getElementById('formLogin');

if (formLogin) {
  formLogin.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim().toLowerCase();
    const senha = document.getElementById('senha').value;

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    console.log('Cadastrados:', usuarios);

    const usuario = usuarios.find(
      (u) => u.email === email && u.senha === senha
    );

    if (!usuario) {
      alert('E-mail ou senha incorretos. Verifique ou crie uma conta.');
      return;
    }

    localStorage.setItem('usuarioLogado', usuario.email);
    alert('Bem-vindo(a), ' + usuario.nome + '!');
    window.location.href = 'index.html';
  });
}