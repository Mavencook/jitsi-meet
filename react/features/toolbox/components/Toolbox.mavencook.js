import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import {
    isNarrowAspectRatio,
    makeAspectRatioAware
} from '../../base/responsive-ui';
import {
    MEDIA_TYPE,
    setAudioMuted,
    setVideoMuted,
    toggleCameraFacingMode,
    VIDEO_MUTISM_AUTHORITY
} from '../../base/media';
import { Container } from '../../base/react';

import {
    abstractMapDispatchToProps,
    abstractMapStateToProps
} from '../functions';

import AudioRouteButton from './AudioRouteButton';
import styles from './styles';
import ToolbarButton from './ToolbarButton';

import { Toolbox as JToolbox } from './Toolbox';

/**
 * The indicator which determines (at bundle time) whether there should be a
 * {@code ToolbarButton} in {@code Toolbox} to expose the functionality of the
 * feature share-room in the user interface of the app.
 *
 * @private
 * @type {boolean}
 */
const _SHARE_ROOM_TOOLBAR_BUTTON = false;
const _LOCK_ROOM_TOOLBAR_BUTTON = false;
const _VISIBILITY_TOOLBAR_BUTTON = false;

/**
 * Implements the conference toolbox on React Native.
 */
export class Toolbox extends JToolbox {

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const toolboxStyle
            = isNarrowAspectRatio(this)
                ? styles.toolboxNarrow
                : styles.toolboxWide;

        return (
            <Container
                style = { toolboxStyle }
                visible = { true || this.props._visible } >
                { this._renderToolbars() }
            </Container>
        );
    }

    /**
     * Renders the toolbar which contains the primary buttons such as hangup,
     * audio and video mute.
     *
     * @private
     * @returns {ReactElement}
     */
    _renderPrimaryToolbar() {
        const audioButtonStyles = this._getMuteButtonStyles(MEDIA_TYPE.AUDIO);
        const videoButtonStyles = this._getMuteButtonStyles(MEDIA_TYPE.VIDEO);

        /* eslint-disable react/jsx-handler-names */

        return (
            <View
                key = 'primaryToolbar'
                style = { styles.primaryToolbar }>
                <ToolbarButton
                    iconName = { audioButtonStyles.iconName }
                    iconStyle = { audioButtonStyles.iconStyle }
                    onClick = { this._onToggleAudio }
                    style = { audioButtonStyles.style } />
                <ToolbarButton
                    accessibilityLabel = 'Hangup'
                    iconName = 'hangup'
                    iconStyle = { styles.whitePrimaryToolbarButtonIcon }
                    onClick = { this.props._onHangup }
                    style = { styles.hangup }
                    underlayColor = { ColorPalette.buttonUnderlay } />
                <ToolbarButton
                    disabled = { this.props._audioOnly }
                    iconName = { videoButtonStyles.iconName }
                    iconStyle = { videoButtonStyles.iconStyle }
                    onClick = { this._onToggleVideo }
                    style = {{ ...videoButtonStyles.style, ...style }} />
            </View>
        );

        /* eslint-enable react/jsx-handler-names */
    }

    /**
     * Renders the toolbar which contains the secondary buttons such as toggle
     * camera facing mode.
     *
     * @private
     * @returns {ReactElement}
     */
    _renderSecondaryToolbar() {
        const audioButtonStyles = this._getMuteButtonStyles(MEDIA_TYPE.AUDIO);
        const iconStyle = styles.secondaryToolbarButtonIcon;
        const style = styles.secondaryToolbarButton;
        const underlayColor = 'transparent';
        const {
            _audioOnly: audioOnly,
            _videoMuted: videoMuted
        } = this.props;

        /* eslint-disable react/jsx-curly-spacing,react/jsx-handler-names */

        return (
            <View
                key = 'secondaryToolbar'
                style = { styles.secondaryToolbar }>
                {
                    AudioRouteButton
                        && <AudioRouteButton
                            iconName = { 'volume' }
                            iconStyle = { iconStyle }
                            style = { style }
                            underlayColor = { underlayColor } />
                }
                <ToolbarButton
                    disabled = { audioOnly || videoMuted }
                    iconName = 'switch-camera'
                    iconStyle = { iconStyle }
                    onClick = { this.props._onToggleCameraFacingMode }
                    style = { style }
                    underlayColor = { underlayColor } />
                { _VISIBILITY_TOOLBAR_BUTTON && <ToolbarButton
                    iconName = { audioOnly ? 'visibility-off' : 'visibility' }
                    iconStyle = { iconStyle }
                    onClick = { this.props._onToggleAudioOnly }
                    style = { style }
                    underlayColor = { underlayColor } />}
                { _LOCK_ROOM_TOOLBAR_BUTTON && <ToolbarButton
                    iconName = {
                        this.props._locked ? 'security-locked' : 'security'
                    }
                    iconStyle = { iconStyle }
                    onClick = { this.props._onRoomLock }
                    style = { style }
                    underlayColor = { underlayColor } />}
                { _SHARE_ROOM_TOOLBAR_BUTTON
                        && <ToolbarButton
                            iconName = 'link'
                            iconStyle = { iconStyle }
                            onClick = { this.props._onShareRoom }
                            style = { style }
                            underlayColor = { underlayColor } />
                }
                 <ToolbarButton
                    iconName = { this.props._audioMuted ? 'mic-disabled' : 'microphone' } 
                    iconStyle = { iconStyle }
                    onClick = { this._onToggleAudio }
                    style = { style }
                    underlayColor = { underlayColor } />
            </View>
        );

        /* eslint-enable react/jsx-curly-spacing,react/jsx-handler-names */
    }

    /**
     * Renders the primary and the secondary toolbars.
     *
     * @private
     * @returns {[ReactElement, ReactElement]}
     */
    _renderToolbars() {
        return [
            this._renderSecondaryToolbar(),
            ///this._renderPrimaryToolbar()
        ];
    }
}
/**
 * Additional properties for various icons, which are now platform-dependent.
 * This is done to have common logic of generating styles for web and native.
 * TODO As soon as we have common font sets for web and native, this will no
 * longer be required.
 */
Object.assign(Toolbox.prototype, {
    audioIcon: 'microphone',
    audioMutedIcon: 'mic-disabled',
    videoIcon: 'camera',
    videoMutedIcon: 'camera-disabled'
});

/**
 * Maps actions to React component props.
 *
 * @param {Function} dispatch - Redux action dispatcher.
 * @returns {{
 *     _onRoomLock: Function,
 *     _onToggleAudioOnly: Function,
 *     _onToggleCameraFacingMode: Function,
 * }}
 * @private
 */
function _mapDispatchToProps(dispatch) {
    return {
        ...abstractMapDispatchToProps(dispatch),

        /**
         * Sets the lock i.e. password protection of the conference/room.
         *
         * @private
         * @returns {void}
         * @type {Function}
         */
        _onRoomLock() {
            dispatch(beginRoomLockRequest());
        },

        /**
         * Begins the UI procedure to share the conference/room URL.
         *
         * @private
         * @returns {void}
         * @type {Function}
         */
        _onShareRoom() {
            dispatch(beginShareRoom());
        },

        /**
         * Toggles the audio-only flag of the conference.
         *
         * @private
         * @returns {void}
         * @type {Function}
         */
        _onToggleAudioOnly() {
            dispatch(toggleAudioOnly());
        },

        /**
         * Switches between the front/user-facing and back/environment-facing
         * cameras.
         *
         * @private
         * @returns {void}
         * @type {Function}
         */
        _onToggleCameraFacingMode() {
            dispatch(toggleCameraFacingMode());
        }
    };
}

/**
 * Maps part of Redux store to React component props.
 *
 * @param {Object} state - Redux store.
 * @returns {{
 *     _audioOnly: boolean,
 *     _locked: boolean
 * }}
 * @private
 */
function _mapStateToProps(state) {
    const conference = state['features/base/conference'];

    return {
        ...abstractMapStateToProps(state),

        /**
         * The indicator which determines whether the conference is in
         * audio-only mode.
         *
         * @protected
         * @type {boolean}
         */
        _audioOnly: Boolean(conference.audioOnly),

        /**
         * The indicator which determines whether the conference is
         * locked/password-protected.
         *
         * @protected
         * @type {boolean}
         */
        _locked: Boolean(conference.locked)
    };
}

export default connect(_mapStateToProps, _mapDispatchToProps)(
    makeAspectRatioAware(Toolbox));
