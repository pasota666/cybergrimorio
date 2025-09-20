# Instalar controladores propietarios de NVIDIA

Testeado en Debian GNU/Linux 13 (Trixie)

## Paso 1. Activar repositorios "contrib" y "non-free"

Seguir los pasos [aquí]( https://pasota666.github.io/cybergrimorio/)

## Paso 2. Detectar nuestra tarjeta

Instalamos nvidia-detect y lo ejecutarmos:

```
# apt-get install nvidia-detect
$ nvidia-detect
```

El programa nos dirá el modelo de la tarjeta y si recomienda instalar los drivers.

## Paso 3. Instalar herramientas de compilación

Los "drivers" o controladores se instalan como un "módulo", que es una pieza de software que carga el "kernel" o núcleo del sistema. Por tanto debemos compilar el módulo a partir del código. Para ello, instalamos los siguientes paquetes:

- **build-essential**: Meta-paquete con los compiladores y librerías esenciales como gcc, g++, make, libc-dev, etc.
- **linux-headers**: Encabezados del kernel, contienen definiciones de funciones y estructuras de datos necesarios para compilar módulos.
- **dkms**: Framework que recompila los módulos de terceros automáticamente si se actualiza el kernel.

```
# apt-get install build-essential linux-headers-$(uname -r) dkms
```

## Paso 4. Instalar los drivers

Ahora que tenemos el entorno de compilación, podemos instalar los drivers. Durante la compilación nos pedirá sustituir el driver anterior (Noveau), simplemente pulsamos ENTER.

Se han instalado algunos paquetes extra para un mejor funcionamiento con Wayland.

```
# apt-get install nvidia-driver nvidia-settings nvidia-driver-libs nvidia-vulkan-common
```

## Paso 5. Reiniciar

Reiniciamos el sistema:
```
# reboot
```

Intentamos entrar con Wayland, si falla probamos X11.
