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

Db.defineDependency('_name', 'string');
Db.defineDependency('_connectionUrl', 'string');
Db.defineDependency('_connectionOptions', 'object');
Db.defineDependency('_mongodb', 'function');
Db.defineDependency('_collections', 'collection_object');

/**
 * Init.
 */
Db.prototype.__init = function() {
    var self = this;

    this.__asyncProcess(function(async) {
        self._mongodb.MongoClient.connect(
            this._connectionUrl,
            this._connectionOptions,
            async(function(err, db) {
                if (err) {
                    throw err;
                }
console.log(0);
                self._driver = db;

                self.__asyncProcess(function(async) {
                    db.listCollections().toArray(
                        async(function(err, items) {
                            var collections = {};

                            for (var i = 0; i < items.length; i++) {
                                collections[name] = items[i];
                            }

                            for (var name in self._collections) {
                                var collection = self._collections[name];

                                if (collections[name]) {
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
Object.defineProperty(Db.prototype, 'name', {
    set: function(name) { this._name = name; },
    get: function() { return this._name; }
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
    this._collections[collection.name] = collection;
}

/**
 * @interface {db}
 */
Db.prototype.listCollections = function() {console.log(1);
    this._driver.listCollections.apply(
        this._driver,
        Array.prototype.slice.call(arguments, 1)
    );
}