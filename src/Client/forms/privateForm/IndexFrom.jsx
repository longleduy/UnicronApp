import React, { Fragment, PureComponent, Component } from 'react'
import { withApollo, Query } from "react-apollo"
import { withRouter } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import LinearProgress from '@material-ui/core/LinearProgress'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Loader from 'react-loaders'
import { errorHandler } from '../../utils/errorHandler'
import { GET_LIMITED_POSTS, GET_ALL_POSTS } from '../../utils/contant/graphql/posts_contants'
import QueryPRD from '../../utils/form/props_render_component/QueryPRD.jsx'
class IndexForm extends Component {
    constructor(props) {
        super(props);
    }
    showProgress = () => {
        return <LinearProgress className="my-progress-bar" />
    }
    showPosts = (list) => {
        return list.map((post, key) => {
            return (<Grid item xs={12} key={key} className="posts-list">
                <Grid item xs={1} className="posts-item flex-div">
                    <div className="div-img flex-div">
                        <img className="avatar" src={require(`../../../../public/images/logo/${post.author}`)} />
                    </div>
                </Grid>
                <Grid item xs={5} className="posts-item">
                    <Grid container>
                        <Grid item xs={12} className="content-posts-item">
                            <label>{post.content}</label>
                        </Grid>
                        <Grid item xs={6} className="time-posts-item">
                            <i className="mdi mdi-calendar-clock w" />
                            <label>{post.date}</label>
                            <i className="mdi mdi-clock w" />
                            <label>{post.time}</label>
                        </Grid>
                        <Grid item xs={6} className="role-posts-item">
                            <i className="mdi mdi-help-circle-outline w" />
                            <label>{post.role}</label>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={2} className="like-item flex-div-col">
                    <Grid container>
                        <Grid item xs={4} className="flex-div-col like">
                            <i className={`${post.info.count.liked ? "liked" : ''} mdi mdi-star w`} />
                            <label className={`${post.info.count.liked ? "liked" : ''}`}>{post.info.count.like}</label>
                        </Grid>
                        <Grid item xs={4} className="flex-div-col comment">
                            <i className="mdi mdi-comment-processing-outline w" />
                            <label>{post.info.count.comment}</label>
                        </Grid>
                        <Grid item xs={4} className="flex-div-col view">
                            <i className="mdi mdi-eye-outline w" />
                            <label>{post.info.count.view}</label>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4} className="comment-item flex-div-col ali-unset">
                    <label>{post.info.first_cmt_author}</label>
                    <label className="posts-first-comment">{post.info.first_comment}</label>
                </Grid>
            </Grid>)
        })
    }
    render() {
        return <Fragment>
            <div className="main-home-public index-div flex-div post-list main-height js-unset">
                <QueryPRD query={GET_LIMITED_POSTS} variables={{ limitNumber: 5 }} queryPRD={({ loading, error, data }) => {
                 if(loading)   return <Fragment>
                        <div>
                        <Loader type="ball-pulse" />
                        </div>
                    </Fragment>
                    return <Fragment>
                        <ReactCSSTransitionGroup
                            className="demo"
                            transitionName="example"
                            transitionAppear={true}
                            transitionAppearTimeout={200}
                            transitionEnterTimeout={200}
                            transitionLeaveTimeout={200}>
                            <Grid item xs={12} className="menu-list">
                                <Grid item xs={12} className="flex">
                                    <Grid item xs={1} className="menu-role-title">
                                        <span className="h100 w100 flex-div">
                                             <label>Post</label>
                                        </span>
                                    </Grid>
                                    <Grid item xs={10}>
                                        {this.showPosts(data.getLimitedPosts)}
                                    </Grid>
                                    <Grid item xs={1}>

                                    </Grid>
                                </Grid>
                            </Grid>
                        </ReactCSSTransitionGroup>
                    </Fragment>
                }} />
            </div>

        </Fragment >
    }

}
export default withRouter(withApollo(IndexForm));
