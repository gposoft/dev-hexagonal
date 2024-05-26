export class ProductEntity {
  constructor(data?: { id: string; code: string; name: string; price: number; createdAt: Date }) {
    if (data) {
      Object.assign(this, data);
    }
  }

  id: string;
  code: string;
  name: string;
  price: number;

  createdAt: Date;
  updatedAt: Date;
}

export class CreateProductEntity {
  constructor(data?: { id: string; code: string; name: string; price: number; createdAt: Date }) {
    if (data) {
      Object.assign(this, data);
    }
  }

  id: string;
  code: string;
  name: string;
  price: number;

  createdAt: Date;
}

export class UpdateProductEntity {
  constructor(data?: { code?: string; name?: string; price?: number; updatedAt: Date }) {
    if (data) {
      Object.assign(this, data);
    }
  }

  code?: string;
  name?: string;
  price?: number;

  updatedAt: Date;
}
