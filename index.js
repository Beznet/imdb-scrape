var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express ();

app.get('/scrape', function(req,res){
    url = 'https://imdb.com/title/tt0499549/'

    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

            var title, release, rating;

            var json = {
                title: "",
                release: "",
                rating: ""
            };

            $('.title_wrapper').filter(function(){

                var data = $(this);

                title = data.children().first().text().trim();

                json.title = title;
            })

            $('.title_wrapper').filter(function(){

                var data = $(this);

                release = data.children().last().children().last().text().trim();

                json.release = release;
            })
            
            $('.ratingValue').filter(function(){
                var data = $(this);

                rating = data.text().trim();

                json.rating = rating;

            })
        }
        //using file system to create local JSON file
        fs.writeFile('output.json', JSON.stringify(json,null,4), function(err){
            console.log('File successfully written!');
        })
        //prints JSON in DOM
        res.send(json)

    });
})

app.listen('8081')

console.log('Listening on Port 8081');

exports = module.exports = app;