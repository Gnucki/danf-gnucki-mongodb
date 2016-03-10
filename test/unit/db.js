'use strict';

var assert = require('assert'),
    path = require('path'),
    TestHelper = require('danf/lib/server/test/test-helper')
;

var configuration = TestHelper.utils.merge(
        TestHelper.builder.buildSideConfiguration(
            path.join(__dirname, '../..'),
            'server'
        ),
        {
            config: {
                this: {
                    // Define the list of connections.
                    connections: {
                        // Define a connection of name "forum" on the database "test".
                        forum: {
                            // Define the mongodb connection URL and additional options.
                            // (https://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html#the-url-connection-format)
                            url: 'mongodb://localhost:27017/test',
                            options: {
                                server: {
                                    poolSize: 2
                                }
                            },
                            // Define the collections in the database.
                            collections: {
                                // Define a collection of name "forums".
                                forums: {
                                    // Define a danf contract in order to validate inserted documents.
                                    document: {
                                        title: {
                                            type: 'string',
                                            required: true
                                        }
                                    }
                                },
                                topics: {
                                    document: {
                                        title: {
                                            type: 'string',
                                            required: true
                                        },
                                        forum: {
                                            type: 'string|gnuckiMongodb:document.forum.forums',
                                            required: true
                                        },
                                        views: {
                                            type: 'number',
                                            default: 0
                                        }
                                    },
                                    // Define the collection indexes.
                                    indexes: {
                                        // Define an index of name "forum" on the key "forum"
                                        // with some options.
                                        forum: {
                                            keys: {forum: 1},
                                            options: {
                                                background: true
                                            }
                                        }
                                    }
                                },
                                // Define a simple collection without schema validation.
                                posts: {}
                            }
                        },
                        // Define a connection of name "user" on the database "test".
                        user: {
                            url: 'mongodb://127.0.0.1:27017/test',
                            collections: {
                                users: {
                                    // Override the default collection name of "users"
                                    // with "authors".
                                    name: 'authors',
                                    document: {
                                        username: {
                                            type: 'string',
                                            required: true
                                        },
                                        password: {
                                            type: 'string',
                                            required: true
                                        }
                                    }
                                },
                                connections: {
                                    document: {
                                        ip: {
                                            type: 'string',
                                            required: true
                                        },
                                        date: {
                                            type: 'date',
                                            required: true
                                        },
                                        user: {
                                            type: 'string|gnuckiMongodb:document.user.users',
                                            required: true
                                        }
                                    },
                                    // Define some options for the creation and fetching
                                    // of the collection (used for capped collections for instance).
                                    options: {
                                        capped: true,
                                        size: 1000000,
                                        max: 1000,
                                        w: 1
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        true
    ),
    context = {}
;

TestHelper.use(configuration, context, function(testHelper) {
    describe('Db', function() {
        it('method "..." should ...', function() {
            var db = testHelper.getService('db.forum');

            db.driver.listCollections().toArray(function(err, items) {
                console.log(items);
            });
        })
    })

    run();
})