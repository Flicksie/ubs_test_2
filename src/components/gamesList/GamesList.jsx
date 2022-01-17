import { useState, useEffect } from "react";
import GameEntry from "./GameEntry.jsx";
import "./gamesList.css";

function GamesList({ modalRef }) {
  const [ games, setGames ] = useState([]);
  const [ loaded, setLoaded ] = useState(false);

  let errored = false;
  const setModal = (title, body) => {
    modalRef.setModalData({ title, body });
    modalRef.setModalOpen(true);
  };

  useEffect(() => {
    fetch("/api/games")
      .then((res) => res.json())
      .then((resItems) => {
        setGames(resItems);
        setLoaded(true);
      })
      .catch(() => {
        errored = true;
      });
    // .finally(()=> );
  }, []);

  if (errored) return setModal("Error","Could not fetch list of titles.");

  return (
      <div className="gamesListContainer">
          <h2>Games Released in 1994</h2>
          <ul className="gamesList">
              {
                    loaded
                      ? games.map((game) => <li className="gamesListEntry" key={game.id}><GameEntry modalRef={modalRef} metadata={game} /></li>)
                      : [...Array(10).keys()]
                        .map((v, i) => <li key={i} className="gamesListEntry isDummy"><GameEntry metadata={({ dummy: true })} /></li>)
                }
          </ul>
      </div>
  );
}

export default GamesList;
