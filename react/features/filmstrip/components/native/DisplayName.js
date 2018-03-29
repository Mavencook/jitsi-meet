import React from 'react';
import { Text, View } from 'react-native';
import { ColorPalette as JitsiColorPalette } from '../../../base/styles';

import { Icon } from '../../../base/font-icons';

import * as mavencookConstants from '../../../../../../src/styles/constants'

const styles = {
    container: {
        backgroundColor: 'gray',
        //bottom: -(18 + 3),
        marginTop: 3,
        marginHorizontal: 2 ,
        maxHeight: 20,
        paddingHorizontal: 2, 
        flex: 1,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 10,
        fontWeight: '400',
    },
}

export const DisplayName = props => {
    const { isActive, isInstructor, displayName } = props
    const activeStyle = isActive ? { 
        borderColor: mavencookConstants.primaryColor,
        backgroundColor: mavencookConstants.primaryColor 
    } : {
        borderColor: '#424242',
        backgroundColor: JitsiColorPalette.appBackground 
    }

    return (
        <View style={{ ...styles.container, ...activeStyle }}>
            { isInstructor && <Icon style={{paddingHorizontal: 2}} color={'white'} name='star'/> }
            <Text style={styles.text} numberOfLines={1} ellipsizeMode={'tail'}>
              { displayName }
            </Text>
      </View>
    );
}
