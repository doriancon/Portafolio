# Portfolio de Dorian Condori

Web estática en HTML, CSS y JavaScript. La presentación mantiene la identidad negra, crema y verde ácido; los trabajos se recorren como capítulos editoriales continuos.

## Abrir la web

Abrí `index.html` directamente o iniciá un servidor local:

```sh
python -m http.server 4173 --bind 127.0.0.1
```

Luego visitá http://localhost:4173. No necesita instalar paquetes ni compilar.

## Estructura de los trabajos

1. **TuNubeYa:** identidad visual, social media, web / ecommerce y video / content.
2. **Blast:** conceptos, campañas, bajadas y contenido audiovisual.
3. **Proyectos independientes:** mini caso de Pil Fortis y espacio para futuras propuestas.

Las aperturas incluyen contexto, rol y aporte. Los espacios para piezas se presentan como impresos, publicaciones, celulares, laptop y aplicaciones. Los fondos, estrellas y muestras de composición son recursos del portfolio, no entregables reales de las marcas.

## Editar el contenido

Todo está en `content.js`: `profile`, `copy`, `software`, `education`, `languages`, `experience` y `projects`. El proyecto tiene `sections`, y cada sección contiene `items`. Los proyectos independientes se incorporan en `children`.

El personaje principal está en `assets/profile/dorian-peace.png`; la foto de Sobre mí, en `assets/profile/dorian-photo.jpeg`. La ilustración original se conserva. Los enlaces sociales vacíos se ocultan; el contacto abre el correo de la persona. El CV se configura en `profile.cv`.

## Incorporar una imagen real

Guardá el archivo en `assets/work/` y completá el `src` del item correspondiente. Conservá su `id`, `frame` y posición para mantener el diseño. Por ejemplo:

```js
{
  "id": "tn-web-desktop",
  "label": "Web desktop TuNubeYa",
  "type": "image",
  "src": "assets/work/tunubeya-home.webp",
  "alt": "Vista de la home de TuNubeYa",
  "frame": "laptop",
  "caption": "Vista desktop · organización visual"
}
```

Para mostrar una pieza completa, agregá `"fit": "contain"`. El encuadre predeterminado llena el espacio. Usá imágenes WebP, JPG o PNG optimizadas. Las capturas finales de trabajos se integran en sus mockups; las capturas de referencia no se publican como contenido.

Los marcos disponibles son `phone`, `laptop`, `social`, `poster`, `print`, `brand`, `campaign`, `capture` y `none`. El placeholder desaparece automáticamente al completar `src`. Los campos `variant` y `stageLabel` sólo decoran las composiciones pendientes.

## Incorporar un video

Los videos se presentan dentro de smartphones. Usá MP4 compatible con navegador y un poster opcional:

```js
{
  "id": "tn-video-1",
  "label": "Video 01",
  "type": "video",
  "src": "assets/work/tunubeya-video-01.mp4",
  "poster": "assets/work/tunubeya-video-01.webp",
  "frame": "phone",
  "autoplay": false
}
```

Los controles permiten reproducir manualmente. Con `autoplay: true`, reproduce sin sonido y en loop al entrar en pantalla; se pausa al salir. La preferencia de movimiento reducido desactiva la reproducción automática. Los archivos no se precargan hasta necesitarlos. Una URL de YouTube no reemplaza un MP4.

## Software

Se muestran únicamente Illustrator, Photoshop, CapCut y Excel. `level` controla la longitud visual de cada barra según las aproximaciones indicadas por Dorian. No aparecen porcentajes ni niveles escritos. Las barras se dibujan una vez al entrar en pantalla.

## Agregar una sección o marca

Duplicá una sección de `projects[].sections`, asignale un `id` único y completá `label`, `title`, `intro`, `layout` e `items`. Los layouts actuales son `identity`, `social`, `web`, `reels`, `campaign`, `captures` y `packaging`.

Para una nueva marca, duplicá un proyecto y adaptá su nombre, contexto, rol y aporte. Actualizá la numeración. El índice y el total de capítulos se generan automáticamente. Los enlaces antiguos `#proyecto/tunubeya`, `#proyecto/blast` y `#proyecto/pil-fortis` siguen llevando al capítulo correspondiente.

## Archivos y diseño

- `index.html`: estructura inicial y navegación.
- `content.js`: contenido editable.
- `script.js`: capítulos, medios, navegación y animaciones.
- `styles.css`: sistema visual original.
- `editorial.css`: composiciones por marca, mockups y responsive.
- `assets/`: imágenes, CV, fuentes y futuras piezas.
- `DESIGN.md`: criterios para ampliar la presentación.
- `docs/VERIFICACION.md`: comprobaciones y límites de la revisión.

Las fuentes son locales. La web respeta `prefers-reduced-motion`; el contenido sigue siendo visible si las animaciones no están disponibles.

## Publicación

La entrega actual es local. Para un hosting estático, incluí `index.html`, ambos CSS, ambos archivos JS y `assets/`. No requiere servidor de aplicaciones ni base de datos. Las rutas de las marcas usan anclas y no necesitan redirecciones.

Se incorporaron las 23 imágenes suministradas y los cuatro videos de TuNubeYa. Las imágenes WebP conservan proporciones y se pueden ampliar; los originales permanecen en la carpeta del usuario. Amaia Woman se conserva en Sobre mí y Experiencia, pero no como capítulo visual. Contacto incluye correo, teléfono, LinkedIn y ubicación. No se inventan clientes, resultados, métricas ni atribuciones de programación.

Para conservar las proporciones de nuevas imágenes, indicá `width`, `height` y `fit: "contain"`. La relación de aspecto de la pieza se adapta dentro de la composición. Blast presenta capturas reales con el layout `captures`, sin mockups de celular.
