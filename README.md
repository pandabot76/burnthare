# BurntHare website

The BurntHare events site, built with React + Vite + Tailwind. Deploys
automatically to GitHub Pages every time you push to `main`.

## The one rule that matters

**Code and content are separate.** Almost everything you'll want to change
day-to-day lives in three small files in `src/data/`, not in the component
code. You should rarely need to touch anything in `src/components/`.

| File | What it controls |
|---|---|
| `src/data/events.json` | Every race: summary, races, course, registration, rules, prizes, location |
| `src/data/sponsors.json` | Footer sponsor logos and links |
| `src/data/site.json` | Site tagline and nav menu links |
| `src/data/about.json` | About page: history, testimonials, contact details |
| `src/data/results.json` | Results page: year-by-year links per event |

---

## Pages on the site

| Page | URL | Built from |
|---|---|---|
| Home | `/` | `events.json` — featured event + carousel |
| Event page | `/events/<id>` | One entry in `events.json` |
| About | `/about` | `about.json` |
| Results | `/results` | `results.json` |

---

## Adding a new event

1. Add a photo for the event to `public/images/events/` (a `.jpg` around
   1000–1300px wide works well — don't worry about exact size).
2. Open `src/data/events.json` and add a new entry. The homepage card only
   needs the first few fields below — the rest power that event's own page
   (`/events/<id>`) and can be added later, or left out entirely:

   ```json
   {
     "id": "my-new-race",
     "name": "The Name Of The Race",
     "date": "2027-09-12",
     "location": "Start line location, Hitchin",
     "tagline": "Short one-line description",
     "image": "my-new-race.jpg",
     "bookingUrl": "https://link-to-the-signup-page.com",

     "poster": "my-new-race.jpg",
     "resultsUrl": "https://your-timing-partner.com",
     "summary": "A paragraph describing the event for its own page.",
     "races": [
       { "name": "10km", "distance": "10km road race", "ages": "Open" }
     ],
     "course": {
       "description": "Describe the route here.",
       "maps": [
         { "label": "Route map", "image": "my-new-race-route.jpg" }
       ]
     },
     "registration": {
       "feeNote": "£20",
       "deadline": "Entries close ...",
       "notes": ["Includes a medal", "Chip timed"]
     },
     "rules": ["UK Athletics rules apply"],
     "prizes": ["Medal for every finisher"],
     "locationDetails": {
       "address": "Full address",
       "parking": "Where to park",
       "mapQuery": "Whatever you'd type into Google Maps for this location"
     }
   }
   ```

3. Save, commit, and push. **That's it** — no other file needs to change.

The homepage always works out which event is "Next event" itself: it looks
at every event's `date`, ignores anything in the past, and features
whichever is soonest. The rest appear in the scrollable carousel underneath,
in date order. The event page (`/events/<id>`) only shows a section if its
data is present — leave `rules` out entirely, for instance, and the Rules
tab and section just won't appear. That means you can start with the
minimal fields and fill in the rest whenever you have it, with no broken
empty sections in the meantime.

A few notes on specific fields:
- `id` — also used as the page URL (`/events/id`). Use lowercase words
  separated by hyphens, no spaces.
- `date` — always `YYYY-MM-DD` format.
- `races` — one entry per distance/category. Add `"disciplines": ["Run", "Ride"]`
  to a race if people can choose how they cover it (like the AONB event).
- `course.maps` — optional list of `{ label, image }` for route map screenshots
  (image goes in `public/images/course-maps/`). Currently only the Triathlon
  has these (one per bike distance, plus the run loop).
- `locationDetails.mapQuery` — just plain text, the same as you'd type into
  Google Maps. The page builds the embedded map from it automatically.
- Past events: once a date has passed, that event simply stops appearing on
  the homepage automatically. Its own page and its results stay reachable —
  link to it from `results.json` (see below).

**Countdown badge:** the homepage hero and the carousel cards both show a
small "X days to go" badge automatically, calculated from each event's
`date` — nothing to configure, it just disappears once the date has passed.

**How it works:** the four-step "Enter the race / Pre-race / Race day /
Results" explainer lives once on the homepage (`src/components/HowItWorks.jsx`),
not per event, since the process is the same for every race. Edit the text
there if it ever needs to change; the four photos live in
`public/images/process/`.

## Updating results

Edit `src/data/results.json` — add a year and a URL pointing to wherever
your timing partner publishes that year's results. The Results page (`/results`)
lists every event with a button per year; events with no `years` entries yet
just show a friendly "no results" message instead of an empty list.

## Updating the About page

Edit `src/data/about.json` — `history` is a list of paragraphs, `testimonials`
is a list of `{ quote, name, context }`, and `contact` holds your email and
social links.

## Updating a sponsor

Edit `src/data/sponsors.json` — same idea, add/remove/edit an entry and add
the logo file to `public/images/sponsors/`.

## Changing the tagline or nav menu

Edit `src/data/site.json`.

---

## Running it on your own computer

You'll need [Node.js](https://nodejs.org) installed (the LTS version).

```bash
npm install      # first time only, downloads dependencies
npm run dev      # starts a local preview at http://localhost:5173
```

Leave that running and edit any file — the browser updates automatically.
Press `Ctrl+C` in the terminal to stop it.

To produce the final optimised files (you won't normally need to do this
yourself — GitHub does it automatically, see below):

```bash
npm run build    # outputs to a "dist" folder
```

---

## How publishing works

You don't need to manually "publish" anything. A GitHub Action
(`.github/workflows/deploy.yml`) is already set up to:

1. Watch for any push to the `main` branch.
2. Install dependencies and run `npm run build`.
3. Publish the result to GitHub Pages automatically.

So the whole workflow for any change, big or small, is:

```bash
git add .
git commit -m "Add Hitchin Half Marathon 2027"
git push
```

...then wait a minute or two and refresh the live site.

**One technical note:** this site now has multiple pages (Home, event pages,
About, Results) using client-side routing, so visiting a link like
`burnthare.com/events/hitchin-10k` directly (rather than clicking to it from
the homepage) needs a small trick on GitHub Pages, since it only really has
one HTML file. The build step already handles this automatically (see
`"build"` in `package.json`) by duplicating that file as `404.html` — nothing
you need to think about, just flagging why that file exists if you spot it.

## One-time setup (see the main chat reply for the full walkthrough)

1. Push this project to `github.com/pandabot76/burnthare`.
2. In the repo: **Settings → Pages → Source → GitHub Actions**.
3. In the repo: **Settings → Pages → Custom domain** → enter `burnthare.com`.
4. At your domain registrar, add the DNS records listed in the chat reply.

After the first successful Action run and DNS propagating, the site is live
at `https://burnthare.com`.
