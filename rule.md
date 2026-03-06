# FindMe — Scroll Storytelling Guidelines

This document outlines the principles for creating a premium, cinematic scroll-driven landing page for **FindMe**.

## 1. The Story Framework (Scroll = Chapters)

Every scroll should feel like a scene in a movie. The flow must transition logically to maintain engagement.

| Phase | Section | Goal | Mood |
|-------|---------|------|------|
| **Hook** | Hero | Big bold headline + value prop. | Confidence / Premium |
| **Problem** | Problem | Show the pain/frustration. | Darker / Urgent |
| **Solution** | Solution | Shift mood to clarity and hope. | Light / Clean |
| **How It Works**| Features | Step-by-step product walkthrough. | Trust / Logical |
| **Proof** | Testimonials| Stats and social proof. | Credibility |
| **Final CTA** | Footer/CTA | Strong urgency and clear action. | Bold / Energetic |

## 2. Animation Standards

We use **Framer Motion** for React-native animations. "Clean > Flashy" is the core principle.

### ✅ Approved Effects
- **Fade + Slide Up**: `initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}`.
- **Parallax Background**: Subtle movement of background elements at different speeds.
- **Text Reveal**: Masking or word-by-word reveal for headlines.
- **Scale on Scroll**: Gentle scaling of images/mockups as they enter the viewport.
- **Staggered Children**: Sequential reveal for lists or feature cards.

### ❌ Anti-Patterns (Avoid)
- Random bouncing or over-rotation.
- Excessive blur that impacts performance.
- Overlapping animations that distract from the message.
- "Layout shifts" caused by late-loading animations.

## 3. Color Psychology Flow

Color is our emotional guide. Background and accent colors must shift with the story's tone.

- **Hero**: Deep Navy (`#0F172A`) or Black. Represents stability and professional foundation.
- **Problem**: Dark Gray or Muted Red tints. Highlights frustration or inefficiency.
- **Solution**: Clean White or Silver gradients. Signifies "the light at the end of the tunnel."
- **Features**: Soft Indigo or Emerald. Builds calm confidence and trust.
- **CTA**: Bold Accent (Electric Blue `#38BDF8` or Vibrant Purple). Triggers action.

## 4. Technical Implementation (React/Next.js)

- **Layout**: Each section should be `min-h-screen`.
- **Triggers**: Use `whileInView` with `viewport={{ once: true, amount: 0.3 }}` to trigger when 30% visible.
- **Transitions**: Default to `duration: 0.8` with `ease: "easeOut"` for a premium feel.
- **Performance**: Use semantic HTML and optimize images using `next/image`.

---
*Created for the FindMe Landing Page Project.*
