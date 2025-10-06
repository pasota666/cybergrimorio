# BIOS

La BIOS (Basic Input Output System) es un sistema básico de entrada y salida que está en un firmware (software integrado en un circuito). Es el sistema tradicional que han usado los PC desde los 80.

Cuando arranca, su objetivo es comprobar que todo responde bien (POST) y después carga el sistema operativo buscando en los discos duros un sector llamdo MBR (Master Boot Record) y le pasa el control.

Limitaciones de BIOS:
- No soporta discos de más de 2.2 TB.
- Es lento.
- No tiene soporte gráfico ni de ratón.

# EFI o UEFI

Es el sistema diseñado para remplazar BIOS. No usa MBR, sino ESP (EFI System Partition) donde guarda los cargadores de arranque de cada sistema operativo.

- Soporta discos enormes.
- Es rápido.
- Implementa seguridad con "Secure Boot".

EFI (Extensible Firmware Interface) era la tecnología propietaria de Intel en los 90, creado para Itanium. Fue el primer intento de reemplazar la BIOS.

UEFI (Unified Extensible Firmware Interface) es un consorcio de 2005 para que suplantar BIOS en un acuerdo entre grandes empresas. Se hicieron mejoras y se estandarizó.

# Discos duros

Dependiendo de si nuestro firmware es BIOS o UEFI, debemos asignar un esquema de particiones MBR o GPT a nuestro disco. Esto lo suele hacer de forma automática el instalador del sistema operativo o lo podemos hacer manualmente con fdisk o similares.

- BIOS usa MBR o DOS (como lo llama fdisk)
    - Máximo 4 particiones primarias o partición lógica con subparticiones.
    - No soporta más de 2.2 TB.
    - Si se corrompe el MBR no arranca.
    - PCs antiguos, hasta 2011 aproximadamente.
- UEFI usa GPT (GUID Partition Table)
    - 128 particiones primarias.
    - Discos enormes (prácticamente sin límite)
    - Incluye checksums para evitar la corrupción.
    - PCs modernos.

# Pendrive de instalación

Es muy importante, a la hora de instalar un sistema operativo como Debian, formatear el pendrive de acuerdo al tipo de firmware que tenemos (BIOS o UEFI) o la instalación no funcionará correctamente.

Hay que tener en cuenta, que hay PCs con firmware antiguo donde a pesar de soportar UEFI, este no funciona correctamente, por lo que debemos desactivarlo y usar la opción de BIOS clásica.
