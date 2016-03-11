'use strict';

/**
 * Expose `Db`.
 */
module.exports = Db;

/**
 * Initialize a new db.
 */
function Db() {
    this._collections = {};
}

Db.defineImplementedInterfaces(['db']);

Db.defineDependency('_connectionUrl', 'string');
Db.defineDependency('_connectionOptions', 'object');
Db.defineDependency('_mongodb', 'function');
Db.defineDependency('_collections', 'collection_object');

/**
 * Init.
 */
Db.prototype.__init = function() {
    this.__asyncProcess(function(async) {
        // Start connection.
        this._mongodb.MongoClient.connect(
            this._connectionUrl,
            this._connectionOptions,
            async(function(err, db) {
                if (err) {
                    throw err;
                }

                this._driver = db;

                this.__asyncProcess(function(async) {
                    db.listCollections().toArray(
                        async(function(err, items) {
                            var collections = {};

                            for (var i = 0; i < items.length; i++) {
                                collections[items[i].name] = items[i];
                            }

                            // Create and fetch associated collections.
                            for (var id in this._collections) {
                                var collection = this._collections[id];

                                if (collections[collection.name]) {
                                    collection.fetch();
                                } else {
                                    collection.create();
                                }
                            }
                        })
                    );
                });
            })
        );
    });
}

/**
 * MongoDB main object.
 *
 * @var {object}
 * @api public
 */
Object.defineProperty(Db.prototype, 'mongodb', {
    set: function(mongodb) { this._mongodb = mongodb; }
});

/**
 * @interface {db}
 */
Object.defineProperty(Db.prototype, 'driver', {
    get: function() { return this._driver; }
});

/**
 * @interface {db}
 */
Object.defineProperty(Db.prototype, 'collections', {
    set: function(collections) {
        for (var i = 0; i < collections.length; i++) {
            this.addCollection(collections[i]);
        }
    },
    get: function() { return this._collections; }
});

/**
 * @interface {db}
 */
Object.defineProperty(Db.prototype, 'id', {
    set: function(id) { this._id = id; },
    get: function() { return this._id; }
});

/**
 * @interface {db}
 */
Object.defineProperty(Db.prototype, 'name', {
    get: function() { return this.databaseName; }
});

/**
 * Connection URL.
 *
 * @var {string}
 * @api public
 */
Object.defineProperty(Db.prototype, 'connectionUrl', {
    set: function(connectionUrl) { this._connectionUrl = connectionUrl; }
});

/**
 * Connection options.
 *
 * @var {object}
 * @api public
 */
Object.defineProperty(Db.prototype, 'connectionOptions', {
    set: function(connectionOptions) { this._connectionOptions = connectionOptions; }
});

/**
 * Add a collection.
 *
 * @param {object} collection The collection.
 * @api public
 */
Db.prototype.addCollection = function(collection) {
    collection.db = this;
    this._collections[collection.id] = collection;
}

// Proxy on driver interface.
// Take a look at http://mongodb.github.io/node-mongodb-native/
// for latest API documentation.
/**
 * @interface {db}
 */
Object.defineProperty(Db.prototype, 'serverConfig', {
    get: function() { return this._driver.serverConfig; }
});

/**
 * @interface {db}
 */
Object.defineProperty(Db.prototype, 'bufferMaxEntries', {
    get: function() { return this._driver.bufferMaxEntries; }
});

/**
 * @interface {db}
 */
Object.defineProperty(Db.prototype, 'databaseName', {
    get: function() { return this._driver.databaseName; }
});

/**
 * @interface {db}
 */
Object.defineProperty(Db.prototype, 'options', {
    get: function() { return this._driver.options; }
});

/**
 * @interface {db}
 */
Object.defineProperty(Db.prototype, 'native_parser', {
    get: function() { return this._driver.native_parser; }
});

/**
 * @interface {db}
 */
Object.defineProperty(Db.prototype, 'slaveOk', {
    get: function() { return this._driver.slaveOk; }
});

/**
 * @interface {db}
 */
Object.defineProperty(Db.prototype, 'writeConcern', {
    get: function() { return this._driver.writeConcern; }
});

/**
 * @interface {db}
 */
Db.prototype.addUser = function(username, password, options) {
    this.__asyncProcess(function(async) {
        this._driver.addUser(
            username,
            password,
            async(function(err, result) {
                if (err) {
                    throw err;
                }

                return result;
            })
        );
    });
}

/**
 * @interface {db}
 */
Db.prototype.admin = function() {
    return this._driver.admin();
}

/**
 * @interface {db}
 */
Db.prototype.authenticate = function(username, password, options) {
    this.__asyncProcess(function(async) {
        this._driver.authenticate(
            username,
            password,
            async(function(err, result) {
                if (err) {
                    throw err;
                }

                return result;
            })
        );
    });
}

/**
 * @interface {db}
 */
Db.prototype.close = function(force) {
    this.__asyncProcess(function(async) {
        this._driver.close(
            force,
            async(function(err, result) {
                if (err) {
                    throw err;
                }

                return result;
            })
        );
    });
}

/**
 * @interface {db}
 */
Db.prototype.collection = function(name, options) {
    this.__asyncProcess(function(async) {
        this._driver.collection(
            name,
            options,
            async(function(err, collection) {
                if (err) {
                    throw err;
                }

                return collection;
            })
        );
    });
}

/**
 * @interface {db}
 */
Db.prototype.command = function(command, options) {
    this.__asyncProcess(function(async) {
        this._driver.command(
            command,
            options,
            async(function(err, result) {
                if (err) {
                    throw err;
                }

                return result;
            })
        );
    });
}

/**
 * @interface {db}
 */
Db.prototype.createCollection = function(name, options) {
    this.__asyncProcess(function(async) {
        this._driver.createCollection(
            name,
            options,
            async(function(err, collection) {
                if (err) {
                    throw err;
                }

                return collection;
            })
        );
    });
}

/**
 * @interface {db}
 */
Db.prototype.createIndex = function(name, fieldOrSpec, options) {
    this.__asyncProcess(function(async) {
        this._driver.createIndex(
            name,
            fieldOrSpec,
            options,
            async(function(err, result) {
                if (err) {
                    throw err;
                }

                return result;
            })
        );
    });
}

/**
 * @interface {db}
 */
Db.prototype.db = function(name, options) {
    return this._driver.db(name, options);
}

/**
 * @interface {db}
 */
Db.prototype.dropCollection = function(name) {
    this.__asyncProcess(function(async) {
        this._driver.dropCollection(
            name,
            async(function(err, result) {
                if (err) {
                    throw err;
                }

                return result;
            })
        );
    });
}

/**
 * @interface {db}
 */
Db.prototype.dropDatabase = function() {
    this.__asyncProcess(function(async) {
        this._driver.dropDatabase(
            async(function(err, result) {
                if (err) {
                    throw err;
                }

                return result;
            })
        );
    });
}

/**
 * @interface {db}
 */
Db.prototype.executeDbAdminCommand = function(command, options) {
    this.__asyncProcess(function(async) {
        this._driver.executeDbAdminCommand(
            command,
            options,
            async(function(err, result) {
                if (err) {
                    throw err;
                }

                return result;
            })
        );
    });
}

/**
 * @interface {db}
 */
Db.prototype.indexInformation = function(name, options) {
    this.__asyncProcess(function(async) {
        this._driver.indexInformation(
            name,
            options,
            async(function(err, result) {
                if (err) {
                    throw err;
                }

                return result;
            })
        );
    });
}

/**
 * @interface {db}
 */
Db.prototype.listCollections = function(filter, options) {
    return this._driver.listCollections(filter, options);
}

/**
 * @interface {db}
 */
Db.prototype.logout = function(options) {
    this.__asyncProcess(function(async) {
        this._driver.logout(
            options,
            async(function(err, result) {
                if (err) {
                    throw err;
                }

                return result;
            })
        );
    });
}

/**
 * @interface {db}
 */
Db.prototype.removeUser = function(username, options) {
    this.__asyncProcess(function(async) {
        this._driver.removeUser(
            username,
            options,
            async(function(err, result) {
                if (err) {
                    throw err;
                }

                return result;
            })
        );
    });
}

/**
 * @interface {db}
 */
Db.prototype.stats = function(options) {
    this.__asyncProcess(function(async) {
        this._driver.stats(
            options,
            async(function(err, result) {
                if (err) {
                    throw err;
                }

                return result;
            })
        );
    });
}