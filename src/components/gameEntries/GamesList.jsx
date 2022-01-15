import { useState, useEffect } from "react";
import GameEntry from "./GameEntry";
import "./gamesList.css";

function GamesList (){

    const [games,setGames] = useState([]);
    const [loaded,setLoaded] = useState(false);

    useEffect( ()=> {
        fetch("/api/games")
            .then(res=> res.json())
            .then(games=>{
                console.log(games);
                setGames(games);
                setLoaded(true);
            })
            .catch(err=>{
                console.log(err);
            })
            //.finally(()=> );
    }, [] );

    
    return (
        <div className="gamesListContainer">
            <h2>Games Released in 1994</h2>
            <ul className="gamesList">
                { 
                    loaded 
                    ?
                        games.map(game=> <li className="gamesListEntry" key={game.id}><GameEntry metadata={game} ></GameEntry></li> )
                    :
                        [...Array(10).keys()].map(dummy=> <li className="gamesListEntry isDummy"><GameEntry metadata={({dummy:true})} ></GameEntry></li>)
                }
            </ul>
        </div>
    );
  

}

export default GamesList;