# Krokivo – veřejný web

Výzkumný projekt přístupných digitálních pomůcek pro speciální vzdělávání. Každý krok se počítá.

## Web
- `index.html` – úvod, kandidáti na vývoj a spolupráce se školami.
- `dotaznik/index.html` – 24 dobrovolných otázek a 6 volitelných polí pro shrnutí.
- `assets/survey.js` – navigace, průběh, lokální JSON/TXT export, JSON import, tisk; žádné síťové odesílání.
- `soukromi/index.html` – vysvětlení práce s odpověďmi a hostingu.
- `CNAME` – krokivo.eu (nastavení DNS/GitHub Pages spravuje vlastník).

Statický výzkumný prototyp bez účtů, analytiky, externích knihoven a databáze. Pro lokální kontrolu `python3 -m http.server 8000` a otevřít http://localhost:8000. Ověřit všech 6 sekcí, export/import, tisk, mobilní layout. Není zde centrální příjem odpovědí ani ověřený kontaktní e-mail. Nevkládat skutečné odpovědi nebo soukromou firemní dokumentaci do veřejného repozitáře.

## Laboratoř v0.1
- `laborator/index.html` – čtyři koncepty, nakupování jako interaktivní prototyp.
- `laborator/nakupovani/index.html` – výběr jednoho ze tří produktů, dvě obtížnosti, schematické mince CZK, přesná platba, nápověda, opakování. Fiktivní ceny, vlastní SVG ilustrace.
- `assets/lab.css`, `assets/shop.js` – responzivní rozhraní a lokální stav, bez přenosu a ukládání výsledků.
Při implementaci ověřeno 10 scénářů čisté platební funkce (správná částka, chybějící částka, přeplatek, kombinace, neplatné vstupy). Nejde o automatický browser test. Před pilotem ověřit Safari na iPadu, klávesnici, VoiceOver, mobilní layout, oba režimy, změnu zboží a chybné platby. Odborné posouzení pedagogem před použitím se žáky. Není zajištěna dostupnost offline po opuštění stránky.

## Laboratoř v0.2
- Vlastní zjednodušené ilustrace mincí 1, 2, 5, 10 a 20 Kč v assets/coins/. Barva, tvar a přibližné relativní rozměry podle parametrů ČNB: https://www.cnb.cz/cs/bankovky-a-mince/mince/. Nejsou fotografie ani přesné kopie. Nejsou použity fotografie ČNB ani Wikimedia. Nehmotné zobrazení mincí umožňuje § 14 vyhlášky 274/2011 Sb. (https://e-sbirka.gov.cz/sb/2011/274); práva ke konkrétním fotografiím je třeba ověřit odděleně.
- laborator/sebeobsluha/index.html – pět kroků mytí rukou, režim Učím se (podrobnosti viditelné) a Samostatně (volitelná nápověda), volitelný časovač 20 s, zpět, další krok, restart. Vlastní schematické ilustrace assets/hygiene/. Obsah vychází z https://www.cdc.gov/clean-hands/about/index.html (přístup 26. 11. 2026), zjednodušený pro prototyp, čeká pedagogické posouzení. Časovač není měření úspěchu ani podmínka pokračování. Žádné účty, ukládání ani síťová komunikace výsledků. Zkontrolovat ovládání na Safari/iPad, VoiceOver, oba režimy, odchod z kroku během časovače, návrat, restart. Není zajištěna plně offline dostupnost. 
