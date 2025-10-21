# 📻 Rádio Retro Web - Aplicativo Móvel

Este é o repositório oficial do aplicativo móvel da Rádio Retro Web, construído com React Native e Expo. O aplicativo permite aos ouvintes sintonizar a rádio, ver o que está tocando e interagir com a programação de qualquer lugar.

## ✨ Funcionalidades Principais

* **Streaming de Áudio:** Player principal que toca o stream ao vivo da rádio.
* **Áudio em Segundo Plano:** Continue ouvindo mesmo com o app minimizado ou a tela bloqueada (configurado no `app.json`).
* **Identidade Visual Retrô:** Interface inspirada na logo oficial, com um fundo claro e cores vibrantes.
* **Player Animado:** A logo da rádio gira suavemente como um disco de vinil enquanto a música está tocando.
* **Metadados Ao Vivo:**
    * Exibe o nome do artista e da música que está tocando agora.
    * Mostra qual será a próxima música a tocar.
* **Interação Social:**
    * **Compartilhar:** Botão para compartilhar a música atual no WhatsApp, redes sociais, etc.
    * **Instagram:** Link direto para o perfil oficial da rádio no Instagram.
* **Navegação entre Telas:**
    * **Tela Principal:** Onde fica o player e as informações principais.
    * **Tela de Histórico:** Uma segunda tela que lista as últimas 20 músicas que tocaram.

## 🚀 Tecnologias Utilizadas

* **React Native:** Framework para desenvolvimento de apps nativos.
* **Expo (SDK + Go):** Plataforma e ferramentas para facilitar o desenvolvimento e testes.
* **Expo-AV (expo-av):** Biblioteca para gerenciamento e reprodução do streaming de áudio.
* **React Navigation:** Biblioteca para gerenciamento da navegação entre as telas (Home e Histórico).
* **JavaScript (ES6+):** Linguagem base do projeto.
* **APIs Nativas:** Utilização das APIs `Share` (para compartilhar) e `Linking` (para links externos) do React Native.



## 🛠️ Como Rodar o Projeto Localmente

Siga os passos abaixo para executar o projeto em seu próprio ambiente de desenvolvimento.

### Pré-requisitos

* [Node.js (versão LTS)](https://nodejs.org/en/)
* [Git](https://git-scm.com/) (opcional, mas recomendado)
* **Expo Go** (aplicativo instalado no seu celular, iPhone ou Android)

### Instalação e Execução

1.  **Clone o repositório** (ou apenas use a pasta que já criamos):
    ```bash
    git clone https://[URL_DO_SEU_REPOSITORIO]
    cd retro-web-radio
    ```

2.  **Instale as dependências:**
    (Este comando lê o `package.json` e instala tudo o que o projeto precisa, como `expo-av` e `react-navigation`).
    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento Expo:**
    ```bash
    npx expo start
    ```

4.  **Teste no seu celular:**
    * Abra o aplicativo **Expo Go** no seu iPhone ou Android.
    * Na tela "Início", escaneie o QR Code que apareceu no terminal.
    * O aplicativo será carregado automaticamente no seu dispositivo.
  


