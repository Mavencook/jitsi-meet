/* global APP */

import React, { Component } from 'react';
import { AbstractApp as JAbstractApp } from './AbstractApp'
import { toURLString } from '../../base/util';
import {
    localParticipantJoined
} from '../../base/participants';
import { appWillMount } from '../actions';

/**
 * The default URL to open if no other was specified to {@code AbstractApp}
 * via props.
 */
const DEFAULT_URL = 'https://meet.jit.si';

/**
 * Base (abstract) class for main App component.
 *
 * @abstract
 */
export class AbstractApp extends JAbstractApp {
   
    constructor(props) {
    	super(props);
    }

    componentWillMount() { 
        this._init.then(() => {
            const { dispatch, getState } = this._getStore();

            // hook up dispatch bridge
            this.props.dispatchBridge && this.props.dispatchBridge(dispatch);
            
            // hook up store bridge
            this.props.storeBridge && this._getStore().subscribe(() => this.props.storeBridge(this._getStore()))

            dispatch(appWillMount(this));

            // FIXME I believe it makes more sense for a middleware to dispatch
            // localParticipantJoined on APP_WILL_MOUNT because the order of
            // actions is important, not the call site. Moreover, we've got
            // localParticipant business logic in the React Component
            // (i.e. UI) AbstractApp now.
            
            let localParticipant = {
                avatarID: this.props.userId,
                name: this.props.displayName,
                avatarURL: this.props.profilePicture,
            };

            // Profile is the new React compatible settings.
            const profile = getState()['features/base/profile'];

            if (profile) {
                localParticipant.email
                    = profile.email || localParticipant.email;
                localParticipant.name
                    = profile.displayName || localParticipant.name;
            }

            // We set the initialized state here and not in the contructor to
            // make sure that {@code componentWillMount} gets invoked before
            // the app tries to render the actual app content.
            this.setState({
                appAsyncInitialized: true
            });

            dispatch(localParticipantJoined(localParticipant));

            // If a URL was explicitly specified to this React Component,
            // then open it; otherwise, use a default.
            super._openURL(toURLString(this.props.url) || this._getDefaultURL());
        });
    }
}
