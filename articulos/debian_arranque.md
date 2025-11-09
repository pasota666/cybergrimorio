# Proceso de arranque

# Fase 1. Firmware.

La BIOS/UEFI se encarga de:
- Inicializa el hardware básico (CPU, RAM, discos, teclado, etc.)
- Ejecuta el POST (Power-On Self Test) para verificar el funcionamiento del hardware básico.
- Busca el dispositivo de arranque según el orden.
- Carga el bootloader (cargador de arranque) desde MBR (Master Boot Record, en BIOS) o la EFI System Partition (en UEFI, en /boot/efi/EFI/debian/grubx64.efi).

# Fase 2. Bootloader.

El bootloader de Debian es GRUB (GRand Unified Bootloader).

Hace lo siguiente:
- Muestra un menú donde puedes elegir kernel o entrar en una pequeña consola de recuperación.
- Carga el kernel de Linux en memoria (vmlinuz)
- Carga la imagen del initrd/initramfs, un pequeño sistema de archivos temporal que permite montar el sistema real.
- Le pasa el control al kernel.

La configuración de Grub está en /boot/grub/grub.cfg que se genera a partir de:
- /etc/default/grub
- scripts en /etc/grub.d/