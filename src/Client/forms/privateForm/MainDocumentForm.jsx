import React, { Fragment, Component, PureComponent } from 'react'
import { withRouter, Link, Route, NavLink } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { List } from '../../utils/contant/main_list_framework'
import PostForm from '../../forms/privateForm/MainDocumentChild/PostFrom.jsx'
import NewsFrom from '../../forms/privateForm/MainDocumentChild/NewsForm.jsx'

class MainDocumentForm extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            viewLog: false,
            open: false
        }
    }
    showLibLink = (frameWork) => {
        return List[frameWork].lib_list.map((lib, key) => {
            return <Link to="#" key={key}>
                <Button color="inherit" className="no-upper color-w no-bgc lib-btn">{lib}</Button>
            </Link>
        })
    }
    render() {
        const { pathname } = this.props.location;
        const { url } = this.props.match;
        const frameWork = pathname.split('/')[1];
        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    className="demo"
                    transitionName="example"
                    transitionAppear={true}
                    transitionAppearTimeout={100}
                    transitionEnterTimeout={100}
                    transitionLeaveTimeout={100}>
                    <div className="main-sign flex-div-col main-height js-unset">
                        <Grid container className="flex-div-row">
                            <div className="banner">
                                <img src={require(`../../../../public/images/maindoc/${frameWork}-baner.png`)} className="banner-img" />
                            </div>
                            <div className="lib-img-banner flex-div-row">
                                {this.showLibLink(frameWork)}
                            </div>
                        </Grid>
                    </div>
                    <div className="flex-div-col main-height2 post-list js-unset ali-unset">
                        <Grid item xs={4} className="menu-list">
                            <NavLink to={`${url}/posts`} activeClassName="active-menu-list-link">
                                <Button color="inherit" className="no-upper color-w no-bgc menu-list-btn hover2">
                                    <i className="mdi mdi-wechat" />
                                    <label>Post</label>
                                </Button>
                            </NavLink>
                            <NavLink to={`${url}/news`} activeClassName="active-menu-list-link">
                                <Button color="inherit" className="no-upper color-w no-bgc menu-list-btn hover2">
                                    <i className="mdi mdi-file-document" />
                                    <label>News</label>
                                </Button>
                            </NavLink>
                        </Grid>
                        <Grid item xs={12} className="menu-list">
                                <Route path={`${url}/posts`} render={props => <PostForm />} />
                                <Route path={`${url}/news`} render={props => <NewsFrom />} />
                        </Grid>
                    </div>
                </ReactCSSTransitionGroup>
            </Fragment >
        )
    }
}
export default withRouter(MainDocumentForm)
