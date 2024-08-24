import { useState } from "react";

const casaVazia = ""
const  jogoVazio = {
    tabuleiro: [
        [casaVazia, casaVazia, casaVazia],
        [casaVazia, casaVazia, casaVazia],
        [casaVazia, casaVazia, casaVazia],
    ],
    jogadorAtual: "X"
}

export function useTicTacToe() {
    const [state, setState] = useState(jogoVazio);
    const [vitoriasX, setVitoriasX] = useState(0);
    const [vitoriasO, setVitoriasO] = useState(0);
    const [empates, setEmpates] = useState(0);

    function adicionarJogada(jogo, jogador, linha, coluna) {
        
        setState(ps => {
            const novoTabuleiro = [...jogo.tabuleiro]; 

            const novoJogo = {
                tabuleiro: novoTabuleiro,
                jogadorAtual: jogo.jogadorAtual === "X" ? "O" : "X", 
            };

            for (let linhas = 0; linhas < jogo.tabuleiro.length; linhas++) {
                novoTabuleiro[linhas] = new Array(jogo.tabuleiro[linhas].length);
                for (let colunas = 0; colunas < jogo.tabuleiro[linhas].length; colunas++) {
                    novoTabuleiro[linhas][colunas] = jogo.tabuleiro[linhas][colunas];
                }
            }

            if (novoTabuleiro[linha][coluna] === casaVazia) { 
                novoTabuleiro[linha][coluna] = jogador; 
            }
            return novoJogo; 
        })
    }


    function verificarVencedor(jogo) {
        const sequencias = obtemSequencias(jogo)
        if (sequencias.includes("XXX")) return "X"
        if (sequencias.includes("OOO")) return "O"
        return undefined
    }

    function obtemSequencias(jogo) {
        return obtemLinhas(jogo)
            .concat(obtemColunas(jogo))
            .concat(obtemDiagonais(jogo))
    }

    function obtemLinhas(jogo) {
        let linhas = []

        for (let i = 0; i < jogo.tabuleiro.length; i++) {
            linhas.push(jogo.tabuleiro[i].join(""))
        }
        return linhas
    }

    function obtemColunas(jogo) {
        let colunas = []

        for (let i = 0; i < jogo.tabuleiro.length; i++) {
            // i = coluna
            let coluna = ""
            for (let j = 0; j < jogo.tabuleiro.length; j++) {
                // j = linha
                coluna += jogo.tabuleiro[j][i]
            }
            colunas.push(coluna)
        }
        return colunas
    }


    function obtemDiagonais(jogo) {
        let diagonais = ["", ""] // guarda as duas diagonais

        for (let i = 0; i < jogo.tabuleiro.length; i++) {
            diagonais[0] += jogo.tabuleiro[i][i] // diagonal principal
            diagonais[1] += jogo.tabuleiro[i][jogo.tabuleiro.length - 1 - i] // diagonal secundária
        }
        return diagonais
    }


    function obterJogadasPossiveis(jogo) {
        let jogadasPossiveis = []

        for (let linha = 0; linha < jogo.tabuleiro.length; linha++) {
            for (let coluna = 0; coluna < jogo.tabuleiro[linha].length; coluna++) {
                if (jogo.tabuleiro[linha][coluna] === casaVazia) {
                    jogadasPossiveis.push({ linha: linha, coluna: coluna })
                }
            }
        }

        return jogadasPossiveis
    }

    function verificarFimDoJogo(jogo) {
        return obterJogadasPossiveis(jogo).length === 0
            || verificarVencedor(jogo) !== undefined
    }

    function reiniciarJogo() {
        setState(jogoVazio)
    }

    function finalizarJogo() {
        const vencedor = verificarVencedor(state);
        if (vencedor === "X") setVitoriasX(vitoriasX + 1);
        else if (vencedor === "O") setVitoriasO(vitoriasO + 1);
        else if (!vencedor && verificarFimDoJogo(state)) setEmpates(empates + 1);
      }

    return {
        jogo: state,
        verificarFimDoJogo,
        adicionarJogada,
        verificarVencedor,
        reiniciarJogo,
        finalizarJogo,
        vitoriasX,
        vitoriasO,
        empates,
    }
}