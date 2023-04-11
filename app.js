const express = require("express");
const app = express();
const fs = require("fs");

//pagina home
app.get("/", (req, res) => {
  res.send("pagina home");
});

//pagina products y filtrado limit
app.get("/products", (req, res) => {
  fs.readFile("./products.json", (err, data) => {
    if (err) {
      console.log("Error al leer el archivo");
    }
    let arrayProducts = JSON.parse(data);
    const limit = parseInt(req.query.limit);
    if (!limit) {
      return res.send(arrayProducts);
    } else {
      arrayProducts = arrayProducts.slice(0, limit);
      return res.send(arrayProducts);
    }
  });
});

// filtrado query
app.get("/products/:productId", (req, res) => {
  fs.readFile("./products.json", (err, data) => {
    if (err) {
      console.log("Error al leer el archivo");
    }
    const arrayProducts = JSON.parse(data);
    const productsId = parseInt(req.params.productId);
    const product = arrayProducts.find((product) => product.id === productsId);
    if (!product) {
      const error = { error: "Producto no encontrado" };
      return res.status(404).send(error);
    }
    res.send(product);
  });
});
//inicializacion del server en puerto 8080
app.listen(8080, () => {
  console.log("servidor abierto en 8080");
});
