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
        checkPrev: function(context) { if (parseInt(context) <= 1) {return "disabled"}; console.log(context); },
        checkNext: function(totalCount, perPage, page) {if ((parseInt(totalCount) / parseInt(perPage)) <= parseInt(page)) {return "disabled"}; }
    }
}));
app.set('view engine', 'handlebars');

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });

// app.get('/', (req, res) => {
//     var graphicPosts = [];

//     utopian.getPosts({
//         sortBy: 'created',
//         type: 'graphics',
//         limit: (req.query.limit ? req.query.limit : 10),
//         skip: (req.query.skip ? req.query.skip : 0)
//     }).then((posts) => {
//         console.log('total: ' + posts.total);
//         for(i = 0; i < posts.results.length; i++) {
//             graphicPosts.push(posts.results[i])
//         }
//         res.render('home', {
//             title: 'Latest Graphics Contributions',
//             posts: graphicPosts,
//             total: posts.total
//         });
//     });
// });

app.get('/', (req, res) => {
    var graphicPosts = [];

    var perPage = 9;
    var page = req.query.page || 1;
 
    utopian.getPosts({
        sortBy: 'created',
        type: 'graphics',
        limit: perPage,
        skip: ((perPage * page) - perPage)
    }).then((posts) => {
        console.log('total: ' + posts.total);
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

app.get('/:status', (req, res) => {
    var graphicPosts = [];
    
    var perPage = 9;
    var page = req.query.page || 1;

    utopian.getPosts({
        sortBy: 'created',
        type: 'graphics',
        status: req.params.status,
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

app.get('/moderator/:moderatorName', (req, res) => {
    var reviews = [];
    
    var perPage = 9;
    var page = req.query.page || 1;

    utopian.getPosts({
        type: 'graphics',
        moderator: req.params.moderatorName,
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

app.get('/moderator/:moderatorName/:status', (req, res) => {
    var reviews = [];
    
    var perPage = 9;
    var page = req.query.page || 1;

    utopian.getPosts({
        type: 'graphics',
        moderator: req.params.moderatorName,
        status: req.params.status,
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

app.get('/user/:username', (req, res) => {
    var contributions = [];
    
    var perPage = 9;
    var page = req.query.page || 1;

    utopian.getPosts({
        section: 'author',
        type: 'graphics',
        author: req.params.username,
        limit: perPage,
        skip: ((perPage * page) - perPage)
    }).then((posts) => {
        for(i = 0; i < posts.results.length; i++) {
            contributions.push(posts.results[i])
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

app.get('/user/:username/:status', (req, res) => {
    var contributions = [];
    
    var perPage = 9;
    var page = req.query.page || 1;

    utopian.getPosts({
        section: 'author',
        type: 'graphics',
        status: req.params.status,
        author: req.params.username,
        limit: perPage,
        skip: ((perPage * page) - perPage)
    }).then((posts) => {
        for(i = 0; i < posts.results.length; i++) {
            contributions.push(posts.results[i])
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

app.get('/project/:id', (req, res) => {
    var contributions = [];
    
    var perPage = 9;
    var page = req.query.page || 1;

    utopian.getPosts({
        section: 'project',
        platform: 'github',
        projectId: req.params.id,
        type: 'graphics',
        limit: perPage,
        skip: ((perPage * page) - perPage)
    }).then((posts) => {
        for(i = 0; i < posts.results.length; i++) {
            contributions.push(posts.results[i])
        };
        res.render('project', {
            title: 'Project',
            // project: posts.results[0].json_metadata.repository,
            project: req.params.id,
            posts: contributions,
            total: posts.total,
            nextPage: parseInt(page) + 1,
            prevPage: (parseInt(page) - 1) >= 2 ? parseInt(page) - 1 : 1,
            page: parseInt(page)  
        });
    });
});

app.get('/project/:id/:status', (req, res) => {
    var contributions = [];
    
    var perPage = 9;
    var page = req.query.page || 1;

    utopian.getPosts({
        section: 'project',
        platform: 'github',
        projectId: req.params.id,
        status: req.params.status,
        type: 'graphics',
        limit: perPage,
        skip: ((perPage * page) - perPage)
    }).then((posts) => {
        for(i = 0; i < posts.results.length; i++) {
            contributions.push(posts.results[i])
        };
        res.render('project', {
            title: 'Project',
            // project: posts.results[0].json_metadata.repository,
            project: req.params.id,
            posts: contributions,
            total: posts.total,
            nextPage: parseInt(page) + 1,
            prevPage: (parseInt(page) - 1) >= 2 ? parseInt(page) - 1 : 1,
            page: parseInt(page)  
        });
    });
});