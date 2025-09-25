# Crear pendrive de instalación de Debian desde Windows

Testeado en Windows 11

## Paso 1. Descargar Rufus

Descargar Rufus desde [https://rufus.ie/es/](https://rufus.ie/es/) e instalarlo.

## Paso 2. Descargar imagen

Ir a [https://www.microsoft.com/es-es/software-download/windows11](https://www.microsoft.com/es-es/software-download/windows11) y descargar la imagen ISO.

## Paso 3. Verificar la imagen

Instalar desde Windows Store «MD5 Win Verifier» o ejecutar el siguiente comando en PS:

```
Get-FileHash -Path "C:\ruta\a\tu\archivo.iso" -Algorithm SHA256
```

Checksum para la iso española: **708AF7C9AC63B7EB045CA9B196568758B6C1749E8D13CADE61FAACBC7C66D142**


## Paso 4. Transferir imagen a pendrive

Desconectar cualquier disco USB que tengamos por precaución y enchufar el pendrive.

Abrir Rufus. Seleccionar la ISO. Seleccionar MBR (BIOS, ordenadores antiguos) o GPT (UEFI, ordenadores modernos) y hacer click en «Empezar».

![Image](img/4.png)

Marcar todas las opciones en Rufus para saltar las protecciones de Windows 11.

![Image](img/5.png)

**ATENCIÓN**: Seleccionar el esquema de partición y el sistema de destino correcto es importante ya que las imágenes de instalación fallarán si nuestro disco no tiene el sistema correspondiente.

## Paso 5. Terminado

El pendrive está listo para arrancar en un pc.
