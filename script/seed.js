"use strict";

const {
  db,
  models: { User, Product, LineItem, Order, Promotion },
} = require("../server/db");
const faker = require("faker");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  const avatar_url =
    "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500";
  // Creating Users
  const users = await Promise.all([
    await User.create({
      username: "cody",
      password: "123",
      email: "cody@fsa.com",
      DOB:'1995-01-02',
      isAdmin: true,
      // avatar: faker.image.avatar()
      avatar: avatar_url,
    }),
    await User.create({
      username: "murphy",
      password: "123",
      email: "murphy@fsa.com",
      DOB:'1995-01-02',
      // avatar: faker.image.avatar()
      avatar: avatar_url,
    }),
    await User.create({
      username: faker.name.firstName().toLowerCase(),
      password: "123",
      email: faker.internet.email(),
      DOB:'1995-01-02',
      // avatar: faker.image.avatar()
      avatar: avatar_url,
    }),
    await User.create({
      username: faker.name.firstName().toLowerCase(),
      password: "123",
      DOB:'1995-01-02',
      email: faker.internet.email(),
      // avatar: faker.image.avatar()
      avatar: avatar_url,
    }),
    await User.create({
      username: faker.name.firstName().toLowerCase(),
      password: "123",
      DOB:'1995-01-02',
      email: faker.internet.email(),
      // avatar: faker.image.avatar()
      avatar: avatar_url,
    }),
    await User.create({
      username: faker.name.firstName().toLowerCase(),
      password: "123",
      DOB:'1995-01-02',
      email: faker.internet.email(),
      // avatar: faker.image.avatar()
      avatar: avatar_url,
    }),
    await User.create({
      username: faker.name.firstName().toLowerCase(),
      password: "123",
      DOB:'1995-01-02',
      email: faker.internet.email(),
      // avatar: faker.image.avatar()
      avatar: avatar_url,
    }),
    await User.create({
      username: faker.name.firstName().toLowerCase(),
      password: "123",
      DOB:'1995-01-02',
      email: faker.internet.email(),
      // avatar: faker.image.avatar()
      avatar: avatar_url,
    }),
    await User.create({
      username: faker.name.firstName().toLowerCase(),
      password: "123",
      DOB:'1995-01-02',
      email: faker.internet.email(),
      // avatar: faker.image.avatar()
      avatar: avatar_url,
    }),
    await User.create({
      username: faker.name.firstName().toLowerCase(),
      password: "123",
      DOB:'1995-01-02',
      email: faker.internet.email(),
      // avatar: faker.image.avatar()
      avatar: avatar_url,
    }),
  ]);

  // Create Products

  // Roses
  await Product.create({
    name: "PETITE ODETTE",
    price: 56.0,
    image_url: "/Images/roses/7-pink-roses-400x400-39400.jpeg",
    image_url2:
      "/Images/roses/550x550/valentine-s-day-7-pink-roses-550x550-39400.jpg",
    image_url3:
      "/Images/roses/550x550/valentine-s-day-7-pink-roses-550x550-39400-1.jpg",
    image_url4:
      "/Images/roses/550x550/valentine-s-day-7-pink-roses-550x550-39400-2.jpg",
    description: faker.lorem.sentences(),
    category: "rose",
    stock: 20,
  });
  await Product.create({
    name: "ODETTE",
    price: 78.0,
    image_url: "/Images/roses/pink-roses-bouquet-400x400-37411.jpeg",
    description: faker.lorem.sentences(),
    category: "rose",
    stock: 20,
  });
  await Product.create({
    name: "GRAND BRIGITTE",
    price: 234.0,
    image_url: "/Images/roses/100-pink-rose.jpeg",
    description: faker.lorem.sentences(),
    category: "rose",
    stock: 20,
  });
  await Product.create({
    name: "PETIT AMOUR",
    price: 58.0,
    image_url: "/Images/roses/7-red-roses-400x400-39251.jpeg",
    description: faker.lorem.sentences(),
    category: "rose",
    stock: 20,
  });
  await Product.create({
    name: "AMOUR",
    price: 82.0,
    image_url: "/Images/roses/red-roses-bouquet-400x400-37412.jpeg",
    description: faker.lorem.sentences(),
    category: "rose",
    stock: 20,
  });
  await Product.create({
    name: "GRAND AMOUR",
    price: 234.0,
    image_url: "/Images/roses/100-red-rose.jpeg",
    description: faker.lorem.sentences(),
    category: "rose",
    stock: 20,
  });
  await Product.create({
    name: "PETITE BLANCHE",
    price: 56.0,
    image_url: "/Images/roses/7-white-roses-400x400-37428.jpeg",
    description: faker.lorem.sentences(),
    category: "rose",
    stock: 20,
  });
  await Product.create({
    name: "BLANCHE",
    price: 78.0,
    image_url: "/Images/roses/white-roses-bouquet-400x400-37413.jpeg",
    description: faker.lorem.sentences(),
    category: "rose",
    stock: 20,
  });
  await Product.create({
    name: "GRAND JOSEPHINE",
    price: 234.0,
    image_url: "/Images/roses/100-white-rose.jpeg",
    description: faker.lorem.sentences(),
    category: "rose",
    stock: 20,
  });
  await Product.create({
    name: "PETITE LOLITA",
    price: 58.0,
    image_url: "/Images/roses/petite-lolita-400x400-39821.jpg",
    description: faker.lorem.sentences(),
    category: "rose",
    stock: 20,
  });
  await Product.create({
    name: "PETITE TILDA",
    price: 58.0,
    image_url: "/Images/roses/petite-tilda-400x400-39825.jpg",
    description: faker.lorem.sentences(),
    category: "rose",
    stock: 20,
  });
  await Product.create({
    name: "SOLEIL",
    price: 78.0,
    image_url: "/Images/roses/soleil-bouquet-400x400-39417.jpg",
    description: faker.lorem.sentences(),
    category: "rose",
    stock: 20,
  });
  await Product.create({
    name: "TILDA",
    price: 82.0,
    image_url: "/Images/roses/tilda-400x400-39818.jpg",
    description: faker.lorem.sentences(),
    category: "rose",
    stock: 20,
  });
  await Product.create({
    name: "LOLITA",
    price: 82.0,
    image_url: "/Images/roses/lolita-400x400-39820.jpg",
    description: faker.lorem.sentences(),
    category: "rose",
    stock: 20,
  });
  await Product.create({
    name: "EROS",
    price: 82.0,
    image_url:
      "/Images/roses/valentine-s-day-red-and-pink-roses-bouquet-ode-a-la-rose-400x400-37407.jpg",
    description: faker.lorem.sentences(),
    category: "rose",
    stock: 20,
  });

  // Tulip
  await Product.create({
    name: "DANIELLE",
    price: 88,
    image_url: "/Images/tulips/danielle-400x400-39708.jpeg",
    description: faker.lorem.sentences(),
    category: "tulip",
    stock: 20,
  });
  await Product.create({
    name: "GABRIELLE",
    price: 102,
    image_url: "/Images/tulips/gabriella-400x400-39805.jpeg",
    description: faker.lorem.sentences(),
    category: "tulip",
    stock: 20,
  });
  await Product.create({
    name: "CHANEL",
    price: 103,
    image_url: "/Images/tulips/chanel-400x400-39804.jpeg",
    description: faker.lorem.sentences(),
    category: "tulip",
    stock: 20,
  });
  await Product.create({
    name: "ELOISE",
    price: 82,
    image_url: "/Images/tulips/eloise-400x400-39687.jpeg",
    description: faker.lorem.sentences(),
    category: "tulip",
    stock: 20,
  });
  await Product.create({
    name: "LISETTE",
    price: 82,
    image_url: "/Images/tulips/lisette-400x400-39684.jpeg",
    description: faker.lorem.sentences(),
    category: "tulip",
    stock: 20,
  });
  await Product.create({
    name: "PAULETTE",
    price: 78,
    image_url: "/Images/tulips/paulette-400x400-39699.jpeg",
    description: faker.lorem.sentences(),
    category: "tulip",
    stock: 20,
  });

  // Orchids
  await Product.create({
    name: "PHALAENOPSIS ORCHIDS",
    price: 156,
    image_url: "/Images/orchids/white-orchids-delivery-400x400-38302.jpg",
    description: faker.lorem.sentences(),
    category: "orchid",
    stock: 20,
  });
  await Product.create({
    name: "VANDA ORCHIDS",
    price: 146,
    image_url: "/Images/orchids/purple-orchids-delivery-400x400-38303.jpg",
    description: faker.lorem.sentences(),
    category: "orchid",
    stock: 20,
  });
  await Product.create({
    name: "WHITE ORCHID",
    price: 91,
    image_url: "/Images/orchids/white-orchid-delivery-400x400-38206.jpg",
    description: faker.lorem.sentences(),
    category: "orchid",
    stock: 20,
  });
  await Product.create({
    name: "BIG MAGENTA ORCHID",
    price: 124,
    image_url:
      "/Images/orchids/double-purple-orchid-delivery-400x400-38210.jpg",
    description: faker.lorem.sentences(),
    category: "orchid",
    stock: 20,
  });
  await Product.create({
    name: "MAGENTA ORCHID",
    price: 91,
    image_url:
      "/Images/orchids/magenta-phalaenopsis-purple-orchid-delivery-400x400-41887.jpg",
    description: faker.lorem.sentences(),
    category: "orchid",
    stock: 20,
  });

  // Signature Bouquets
  await Product.create({
    name: "FELICE",
    price: 82,
    image_url:
      "/Images/signature_bouquets/pink-flowers-bouquet-ode-a-la-rose-400x400-39427.jpg",
    description: faker.lorem.sentences(),
    category: "signature_bouquets",
    stock: 20,
  });
  await Product.create({
    name: "AMELIA",
    price: 103,
    image_url: "/Images/signature_bouquets/amelia-400x400-38340.jpg",
    description: faker.lorem.sentences(),
    category: "signature_bouquets",
    stock: 20,
  });
  await Product.create({
    name: "ROXANNA",
    price: 82,
    image_url: "/Images/signature_bouquets/roxanna-400x400-39676.jpg",
    description: faker.lorem.sentences(),
    category: "signature_bouquets",
    stock: 20,
  });
  await Product.create({
    name: "MATHILDE",
    price: 164,
    image_url: "/Images/signature_bouquets/mathilde-400x400-39695.jpg",
    description: faker.lorem.sentences(),
    category: "signature_bouquets",
    stock: 20,
  });
  await Product.create({
    name: "ELLA",
    price: 110,
    image_url: "/Images/signature_bouquets/ella-400x400-38346.jpg",
    description: faker.lorem.sentences(),
    category: "signature_bouquets",
    stock: 20,
  });
  await Product.create({
    name: "FLORIA",
    price: 76,
    image_url: "/Images/signature_bouquets/floria-400x400-39685.jpg",
    description: faker.lorem.sentences(),
    category: "signature_bouquets",
    stock: 20,
  });
  await Product.create({
    name: "THERESE",
    price: 64,
    image_url: "/Images/signature_bouquets/therese-400x400-39701.jpg",
    description: faker.lorem.sentences(),
    category: "signature_bouquets",
    stock: 20,
  });
  await Product.create({
    name: "AIMEE",
    price: 61,
    image_url: "/Images/signature_bouquets/aimee-400x400-39679.jpg",
    description: faker.lorem.sentences(),
    category: "signature_bouquets",
    stock: 20,
  });
  await Product.create({
    name: "LEONIE",
    price: 67,
    image_url: "/Images/signature_bouquets/leonie-400x400-39693.jpg",
    description: faker.lorem.sentences(),
    category: "signature_bouquets",
    stock: 20,
  });

  // Sympathy
  await Product.create({
    name: "SYMPATHY BOUQUET",
    price: 237,
    image_url: "/Images/sympathy/large-funeral-arrangement-400x400-38668.jpg",
    description: faker.lorem.sentences(),
    category: "sympathy",
    stock: 20,
  });
  await Product.create({
    name: "LARGE FLOWER BASKET",
    price: 208,
    image_url: "/Images/sympathy/large-flower-basket-400x400-38675.jpg",
    description: faker.lorem.sentences(),
    category: "sympathy",
    stock: 20,
  });
  await Product.create({
    name: "FLOWER BASKET",
    price: 208,
    image_url: "/Images/sympathy/medium-flower-basket-400x400-38676.jpg",
    description: faker.lorem.sentences(),
    category: "sympathy",
    stock: 20,
  });
  await Product.create({
    name: "WHITES AND GREENS",
    price: 68,
    image_url:
      "/Images/sympathy/designers-choice-white-and-green-bouquet-400x400-39779.jpg",
    description: faker.lorem.sentences(),
    category: "sympathy",
    stock: 20,
  });

  // Preserved Roses
  await Product.create({
    name: "PETITE MONICA",
    price: 199,
    image_url:
      "/Images/preserved_rose/small-preserved-rose-blush-delivery-400x400-38464.jpg",
    description: faker.lorem.sentences(),
    category: "preserved_rose",
    stock: 20,
  });
  await Product.create({
    name: "PETITE JACQUELINE",
    price: 199,
    image_url:
      "/Images/preserved_rose/petite-jacqueline-preserved-roses-400x400-40084.jpg",
    description: faker.lorem.sentences(),
    category: "preserved_rose",
    stock: 20,
  });
  await Product.create({
    name: "ROSE GOLD RENEE",
    price: 299,
    image_url: "/Images/preserved_rose/rose-gold-renee-400x400-39312.jpg",
    description: faker.lorem.sentences(),
    category: "preserved_rose",
    stock: 20,
  });
  await Product.create({
    name: "SOLO JACQUELINE",
    price: 89,
    image_url:
      "/Images/preserved_rose/solo-jacqueline-preserved-rose-400x400-40086.jpg",
    description: faker.lorem.sentences(),
    category: "preserved_rose",
    stock: 20,
  });
  await Product.create({
    name: "JACQUELINE",
    price: 299,
    image_url:
      "/Images/preserved_rose/jacqueline-preserved-roses-400x400-40082.jpg",
    description: faker.lorem.sentences(),
    category: "preserved_rose",
    stock: 20,
  });
  await Product.create({
    name: "PETITE STELLA",
    price: 199,
    image_url:
      "/Images/preserved_rose/preserved-pink-roses-delivery-400x400-38461.jpg",
    description: faker.lorem.sentences(),
    category: "preserved_rose",
    stock: 20,
  });
  await Product.create({
    name: "PETITE GOLD RENEE",
    price: 199,
    image_url:
      "/Images/preserved_rose/petite-rose-gold-renee-400x400-39310.jpg",
    description: faker.lorem.sentences(),
    category: "preserved_rose",
    stock: 20,
  });
  await Product.create({
    name: "PETITE SANDRA",
    price: 199,
    image_url: "/Images/preserved_rose/petite-sandra-400x400-38958.jpg",
    description: faker.lorem.sentences(),
    category: "preserved_rose",
    stock: 20,
  });
  await Product.create({
    name: "ROSE GOLD STELLA",
    price: 299,
    image_url: "/Images/preserved_rose/rose-gold-stella-400x400-39424.jpg",
    description: faker.lorem.sentences(),
    category: "preserved_rose",
    stock: 20,
  });
  await Product.create({
    name: "LUCIE",
    price: 296,
    image_url: "/Images/preserved_rose/lucie-preserved-rose-400x400-41906.jpg",
    description: faker.lorem.sentences(),
    category: "preserved_rose",
    stock: 20,
  });
  await Product.create({
    name: "RENEE",
    price: 296,
    image_url:
      "/Images/preserved_rose/preserved-red-roses-delivery-last-1-year-400x400-40577.jpg",
    description: faker.lorem.sentences(),
    category: "preserved_rose",
    stock: 20,
  });
  await Product.create({
    name: "STELLA",
    price: 296,
    image_url:
      "/Images/preserved_rose/preserved-pink-roses-delivery-order-roses-400x400-40579.jpg",
    description: faker.lorem.sentences(),
    category: "preserved_rose",
    stock: 20,
  });
  await Product.create({
    name: "PETITE GOLD STELLA",
    price: 199,
    image_url:
      "/Images/preserved_rose/petite-rose-gold-stella-400x400-39422.jpg",
    description: faker.lorem.sentences(),
    category: "preserved_rose",
    stock: 20,
  });
  await Product.create({
    name: "GRAND SANDRA",
    price: 366,
    image_url:
      "/Images/preserved_rose/preserved-purple-roses-real-last-1-year-400x400-40573.jpg",
    description: faker.lorem.sentences(),
    category: "preserved_rose",
    stock: 20,
  });
  await Product.create({
    name: "LUCILLE",
    price: 296,
    image_url:
      "/Images/preserved_rose/preserved-rose-delivery-mixed-pastel-roses-400x400-40576.jpg",
    description: faker.lorem.sentences(),
    category: "preserved_rose",
    stock: 20,
  });
  await Product.create({
    name: "GRAND RENEE",
    price: 366,
    image_url:
      "/Images/preserved_rose/preserved-real-red-roses-that-last-a-year-400x400-40572.jpg",
    description: faker.lorem.sentences(),
    category: "preserved_rose",
    stock: 20,
  });
  await Product.create({
    name: "GRAND LUCILLE",
    price: 364,
    image_url:
      "/Images/preserved_rose/preserved-rose-arrangements-100-real-mixed-pastel-roses-400x400-38236.jpg",
    description: faker.lorem.sentences(),
    category: "preserved_rose",
    stock: 20,
  });
  await Product.create({
    name: "GRAND STELLA",
    price: 366,
    image_url:
      "/Images/preserved_rose/preserved-pink-rose-bouquets-100-real-last-1-year-400x400-40574.jpg",
    description: faker.lorem.sentences(),
    category: "preserved_rose",
    stock: 20,
  });
  await Product.create({
    name: "SANDRA",
    price: 296,
    image_url:
      "/Images/preserved_rose/preserved-purple-rose-delivery-order-roses-400x400-40578.jpg",
    description: faker.lorem.sentences(),
    category: "preserved_rose",
    stock: 20,
  });

  await Order.create({ userId: 1 });
  await Promotion.create({
    Code: "HPMTRD22",
    name: 'Mother-Day',
    Discount: 0.1,
    Start_Date: "2022-05-02",
    End_Date: "2022-05-08",
    Free_Shipping: true
  });
  await Promotion.create({
    Code: "ADMINONLY",
    name: 'admin',
    Discount: 0.3,
    Start_Date: "2000-01-01",
    End_Date: "2030-12-31",
    Free_Shipping: true
  });

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);

  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
