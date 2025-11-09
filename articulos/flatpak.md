# Flatpak y Flathub

**Flatpak**: sistema de distribución de software que permite instalar apps de forma aislada del resto del sistema con todas sus dependencias incluidas (usa una base común llamada FreeDesktop.)

**Flathub**: repositorio o tienda de apps Flatpak.

# Paso 1. Instalar Flatpak

```
$ sudo apt install flatpak
$ sudo apt install plasma-discover-backend-flatpak
```

# Paso 2. Añadir Flathub

```
$ flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo
```

# Paso 3. Reiniciar

Es necesario reiniciar para que los cambios tengan efecto.

# Paso 3. Instalar software

Si abrimos "Discover", veremos que se han añadido los repositorios de Flathub y ahora podemos instalar software desde esa fuente.