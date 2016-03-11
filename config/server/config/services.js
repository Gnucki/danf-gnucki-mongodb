'use strict';

module.exports = {
    mongodb: {
        class: 'vendor.mongodb'
    },
    db: {
        collections: ['db'],
        class: 'db',
        declinations: '$connections$',
        properties: {
            id: '@_@',
            connectionUrl: '@url@',
            connectionOptions: '@options@',
            mongodb: '#mongodb#'
        },
        induced: {
            collection: {
                service: 'collection',
                factory: 'db',
                context: '@.@',
                property: 'collections',
                collection: true
            }
        }
    },
    collection: {
        collections: ['collection'],
        class: 'collection',
        properties: {
            mongodb: '#mongodb#'
        },
        factories: {
            db: {
                declinations: '!collections!',
                properties: {
                    id: '@_@',
                    name: '@name@',
                    document: '@document@',
                    options: '@options@',
                    indexes: '@indexes@'
                }
            }
        }
    }
};