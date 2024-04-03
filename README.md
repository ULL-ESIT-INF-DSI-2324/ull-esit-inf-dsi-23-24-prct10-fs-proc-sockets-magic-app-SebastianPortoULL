# Práctica 10: Ejercicios PE-101. 

Escriba una aplicación cliente-servidor que proporcione información sobre el número de líneas, palabras o caracteres que contiene un fichero de texto. La ruta donde se encuentra el fichero debe ser un parámetro pasado al cliente desde la línea de comandos.

Lleve a cabo el ejercicio anterior de las siguientes maneras:

    Haciendo uso del método pipe de un Stream para poder redirigir la salida de un comando (cat) hacia otro (wc).
    [OPCIONAL]: Sin hacer uso del método pipe, solamente creando los subprocesos necesarios de ambos comandos y registrando manejadores a aquellos eventos necesarios para implementar la funcionalidad solicitada.

Para lo anterior, se recomienda leer la documentación de Stream. Piense que la propiedad stdin de un objeto ChildProcess es un Stream de escritura, mientras que su propiedad stdout es un Stream de lectura, tal y como hemos visto en clase.

Por último, programe defensivamente, es decir, trate de controlar los potenciales errores que podrían surgir a la hora de ejecutar su programa. Por ejemplo, ¿qué sucedería si indica desde la línea de comandos un fichero que no existe o una opción no válida?