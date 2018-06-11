import * as types from '../constants/types.js';

let identity = {
    adding_playlist: false, // action
    is_connected: false, // state
    user_atok_spotify: null, // Spotify metada
    user: null, // user data
    modalStepOne: false,
    modalStepTwo: false,
    error: null,
    queueSong: []
}

export default function app(state = identity, action) {
    console.log(state);
    let napp;
    switch (action.type) {
        case types.ToggleModalOne:
            napp = Object.assign({}, state, {
                modalStepOne: !state.modalStepOne
            });

            return napp;
        case types.ToggleModalTwo:
            napp = Object.assign({}, state, {
                modalStepTwo: !state.modalStepTwo,
                modalStepOne: false
            });

            return napp;
        case types.AddingPlaylistAction:
            napp = Object.assign({}, state, {
                adding_playlist: !state.adding_playlist
            });

            return napp;
        case types.SpotifyLogginAction:
            const res = action.result;
            if (res != undefined) {
                napp = Object.assign({}, state, {
                    is_connected: true,
                    user: res.user,
                    user_atok_spotify: res.user.access_token
                });

                return napp;
            }
            return state;
        case types.UserLoggin:
            if (action.data.type == 'success') {
                napp = Object.assign({}, state, {
                    is_connected: true,
                    user: action.data.message
                });
            }
            return napp;
        case types.GetAllSongsOfUser:
            napp = Object.assign({}, state);
            if (action.data.message) {
                napp.queueSong = action.data.message;
                napp.queueSong.forEach(item => {
                    item.duration_sec = item.duration_ms / 1000;
                })
            }
            return napp;
        case types.UploadSong:
            napp = Object.assign({}, state);

            action.data.duration_sec = action.data.duration_ms / 1000;
            napp.queueSong.push(action.data);
            return napp;
        case types.UserLogginFail:
            napp = Object.assign({}, state);
            napp.error = action.error;
            return napp;
        case types.UploadSongErr:
            return state;
        case types.UserLogout:
            napp = Object.assign({}, state, identity);
            return napp;
        case types.UserLogoutFail:
            napp = Object.assign({}, state);
            napp.error = action.error;
            return napp;

        case types.DeleteSong:
            napp = Object.assign({}, state);
            napp.queueSong.splice(action.index, 1);
            return napp;
        case types.DeleteSongFail:
            napp = Object.assign({}, state);
            napp.error = action.error;
            console.log(napp.error);
            return napp;
        case types.GetUserSession:
            napp = Object.assign({}, state);
            napp.user = action.data;
            napp.is_connected = true;
            return napp;
        default:
            return state;
    }
}

