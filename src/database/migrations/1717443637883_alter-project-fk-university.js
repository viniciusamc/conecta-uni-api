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
        pgm.addColumns('projects', {
                fk_id_university: {
                        type: 'integer',
                        notNull: true,
                        references: '"university"(id)',
                        onDelete: 'CASCADE'
                }
        });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
        pgm.dropColumn('projects', 'fk_id_university');
};
