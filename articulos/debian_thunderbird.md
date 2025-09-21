# Thunderbird

Testeado en Debian GNU/Linux 13 (Trixie)

Thunderbird es el programa de correo de la familia Mozilla.

# Paso 1. Instalación

Si instalamos desde «Discover» no se instalará el paquete de idioma, así que mejor lo instalamos desde línea de comandos:

```
# apt-get install thunderbird thunderbird-l10n-es-es
```

# Paso 2. Abrir el programa

Esto generará una carpeta «.thunderbird» en nuestro directorio personal.

# Paso 3. Copiar el perfil antiguo

Si queremos ahorrarnos el paso de configurar las cuentas, podemos copiar el perfil antiguo de otra instalación de Thunderbird:

- En Debian, se encuentra en la carpeta «~/.thunderbird»
- En Windows, se encuentra en «%APPDATA%/Thunderbird/Profiles»

# Paso 4. Editar el archivo "profiles.ini"

Dejamos así el archivo, sustituyendo con el nombre de la carpeta de nuestro perfil:

```
[Profile0]
Name=default-release
IsRelative=1
Path=<nombre_carpeta_perfil>

[General]
StartWithLastProfile=1
Version=2

[Install510519365F31891C]
Default=<nombre_carpeta_perfil>
Locked=1
```
Podemos borrar el resto de perfiles que Thunderbird creó al inicio.

# Paso 5 (Opcional). Arranque downgrade

Si el perfil lo copiamos de una versión posterior a la que tenemos instalada, algo común si lo pasamos de Windows a Debian, ya que este último usa versiones más antiguas, entonces Thunderbird lanzará un mensaje de error del tipo «A newer version of Thunderbird may have made changes to your profile which are no longer compatible with this older version…«

Para solucionar esto, debemos abrir Thunderbird con el siguiente comando:

```
$ thunderbird -p --allow-downgrade
```

Esto permitirá importar el perfil. Una vez abierto, lo dejamos unos minutos para que conecte con nuestras y cuentas y después cerramos. Esto es solo necesario hacerlo una vez, ahora ya podremos iniciar Thunderbird normalmente.
