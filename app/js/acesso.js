// Alternância entre login e cadastro
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
  container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
  container.classList.remove('active');
});

// Formulários
const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');

// Cadastro
signupForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  const nome = signupForm.nome.value.trim();
  const email = signupForm.email.value.trim();
  const senha = signupForm.senha.value;

  if (senha.length < 6) {
    alert('A senha deve ter no mínimo 6 caracteres!');
    return;
  }

  const submitBtn = signupForm.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Cadastrando...';

  try {
    const response = await fetch('./php/inserir_usuario.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha }),
    });

    const data = await response.json();

    if (data.success) {
      alert(data.message);
      signupForm.reset();
      container.classList.remove('active');
    } else {
      alert(data.error);
    }
  } catch (error) {
    alert('Erro ao conectar com o servidor. Tente novamente.');
    console.error(error);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Cadastrar';
  }
});

// Login
loginForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = loginForm.email.value.trim();
  const senha = loginForm.senha.value;

  const submitBtn = loginForm.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Entrando...';

  try {
    const response = await fetch('./php/verificar_usuario.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    });

    const data = await response.json();

    if (data.success) {
      alert(data.message);
      
      // Armazenar dados do usuário
      localStorage.setItem('usuarioLogado', JSON.stringify({
        id: data.usuario.id,
        nome: data.usuario.nome
      }));
      
      // Redirecionar para home
      window.location.href = './home.html';
    } else {
      alert(data.error);
    }
  } catch (error) {
    alert('Erro ao conectar com o servidor.');
    console.error(error);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Entrar';
  }
});