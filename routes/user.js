const express = require('express');
const router = express.Router();
const utopian = require('utopian-api');

router.get('/:username/:status?', (req, res) => {
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

module.exports = router