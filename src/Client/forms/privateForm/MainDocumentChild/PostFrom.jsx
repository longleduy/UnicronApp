import React, { Fragment, Component } from 'react'
import { withRouter } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import LinearProgress from '@material-ui/core/LinearProgress'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const list = [
    {
        author: 'logo.png',
        content: 'Intro to GraphQL in React Using React Apollo & Apollo Boost !',
        date: '02/10/2018',
        time: '16h 02m',
        role: 'Question',
        like: '15',
        comment: '07',
        view: '35',
        first_cmt_author: 'Duy Long',
        first_comment: 'The Apollo GraphQL client is a very popular way to interface with a GraphQL API'

    },
    {
        author: 'angular.png',
        content: 'A React-specific integration for Apollo. It provides us with a lot of goodies like the Query',
        date: '15/06/2018',
        time: '08h 02m',
        role: 'Question',
        like: '03',
        comment: '07',
        view: '25',
        first_cmt_author: 'Quynh Nga',
        first_comment: `The client setup couldn’t be easier. We’ll initiate a client and give it the URI to our 
        GraphQL server endpoint and then use the ApolloProvider`

    }
]

class PostFrom extends Component {
    showProgress = () => {
        return <LinearProgress className="my-progress-bar" />
    }
    showPosts = () => {
      return  list.map((post, key) => {
            return (<Grid item xs={12} key={key} className="posts-list">
                    <Grid item xs={1} className="posts-item flex-div">
                        <div className="div-img flex-div">
                            <img className="avatar" src={require(`../../../../../public/images/logo/${post.author}`)} />
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
                                <i className="mdi mdi-star w" />
                                <label>{post.like}</label>
                            </Grid>
                            <Grid item xs={4} className="flex-div-col comment">
                                <i className="mdi mdi-comment-processing-outline w" />
                                <label>{post.comment}</label>
                            </Grid>
                            <Grid item xs={4} className="flex-div-col view">
                                <i className="mdi mdi-eye-outline w" />
                                <label>{post.view}</label>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4} className="comment-item flex-div-col ali-unset">
                        <label>{post.first_cmt_author}</label>
                        <label className="posts-first-comment">{post.first_comment}</label>
                    </Grid>
                </Grid>)
        })
    }
    render() {
        return (
            <Fragment>
                <Grid item xs={12} className="container-div">
                    {this.showPosts()}
                </Grid>
            </Fragment >
        )
    }

}
export default withRouter(PostFrom)
