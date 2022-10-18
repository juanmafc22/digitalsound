# Guía de estilo

Para estandarizar la escritura del código de los próximos Sprints, se propone la siguiente guía de estilo. Para las recomendaciones técnicas se utilizó como referencia la guía de estilo de Google para JavaScript disponible en https://google.github.io/styleguide/jsguide.html 

### Idioma

Aplicar nombres en español a todas las variables y a los archivos.

###  Nombres de los archivos

Los nombres de los archivos pueden contener guiones bajos (_) or guiones comunes (-), sin otros signos de puntuación.

### Formato - via Prettier

Con el fin de estandarizar los formatos de escritura de código, utilizar la extensión Prettier. Setear VS Code para que aplique el formato Prettier automáticamente al guardar. Ver la guía de como instalar y aplicar Prettier al guardar un documento en esta página https://www.alphr.com/use-prettier-vs-code/

### Formato - uso de llaves, corchetes y paréntesis

Se requiere el uso de llaves {}, corchetes [] y paréntesis () en todas las estructuras de control.

### Formato - modo de uso de llaves, corchetes y paréntesis

Utilizar el estilo "Egipcio" en el uso de llaves, corchetes y paréntesis:
- sin línea nueva antes del {,[ o ( inicial,
- con nueva línea después del {,[ o ( inicial,
- línea nueva después del },] o ) final que cierra.

Ejemplo:
``` js
/** @param {number} foo */
method(foo) {
  if (condition(foo)) {
    try {
      // Note: this might fail.
      something();
    } catch (err) {
      recover();
    }
  }
}
```
### Formato - uso del 'punto y coma' al finalizar;

Se requiere el uso del punto y coma al finalizar cada declaración;

### Formato - longitud de las líneas

Las líneas de código deberán tener un límite de entre 80 y 110 max de caracteres, cualquier línea que supere esa cantidad deberá seguir en la línea inferior.

### Formato - comenatarios

Se recomienda el uso generoso de comentarios en TODO el código

Ejemplos:
``` js
/*
 * This is
 * okay.
 */

/* This is fine, too. */

/*
Este también es un comentario 
pero que abarca dos líneas
*/
```
### Implementación del lengaje -- declaración local de variables

Utilizar const y let para declarar vaviables. NO utilizar var.

### Implementación del lengaje -- uso del camelCase

Las variables deberán ser declaradas todas en camelCase, otroEjemploDeCamelCase, elTercerEjemplo.

### Implementación del lengaje -- uso de Arrow functions

Las Arrow functions proveen una forma concisa de expresión de funciones. Utilizarlas preferentemento sobre la palabra clave "function", particularmente cuando hay funciones anidadas (callbacks)

``` js
/**
 * Arrow functions can be documented just like normal functions.
 * @param {number} numParam A number to add.
 * @param {string} strParam Another number to add that happens to be a string.
 * @return {number} The sum of the two parameters.
 */
const moduleLocalFunc = (numParam, strParam) => numParam + Number(strParam);

// Uses the single expression syntax with `void` because the program logic does
// not require returning a value.
getValue((result) => void alert(`Got ${result}`));

class CallbackExample {
  constructor() {
    /** @private {number} */
    this.cachedValue_ = 0;

    // For inline callbacks, you can use inline typing for parameters.
    // Uses a block statement because the value of the single expression should
    // not be returned and the expression is not a single function call.
    getNullableValue((/** ?number */ result) => {
      this.cachedValue_ = result == null ? 0 : result;
    });
  }
}
```