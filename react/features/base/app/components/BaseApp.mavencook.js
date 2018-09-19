// @flow

import React, { Component, Fragment } from 'react';
import { appWillMount, appWillUnmount } from '../actions';
import { localParticipantJoined } from '../../participants/actions';
import { updateSettings } from '../../settings';
import { setConfig } from '../../config';
import { default as JitsiMeetBaseApp } from './BaseApp'


export default class BaseApp extends JitsiMeetBaseApp {
    componentWillMount() {        
        this._init.then(() => {
            this.props.dispatchBridge && this.props.dispatchBridge(this.state.store.dispatch);
            this.props.storeBridge && this.state.store.subscribe(() => this.props.storeBridge(this.state.store))

            this.state.store.dispatch(appWillMount(this))
            this.state.store.dispatch(updateSettings({
              avatarID: this.props.userId,
              displayName: this.props.displayName,
              avatarURL: this.props.profilePicture.uri
            }));            
        });
    }
}
