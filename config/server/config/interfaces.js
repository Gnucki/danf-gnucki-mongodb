'use strict';

module.exports = {
    db: {
        methods: {
            // Proxy on driver interface.
            // Take a look at http://mongodb.github.io/node-mongodb-native/
            // for latest API documentation.
            addUser: {
                arguments: ['string/username', 'string/password', 'object|null/options']
            },
            admin: {
                returns: 'object'
            },
            authenticate: {
                arguments: ['string/username', 'string/password', 'object|null/options']
            },
            close: {
                arguments: ['boolean/force']
            },
            collection: {
                arguments: ['string/name', 'object|null/options']
            },
            command: {
                arguments: ['name/command', 'object|null/options']
            },
            createCollection: {
                arguments: ['string/name', 'object|null/options']
            },
            createIndex: {
                arguments: ['string/name', 'string|object/fieldOrSpec', 'object|null/options']
            },
            db: {
                arguments: ['string/name', 'object|null/options'],
                returns: 'object'
            },
            dropCollection: {
                arguments: ['string/name']
            },
            dropDatabase: {},
            executeDbAdminCommand: {
                arguments: ['name/command', 'object|null/options']
            },
            indexInformation: {
                arguments: ['string/name', 'object|null/options']
            },
            listCollections: {
                arguments: ['object|null/filter', 'object|null/options'],
                returns: 'object'
            },
            logout: {
                arguments: ['object|null/options']
            },
            removeUser: {
                arguments: ['string/username', 'object|null/options']
            },
            stats: {
                arguments: ['object|null/options']
            },
        },
        getters: {
            /**
             * The identifier name of the database.
             *
             * @var string
             */
            id: 'string',
            /**
             * The name of the database.
             *
             * @var string
             */
            name: 'string',
            /**
             * The related driver db object.
             *
             * @var string
             */
            driver: 'object',
            // Proxy on driver interface.
            // Take a look at http://mongodb.github.io/node-mongodb-native/
            // for latest API documentation.
            serverConfig: 'object',
            bufferMaxEntries: 'number',
            databaseName: 'string',
            options: 'object',
            native_parser: 'boolean',
            slaveOk: 'boolean',
            writeConcern: 'object'
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