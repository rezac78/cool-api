const BlogPost = require('../models/BlogPost');

// Create a new blog post
exports.createBlog = async (req, res) => {
    try {
        const blogPost = await BlogPost.create(req.body);
        res.status(201).json({ success: true, data: blogPost });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get all blog posts
exports.getAllBlog = async (req, res) => {
    try {
        const blogPosts = await BlogPost.find();
        res.status(200).json({ success: true, data: blogPosts });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Update a blog post by ID
exports.updateBlog = async (req, res) => {
    try {
        const blogPost = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!blogPost) {
            return res.status(404).json({ success: false, error: 'No blog post found with this ID' });
        }

        res.status(200).json({ success: true, data: blogPost });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Delete a blog post by ID
exports.deleteBlog = async (req, res) => {
    try {
        const blogPost = await BlogPost.findByIdAndDelete(req.params.id);

        if (!blogPost) {
            return res.status(404).json({ success: false, error: 'No blog post found with this ID' });
        }

        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
