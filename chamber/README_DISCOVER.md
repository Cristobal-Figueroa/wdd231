# Instrucciones para completar la página Discover

## Resumen
Hemos creado la estructura básica para la página Discover del sitio web de la Cámara de Comercio de Boise. Esta página muestra 8 atracciones turísticas de Boise, utiliza grid-template-areas para un diseño responsivo, implementa localStorage para mostrar mensajes de visita personalizados y añade efectos hover a las imágenes.

## Pasos para completar la implementación

### 1. Añadir imágenes
Necesitas añadir 8 imágenes en formato webp para las atracciones mencionadas en el archivo JSON:

- `images/discover/capitol.webp` - Idaho State Capitol
- `images/discover/greenbelt.webp` - Boise River Greenbelt
- `images/discover/art-museum.webp` - Boise Art Museum
- `images/discover/botanical-garden.webp` - Idaho Botanical Garden
- `images/discover/birds-of-prey.webp` - World Center for Birds of Prey
- `images/discover/bogus-basin.webp` - Bogus Basin Mountain Recreation Area
- `images/discover/penitentiary.webp` - Old Idaho Penitentiary
- `images/discover/basque-block.webp` - Basque Block

Las imágenes deben ser de aproximadamente 300px de ancho por 200px de alto y estar en formato webp para optimizar el rendimiento.

### 2. Crear imagen placeholder
Reemplaza el archivo placeholder.webp vacío con una imagen de baja resolución que sirva como placeholder mientras se cargan las imágenes reales.

### 3. Verificar funcionalidad
Una vez añadidas las imágenes, verifica que:
- Las imágenes se carguen correctamente con lazy loading
- El diseño sea responsivo en diferentes tamaños de pantalla
- El mensaje de localStorage aparezca correctamente según el historial de visitas
- Los efectos hover funcionen en las imágenes (solo en vistas medianas y grandes)

### 4. Validación
Asegúrate de que la página cumpla con todos los criterios de la tarea:
- Auditoría de página sin errores
- Principios de diseño web (proximidad, alineación, repetición)
- Prueba Lighthouse con puntuaciones de 95+ en Accesibilidad, Mejores Prácticas y SEO
- Contraste de color sin errores a nivel AA
- Navegación responsiva y wayfinding aplicado
- Peso de página de 500 kB o menos en la carga inicial

## Estructura de archivos creados
- `discover.html` - Estructura HTML de la página Discover
- `css/discover.css` - Estilos específicos para la página Discover
- `js/discover.js` - Funcionalidad JavaScript para cargar atracciones y gestionar localStorage
- `data/attractions.json` - Datos de las 8 atracciones en formato JSON
- `images/discover/` - Directorio para las imágenes de las atracciones

## Características implementadas
- Diseño responsivo usando grid-template-areas para 3 tamaños de pantalla
- Mensaje personalizado basado en localStorage para seguimiento de visitas
- Efecto hover en imágenes solo en vistas medianas y grandes
- Lazy loading para imágenes
- Datos cargados desde un archivo JSON
- Diseño de tarjetas con título, dirección, descripción, foto y botón "Learn More"
