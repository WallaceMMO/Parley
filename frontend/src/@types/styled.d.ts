import 'styled-components';

import {ThemeType} from '../themes/light'

declare module 'styled-components' {
    export interface DefaultTheme extends ThemeType{
        
    }
}