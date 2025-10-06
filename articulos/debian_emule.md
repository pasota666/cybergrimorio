# Emule/Torrent/Soulseek

Testeado en Debian GNU/Linux 13 (Trixie)

# Instalación

```
$ sudo apt-get install qbittorrent nicotine
```

# Nicotine

Cambiar la carpeta de descargas:
- Opciones > Descargas > Carpetas

# qBitTorrent

Cambiar la carpeta de descargas:
- Preferencias > Descargas > Ubicación de Guardado

## Abrir enlaces magnets en Firefox

- Ve a about:config
- Busca: network.protocol-handler.expose.magnet
- Cambia su valor a false
- Pincha en enlace magnet
- Selecciona /usr/bin/qbittorrent para abrir siempre enlaces magnet
