const router = require("express").Router();
const db = require("../../database");

router.get("/", (req, res) => {
  let date = new Date();
  date.setHours(date.getHours() - 12);
  const timestamp = date.toISOString();

  db.query(
    `SELECT * FROM orders
		WHERE display = 1 AND orderedOn > ?
		ORDER BY orderedOn ASC`,
    {
      replacements: [timestamp],
      type: db.QueryTypes.SELECT
    }
  ).then(ordersDb => {
    db.query(
      `SELECT * FROM order_items
			 WHERE display = 1`,
      { type: db.QueryTypes.SELECT }
    ).then(orderItems => {
      let orders = [];

      for (const order of ordersDb) {
        let orderRow = orderItems.filter(oi => oi.orderId === order.id);
        orders.push({ ...order, items: orderRow });
      }

      res.json({ orders });
    });
  });
});

router.post("/", (req, res) => {
  let date = req.body.date.split("-");
  let time = req.body.time.split(":");
  let datetime = new Date(date[0], date[1], date[2], time[0], time[1]);

  db.query(`INSERT INTO orders (userId, amount, orderedOn) VALUES (?, ?, ?)`, {
    replacements: [1, req.body.amount, datetime]
  }).then(order => {
    const orderId = order[0];

    for (const item of req.body.items) {
      db.query(
        `INSERT INTO order_items (orderId, productId, quantity) VALUES (?, ?, ?)`,
        {
          replacements: [orderId, item.id, item.quantity]
        }
      );
    }

    res.json({ success: true, orderId });
  });
});

module.exports = router;
