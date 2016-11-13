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
        {
            path: 'student',
            component: require("./Student"), 
        },
        {
            path: 'student_new',
            component: require("./StudentNew"), 
        },
    ],
}