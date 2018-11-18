import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { withRouter } from 'react-router'

import MiApp from './MiApp'

class Routes extends React.Component {
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0)
        }
    }
    componentDidMount() {
        // this.props.askLocation(this.props.match.params.lang)
    }

    render() {
        return (
            <Switch>
                <Route exact path={'/'} component={MiApp} />
                <Route component={MiApp} />
            </Switch>
        )
    }
}

export default withRouter(Routes)
