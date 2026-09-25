# ChoirSandora

React + Vite svetainė chorui „Sandora“.

## Vietinis paleidimas

Naudokite Node.js 24 ir pnpm 11.19.0. Projekto aplanke:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Jeigu priklausomybės jau įdiegtos, galima paleisti tiesiogiai:

```sh
node node_modules/vite/bin/vite.js
```

## GitHub Pages

Svetainės adresas po sėkmingo diegimo:
https://luk-rad-nrddigital.github.io/ChoirSandora/

1. GitHub saugykloje atidarykite **Settings → Pages**.
2. Pašalinkite įrašą **Custom domain**, jeigu jis yra. Laukas turi likti tuščias.
3. Skiltyje **Build and deployment → Source** pasirinkite **GitHub Actions**.
4. Įkelkite šiuos pakeitimus į `main` šaką.
5. Skiltyje **Actions** palaukite, kol **Deploy to GitHub Pages** bus sėkmingai užbaigtas.
   Jį taip pat galite paleisti per **Run workflow** pasirinkę `main`.

Kiekvienas naujas pakeitimų įkėlimas į `main` automatiškai atnaujins svetainę.
DNS įrašų ir nuosavo domeno šiam adresui nereikia. `dist` aplanką sukuria
GitHub Actions; jo nereikia įtraukti į Git.

`vite.config.js` nustato `/ChoirSandora/` kelią produkciniams failams.
Naudojant nuosavą domeną ateityje, pakeiskite produkcinį `base` į `/`,
tuomet sukonfigūruokite domeną GitHub Pages nustatymuose ir DNS paslaugos teikėjo paskyroje.

## Produkcinio varianto patikra

```sh
pnpm build
pnpm preview
```

Atidarykite terminale nurodytą peržiūros adresą.
