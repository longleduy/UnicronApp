import mongoose from 'mongoose';
const postSchema = mongoose.Schema({
    author: {type: String,require:true},
    content: {type: String,require:true},
    date: {type: String,require:true},
    time: {type: String,require:true},
    role: {type: String,require:true},
    liked: {type: Boolean},
    like: {type: Number,require:true},
    comment: {type: Number,require:true},
    view: {type: Number,require:true},
    first_cmt_author: {type: String},
    first_comment: {type: String}

});
export const postModel = mongoose.model('posts', postSchema);