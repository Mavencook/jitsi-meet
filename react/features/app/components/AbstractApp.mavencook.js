/* global APP */

import React, { Component } from 'react';
import { AbstractApp as JAbstractApp } from './AbstractApp'


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
        super.componentWillMount()
      
        this._init.then(() => {
            const { dispatch, getState } = this._getStore();
            
            // hook up dispatch bridge
            this.props.dispatchBridge && this.props.dispatchBridge(dispatch);
            
            // hook up store bridge
            this.props.storeBridge && this._getStore().subscribe(() => this.props.storeBridge(this._getStore()))
            
        })
    }
}
