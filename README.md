# Mariners Fútbol 16 bits · C.F. Barceloneta Sub 12 A

Videojuego de fútbol 7 en pixel art 16 bits del **C.F. Barceloneta Sub 12 A** (temporada 2026‑27).
Siempre juegas con el Barceloneta. Funciona en el navegador (ordenador y móvil) y se puede instalar como app.

## Modos
- **Partido libre**: eliges cualquier rival de la temporada.
- **Liga ACDEA 26/27**: los 10 equipos de la liga, 18 jornadas (ida y vuelta), clasificación, resultados de cada jornada y goleadores del Barceloneta. Incluye la clasificación real de la web.
- **Copa Mariners**: 8 equipos (Barceloneta + 7 rivales sorteados), cuartos, semis y final. Empate = tanda de penaltis.

Rivales: Ona Sant Adrià A y B, CD Monopol, PB Trinitat Vella, PB Barcino A, B y C, F.B. Montcada, CD Trinidad, y los de pretemporada U.E. Sants y Bon Pastor.

## Plantilla (convocados)
1 Marc · 3 Youssef · 4 Abdul · 6 Oliver · 7 David · 8 Dídac · 9 Oriol · 10 Alfons · 11 Kenan · 12 Juan (lesión) · 14 Pau · 15 Ciro · 17 Vicente · 19 Mathias · 22 Bruno (lesión)

Cada jugador tiene su foto oficial en pixel art (`caras/cara-15.png` a `cara-29.png`), hecha a partir de su foto con `tools/cara.py`. En `PLAYERS`, al principio de `game.js`, el campo `cara` indica el archivo y `fija:true` la marca como oficial.

## Controles
- Teclado: flechas/WASD mover · Z/J/Espacio chutar (mantén para potencia) o entrada · X/K pase o cambio de jugador · Shift sprint · Esc pausa
- Móvil: joystick a la izquierda, botones CHUTAR / PASE / SPRINT
- Mando: stick, A, X/B, Y, RB, Start

## Publicar
Activa GitHub Pages (Settings → Pages → Deploy from a branch → esta rama, carpeta `/`). En el iPhone: Compartir → Añadir a pantalla de inicio.

Para probarlo en local: `python3 -m http.server` y abre http://localhost:8000
