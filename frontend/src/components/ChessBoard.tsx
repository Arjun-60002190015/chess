import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../screens/Game";

export const ChessBoard = ({chess, board, socket, setBoard }:{
    chess: any
    setBoard: any
    board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;

    }| null) [][];
    socket:WebSocket
    
}) =>{
    const [from, setFrom] = useState<null | Square>(null);
    const [to, setTo] = useState<null | Square>(null);
    return <div className="text-white-200">
        {board.map((row, i) => {
            return <div key={i} className="flex">
                {row.map((square, j) => {
                    const squareRep = String.fromCharCode(97 + (j%8)) + "" 
                    + (8-i) as Square

                    return <div onClick={()=>{
                        if(!from){
                            setFrom(squareRep);
                        }else{
                            
                                socket.send(JSON.stringify({
                                                type: MOVE,
                                                payload: {
                                                    move:{
                                                        from, 
                                                        to: squareRep

                                                    }
                                                    
                                                }
                            }));
                            setFrom(null);
                            chess.move({
                                from,
                                to:squareRep
                            });
                            setBoard(chess.board());

                            console.log({
                                from,
                                to:squareRep
                            })
                            
                        }

                    }} key={j} className={`w-16 h-16 ${(i+j)%2===0 ? 'bg-cyan-600':'bg-green-200'}`}>
                        <div className="w-full flex justify-center">
                        <div className="h-full flex justify-center">
                                {square ? <img className="w-6 pt-4" src={`/${square?.color==="b"?
                                    square?.type: `${square?.type?.toUpperCase()} copy`}.png`} />:null}
                                
                        </div>
                        </div>
                    </div>
                })}
            </div>
        })}

    </div>
}