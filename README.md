# node_web_scrape

## Purpose
Makes a request to a website and attempts to count the instances
of the specified word within the text of that page.

## How to get started
Build the docker container, run the following from the project root:

`docker-compose -f docker/docker-compose.yml up --build`

## Example
To view help page:

`docker-compose -f docker/docker-compose.yml run node node bin/crawl.js --help`

Example call:

`docker-compose -f docker/docker-compose.yml run node node bin/crawl.js --url=http://slashdot.org --word=programmer`

## TODO
* Add automated tests.
* Use phantomjs to render webpages so that javascript heavy pages have a chance to render.
* Add the ability to choose filters.
* Add option to follow links recursively to depth ( n ).