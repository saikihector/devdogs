// ---------- Tópicos ----------
var botoes = document.querySelectorAll(".gatilho");
var itens = document.querySelectorAll(".item");

botoes.forEach(function (botao) {
    botao.addEventListener("click", function () {
        var item = botao.parentElement;
        var painel = item.querySelector(".painel");
        var estavaAberto = item.classList.contains("ativo");

        // fecha todos os tópicos
        itens.forEach(function (outro) {
            outro.classList.remove("ativo");
            outro.querySelector(".painel").style.maxHeight = null;
        });

        // se o que eu cliquei estava fechado, abre ele
        if (!estavaAberto) {
            item.classList.add("ativo");
            painel.style.maxHeight = painel.scrollHeight + "px";
        }
    });
});