# Wine

Testeado en Debian GNU/Linux 13 (Trixie)

Wine es un programa para emular programas en Windows.

# Instalación

Ejecutamos lo siguiente:
```
$ sudo dpkg --add-architecture i386
$ sudo apt update
$ sudo apt install wine wine32 wine64
$ sudo apt install winetricks
```

# Winetricks

Con Winetricks podemos instalar algunos frameworks y runtimes habituales de los programas:

```
$ winetricks corefonts vcrun2019 vcrun2022 dotnet48
$ winetricks d3dx9 d3dx10 d3dx11_42 d3dx11_43 dxvk
```

# Unidad C

La unidad C: se crea en ~/.wine/drive_c

Podemos moverla a otros sitio donde tengamos más espacio:

```
mv ~/.wine/drive_c /aux/drive_c/
ln -s /aux/drive_c ~/.wine/drive_c
```

# Configuración

```
$ winecfg
```

# Ejecutar o instalar un programa

Simplemente ejecutamos:

```
$ wine <programa.exe>
```

# Desinstalar un programa

Buscar el archivo UNINST00.EXE o similar.
