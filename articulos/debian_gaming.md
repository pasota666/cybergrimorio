apt-get install lutris

# En Debian
sudo apt install flatpak

# Añadir el repositorio Flathub (imprescindible)
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo

# Reiniciar la sesión o hacer:
sudo systemctl reboot

# Instalar Gamescope
flatpak install flathub org.freedesktop.Platform.VulkanLayer.gamescope
flatpak install gamescope

# Para ver todos los paquetes gamescope disponibles:
flatpak search gamescope

flatpak list

Nombre                                                                                ID de aplicación                                      Versión        Rama          Instalación
gamescope (DEPRECATED: install org.freedesktop.Platform.VulkanLayer.gamescope)        com.valvesoftware.Steam.Utility.gamescope             3.11.51        stable        system
gamescope                                                                             org.freedesktop.Platform.VulkanLayer.gamescope        3.16.17        25.08         system

flatpak run com.valvesoftware.Steam.Utility.gamescope --help
flatpak org.freedesktop.Platform.VulkanLayer.gamescope --help

ELIMINAR ESTAS INSTALACIONES DE FLATPAK Y LUTRIS


https://askubuntu.com/questions/1503686/how-can-i-install-gamescope-on-ubuntu-23-10
