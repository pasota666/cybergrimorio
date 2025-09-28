# Instalación dual de Debian y Windows en un portátil antiguo con encriptación

Testeado en Debian GNU/Linux 13 (Trixie)

# Paso 1. Reunir información

- Modelo portátil o placa:
- CPU: Intel Core i5 11400H 2.70 GHz
- RAM: 16GB
- Video: 
- Disco: 500 GB (476 GiB)
- Tipo de BIOS: UEFI
- Wireless: SSID y clave de la red wifi si es necesario.
- Tecla de BIOS: ?

# Paso 2. Decidir tipo de Instalación

**Decisión**: Workstation con UEFI, Debian con KDE y Windows 11. La parte de Debian irá encriptada. La partición boot se encriptará después de la instalación.

# Paso 3. Comprobar requisitos y decidir particionado

Los requisitos se cumplen.

Disponemos de 500GB, que hemos repartido así:

- EFI: 100MB (esta partición la crea Windows)
- BOOT: 1 GB Partición de arranque de Linux (/boot, inicialmente la debemos definir sin encriptar).
- SWAP: 4 GB Area de memoria compartida de Linux (irá en vg-1 volumen encriptado)
- LINUX: 70 GiB Espacio para Linux (irá en vg-1 volumen encriptado)
- WIN: 75 GiB Espacio para Windows.
- COMPARTIDA: 350 GB aprox. partición NTFS compartida entre ambos sistemas (para instalar programas de Windows y compartir ficheros inofensivos)

Se le han dado 70-75GB a cada partición de sistema, creo que es suficiente para instalar los programas que necesito. En el caso de Windows, los programas más grandes pueden instalarse en /aux.

Con 4GB de swap es suficiente si no se va a usar la hibernación, solo la suspensión.

Un problema que surge aquí es si la partición EFI de 100MB es suficiente. Sin embargo, todos los intentos de crear una partición EFI desde Linux o Windows han provocado que la instalación de Windows falle.

**NOTA**: Esto es lo que ha ocupado tras instalación (unos 38M):
```
/dev/nvme0n1p1                96M    38M   59M  40% /boot/efi
```

# Paso 4. Determinar datos de la instalación

Antes de seguir, hay que tener claros algunos datos que nos va a pedir la instalación.

- **Nombre de host**: loquesea.local
- **Nombre completo de usuario**: Don Pasota
- **Nombre de usuario**: pasota
- **Contraseña de usuario**: ********
- **Contraseña de root**: ********
- **Contraseña de desencriptación**: ******** (20 o más caracteres, números, letras y signos)

# Paso 5. Crear el pendrive de instalación

Consultar los siguientes artículos:
- [Crear pendrive de Debian desde Windows](https://pasota666.github.io/cybergrimorio/#pendrive_debian_desde_windows.md)
- [Crear pendrive de Debian desde Debian](https://pasota666.github.io/cybergrimorio/#pendrive_debian_desde_debian.md)
- [Crear pendrive de Windows desde Windows](https://pasota666.github.io/cybergrimorio/#pendrive_windows_desde_windows.md)

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
- Introducir el pendrive de WINDOWS y arrancar la instalación.

# Paso 8. Instalar Windows

Windows se instala primero porque es mucho más puñetero que Linux a la hora de detectar particiones y ser compatible.

En el programa de instalación, borramos si es necesario todas las particiones que tenga el disco y creamos una de 75GB (76.800 MB).

Windows creará dos particiones primarias más:
- Partición de sistema de 100 MB
- Partición de recuperación de 655 MB (esta se puede borrar más adelante)

Instalamos Windows en la partición de 70GB.

**NOTA**: Intenté crear las particiones justas con fdisk, pero Windows fallaba. Windows necesita espacio libre para crear sus particiones de apoyo o la instalación fallará.

# Paso 9. Instalar Debian

Arrancamos ahora con el pendrive de Debian.

## Primera parte (idioma, red y usuarios)

Configuración básica del sistema:

- Elegir idioma, localización y teclado.
- Conexión a la red
    - enp2s0: tarjeta de red ethernet.
    - wlp2s0: tarjeta de red wireless.
- Usuarios y contraseñas.

## Segunda parte (particionado)

Si necesitamos particiones (aunque en UEFI no es necesario ya que admite más de 4 primarias) podemos borrar la que crea Windows de restauración.

Creamos:
- Partición /boot y marcarla como arrancable.
- Partición FAT32 /aux
- Volumen encriptado con el resto
    - swap
    - /
    
(Ver [instalación en portátil antiguo](https://pasota666.github.io/cybergrimorio/instalacion_debian_portatil_antiguo.md), es igual)

Con esto tenemos una partición /boot sin encriptar junto con el sistema linux encriptado. Esto puede ser vulnerable a determinados ataques en el caso de que tengan acceso físico a nuestro PC, por tanto se puede encriptar también la partición de arranque (ver [aquí](boot_crypt.md)).

**NOTA**: Los nombres de las particiones en un disco NVMe son nvme0n1p1, p2, p3...etc. El disco es /dev/nvme0n1.

# Finalizar instalación

Instalamos Grub en el disco principal, que detectará la partición /boot y podrá instalar sin problemas. Esta partición es crucial para el arranque.
