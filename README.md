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
├── privacidade.html
├── questao.html
├── resultado.html
├── tema.html
├── termos.html
├── src/
     ├── fonts/
          ├── files/
               ├── OFL.txt
               └── PlusJakartaSans-Variable-latin.woff
          ├── Plus_Jakarta_Sans/
               ├── static/
                    ├── PlusJakartaSans-Bold.ttf
                    ├── PlusJakartaSans-BoldItalic.ttf
                    ├── PlusJakartaSans-ExtraBold.ttf
                    ├── PlusJakartaSans-ExtraBoldItalic.ttf
                    ├── PlusJakartaSans-ExtraLight.ttf
                    ├── PlusJakartaSans-ExtraLightItalic.ttf
                    ├── PlusJakartaSans-Italic.ttf
                    ├── PlusJakartaSans-Light.ttf
                    ├── PlusJakartaSans-LightItalic.ttf
                    ├── PlusJakartaSans-Medium.ttf
                    ├── PlusJakartaSans-MediumItalic.ttf
                    ├── PlusJakartaSans-Regular.ttf
                    ├── PlusJakartaSans-SemiBold.ttf
                    └── PlusJakartaSans-SemiBoldItalic.ttf
               ├── OFL.txt
               ├── PlusJakartaSans-Italic-VariableFont_wght.ttf
               ├── PlusJakartaSans-VariableFont_wght.ttf
               └── README.txt
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

[![Architecture diagram of saikihector/devdogs](https://gitdiagram.com/saikihector/devdogs/diagram.png)](https://gitdiagram.com/saikihector/devdogs?utm_source=readme&utm_medium=picture)
[![Architecture diagram](https://gitdiagram.com/diagram-badge.svg)](https://gitdiagram.com/saikihector/devdogs?utm_source=readme&utm_medium=badge)

## Rodando localmente

Não há dependências — basta abrir o `index.html` no navegador, ou usar uma extensão tipo Live Server no VS Code.

O database ainda não foi integrado ao sistema do site.

## Rodando online

Acesse: [DogSchool](https://scrum-chi.vercel.app)
