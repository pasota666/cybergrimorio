# Instalación del cliente Dropbox

Testeado en Debian GNU/Linux 13 (Trixie)

Testeado en KDE.

# Paso 1. Instalar dependencias

```
$ apt-get install python3-gpg gir1.2-graphene-1.0 gir1.2-gtk-4.0 libayatana-appindicator3-1
```

# Paso 2. Instalar paquete

Descargar el paquete .deb más actual de la web de Dropbox e instalar. El segundo comando es para asegurarnos de que no se queda ninguna dependencia sin cumplir (si hemos instalado las anteriores no debería haber ninguna más)

```
$ sudo dpkg -i dropbox_2025.05.20_amd64.deb
$ apt-get install -f
```

# Paso 3. Ejecutar Dropbox

Buscar Dropbox en el menú y ejecutarlo, esto iniciará la instalación.
