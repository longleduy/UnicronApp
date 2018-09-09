import React, { Fragment, Component } from 'react'

import HomePublicForm from '../../forms/publicForm/HomePublicForm.jsx'

export default class HomePublic extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Fragment>
                <HomePublicForm/>
            </Fragment>
        )
    }

}
