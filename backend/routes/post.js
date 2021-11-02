const express = require("express");
const UserModel = require("../models/User");
const ProfileModel = require("../models/Profile");
const PostModel = require("../models/Post");
const authMiddleware = require("../middleware/auth");
const { postValidation, commentValidation } = require("./validation");

const router = express.Router();

// @@ Create posts
router.post("/", authMiddleware, async (req, res) => {
    const validate = postValidation(req.body);

    if (validate.error) {
        return res.status(400).json({ message: validate.error.details[0].message });
    }

    try {
        const user = await UserModel.findById(req.user.id).select("-password");

        const newPost = new PostModel({
            user: req.user.id,
            name: user.name,
            title: req.body.title,
            text: req.body.text,
        });

        const post = await newPost.save();

        res.json({ post: post })
    } catch (ex) {
        res.status(500).json({ message: ex.message })
    }
});


// @@ Get all post
router.get("/", authMiddleware, async (req, res) => {
    try {
        const posts = await PostModel.find({}).sort("-createdAt");

        res.json({ posts: posts });
    } catch (ex) {
        res.status(500).json({ message: ex.message })
    }
});

// @@ Get single post
router.get("/:id", authMiddleware, async (req, res) => {
    const id = req.params.id;

    try {
        const post = await PostModel.findById(id);

        if(!post) {
            return res.status(404).json({ message: "Could not find post" });
        }

        res.json({ post: post });
    } catch (ex) {
        if(ex.kind === "ObjectId") {
            return res.status(404).json({ message: "Could not find post" });
        }

        res.status(500).json({ message: ex.message })
    }
});

// @@ Like a post
router.put("/like/:id", authMiddleware, async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);

        if(!post || (post.user.toString() !== req.user.id)) {
            return res.status(401).json({ message: "You are not authorised to like this post." }); 
        }

        // Check if user has already liked the post
        if(post.likes.filter((like) => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ message: "Post already liked" });
        }

        post.likes.push({ user: req.user.id });
        await post.save();

        res.status(200).json({ likes: post.likes });
    } catch (ex) {
        if(ex.kind === "ObjectId") {
            return res.status(404).json({ message: "Could not find post" });
        }

        res.status(500).json({ message: ex.message })
    }
});

// @@ Unlike post
router.put("/unlike/:id", authMiddleware, async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);

        if(!post || (post.user.toString() !== req.user.id)) {
            return res.status(401).json({ message: "You cannot unlike this post." }); 
        }

        // Check if user has not liked the post
        if(post.likes.filter((like) => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ message: "Post has not been liked" });
        }

        const index = post.likes.indexOf(req.user.id);
        post.likes.splice(index, 1);
        await post.save();

        res.status(200).json({ likes: post.likes });
    } catch (ex) {
        if(ex.kind === "ObjectId") {
            return res.status(404).json({ message: "Could not find post" });
        }

        res.status(500).json({ message: ex.message })
    }
});

// @@ Delete single post 
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);

        if(!post) {
            return res.status(404).json({ message: "Post does not exist" }); 
        }

        if(post.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "You are not authorised to delete this post." }); 
        }

        await post.remove();

        res.status(204).json({ data: "Deleted post" });
    } catch (ex) {
        if(ex.kind === "ObjectId") {
            return res.status(404).json({ message: "Could not find post" });
        }

        res.status(500).json({ message: ex.message })
    }
});

/* Comments */

// @@ Comment on single post          
router.post("/comment/:id", authMiddleware, async (req, res) => {
    const validate = commentValidation(req.body);

    if (validate.error) {
        return res.status(400).json({ message: validate.error.details[0].message });
    }

    try {
        const user = await UserModel.findById(req.user.id).select("-password");
        const post = await PostModel.findById(req.params.id);

        const newComment = {
            user: req.user.id,
            name: user.name,
            text: req.body.text
        };

        post.comments.push(newComment);

        await post.save();

        res.json({ post: post })
    } catch (ex) {
        console.log(ex);
        res.status(500).json({ message: ex.message })
    }
});

// @@ delete single comment
router.delete("/comment/:id/:commentId", authMiddleware, async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);

        if(!post) {
            return res.status(404).json({ message: "Post does not exist" }); 
        }

        if(post.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "You are not authorised to delete this comment" }); 
        }

        const comment = post.comments.find((comment) => comment.id.toString() === req.params.commentId);
        
        if(!comment) {
            return res.status(400).json({ message: "Comment not found" }); 
        }

        // Check user
        if(comment.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "You are not authorised to delete this comment" }); 
        }

        const index = post.comments.indexOf(req.user.id);

        post.comments.splice(index, 1);

        await post.save();

        res.status(204).json({ data: "Deleted post" });
    } catch (ex) {
        if(ex.kind === "ObjectId") {
            return res.status(404).json({ message: "Could not find comment" });
        }

        res.status(500).json({ message: ex.message })
    }
});

module.exports = router;