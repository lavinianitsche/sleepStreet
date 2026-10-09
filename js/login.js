const formLogin = document.getElementById('formLogin');

if (formLogin) {
  formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim().toLowerCase();
    const senha = document.getElementById('senha').value;

    try {
      const resposta = await axios.post('http://localhost:3000/login', {
        email,
        senha
      });

      alert(`Bem-vindo(a), ${resposta.data.usuario.nome}!`);
      
      localStorage.setItem('usuarioLogado', resposta.data.usuario.email);
      window.location.href = 'inicio.html';

    } catch (erro) {
      console.error('Erro ao logar:', erro);
      const msgErro = erro.response?.data?.erro || 'E-mail ou senha incorretos.';
      alert(msgErro);
    }
  });
}
