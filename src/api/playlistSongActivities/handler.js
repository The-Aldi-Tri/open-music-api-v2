const AuthorizationError = require('../../exceptions/AuthorizationError');

class PlaylistSongActivitiesHandler {
  constructor(
    playlistSongActivitiesService,
    playlistsService,
    collaborationsService,
    usersService,
    songsService,
  ) {
    this._playlistSongActivitiesService = playlistSongActivitiesService;
    this._playlistsService = playlistsService;
    this._collaborationsService = collaborationsService;
    this._usersService = usersService;
    this._songsService = songsService;
  }

  async getPlaylistSongActivitiesHandler(request, h) {
    const { id: credentialId } = request.auth.credentials;
    const playlistId = request.params.id;

    const isOwner = await this._playlistsService.verifyPlaylistOwnerV2(
      {
        id: playlistId,
        owner: credentialId,
      },
    );
    const isCollaborator = await this._collaborationsService.verifyCollaboration(
      {
        playlistId,
        userId: credentialId,
      },
    );

    if (!isOwner && !isCollaborator) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
    }

    const activities = await this._playlistSongActivitiesService.getActivitiesByPlaylistId(playlistId);
    const activities2 = await Promise.all(activities.map(async (act) => {
      const { username } = await this._usersService.getUserById(act.user_id);
      const { title } = await this._songsService.getSongById(act.song_id);
      return {
        username,
        title,
        action: act.action,
        time: act.time,
      };
    }));

    const response = h.response({
      status: 'success',
      message: 'Activities berhasil ditemukan',
      data: {
        playlistId,
        activities: activities2,
      },
    });
    response.code(200);
    return response;
  }
}

module.exports = PlaylistSongActivitiesHandler;
