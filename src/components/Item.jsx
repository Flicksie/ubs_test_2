import { useState, useEffect } from "react";

function Items() {
  const [ items, setItems ] = useState([]);
  const [ loaded, setLoaded ] = useState(false);

  useEffect(() => {
    fetch("/api/items")
      .then((res) => res.json())
      .then(setItems)
      .finally(() => setLoaded(true));
  }, []);

  return (
      <div>
          <h2>Items</h2>
          <ul>
              {
                    loaded
                      ? items.map((item) => <li key={item.id}> {item.name} </li>)
                      : <p> Loading... </p>
                }
          </ul>
      </div>
  );
}

export default Items;
