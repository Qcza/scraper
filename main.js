const Scrapper = require('./scraper');

const element = {
  id: process.env.ID,
  class: process.env.CLASS
};

const scrapper = new Scrapper(process.env.URL, element);

scrapper.getElement();