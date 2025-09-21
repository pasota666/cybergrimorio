# Configurar sudo

Testeado en Debian GNU/Linux 13 (Trixie)

**ATENCIÓN**: sudo es un programa para escalar privilegios, personalmente encuentro innecesario usarlo, si necesitas permisos de root, simplemente cambia al usuario root con "su -", ejecuta tus tareas y luego cierra la terminal.

Sin embargo, mucha gente usa "sudo" por comodidad, algunos dicen que incluso lo usan mal y que este no es el cometido de "sudo", otros incluso eliminan el password. Esto son prácticas de riesgo y no son recomendables, pero hay que reconocer que pueden ser cómodas.

# Paso 1. Instalación

Ejecutar:
```
$ apt-get update
$ apt-get install sudo
```

# Paso 2. Configuración

Para que el usuario tenga privilegios de administrador (root) lo metemos en el grupo "sudo":

```
# usermod -a -G sudo <usuario>
```

Hay que cerrar sesión o reiniciar el equipo para que los cambios tengan efecto.

# Paso 3 (Opcional y peligroso). Eliminar contraseña

Editamos el fichero "sudoers"

```
# nano /etc/sudoers
```

Añadimos la siguiente línea:

```
<usuario> ALL=(ALL) NOPASSWD: ALL
```

Donde "usuario" es el nombre de tu usuario.
