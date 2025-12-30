# OneDrive

Testeado en Ubuntu 24.04 LTS

# Paso 1. Instalación

ATENCIÓN: No instalar desde repositorios (desfasado)

```bash
wget -qO - https://download.opensuse.org/repositories/home:/npreining:/debian-ubuntu-onedrive/Debian_13/Release.key | gpg --dearmor | sudo tee /usr/share/keyrings/obs-onedrive.gpg > /dev/null

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/obs-onedrive.gpg] https://download.opensuse.org/repositories/home:/npreining:/debian-ubuntu-onedrive/Debian_13/ ./" | sudo tee /etc/apt/sources.list.d/onedrive.list

sudo apt-get update

sudo apt install --no-install-recommends --no-install-suggests onedrive
```

# Paso 2. Autenticar

Ejecutamos y seguimos las instrucciones:

```bash
onedrive
```

Aquí debemos copiar la URL, abrirla en el navegador y hacer login con nuestra cuenta de MS. Esto nos redireccionará a una URL que debemos copiar de vuelta y pegar en la consola.

# Paso 3. Sincronizar

Para sincronizar manualmente, hacemos:

```bash
onedrive --synchronize --verbose
```

# Paso 4. Activar el servicio

Si activamos el servicio, la sincronización será automática cada vez que cambiemos un fichero.

```bash
systemctl --user enable onedrive
systemctl --user start onedrive
```