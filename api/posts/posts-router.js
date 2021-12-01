// implement your posts router here
const express = require('express');
const router = express.Router();
const Post = require('./posts-model');

//1 GET  /api/posts  Returns **an array of all the post objects** contained in the database
router.get('/', async (req, res) => {
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch (err){
        res.status(500).json(
            { message: "The posts information could not be retrieved" })
    }
})
//2 GET/api/posts/:id  Returns **the post object with the specified id**                       
router.get('/:id', async (req,res) => {
    try{
        Post.findById(req.params.id).then(post =>{
            if(!post){
                res.status(404).json({ message: "The post with the specified ID does not exist" });
            }else{
                res.json(post);
            }
        })
    }catch (err){
        res.status(500).json({ message: "The post information could not be retrieved" })
    }
})                                             
//3 POST /api/posts Creates a post using the information sent inside the request body and returns **the newly created post object**                 |
// 4 PUT /api/posts/:id Updates the post with the specified id using data from the request body and **returns the modified document**, not the original
// 5 DELETE /api/posts/:id  Removes the post with the specified id and returns the **deleted post object**                                                  |
//6 GET /api/posts/:id/comments Returns an **array of all the comment objects** associated with the post with the specified id      
module.exports = router