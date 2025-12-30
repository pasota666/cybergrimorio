# Git y GitHub

# Introducción

Git es un sistema de control de versiones, básicamente lleva un control de los cambios que se efectuan en ficheros. Con Git es posible desarrollar aplicaciones entre varios colaboradores y cuyo código está subido en un repositorio de forma sencilla.

GitHub es una web que permite almacenar estos repositorios de código on-line.

# Paso 1. Instalación

Instalamos git:

```bash
sudo apt-get install git
```

# Paso 2. Definir usuario y email

Antes de usar git debemos definir nuestro usuario y correo:

```bash
git config --global user.name "usuario"
git config --global user.email "tu-email-real@ejemplo.com"
```

Comprobamos que los cambios se han realizado:

```bash
git config --list
git config user.name
git config user.email
```

# Paso 3. Autenticar mediante una clave SSH

Existen varias maneras de autenticarse en GitHub, quizás la más cómoda sea a través de una clave SSH que identificará tu equipo en GitHub y no pedirá login ni passwords una vez hayas clonado el repositorio.

## Paso 3.1. Generar clave SSH

Generamos una clave SSH (se puede dejar con la passphrase vacía si el ordenador está bien protegido):

```bash
ssh-keygen -t ed25519 -C "tu-email@ejemplo.com"
```

## Paso 3.2. Añadir clave al agente SSH

Añadimos la clave:

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

## Paso 3.3. Copiar clave pública y añadirla a GitHub

Si queremos añadir el usuario a un solo proyecto

Imprimimos la clave pública en la consola:

```bash
cat ~/.ssh/id_ed25519.pub
```

Copia lo que devuelve "cat" y pégalo en la sección SSH de tu perfil: [https://github.com/settings/keys](https://github.com/settings/keys)

Ahora, cualquier "push" que venga desde este equipo estará permitido.

NOTA: Esto sirve a nivel general para cualquiera de nuestros repositorios. Si lo que queremos es añadir un solo usuario, lo mejor es hacerlo desde las opciones del repositorio en GitHub.

# Comandos básicos para subir el código al repositorio

Básicamente, para usar git desde línea de comandos, debemos hacer lo siguiente:

```bash
git add .
git commit -m "Mensaje del commit"
git push origin main
```

El comando "add ." añade todos los ficheros, candidatos para un "commit".
El comando "commit" guarda los cambios.
El comando "push" sube los ficheros modificados con el "commit" al repositorio de Github.

**NOTA**: Si usamos VSCode u otro entorno no es necesario hacer esto, ya que suelen llevar integrado Git.

# Como iniciar un repositorio con Git en GitHub

Básicamente, existen dos formas de iniciar un repositorio:

- **Método 1**: Creando el repositorio en local y luego subiéndolo a GitHub.
- **Método 2**: Crear el repositorio en GitHub y luego clonándolo en local (recomendado, más sencillo).

## Método 1: Crear el repositorio en local

Creamos el directorio e iniciamos git:

```bash
mkdir mi-proyecto
cd mi-proyecto
git init
```

Esto crea la carpeta ".git" con los datos de Git.

Hacemos el primer commit:

```bash
git add .
git commit -m "Primer commit"
```

Creamos un repositorio en GitHub y le damos un nombre, por ejemplo mi-proyecto. GitHub nos mostrará las instrucciones para conectar nuestro repositorio local a ese repositorio (una vez hayamos establecido el método de autenticación como se ve más adelante.)

```bash
git remote set-url origin git@github.com:tu-usuario/tu-repositorio.git
git branch -M main
git push -u origin main
```

Verificamos con:

```bash
git remote -v
```

**NOTA**: Si estamos usando un directorio de red o compartido, Git puede decir que no es un directorio seguro, pero podemos saltar esa protección haciendo:

```bash
git config --global --add safe.directory /ruta/al/directorio

```

## Método 2: Clonar el repositorio en local

Con este método, descargaremos el repositorio para poder trabajar con él, después subiremos los cambios. Es también el método que usaremos cuando queramos trabajar con un repositorio ya existente.

Lo primero es crear el repositorio en GitHub:
- Create New > New Repository

Después lo clonamos en local:

```bash
git clone url_del_repositorio.git
```

Aquí no hay que hacer nada más, si hemos configurado SSH ya podemos hacer commits y pulls.