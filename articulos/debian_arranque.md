# Proceso de arranque

## Fase 1. Firmware.

La BIOS/UEFI se encarga de:
1. Inicializa el hardware básico (CPU, RAM, discos, teclado, etc.)
2. Ejecuta el POST (Power-On Self Test) para verificar el funcionamiento del hardware básico.
3. Busca el dispositivo de arranque según el orden.
4. Carga el bootloader (cargador de arranque) desde MBR (Master Boot Record, en BIOS) o la EFI System Partition (en UEFI, en /boot/efi/EFI/debian/grubx64.efi).

## Fase 2. Bootloader.

El bootloader de Debian es GRUB (GRand Unified Bootloader). El problema fundamental de arrancar un kernel es que el kernel está almacenado en el disco pero no podemos tener acceso al disco si el sistema no está en funcionamiento. El proceso general es el siguiente:
1. Muestra un menú donde puedes elegir kernel o entrar en una pequeña consola de recuperación.
2. Carga el kernel de Linux en memoria (vmlinuz) a través de llamadas sencillas a la BIOS que pueden leer de disco.
3. Carga la imagen del initrd o initramfs, un pequeño sistema de archivos temporal que permite montar el sistema real.
4. Se descomprime el kernel y le pasa el control.
5. El kernel monta ya los sistemas de ficheros y el sistema puede iniciarse.

Notas:
- Vmlinuz es el kernel que se va a usar pero comprimido.
- Initrd significa initial RAM disk.
- Initramfs initial RAM filesystem, es un sistema más moderno que se carga directamente en memoria sin montar.
- Estas imágenes iniciales contienen drivers para discos, programas básicos (init, busybox), scripts para montar el sistema real.
- En el directorio /boot se guarda todo (vmlinuz, initrd, ficheros de GRUB)
- Si el disco es GPT (UEFI), necesitamos una partición
- No hace falta separar /boot en una partición aparte (salvo que queramos usar encriptación)
- La partición EFI sí que tiene que estar separada porque es un requisito del esquema GPT.

Flujo de arranque UEFI:

- UEFI firmware busca un cargador EFI en la partición /dev/sda1 (EFI System Partition). Encuentra EFI/BOOT/bootx64.efi.
- GRUB EFI se ejecuta desde esa partición FAT32.
- GRUB está configurado para buscar su configuración en /boot/grub/grub.cfg.
- GRUB (ya en ejecución) lee /boot/grub/grub.cfg desde /dev/sda2
- Y de ahí carga vmlinuz y initrd (que están también en /boot dentro de esa misma partición raíz).

Flujo de arranque BIOS:

- El BIOS busca el primer disco arrancable y carga el MBR (primer sector del disco, 512 bytes).
- En el MBR está la primera etapa de GRUB (Stage 1).
- Esa primera etapa carga la segunda (Stage 1.5 o Stage 2) desde el “post-MBR gap” o desde la partición /boot.
- GRUB completo se ejecuta y busca su configuración en /boot/grub/grub.cfg.
- GRUB (ya en ejecución) lee /boot/grub/grub.cfg desde la partición raíz (por ejemplo /dev/sda1 o /dev/sda2).
- Y de ahí carga vmlinuz y initrd desde /boot en esa misma partición.


## Fase 3. Kernel e initramfs

En esta fase el kernel toma el control y hace lo siguiente:
- Detecta el hardware básico (CPU, memoria, buses, dispositivos, etc)
- Carga los módulos necesarios (controladores) desde la initramfs.
- Monta la raíz (/)
- Ejecuta el primer proceso en espacio de usuario, tradicionalmente era /sbin/init, ahora esto es un enlace simbólico a systemd

## Fase 4. Systemd

En los Linux modernos se usa systemd, que reemplaza los antiguos scripts estilo SysV.

Systemd monta sistemas de archivos, inicia servicios en paralelo, gestiona dependencias y sockets, cambia de targets (antiguos niveles de ejecución).

## Fase 5. Targets.

| Target              | Equivalente SysV | Descripción     |
| ------------------- | ---------------- | --------------- |
| `poweroff.target`   | 0                | Apagar          |
| `rescue.target`     | 1                | Monousuario     |
| `multi-user.target` | 2-5              | Multiusuario    |
| `graphical.target`  | 5                | Entorno gráfico |
| `reboot.target`     | 6                | Reiniciar       |

## Fase 6. Archivos y unidades de systemd.

En systemd existen las "unidades" que definen servicios, montajes, sockets.
Tipos de unidades:
- .service: servicios (networking, udev)
- .mount: puntos de montaje ()
- .target: grupos de unidades (multiuser, graphical...)

```
# systemd-analyze critical-chain

The time when unit became active or started is printed after the "@" character.
The time the unit took to start is printed after the "+" character.

graphical.target @14.247s
└─power-profiles-daemon.service @14.179s +66ms
  └─multi-user.target @14.176s
    └─cups-browsed.service @14.175s
      └─network-online.target @14.173s
        └─NetworkManager-wait-online.service @8.171s +6.000s
          └─NetworkManager.service @7.354s +814ms
            └─dbus.service @7.242s +107ms
              └─basic.target @7.230s
                └─sockets.target @7.227s
                  └─systemd-hostnamed.socket @7.227s
                    └─sysinit.target @7.214s
                      └─systemd-sysctl.service @7.157s +53ms
                        └─systemd-modules-load.service @688ms +6.466s
                          └─systemd-journald.socket @670ms
                            └─system.slice @632ms
                              └─-.slice @632ms

```
## Fase 7. Activación del entorno gráfico KDE

1. systemd ejecuta sddm.service
2. sddm arranca el servidor Xorg o Wayland compositor
3. Muestra la pantalla de login (greeter)
4. Tras autenticación, sddm inicia la sesión de usuario y lanza: startplasma-x11 o startplasma-wayland, que arranca el entorno de escritorio KDE Plasma.

## Fase 8. Sesión de usuario KDE

Dentro de tu sesión KDE:
- systemd --user se ejecuta en segundo plano para manejar servicios del usuario.
- Se cargan configuraciones gráficas, plasmashell, kwin, kded, etc.
- El entorno queda completamente funcional.