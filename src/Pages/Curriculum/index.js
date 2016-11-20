module.exports = {
    path: 'curriculum',

    childRoutes: [
        {
            path: 'course',
            component: require("./Course"), 
        },
        {
            path: 'subject_timetable',
            component: require("./SubjectTimetable"), 
        },
        {
            path: 'subject_student',
            component: require("./SubjectStudent"), 
        },
    ],
}