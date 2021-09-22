import React, { useState, useEffect } from "react";
import Card from "./Card";

let videos;

function App() {
  const [filters, setFilters] = useState(null);

  useEffect(() => {
    setup();
  }, []);

  const setup = () => {
    fetch("./videos.json")
      .then((res) => res.json())
      .then((json) => {
        videos = json[2].data;
        setFilters(videos);
      });
  };

  const formatText = (word) => {
    /* let tmp = word.replace(/ó/g, "o"); */
    let tmp = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return tmp;
  };

  const handleSearch = (e) => {
    const cadena = formatText(e.target.value.toLowerCase());
    let tmpArray = [];
    const limit = videos.length;
    for (let i = 0; i < limit; i++) {
      const tags = formatText(videos[i].etiquetas.toLowerCase());
      const patt = new RegExp(cadena);
      const res = patt.test(tags);

      if (res) {
        tmpArray.push(videos[i]);
      }
    }
    setFilters(tmpArray);
  };

  return (
    <div className="container">
      <div className="jumbotron">
        <h1>Buscador</h1>
        <input type="text" placeholder="Buscar..." onChange={handleSearch} />
      </div>
      <div className="row">
        {filters &&
          filters.map((item, i) => (
            <div className="col-sm-6 mb-4" key={i}>
              <Card
                title={item.titulo}
                skill={item.habilidad}
                tags={item.etiquetas}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
