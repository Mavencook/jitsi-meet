// @flow

import {
    DEFAULT_AVATAR_RELATIVE_PATH,
    LOCAL_PARTICIPANT_DEFAULT_ID
} from './constants';

import {
    getAvatarURL,
    getAvatarURLByParticipantId,
    getLocalParticipant,
    getParticipantById,
    getParticipantCount,
    getParticipants,
    getPinnedParticipant,
} from './functions'

function getParticipantDisplayName(
        stateful: Object | Function,
        id: string) {
    const participant = getParticipantById(stateful, id);

    if (participant) {
        if (participant.name) {
            return participant.name;
        }

        if (participant.local) {
            return typeof interfaceConfig === 'object'
                ? interfaceConfig.DEFAULT_LOCAL_DISPLAY_NAME
                : 'me';
        }
    }

    return typeof interfaceConfig === 'object'
        ? interfaceConfig.DEFAULT_REMOTE_DISPLAY_NAME
        : 'Mavencooker';
}

export {
    getParticipantDisplayName,

    getAvatarURL,
    getAvatarURLByParticipantId,
    getLocalParticipant,
    getParticipantById,
    getParticipantCount,
    getParticipants,
    getPinnedParticipant,
}