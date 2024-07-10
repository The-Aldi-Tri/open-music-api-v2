const ClientError = require('../../exceptions/ClientError');

class CollaborationsHandler {
  constructor(collaborationsService, playlistsService, usersService, validator) {
    this._collaborationsService = collaborationsService;
    this._playlistsService = playlistsService;
    this._usersService = usersService;
    this._validator = validator;
  }

  async postCollaborationHandler(request, h) {
    this._validator.validateCollaborationPayload(request.payload);

    const { id: credentialId } = request.auth.credentials;
    const { playlistId, userId } = request.payload;

    await this._playlistsService.verifyPlaylistOwner({ id: playlistId, owner: credentialId });
    await this._usersService.getUserById(userId);

    const collabId = await this._collaborationsService.addCollaboration({ playlistId, userId });

    const response = h.response({
      status: 'success',
      message: 'Collaboration berhasil ditambahkan',
      data: {
        collaborationId: collabId,
      },
    });
    response.code(201);
    return response;
  }

  async deleteCollaborationHandler(request) {
    this._validator.validateCollaborationPayload(request.payload);

    const { id: credentialId } = request.auth.credentials;
    const { playlistId, userId } = request.payload;

    await this._playlistsService.verifyPlaylistOwner({ id: playlistId, owner: credentialId });
    await this._usersService.getUserById(userId);

    await this._collaborationsService.deleteCollaboration({ playlistId, userId });

    return {
      status: 'success',
      message: 'Collaboration berhasil dihapus',
    };
  }
}

module.exports = CollaborationsHandler;
