# Thunderbird

Testeado en Ubuntu 24.04 LTS

# Paso 1. Instalación

Instalamos desde "Centro de aplicaciones"

# Paso 2. Iniciamos el programa

Iniciamos el programa para que cree los perfiles por defecto.

# Paso 3. Copiamos el perfil anterior

La ruta de los perfiles es:

```bash
~/snap/thunderbird/common/.thunderbird/
```

En profiles.ini modificamos el perfil:

```bash
[Profile0]
Name=default
IsRelative=1
Path=<nombre_carpeta_perfil>
Default=1

[General]
StartWithLastProfile=1
Version=2
```

**NOTA**: Si Thunderbird no puede abrir el perfil por haber sido importado de una versión posterior se puede intentar iniciar Thunderbird de la siguiente manera:

```bash
$ thunderbird -p --allow-downgrade
```

# Paso 4. Abrir el programa

Abrimos Thunderbird y dejamos que sincronize los correos.