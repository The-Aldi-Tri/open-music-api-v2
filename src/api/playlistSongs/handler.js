class PlaylistSongsHandler {
  constructor(playlistSongsService, playlistsService, songsService, usersService, validator) {
    this._playlistSongsService = playlistSongsService;
    this._playlistsService = playlistsService;
    this._songsService = songsService;
    this._usersService = usersService;
    this._validator = validator;
  }

  async postPlaylistSongHandler(request, h) {
    this._validator.validatePostPlaylistSongPayload(request.payload);

    const { id: credentialId } = request.auth.credentials;
    const playlistId = request.params.id;
    const { songId } = request.payload;

    await this._playlistsService.verifyPlaylistOwner({ id: playlistId, owner: credentialId });
    await this._songsService.getSongById(songId);
    await this._playlistSongsService.addPlaylistSong({ playlistId, songId });

    const response = h.response({
      status: 'success',
      message: 'Playlist song berhasil ditambahkan',
    });
    response.code(201);
    return response;
  }

  async getPlaylistSongsHandler(request, h) {
    const { id: credentialId } = request.auth.credentials;
    const playlistId = request.params.id;

    await this._playlistsService.verifyPlaylistOwner({ id: playlistId, owner: credentialId });
    const playlist = await this._playlistsService.getPlaylistById(playlistId);
    const playlistSongs = await this._playlistSongsService.getPlaylistSongsByPlaylistId(playlistId);

    const songIds = playlistSongs.map((playlistSong) => playlistSong.song_id);
    const songs = await this._songsService.getSongsByArrayOfId(songIds);

    const { username } = await this._usersService.getUserById(playlist.owner);

    return {
      status: 'success',
      message: 'Playlist songs berhasil ditemukan',
      data: {
        playlist: {
          id: playlist.id,
          name: playlist.name,
          username,
          songs: songs.map((song) => ({
            id: song.id,
            title: song.title,
            performer: song.performer,
          })),
        },
      },
    };
  }

  async deletePlaylistSongHandler(request, h) {
    this._validator.validatePostPlaylistSongPayload(request.payload);

    const { id: credentialId } = request.auth.credentials;
    const playlistId = request.params.id;
    const { songId } = request.payload;

    await this._playlistsService.verifyPlaylistOwner({ id: playlistId, owner: credentialId });
    await this._playlistSongsService.deletePlaylistSongBySongId(songId);

    return {
      status: 'success',
      message: 'Playlist song berhasil dihapus',
    };
  }
}

module.exports = PlaylistSongsHandler;
