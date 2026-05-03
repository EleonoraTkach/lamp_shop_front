export const categories = [
  { id: 1, name: "Смартфоны" },
  { id: 2, name: "Ноутбуки" },
];

export const products = [
  {
    id: 1,
    name: "iPhone 15",
    price: 1000,
    quantity: 10,
    category_id: 1,
  },
  {
    id: 2,
    name: "Samsung Galaxy",
    price: 800,
    quantity: 0,
    category_id: 1,
  },
  {
    id: 3,
    name: "MacBook",
    price: 2000,
    quantity: 3,
    category_id: 2,
  },
];

export const orders = [
  {
    id: 1,
    order_number: "ABC123",
    status: "В обработке",
    total_cost: 1800,
    updated_at: "2026-05-03",
    items: [
      {
        product_id: 1,
        name: "iPhone 15",
        quantity: 5,
      },
      {
        product_id: 3,
        name: "MacBook",
        quantity: 1,
      },
    ],
  },
];

export const reviews = [
  {
    id: 1,
    product_id: 1,
    score: 5,
    description: "Отличный телефон!",
  },
  {
    id: 2,
    product_id: 1,
    score: 4,
    description: "Хороший, но дорогой",
  },
];