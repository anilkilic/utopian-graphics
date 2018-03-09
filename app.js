const express = require('express');
const app = express()
const hbs = require('express-handlebars');
const path = require('path');
const utopian = require('utopian-api');

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.listen(3000, () => {
    console.log('Listening 3000..');
})

app.get('/', (req, res) => {
    var graphicPosts = [];

    utopian.getPosts({
        sortBy: 'created',
        type: 'graphics',
        limit: 10
    }).then((posts) => {
        for(i = 0; i < posts.results.length; i++) {
            graphicPosts.push(posts.results[i])
        }
        res.render('home', {
            title: 'Latest Graphics Contributions',
            posts: graphicPosts
        });
    });
});