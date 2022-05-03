const path = require("path");
const express = require("express");
const morgan = require("morgan");
const app = express();

// logging middleware
app.use(morgan("dev"));

// body parsing middleware
app.use(express.json());

// auth and api routes
app.use("/auth", require("./auth"));
app.use("/api", require("./api"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "public/index.html"))
);

// // static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "public")));

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

require("dotenv").config({ path: "../.env" });

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const storeItems = new Map([
  [1, { priceInCents: 3000, name: "red rose" }],
  [2, { priceInCents: 2500, name: "pink tulip" }],
]);

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Total",
            },
            unit_amount: item.total * 100,
          },
          quantity: item.quantity,
        };
      }),
      // line_items: req.body.items.map((item) => {
      //   const storeItem = storeItems.get(item.id);
      //   return {
      //     price_data: {
      //       currency: "usd",
      //       product_data: {
      //         name: storeItem.name,
      //       },
      //       unit_amount: storeItem.priceInCents,
      //     },
      //     quantity: item.quantity,
      //   };
      // }),
      success_url: `http://localhost:8080/success.html`,
      cancel_url: `http://localhost:8080/cancel.html`,
    });

    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// sends index.html (redirects invalid urls to homepage)
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public/index.html"));
});

module.exports = app;
