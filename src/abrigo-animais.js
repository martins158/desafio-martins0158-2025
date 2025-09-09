class AbrigoAnimais {
  /**
   * @param {string} brinquedosPessoa1 - itens separados por vírgula (ex: "RATO,BOLA")
   * @param {string} brinquedosPessoa2 - itens separados por vírgula
   * @param {string} ordemAnimais - nomes separados por vírgula (ex: "Rex,Fofo")
   * @returns {{lista?: string[], erro?: string}}
   */
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    try {
      // Tabela de animais, espécie e sequência de brinquedos favoritos
      const ANIMAIS = {
        Rex: { tipo: "cão", fav: ["RATO", "BOLA"] },
        Mimi: { tipo: "gato", fav: ["BOLA", "LASER"] },
        Fofo: { tipo: "gato", fav: ["BOLA", "RATO", "LASER"] },
        Zero: { tipo: "gato", fav: ["RATO", "BOLA"] },
        Bola: { tipo: "cão", fav: ["CAIXA", "NOVELO"] },
        Bebe: { tipo: "cão", fav: ["LASER", "RATO", "BOLA"] },
        Loco: { tipo: "jabuti", fav: ["SKATE", "RATO"] },
      };

      const VALID_TOYS = new Set([
        "RATO",
        "BOLA",
        "NOVELO",
        "CAIXA",
        "LASER",
        "SKATE",
      ]);

      // Validação básica de tipos
      if (
        typeof brinquedosPessoa1 !== "string" ||
        typeof brinquedosPessoa2 !== "string" ||
        typeof ordemAnimais !== "string"
      ) {
        return { erro: "Entrada inválida" };
      }

      // Parse das listas
      const parseList = (s) =>
        s
          .split(",")
          .map((x) => x.trim())
          .filter((x) => x.length > 0);
      const p1 = parseList(brinquedosPessoa1).map((x) => x.toUpperCase());
      const p2 = parseList(brinquedosPessoa2).map((x) => x.toUpperCase());
      const ordem = parseList(ordemAnimais);

      // Validação de brinquedos (inválido -> erro)
      const allValidToys = (arr) => arr.every((t) => VALID_TOYS.has(t));
      if (!allValidToys(p1) || !allValidToys(p2)) {
        return { erro: "Brinquedo inválido" };
      }

      // Validação de animais (inválido ou duplicado)
      const hasDup = (arr) => new Set(arr).size !== arr.length;
      if (ordem.length === 0 || hasDup(ordem)) {
        return { erro: "Animal inválido" };
      }
      for (const n of ordem) {
        if (!Object.prototype.hasOwnProperty.call(ANIMAIS, n)) {
          return { erro: "Animal inválido" };
        }
      }

      // Se não houver Loco na ordem, checamos duplicata em brinquedos
      if (!ordem.includes("Loco")) {
        const hasToyDup = (arr) => new Set(arr).size !== arr.length;
        if (hasToyDup(p1) || hasToyDup(p2)) {
          return { erro: "Brinquedo inválido" };
        }
      }

      // Aux: checa se "needle" é subsequência de "hay" preservando ordem (pode intercalar)
      const isSubsequence = (needle, hay) => {
        let j = 0;
        for (let i = 0; i < hay.length && j < needle.length; i++) {
          if (hay[i] === needle[j]) j++;
        }
        return j === needle.length;
      };

      //Não trata duplicatas.
      const hasAllIgnoringOrder = (needle, hay) => {
        return needle.every(item => hay.includes(item));
      };



      const result = [];
      const adoptedCount = { 1: 0, 2: 0 };

      for (const nome of ordem) {
        const { tipo, fav } = ANIMAIS[nome];

        // Regras de qualificação por pessoa
        const qualifies = (pNum) => {
          const toys = pNum === 1 ? p1 : p2;

          if (nome === "Loco") {
            // Regra 6: Loco não se importa com a ordem desde que tenha outro animal como companhia
            if (adoptedCount[pNum] > 0) {
              // neste caso não punimos duplicatas: só verificamos se TODOS os favoritos aparecem em toys
              return fav.every((f) => toys.includes(f));
            }
            // se for o primeiro animal, exige subsequência na ordem
            return isSubsequence(fav, toys);
          }

          // Regra 1 e 2: subsequência na ordem desejada (intercalar permitido)
          return isSubsequence(fav, toys);
        };

        let q1 = qualifies(1);
        let q2 = qualifies(2);

        // Regra 4: se ambos têm condições, vai para o abrigo
        if (q1 && q2) {
          result.push(`${nome} - abrigo`);
          continue;
        }

        // Regra 5: limite de 3 animais por pessoa
        const can1 = adoptedCount[1] < 3;
        const can2 = adoptedCount[2] < 3;

        if (q1 && can1) {
          result.push(`${nome} - pessoa 1`);
          adoptedCount[1]++;
        } else if (q2 && can2) {
          result.push(`${nome} - pessoa 2`);
          adoptedCount[2]++;
        } else {
          result.push(`${nome} - abrigo`);
        }
      }

      // Ordena alfabeticamente por nome do animal
      result.sort((a, b) =>
        a.localeCompare(b, "pt-BR", { sensitivity: "base" })
      );

      return { lista: result, erro: false };
    } catch (e) {
      return { erro: "Erro inesperado" };
    }
  }
}

export { AbrigoAnimais as AbrigoAnimais };
