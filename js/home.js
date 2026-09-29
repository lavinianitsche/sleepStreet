document.getElementById('btnEntrar').addEventListener('click', () => {
  window.location.href = 'login.html';
});

document.getElementById('btnCriarViagem').addEventListener('click', () => {
  const usuarioLogado = localStorage.getItem('usuarioLogado');

  if (!usuarioLogado) {
    alert('Você precisa estar logado para criar uma viagem. (RF01)');
    window.location.href = 'login.html';
    return;
  }

  alert('Criar viagem — em breve (RF02)');
});