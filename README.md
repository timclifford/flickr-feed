
Flickr Public Feed
------------------

# Dev

To begin the development, run `npm start`.
To create a production bundle, use `npm run build`.

# Running local build
The build folder is ready to be deployed.
You may serve it with a static server:

  npm install -g serve
  serve -s build


# PWA

// In production, we register a service worker to serve assets from local cache.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on the "N+1" visit to a page, since previously
// cached resources are updated in the background.

// To learn more about the benefits of this model, read https://goo.gl/KwvDNy.
// This link also includes instructions on opting out of this behavior.
