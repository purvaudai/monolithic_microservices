const express = require("express");
const app = express();
const port = process.env.PORT || 8081;
const path = require("path");

//Load orders for pseudo database
const orders = require("./data/orders.json").orders;

//Serve website
app.use(express.static(path.join(__dirname, "..", "public")));

//Get all orders
app.get("/api/orders", (req, res) => res.json(orders));

//Get orders by ID
app.get("/api/orders/:id", (req, res) =>
  res.json(orders.find(order => order.id === req.params.id))
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
  console.log(`Orders microservice listening on port ${port}!`)
);
