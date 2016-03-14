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

Collection.defineDependency('_id', 'string');
Collection.defineDependency('_name', 'string');
Collection.defineDependency('_options', 'object');
Collection.defineDependency('_indexes', 'object');
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
Object.defineProperty(Collection.prototype, 'id', {
    set: function(id) { this._id = id; },
    get: function() { return this._id; }
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
 * Indexes.
 *
 * @var {object}
 */
Object.defineProperty(Collection.prototype, 'indexes', {
    set: function(indexes) { this._indexes = indexes; }
});

/**
 * @interface {collection}
 */
Collection.prototype.create = function() {
    this.__asyncProcess(function(async) {
        this._db.driver.createCollection(
            this._name,
            this._options,
            async(function(err, collection) {
                if (err) {
                    throw err;
                }

                this._driver = collection;
            })
        );
    });
}

/**
 * @interface {collection}
 */
Collection.prototype.fetch = function() {
    this.__asyncProcess(function(async) {
        this._db.driver.collection(
            this._name,
            this._options,
            async(function(err, collection) {
                if (err) {
                    throw err;
                }

                this._driver = collection;
            })
        );
    });
}

// Proxy on driver interface.
// Take a look at http://mongodb.github.io/node-mongodb-native/
// for latest API documentation.
/**
 * @interface {collection}
 */
Object.defineProperty(Collection.prototype, 'collectionName', {
    get: function() { return this._driver.collectionName; }
});

/**
 * @interface {collection}
 */
Object.defineProperty(Collection.prototype, 'namespace', {
    get: function() { return this._driver.namespace; }
});

/**
 * @interface {collection}
 */
Object.defineProperty(Collection.prototype, 'writeConcern', {
    get: function() { return this._driver.writeConcern; }
});

/**
 * @interface {collection}
 */
Object.defineProperty(Collection.prototype, 'readConcern', {
    get: function() { return this._driver.readConcern; }
});

/**
 * @interface {collection}
 */
Object.defineProperty(Collection.prototype, 'hint', {
    get: function() { return this._driver.hint; }
});

/**
 * @interface {collection}
 */
Collection.prototype.aggregate = function(pipeline, options) {
    this.__asyncProcess(function(async) {
        this._driver.aggregate(
            pipeline,
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
 * @interface {collection}
 */
Collection.prototype.bulkWrite = function(operations, options) {
    this.__asyncProcess(function(async) {
        this._driver.bulkWrite(
            operations,
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
 * @interface {collection}
 */
Collection.prototype.count = function(query, options) {
    this.__asyncProcess(function(async) {
        this._driver.count(
            query,
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
 * @interface {collection}
 */
Collection.prototype.createIndex = function(fieldOrSpec, options) {
    this.__asyncProcess(function(async) {
        this._driver.createIndex(
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
 * @interface {collection}
 */
Collection.prototype.createIndexes = function(indexSpecs, options) {
    this.__asyncProcess(function(async) {
        this._driver.createIndexes(
            indexSpecs,
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
 * @interface {collection}
 */
Collection.prototype.deleteMany = function(filter, options) {
    this.__asyncProcess(function(async) {
        this._driver.deleteMany(
            filter,
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
 * @interface {collection}
 */
Collection.prototype.deleteOne = function(filter, options) {
    this.__asyncProcess(function(async) {
        this._driver.deleteOne(
            filter,
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
 * @interface {collection}
 */
Collection.prototype.distinct = function(key, query, options) {
    this.__asyncProcess(function(async) {
        this._driver.distinct(
            key,
            query,
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
 * @interface {collection}
 */
Collection.prototype.drop = function() {
    this.__asyncProcess(function(async) {
        this._driver.drop(
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
 * @interface {collection}
 */
Collection.prototype.dropIndex = function(indexName, options) {
    this.__asyncProcess(function(async) {
        this._driver.dropIndex(
            indexName,
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
 * @interface {collection}
 */
Collection.prototype.dropIndexes = function() {
    this.__asyncProcess(function(async) {
        this._driver.dropIndexes(
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
 * @interface {collection}
 */
Collection.prototype.find = function(query) {
    return this._driver.find(query);
}

/**
 * @interface {collection}
 */
Collection.prototype.findOne = function(query, options) {
    this.__asyncProcess(function(async) {
        this._driver.findOne(
            query,
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
 * @interface {collection}
 */
Collection.prototype.findOneAndDelete = function(filter, options) {
    this.__asyncProcess(function(async) {
        this._driver.findOneAndDelete(
            filter,
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
 * @interface {collection}
 */
Collection.prototype.findOneAndReplace = function(filter, replacement, options) {
    this.__asyncProcess(function(async) {
        this._driver.findOneAndReplace(
            filter,
            replacement,
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
 * @interface {collection}
 */
Collection.prototype.findOneAndUpdate = function(command, update, options) {
    this.__asyncProcess(function(async) {
        this._driver.findOneAndUpdate(
            command,
            update,
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
 * @interface {collection}
 */
Collection.prototype.geoHaystackSearch = function(x, y, options) {
    this.__asyncProcess(function(async) {
        this._driver.geoHaystackSearch(
            x,
            y,
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
 * @interface {collection}
 */
Collection.prototype.geoNear = function(x, y, options) {
    this.__asyncProcess(function(async) {
        this._driver.geoNear(
            x,
            y,
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
 * @interface {collection}
 */
Collection.prototype.getIndexes = function() {
    this.__asyncProcess(function(async) {
        this._driver.indexes(
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
 * @interface {collection}
 */
Collection.prototype.getOptions = function() {
    this.__asyncProcess(function(async) {
        this._driver.options(
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
 * @interface {collection}
 */
Collection.prototype.group = function(keys, condition, initial, reduce, finalize, command, options) {
    this.__asyncProcess(function(async) {
        this._driver.group(
            keys,
            condition,
            initial,
            reduce,
            finalize,
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
 * @interface {collection}
 */
Collection.prototype.indexExists = function(indexes) {
    this.__asyncProcess(function(async) {
        this._driver.indexExists(
            indexes,
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
 * @interface {collection}
 */
Collection.prototype.indexInformation = function(options) {
    this.__asyncProcess(function(async) {
        this._driver.indexInformation(
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
 * @interface {collection}
 */
Collection.prototype.initializeOrderedBulkOp = function(options) {
    return this._driver.initializeOrderedBulkOp(options);
}

/**
 * @interface {collection}
 */
Collection.prototype.initializeUnorderedBulkOp = function(options) {
    return this._driver.initializeUnorderedBulkOp(options);
}

/**
 * @interface {collection}
 */
Collection.prototype.insertMany = function(docs, options) {
    this.__asyncProcess(function(async) {
        this._driver.insertMany(
            docs,
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
 * @interface {collection}
 */
Collection.prototype.insertOne = function(doc, options) {
    this.__asyncProcess(function(async) {
        this._driver.insertOne(
            doc,
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
 * @interface {collection}
 */
Collection.prototype.isCapped = function() {
    this.__asyncProcess(function(async) {
        this._driver.isCapped(
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
 * @interface {collection}
 */
Collection.prototype.listIndexes = function(options) {
    return this._driver.listIndexes(options);
}

/**
 * @interface {collection}
 */
Collection.prototype.mapReduce = function(map, reduce, options) {
    this.__asyncProcess(function(async) {
        this._driver.mapReduce(
            map,
            reduce,
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
 * @interface {collection}
 */
Collection.prototype.parallelCollectionScan = function(options) {
    this.__asyncProcess(function(async) {
        this._driver.parallelCollectionScan(
            options,
            async(function(err, cursors) {
                if (err) {
                    throw err;
                }

                return cursors;
            })
        );
    });
}

/**
 * @interface {collection}
 */
Collection.prototype.reIndex = function() {
    this.__asyncProcess(function(async) {
        this._driver.reIndex(
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
 * @interface {collection}
 */
Collection.prototype.replaceOne = function(filter, doc, options) {
    this.__asyncProcess(function(async) {
        this._driver.replaceOne(
            filter,
            doc,
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
 * @interface {collection}
 */
Collection.prototype.stats = function(options) {
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

/**
 * @interface {collection}
 */
Collection.prototype.updateMany = function(filter, update, options) {
    this.__asyncProcess(function(async) {
        this._driver.updateMany(
            filter,
            update,
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
 * @interface {collection}
 */
Collection.prototype.updateOne = function(filter, update, options) {
    this.__asyncProcess(function(async) {
        this._driver.updateOne(
            filter,
            update,
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