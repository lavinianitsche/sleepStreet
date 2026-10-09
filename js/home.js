const btnEntrar = document.getElementById('btnEntrar');

if (btnEntrar) {
  btnEntrar.addEventListener('click', () => {
    window.location.href = 'login.html';
  });
}
