// Este script es solo para referencia de cómo crear un placeholder
// No es necesario ejecutarlo si ya tienes una imagen placeholder

/*
Para crear una imagen placeholder, puedes usar servicios como:
1. https://placeholder.com/
2. https://placehold.co/
3. https://picsum.photos/

O puedes usar una herramienta de edición de imágenes para crear una imagen simple
de 300x200 píxeles con un color gris claro y texto que diga "Loading..."

Luego guárdala como webp en la carpeta images/discover/placeholder.webp
*/

// Ejemplo de cómo podrías crear un placeholder con JavaScript en un navegador:
/*
const canvas = document.createElement('canvas');
canvas.width = 300;
canvas.height = 200;
const ctx = canvas.getContext('2d');

// Fondo gris claro
ctx.fillStyle = '#f0f0f0';
ctx.fillRect(0, 0, 300, 200);

// Texto "Loading..."
ctx.fillStyle = '#999999';
ctx.font = '20px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('Loading...', 150, 100);

// Convertir a webp y descargar
canvas.toBlob(function(blob) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'placeholder.webp';
    a.click();
    URL.revokeObjectURL(url);
}, 'image/webp');
*/
