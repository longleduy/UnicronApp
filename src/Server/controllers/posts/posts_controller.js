//Todo: Model
import {postModel} from '../../models/posts_model'
import {client} from '../../config/redis'
import * as Promise from 'bluebird'
import delay from 'delay'

const asyncClient = Promise.promisifyAll(client);
export const getAllPost = async (limitNumber) => {
    const data = await postModel.find();
    if (data.length > 0) {
        return data
    }
    throw new Error('Empty list')
}
export const getLimitedPosts = async (limitNumber) => {
    const data = await postModel.find().limit(limitNumber);
    if (data.length > 0) {
        return data
    }
    throw new Error('Empty list')
}
export const getPostInfo = async (_id) => {
    let data = await asyncClient.hgetallAsync(_id);
    data["post_id"] = _id;
    return data;
}
export const getCountInfo = async (_id) => {
    const likeId = `like-${_id}`;
    const cmtId = `cmt-${_id}`;
    const viewId = `view-${_id}`;
    const likeCountAsync = asyncClient.scardAsync(likeId);
    const likedAsync = asyncClient.sismemberAsync(likeId,"Khanh");
    const cmtCountAsync =  asyncClient.llenAsync(cmtId);
    const viewCountAsync = asyncClient.llenAsync(viewId);
    const likeCount = await likeCountAsync;
    const liked = await likedAsync;
    const cmtCount = await cmtCountAsync;
    const viewCount = await viewCountAsync;

    return {
        like: likeCount,
        liked: liked == 1?true:false,
        comment: cmtCount,
        view: viewCount 
    };
}