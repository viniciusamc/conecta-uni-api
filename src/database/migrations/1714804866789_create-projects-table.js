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
        pgm.createTable('projects', {
                id: 'id',
                fk_id_user: { type: 'integer', references: 'users(id)', notNull: true },
                title: { type: 'text', notNull: true },
                description: { type: 'text', notNull: true },
                course: { type: 'text', notNull: true },
                teacher: { type: 'text', notNull: false },
                image: { type: 'text', notNull: false },
                subject: { type: 'text', notNull: false },
                semester: { type: 'text', notNull: false },
                created_at: { type: 'timestamp', default: new PgLiteral('current_timestamp') },
        });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
        pgm.dropTable('projects');
};
