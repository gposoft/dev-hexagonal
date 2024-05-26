<p align="center">
  <a href="#" target="blank"><img src="./images/solid.png" width="600" alt="Nest Logo" /></a>
</p>

## Los 5 principios para desarrollar software de calidad

### 1. Principio de responsabilidad única (Single Responsibility Principle) - SRP

Es un principio de diseño de software que establece que cada función, módulo o clase de software debe tener una, y sólo una, razón para cambiar. En otras palabras, una debe tener una sola responsabilidad en el sistema.

Si tiene más de una responsabilidad, se vuelve más difícil de entender, mantener y modificar con el tiempo. Cada responsabilidad es el eje del cambio. Para contener la propagación del cambio, debemos separar las responsabilidades. Si una clase asume más de una responsabilidad, será más sensible al cambio. Si una clase asume más de una responsabilidad, las responsabilidades se acoplan.

La importancia del SRP radica en su capacidad para mantener el código limpio y bien organizado. Cuando una clase tiene una sola responsabilidad, es más fácil de probar y de cambiar sin afectar a otras partes del sistema. Esto promueve la modularidad y la reutilización del código, lo que a su vez conduce a un desarrollo más eficiente y a la reducción de errores.

Por ejemplo, imagina un programa de gestión de biblioteca. En lugar de tener una única clase que maneje la gestión de libros, la interfaz de usuario y la lógica de negocio, el principio de responsabilidad única sugiere dividir estas responsabilidades en clases separadas.

Tendrías una clase para la gestión de libros, otra para la interfaz de usuario y otra para la lógica de negocio. Esto hace que cada clase sea más fácil de entender y mantener y facilita la colaboración en equipos de desarrollo.



#### Ejemplo 1:

```ts
// Violación del SRP
class User {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }

  changeEmail(newEmail: string) {
    // Validar el nuevo correo electrónico
    if (this.validateEmail(newEmail)) {
      this.email = newEmail;
    } else {
      throw new Error("Email inválido");
    }
  }

  validateEmail(email: string) {
    // Lógica de validación de correo electrónico
    return true;
  }
}
```

```ts
// Violación del SRP
class User {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }

  changeEmail(newEmail: string) {
    if (EmailValidator.validate(newEmail)) {
      this.email = newEmail;
    } else {
      throw new Error("Email inválido");
    }
  }
}

class EmailValidator {
  static validate(email: string) {
    // Lógica de validación de correo electrónico
    return true;
  }
}
```

```ts
class User {
    name: string;
    email: string;

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }

    setEmail(newEmail: string) {
        this.email = newEmail;
    }
}

class EmailValidator {
  static validate(email: string) {
    // Lógica de validación de correo electrónico
    return true;
  }
}

class EmailManager {
    static changeEmail(user: User, newEmail: string) {
        if (EmailValidator.validate(newEmail)) {
            user.setEmail(newEmail);
        } else {
            throw new Error("Email inválido");
        }
    }
}

```


#### Ejemplo 2

```ts
// Violación del SRP
public class Empleado {
    private nombre:string;
    private cargo:string;
    private salario:number;

    constructor(nombre:string, cargo:string, salario:number) {
        this.nombre = nombre;
        this.cargo = cargo;
        this.salario = salario;
    }

    // Métodos relacionados con la información del empleado
    getNombre() {
        return nombre;
    }

    getCargo() {
        return cargo;
    }

    // Métodos relacionados con el cálculo del salario
    calcularSalario() {
        // lógica de cálculo del salario
        // ...
        return salario;
    }
}

```

```ts
// Aplicando el SRP
public class Empleado {
    private nombre:string;
    private cargo:number;

    constructor(nombre:string, cargo:number) {
        this.nombre = nombre;
        this.cargo = cargo;
    }

    getNombre() {
        return nombre;
    }

    getCargo() {
        return cargo;
    }
}

public class CalculadoraSalario {
    calcularSalario(empleado:Empleado, salarioBase:number) {
        // lógica de cálculo del salario
        // ...
        return salarioBase;
    }
}

```

#### Ejemplo 3 

```ts
// Violación del SRP
class GestorArchivos {
    leerArchivo(nombreArchivo: string): string {
        // lógica de lectura de archivo
        // ...
        return "Contenido del archivo";
    }

    procesarDatos(datos: string): void {
        // lógica de procesamiento de datos
        // ...
        console.log("Datos procesados:", datos);
    }
}

```

```ts
// Aplicando el SRP
class LectorArchivos {
    leerArchivo(nombreArchivo: string): string {
        // lógica de lectura de archivo
        // ...
        return "Contenido del archivo";
    }
}

class ProcesadorDatos {
    procesarDatos(datos: string): void {
        // lógica de procesamiento de datos
        // ...
        console.log("Datos procesados:", datos);
    }
}

```


```ts
function processOrder(order) {
    // Calcular el total del pedido
    let total = 0;
    for (let item of order.items) {
        total += item.price * item.quantity;
    }

    // Aplicar descuento si es aplicable
    if (order.customer.hasDiscount) {
        total *= 0.9;
    }

    // Realizar el pago
    order.customer.account.debit(total);

    // Actualizar el inventario
    for (let item of order.items) {
        item.product.inventory -= item.quantity;
    }

    // Enviar correo electrónico de confirmación al cliente
    sendEmail(order.customer.email, `Su pedido ${order.id} ha sido procesado.`);
}

```

```ts
function calculateTotal(order) {
    let total = 0;
    for (let item of order.items) {
        total += item.price * item.quantity;
    }
    return total;
}

function applyDiscount(order, total) {
    if (order.customer.hasDiscount) {
        total *= 0.9;
    }
    return total;
}

function processPayment(order, total) {
    order.customer.account.debit(total);
}

function updateInventory(order) {
    for (let item of order.items) {
        item.product.inventory -= item.quantity;
    }
}

function sendConfirmationEmail(order) {
    sendEmail(order.customer.email, `Su pedido ${order.id} ha sido procesado.`);
}

function processOrder(order) {
    let total = calculateTotal(order);
    total = applyDiscount(order, total);
    processPayment(order, total);
    updateInventory(order);
    sendConfirmationEmail(order);
}

```


[**Regresar**](./intro.md)
