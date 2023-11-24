// routes/blog/blogRoutes.js
const express = require('express');
const db = require('../db/db'); // Adjust the path based on your project structure
const links = require('../links/links'); // Adjust the path based on your project structure
const router = express.Router();

router.get('/', (req, res) => {
  // Retrieve blog posts from the database
  db.query('SELECT * FROM blog_posts', (err, results) => {
    if (err) throw err;

    // Assuming links.getGroupedLinks is asynchronous and takes a callback
    links.getGroupedLinks((err, groupedLinks) => {
      if (err) {
        console.error('Error getting grouped links:', err);
        return res.status(500).send('Internal Server Error');
      }

      res.render('blog/index', { posts: results, groupedLinks });
    });
  });
});

router.get('/post/:id', (req, res) => {
  const postId = req.params.id;
  // Retrieve a single blog post from the database
  db.query('SELECT * FROM blog_posts WHERE id = ?', [postId], (err, result) => {
    if (err) throw err;
    
    // Assuming links.getGroupedLinks is asynchronous and takes a callback
    links.getGroupedLinks((err, groupedLinks) => {
      if (err) {
        console.error('Error getting grouped links:', err);
        return res.status(500).send('Internal Server Error');
      }

      res.render('blog/post', { post: result[0], groupedLinks });
    });
  });
});

module.exports = router;
