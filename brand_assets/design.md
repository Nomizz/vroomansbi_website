# design.md — Vroomans BI

## Kleuren — dark mode (standaard)

```css
--black:        #080808   /* achtergrond primair */
--surface:      #111111   /* achtergrond secondair */
--white:        #F0EEE9   /* headlines en primaire tekst */
--grey:         #9A9A9A   /* body tekst */
--dim:          #3A3A3A   /* zwakke borders */
--accent:       #D42B45   /* Deep Coral — accent */
--accent-hover: #E8344A   /* hover state */
--accent-dark:  #A01E32   /* logo donkere variant */
--line:         #1E1E1E   /* borders en dividers */
--nav-bg:       rgba(8,8,8,0.96) /* nav achtergrond met blur */
```

## Kleuren — light mode `[data-theme="light"]`

```css
--black:   #F5F3EE
--surface: #ECEAE5
--white:   #0D0D0D
--grey:    #555555
--dim:     #BEBAB4
--line:    #DEDAD4
--nav-bg:  rgba(245,243,238,0.96)
/* --accent en --accent-dark ongewijzigd */
```

Thema opgeslagen in `localStorage('vbi-theme')`, gezet via `data-theme` op `<html>`.
Taal opgeslagen in `localStorage('vbi-lang')` (nl/en), gezet via `data-lang` op `<html>`.
Anti-flash inline script bovenaan `<head>` — altijd eerste script in document.

## Typografie

Font: **Inter** via Google Fonts — weights 300/400/500/600/700/800/900

| Gebruik | Weight | Size | Letter-spacing | Line-height |
|---|---|---|---|---|
| Hero headline | 800 | clamp(52px,8vw,110px) | -0.04em | 1.0 |
| Section headline | 800 | clamp(32px,4.5vw,54px) | -0.03em | 1.0 |
| Project titel | 800 | clamp(24px,2.8vw,42px) | -0.03em | 1.0 |
| Project subhead | 800 | 15px | -0.01em | — |
| Contact headline | 800 | clamp(44px,7vw,96px) | -0.04em | 0.96 |
| Body tekst (index) | 300 | 14–17px | — | 1.8–1.85 |
| Body tekst (projects) | 300 | 14px | — | 1.82 |
| Label / section tag | 600 | 11px | 0.12em + uppercase | — |
| Nav links | 400 | 12px | 0.08em + uppercase | — |
| Tool pills / proj-tags | 400 | 11px | 0.04em | — |

## Spacing

```
Sectie padding left/right:  60px desktop · 24px mobiel
Hero padding top/bottom:    110px · 90px
Standaard sectie:           90px top/bottom
Block head margin-bottom:   64px
Dienst row padding:         48px top/bottom
proj-text padding:          64px 52px 52px
proj-body column-gap:       36px
proj-header padding-bottom: 24px · margin-bottom: 36px
```

## Layout grids

```
Diensten rij:       grid-template-columns: 56px 1fr 360px
Contact:            grid-template-columns: 1fr 1fr
Sectoren:           display: flex · flex-wrap: wrap · min-width: 220px per item
Stack grid:         grid-template-columns: repeat(4, 1fr)
Project teasers:    grid-template-columns: repeat(4, 1fr)
Project secties:    grid-template-columns: 1fr 1fr (tekst + canvas)
```

## Pagina's

**index.html** — `min-height: 100dvh` per sectie, direction-aware scroll snap (8px drempel, 720ms easeInOutCubic, 150ms debounce). 7 navigatiedots links.

**projects.html** — `height: 100dvh; overflow: hidden` per sectie. 2-koloms grid: tekst links, canvas rechts. Tekst in `columns: 2; column-gap: 36px; column-fill: auto` (kolom 1 altijd voller). 4 navigatiedots links.

## Nav

**index.html:** links = nav-links (diensten, tools, AI, contact) · rechts = NL/EN toggle + theme toggle + logo
**projects.html:** links = ← Terug + separator + "Projecten" label · rechts = NL/EN toggle + theme toggle + logo
Geen `border-bottom` op nav. `backdrop-filter: blur(20px)`. `background: var(--nav-bg)`.

## Scroll dots

```css
.scroll-dots { position: fixed; left: 22px; top: 50%; transform: translateY(-50%); }
.scroll-dot  { width: 6px; height: 6px; border-radius: 50%; background: var(--dim); }
.scroll-dot.active { background: var(--accent); transform: scale(1.5); }
```

## Canvas animaties (projects.html)

| Canvas | Project | Beschrijving | sizeCanvas |
|---|---|---|---|
| canvas-1 | One Job to Rule Them All | Orchestratie node graph, parallelle flows, milestone markers | 82% |
| canvas-2 | Snapshot Semantic Model | Y-2/Y-1/Y lijngrafiek, bewegende snapshot cursor | 82% |
| canvas-3 | VVT Datamotor | 3 klanten, elk fin/pers/prod → bundelpunt → motor → klant | 94% |
| canvas-4 | Polaris | Sterrenhemel + pulserende Polaris ster + netwerk nodes | 96% |

Alle canvassen: theme-aware via `isLight()`, accent `rgba(212,43,69,…)`.

## Borders & radius

- Border: `1px solid var(--line)` overal
- Border-radius: **3px** overal — nooit meer
- `proj-header`: border-bottom aanwezig
- Geen box-shadows

## Componenten

**Project teaser card (pt-card):**
`pt-num` 11px/700/dim · `pt-title` clamp(18–24px)/800/-0.03em/white · `pt-body` 13px/300/grey · `pt-link` 12px/600/uppercase/accent
Grid: `repeat(4, 1fr)`, border-right tussen cards.

**Project sectie (proj-section):**
`height: 100dvh; overflow: hidden; grid-template-columns: 1fr 1fr`
`proj-header`: num + title + border-bottom
`proj-body`: `columns: 2; column-fill: auto`
`proj-visual`: flex center, canvas gecentreerd in rechterhelft

**Lang/theme toggles:**
`border: 1px solid var(--dim)`, border-radius 3px, 30px hoog, Inter 11px/600

## Logo SVG — viewBox 0 0 36 36

4 blokken 16×16px met `rx="3"`, gap 4px:
- Links-boven:  `fill="#D42B45" opacity="0.9"`
- Rechts-boven: `fill="#D42B45" opacity="0.3"`
- Links-onder:  `fill="#D42B45" opacity="0.3"`
- Rechts-onder: `fill="#A01E32" opacity="0.9"`
- Verbindingslijnen: stroke="#D42B45" stroke-width="1.5"

## Responsive

```css
@media (max-width: 860px) {
  nav → padding 18px 24px
  index nav-links → display: none
  alle secties → padding left/right: 24px
  diensten → grid 40px 1fr
  contact → 1fr
  project-teasers → 1fr
  proj-section → grid 1fr · height auto · overflow visible
  proj-body → columns: 1
  scroll-dots → display: none
}
```

## Stijlinspiratie

Webflow.com + Youwe Agency — editorial dark, Inter 800, grote typografie, veel witruimte, horizontale lijnen als structuur.
