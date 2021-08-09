const express = require('express');
const libgen = require('libgen');
const libgenesis = require('libgenesis');
const { dataUrl, dlUrl, coversUrl } = require('../config/configgenlib');
const routes = express.Router();




// @desc: search title
routes.post('/search',  async (req, res, next) => {
    const options = {
        mirror: 'http://gen.lib.rus.ec',
        query: req.body.title,
        count: 50,
        search_in: 'title',
        sort_by: 'year',
        reverse: true
    }
    try {
        const data = await libgen.search(options)
        const finalData = [];
        let n = data.length
        console.log(`${n} results for "${options.query}"`)
        while (n--){
            const x = {
                id: data[n].id,
                title: data[n].title,
                author: data[n].author,
                md5: data[n].md5.toLowerCase(),
                year: data[n].year,
                language: data[n].language,
                pages: data[n].pagesinfile,
                size: data[n].filesize,
                cover: data[n].coverurl,
                directlink: `${dlUrl}/${Math.floor(data[n].id / 1000) * 1000}/${data[n].md5.toLowerCase()}/${data[n].author} - ${data[n].title}-${data[n].publisher} (${data[n].year}).${data[n].extension}`
            }
            finalData.push(x);
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(finalData);
    } catch (err) {
        console.error(err)
    }
});

routes.post('/',  (req, res, next) => {
    const book = req.body.title;
    libgenesis(book).then((books) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(books);
    })
})


module.exports = routes;
