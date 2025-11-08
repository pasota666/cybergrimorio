# yt-dlp

El programa **yt-dlp** permite bajar vídeos o música de Youtube.

## Paso 1. Instalación

```
sudo apt update
sudo apt install yt-dlp -y
```

## Paso 2. Bajar música

```
yt-dlp -x --audio-format mp3 https://www.youtube.com/watch?v=XXXXXXXXXXX
```

## Paso 3. Bajar vídeos

Descargar un vídeo:
```
yt-dlp https://www.youtube.com/watch?v=XXXXXXXXXXX
```

Descargar toda una lista de reproducción
```
yt-dlp -i -o "%(playlist_index)s - %(title)s.%(ext)s" URL_DE_LA_LISTA
```

Mostrar calidades disponibles:
```
yt-dlp -F URL
```

Bajar con calidad personalizada:
```
yt-dlp -f <cod_video>+<cod_audio> URL
yt-dlp -f 137+140 URL
```