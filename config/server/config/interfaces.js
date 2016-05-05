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
        },
        setters: {
            /**
             * The collections.
             *
             * @var collection_object
             */
            collections: 'collection_object',
        }
    },
    collection: {
        methods: {
            /**
             * Create a collection.
             */
            create: {},
            /**
             * Fetch a collection.
             */
            fetch: {},
            // Proxy on driver interface.
            // Take a look at http://mongodb.github.io/node-mongodb-native/
            // for latest API documentation.
            aggregate: {
                arguments: ['pipeline/object', 'object|null/options']
            },
            bulkWrite: {
                arguments: ['operations/mixed_object_array', 'object|null/options']
            },
            count: {
                arguments: ['object/query', 'object|null/options']
            },
            createIndex: {
                arguments: ['string|object/fieldOrSpec', 'object|null/options']
            },
            createIndexes: {
                arguments: ['mixed_object_array/indexSpecs']
            },
            deleteMany: {
                arguments: ['object/filter', 'object|null/options']
            },
            deleteOne: {
                arguments: ['object/filter', 'object|null/options']
            },
            distinct: {
                arguments: ['string/key', 'object/query', 'object|null/options']
            },
            drop: {},
            dropIndex: {
                arguments: ['string/indexName', 'object|null/options']
            },
            dropIndexes: {},
            find: {
                arguments: ['object/query'],
                returns: 'object'
            },
            findOne: {
                arguments: ['object/query', 'object|null/options']
            },
            findOneAndDelete: {
                arguments: ['object/filter', 'object|null/options']
            },
            findOneAndReplace: {
                arguments: ['object/filter', 'object/replacement', 'object|null/options']
            },
            findOneAndUpdate: {
                arguments: ['object/filter', 'object/update', 'object|null/options']
            },
            geoHaystackSearch: {
                arguments: ['number/x', 'number/y', 'object|null/options']
            },
            geoNear: {
                arguments: ['number/x', 'number/y', 'object|null/options']
            },
            getIndexes: {
                arguments: ['string/name', 'object|null/options']
            },
            getOptions: {
                arguments: []
            },
            group: {
                arguments: [
                    'object|array|function/keys',
                    'object/condition',
                    'object/initial',
                    'function/reduce',
                    'function/finalize',
                    'boolean/command',
                    'object|null/options'
                ]
            },
            indexExists: {
                arguments: ['string|string_array/indexes']
            },
            indexInformation: {
                arguments: ['object|null/options']
            },
            initializeOrderedBulkOp: {
                arguments: ['string/name', 'object|null/options'],
                returns: 'object'
            },
            initializeUnorderedBulkOp: {
                arguments: ['string/name', 'object|null/options'],
                returns: 'object'
            },
            insertMany: {
                arguments: ['mixed_object_array/docs', 'object|null/options']
            },
            insertOne: {
                arguments: ['object/doc', 'object|null/options']
            },
            isCapped: {},
            listIndexes: {
                arguments: ['object|null/options'],
                returns: 'object'
            },
            mapReduce: {
                arguments: ['string|function/map', 'string|function/reduce', 'object|null/options']
            },
            parallelCollectionScan: {
                arguments: ['object|null/options']
            },
            reIndex: {},
            replaceOne: {
                arguments: ['object/filter', 'object/doc', 'object|null/options']
            },
            stats: {
                arguments: ['object|null/options']
            },
            updateMany: {
                arguments: ['object/filter', 'object/update', 'object|null/options']
            },
            updateOne: {
                arguments: ['object/filter', 'object/update', 'object|null/options']
            }
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
             * The related driver collection object.
             *
             * @var string
             */
            driver: 'object',
            /**
             * The related db object.
             *
             * @var string
             */
            db: 'db',
            // Proxy on driver interface.
            // Take a look at http://mongodb.github.io/node-mongodb-native/
            // for latest API documentation.
            collectionName: 'string',
            namespace: 'string',
            writeConcern: 'object',
            readConcern: 'object',
            hint: 'object'
        },
        setters: {
            /**
             * The related db object.
             *
             * @var string
             */
            db: 'db'
        }
    }
};