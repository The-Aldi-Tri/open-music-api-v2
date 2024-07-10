/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('playlist_songs', {
    id: { type: 'text', primaryKey: true },
    playlist_id: { type: 'text', references: 'playlists(id)' }, // Foreign key reference to playlists table
    song_id: { type: 'text', references: 'songs(id)' }, // Foreign key reference to songs table
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('playlist_songs');
};
