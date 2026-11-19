# More News UI Project

A fresh React + TypeScript + Vite project using **Chakra UI v2** and the official Hacker News Firebase API. The app is branded More News.

## Requirements
- Node.js 18 or newer
- npm

## Run locally
1. Extract this ZIP.
2. Open a terminal in the extracted `more-news-ui-project` folder.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL Vite prints (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

## Included feeds
- Top Posts — `topstories`
- New Posts — `newstories`
- Best — `beststories`
- Ask MN — `askstories`
- Show MN — `showstories`
- Jobs — `jobstories`
- Polls — `pollstories`

Tabs stay on the homepage and update the feed, heading, description, sort choices and cards.

## Pagination and loading
- Initial API fetch retrieves the first 20 item IDs and their item details.
- `Load More Stories` appends the next 20 items.
- Pagination displays 10 cards per page across the items currently loaded.
- Changing tabs resets the feed, sort selection and current page.
- Requests are cancelled when switching feeds to avoid stale results appearing in the new tab.

## Notes
- More News does not expose a global comments feed endpoint. This project focuses on the seven official story feeds.
- Poll cards fetch their poll-option items from each poll's `parts` array and show current option scores. This is display-only; the official API does not provide a vote-submission endpoint.
- MN story text is HTML supplied by the API and is rendered as HTML for Ask/Show/Poll descriptions. Only render trusted API content; do not reuse this rendering approach for arbitrary user-provided HTML.
- The app requires an internet connection to reach the More News API and Google Fonts.
