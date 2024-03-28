This is a Next.js Frontend application with functionality for Google Maps and Autocomplete with search history and adding favourites. 

## Getting Started
First, clone and run the backend development server which can be found here, [https://github.com/Nick-Oyk/maybank-backend-assessment](https://github.com/Nick-Oyk/maybank-backend-assessment).


If you plan on running the frontend application locally please ensure to add a Google maps key with  as below in a .env.local file in the root directory.
The Google maps key must have access to these Google API's:
```
Geocoding API
Maps JavaScript API
Places API
```
Add this in the .env.local file
```
NEXT_PUBLIC_GOOGLE_MAPS_KEY=**YOUR_KEY_HERE**
```

run the development server for client facing application:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Upon opening the page you will be able to access the search bar as well as list of search histories and favourites.

For no hassle of setup, the demo can be viewed here, [https://maybank-frontend-assessment-two.vercel.app/](https://maybank-frontend-assessment-two.vercel.app/).

