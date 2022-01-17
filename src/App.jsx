/* eslint-disable @typescript-eslint/no-unused-vars */
import "./theme.css";
import "./App.css";

import { useState, useRef } from "react";

import GamesList from "./components/gamesList/GamesList.jsx";
import Modal from "./components/Modal.jsx";

function App() {
  const [ modalOpen, setModalOpen ] = useState(false);
  const [ modalData, setModalData ] = useState({});

  return (
      <div className="App">
          <header className="App-header">
              .
              <section className="body-container">
                  <GamesList modalRef={{ setModalData, modalData, setModalOpen }} />
              </section>
          </header>
          <Modal data={modalData} show={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
  );
}

export default App;
