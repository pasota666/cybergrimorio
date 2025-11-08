# OneDrive

# Paso 1. Instalación

ATENCIÓN: No instalar desde repositorios (desfasado)

```
$ wget -qO - https://download.opensuse.org/repositories/home:/npreining:/debian-ubuntu-onedrive/Debian_13/Release.key | gpg --dearmor | sudo tee /usr/share/keyrings/obs-onedrive.gpg > /dev/null
$ echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/obs-onedrive.gpg] https://download.opensuse.org/repositories/home:/npreining:/debian-ubuntu-onedrive/Debian_13/ ./" | sudo tee /etc/apt/sources.list.d/onedrive.list
$ sudo apt-get update
$ sudo apt install --no-install-recommends --no-install-suggests onedrive
```

# Paso 2. Autenticar

```
$ onedrive
```

Aquí abrirá el navegador y debemos entrar en nuestra cuenta MS.

# Paso 3. Sincronizar

Para sincronizar manualmente, hacemos:

```
onedrive --synchronize --verbose
```

# Paso 4. Activar el servicio

Si activamos el servicio, la sincronización será automática cada vez que cambiemos un fichero.

```
$ systemctl --user enable onedrive
$ systemctl --user start onedrive
```