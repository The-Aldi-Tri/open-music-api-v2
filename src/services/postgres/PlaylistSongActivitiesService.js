const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');

class PlaylistSongActivitiesService {
  constructor() {
    this._pool = new Pool();
  }

  async addActivities({
    playlistId, song_id, user_id, action,
  }) {
    const id = `activity-${nanoid(16)}`;
    const time = new Date().toISOString();

    const query = {
      text: 'INSERT INTO playlist_song_activities VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, playlistId, song_id, user_id, action, time],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Activity gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getActivitiesByPlaylistId(id) {
    const query = {
      text: 'SELECT * FROM playlist_song_activities WHERE playlist_id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Activity tidak ditemukan');
    }
    const arr = [];

    for (let i = 0; i < result.rowCount; i += 1) {
      arr.push(result.rows[i]);
    }

    return arr;
  }

  async deleteActivitiesByPlaylistId(playlistId) {
    const query = {
      text: 'DELETE FROM playlist_song_activities WHERE playlist_id = $1',
      values: [playlistId],
    };

    await this._pool.query(query);
  }
}

module.exports = PlaylistSongActivitiesService;
