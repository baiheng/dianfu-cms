module.exports = {
    path: 'profile',

    childRoutes: [
        {
            path: 'student',
            component: require("./Student"), 
        },
        {
            path: 'resume',
            component: require("./Resume"), 
        },
        {
            path: 'feedback',
            component: require("./Feedback"), 
        },
    ],
}