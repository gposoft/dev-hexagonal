<p align="center">
  <a href="#" target="blank"><img src="./images/solid.png" width="600" alt="Nest Logo" /></a>
</p>

## Los 5 principios para desarrollar software de calidad

### 3. Principio de sustitución de Liskov (Liskov Substitution Principle): LSP

El Principio de Sustitución de Liskov (LSP), por sus siglas en inglés (Liskov Substitution Principle), es un principio fundamental en la programación orientada a objetos. Este principio establece que si una clase S es un subtipo de una clase T, entonces los objetos de tipo T pueden ser reemplazados por objetos de tipo S sin alterar ninguna de las propiedades deseables de ese programa.

En términos más simples, si tienes una clase base y una clase derivada, deberías poder usar la clase derivada en lugar de la clase base sin que tu programa falle o se comporte de manera inesperada.

Por ejemplo, si tienes una clase Animal con un método mover(), y una clase Pájaro que hereda de Animal, deberías poder usar un objeto de la clase Pájaro en cualquier lugar donde tu código espere un objeto de la clase Animal, y tu código debería seguir funcionando correctamente.

Este principio es importante porque ayuda a garantizar que cuando creas nuevas clases derivadas, no rompes la funcionalidad existente. También ayuda a hacer tu código más modular y fácil de entender, ya que puedes confiar en que las clases derivadas se comportarán de cierta manera.

#### Ejemplo 1:

```ts
// Violación del LSP

class Rectángulo {
  ancho: number;
  alto: number;

  constructor(ancho: number, alto: number) {
    this.ancho = ancho;
    this.alto = alto;
  }

  setAncho(ancho: number) {
    this.ancho = ancho;
  }

  setAlto(alto: number) {
    this.alto = alto;
  }

  getÁrea() {
    return this.ancho * this.alto;
  }
}

class Cuadrado extends Rectángulo {
  constructor(lado: number) {
    super(lado, lado);
  }

  setAncho(ancho: number) {
    this.ancho = ancho;
  }

  setAlto(alto: number) {
    this.ancho = alto;
  }
}

const rectángulo: Rectángulo = new Cuadrado(5);
rectángulo.setAncho(4);
console.log(rectángulo.getÁrea()); // Imprime: 16, pero se esperaba 20
```

```ts
abstract class Figura {
  abstract getÁrea(): number;
}

class Rectángulo extends Figura {
  constructor(private ancho: number, private alto: number) {
    super();
  }

  getÁrea() {
    return this.ancho * this.alto;
  }
}

class Cuadrado extends Figura {
  constructor(private lado: number) {
    super();
  }

  getÁrea() {
    return this.lado * this.lado;
  }
}

const figura1: Figura = new Rectángulo(4, 5);
console.log(figura1.getÁrea()); // Imprime: 20

const figura2: Figura = new Cuadrado(5);
console.log(figura2.getÁrea()); // Imprime: 25
```

la clase abstracta Figura, Rectángulo y Cuadrado sean subclases de Figura. Ahora, Rectángulo y Cuadrado son sustituibles sin que esto afecte el comportamiento del programa. Esto es un ejemplo de cómo el Principio de Sustitución de Liskov puede ayudar a mejorar la calidad del código

```ts
// Violación del LSP
class Animal {
  mover() {
    console.log("El animal terrestre se mueve");
  }
}

class Pájaro extends Animal {
  mover() {
    throw new Error("Los pájaros vuelan, no se mueven");
  }
}

function hacerMoverAnimal(animal: Animal) {
  animal.mover(); // Esto fallará si animal es un Pájaro
}

const pájaro = new Pájaro();
hacerMoverAnimal(pájaro); // Error: Los pájaros vuelan, no se mueven
```

```ts
abstract class Animal {
  abstract mover(): void;
}

class AnimalTerrestre extends Animal {
  mover() {
    console.log("El animal terrestre se mueve");
  }
}

class Pájaro extends Animal {
  mover() {
    console.log("El pájaro vuela");
  }
}

function hacerMoverAnimal(animal: Animal) {
  animal.mover(); // Esto funcionará independientemente de si animal es un AnimalTerrestre o un Pájaro
}

const animalTerrestre = new AnimalTerrestre();
const pájaro = new Pájaro();

hacerMoverAnimal(animalTerrestre); // Imprime: 'El animal terrestre se mueve'
hacerMoverAnimal(pájaro); // Imprime: 'El pájaro vuela'
```

```ts
// Violación del LSP
class Vehículo {
  acelerar() {
    console.log("El vehículo acelera");
  }
}

class Barco extends Vehículo {
  acelerar() {
    throw new Error("Los barcos no aceleran, ellos avanzan");
  }
}

function hacerAcelerarVehículo(vehículo: Vehículo) {
  vehículo.acelerar(); // Esto fallará si vehículo es un Barco
}

const barco = new Barco();
hacerAcelerarVehículo(barco); // Error: Los barcos no aceleran, ellos avanzan
```

```ts
abstract class Vehículo {
  abstract mover(): void;
}

class Auto extends Vehículo {
  mover() {
    console.log("El auto acelera");
  }
}

class Barco extends Vehículo {
  mover() {
    console.log("El barco avanza");
  }
}

function hacerMoverVehículo(vehículo: Vehículo) {
  vehículo.mover(); // Esto funcionará independientemente de si vehículo es un Auto o un Barco
}

const auto = new Auto();
const barco = new Barco();

hacerMoverVehículo(auto); // Imprime: 'El auto acelera'
hacerMoverVehículo(barco); // Imprime: 'El barco avanza'
```

```ts
// Violación del LSP
class CuentaBancaria {
    constructor(public saldo: number) {}

    transferir(monto: number, destino: CuentaBancaria): void {
        if (this.saldo >= monto) {
            this.saldo -= monto;
            destino.saldo += monto;
            console.log(`Transferencia exitosa. Nuevo saldo: ${this.saldo}`);
        } else {
            console.log("Fondos insuficientes para la transferencia.");
        }
    }
}

class CuentaCorriente extends CuentaBancaria {
    transferir(monto: number, destino: CuentaBancaria): void {
        this.saldo -= monto;
        destino.saldo += monto;
        console.log(`Transferencia exitosa desde cuenta corriente. Nuevo saldo: ${this.saldo}`);
    }
}

// Uso incorrecto del LSP
const cuentaNormal: CuentaBancaria = new CuentaBancaria(1000);
const cuentaCorriente: CuentaBancaria = new CuentaCorriente(500);

cuentaNormal.transferir(200, cuentaCorriente);  // Transferencia exitosa desde cuenta corriente. Nuevo saldo: 800 - Violación del LSP

```

```ts
// Cumpliendo con el LSP
interface Transfirable {
    transferir(monto: number, destino: Transfirable): void;
}

class CuentaBancaria implements Transfirable {
    constructor(public saldo: number) {}

    transferir(monto: number, destino: Transfirable): void {
        if (this.saldo >= monto) {
            this.saldo -= monto;
            destino.saldo += monto;
            console.log(`Transferencia exitosa. Nuevo saldo: ${this.saldo}`);
        } else {
            console.log("Fondos insuficientes para la transferencia.");
        }
    }
}

class CuentaCorriente implements Transfirable {
    constructor(public saldo: number) {}

    transferir(monto: number, destino: Transfirable): void {
        if (this.saldo >= monto) {
            this.saldo -= monto;
            destino.saldo += monto;
            console.log(`Transferencia exitosa desde cuenta corriente. Nuevo saldo: ${this.saldo}`);
        } else {
            console.log("Fondos insuficientes para la transferencia desde cuenta corriente.");
        }
    }
}

// Uso correcto del LSP
const cuentaNormal: Transfirable = new CuentaBancaria(1000);
const cuentaCorriente: Transfirable = new CuentaCorriente(500);

cuentaNormal.transferir(200, cuentaCorriente);  // Transferencia exitosa. Nuevo saldo: 800

```



[**Regresar**](./intro.md)
