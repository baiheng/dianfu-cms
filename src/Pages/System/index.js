module.exports = {
    path: 'system',

    childRoutes: [
        {
            path: 'user',
            component: require("./User"), 
        },
    ],
}