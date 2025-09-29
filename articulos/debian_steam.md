# Steam

Testeado en Debian GNU/Linux 13 (Trixie)

# Instalación

```
$ apt-get install steam nvidia-driver-libs:i386 vulkan-tools:i386
```

# Mover el directorio a otra unidad con más espacio

```
$ mkdir /aux/SteamLinux
$ mv ~/.steam /aux/SteamLinux/steam
$ ln -s /aux/SteamLinux/steam ~/.steam
```
