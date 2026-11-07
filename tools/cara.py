"""Convierte la foto de un jugador en su cara de pixel art 32x32.
Uso: python3 tools/cara.py FOTO SALIDA.png CX CY ANCHO [VISTA_PREVIA.png] [SATURACION]
(CX, CY = centro de la cara en píxeles de la foto; ANCHO = lado del recorte; SATURACION por defecto 1.2)."""
import sys
from PIL import Image, ImageEnhance
src, out, cx, cy, w = sys.argv[1], sys.argv[2], *map(int, sys.argv[3:6])
im = Image.open(src).convert('RGB')
c = im.crop((cx - w // 2, cy - w // 2, cx + w // 2, cy + w // 2))
c = ImageEnhance.Contrast(c).enhance(1.25); c = ImageEnhance.Color(c).enhance(float(sys.argv[7]) if len(sys.argv) > 7 else 1.2); c = ImageEnhance.Brightness(c).enhance(1.08)
p = c.resize((32, 32), Image.LANCZOS).quantize(colors=20, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE).convert('RGB')
p.save(out)
if len(sys.argv) > 6: p.resize((128, 128), Image.NEAREST).save(sys.argv[6])
