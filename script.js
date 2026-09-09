const palavras = [
      "caderno", "lápis", "caneta", "borracha", "régua", "mochila",
      "quadro", "giz", "apontador", "estojo", "papel", "tesoura",
      "cola", "calculadora", "mapa", "globo", "carteira", "cadeira",
      "cachorro", "gato", "casa", "carro", "livro", "sol", "lua",
      "árvore", "amigo", "comida"
    ];

    let palavraAtual = "";
    let traducaoAtual = "";
    let pontos = 0;

    async function traduzir(palavra) {
      try {
        const response = await fetch(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(palavra)}&langpair=pt|en`
        );
        const data = await response.json();
        return (data.responseData?.translatedText || "").toLowerCase();
      } catch (error) {
        console.error("Erro na tradução:", error);
        return "";
      }
    }

    async function novaRodada() {
      palavraAtual = palavras[Math.floor(Math.random() * palavras.length)];
      traducaoAtual = await traduzir(palavraAtual);

      atualizarUI("palavra", palavraAtual);
      atualizarUI("resposta", "", true);
      atualizarUI("resultado", "");
    }

    function verificar() {
      const resposta = document.getElementById("resposta").value.trim().toLowerCase();

      if (!traducaoAtual) {
        atualizarUI("resultado", "⚠️ Tradução não carregada, tente novamente.");
        return;
      }

      if (resposta === traducaoAtual) {
        pontos++;
        atualizarUI("resultado", mensagensPositivas());
      } else {
        pontos = 0;
        atualizarUI("resultado", mensagensNegativas(traducaoAtual));
      }

      atualizarUI("pontos", pontos);
      setTimeout(novaRodada, 2000);
    }

    function mensagensPositivas() {
      const frases = [
        "✅ Excelente! Você acertou!",
        "🎉 Muito bem! Continue assim!",
        "👏 Correto! Você está mandando bem!",
        "🌟 Perfeito! Tradução correta!"
      ];
      return frases[Math.floor(Math.random() * frases.length)];
    }

    function mensagensNegativas(correta) {
      const frases = [
        `❌ Quase! A resposta certa é: ${correta}`,
        `😅 Não foi dessa vez... Correto: ${correta}`,
        `📘 Errado. A tradução correta é: ${correta}`,
        `👉 Atenção! O certo é: ${correta}`
      ];
      return frases[Math.floor(Math.random() * frases.length)];
    }

    function atualizarUI(id, valor, isInput = false) {
      const elemento = document.getElementById(id);
      if (!elemento) return;

      if (isInput) {
        elemento.value = valor;
      } else {
        elemento.textContent = valor;
      }
    }

    document.getElementById("btnVerificar").addEventListener("click", verificar);
    novaRodada();