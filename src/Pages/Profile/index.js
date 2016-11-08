module.exports = {
    path: 'profile',

    childRoutes: [
        {
            path: 'academy',
            component: require("./Academy"), 
        },
        {
            path: 'major',
            component: require("./Major"), 
        },
    ],
}