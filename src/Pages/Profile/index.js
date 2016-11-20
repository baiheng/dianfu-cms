module.exports = {
    path: 'profile',

    childRoutes: [
        {
            path: 'student',
            component: require("./Student"), 
        },
    ],
}