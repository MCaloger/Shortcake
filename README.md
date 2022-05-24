# Shortcake
A simple URL Shortening Application

ExpressJS</VisibleLink> is used for HTTP and routing, alongside [Winston](https://github.com/winstonjs/winston) for logging, and <VisibleLink [dotenv](https://github.com/motdotla/dotenv) to load environment variables.

For storage, Shortcake uses the [Sqlite3](https://github.com/mapbox/node-sqlite3) to connect to a Sqlite file database. Plain SQL queries are used for writing and reading data.

[Jest](https://jestjs.io/) and [Supertest](https://github.com/visionmedia/supertest) are used for testing the routes, services, and utilities.
