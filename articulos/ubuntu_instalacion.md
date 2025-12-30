# Instalación y configuración básica de Ubuntu

## Paso 1. Requisitos

Los requisitos de Ubuntu (24.04 LTS) son:

- Procesador 2 GHz dual-core o superior
- 4 GB de memoria RAM
- 25 GB de disco duro.
- Puerto USB para arrancar el medio de instalación.
- Memoria USB de al menos 12 GB o superior.

**NOTA**: También es posible grabar la imagen a un DVD y arrancar desde él.

## Paso 2. Descargar imagen

Descargamos la ISO desde [ubuntu.com](https://ubuntu.com/download/desktop)

Bajamos la versión LTS que es más estable y está soportada durante más tiempo.

## Paso 3. Crear el pendrive

El método recomendado es usar el programa [Balena Etcher](https://etcher.balena.io/) que tiene versiones para Windows y Linux.

Tan solo hay que introducir el pendrive, seleccionar la ISO que hemos bajado y flashear.

## Paso 4. Instalar

La instalación es sumamente sencilla. Se recomienda activar los repositorios de terceros para instalar drivers propietarios de NVidia.

## Paso 5. Actualizar

En Ubuntu existen dos formas principales de instalar software: los repositorios de apt y Snap, el app store de Canonical. Así que cuando actualizamos debemos comprobar ambas fuentes.
- Ejecutar "Actualización de software"
- Ejecutar "Centro de aplicaciones"

Reiniciar (snap requiere reiniciar).

## Paso 6. Configuración básica del entorno

Suelo retocar los siguientes aspectos del sistema:
- Activar el modo oscuro.
- Chequear que Ubuntu no activa una salida VGA como pantalla (pasa en algunos portátiles) y si lo hace, desactivarla.
- Energía: rendimiento. No oscurecer la pantalla. Apagarla 5 min.
- Privacidad y seguridad > Bloqueo de pantalla > Bloqueo de pantalla automático (off)
- Configuración > Escritorio de Ubuntu > Grupos de ventana en mosaico (off)

## Paso 7. Instalar programas básicos

Instalo los siguientes programas desde el centro de aplicaciones:

- LibreOffice
- Brave
