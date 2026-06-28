# uits-scrapper

Scrapes faculty member data from the University of Information Technology and Sciences (UITS) website and writes it to a JSON file.

## What it does

Hits ten department faculty pages on `uits.edu.bd`, extracts structured data for each teacher
using CSS selectors, and writes the combined result to `teachers.json`. Scraping runs concurrently
across all department URLs.

Collected fields per faculty member:

- `name`
- `title` (academic rank and qualifications)
- `email`
- `phone`
- `picture` (URL to profile photo)
- `link` (URL to individual faculty page)
- `department` (derived from the source URL slug)

Departments covered: Civil, EEE, ECE, CSE, IT, Pharmacy, Social Works, English, Law, Business Studies.

## Requirements

- Node.js 12+
- Yarn (or npm)

## Installation

```sh
git clone https://github.com/nadimtuhin/uits-scrapper.git
cd uits-scrapper
yarn install
```

## Usage

```sh
node scrapper.js
```

Output is printed to stdout as JSON and written to `./teachers.json`.

The included `teachers.json` is a snapshot from the last time the scraper was run. Re-running
overwrites it with fresh data from the live site.

## Dependencies

- [x-ray](https://github.com/nickcoutsos/node-x-ray) — HTML scraping with CSS selector support and
  built-in concurrency control

## Notes

The scraper sets `concurrency(10)` in x-ray, which sends up to ten requests in parallel. The target
site does not appear to rate-limit, but be considerate if running repeatedly.

Some faculty records have missing fields (name, email, phone) depending on what the university
published on their page. The scraper returns whatever the page contains; missing fields are omitted
from the output object rather than set to null.

## Contributing

Fork and open a pull request. If the UITS site structure changes and selectors break, update the
CSS selector strings in `scrapper.js`. See [CONTRIBUTING.md](CONTRIBUTING.md).
