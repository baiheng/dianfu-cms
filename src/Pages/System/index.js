module.exports = {
    path: 'system',

    childRoutes: [
        {
            path: 'account',
            component: require("./Account"), 
        },
        {
            path: 'school_account',
            component: require("./SchoolAccount"), 
        },
        {
            path: 'school',
            component: require("./School"), 
        },
        {
            path: 'teacher',
            component: require("./Teacher"), 
        },
        {
            path: 'academy',
            component: require("./Academy"), 
        },
        {
            path: 'major',
            component: require("./Major"), 
        },
        {
            path: 'all_settings',
            component: require("./AllSettings"), 
        },
    ],
}