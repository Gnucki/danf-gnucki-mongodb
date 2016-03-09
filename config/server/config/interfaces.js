'use strict';

module.exports = {
    db: {
        methods: {
            listCollections: {}
        },
        getters: {
            name: 'string'
        }
    },
    collection: {
        methods: {
            create: {},
            fetch: {}
        },
        getters: {
            name: 'string',
            db: 'db'
        },
        setters: {
            db: 'db'
        }
    }
};