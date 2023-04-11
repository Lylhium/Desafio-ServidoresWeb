const ProductManager = require("./ProductManager");

const productManager = new ProductManager("./products.json");

async function addProducts(title, description, price, thumbnail, code, stock) {
  if (!title || !description || !price || !thumbnail || !code || !stock) {
    console.error("se debe completar los campos correspondientes.");
    return;
  }

  const product = {
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
  };
  await productManager.addProduct(product);

  //consulta de products:
  const productos = await productManager.readProducts();
  console.log(productos);
}

addProducts("rtx 4080", "3gb", 2000, "Sin imagen", "456", 5);
