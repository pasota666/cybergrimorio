# Directorio bin local

Testeado en Debian GNU/Linux 13 (Trixie)

# Directorio personalizado para scripts

Es muy útil disponer de un directorio personalizado para nuestros scripts de shell.

En nuestro directorio personal, tenemos dos archivos de inicialización del shell:
- .bashrc
    - Se ejecuta cada vez que abres una terminal.
    - Se usa para aliases, funciones, prompt, variables específicas.
- .profile
    - Se ejecuta cada vez al iniciar sesión.
    - Se usa para variables de entorno como PATH.
    
Cuando abrimos una terminal en KDE, sólo se ejecuta bashrc, ya que profile se ha ejecutado cuando se inicia la sesión. Cuando hacemos un login en modo texto, se ejecutan ambos.

En .profile ya se incluye el directorio ~/bin en caso de existir:

```
# set PATH so it includes user's private bin if it exists
if [ -d "$HOME/bin" ] ; then
    PATH="$HOME/bin:$PATH"
fi
```

Por lo que simplemente, tenemos que crearlo y reiniciar para que los cambios tengan efecto:

```
$ cd
$ mkdir bin
$ sudo reboot
```
