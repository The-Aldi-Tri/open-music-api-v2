const PlaylistSongActivitiesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'playlistSongActivities',
  version: '1.0.0',
  register: async (server, {
    playlistSongActivitiesService,
    playlistsService,
    collaborationsService,
    usersService,
    songsService,
  }) => {
    const playlistSongActivitiesHandler = new PlaylistSongActivitiesHandler(
      playlistSongActivitiesService,
      playlistsService,
      collaborationsService,
      usersService,
      songsService,
    );
    server.route(routes(playlistSongActivitiesHandler));
  },
};
