---
name: choir-sandora-web
description: Build and maintain the Choir Sandora React/Vite website while preserving its established visual language, page structure, readable source formatting, accessibility, and deployment compatibility. Use for code, content, layout, navigation, gallery, contact, or styling changes in this project.
---

# Choir Sandora Website

Maintain this project as a polished, lightweight choir website. Follow the user's current request first; treat the rules below as project defaults when the request does not specify otherwise.

## Preserve the established design

- Keep the white, charcoal, and muted-gold color scheme unless the user asks to change it.
- Keep the current centered logo as a replaceable placeholder. Do not redesign or replace it without a supplied asset or explicit request.
- Preserve the sticky top banner, left hamburger control, and smooth dropdown animation.
- Keep the primary navigation order: `Apie mus`, `Galerija`, `Kontaktai`.
- Each primary navigation item opens its own HTML page. The centered logo returns to the home page.
- Keep layouts responsive and visually balanced on desktop and narrow mobile screens.
- Reuse the project's existing typography, spacing scale, borders, and icon treatment before introducing new visual patterns.

## Write human-readable code

- Format HTML, CSS, JSX, JSON, and configuration files with Prettier after editing them.
- Use conventional indentation, one logical element or declaration per line where it improves scanning, and blank lines between distinct blocks.
- Use clear component, variable, class, and function names. Extract repeated UI into a component or data structure when it makes the source easier to understand.
- Avoid dense one-line markup, deeply nested inline expressions, unexplained magic values, duplicated content, and clever abstractions that obscure simple behavior.
- Keep comments rare and useful: explain non-obvious intent or deployment constraints, not syntax.
- Preserve unrelated user changes in the working tree.

## Content and assets

- Store site-owned static images in `public/` and reference them with paths compatible with the configured Vite base.
- Give meaningful images useful Lithuanian alt text. Mark purely decorative elements as hidden from assistive technology.
- Keep temporary URLs and copy clearly replaceable. Current placeholder social URLs may remain until the user provides the real YouTube, Instagram, and Facebook links.
- Keep social links in the order YouTube, Instagram, Facebook wherever the group appears.
- Do not invent biographical details, contact information, event data, or social URLs.

## Interaction and accessibility

- Use semantic elements and native controls for links, buttons, navigation, headings, figures, and page regions.
- Ensure interactive controls have accessible names, visible keyboard focus, and sensible keyboard behavior.
- The dropdown menu must close on Escape, outside interaction, and focus leaving the header. Closed menu items must not remain keyboard-focusable.
- Respect `prefers-reduced-motion` for menu and scrolling animations.
- Indicate the active page with `aria-current="page"`.

## Project structure and verification

- Keep the current React/Vite multi-page setup unless the user requests a routing or framework change.
- Ensure new pages are included in Vite's multi-page build input and use relative asset/navigation URLs that work locally and on GitHub project pages.
- After code changes, run Prettier on edited source files and run `npm run build`.
- Run `git diff --check` before handing off. Fix formatting, build, missing-asset, and broken-link issues caused by the change.
- Report placeholders or missing user-supplied content plainly in the handoff.
