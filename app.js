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
        checkPrev: function(context) { if (parseInt(context) <= 1) {return "disabled"}; },
        checkNext: function(totalCount, perPage, page) {if ((parseInt(totalCount) / parseInt(perPage)) <= parseInt(page)) {return "disabled"}; },
        parseImage: function(bodyText) { var res = bodyText.match(/(https?:\/\/.*\.(?:png|jpg))/i); if (res) { return res[0]; }; }
    }
}));
app.set('view engine', 'handlebars');

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });

app.get('/:status?', (req, res) => {
    var graphicPosts = [];
    
    var perPage = 9;
    var page = req.query.page || 1;

    utopian.getPosts({
        sortBy: 'created',
        type: 'graphics',
        status: req.params.status || 'any',
        limit: perPage,
        skip: ((perPage * page) - perPage)
    }).then((posts) => {
        for(i = 0; i < posts.results.length; i++) {
            graphicPosts.push(posts.results[i])
        }
        res.render('home', {
            title: 'Latest Graphics Contributions',
            posts: graphicPosts,
            total: posts.total,
            nextPage: parseInt(page) + 1,
            prevPage: (parseInt(page) - 1) >= 2 ? parseInt(page) - 1 : 1,
            page: parseInt(page)     
        });
    });
});

app.get('/moderator/:moderatorName/:status?', (req, res) => {
    var reviews = [];
    
    var perPage = 9;
    var page = req.query.page || 1;

    utopian.getPosts({
        type: 'graphics',
        moderator: req.params.moderatorName,
        status: req.params.status || 'any',
        limit: perPage,
        skip: ((perPage * page) - perPage)
    }).then((posts) => {
        for(i = 0; i < posts.results.length; i++) {
            reviews.push(posts.results[i])
        };
        res.render('moderator', {
            title: 'Moderator',
            mod: req.params.moderatorName,
            posts: reviews,
            total: posts.total,
            nextPage: parseInt(page) + 1,
            prevPage: (parseInt(page) - 1) >= 2 ? parseInt(page) - 1 : 1,
            page: parseInt(page)  
        });
    });
});

app.get('/user/:username/:status?', (req, res) => {
    var contributions = [];
    
    var perPage = 9;
    var page = req.query.page || 1;

    utopian.getPosts({
        section: 'author',
        type: 'graphics',
        sortBy: 'created',
        status: req.params.status || 'any',
        author: req.params.username,
        limit: perPage,
        skip: ((perPage * page) - perPage)
    }).then((posts) => {
        for(i = 0; i < posts.results.length; i++) {
            contributions.push(posts.results[i]);
        };
        res.render('user', {
            title: 'User',
            user: req.params.username,
            posts: contributions,
            total: posts.total,
            nextPage: parseInt(page) + 1,
            prevPage: (parseInt(page) - 1) >= 2 ? parseInt(page) - 1 : 1,
            page: parseInt(page)  
        });
    });
});

app.get('/project/:ghuser/:ghproject/:status?', (req, res) => {
    var contributions = [];

    var perPage = 9;
    var page = req.query.page || 1;

    var projectFullName = req.params.ghuser +'/'+ req.params.ghproject;

    utopian.getPostsByGithubProject( projectFullName, {
        type: 'graphics',
        status: req.params.status || 'any',
        limit: perPage,
        skip: ((perPage * page) - perPage)
    }).then((posts) => {
        for(i = 0; i < posts.results.length; i++) {
            contributions.push(posts.results[i])
        };
        res.render('project', {
            title: 'Project',
            project: projectFullName,
            posts: contributions,
            total: posts.total,
            nextPage: parseInt(page) + 1,
            prevPage: (parseInt(page) - 1) >= 2 ? parseInt(page) - 1 : 1,
            page: parseInt(page)  
        });
    });
});