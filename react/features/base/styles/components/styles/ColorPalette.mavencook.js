/**
 * The application's definition of the default color black.
 */
const BLACK = '#111111';

import { theme } from    '../../../../../../../src/theme'
/**
 * The application's color palette.
 */
export const ColorPalette = {
    /**
     * The application's background color.
     */
    appBackground: theme.colors.veryDark,

    /**
     * The application's definition of the default color black. Generally,
     * expected to be kept in sync with the application's background color for
     * the sake of consistency.
     */
    black: theme.colors.veryDark,
    blue: theme.colors.purple,
    blueHighlight: '#1081b2',
    buttonUnderlay: '#495258',
    darkGrey: '#555555',
    green: '#40b183',
    lightGrey: '#AAAAAA',
    overflowMenuItemUnderlay: '#EEEEEE',
    red: '#D00000',
    transparent: 'rgba(0, 0, 0, 0)',
    white: 'white',

    /**
     * These are colors from the atlaskit to be used on mobile, when needed.
     *
     * FIXME: Maybe a better solution would be good, or a native packaging of
     * the respective atlaskit components.
     */
    G400: '#00875A', // Slime
    N500: '#42526E', // McFanning
    R400: '#DE350B', // Red dirt
    Y200: '#FFC400', // Pub mix


    ...theme.colors,
};
