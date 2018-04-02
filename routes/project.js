const express = require('express');
const router = express.Router();
const utopian = require('utopian-api');

router.get('/:ghuser/:ghproject/:status?', (req, res) => {
    var contributions = [];

    var perPage = 9;
    var page = req.query.page || 1;

    var projectFullName = req.params.ghuser +'/'+ req.params.ghproject;

    var query = {
        sortBy: 'created',
        type: 'graphics',
        limit: perPage,
        skip: ((perPage * page) - perPage)
    }
    req.params.status === "pending" ? query.filterBy = "review" : query.status = req.params.status || "any";

    utopian.getPostsByGithubProject( projectFullName, query).then((posts) => {
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

module.exports = router