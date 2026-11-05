# Metodologia Ágil 

Site projetado para a ABP da faculdade FATEC

## Sobre o projeto

Site criado com o intuito de ensinar o usuário o método SCRUM, por meio de "apostilas" e prova sobre o método. <p>
O site também conta com certificado ao completar a avaliação e obter um resultado igual ou maior que 65%

## Tecnologias

- HTML5
- CSS3 
- JavaScript
- Google Fonts 

## Funcionalidades

- Animações de scroll
- Seções: Hero, Sobre, Footer
- Formulário para criar conta, entrar na conta e recriar senha esquecida.
- Obrigatoriedade de login para realizar a avaliação.

## Estrutura

```
app/
├── acesso.html
├── avaliacao.html
├── certificados.html
├── esqueci-senha.html
├── index.html
├── questao.html
├── resultado.html
├── tema.html
├── src/
     ├── css/
          ├── acesso.css
          ├── avaliacao.css
          ├── certificados.css
          ├── esqueci-senha.css
          ├── index.css
          ├── questao.css
          ├── resultado.css
          └── tema.css
     ├── js/
          ├── acesso.js
          ├── avaliacao.js
          ├── certificados.js
          ├── esqueci-senha.js
          ├── index.js
          ├── questao.js
          ├── resultado.js
          └── tema.js
     ├── images/
          ├── icons/
               ├── arrow-icon.svg
               ├── cpf-icon.svg
               ├── user-icon.svg
               ├── mail-icon.svg
               └── lock-icon.svg
          ├── logo/
               ├── dogschool-logo-no-background.png
               └── dogschool-logo.svg
          ├── objetos/
               ├── circulo.svg
               └── pontos.svg

bd/
├── db-dogschool-backup.sql
```

## Rodando localmente

Não há dependências — basta abrir o `index.html` no navegador, ou usar uma extensão tipo Live Server no VS Code.

O database ainda não foi integrado ao sistema do site.

## Rodando online

Acesse: [DogSchool](https://scrum-chi.vercel.app)
