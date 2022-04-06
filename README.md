# getRandomPhotho with unsplash-js

Get random photos about a subject.

## Description

Unsplash’s API is the most powerful photo engine in the world with over 1000+ partners, 
more than 1 billion+ calls per month, and a 99.998% uptime in the last 30 days (https://medium.com/unsplash/unsplashs-api-8b20043aacc0).

La API cuenta con la función [photos.getRandom()](https://github.com/unsplash/unsplash-js#photosgetrandomarguments-additionalfetchoptions), para descargar imagénes al azar. Dicha función recibe varios parámetros de entrada, entre los que se encuentran `query` y `count`. El parámetro`query` es una cadena de texto usada para consultar por fotos relacionadas, mientras que el parámetro `count` es un número entero que definir la cantidad de fotos a descargar. `count` no puede ser mayor a 30.

Esta función se ha usado para crear el programa `app.mjs`. Dicho programa defina la función `getRandomPhoto()` para descargar imagénes en el computador. Esta función recibe dos parámetros de entrada, `subject` y `no_images`. Los parámetros `subject` y `no_images` sirven para consultar fotos a la API de Unsplash. Las imágenes descargaas se almacenan en una carpeta con el nombre de consulta dentro de la carpeta `./images`.

## Getting Started

### Dependencies

* Lastest [nodejs](https://nodejs.org/en/download/).

### Installing
```
npm install
```

### Executing program

```
node app.mjs
```

## Help

Any advise for common problems or issues.
<!-- ``` -->
<!-- command to run if program contains helper info -->
<!-- ``` -->

## Authors

Contributors names and contact info

[rvcristiand](https://github.com/rvcristiand)

<!-- ## Version History -->

<!-- * 0.2 -->
<!--     * Various bug fixes and optimizations -->
<!--     * See [commit change]() or See [release history]() -->
<!-- * 0.1 -->
<!--     * Initial Release -->

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

## Acknowledgments

Inspiration, code snippets, etc.
* [unsplash](https://github.com/unsplash/unsplash-js#usage)
