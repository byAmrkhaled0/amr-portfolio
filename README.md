# Amr Khaled Portfolio - Clean Fixed Version

## Run

```bash
npm install
npm run dev
```

## Firebase Reviews

Firestore collection used: `reviews`.

Rules:

```js
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /reviews/{docId} {
      allow read: if true;
      allow create: if true;
      allow update, delete: if false;
    }
  }
}
```

## Notes

- Project cards use live website screenshots through thum.io.
- CSS avoids `backdrop-filter` and `mask-image` to prevent editor warnings.
- Arabic font is IBM Plex Sans Arabic, with smaller, calmer typography.
"# amr-portfolio" 
