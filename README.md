# iText Studio

iText Studio is a focused writing workspace for drafting, refining, analyzing,
exporting, and keeping notes in the cloud.

## Highlights

- Rich-text editing with clean formatting controls
- Uppercase/lowercase transforms, copy, import, clear, and text download
- Live word count, character count, reading time, and reader preview
- Responsive cloud-note library with search, create, edit, and delete actions
- Accessible light and dark themes saved between visits
- Responsive layouts for phones, tablets, laptops, and wide screens

## Start the frontend

```sh
cd frontend
npm install
npm start
```

The frontend uses the hosted API by default. For a local API, create
`frontend/.env` with:

```env
REACT_APP_API_URL=http://localhost:5000
```

## Start the backend

Copy `backend/.env.example` to `backend/.env`, add your own MongoDB connection
string and a long random JWT secret, then run:

```sh
cd backend
npm install
npm run dev
```

Never commit real database passwords or other credentials. The included
`.env.example` contains placeholders only.

## Production build

```sh
cd frontend
npm run build
```
