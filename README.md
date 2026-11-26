# Krokivo – veřejný web

Výzkumný projekt přístupných digitálních pomůcek pro speciální vzdělávání. Každý krok se počítá.

## Web
- `index.html` – úvod, kandidáti na vývoj a spolupráce se školami.
- `dotaznik/index.html` – 24 dobrovolných otázek a 6 volitelných polí pro shrnutí.
- `assets/survey.js` – navigace, průběh, lokální JSON/TXT export, JSON import, tisk; žádné síťové odesílání.
- `soukromi/index.html` – vysvětlení práce s odpověďmi a hostingu.
- `CNAME` – krokivo.eu (nastavení DNS/GitHub Pages spravuje vlastník).

Statický výzkumný prototyp bez účtů, analytiky, externích knihoven a databáze. Pro lokální kontrolu `python3 -m http.server 8000` a otevřít http://localhost:8000. Ověřit všech 6 sekcí, export/import, tisk, mobilní layout. Není zde centrální příjem odpovědí ani ověřený kontaktní e-mail. Nevkládat skutečné odpovědi nebo soukromou firemní dokumentaci do veřejného repozitáře.
