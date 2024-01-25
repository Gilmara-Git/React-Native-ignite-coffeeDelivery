import { extendTheme } from "native-base";

export const THEME = extendTheme({
    colors:{
        product:{
            "yellow_dark": "#C47F17", 
            "yellow": "#DBAC2C", 
            "dark_purple": "#4B2995", 
            "brand_purple": "#8047F8", 
            "light_purple": "#EBE5F9"
        },
        base:{
            "gray100": "#272221",
            "gray200": "#403937",
            "gray300": "#574F4D",
            "gray400": "#8D8686",
            "gray500": "#D7D5D5",
            "gray600": "#E6E5E5",
            "gray700": "#EDEDED",
            "gray800": "#F3F2F2",
            "gray900": "#FAFAFA",
            "white":   "#FFFFFF",
        },
        feedback:{
            "red_dark":"#C44117",
            "red_light": "#E8BAAB"

        }
    },
    fonts:{
        baloo2_bold: "Baloo2_700Bold",
        roboto_bold:" Roboto_700Bold",
        roboto_bolder: "Roboto_900Black",
        roboto_regular:"Roboto_400Regular"
    },
    fontSizes:{
       title_Xl: 36,
       title_Lg: 24,
       title_Md: 20,
       title_Sm: 16,
       title_Xs: 14,
       text_Lg: 20,
       text_Md: 16,
       text_Sm: 14,
       text_Xs: 12,
       tag: 10,
       button: 14
    },
        sizes :{
        // we already have plenty on native-base
            11: 46,
            14: 56,
            28:100,
            44: 179,
            60: 247,
            74:311
        
    }
});