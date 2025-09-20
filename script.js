// Configurar marked
marked.setOptions({
  breaks: true,
  gfm: true,
  highlight: function (code, lang) {
    // En una implementación real, podrías agregar resaltado de sintaxis aquí
    return code;
  },
});

// Función para cargar artículos Markdown
async function loadArticle(articleName) {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = '<div class="loading">Cargando contenido...</div>';

  try {
    // Intentar cargar el artículo Markdown desde la carpeta 'articulos'
    //alert(articleName);
    //const response = await fetch(`articulos/${articleName}.md`);
    //const response = await fetch("articulos/" + articleName + ".md");
    const response = await fetch("articulos/" + articleName);

    if (!response.ok) {
      throw new Error("Artículo no encontrado");
    }

    const markdown = await response.text();

    // Convertir Markdown a HTML
    const htmlContent = marked.parse(markdown);

    // Mostrar el contenido
    contentDiv.innerHTML = `
                <div class="markdown-body">
                ${htmlContent}
                <p><a href="#" id="back-button">← Volver al inicio</a></p>
                </div>
                `;

    // Añadir event listener al botón de volver
    document
      .getElementById("back-button")
      .addEventListener("click", function (e) {
        e.preventDefault();
        navigateTo("home");
      });

    // Actualizar el título de la página
    /*
    const titleMatch = markdown.match(/#\s(.+)/);
    if (titleMatch && titleMatch[1]) {
      document.getElementById("page-title").textContent = titleMatch[1];
    } else {
      document.getElementById("page-title").textContent = "Artículo";
    }
    */
    const titleMatch = markdown.match(/#\s(.+)/);
    if (titleMatch && titleMatch[1]) {
      // Crear título dinámicamente si lo necesitas en otro lugar
      const titleElement = document.createElement("h2");
      titleElement.textContent = titleMatch[1];
      titleElement.style.display = "none"; // Ocultarlo si no lo quieres visible
      document.body.appendChild(titleElement);
    }
  } catch (error) {
    //alert(error);
    contentDiv.innerHTML = `
                <div class="error">
                <h3>Error al cargar el artículo</h3>
                <p>El artículo "${articleName}" no pudo ser cargado. Asegúrate de que el archivo existe en la carpeta "articulos".</p>
                <p>Detalles: ${error.message}</p>
                </div>
                `;
  }
}

// Función para cargar la página de inicio con lista de artículos
// Función para cargar la página de inicio desde indice.md
async function loadHomePage() {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = '<div class="loading">Cargando índice...</div>';

  try {
    // Cargar el archivo indice.md
    const response = await fetch("articulos/indice.md");

    if (!response.ok) {
      throw new Error("Índice no encontrado");
    }

    const markdown = await response.text();

    // Convertir Markdown a HTML
    const htmlContent = marked.parse(markdown);

    // Reemplazar enlaces Markdown por enlaces que funcionen con tu sistema
    const processedContent = htmlContent.replace(
      /<a href="([^"]+)">/g,
      '<a href="#" data-page="$1">',
    );

    // Mostrar el contenido
    contentDiv.innerHTML = `
        <div class="markdown-body">
        ${processedContent}
        </div>
        `;

    // Añadir event listeners a los enlaces del índice
    document.querySelectorAll("#content a[data-page]").forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const article = this.getAttribute("data-page");
        navigateTo(article);
      });
    });

    //document.getElementById("page-title").textContent = "Índice de Artículos";
  } catch (error) {
    console.error("Error cargando índice:", error);
    contentDiv.innerHTML = `
        <div class="error">
        <h3>Error al cargar el índice</h3>
        <p>${error.message}</p>
        </div>
        `;
  }
}

// Obtener la página actual desde el historial o por defecto
function getCurrentPage() {
  const hash = window.location.hash.substring(1);
  return hash || "home";
}

// Navegación con el historial del navegador
function navigateTo(page) {
  window.location.hash = page;

  if (page === "home") {
    loadHomePage();
  } else {
    loadArticle(page);
  }
}

// Inicializar la página
document.addEventListener("DOMContentLoaded", function () {
  // Cargar contenido según el hash de la URL
  const initialPage = getCurrentPage();

  if (initialPage === "home") {
    loadHomePage();
  } else {
    loadArticle(initialPage);
  }

  // Añadir event listeners a los enlaces del menú
  document.querySelectorAll("nav a, aside a").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const page = this.getAttribute("data-page");
      navigateTo(page);
    });
  });
});

// Manejar cambios en el hash de la URL
window.addEventListener("hashchange", function () {
  const page = getCurrentPage();

  if (page === "home") {
    loadHomePage();
  } else {
    loadArticle(page);
  }
});
