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
            name: '@_@',
            connectionUrl: '@url@',
            options: '@options@'
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
        factories: {
            db: {
                declinations: '!collections!',
                properties: {
                    name: '@name@',
                    document: '@document@',
                    creationOptions: '@creationOptions@',
                    indexes: '@indexes@',
                }
            }
        }
    }
};