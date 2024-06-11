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
        pgm.createTable('join_project', {
                id: 'id',
                fk_id_user: { type: 'integer', references: 'users(id)', notNull: false },
                fk_id_task: { type: 'integer', references: 'projects(id)', notNull: true },
                colleague: { type: 'text' }
        })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
        pgm.dropTable('join_project')
};
