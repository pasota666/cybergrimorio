# Crear pendrive de instalación de Debian desde Debian

Testeado en Debian GNU/Linux 13 (Trixie)

## Paso 1. Descargar imagen

Ir a [https://cdimage.debian.org/debian-cd/current/amd64/iso-cd/](https://cdimage.debian.org/debian-cd/current/amd64/iso-cd/) y descargar:
- **Imagen netisnt** (debian-13.1.0-amd64-netinst.iso)
- **SHA256Sums** (fichero con los hash)

## Paso 2. Comprobar la imagen

Ejecutamos el comando sha256sum y luego comparamos si la cadena coincide en el fichero SHA256Sums.

```
$ sha256sum <fichero.iso>
```

También se puede usar el script [check_debian_iso](https://people.debian.org/~danchev/debian-iso/check_debian_iso)

```
$ chmod +x check_debian_iso
$ ./check_debian_iso SHA256SUMS debian-13.1.0-amd64-netinst.iso
```

## Paso 3. Introducir el pendrive

**IMPORTANTE: Antes de introducir el pendrive, desconectar cualquier disco externo USB o corremos el riesgo de formatearlo.**

Una vez introducido el pendrive, por defecto, KDE no lo montará. Averiguamos que dispositivo es con:

```
# dmesg
```

La última línea muestra que dispositivo es (en este caso /dev/sdb):

```
[sdb] Attached SCSI removable disk
```

## Paso 4. Transferir imagen al pendrive

Ejecutamos el siguiente comando con la unidad correspondiente, (en nuestro caso /dev/sdb):

```
# dd if=debian-13.1.0-amd64-netinst.iso of=/dev/sda bs=1M status=progress
```

## Paso 5. Terminado

El pendrive está listo para arrancar en un pc.
