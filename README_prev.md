# Ahmed Tareque — Portfolio

Award-inspired Next.js portfolio with awwwards-level animations.

## Tech Stack
- **Next.js 14** (Pages Router)
- **TypeScript**
- **Tailwind CSS**
- **GSAP** — scroll reveal, scramble text
- **Lenis** — silky smooth scrolling
- **Framer Motion** (available for page transitions)

## Features Inspired by Awwwards Winners

| Technique | Inspired By |
|-----------|------------|
| Text scramble on load | Lusion v3, Federico Pian |
| Animated counter stats | Various agency sites |
| Split-reveal on scroll | Joffrey Spitzer portfolio |
| Custom cursor + ring lag | Universal awwwards staple |
| Grain overlay texture | Greg Lallé, Grégory |
| Giant ghost typography | Henri Heymans, Pomares |
| Marquee ticker | Bruno Simon, many SOTD |
| Hide-on-scroll navbar | Mooders, Ashfall Studio |
| Number percent preloader | Multiple SOTD winners |
| Grid-ruled project cards | Salt & Pepper Studio |
| Vertical line accent | Brutalist portfolio trend |

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Netlify

1. Push to GitHub
2. Connect repo to Netlify
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Add environment variable: `NEXT_PUBLIC_SITE_URL=https://ahmedtareque.netlify.app`

## Customization

### Add your photo
In `components/About.tsx`, replace the placeholder `<div>` with:
```tsx
import Image from 'next/image'
<Image src="/photo.jpg" alt="Ahmed Tareque" fill style={{ objectFit: 'cover' }} />
```
Place `photo.jpg` in `/public/`.

### Update links
- `components/Contact.tsx` — update GitHub/LinkedIn URLs
- `components/Navbar.tsx` — adjust sections as needed

### Color palette
Edit `styles/globals.css` `:root` variables:
- `--teal: #00B4A2` — primary accent
- `--coral: #FF5C3A` — secondary accent  
- `--ink: #0A0A0A` — background
- `--paper: #F2EDE6` — text
