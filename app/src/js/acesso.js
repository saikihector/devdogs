// ============================================================
// Os usuários ficam salvos no localStorage do navegador, só para
// testar o fluxo. Quando o back-end existir, troque as funções
// da seção "ARMAZENAMENTO TEMPORÁRIO" por chamadas fetch().
// ============================================================

// ---------- Alternância entre login e cadastro ----------
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => container.classList.add('active'));
loginBtn.addEventListener('click', () => container.classList.remove('active'));

// ---------- Controle Visual de Erros em Todos os Forms ----------
function mostrarErro(input, mensagem) {
  if (!input) return;
  // Salva o placeholder original caso ainda não tenha sido salvo
  if (!input.dataset.placeholderOriginal) {
    input.dataset.placeholderOriginal = input.placeholder;
  }
  input.value = ''; // Limpa o campo para o erro aparecer no placeholder
  input.placeholder = mensagem;
  input.classList.add('input-erro');
}

function limparErro(input) {
  if (!input) return;
  input.classList.remove('input-erro');
  if (input.dataset.placeholderOriginal) {
    input.placeholder = input.dataset.placeholderOriginal;
  }
}

// Aplica limpeza automática de erro ao digitar e desativa balões padrão em TODOS os forms
document.querySelectorAll('form').forEach((form) => {
  form.setAttribute('novalidate', true);

  form.querySelectorAll('input').forEach((input) => {
    input.dataset.placeholderOriginal = input.placeholder;
    input.addEventListener('input', () => limparErro(input));
  });
});

// ---------- Utilidades ----------
const apenasDigitos = (txt) => txt.replace(/\D/g, '');

function cpfValido(cpf) {
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  for (let tamanho = 9; tamanho <= 10; tamanho++) {
    let soma = 0;
    for (let i = 0; i < tamanho; i++) {
      soma += Number(cpf[i]) * (tamanho + 1 - i);
    }
    const digito = ((soma * 10) % 11) % 10;
    if (digito !== Number(cpf[tamanho])) return false;
  }
  return true;
}

async function hashSenha(senha) {
  const bytes = new TextEncoder().encode(senha);
  const buffer = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function setCarregando(botao, carregando, textoNormal, textoCarregando) {
  botao.disabled = carregando;
  botao.textContent = carregando ? textoCarregando : textoNormal;
}

// ---------- Limite de tentativas de login ----------
const MAX_TENTATIVAS = 3;
const TEMPOS_BLOQUEIO = [30, 90, 180]; // segundos: 30s, 1m30s, 3m
const CHAVE_TENTATIVAS = 'tentativasLogin';

function lerTodasTentativas() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE_TENTATIVAS)) || {};
  } catch {
    return {};
  }
}

function lerTentativas(cpf) {
  return lerTodasTentativas()[cpf] || { falhas: 0, bloqueios: 0, ate: 0 };
}

function salvarTentativas(cpf, dados) {
  const todas = lerTodasTentativas();
  todas[cpf] = dados;
  localStorage.setItem(CHAVE_TENTATIVAS, JSON.stringify(todas));
}

function limparTentativas(cpf) {
  const todas = lerTodasTentativas();
  delete todas[cpf];
  localStorage.setItem(CHAVE_TENTATIVAS, JSON.stringify(todas));
}

function segundosRestantes(cpf) {
  return Math.max(0, Math.ceil((lerTentativas(cpf).ate - Date.now()) / 1000));
}

function formatarTempo(seg) {
  const m = Math.floor(seg / 60);
  const s = seg % 60;
  return m > 0 ? `${m}m${String(s).padStart(2, '0')}s` : `${s}s`;
}

function registrarFalha(cpf) {
  const d = lerTentativas(cpf);
  d.falhas += 1;

  if (d.falhas >= MAX_TENTATIVAS) {
    const indice = Math.min(d.bloqueios, TEMPOS_BLOQUEIO.length - 1);
    d.ate = Date.now() + TEMPOS_BLOQUEIO[indice] * 1000;
    d.bloqueios += 1;
    d.falhas = 0;
  }

  salvarTentativas(cpf, d);
  return d;
}

let timerBloqueio = null;

function iniciarContagem(cpf) {
  const botao = loginForm.querySelector('button[type="submit"]');
  clearInterval(timerBloqueio);

  const atualizar = () => {
    const resta = segundosRestantes(cpf);
    if (resta <= 0) {
      clearInterval(timerBloqueio);
      botao.disabled = false;
      botao.textContent = 'Entrar';
      limparErro(loginForm.cpf);
      limparErro(loginForm.senha);
      return;
    }
    botao.disabled = true;
    botao.textContent = `Aguarde ${formatarTempo(resta)}`;
  };

  atualizar();
  timerBloqueio = setInterval(atualizar, 1000);
}
// ---------- FIM DO LIMITE DE TENTATIVAS ----------

// ---------- ARMAZENAMENTO TEMPORÁRIO (substituir pelo back-end depois) ----------
const CHAVE_USUARIOS = 'usuarios';
// Aumente esta versão sempre que os Termos/Política mudarem (LGPD: prova do aceite)
const VERSAO_TERMOS = '1.0';

function lerUsuarios() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE_USUARIOS)) || [];
  } catch {
    return [];
  }
}

function salvarUsuarios(lista) {
  localStorage.setItem(CHAVE_USUARIOS, JSON.stringify(lista));
}

async function cadastrarUsuario({ nome, email, cpf, senha }) {
  const usuarios = lerUsuarios();

  // Retornamos também o 'campo' para saber qual input pintar de vermelho
  if (usuarios.some((u) => u.cpf === cpf)) {
    return { success: false, campo: 'cpf', error: 'Este CPF já está cadastrado!' };
  }
  if (usuarios.some((u) => u.email === email)) {
    return { success: false, campo: 'email', error: 'Este e-mail já está cadastrado!' };
  }

  usuarios.push({
    id: Date.now(),
    nome,
    email,
    cpf,
    senhaHash: await hashSenha(senha),
    termosAceitosEm: new Date().toISOString(),
    versaoTermos: VERSAO_TERMOS,
  });
  salvarUsuarios(usuarios);

  return { success: true, message: 'Cadastro realizado com sucesso! Faça login.' };
}

async function autenticarUsuario({ cpf, senha }) {
  const usuario = lerUsuarios().find((u) => u.cpf === cpf);

  if (!usuario || usuario.senhaHash !== (await hashSenha(senha))) {
    return { success: false, error: 'CPF ou senha incorretos!' };
  }

  return {
    success: true,
    message: `Bem-vindo, ${usuario.nome}!`,
    usuario: { id: usuario.id, nome: usuario.nome },
  };
}
// ---------- FIM DO ARMAZENAMENTO TEMPORÁRIO ----------

// ---------- Formulários ----------
const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');

// Cadastro
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = signupForm.nome.value.trim();
  const email = signupForm.email.value.trim().toLowerCase();
  const cpf = apenasDigitos(signupForm.cpf.value);
  const senha = signupForm.senha.value;

  let temErro = false;

  if (!nome) {
    mostrarErro(signupForm.nome, 'O nome é obrigatório!');
    temErro = true;
  }

  if (!email || !email.includes('@')) {
    mostrarErro(signupForm.email, 'Digite um e-mail válido!');
    temErro = true;
  }

  if (!cpfValido(cpf)) {
    mostrarErro(signupForm.cpf, 'CPF inválido!');
    temErro = true;
  }

  if (senha.length < 6) {
    mostrarErro(signupForm.senha, 'Mínimo de 6 caracteres!');
    temErro = true;
  }

  if (!signupForm.termos.checked) {
    alert('Você precisa aceitar os Termos de Uso e a Política de Privacidade para continuar.');
    temErro = true;
  }

  if (temErro) return;

  const submitBtn = signupForm.querySelector('button[type="submit"]');
  setCarregando(submitBtn, true, 'Cadastrar', 'Cadastrando...');

  try {
    const data = await cadastrarUsuario({ nome, email, cpf, senha });

    if (data.success) {
      alert(data.message);
      signupForm.reset();
      container.classList.remove('active');
    } else {
      // Mostra o erro exatamente no input que deu conflito (cpf ou email)
      mostrarErro(signupForm[data.campo], data.error);
    }
  } catch (error) {
    alert('Ocorreu um erro. Tente novamente.');
    console.error(error);
  } finally {
    setCarregando(submitBtn, false, 'Cadastrar', 'Cadastrando...');
  }
});

// Login
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const cpf = apenasDigitos(loginForm.cpf.value);
  const senha = loginForm.senha.value;

  let temErro = false;

  if (!cpf) {
    mostrarErro(loginForm.cpf, 'Digite seu CPF!');
    temErro = true;
  }

  if (!senha) {
    mostrarErro(loginForm.senha, 'Digite sua senha!');
    temErro = true;
  }

  if (temErro) return;

  // Já está bloqueado? Não conta como nova tentativa.
  const resta = segundosRestantes(cpf);
  if (resta > 0) {
    mostrarErro(loginForm.senha, `Bloqueado! Aguarde ${formatarTempo(resta)}`);
    iniciarContagem(cpf);
    return;
  }

  const submitBtn = loginForm.querySelector('button[type="submit"]');
  setCarregando(submitBtn, true, 'Entrar', 'Entrando...');

  try {
    const data = await autenticarUsuario({ cpf, senha });

    if (data.success) {
      limparTentativas(cpf);
      localStorage.setItem('usuarioLogado', JSON.stringify(data.usuario));
      const destino = sessionStorage.getItem('voltarPara') || 'index.html';
      sessionStorage.removeItem('voltarPara');
      window.location.href = destino;
    } else {
      const dados = registrarFalha(cpf);
      const bloqueio = segundosRestantes(cpf);

      if (bloqueio > 0) {
        mostrarErro(loginForm.cpf, 'Tentativas esgotadas!');
        mostrarErro(loginForm.senha, `Aguarde ${formatarTempo(bloqueio)}`);
        iniciarContagem(cpf);
      } else {
        const restantes = MAX_TENTATIVAS - dados.falhas;
        mostrarErro(loginForm.cpf, data.error);
        mostrarErro(loginForm.senha, `Restam ${restantes} tentativa(s)`);
      }
    }
  } catch (error) {
    alert('Ocorreu um erro. Tente novamente.');
    console.error(error);
  } finally {
    // Se entrou em bloqueio, a contagem regressiva controla o botão
    if (segundosRestantes(cpf) === 0) {
      setCarregando(submitBtn, false, 'Entrar', 'Entrando...');
    }
  }
});