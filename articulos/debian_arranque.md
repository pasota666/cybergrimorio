# Proceso de arranque

# Fase 1. Firmware.

La BIOS/UEFI se encarga de:
1. Inicializa el hardware básico (CPU, RAM, discos, teclado, etc.)
2. Ejecuta el POST (Power-On Self Test) para verificar el funcionamiento del hardware básico.
3. Busca el dispositivo de arranque según el orden.
4. Carga el bootloader (cargador de arranque) desde MBR (Master Boot Record, en BIOS) o la EFI System Partition (en UEFI, en /boot/efi/EFI/debian/grubx64.efi).

# Fase 2. Bootloader.

El bootloader de Debian es GRUB (GRand Unified Bootloader). El problema fundamental de arrancar un kernel es que el kernel está almacenado en el disco pero no podemos tener acceso al disco si el sistema no está en funcionamiento. Para ello, el bootloader hace lo siguiente:
1. Muestra un menú donde puedes elegir kernel o entrar en una pequeña consola de recuperación.
2. Carga el kernel de Linux en memoria (vmlinuz).
3. Carga la imagen del initrd o initramfs, un pequeño sistema de archivos temporal que permite montar el sistema real.
4. Le pasa el control al kernel.

La configuración de Grub está en /boot/grub/grub.cfg que se genera a partir de:
- /etc/default/grub
- scripts en /etc/grub.d/

Aclaraciones.
- Vmlinuz es el kernel que se va a usar pero comprimido.
- Initrd significa initial RAM disk.
- Initramfs initial RAM filesystem, es un sistema más moderna que se carga directamente en memoria sin montar.
- Estas imágenes iniciales contienen drivers para discos, programas básicos (init, busybox), scripts para montar el sistema real.

Funcionamiento más detallado:
1. GRUB, a través de BIOS/UEFI, es capaz de leer de forma sencilla la partición de arranque (/boot) carga vmlinuz y initramfs en memoria.
2. El kernel arranca y monta el initramfs como un sistema raíz temporal.
3. Dentro de initramfs, se ejecuta /init, que:
 - Carga módulos del kernel (drivers).
 - Detecta y monta el disco real (/dev/sda2, por ejemplo
 - Transfiere el control al sistema real (normalmente ejecutando switch_root o pivot_root).
 4. Finalmente, se inicia el proceso init del sistema real (por ejemplo systemd o init tradicional).