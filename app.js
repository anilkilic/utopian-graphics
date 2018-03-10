const express = require('express');
const app = express()
const hbs = require('express-handlebars');
const path = require('path');
const utopian = require('utopian-api');

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });

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

app.get('/waiting', (req, res) => {
    var graphicPosts = [];

    utopian.getPosts({
        sortBy: 'created',
        type: 'graphics',
        filterBy: 'review',
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

app.get('/moderator/:moderatorName', (req, res) => {
    var reviews = [];
    utopian.getPosts({
        type: 'graphics',
        moderator: req.params.moderatorName,
        limit: 10
    }).then((posts) => {
        for(i = 0; i < posts.results.length; i++) {
            reviews.push(posts.results[i])
        };
        res.render('home', {
            title: 'Moderator',
            posts: reviews
        });
    });
});

app.get('/moderator/:moderatorName/:status', (req, res) => {
    var reviews = [];
    utopian.getPosts({
        type: 'graphics',
        moderator: req.params.moderatorName,
        status: req.params.status,
        limit: 10
    }).then((posts) => {
        for(i = 0; i < posts.results.length; i++) {
            reviews.push(posts.results[i])
        };
        res.render('home', {
            title: 'Moderator',
            posts: reviews
        });
    });
});

app.get('/user/:username', (req, res) => {
    var contributions = [];

    utopian.getPosts({
        section: 'author',
        type: 'graphics',
        author: req.params.username,
        limit: 10
    }).then((posts) => {
        for(i = 0; i < posts.results.length; i++) {
            contributions.push(posts.results[i])
        };
        res.render('home', {
            title: 'User',
            posts: contributions
        });
    });
});

app.get('/user/:username/:status', (req, res) => {
    var contributions = [];

    utopian.getPosts({
        section: 'author',
        type: 'graphics',
        status: req.params.status,
        author: req.params.username,
        limit: 10
    }).then((posts) => {
        for(i = 0; i < posts.results.length; i++) {
            contributions.push(posts.results[i])
        };
        res.render('home', {
            title: 'User',
            posts: contributions
        });
    });
});

app.get('/project/:id', (req, res) => {
    var contributions = [];
    utopian.getPosts({
        section: 'project',
        platform: 'github',
        projectId: req.params.id,
        type: 'graphics',
        limit: 10
    }).then((posts) => {
        for(i = 0; i < posts.results.length; i++) {
            contributions.push(posts.results[i])
        };
        res.render('home', {
            title: 'Project',
            posts: contributions
        });
    });
});

app.get('/project/:id/:status', (req, res) => {
    var contributions = [];
    utopian.getPosts({
        section: 'project',
        platform: 'github',
        projectId: req.params.id,
        status: req.params.status,
        type: 'graphics',
        limit: 10
    }).then((posts) => {
        for(i = 0; i < posts.results.length; i++) {
            contributions.push(posts.results[i])
        };
        res.render('home', {
            title: 'Project',
            posts: contributions
        });
    });
});