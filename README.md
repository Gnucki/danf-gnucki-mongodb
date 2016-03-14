danf-gnucki-mongodb
======================

Danf module for mongoDB

Use as a danf module
--------------------

Add the module to your `package.json`:
```sh
npm install danf-gnucki-mongodb --save
```

Execute tests
-------------

```sh
$ make test
```

Use
---

### Define connections

```javascript
gnuckiMongodb: {
    // Define the list of connections.
    connections: {
        // Define a connection of name "forum" on the database "forum".
        forum: {
            // Define the mongodb connection URL and additional options.
            // (https://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html#the-url-connection-format)
            url: 'mongodb://localhost:27017/forum',
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
        // Define a connection of name "user" on the database "users".
        user: {
            url: 'mongodb://127.0.0.1:27017/users',
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
```

### Request a collection

In a sequence:

```javascript

// config/server/config/sequences.js

'use strict';

module.exports = {
    consultTopic: {
        stream: {
            topicId: {
                type: 'object|string',
                required: true
            }
        },
        operations: [
            // Find the topic.
            {
                order: 0,
                service: 'gnuckiMongodb:db.forum.collection.topics',
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
                service: 'gnuckiMongodb:db.forum.collection.topics',
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
                service: 'gnuckiMongodb:db.forum.collection.forums',
                method: 'findOne',
                arguments: [
                    {_id: '@topic.forum@'}
                ],
                scope: 'forum'
            }
        ]
    }
};
```

> Take a look at the [documentation of the native driver](http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html) for a list of available methods.

Todo
----

- create indexes
- check document format: insert + update $set
- override the default collection: 'gnuckiMongodb:db.forum.collection.topics': {parent: 'gnuckiMongodb:db.forum.collection.proxy', properties: { collection: '#gnuckiMongodb:db.forum.collection.topics.default#'}} // 'gnuckiMongodb:db.forum.collection.topics': {alias: gnuckiMongodb:db.forum.collection.topics.default}
- type document: find cursor set __implement on objetcs of "free" interfaces
- handle mongoId and references: custom dataResolver with a dataInterpreter decoding types "gnuckiMongodb.document.."
- handle collection and db events
- handle stream cursor
- clean useless files and documentation
- make tests
- npm publish