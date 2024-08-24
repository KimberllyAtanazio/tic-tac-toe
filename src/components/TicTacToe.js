import { useTicTacToe } from "../hooks/useTicTacToe";
import ticTacToeImg from "../assets/tic.tac.toe..png";

const casaVazia = " ";
export function TicTacToe() {
  const {
    jogo,
    verificarFimDoJogo,
    adicionarJogada,
    verificarVencedor,
    reiniciarJogo,
    finalizarJogo,
    vitoriasX,
    vitoriasO,
    empates,
  } = useTicTacToe();

  const handleClick = (linhaIndex, colunaIndex) => {
    const jogoJaAcabou = verificarFimDoJogo(jogo);
    const casaEstaVazia = !jogo.tabuleiro[linhaIndex][colunaIndex];
    if (casaEstaVazia && !jogoJaAcabou) {
      adicionarJogada(jogo, jogo.jogadorAtual, linhaIndex, colunaIndex);
    }
  };

  const handleFinalizarJogo = () => {
    if (verificarFimDoJogo(jogo)) {
      finalizarJogo();
    }
  };

  return (
    <div class="bg-customPurple w-screen h-screen flex items-center justify-center">
      <div class="">
        <img
          src={ticTacToeImg}
          alt="Tic Tac Toe"
          class="absolute bottom-0 left-0 w-[25%]"
        />
      </div>
      <div class="flex flex-col items-center gap-[1.4%] w-[29.5%] h-[80%] pt-[3%] pb-[13.73%] px-[4.73%] bg-box rounded-3xl">

        <div className="flex items-center justify-center text-black font-medium">
          <div class="flex flex-col w-20 h-20 items-center justify-center rounded-lg font-fredoka text-[11px] mb-3.5 mx-1.5 bg-xCollor">PLAYER X <p class="text-[24px]">{vitoriasX}</p></div>
          <div class="flex flex-col w-20 h-20 items-center justify-center rounded-lg font-fredoka text-[11px] mb-3.5 mx-1.5 bg-drawCollor">DRAW <p class="text-[24px]">{empates}</p></div>
          <div class="flex flex-col w-20 h-20 items-center justify-center rounded-lg font-fredoka text-[11px] mb-3.5 mx-1.5 bg-oCollor">PLAYER O <p class="text-[24px]">{vitoriasO}</p></div>
        </div>

        <div className="flex ">
          {jogo.tabuleiro.map((linha, linhaIndex) => (
            <div key={linhaIndex}>
              {linha.map((casa, colunaIndex) => (
                <div
                  key={colunaIndex}
                  className={`flex justify-center items-center text-6xl w-20 h-20 mb-3.5 mx-1.5 rounded-lg bg-cell hover:bg-cellHover
                    ${
                      casa === "X"
                        ? "text-xCollor font-fredoka font-semibold"
                        : casa === "O"
                        ? "text-oCollor font-fredoka font-semibold"
                        : "bg-cell hover:bg-cellHover"
                    }
                  `}
                  onClick={() => handleClick(linhaIndex, colunaIndex)}
                >
                  {casa === casaVazia ? "" : casa}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center bg-gameOver w-64 h-10 mt-2 rounded">
          {verificarFimDoJogo(jogo) && verificarVencedor(jogo) && (
            <div className="p-1.5 font-fredoka text-white font-medium">
              <p>Player {verificarVencedor(jogo)} wins!</p>
            </div>
          )}
          {verificarFimDoJogo(jogo) && !verificarVencedor(jogo) && (
            <div className="p-2 font-fredoka text-white font-medium">
              <p>It's a draw!</p>
            </div>
          )}
        </div>
        <div
          className="flex items-center justify-center bg-white w-[270px] h-10 mt-5 rounded hover:bg-newGameHover cursor-pointer"
          onClick={() => {
            reiniciarJogo();
            handleFinalizarJogo();
          }}
        >
          {verificarFimDoJogo(jogo) && (
            <div className="p-2 font-fredoka text-black font-semibold">
              <button className="w-full h-full">New game</button>
            </div>
          )}
        </div>

        <div
          className={`flex justify-center items-center w-64 h-10 rounded 
                    ${
                      jogo.jogadorAtual === "X"
                        ? "bg-xCollor font-fredoka font-semibold"
                        : jogo.jogadorAtual === "O"
                        ? "bg-oCollor font-fredoka font-semibold"
                        : ""
                    }
                  `}
        >
          {!verificarFimDoJogo(jogo) && (
            <div class="p-1.5">
              <p> {jogo.jogadorAtual} turn</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
