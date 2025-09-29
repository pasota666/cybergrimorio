# DosBox

Testeado en Debian GNU/Linux 13 (Trixie)

Con DosBox podemos emular viejos juegos de MS-DOS.

# Instalación

```
$ sudo apt-get install dosbox
```

# Configuración

Hacemos una copia de seguridad y editamos el fichero:

```
$ cd .dosbox
$ cp dosbox-0.74-3.conf dosbox-0.74-3.conf.bak
$ nano 
```

Añadimos al final:

```
keyb sp
mount c /aux/DOS
c:
```

# Teclas

**NOTA**: Desactivar en el panel de control de KDE los atajos conflictivos.

- F9: Salir
- F10: Liberar ratón
- F11: Reducir ciclos CPU
- F11: Aumentar ciclos CPU
