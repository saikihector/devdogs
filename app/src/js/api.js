// Define window.apiAuth, usada pelo acesso.js quando USAR_BACKEND = true.
// Ajuste API_URL para o endereço do seu servidor.
const API_URL = 'http://127.0.0.1:5500/';

window.apiAuth = async (rota, opcoes = {}) => {
  const response = await fetch(`${API_URL}${rota}`, {
    credentials: 'include', // envia/recebe o cookie de sessão
    ...opcoes,
  });
  const data = await response.json().catch(() => ({}));
  return { response, data };
};