This is a Next.js Frontend application with functionality for Google Maps and Autocomplete with search history and adding favourites. 

## Getting Started
First, clone and run the backend development server which can be found here, [https://github.com/Nick-Oyk/maybank-backend-assessment](https://github.com/Nick-Oyk/maybank-backend-assessment).

Second, please ensure to add the Google maps key as below in a .env.local file in the root directory.
```
NEXT_PUBLIC_GOOGLE_MAPS_KEY=AIzaSyCdSpnDiimmmc7wPrTqzV1rzE8iRMrNdlQ
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

