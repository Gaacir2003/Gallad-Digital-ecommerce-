

// Home Page Products
import smart from "../assets/smart.png";
import mackbook from "../assets/mackbook.png";
import Tv from "../assets/Tv.png";
import chair from "../assets/chair.jpg";

// Importing Products Section
import dhago from "../assets/dhago.png";
import saacad from "../assets/saacad.jpg";
import sameecad from "../assets/sameecad.png";
import samsung from "../assets/samsung.jpg";

export const products = [
  {
    id: 101,
    title: "The Apple Watch is a smart.",
    name: "Apple Watch",
    price: 120,
    oldPrice: 160,
    discount: 40,
    rating: 4.5,
    category: "Electronics",
    image: smart,
  },
  {
    id: 102,
    title: "A powerful, lightweight.",
    name: "AK-900 Wired Keyboard",
    price: 960,
    oldPrice: 1160,
    discount: 35,
    rating: 4.2,
    category: "Electronics",
    image: mackbook,
  },
  {
    id: 103,
    title: "IPS LCD Gaming Monitor",
    name: "IPS LCD Gaming Monitor",
    price: 370,
    oldPrice: 400,
    discount: 30,
    rating: 4.3,
    category: "Electronics",
    image: Tv,
  },
  {
    id: 104,
    title: "S-Series Comfort Chair",
    name: "S-Series Comfort Chair",
    price: 375,
    oldPrice: 400,
    discount: 25,
    rating: 4.5,
    category: "Furniture",
    image: chair,
  },

  {
    id: 201,
    name: "Wireless Earphones",
    title: "Wireless Earphones",
    price: 45,
    oldPrice: 80,
    discount: 45,
    rating: 4.5,
    category: "Electronics",
    image: dhago,
  },
  {
    id: 202,
    name: "Smart Watch",
    title: "Smart Watch",
    price: 60,
    oldPrice: 120,
    discount: 50,
    rating: 4.0,
    category: "Electronics",
    image: saacad,
  },
  {
    id: 203,
    name: "Wireless Speaker",
    title: "Wireless Speaker",
    price: 35,
    oldPrice: 50,
    discount: 30,
    rating: 5.0,
    category: "Electronics",
    image: sameecad,
  },
  {
    id: 204,
    name: "Samsung Z f7",
    title: "Samsung Z f7",
    price: 25,
    oldPrice: 40,
    discount: 38,
    rating: 3.5,
    category: "Electronics",
    image: samsung,
  },
];
