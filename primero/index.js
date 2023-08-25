import express from "express";
import jumpSearch from "./salto.js";
import linearSearch from "./lineal.js";

const port = 4000;
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
    <h1>Yoel Nunez 2-17-0171</h1>
    <h1>Algoritmo de búsqueda por saltos</h1>
    <form action="/jumpSearch" method="post">
      <label for="arr">Arreglo:</label>
      <input type="text" name="arr" value="" required/>
      <label for="target">Elemento a buscar:</label>
      <input type="text" name="target" value="" placeholder="Introduzca un numero" required/>
      <button type="submit">Buscar</button>
    </form>
    <h1>Búsqueda Lineal o Secuencial</h1>
    <form action="/linearSearch" method="post">
      <label for="arr">Arreglo:</label>
      <input type="text" name="arr" placeholder="Introduzca un numero" required />
      <label for="target">Elemento a buscar:</label>
      <input type="text" name="target" placeholder="Introduzca un numero" required/>
      <button type="submit">Búsqueda Lineal</button>
    </form>
    <script>
      window.onload = function() {
        let arrInputs = document.getElementsByName("arr");
        if (arrInputs[0].value === "") {
          let randomArr = Array.from({length: 5}, () => Math.floor(Math.random() * 50) + 1);
          const sort = [...randomArr].sort((a, b) => a - b).join(", ");
          arrInputs[0].value = sort;
          arrInputs[1].value = randomArr.join(", ");
        }
      };          
    </script>
  `);
});

app.post("/jumpSearch", (req, res) => {
  const { arr, target } = req.body;
  const formattedArr = arr.split(",").map((item) => parseInt(item));
  const result = jumpSearch(formattedArr, +target);
  if (result === -1) {
    res.send(`Elemento ${target} No encontrado`);
  } else {
    res.send(`Elemento ${target} fue localizado en la posicion ${result}`);
  }
});

app.post("/linearSearch", (req, res) => {
  const { arr, target } = req.body;
  const formattedArr = arr.split(",").map((item) => parseInt(item));
  const result = linearSearch(formattedArr, +target);
  if (result === -1) {
    res.send(`Elemento ${target} no encontrado en el arreglo`);
  } else {
    res.send(`Elemento ${target} fue localizado en la posicion ${result}`);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
