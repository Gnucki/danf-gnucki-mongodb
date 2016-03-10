'use strict';

/**
 * Expose `Collection`.
 */
module.exports = Collection;

/**
 * Initialize a new collection.
 */
function Collection() {
}

Collection.defineImplementedInterfaces(['collection']);

Collection.defineDependency('_name', 'string');
Collection.defineDependency('_mongodb', 'function');
Collection.defineDependency('_db', 'db');

/**
 * MongoDB main object.
 *
 * @var {object}
 * @api public
 */
Object.defineProperty(Collection.prototype, 'mongodb', {
    set: function(mongodb) { this._mongodb = mongodb; }
});

/**
 * @interface {collection}
 */
Object.defineProperty(Collection.prototype, 'driver', {
    get: function() { return this._driver; }
});

/**
 * @interface {collection}
 */
Object.defineProperty(Collection.prototype, 'db', {
    set: function(db) { this._db = db; },
    get: function() { return this._db; }
});

/**
 * @interface {collection}
 */
Object.defineProperty(Collection.prototype, 'name', {
    set: function(name) { this._name = name; },
    get: function() { return this._name; }
});

/**
 * Creation and fetching options.
 *
 * @var {object}
 */
Object.defineProperty(Collection.prototype, 'options', {
    set: function(options) { this._options = options; }
});

/**
 * @interface {collection}
 */
Collection.prototype.create = function() {
    var self = this;

    this.__asyncProcess(function(async) {
        self._db.driver.createCollection(
            self._name,
            self._creationOptions,
            async(function(err, collection) {
                if (err) {
                    throw err;
                }

                self._driver = collection;
            })
        );
    });
}

/**
 * @interface {collection}
 */
Collection.prototype.fetch = function() {
    var self = this;

    this.__asyncProcess(function(async) {
        self._db.driver.collection(
            self._name,
            self._fetchingOptions,
            async(function(err, collection) {
                if (err) {
                    throw err;
                }

                self._driver = collection;
            })
        );
    });
}