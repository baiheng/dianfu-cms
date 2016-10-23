import React from 'react'
import ReactDOM from 'react-dom'
import { Router, hashHistory, Route, IndexRoute } from 'react-router'


const rootRoute = {
	path: "/",

	component: require('./components/App'),

    indexRoute: {
        component: require('./Home'),
    },

    childRoutes: [
        require('./Home'),
        require('./Login'),
        require('./Pages'),
    ]
}

ReactDOM.render(
	<Router history={hashHistory} routes={rootRoute} />,
	document.getElementById('app')
)