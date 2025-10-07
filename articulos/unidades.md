# Unidades de información (GB y GiB)

## El bit

La unidad básica en informática es el bit, que se utiliza para almacenar información. 

Es una unidad binaria, lo que significa que representa un valor que puede ser 0 o 1. Esto introduce peculiaridades distintas a otras unidades de medida (como metros, kilogramos, etc.), ya que con n bits tenemos 2^n combinaciones posibles. En informática, el "espacio" se refiere precisamente a este número de combinaciones, que permite almacenar información. Estos 0 y 1 representan números que posteriormente serán interpretados como cadenas de texto, caracteres, código, o cualquier tipo de datos.

Por ejemplo, con 2 bits tenemos 2² = 4 combinaciones:
- 00
- 01
- 10
- 11

## Los bytes

Un byte es una unidad compuesta por 8 bits.

1 byte = 8 bits.

Esto permite 2^8 = 256 combinaciones diferentes, suficiente para representar caracteres básicos, números y otros símbolos.

## El direccionamiento y la confusión de unidades

Pronto los bytes se quedaron pequeños para medir capacidades de almacenamiento, dando lugar a unidades mayores como Kilobytes (KB).

En teoría, siguiendo el sistema métrico decimal, 1 KB debería equivaler a 1000 bytes. Sin embargo, debido al direccionamiento de memoria en los computadores (que funciona de forma binaria), se adoptó que 1 KB correspondiera a 1024 bytes (2^10).

Esta misma lógica se extendió a unidades mayores:
- Mega Byte (MB) = 1024 KB
- Giga Byte (GB) = 1024 MB
- Tera Byte (TB) = 1024 GB

El problema es que conforme aumentamos la unidad, la discrepancia entre el sistema decimal y el binario se hace más significativa:

- 8 bits = 1 Byte
- 1024 Bytes = 1 KB
- 1024 KB = 1 MB = 1.048.576 Bytes
- 1024 MB = 1 GB = 1.073.741.824 Bytes

## Problemas de estandarización

Dado que en el sistema métrico internacional "kilo" significa mil (10³), "mega" un millón (10⁶), etc., algunos fabricantes comenzaron a utilizar estas definiciones decimales para especificar capacidades de almacenamiento. Por ejemplo, un disco de 1 GB podía ser comercializado como 1.000.000.000 bytes en lugar de 1.073.741.824 bytes.

Como los sistemas operativos empleaban tradicionalmente el sistema binario, cuando los usuarios verificaban la capacidad de almacenamiento desde sus computadoras, esta aparecía como menor a la anunciada (además de considerar el espacio ocupado por sectores reservados y pérdidas por formateo).

## La solución: estándar IEC

Para resolver esta confusión, la Comisión Electrotécnica Internacional (IEC) estableció en 1998 dos sistemas de unidades diferenciados:

- **Sistema decimal (métrico)**: KB, MB, GB, TB (basados en potencias de 10)
- **Sistema binario**: KiB, MiB, GiB, TiB (basados en potencias de 2)

## Situación actual

El problema persiste porque muchos programas y sistemas continúan utilizando GB para referirse a GiB, mientras que otros aplican correctamente las definiciones. Por ejemplo:
- El instalador de Debian utiliza el sistema métrico decimal
- Herramientas como fdisk emplean el sistema tradicional pero no lo expresan como GiB

Por ello, es importante comprender cómo cada programa interpreta las cantidades de almacenamiento.

## Tabla comparativa de unidades de almacenamiento

| Unidad (Sistema Binario) | Equivalente en bytes | Equivalente en unidades inferiores | Unidad (Sistema Decimal) | Equivalente en bytes | Diferencia porcentual |
|--------------------------|----------------------|-----------------------------------|--------------------------|----------------------|----------------------|
| 1 KiB (Kibibyte) | 1.024 bytes | 2^10 bytes | 1 KB (Kilobyte) | 1.000 bytes | 2,40% mayor |
| 1 MiB (Mebibyte) | 1.048.576 bytes | 1.024 KiB | 1 MB (Megabyte) | 1.000.000 bytes | 4,86% mayor |
| 1 GiB (Gibibyte) | 1.073.741.824 bytes | 1.024 MiB | 1 GB (Gigabyte) | 1.000.000.000 bytes | 7,37% mayor |
| 1 TiB (Tebibyte) | 1.099.511.627.776 bytes | 1.024 GiB | 1 TB (Terabyte) | 1.000.000.000.000 bytes | 9,95% mayor |
| 1 PiB (Pebibyte) | 1.125.899.906.842.624 bytes | 1.024 TiB | 1 PB (Petabyte) | 1.000.000.000.000.000 bytes | 12,59% mayor |

### Fórmulas de conversión útiles:

- **De sistema binario a decimal**: 
  `Unidades decimales = Unidades binarias × (1024/1000)^n` (donde n es el nivel de la unidad)

- **De sistema decimal a binario**: 
  `Unidades binarias = Unidades decimales × (1000/1024)^n`

### Ejemplo práctico:
Un disco duro de 1 TB (decimal) tendrá aproximadamente:
- 1.000.000.000.000 bytes
- 931,32 GiB (binario)
- Lo que representa una "pérdida" aparente de aproximadamente 68,68 GB desde la perspectiva del sistema operativo

Esta tabla y las fórmulas proporcionadas son esenciales para comprender las capacidades reales de almacenamiento y realizar comparaciones precisas entre diferentes dispositivos y sistemas.
