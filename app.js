const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const path = require('path');
const utopian = require('utopian-api');
const moment = require('moment');

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hbs({
    defaultLayout: 'main', 
    helpers: {
        formatDate: function(context) { return moment(context).fromNow(); },
<<<<<<< HEAD
        checkPrev: function(context) { if (parseInt(context) <= 1) {return "disabled"}; },
        checkNext: function(totalCount, perPage, page) {if ((parseInt(totalCount) / parseInt(perPage)) <= parseInt(page)) {return "disabled"}; },
        parseImage: function(bodyText) { var res = bodyText.match(/(https?:\/\/.*\.(?:png|jpg))/i); if (res) { return res[0]; }; }
=======
>>>>>>> parent of 03ff9f3... Pagination (needs improvements)
    }
}));
app.set('view engine', 'handlebars');

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });

<<<<<<< HEAD
app.get('/:status?', (req, res) => {
=======
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
>>>>>>> parent of 03ff9f3... Pagination (needs improvements)
    var graphicPosts = [];

    utopian.getPosts({
        sortBy: 'created',
        type: 'graphics',
<<<<<<< HEAD
        status: req.params.status || 'any',
        limit: perPage,
        skip: ((perPage * page) - perPage)
=======
        status: req.params.status,
        limit: (req.query.limit ? req.query.limit : 10),
        skip: (req.query.skip ? req.query.skip : 0)
>>>>>>> parent of 03ff9f3... Pagination (needs improvements)
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

<<<<<<< HEAD
app.get('/moderator/:moderatorName/:status?', (req, res) => {
    var reviews = [];
    
    var perPage = 9;
    var page = req.query.page || 1;
=======
app.get('/moderator/:moderatorName', (req, res) => {
>>>>>>> parent of 03ff9f3... Pagination (needs improvements)

    var reviews = [];
    utopian.getPosts({
        type: 'graphics',
        moderator: req.params.moderatorName,
<<<<<<< HEAD
        status: req.params.status || 'any',
        limit: perPage,
        skip: ((perPage * page) - perPage)
=======
        limit: (req.query.limit ? req.query.limit : 10),
        skip: (req.query.skip ? req.query.skip : 0)
>>>>>>> parent of 03ff9f3... Pagination (needs improvements)
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

<<<<<<< HEAD
app.get('/user/:username/:status?', (req, res) => {
=======
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
>>>>>>> parent of 03ff9f3... Pagination (needs improvements)
    var contributions = [];

    utopian.getPosts({
        section: 'author',
        type: 'graphics',
        sortBy: 'created',
        status: req.params.status || 'any',
        author: req.params.username,
        limit: (req.query.limit ? req.query.limit : 10),
        skip: (req.query.skip ? req.query.skip : 0)
    }).then((posts) => {
        for(i = 0; i < posts.results.length; i++) {
            contributions.push(posts.results[i]);
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

app.get('/project/:ghuser/:ghproject/:status?', (req, res) => {
    var contributions = [];

<<<<<<< HEAD
    var perPage = 9;
    var page = req.query.page || 1;

    var projectFullName = req.params.ghuser +'/'+ req.params.ghproject;

    utopian.getPostsByGithubProject( projectFullName, {
        type: 'graphics',
        status: req.params.status || 'any',
=======
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
            // project: posts.results[0].json_metadata.repository,
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
>>>>>>> parent of 03ff9f3... Pagination (needs improvements)
    }).then((posts) => {
        for(i = 0; i < posts.results.length; i++) {
            contributions.push(posts.results[i])
        };
        res.render('project', {
            title: 'Project',
            project: projectFullName,
            posts: contributions,
            total: posts.total
        });
    });
});