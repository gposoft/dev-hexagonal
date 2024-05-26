import { ProductEntity } from "../modules/products/domain/entities";

export const Products: ProductEntity[] = [
  {
    id: "1",
    code: "100",
    name: "Producto 1",
    price: 1000,
    createdAt: new Date("2024-04-25T12:00:00"),
    updatedAt: new Date("2024-05-25T00:00:00"),
  },
];