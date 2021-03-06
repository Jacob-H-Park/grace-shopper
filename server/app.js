const path = require("path");
const express = require("express");
const cors = require("cors");
// Passport.js middleware for third-party OAuth logins
const cookieSession = require("cookie-session");
// const expressSession = require("express-session");
const passport = require("passport");
const passportSetup = require("./auth/passport-setup");
const morgan = require("morgan");
const app = express();

// logging middleware
app.use(morgan("dev"));

// body parsing middleware
app.use(express.json());

// twitter authentication requires session support before auth/passport middleware loads
// app.use(expressSession({
//   secret: "team-7",
//   resave: false,
//   saveUninitialized: true
// }));
app.use(
  cookieSession({
    name: "twitter-auth-session",
    keys: ["team-7-fantastic"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

// auth and api routes
app.use("/auth", require("./auth"));
app.use("/api", require("./api"));

app.use(cors());
// passport.js middleware
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "public/index.html"))
);
app.get("/payment-success", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "public/paymentSuccess.html"))
);
app.get("/payment-error", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "public/paymentError.html"))
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
      line_items: req.body.itemsInCart.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
            },
            unit_amount: Math.floor(item.price * (1 - req.body.discount)) * 100,
          },
          quantity: item.lineItem.quantity,
        };
      }),

      success_url: `http://localhost:8080/payment-success`,
      cancel_url: `http://localhost:8080/payment-error`,
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
