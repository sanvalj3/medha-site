# Medha IT Technologies website

Static website built with [Astro](https://astro.build), hosted on GitHub Pages.
Every push to `main` rebuilds and publishes the site automatically (see `.github/workflows/deploy.yml`).

## Run it on your computer

```bash
npm install
npm run dev      # http://localhost:4321 , reloads as you edit
npm run build    # production build into dist/
```

## Where to change things

| What | File |
|---|---|
| Phone, WhatsApp, email, address, social links | `src/data/site.ts` (`contact`, `social`) |
| Stats (850+ placed, 20k+ trained…) | `src/data/site.ts` (`stats`) |
| Placed students | `src/data/site.ts` (`students`) + photo in `src/assets/students/` |
| Testimonials, FAQs, trainers, batches | `src/data/site.ts` |
| Course pages (text, features, careers, duration) | `src/data/courses.json` |
| Demo form course list | `src/data/site.ts` (`demoCourses`) |
| Events list | `src/data/events.ts`; articles in `src/pages/events/` |
| Event photos | `src/assets/events/` (referenced from the event pages in `src/pages/events/`) |
| Colours, fonts, layout | `src/styles/global.css` |
| Chatbot answers | `public/chat/medha-chat.js` |

Images in `src/assets/` are resized and converted to WebP automatically at build time.

The demo/enquiry forms send the details to WhatsApp (+91 73494 75807); there is no server.
