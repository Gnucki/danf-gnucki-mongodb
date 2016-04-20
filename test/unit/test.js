'use strict';

var assert = require('assert'),
    path = require('path'),
    TestHelper = require('danf/lib/server/test/test-helper')
;

var cappedOptions = {
        capped: true,
        size: 1000192,
        max: 1000
    },
    configuration = TestHelper.utils.merge(
        TestHelper.builder.buildSideConfiguration(
            path.join(__dirname, '../..'),
            {},
            'server'
        ),
        {
            config: {
                this: {
                    // Define the list of connections.
                    connections: {
                        // Define a connection of name "forum" on the database "danf-test".
                        forum: {
                            // Define the mongodb connection URL and additional options.
                            // (https://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html#the-url-connection-format)
                            url: 'mongodb://localhost:27017/danf-test',
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
                        // Define a connection of name "user" on the database "danf-test".
                        user: {
                            url: 'mongodb://127.0.0.1:27017/danf-test',
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
                                    options: cappedOptions
                                }
                            }
                        }
                    }
                },
                sequences: {
                    consultTopic: {
                        stream: {
                            topicId: {
                                type: 'object',
                                required: true
                            }
                        },
                        operations: [
                            // Find the topic.
                            {
                                order: 0,
                                service: 'db.forum.collection.topics',
                                method: 'findOne',
                                arguments: [
                                    {_id: '@topicId@'}
                                ],
                                scope: 'topic'
                            },
                            // Increase the views number of the topic simultaneously
                            // (same orders = parallel execution).
                            {
                                order: 0,
                                service: 'db.forum.collection.topics',
                                method: 'updateOne',
                                arguments: [
                                    {_id: '@topicId@'},
                                    {$inc: {views: 1}}
                                ]
                            },
                            // Find the related forum after topic retrieving
                            // (different orders = sequential execution).
                            {
                                order: 1,
                                service: 'db.forum.collection.forums',
                                method: 'findOne',
                                arguments: [
                                    {_id: '@topic.forum@'}
                                ],
                                scope: 'forum'
                            },
                            // Find the topic with updated views.
                            {
                                order: 1,
                                service: 'db.forum.collection.topics',
                                method: 'findOne',
                                arguments: [
                                    {_id: '@topic._id@'}
                                ],
                                scope: 'topic'
                            }
                        ]
                    }
                }
            }
        },
        true
    ),
    context = {
        verbosity: 0
    }
;

TestHelper.use(configuration, context, function(testHelper) {
    describe('Gnucki Danf MongoDB', function() {
        describe('config', function() {
            it('should imply databases and collections services creation', function() {
                var db = testHelper.getService('db.user'),
                    usersCollection = testHelper.getService('db.user.collection.users'),
                    topicsCollection = testHelper.getService('db.forum.collection.topics')
                ;

                assert.equal(db.name, 'danf-test');
                assert.equal(db.id, 'user');
                assert.equal(usersCollection.name, 'authors');
                assert.equal(topicsCollection.name, 'topics');
            })

            it('should imply databases and collections creation', function(done) {
                var db = testHelper.getService('db.forum'),
                    utils = testHelper.getService('danf:utils')
                ;

                db.driver.listCollections().toArray(function(err, items) {
                    var collections = {};

                    for (var i = 0; i < items.length; i++) {
                        collections[items[i]['name']] = items[i]['options'] || true;
                    }

                    assert(collections.topics);
                    assert(collections.authors);

                    var connectionCollection = utils.clone(collections.connections);

                    delete connectionCollection.create;
                    assert.deepEqual(connectionCollection, cappedOptions);

                    done();
                });
            })
        })

        describe('Collection', function() {
            var topicId;

            before(function(done) {
                // Initialize test database.
                var topicsCollection = testHelper.getService('db.forum.collection.topics'),
                    forumsCollection = testHelper.getService('db.forum.collection.forums')
                ;

                forumsCollection.driver.insertOne({title: 'foobar'}, {}, function(error, result) {
                    topicsCollection.driver.insertMany(
                        [
                            {
                                title: 'foo',
                                forum: result.insertedId,
                                views: 0
                            },
                            {
                                title: 'bar',
                                forum: result.insertedId,
                                views: 2
                            }
                        ],
                        function(error, results) {
                            topicId = results.insertedIds[0];

                            done();
                        }
                    );
                });
            })

            it('should allow to handle asynchronicity with sequences', function(done) {
                var sequence = testHelper.getSequence('consultTopic');

                sequence.execute({topicId: topicId}, {}, '.', null, function(output) {
                    var forum = output.forum,
                        forumId = forum._id
                    ;

                    delete forum._id;
                    assert.deepEqual(output.forum, {title: 'foobar'});

                    var topic = output.topic;

                    delete topic._id;
                    assert.deepEqual(
                        output.topic,
                        {
                            title: 'foo',
                            forum: forumId,
                            views: 1
                        }
                    );

                    done();
                });
            })
        })
    })

    after(function() {
        // Clear test db.
        var db = testHelper.getService('db.forum');

        db.driver.dropDatabase();
    })
})