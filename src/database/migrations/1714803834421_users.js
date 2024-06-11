const { PgLiteral } = require('node-pg-migrate');

/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.createTable('users', {
        id: 'id',
        name: { type: 'text', notNull: 'true' },
        email: { type: 'text', notNull: 'true', unique: 'true' },
        password_hash: { type: 'text', notNull: 'true' },
        created_at: { type: 'timestamp', default: new PgLiteral('current_timestamp') },
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropTable('users');
};
