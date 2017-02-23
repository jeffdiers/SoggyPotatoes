const express = require('express');
const router = express.Router();
const knex = require('../db')

/* GET home page. */
router.get('/', (req, res, next) => {
  knex('posts')
  .then(posts => {
    return knex('comments')
    .whereIn('post_id', posts.map(p => p.id))
    .then((comments) => {
      const commentsByPostId = comments.reduce((result, comment) => {
        result[comment.post_id] = result[comment.post_id] || []
        result[comment.post_id].push(comment)
        return result
      }, {})
      posts.forEach(post => {
        post.comments = commentsByPostId[post.id] || []
      })
      res.send(posts)
    })
  })
  .catch(err => next(err))
})

router.get('/:id', (req, res, next) => {
  knex('posts')
    .where({id: req.params.id})
    .first()
    .then(post => res.send(post))
    .catch(err => next(err))
})

module.exports = router;
