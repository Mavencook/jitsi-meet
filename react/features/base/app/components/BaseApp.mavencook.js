// @flow

import React, { Component, Fragment } from 'react';
import { appWillMount, appWillUnmount } from '../actions';
import { localParticipantJoined } from '../../participants/actions';
import { updateSettings } from '../../settings';
import { default as JitsiMeetBaseApp } from './BaseApp'


export default class BaseApp extends JitsiMeetBaseApp {
  
  componentDidMount() {
    /**
     * Make the mobile {@code BaseApp} wait until the {@code AsyncStorage}
     * implementation of {@code Storage} initializes fully.
     *
     * @private
     * @see {@link #_initStorage}
     * @type {Promise}
     */
      this._init = this._initStorage()
          .catch(() => { /* BaseApp should always initialize! */ })
          .then(() => new Promise(resolve => {
              this.setState({
                  store: this._createStore()
              }, resolve);
          }))
          .then(() => {
            this.props.dispatchBridge && this.props.dispatchBridge(this.state.store.dispatch);
            this.props.storeBridge && this.state.store.subscribe(() => this.props.storeBridge(this.state.store))

            this.state.store.dispatch(appWillMount(this))
            this.state.store.dispatch(updateSettings({
              avatarID: this.props.userId,
              displayName: this.props.displayName,
              avatarURL: this.props.profilePicture.uri
            }));            
          })
          .catch(() => { /* BaseApp should always initialize! */ });
    }
}
