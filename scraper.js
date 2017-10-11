const request = require('request');
const cheerio = require('cheerio');

/**
 * Gets and parse selected element;
 */
class Scrapper {
  constructor (url, element) {
    this.url = url;
    this.element = element;
  }

  getURL () {
    return new Promise ((resolve, reject) => {
      request(this.url, (err, res, body) => {
        if (err) {
          reject(Error(err));
        }
        resolve(body);
      })
    });
  }

  parseElement (body, type) {
    const $ = cheerio.load(body);
    const el = $(`${type === 'id' ? '#' : '.'}${this.element[type]}`);
    console.log(`Elements by ${type}:`);
    el.each((key, obj)=>{
      console.log($(obj).html())
    })
  }

  getElement () {
    this.getURL().then((res)=> {
      if (this.element.id) this.parseElement(res, 'id');
      if (this.element.class) this.parseElement(res, 'class');
    }).catch((err)=>{
      console.log(err)
    });
  }


}

module.exports = Scrapper;