const destinations = [
  {
    id: 1,
    slug: "verona",
    city: "Verona",
    country: "Italy",
    year: "2025",
    category: "City",
    featured: true,

    coverImage: "images/italy/verona/optimized/verona-cover.jpg",

    shortDescription:
      "Historic streets, elegant architecture, and warm Italian atmosphere.",

    page: "cities/verona.html",
  },

  {
    id: 2,
    slug: "copenhagen",
    city: "Copenhagen",
    country: "Denmark",
    year: "2025",
    category: "City",
    featured: true,

    coverImage: "images/denmark/copenhagen/optimized/copenhagen-cover.jpg",

    shortDescription:
      "Nordic atmosphere, colorful houses, and calm city moments.",

    page: "cities/copenhagen.html",
  },
  {
    id: 3,
    slug: "cyclades",
    city: "Cyclades",
    country: "Greece",
    year: "2018",
    category: "Islands",
    featured: true,

    coverImage: "images/greece/cyclades/optimized/cyclades-cover.jpg",

    shortDescription:
      "Nordic atmosphere, colorful houses, and calm city moments.",

    page: "cities/cyclades.html",
  },
  {
    id: 4,
    slug: "edinburgh",
    city: "Edinburgh",
    country: "Scotland",
    year: "2019",
    category: "city",
    featured: true,

    coverImage: "images/scotland/edinburgh/optimized/edinburgh-cover.jpeg",

    shortDescription:
      "Nordic atmosphere, colorful houses, and calm city moments.",

    page: "cities/edinburgh.html",
  },
  {
    id: 5,
    slug: "dublin",
    city: "Dublin",
    country: "Ireland",
    year: "2019",
    category: "city",
    featured: true,

    coverImage: "images/ireland/dublin/optimized/dublin-cover.jpeg",

    shortDescription:
      "Nordic atmosphere, colorful houses, and calm city moments.",

    page: "cities/dublin.html",
  },
  {
    id: 6,
    slug: "florence",
    city: "Florence",
    country: "Italy",
    year: "2019",
    category: "city",
    featured: true,

    coverImage: "images/ireland/dublin/optimized/dublin-cover.jpeg",

    shortDescription:
      "Nordic atmosphere, colorful houses, and calm city moments.",

    page: "cities/florence.html",
  },
  {
    id: 7,
    slug: "athens",
    city: "Athens",
    country: "Greece",
    year: "2021",
    category: "city",
    featured: true,

    coverImage: "images/greece/athens/optimized/athens_cover.jpeg",

    shortDescription:
      "Nordic atmosphere, colorful houses, and calm city moments.",

    page: "cities/athens.html",
  },
  {
    id: 8,
    slug: "milan",
    city: "Milan",
    country: "Italy",
    year: "2022",
    category: "city",
    featured: true,

    coverImage: "images/italy/milan/optimized/milan-cover.jpeg",

    shortDescription:
      "Nordic atmosphere, colorful houses, and calm city moments.",

    page: "cities/milan.html",
  },
  {
    id: 9,
    slug: "oslo",
    city: "Oslo",
    country: "Norway",
    year: "2022",
    category: "city",
    featured: true,

    coverImage: "images/norway/oslo/optimized/oslo-cover.jpeg",

    shortDescription:
      "Nordic atmosphere, colorful houses, and calm city moments.",

    page: "cities/oslo.html",
  },
  {
    id: 10,
    slug: "paros",
    city: "Paros",
    country: "Greece",
    year: "2022",
    category: "city",
    featured: true,

    coverImage: "images/greece/paros/optimized/paros-cover.jpeg",

    shortDescription:
      "Nordic atmosphere, colorful houses, and calm city moments.",

    page: "cities/paros.html",
  },
  {
    id: 11,
    slug: "london",
    city: "London",
    country: "England",
    year: "2023",
    category: "city",
    featured: true,

    coverImage: "images/england/london/optimized/london-cover.jpeg",

    shortDescription:
      "Nordic atmosphere, colorful houses, and calm city moments.",

    page: "cities/london.html",
  },
  {
    id: 12,
    slug: "reykjavik",
    city: "Reykjavik",
    country: "Iceland",
    year: "2023",
    category: "city",
    featured: true,

    coverImage: "images/iceland/reykjavik/optimized/reykjavik-cover.jpeg",

    shortDescription:
      "Nordic atmosphere, colorful houses, and calm city moments.",

    page: "cities/reykjavik.html",
  },
  {
    id: 13,
    slug: "wien",
    city: "wien",
    country: "Austria",
    year: "2023",
    category: "city",
    featured: true,

    coverImage: "images/austria/wien/optimized/wien-cover.jpg",

    shortDescription:
      "Nordic atmosphere, colorful houses, and calm city moments.",

    page: "cities/wien.html",
  },
  {
    id: 14,
    slug: "malmoe",
    city: "Malmoe",
    country: "Sweden",
    year: "2023",
    category: "city",
    featured: true,

    coverImage: "images/sweden/malmoe/optimized/malmoe-cover.jpg",

    shortDescription:
      "Nordic atmosphere, colorful houses, and calm city moments.",

    page: "cities/malmoe.html",
  },
  {
    id: 15,
    slug: "bergen",
    city: "Bergen",
    country: "Norway",
    year: "2024",
    category: "city",
    featured: true,

    coverImage: "images/norway/bergen/optimized/bergen-cover.jpg",

    shortDescription:
      "Nordic atmosphere, colorful houses, and calm city moments.",

    page: "cities/bergen.html",
  },
  {
    id: 16,
    slug: "sounio",
    city: "sounio",
    country: "Greece",
    year: "2024",
    category: "city",
    featured: true,

    coverImage: "images/greece/sounio/optimized/sounio-cover.jpg",

    shortDescription:
      "Nordic atmosphere, colorful houses, and calm city moments.",

    page: "cities/sounio.html",
  },
  {
    id: 17,
    slug: "salzburg",
    city: "Salzburg",
    country: "Austria",
    year: "2024",
    category: "city",
    featured: true,

    coverImage: "images/austria/salzburg/optimized/salzburg-cover.jpg",

    shortDescription:
      "Nordic atmosphere, colorful houses, and calm city moments.",

    page: "cities/salzburg.html",
  },
  {
    id: 18,
    slug: "prague",
    city: "Prague",
    country: "Czechia",
    year: "2024",
    category: "city",
    featured: true,

    coverImage: "images/czechia/prague/optimized/prague-cover.jpg",

    shortDescription:
      "Nordic atmosphere, colorful houses, and calm city moments.",

    page: "cities/prague.html",
  },
  {
    id: 19,
    slug: "serifos",
    city: "Serifos",
    country: "Greece",
    year: "2024",
    category: "city",
    featured: true,

    coverImage: "images/greece/serifos/optimized/serifos-cover.jpg",

    shortDescription:
      "Nordic atmosphere, colorful houses, and calm city moments.",

    page: "cities/serifos.html",
  },
  {
    id: 20,
    slug: "sifnos",
    city: "Sifnos",
    country: "Greece",
    year: "2024",
    category: "city",
    featured: true,

    coverImage: "images/greece/sifnos/optimized/sifnos-cover.jpeg",

    shortDescription:
      "Nordic atmosphere, colorful houses, and calm city moments.",

    page: "cities/sifnos.html",
  },
  {
    id: 21,
    slug: "tromso",
    city: "Tromso",
    country: "Norway",
    year: "2024",
    category: "city",
    featured: true,

    coverImage: "images/norway/tromso/optimized/tromso-cover.jpg",

    shortDescription:
      "Nordic atmosphere, colorful houses, and calm city moments.",

    page: "cities/tromso.html",
  },
];
