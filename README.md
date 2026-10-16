# For Afdhobani ♡
React + Vite birthday site. All text, photos, login and Spotify config live in `src/content.js`.

## Run
    npm install
    npm run dev        # local
    npm run build      # outputs dist/

## Photos
Put images in `public/photos/` (square-ish JPG/WebP, ~1000px, under 300KB) and update `photos` in `src/content.js`.

## Spotify
The playlist ID `1FaErYCrqxSRJFKbOSCri2` is already set in `spotify` (content.js). Test the embed after deploying; playback needs internet and may be limited by region or account.

## Deploy
Vercel: push to GitHub, import, framework "Vite" (build `npm run build`, output `dist`). Netlify: same, or drag the built `dist` folder onto app.netlify.com/drop.

## QR code (after deploying)
    npm run qr -- https://your-final-url.vercel.app
Saves `birthday-qr.png`. Generate it only once the URL is final.

## Login security limits
The username/password are bundled into the public JavaScript, so anyone viewing the source can read them. It is a sweet gate, not real security. For genuine privacy use host-level password protection (Vercel Password Protection / Netlify site password), or a serverless function that checks credentials and only then returns the private content, and keep private photos and the letter out of the public bundle.
