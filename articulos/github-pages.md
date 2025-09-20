# Cómo usar GitHub Pages

GitHub Pages es un servicio de alojamiento de sitios estáticos que toma archivos HTML, CSS y JavaScript directamente desde un repositorio en GitHub.

## Configuración básica

1. Crea un nuevo repositorio en GitHub
2. Sube tus archivos HTML, CSS y JavaScript
3. Ve a la configuración del repositorio
4. Habilita GitHub Pages en la sección correspondiente
5. ¡Tu sitio estará disponible en `https://tuusuario.github.io/nombre-repositorio/`

## Tipos de GitHub Pages

- **Páginas de proyecto**: Alojadas en subdirectorios de github.io
- **Páginas de usuario/organización**: Alojadas en el dominio raíz de github.io

## Características principales

- **Gratuito**: GitHub Pages es completamente gratuito
- **Alto rendimiento**: Servido through GitHub's CDN
- **SSL integrado**: Todas las páginas tienen HTTPS habilitado
- **Dominio personalizado**: Puedes usar tu propio dominio

## Flujo de trabajo recomendado

1. Trabaja en una rama específica (por ejemplo, `gh-pages`)
2. Usa acciones de GitHub para builds automatizados
3. Configura un dominio personalizado si es necesario
4. Monitorea tu sitio regularmente

## Ejemplo de configuración

```yaml
# Ejemplo de workflow para GitHub Pages
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install && npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
