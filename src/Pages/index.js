module.exports = {
    path: 'pages',

    getChildRoutes(location, cb) {
        require.ensure([], (require) => {
            cb(null, [
                require('./System'),
            ])
        })
    },

    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, require('./components/Framework'))
        })
    },
}