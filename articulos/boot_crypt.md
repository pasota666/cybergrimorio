# Encriptar la partición /boot

Testeado en Debian GNU/Linux 13 (Trixie)

Testeado tanto en BIOS como en UEFI. Funciona en ambos casos.

# Problema

Al instalar un sistema encriptado con LUKS en Debian, surge una limitación importante: el gestor de arranque Grub requiere acceso a la partición /boot para iniciar el sistema. Por este motivo, el instalador por defecto deja esta partición sin encriptar, ya que de lo contrario el equipo no podría arrancar.

Sin embargo, mantener /boot sin cifrar representa un riesgo de seguridad, ya que podría ser manipulada en lo que se conoce como un evil maid attack (ataque del sirviente infiel). En este escenario, un atacante con acceso físico a la máquina podría modificar Grub o el kernel para comprometer el sistema cuando se vuelva a iniciar.

Para mitigar este riesgo, es posible encriptar también la partición /boot. Aunque el instalador estándar de Debian utiliza LUKS2 (que Grub no soporta completamente), Grub sí es compatible con volúmenes cifrados con LUKS1. Por lo tanto, si se configura manualmente la partición /boot usando LUKS1 en lugar de LUKS2, Grub podrá arrancar desde ella de forma segura. Como resultado, el gestor de arranque solicitará la contraseña de desbloqueo durante el inicio, añadiendo una capa adicional de protección.

# Paso 1. Convertir LUKS2 a LUKS1

Lo primero, es confirmar en que partición tenemos LUKS, por ejemplo, "/dev/sda5" o "/dev/nvme0n1p5" si el disco es nvme.

Para obtener información sobre LUKS ejecutamos:

```
$ sudo cryptsetup luksDump /dev/sda5
```

Devolverá algo como:
```
LUKS header information
Version:       	2
[...]
Keyslots:
  0: luks2
```

Tenemos la versión 2 y el keyslot (ranura) 0 contiene la contraseña de cifrado.

Reiniciamos la computadora y cuando estemos en el Grub, pulsamos "e" para editar el arranque.

Escribimos "break=mount" al final de la línea "linux" que carga el kernel y después pulsamos F10 para continuar con el arranque.

![Image](img/6.png)

Esto nos llevará a la consola de emergencia de Grub (initramfs)

Ejecutamos lo siguiente:

```
(initramfs) cryptsetup luksConvertKey --pbkdf pbkdf2 /dev/sda5
(initramfs) cryptsetup convert --type luks1 /dev/sda5
(initramfs) cryptsetup luksDump /dev/sda5
```

Reiniciamos con CTRL+ALT+SUPR.

# Paso 2. Copiar boot

Esto hace una copia de la partición boot y evita que se modifique ningún dato mientras se copia:

```
$ sudo mount -o remount,ro /boot
$ sudo cp -axT /boot /boot.tmp
```

Ahora, dependiendo de nuestra instalación ejecutaremos:

## Si el disco es MBR (BIOS)
```
$ sudo sudo umount /boot
$ sudo rmdir /boot
$ sudo mv -T /boot.tmp /boot
```

## Si el disco es GPT (UEFI)

```
$ sudo umount /boot/efi && sudo umount /boot
$ sudo rmdir /boot
$ sudo mv -T /boot.tmp /boot
$ sudo mount /boot/efi
```

# Paso 3. Comentar fstab

Comentamos la línea en /etc/fstab que tenga la entrada a /boot.

```
#UUID=... /boot           ext2    defaults        0       2
```

# Paso 4. Grub

Configuramos Grub para que sea capaz de leer particiones de arranque encriptadas.

```
$ echo "GRUB_ENABLE_CRYPTODISK=y" | sudo tee --append /etc/default/grub
$ sudo update-grub
$ sudo grub-install /dev/sda
```

Verificamos que grub.cfg ha hecho los cambios y tiene entradas para cryptodisk y luks:

```
$ sudo grep 'cryptodisk\|luks' /boot/grub/grub.cfg
```

Ahora reiniciamos y comprobamos que antes de iniciarse, Grub pedirá contraseña.

Una vez puesta, tarda un rato en iniciar pero es normal. Luks1 es algo lento.

Después, tendremos que volver a escribir la contraseña para desencriptar el sistema de ficheros, pero esto se puede solucionar.

# Paso 5 (Opcional). Usar un keyslot extra

Con este paso evitaremos tener que escribir la contraseña dos veces (para /boot y para nuestro sistema de ficheros).

## Generar keyfile

Generamos el keyfile y lo metemos en el slot 1.

```
$ sudo dd bs=512 count=4 if=/dev/random of=/keyfile iflag=fullblock
$ sudo chmod 600 /keyfile
$ sudo cryptsetup luksAddKey /dev/sda5 /keyfile
$ sudo cryptsetup luksDump /dev/sda5
```

Modificamos /etc/crypttab y quitamos "none" y añadimos "key-slot=1"

```
sda5_crypt UUID=<a_long_string_of_characters> /keyfile luks,discard,key-slot=1
```

## Actualizar initramfs

Modificamos /etc/cryptsetup-initramfs/conf-hook

```
KEYFILE_PATTERN="/keyfile"
```

Cambiamos el UMASK para mayor seguridad:

```
$ echo UMASK=0077 | sudo tee --append /etc/initramfs-tools/initramfs.conf
```

Re-generamos initramfs:

```
$ sudo update-initramfs -u -k all
```

Reiniciamos y ya está completo.

# Bibliografía

[dwarmstrong.org](https://www.dwarmstrong.org/fde-debian/)
