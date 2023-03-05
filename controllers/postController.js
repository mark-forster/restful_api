const Post=require('../models/postModel');
//getting posts
const getPosts= async (req,res)=>{
        const posts=await Post.find({}).exec();
        try{
            res.status(200).json({message:posts});
        }catch(err){
            res.json({message:err.message});
        }
}
const addPost=async (req,res)=>{
        const data=req.body;

        const post= new Post({
            title:data.title,
            content:data.content
        })
        try{
            const postSuccess=await post.save();
            res.status(200).json({message:postSuccess});
        }
        catch(err){
            res.status(400).json({message:err.message});
        }
}

//Update (editing)
const editPost=async (req,res)=>{
       if(req.body.title && req.body.content !== null){
            title=req.body.title
            content=req.body.content
       }
       try{
            const post=await Post.findByIdAndUpdate(req.params.id,{
                title:title,
                content:content
            },{new:true});

            res.status(201).json({message:post});
       }
       catch(err){
            res.status(500).json({message:err.message})
       }
       

}
//Delete
const deletePost=async (req,res)=>{
    const post=await Post.findByIdAndDelete(req.params.id);
    try{
        res.status(204).json({message:"Post Deleted Successfully"});
    }
    catch(err){
        res.status(401).josn({message:err.message});
    }
}

module.exports={
    getPosts,
    addPost,
    editPost,
    deletePost
}