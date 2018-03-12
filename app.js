const express = require('express');
const app = express();
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
        limit: (req.query.limit ? req.query.limit : 10),
        skip: (req.query.skip ? req.query.skip : 0)
    }).then((posts) => {
        console.log('total: ' + posts.total);
        for(i = 0; i < posts.results.length; i++) {
            graphicPosts.push(posts.results[i])
        }
        res.render('home', {
            title: 'Latest Graphics Contributions',
            posts: graphicPosts,
            total: posts.total
        });
    });
});


app.get('/test', (req, res) => {
    var graphicPosts = [];

    utopian.getPosts({
        sortBy: 'created',
        type: 'graphics',
        limit: (req.query.limit ? req.query.limit : 10),
        skip: (req.query.skip ? req.query.skip : 0)
    }).then((posts) => {
        for(i = 0; i < posts.results.length; i++) {
            graphicPosts.push(posts.results[i])
        }
        res.render('home', {
            title: 'Latest Graphics Contributions',
            posts: graphicPosts,
            total: posts.total
        });
    });
});

app.get('/:status', (req, res) => {
    var graphicPosts = [];

    utopian.getPosts({
        sortBy: 'created',
        type: 'graphics',
        status: req.params.status,
        limit: (req.query.limit ? req.query.limit : 10),
        skip: (req.query.skip ? req.query.skip : 0)
    }).then((posts) => {
        for(i = 0; i < posts.results.length; i++) {
            graphicPosts.push(posts.results[i])
        }
        res.render('home', {
            title: 'Latest Graphics Contributions',
            posts: graphicPosts  ,
            total: posts.total      
        });
    });
});

app.get('/moderator/:moderatorName', (req, res) => {

    var reviews = [];
    utopian.getPosts({
        type: 'graphics',
        moderator: req.params.moderatorName,
        limit: (req.query.limit ? req.query.limit : 10),
        skip: (req.query.skip ? req.query.skip : 0)
    }).then((posts) => {
        for(i = 0; i < posts.results.length; i++) {
            reviews.push(posts.results[i])
        };
        res.render('moderator', {
            title: 'Moderator',
            mod: req.params.moderatorName,
            posts: reviews,
            total: posts.total
        });
    });
});

app.get('/moderator/:moderatorName/:status', (req, res) => {
    var reviews = [];
    utopian.getPosts({
        type: 'graphics',
        moderator: req.params.moderatorName,
        status: req.params.status,
        limit: (req.query.limit ? req.query.limit : 10),
        skip: (req.query.skip ? req.query.skip : 0)
    }).then((posts) => {
        for(i = 0; i < posts.results.length; i++) {
            reviews.push(posts.results[i])
        };
        res.render('moderator', {
            title: 'Moderator',
            mod: req.params.moderatorName,
            posts: reviews,
            total: posts.total
        });
    });
});

app.get('/user/:username', (req, res) => {
    var contributions = [];

    utopian.getPosts({
        section: 'author',
        type: 'graphics',
        author: req.params.username,
        limit: (req.query.limit ? req.query.limit : 10),
        skip: (req.query.skip ? req.query.skip : 0)
    }).then((posts) => {
        for(i = 0; i < posts.results.length; i++) {
            contributions.push(posts.results[i])
        };
        res.render('user', {
            title: 'User',
            user: req.params.username,
            posts: contributions,
            total: posts.total,
            total: posts.total
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
        limit: (req.query.limit ? req.query.limit : 10),
        skip: (req.query.skip ? req.query.skip : 0)
    }).then((posts) => {
        for(i = 0; i < posts.results.length; i++) {
            contributions.push(posts.results[i])
        };
        res.render('user', {
            title: 'User',
            user: req.params.username,
            posts: contributions,
            total: posts.total
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
        limit: (req.query.limit ? req.query.limit : 10),
        skip: (req.query.skip ? req.query.skip : 0)
    }).then((posts) => {
        for(i = 0; i < posts.results.length; i++) {
            contributions.push(posts.results[i])
        };
        res.render('project', {
            title: 'Project',
            project: req.params.id,
            posts: contributions,
            total: posts.total
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
        limit: (req.query.limit ? req.query.limit : 10),
        skip: (req.query.skip ? req.query.skip : 0)
    }).then((posts) => {
        for(i = 0; i < posts.results.length; i++) {
            contributions.push(posts.results[i])
        };
        res.render('project', {
            title: 'Project',
            project: req.params.id,
            posts: contributions,
            total: posts.total
        });
    });
});