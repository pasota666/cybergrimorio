# Git y GitHub

# Introducción

Git es un sistema de control de versiones, básicamente lleva un control de los cambios que se efectuan en ficheros. Con Git es posible desarrollar aplicaciones entre varios colaboradores y cuyo código está subido en un repositorio de forma sencilla.

GitHub es una web que permite almacenar estos repositorios de código on-line.

# Instalación

```
# apt-get install git
```

# Definir usuario y email

Antes de usar git debemos definir nuestro usuario y correo:

```
$ git config --global user.name "usuario"
$ git config --global user.email "tu-email-real@ejemplo.com"
```

Comprobamos que los cambios se han realizado:

```
$ git config --list
$ git config user.name
$ git config user.email
```

# Como iniciar un repositorio con Git en GitHub

Básicamente, existen dos formas de iniciar un repositorio:

- Método 1: Creando el repositorio en local y luego subiéndolo a GitHub.
- Método 2: Crear el repositorio en GitHub y luego clonándolo en local (recomendado)

# Método 1: Crear el repositorio en local

Creamos el directorio e iniciamos git:

```
mkdir mi-proyecto
cd mi-proyecto
git init
```

Esto crea la carpeta ".git" con los datos de Git.

Hacemos el primer commit:

```
git add .
git commit -m "Primer commit"
```

Creamos un repositorio en GitHub y le damos un nombre, por ejemplo mi-proyecto. GitHub nos mostrará las instrucciones para conectar nuestro repositorio local a ese repositorio (una vez hayamos establecido el método de autenticación como se ve más adelante.)

```
git remote add origin https://github.com/tu-usuario/mi-proyecto.git
git branch -M main
git push -u origin main
```

# Método 2: Clonar el repositorio en local

Con este método, descargaremos el repositorio para poder trabajar con él, después subiremos los cambios. Es también el método que usaremos cuando queramos trabajar con un repositorio ya existente.

Lo primero es crear el repositorio en GitHub:
- Create New > New Repository

Después lo clonamos en local:

```
$ git clone <url_del_repositorio.git>
```

A continuación, usamos la autenticación mediante clave SSH.

# Autenticar mediante una clave SSH

Existen varias maneras de autenticarse en GitHub, quizás la más cómoda sea a través de una clave SSH que identificará tu equipo y no pedirá más login ni passwords una vez esté registrada en el proyecto.

## Generar clave SSH si no tienes
```
$ ssh-keygen -t ed25519 -C "tu-email@ejemplo.com"
```
## Añadir clave al agente SSH

Se puede dejar sin passphrase si el ordenador está bien protegido.
```
$ eval "$(ssh-agent -s)"
$ ssh-add ~/.ssh/id_ed25519
```
## Copiar clave pública y añadirla a GitHub
```
$ cat ~/.ssh/id_ed25519.pub
```
Copia lo que devuelve "cat" y pégalo en GitHub: Settings → Security > Deploy Keys

Dar permiso para hacer "push" y añadirlo.

## Cambiar remote a SSH
Entramos al directorio del proyecto (debe tener un subdirectorio .git) y ejecutamos:

```
$ git remote set-url origin git@github.com:tu-usuario/tu-repositorio.git
```

NOTA: Si estamos usando un directorio de red o compartido, Git dirá que no es un directorio seguro, pero podemos saltar esa protección haciendo:

```
$ git config --global --add safe.directory /aux/Cutresoft/cybergrimorio

```

## Verificar

```
$ git remote -v
```

# Comandos básicos para subir el código al repositorio

Básicamente, para usar git desde línea de comandos, debemos hacer lo siguiente:

```
$ git add .
$ git commit -m "Mensaje del commit"
$ git push origin main
```

El comando "add ." añade todos los ficheros, candidatos para un "commit".
El comando "commit" guarda los cambios.
El comando "push" sube los ficheros modificados con el "commit" al repositorio de Github.

