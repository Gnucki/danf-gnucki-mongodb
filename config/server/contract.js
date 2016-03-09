'use strict';

module.exports = {
    connections: {
        type: 'embedded_object',
        embed: {
            url: {
                type: 'string',
                required: true
            },
            options: {
                type: 'object',
                default: {}
            },
            collections: {
                type: 'embedded_object',
                validate: function(value) {
                    // Use the key of the collection as the default name.
                    for (var key in value) {
                        var collection = value[key];

                        if (!collection.name) {
                            collection.name = key;
                        }
                    }
                },
                embed: {
                    name: {
                        type: 'string'
                    },
                    document: {
                        type: 'object',
                        default: null
                    },
                    options: {
                        type: 'object',
                        default: {}
                    },
                    indexes: {
                        type: 'embedded_object',
                        default: {},
                        validate: function(value) {
                            // Use the key of the index as the default name.
                            for (var key in value) {
                                var index = value[key];

                                if (!index.options.name) {
                                    index.options.name = key;
                                }
                            }
                        },
                        embed: {
                            keys: {
                                type: 'object',
                                require: true
                            },
                            options: {
                                type: 'object',
                                default: {},
                                validate: function(value) {
                                    // Set background index creation as default behaviour.
                                    if (null == value.background) {
                                        value.background = true;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};