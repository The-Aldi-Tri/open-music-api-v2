const ClientError = require('../../exceptions/ClientError');

class PlaylistsHandler {
  constructor(
    playlistsService,
    playlistSongsService,
    collaborationsService,
    usersService,
    playlistSongActivitiesService,
    validator,
  ) {
    this._playlistsService = playlistsService;
    this._playlistSongsService = playlistSongsService;
    this._collaborationsService = collaborationsService;
    this._usersService = usersService;
    this._playlistSongActivitiesService = playlistSongActivitiesService;
    this._validator = validator;
  }

  async postPlaylistHandler(request, h) {
    this._validator.validatePostPlaylistPayload(request.payload);

    const { id: credentialId } = request.auth.credentials;
    const { name } = request.payload;

    const playlistId = await this._playlistsService.addPlaylist({ name, owner: credentialId });

    const response = h.response({
      status: 'success',
      message: 'Playlist berhasil ditambahkan',
      data: {
        playlistId,
      },
    });
    response.code(201);
    return response;
  }

  async getPlaylistsHandler(request, h) {
    const { id: credentialId } = request.auth.credentials;

    const playlists = await this._playlistsService.getPlaylistsByOwnerV2(credentialId);

    const collabRecords = await this._collaborationsService.getCollaborationPlaylists(credentialId);
    const ids = collabRecords.map((col) => col.playlist_id);

    const collabPlaylists = ids ? await this._playlistsService.getPlaylistsByArrayOfId(ids) : [];

    const allPlaylist = [...playlists, ...collabPlaylists];

    const allPlaylist2 = await Promise.all(allPlaylist.map(async (pl) => {
      const { username } = await this._usersService.getUserById(pl.owner);
      return {
        id: pl.id,
        name: pl.name,
        username,
      };
    }));

    return {
      status: 'success',
      message: 'Playlists berhasil ditemukan',
      data: {
        playlists: allPlaylist2,
      },
    };
  }

  async deletePlaylistHandler(request, h) {
    const { id: credentialId } = request.auth.credentials;
    const playlistId = request.params.id;

    await this._playlistsService.verifyPlaylistOwner({ id: playlistId, owner: credentialId });
    await this._playlistSongsService.deletePlaylistSongsByPlaylistId(playlistId);
    await this._collaborationsService.deleteCollaborationsByPlaylistId(playlistId);
    await this._playlistSongActivitiesService.deleteActivitiesByPlaylistId(playlistId);
    await this._playlistsService.deletePlaylistById(playlistId);

    return {
      status: 'success',
      message: 'Playlist berhasil dihapus',
    };
  }
}

module.exports = PlaylistsHandler;
