# Activar repositorios contrib y non-free

Testeado en Debian GNU/Linux 13 (Trixie)

# Paso 1. Editar archivo sources.list

Los repositorios "contrib" y "non-free" contienen software propietario (no libre) o que depende de software propietario. Aquí podemos encontrar los drivers de Nvidia, herramientas de virtualizacion, etc.

Editamos el archivo sources.list como root:

```
# nano /etc/apt/sources.list
```

Añadimos "contrib non-free" al final de cada línea. Ejemplo:

```
deb http://deb.debian.org/debian/ trixie main non-free-firmware contrib non-free
...

```

CTRL+O (guardar) y CTRL+X (salir)

# Paso 2. Actualizar repositorios

Actualizamos los repositorios:

```
# apt update
```

# Paso 3 (Opcional) Verificar el software libre que tenemos

Podemos usar la utilidad vrms (Virtual Richard Stallman) para saber que paquetes no libres tenemos en nuestro sistema:

```
# apt-get install vrms
$ vrms
```
