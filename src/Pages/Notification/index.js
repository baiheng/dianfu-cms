module.exports = {
    path: 'notification',

    childRoutes: [
        {
            path: 'sender',
            component: require("./Sender"), 
        },
        {
            path: 'notification',
            component: require("./Notification"), 
        },
        {
            path: 'company',
            component: require("./Company"), 
        },
        {
            path: 'campus_recruitment',
            component: require("./CampusRecruitment"), 
        },
        {
            path: 'trainee_recruitment',
            component: require("./TraineeRecruitment"), 
        },
        {
            path: 'part_time',
            component: require("./PartTime"), 
        },
        {
            path: 'join_part_time',
            component: require("./JoinPartTime"), 
        },
        {
            path: 'job_guide',
            component: require("./JobGuide"), 
        },
    ],
}