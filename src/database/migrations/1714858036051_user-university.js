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
        pgm.createTable('university', {
                id: 'id',
                fk_id_user: { type: 'integer', references: 'users(id)', notNull: true },
                university: { type: 'text', notNull: true },
                score_mec: { type: 'text', notNull: false, default: '0' },
                created_at: { type: 'timestamp', default: new PgLiteral('current_timestamp') },
        });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
        pgm.dropTable('university');
};
