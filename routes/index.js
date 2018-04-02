const express = require('express');
const router = express.Router();
const utopian = require('utopian-api');

router.get('/:status?', (req, res) => {
  var graphicPosts = [];
  
  var perPage = 9;
  var page = req.query.page || 1;

  var query = {
      sortBy: 'created',
      type: 'graphics',
      limit: perPage,
      skip: ((perPage * page) - perPage)
  }
  req.params.status === "pending" ? query.filterBy = "review" : query.status = req.params.status || "any";

  utopian.getPosts(query).then((posts) => {
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

module.exports = router


