<p align="center">
  <a href="#" target="blank"><img src="./images/solid.png" width="600" alt="Nest Logo" /></a>
</p>

## Los 5 principios para desarrollar software de calidad

### 5. Principio de inversión de dependencia (Dependency Inversion Principle): DIP

es un principio fundamental en la programación orientada a objetos. Este principio establece que los módulos de alto nivel no deberían depender de los módulos de nivel inferior, sino que ambos deberían depender de abstracciones.

Esto significa que las clases no deben depender directamente de clases específicas, sino de interfaces o clases abstractas. Al seguir este principio, las relaciones de dependencia convencionales establecidas desde los módulos de alto nivel de establecimiento de políticas a los módulos de dependencia de bajo nivel se invierten, lo que hace que los módulos de alto nivel sean independientes de los detalles de implementación del módulo de bajo nivel.

El DIP tiene varias ventajas importantes para el desarrollo de software:

Desacoplamiento: al aplicar este principio, los módulos de alto nivel y los módulos de nivel inferior se vuelven independientes entre sí, lo que facilita los cambios y las modificaciones en el código.<br> 
Reutilización de código: al depender de abstracciones en lugar de implementaciones concretas, es posible reutilizar los módulos de nivel inferior en diferentes contextos y aplicaciones.<br> 
Testeabilidad: al separar las dependencias y utilizar interfaces o abstracciones, es más sencillo realizar pruebas unitarias y pruebas de integración.<br> 

Para aplicar el principio de inversión de dependencia en un proyecto de desarrollo web, es necesario seguir algunas pautas:

Definir interfaces o abstracciones: en lugar de depender de implementaciones concretas, se deben crear interfaces o abstracciones que representen las funcionalidades requeridas por los módulos de alto nivel.<br> 
Implementar los módulos de nivel inferior: los módulos de nivel inferior, que contienen la implementación concreta de las funcionalidades requeridas, deben implementar las interfaces definidas anteriormente.<br> 

#### Ejemplo 1:

```ts
// Violación del DIP
class ServicioNotificacion {
    enviarMensaje(mensaje: string): void {
        console.log(`Enviando mensaje: ${mensaje}`);
    }
}

class SistemaEnvioMensajes {
    private servicioNotificacion: ServicioNotificacion;

    constructor() {
        this.servicioNotificacion = new ServicioNotificacion();
    }

    enviarMensaje(mensaje: string): void {
        this.servicioNotificacion.enviarMensaje(mensaje);
    }
}
```

```ts
// Cumpliendo con el DIP
interface Notificador {
    enviarMensaje(mensaje: string): void;
}

class ServicioNotificacion implements Notificador {
    enviarMensaje(mensaje: string): void {
        console.log(`Enviando mensaje: ${mensaje}`);
    }
}

class SistemaEnvioMensajes {
    private notificador: Notificador;

    constructor(notificador: Notificador) {
        this.notificador = notificador;
    }

    enviarMensaje(mensaje: string): void {
        this.notificador.enviarMensaje(mensaje);
    }
}

```

```ts
// Violación del DIP
class Interruptor {
    encender(): void {
        console.log("Interruptor encendido");
    }

    apagar(): void {
        console.log("Interruptor apagado");
    }
}

class SistemaLuces {
    private interruptor: Interruptor;

    constructor() {
        this.interruptor = new Interruptor();
    }

    activarLuces(): void {
        this.interruptor.encender();
    }

    desactivarLuces(): void {
        this.interruptor.apagar();
    }
}
```

```ts
// Cumpliendo con el DIP
interface DispositivoEncendido {
    encender(): void;
    apagar(): void;
}

class Interruptor implements DispositivoEncendido {
    encender(): void {
        console.log("Interruptor encendido");
    }

    apagar(): void {
        console.log("Interruptor apagado");
    }
}

class SistemaLuces {
    private dispositivoEncendido: DispositivoEncendido;

    constructor(dispositivoEncendido: DispositivoEncendido) {
        this.dispositivoEncendido = dispositivoEncendido;
    }

    activarLuces(): void {
        this.dispositivoEncendido.encender();
    }

    desactivarLuces(): void {
        this.dispositivoEncendido.apagar();
    }
}

```

```ts
// Cumpliendo con el DIP
interface Almacenamiento {
    guardarArchivo(nombre: string, contenido: string): void;
}

interface Compresor {
    comprimir(contenido: string): string;
}

class AlmacenamientoLocal implements Almacenamiento {
    guardarArchivo(nombre: string, contenido: string): void {
        console.log(`Guardando archivo local ${nombre}`);
        // Lógica de almacenamiento local...
    }
}

class AlmacenamientoRemoto implements Almacenamiento {
    guardarArchivo(nombre: string, contenido: string): void {
        console.log(`Guardando archivo remotamente ${nombre}`);
        // Lógica de almacenamiento remoto...
    }
}

class CompresorZip implements Compresor {
    comprimir(contenido: string): string {
        console.log("Comprimiendo usando ZIP");
        // Lógica de compresión ZIP...
        return contenido;
    }
}

class CompresorRar implements Compresor {
    comprimir(contenido: string): string {
        console.log("Comprimiendo usando RAR");
        // Lógica de compresión RAR...
        return contenido;
    }
}

class SistemaArchivos {
    private almacenamiento: Almacenamiento;
    private compresor: Compresor;

    constructor(almacenamiento: Almacenamiento, compresor: Compresor) {
        this.almacenamiento = almacenamiento;
        this.compresor = compresor;
    }

    guardarArchivo(nombre: string, contenido: string): void {
        const contenidoComprimido = this.compresor.comprimir(contenido);
        this.almacenamiento.guardarArchivo(nombre, contenidoComprimido);
    }
}

```


[**Regresar**](./intro.md)
