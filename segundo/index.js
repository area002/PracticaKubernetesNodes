// hello word express
import express from "express";
import binarySearch from "./binaria.js";
import bubbleSort from "./burbuja.js";

const port = 5000;
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
          <h1>Yoel Nunez 2-17-0171</h1>
          <h1>Busqueda Binaria</h1>
          <form action="/binarySearch" method="post">
            <input type="text" name="arr" value="" required />
            <input type="text" name="target" placeholder="Introduzca un numero" required/>
            <button type="submit">Buscar</button>
          </form>
          <h1>Ordenamiento por Burbuja</h1>
          <form action="/bubbleSort" method="post">
            <input type="text" name="arr" placeholder="Introduzca un numero" required/>
            <button type="submit">Buscar</button>
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


app.post("/binarySearch", (req, res) => {
  const { arr, target } = req.body;
  const formattedArr = arr.split(",").map((item) => parseInt(item));
  const result = binarySearch(formattedArr, +target);
  if (result === -1) {
    res.send(`Objeto ${target} no encontrado `);
  } else {
    res.send(`Encontrado ${target} posicion: ${result}`);
  }
});

app.post("/bubbleSort", (req, res) => {
  const { arr } = req.body;
  const formattedArr = arr
    .split(",")
    .map((item) => parseInt(item))
    .filter((item) => !isNaN(item));

  const result = bubbleSort(formattedArr);
  res.send(`Ordenado: [${result}]`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
