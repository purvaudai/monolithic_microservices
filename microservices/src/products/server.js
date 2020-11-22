const express = require("express");
//const cors = require("cors");
const app = express();
const port = process.env.PORT || 8082;
const path = require("path");

//Load product for pseudo database
const products = require("./data/products.json").products;

//Enable cors
//app.use(cors());

//Serve website
app.use(express.static(path.join(__dirname, "..", "public")));

//Get all products
app.get("/api/products", (req, res) => res.json(products));

//Get products by ID
app.get("/api/products/:id", (req, res) =>
  res.json(products.find(product => product.id === req.params.id))
);

//Client side routing fix on page refresh or direct browsing to non-root directory
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..",  "public", "index.html"), err => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(port, () =>
  console.log(`Products microservice listening on port ${port}!`)
);
