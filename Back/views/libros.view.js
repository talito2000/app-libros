function createPage(title, main) {
  let html = `
    <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link href="/output.css" rel="stylesheet">

</head>
<body>
<header class="bg-gray-800 text-white">
  <nav class="container mx-auto px-6 py-4">
    <ul class="flex space-x-4">
      <li class="hover:bg-gray-700 px-3 py-2 rounded"><a href="/books">Inicio</a></li>
      <li class="hover:bg-gray-700 px-3 py-2 rounded"><a href="/books?section=clásicos">Clásicos</a></li>
      <li class="hover:bg-gray-700 px-3 py-2 rounded"><a href="/books?section=ciencia ficción">Ciencia Ficción</a></li>
      <li class="hover:bg-gray-700 px-3 py-2 rounded"><a href="/books?section=biografías">Biografías</a></li>
      <li class="hover:bg-gray-700 px-3 py-2 rounded"><a href="/books?section=misterio">Misterio</a></li>
      <li class="hover:bg-gray-700 px-3 py-2 rounded"><a href="/books?section=novelas">Novelas</a></li>
      <li class="hover:bg-gray-700 px-3 py-2 rounded"><a href="/books/nuevo">Agregar Libro</a></li>
    </ul>
  </nav>
</header>
     <div class="px-10 md:px-20">${main}</div>
</body>
</html>
`;

  return html;
}

function createBookDetails(book) {
  let html = "";
  html += `
  <div class="bg-gray-100 min-h-screen">
    <div class="container mx-auto py-12 px-4 lg:px-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Imagen del libro -->
        <div class="bg-white shadow-lg rounded-lg overflow-hidden">
          <img src="${book.image}" alt="Portada de ${book.title}" class="w-full h-96 object-cover">
        </div>
        <!-- Detalles del libro -->
        <div class="flex flex-col justify-center bg-white shadow-lg rounded-lg p-8">
          <h1 class="text-4xl font-bold text-gray-800 mb-4">${book.title}</h1>
          <p class="text-xl text-gray-700 mb-4">Autor: <b>${book.author}</b></p>
          <p class="text-lg text-gray-600 mb-4">Año: <b>${book.year}</b></p>
          <p class="text-lg text-gray-600 mb-4">Sección: <b>${book.section}</b></p>
          <p class="text-gray-600 mb-6">Enlace: 
            <a href="${book.link}" class="text-blue-500 hover:underline">${book.link}</a>
          </p>
          <div class="flex space-x-4">
            <a href="/books/eliminar/${book._id}" class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-800">Eliminar</a>
          </div>
        </div>
      </div>
      <!-- Descripción adicional si es necesario -->
      <div class="mt-12 bg-white shadow-lg rounded-lg p-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Descripción</h2>
        <p class="text-gray-700 leading-relaxed">
          Esta es una breve descripción o sinopsis del libro, donde puedes añadir detalles adicionales sobre la trama, estilo de escritura, u otros aspectos que atraigan al lector a explorar más sobre el libro.
        </p>
      </div>
    </div>
  </div>
`;
  return html;
}

function createListBooks(Books) {
  let html = "";
  html +=
    "<h1 class='text-3xl font-semibold text-gray-800 my-6'>Página de Libros</h1>";

  html += "<div class='flex flex-wrap justify-center'>";

  if (Books.length === 0) {
    html += "<div class='text-center text-gray-500'>No hay libros</div>";
  } else {
    Books.forEach((book) => {
      html += `
      <div class='bg-white shadow-xl rounded-lg overflow-hidden m-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4'>
        <!-- Imagen de la portada -->
        <img src='${book.image}' alt='Portada de ${book.title}' class='w-full h-64 object-cover'>
        <!-- Contenido de la tarjeta -->
        <div class='p-6'>
          <h3 class='text-xl font-semibold text-gray-800 mb-2'>${book.title}</h3>
          <p class='text-gray-600 text-sm mb-4'>${book.section}</p>
          <div class='flex justify-between items-center mt-4'>
            <a href="/books/${book._id}" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800">Ver Más</a>
          </div>
        </div>
      </div>
    `;
    });
  }
  html += "</div>";

  return html;
}

function newBook() {
  let html = "<h1 class='text-3xl font-bold mb-5'>Agregar nuevo Libro</h1>";
  html += "<form action='/books/nuevo' method='post' class='space-y-4'>";
  html +=
    "<label for='title' class='block text-gray-700 font-semibold'>Titulo</label>";
  html +=
    "<input type='text' name='title' required class='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'>";
  html +=
    "<label for='section' class='block text-gray-700 font-semibold'>Seccion</label>";
  html +=
    "<select name='section' class='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'>";
  html += "<option value=''>Seleccione una Seccion</option>";
  html += "<option value='clásicos'>Clásicos</option>";
  html += "<option value='ciencia ficción'>Ciencia Ficción</option>";
  html += "<option value='biografías'>Biografías</option>";
  html += "<option value='misterio'>Misterio</option>";
  html += "<option value='novelas'>Novelas</option>";
  html += "</select>";
  html +=
    "<label for='year' class='block text-gray-700 font-semibold'>Año</label>";
  html +=
    "<input type='date' name='year' required class='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'>";
  html +=
    "<label for='author' class='block text-gray-700 font-semibold'>Autor</label>";
  html +=
    "<input type='text' name='author' required class='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'>";
  html +=
    "<label for='image' class='block text-gray-700 font-semibold'>URL de la imagen</label>";
  html +=
    "<input type='url' name='image' required class='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'>";
  html +=
    "<label for='link' class='block text-gray-700 font-semibold'>URL del enlace</label>";
  html +=
    "<input type='url' name='link' required class='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'>";
  html +=
    "<button type='submit' class='w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>Agregar</button>";

  html += "</form>";
  return html;
}

export { createPage, createListBooks, createBookDetails, newBook };
