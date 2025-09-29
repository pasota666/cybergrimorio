# Kate

Testeado en Debian GNU/Linux 13 (Trixie)

Kate es un editor de textos/IDE desarrollado por KDE y similar a VSCode. Viene instalado en KDE por defecto.

# Servidores LSP

LSP significa Language Server Protocol. El IDE se conecta a un servidor y obtiene la información relativa a ese lenguaje como autocompletado, detección de errores en tiempo real y navegación entre archivos, etc.

Kate usa LSP, pero por error en Debian no vienen instalados los ejecutables de cada lenguaje. Por ejemplo, si creamos un lenguaje HTML, tendremos errores de este tipo:

```
Error: [18:35:40 ￼ Cliente LSP Advertencia] No se ha podido encontrar el binario del servidor: vscode-html-languageserver
Compruebe su PATH para el binario
Consulte también https://github.com/Microsoft/vscode/tree/main/extensions/html-language-features/server para instalación o detalles
```

## HTML, CSS, JSON

Instalamos nodejs y vemos si se han extraido correctamente los ejecutables en /usr/local:

```
$ sudo apt install nodejs npm
$ sudo npm install -g vscode-langservers-extracted
$ cd /usr/local
```

Por defecto, Kate busca ejecutables del tipo "*-languageserver" pero vemos que el paquete los llama "*-language-server" por lo que cambiamos el nombre de los siguientes ejecutables:

```
$ mv vscode-css-language-server vscode-css-languageserver
$ mv vscode-html-language-server vscode-html-languageserver
$ mv vscode-json-language-server vscode-json-languageserver
```

Con esto, al iniciar Kate, LSP debería funcionar.

## Markdown

Descargar el archivo "marksman-linux-x64" de [https://github.com/artempyanykh/marksman/releases/](https://github.com/artempyanykh/marksman/releases/)

Moverlo a /usr/local/bin y renombrarlo como marksman:
```
$ chmod +x marksman-linux-x64
$ mv marksman-linux-x64 /usr/local/bin/marksman
```

## JavaScript

Ejecutamos:

```
sudo npm install -g typescript typescript-language-server
```

# Guardar sesión

Para hacer que Kate mantenga los documentos abiertos entre sesión y sesión debemos ir a:

- Sesiones > Guardar Sesión
- Preferencias > Configurar Kate
- Sesión > Cargar la última sesión utilizada

# Auto-formateo de código

El auto-formateo de código es muy útil para reorganizar nuestro código (tabulaciones, sangrados, espacios, etc) de forma automática con una combinación de teclas.

Ejecutamos:

```
$ sudo npm install -g prettier
```

Después vamos a:
- Preferencias > Configurar Kate > Complementos > Formateo
- Luego en Preferencias > Configurar los atajos de teclado > Buscar "formatear" y ponerlo por ejemplo como CTRL+ALT+F.
