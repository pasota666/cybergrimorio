# Crear pendrive de instalación de Debian desde Windows

Testeado en Debian GNU/Linux 13 (Trixie)

## Paso 1. Descargar Rufus

Descargar Rufus desde [https://rufus.ie/es/](https://rufus.ie/es/) e instalarlo.

## Paso 2. Descargar imagen

Ir a [https://cdimage.debian.org/debian-cd/current/amd64/iso-cd/](https://cdimage.debian.org/debian-cd/current/amd64/iso-cd/) y descargar:
- **Imagen netisnt** (debian-13.1.0-amd64-netinst.iso)
- **SHA256Sums** (fichero con los hash)

## Paso 3. Verificar la imagen

Instalar desde Windows Store «MD5 Win Verifier». Seleccionar SHA256, la imagen y copiar el hash del fichero de texto. Pulsar «Verify», si coincide la imagen no está corrupta.

![Image](img/1.webp)

## Paso 4. Transferir imagen a pendrive

Desconectar cualquier disco USB que tengamos por precaución y enchufar el pendrive.

Abrir Rufus. Seleccionar la ISO. Seleccionar MBR (BIOS, ordenadores antiguos) o GPT (UEFI, ordenadores modernos) y hacer click en «Empezar». Si pide descargar syslinux o cualquier otra cosa, aceptar.

![Image](img/2.png)

## Paso 5. Terminado

El pendrive está listo para arrancar en un pc.
