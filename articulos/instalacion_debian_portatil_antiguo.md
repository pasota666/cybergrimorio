# Instalación de Debian en un portátil antiguo con encriptación

Testeado en Debian GNU/Linux 13 (Trixie)

El presente artículo pretende ser un método general para cualquier instalación de Debian. El caso específico aquí es la instalación en un portátil antiguo a modo de ejemplo.

# Paso 1. Reunir información

En este paso debemos reunir toda la información posible sobre la máquina. Para ello podemos entrar en la BIOS, ver las especificaciones de los manuales e incluso las etiquetas que hay en el portátil. Es útil anotarlo en alguna hoja de cálculo o documento para futuras referencias.

Al ser un portátil antiguo nuestra BIOS será una BIOS Legacy o antigua y no una BIOS UEFI.

- **Modelo portátil o placa**: ACER Aspire 5741-G
- **CPU**: Intel (R) Core (TM) i5 CPU M450 2.40 GHz
- **RAM**: 4096 MB
- **Video**: Nvidia GeForce GT 335M 1024 MB
- **Disco**: OCZ 120GB SSD
- **Tipo de BIOS**: Legacy
- **Wireless**: SSID y clave de la red wifi si es necesario.

# Paso 2. Decidir tipo de instalación

Generalmente, dependiendo del tipo de máquina y del uso que vayamos a darle podemos instalar:

- Workstation (con sistema de ventanas)
    - Encriptado (ideal para portátiles)
    - Sin encriptar (ideal para sobremesa)
- Servidor (sin sistema de ventanas)

La encriptación de discos es un proceso algo engorroso, por eso es mejor reservarla a ordenadores portátiles en los que el riesgo de pérdida es mayor. Personalmente, no suelo encriptar los discos de los PC de sobremesa.

**Decisión**: Al ser un portátil con BIOS antigua o legacy, vamos a instalar Debian como una workstation con sistema de ventanas y encriptado.

# Paso 3. Comprobar requisitos y decidir el particionado

Los requisitos de Debian son:

| Tipo de instalación | RAM (mínimo) | RAM (recomendado) | Discos duros |
| ------------------- | ------------ | ----------------- | ------------ |
| Sin escritorio      | 512MB        | 1GB               | 4GB          |
| Con escritorio      | 1GB          | 2GB               | 10GB         |

Requisitos de KDE Plasma:

KDE Plasma es compatible con casi todos los equipos de sobremesa y portátiles con:

- Firmware UEFI (que incluye la mayoría de los que se han vendido durante los últimos 15 años).
- Una CPU AMD o Intel 1 GB de memoria (con más memoria, el sistema será más rápido).
- 6 GB de espacio de almacenamiento (más de 12 permitirá volver a versiones anteriores del sistema).

*NOTA*: Aunque especifique UEFI en su documentación oficial, también es compatible con BIOS legacy antiguas.

Se hará el siguiente particionado:

- Boot (1 GB)
- Encriptado
    - Root (115 GB)
    - Swap (4 GB)

**NOTA**: Esto es un cálculo aproximado, hay que ver si las especificaciones del disco están en GB o GiB. El instalador maneja ambas notaciones y posiblemente haya que hacer algún cálculo más adelante si queremos usar GiB (la notación tradicional basada en base 2 que usan todos los programas).

# Paso 4. Determinar datos de la instalación

Antes de seguir, hay que tener claros algunos datos que nos va a pedir la instalación.

- **Nombre de host**: acer5741.local
- **Nombre completo de usuario**: Don Pasota
- **Nombre de usuario**: pasota
- **Contraseña de usuario**: ********
- **Contraseña de root**: ********
- **Contraseña de desencriptación**: ******** (20 o más caracteres, números, letras y signos)

# Paso 5. Crear el pendrive de instalación

Consultar los siguientes artículos:
- [Crear pendrive desde Windows](https://pasota666.github.io/cybergrimorio/#pendrive_debian_desde_windows.md)
- [Crear pendrive desde Debian](https://pasota666.github.io/cybergrimorio/#pendrive_debian_desde_debian.md)

# Paso 6. Configurar BIOS

Entrar en BIOS y configurar lo siguiente:

- Fecha y hora.
- Contraseña si se quiere proteger (recomendado)
- BOOT sequence para arrancar desde pendrive.

# Paso 7. Arrancar el sistema

Vamos a arrancar desde el pendrive:

- **ATENCIÓN**: Desenchufar del equipo todos los discos USB, o discos que no se vayan a usar.
- **ATENCIÓN**: Comprobar que el portátil está enchufado al adaptador de corriente.
- Conectar el cable de red si no tenemos wifi.
- Introducir el pendrive y arrancar la instalación.

# Paso 8. Instalación

## Primera parte (idioma, red y usuarios)

Configuración básica del sistema:

- Elegir idioma, localización y teclado.
- Conexión a la red
    - enp2s0: tarjeta de red ethernet.
    - wlp2s0: tarjeta de red wireless.
- Usuarios y contraseñas.

## Segunda parte (particionado)

Particionado de discos. Se va a realizar un particionado manual porque queremos definir nosotros el tamaño de la swap y la raíz.

El instalador ofrece una opción de particionado automático o guiado (tanto encriptado como sin encriptar) que puede sernos de ayuda si no queremos realizar todo esto.

Hay que tener en cuenta que es un disco duro antiguo marcado como MBR (BIOS) y no como GPT (EFI). Con EFI la cosa cambia ya que necesitamos otra partición de tipo EFI y dejar 1MB vacío tanto al final como al comienzo.

Básicamente lo que hago en el particionado manual es:

1. Crear una partición de arranque (/boot): almacena archivos necesarios para el gestor de arranque.
2. Crear un volumen cifrado: le decimos que el resto del disco estará encriptado.
3. Crear un gestor de volúmenes lógicos (LVM): esto permite crear volúmenes lógicos (particiones) en el disco.
4. Crear un grupo de volúmenes.
5. Dentro de ese grupo, finalmente creamos dos volúmenes (root y swap)
6. Marcamos el formato y los puntos de montaje de cada volumen.

Pasos a seguir en el instalador:

- Seleccionar «Particionado manual»
- Eliminar todas las particiones existentes en el disco si las hubiera.
- Crear partición nueva 1GB, primaria, principio.
- Usar como: ext4, /boot, marcar como arrancable por si acaso. La partición boot la estamos creando sin encriptar o el sistema no podrá arrancar.
- Seleccionar «Configurar volúmenes cifrados»
- Seleccionar «Crear volúmenes cifrados»
- Seleccionar el ESPACIO LIBRE.
- Formateamos y activamos marca de arranque. No tocamos nada más del cifrado- (aes, 256, etc)
- Seleccionar «Terminar»
- Ahora el instalador se tirará un buen rato escribiendo en la partición datos- aleatorios.
- Seleccionar «Configurar Gestor de Volúmenes Lógicos (LVM)»
- Seleccionar «Crear grupo de volúmenes»
- Nombre: «vg-1»
- Seleccionar «/dev/mapper/sda5_crypt»
- Ahora creamos dos volúmenes lógicos, para root le resto 4GiB (1024*4 = 4096) porque es el tamaño que voy a dedicar a la swap:
    - Nombre: «lv-root»
    - Tamaño: 119.013 – 4.096 = 114.917 MB
    - Nombre: «lv-swap»
    - Tamaño: 4.097 MB
- Seleccionar «Terminar»
    - Marcar para formatear los volúmenes:
        - lv-root ext4 como /
        - lv-swap como area de intercambio
-Finalmente, el esquema debe quedar algo así:

![Image](img/3.webp)

- Finalizar el particionado y escribir los cambios en disco.

## Tercera parte (paquetes y gestor de arranque)

Seleccionar mirror por defecto y marcar las siguientes casillas:

- Entorno de escritorio
    - KDE Plasma
- Utilidades estándar del sistema

Seleccionar «Continuar». Finalmente, instalamos el gestor de arranque "grub" en /dev/sda y la instalación está completa.

# Paso 9: Reajustar BIOS

Volver a entrar a BIOS para asegurarse que pide el password y que bootea directamente desde el disco y no del pendrive.
