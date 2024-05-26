<p align="center">
  <a href="#" target="blank"><img src="./images/solid.png" width="600" alt="Nest Logo" /></a>
</p>

## Los 5 principios para desarrollar software de calidad

### 2. Principio Abierto-Cerrado (Open-Closed Principle) - OPC

Es un principio fundamental en el diseño de software. Este principio establece que una entidad de software (como una clase, módulo o función) debe estar abierta para su extensión, pero cerrada para su modificación.

Esto significa que debes poder agregar nuevas funcionalidades o comportamientos a una entidad de software sin cambiar su código fuente. En otras palabras, una vez que una entidad de software está desarrollada y probada, el código fuente de esa entidad no debería modificarse a menos que se encuentre un error.

El OCP se puede lograr mediante el uso de patrones de diseño como la herencia y la composición, junto con el uso de interfaces y clases abstractas. Por ejemplo, puedes definir una interfaz o una clase abstracta que describa un comportamiento general, y luego extender esa interfaz o clase abstracta para implementar comportamientos específicos.

El OCP es importante porque ayuda a hacer el software más robusto, flexible y menos propenso a errores. Al adherirse a este principio, puedes agregar o cambiar funcionalidades sin afectar las partes del software que ya funcionan. Esto facilita el mantenimiento y la extensibilidad del software, y hace que el software sea más adaptable a los cambios.

#### Ejemplo 1:

```ts
// Violación del OPC

class InMemoryProductRepository {
  private products: any[];

  constructor() {
    this.products = [
      { id: 1, name: "Producto 1", price: 100 },
      { id: 2, name: "Producto 2", price: 200 },
      // Más productos...
    ];
  }

  getAllProducts() {
    return this.products;
  }

  getProductById(id: number) {
    return this.products.find((product) => product.id === id);
  }
}
```

En este caso, la clase InMemoryProductRepository tiene una responsabilidad: manejar los productos en memoria. Si queremos cambiar la forma en que almacenamos los productos (por ejemplo, en una base de datos), tendríamos que modificar la clase directamente. Esto viola el Principio Abierto-Cerrado.

```ts
interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductRepository {
  getAllProducts(): Product[];
  getProductById(id: number): Product;
}

class InMemoryProductRepository implements ProductRepository {
  private products: Product[];

  constructor() {
    this.products = [
      { id: 1, name: "Producto 1", price: 100 },
      { id: 2, name: "Producto 2", price: 200 },
      // Más productos...
    ];
  }

  getAllProducts() {
    return this.products;
  }

  getProductById(id: number) {
    return this.products.find((product) => product.id === id);
  }
}
```

En este caso, se agrega la interfaces: Product y ProductRepository.

Además, se ha abstraído la lógica de consultas a los productos en una nueva clase: InMemoryProductRepository, la cual depende de una interfaz y no de una implementación específica. Ahora, si queremos implementar un repositorio con una base de datos como MySQL, por ejemplo, no tendremos que modificar la clase InMemoryProductRepository. Esto es un ejemplo de cómo el Principio Abierto-Cerrado puede ayudar a mejorar la calidad del código

```ts
// Violación del OCP
class FiltroProductos {
  filtrarPorColor(productos: Producto[], color: string): Producto[] {
    return productos.filter((producto) => producto.color === color);
  }

  filtrarPorPrecio(productos: Producto[], precio: number): Producto[] {
    return productos.filter((producto) => producto.precio <= precio);
  }
}

class Producto {
  constructor(public nombre: string, public color: string, public precio: number) {}
}
```

Imaginemos un sistema de filtrado de productos en una tienda en línea. Inicialmente, tenemos una clase FiltroProductos que filtra productos según ciertos criterios.

```ts
// Aplicando el OCP
interface CriterioFiltrado {
  cumpleCriterio(producto: Producto): boolean;
}

class FiltroProductos {
  filtrar(productos: Producto[], criterio: CriterioFiltrado): Producto[] {
    return productos.filter((producto) => criterio.cumpleCriterio(producto));
  }
}

class FiltrarPorColor implements CriterioFiltrado {
  constructor(private color: string) {}

  cumpleCriterio(producto: Producto): boolean {
    return producto.color === this.color;
  }
}

class FiltrarPorPrecio implements CriterioFiltrado {
  constructor(private precio: number) {}

  cumpleCriterio(producto: Producto): boolean {
    return producto.precio <= this.precio;
  }
}
```

En este ejemplo, se utiliza la interfaz CriterioFiltrado que define un método cumpleCriterio. Luego, las clases que implementan esta interfaz (FiltrarPorColor y FiltrarPorPrecio). La clase FiltroProductos ahora utiliza esta interfaz en su método filtrar, permitiendo así la extensión sin modificar la clase original. Si necesitamos agregar nuevos criterios de filtrado, simplemente creamos nuevas clases que implementen CriterioFiltrado, cumpliendo con el principio OCP.

```ts
// Violación del OCP
class ProcesadorPagos {
  procesarPago(producto: Producto, tipoDescuento: string): number {
    let precioConDescuento = producto.precio;

    switch (tipoDescuento) {
      case "Descuento10":
        precioConDescuento = this.aplicarDescuento10(producto.precio);
        break;
      case "Descuento20":
        precioConDescuento = this.aplicarDescuento20(producto.precio);
        break;
      // Más tipos de descuentos...
      default:
        // Sin descuento
        break;
    }

    return precioConDescuento;
  }

  private aplicarDescuento10(precio: number): number {
    return precio * 0.9;
  }

  private aplicarDescuento20(precio: number): number {
    return precio * 0.8;
  }
}
```

En este caso, imaginemos un sistema de procesamiento de pagos donde se aplican descuentos a los productos. En este caso, si quisiéramos agregar un nuevo tipo de descuento, tendríamos que modificar la clase ProcesadorPagos, lo cual viola el OCP.

```ts

// Aplicando el OCP
interface Descuento {
    aplicarDescuento(precio: number): number;
}

class ProcesadorPagos {
    //aplica polimorfismo  
    procesarPago(producto: Producto, descuento: Descuento): number {
        return descuento.aplicarDescuento(producto.precio);
    }
}

class Descuento10 implements Descuento {
    aplicarDescuento(precio: number): number {
        return precio * 0.9;
    }
}

class Descuento20 implements Descuento {
    aplicarDescuento(precio: number): number {
        return precio * 0.8;
    }
}

// Agregar más tipos de descuentos...

```

Interfaz Descuento que define un método aplicarDescuento. Luego, la clases que implementan esta interfaz (Descuento10 y Descuento20). La clase ProcesadorPagos ahora utiliza esta interfaz en su método procesarPago, permitiendo agregar nuevos tipos de descuentos sin modificar la clase original.

```ts

export interface Bebida {
  getProduct(): string;
  getPrice(): number;
}

export class Cafe implements Bebida {
  getProduct(): string {
    return "Cafe Negro";
  }
  getPrice(): number {
    return 100;
  }
}

export class Leche implements Bebida {
  constructor(private readonly bebida: Bebida) {}

  getProduct(): string {
    return `Producto: ${this.bebida.getProduct()} con leche`;
  }
  getPrice(): number {
    return this.bebida.getPrice() + 50
  }
}


const cafe = new Cafe()
console.log({ product: cafe.getProduct(), price: cafe.getPrice()  })

const leche = new Leche(cafe);
console.log({ product: leche.getProduct(), price: leche.getPrice() });

```

[**Regresar**](./intro.md)
