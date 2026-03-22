# design.md — Vroomans BI

## Kleuren

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
```

## Typografie

Font: **Inter** via Google Fonts — weights 300/400/500/600/700/800/900
Body: `font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased`

| Gebruik | Weight | Size | Letter-spacing | Line-height |
|---|---|---|---|---|
| Hero headline | 800 | clamp(52px,8vw,110px) | -0.04em | 1.0 |
| Section headline | 800 | clamp(32px,4.5vw,54px) | -0.03em | 1.0 |
| Service naam | 800 | clamp(22px,2.8vw,36px) | -0.03em | 1.05 |
| Contact headline | 800 | clamp(44px,7vw,96px) | -0.04em | 0.96 |
| Page hero h1 | 800 | clamp(52px,8vw,110px) | -0.04em | 1.0 |
| Body tekst | 300 | 14–17px | — | 1.8–1.85 |
| Label / section tag | 600 | 11px | 0.12em + uppercase | — |
| Nav links | 400 | 12px | 0.08em + uppercase | — |
| Tool pills | 400 | 11px | 0.04em | — |

Regels: negatieve letter-spacing alleen op headlines ≥ 20px. `strong` in body: weight 500, kleur `--white`.

## Spacing

```
Sectie padding left/right:  60px desktop · 24px mobiel
Hero padding top/bottom:    110px · 90px
Standaard sectie:           90px top/bottom
Block head margin-bottom:   64px
Dienst row padding:         48px top/bottom
Gap in dienst body:         18px
```

## Layout grids

```
Diensten rij:   grid-template-columns: 56px 1fr 360px
Contact:        grid-template-columns: 1fr 1fr
Sectoren:       display: flex · flex-wrap: wrap · min-width: 220px per item
Stack grid:     grid-template-columns: repeat(4, 1fr)
```

## Borders & radius

- Border: `1px solid var(--line)` overal
- Border-radius: **3px** overal — nooit meer
- Geen box-shadows, gradients of glow-effecten
- Geen animaties behalve: marquee (30s linear) en button hover (translateY -2px)

## Componenten

**Nav:** sticky, `backdrop-filter: blur(20px)`, `background: rgba(8,8,8,0.96)`.
Logo: Inter 800, 15px, -0.03em. "Vroomans" in `--white`, "BI" in `--accent`.
Nav links: uppercase, 12px, 0.08em. CTA: outline button → mail-knop.

**Section tag:** 11px/600/uppercase/accent + streepje via `::before` (24px lijn in accent). Margin-bottom 32px.

**Block head:** label links (11px/grey/uppercase) + grote headline rechts. Border-bottom als scheiding, margin-bottom 64px.

**Marquee:** border-bottom, padding 14px. Items 2× herhalen, `animation: mq 30s linear infinite`. `mq-dot` in accent.

**Dienst rij:** 3-koloms grid. Nummer in `--dim`/700/11px. Naam in `--white`/800. Body: beschrijving 300/14px + tool pills onderaan.

**Tool pills:** `border: 1px solid var(--line)`, border-radius 2px, 11px/400, padding 4px 11px.

**Sectoren blokken:** flex items, `background: --black`, hover `--surface`, naam in `--white`/800, `&` in `--accent`.

**Quote/highlight blok:** `border-left: 2px solid var(--accent)`, `background: rgba(212,43,69,0.05)`, padding 20px 24px.

**Primary button:** `background: var(--accent)`, `color: var(--white)`, padding 14px 32px, border-radius 3px, 13px/600/uppercase/0.04em.

**Email CTA (contact):** `background: var(--accent)`, 16px/700, padding 16px 36px, hover: translateY -2px.

**Ghost button:** transparent, `border: 1px solid var(--dim)`, hover: border + color naar accent.

## Logo SVG

4 blokken (2×2), verbonden door lijnen:
- Links-boven: `fill="#D42B45" opacity="0.9"`
- Rechts-boven: `fill="#D42B45" opacity="0.3"`
- Links-onder: `fill="#D42B45" opacity="0.3"`
- Rechts-onder: `fill="#A01E32" opacity="0.9"`
- Verbindingslijnen: stroke="#D42B45" (boven) en stroke="#A01E32" (onder)
- Alle rects: `rx="3"`, viewBox `0 0 36 36`

## Responsive

```css
@media (max-width: 860px) {
  /* Padding */
  nav → 18px 24px · nav-links → display: none
  alle secties → padding-left/right: 24px

  /* Grids */
  diensten rij → grid-template-columns: 40px 1fr · d-body: grid-column 2
  contact grid → 1fr
  stack grid → 1fr 1fr

  /* Overige */
  block-head → flex-direction: column
  sec-item → min-width: 100%
}
```

## Stijlinspiratie

Webflow.com + Youwe Agency — editorial dark, Inter 800, grote typografie, veel witruimte, horizontale lijnen als structuur.
