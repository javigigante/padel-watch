# 🎾 Padel Watch

**Un marcador de pádel sencillo, pensado para llevar el control del partido directamente desde la muñeca.**


## 📖 Sobre el proyecto

**Padel Watch** es un pequeño proyecto personal cuyo objetivo es desarrollar un marcador de pádel minimalista para el Samsung Galaxy Watch 3.

La idea es poder actualizar el resultado de un partido con un simple toque, sin sacar el móvil ni navegar por menús innecesarios.

El diseño se basa en una única pantalla dividida en dos zonas táctiles: una para nuestra pareja y otra para los rivales.

## ✨ Funcionalidades previstas

- 🟢 **Sumar puntos:** tocar nuestra mitad de la pantalla para añadir un punto.
- 🔵 **Sumar puntos rivales:** tocar la mitad contraria para actualizar su puntuación.
- ➖ **Corregir errores:** restar puntos mediante un botón dedicado en cada mitad.
- 🎾 **Puntuación oficial:** gestionar puntos, juegos y ventajas según las reglas de pádel.
- 🏆 **Marcador de juegos:** mostrar los juegos ganados por cada pareja en el set actual.
- 🔄 **Actualización automática:** actualizar el marcador después de cada punto y juego.

## 🛠️ Tecnologías

- **HTML5:** estructura de la interfaz.
- **CSS3:** diseño visual adaptado a una pantalla circular.
- **JavaScript:** lógica de puntuación y gestión del marcador.
- **Visual Studio Code:** entorno de desarrollo.
- **Git y GitHub:** control de versiones y alojamiento del código.

Se prioriza una implementación sencilla, sin frameworks ni dependencias innecesarias.

## 📂 Estructura del proyecto

```text
padel-watch/
├── index.html    # Estructura de la aplicación
├── styles.css    # Estilos y diseño de la interfaz
├── app.js        # Lógica del marcador
├── README.md     # Documentación del proyecto
└── .gitignore    # Archivos excluidos de Git
```

## 🚀 Ejecución en local

1. Clona el repositorio:

   ```bash
   git clone https://github.com/TU_USUARIO/padel-watch.git
   ```

2. Entra en la carpeta:

   ```bash
   cd padel-watch
   ```

3. Abre el proyecto con Visual Studio Code:

   ```bash
   code .
   ```

4. Ejecuta `index.html` con la extensión **Live Server** para probar la interfaz en el navegador.

No se necesita un proceso de compilación para esta primera versión web.

## ⌚ Compatibilidad con Samsung Galaxy Watch 3

El Galaxy Watch 3 utiliza **Tizen**, por lo que no es compatible directamente con aplicaciones convencionales de Wear OS.

El objetivo es adaptar la interfaz y estudiar las opciones de empaquetado, firma e instalación para el dispositivo.

> **Limitación conocida:** la distribución de aplicaciones Tizen para relojes y la emisión de certificados de desarrollo han sido interrumpidas por Samsung. La instalación de una aplicación nueva en el reloj físico está pendiente de verificar.

La ejecución en un navegador de escritorio sirve para desarrollar y probar la lógica, pero no garantiza la compatibilidad completa con el reloj.

## 🗺️ Roadmap

- [ ] Crear la interfaz inicial.
- [ ] Implementar la puntuación de pádel.
- [ ] Añadir los botones para sumar y restar puntos.
- [ ] Gestionar juegos, ventajas y desempates.
- [ ] Adaptar el diseño a la pantalla circular.
- [ ] Probar diferentes tamaños y zonas táctiles.
- [ ] Investigar la instalación en el Galaxy Watch 3 físico.

## 🎯 Objetivo

Crear una aplicación pequeña, útil y fácil de utilizar, aprovechando el proyecto para practicar JavaScript, diseño de interfaces para dispositivos con pantalla reducida y control de versiones con Git.

---

**Proyecto personal en desarrollo.** 🎾

