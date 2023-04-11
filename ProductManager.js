const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  readProducts() {
    try {
      const data = fs.readFileSync(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  writeProducts(products) {
    fs.writeFileSync(this.path, JSON.stringify(products));
  }

  addProduct(prod) {
    const products = this.readProducts();
    const id = products.length + 1;
    const producto = { ...prod, id: id };

    products.push(producto);

    this.writeProducts(products);
  }

  getProductById(itemId) {
    const products = this.readProducts();

    const item = products.find((e) => e.id === itemId);
    if (!item) {
      console.log(`item ${itemId} Not found`);
    }
    console.log(`${itemId}`);
    return;
  }
  deleteProduct(itemId) {
    const products = this.readProducts();
    const index = products.findIndex((e) => e.id === itemId);
    if (index !== -1) {
      products.splice(index, 1);
      console.log(`se elimino el producto ${itemId}`);
    } else {
      console.error("no hay ningun item con el ID correspondiente.");
    }
    this.writeProducts(products);
  }

  updateProduct(itemId, title, description, price, thumbnail, code, stock) {
    const products = this.readProducts();
    const productFound = products.find((e) => e.id === itemId);
    if (productFound) {
      productFound.title = title;
      productFound.description = description;
      productFound.price = price;
      productFound.thumbnail = thumbnail;
      productFound.code = code;
      productFound.stock = stock;
      this.writeProducts(products);
      console.log(`producto con ID ${itemId} actualizado.`);
    } else {
      console.log(`No se encontró un producto con ID ${itemId}.`);
    }
  }
}

module.exports = ProductManager;

const productManager = new ProductManager("./products.json");
// obtener producto por ID:

//productManager.getProductById(4);

// eliminar producto por ID:

//productManager.deleteProduct(1);

// updatear producto por ID:

//productManager.updateProduct(1, "rx 5500", "2gb", 3000, "no image", "234", 10);
