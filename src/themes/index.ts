import { extendTheme } from "native-base";

export const THEME = extendTheme({
    colors:{
        product:{
            "yellow-dark": "#C47F17", 
            "yellow": "#DBAC2C", 
            "purple-dark": "#4B2995", 
            "brand_purple": "#8047f8", 
            "purple-light": "#EBEFF9"
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
            "red-dark":"#C44117",
            "red":     "#E8BAAB",
            "red-light": "red-light"

        }
    },
    fonts:{
        baloo2_bold: "Baloo2_700Bold",
        roboto_bold:" Roboto_700Bold ",
        roboto_regular:"Roboto_400Regular"
    },
    fontSizes:{
       title_XI: 36,
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
    customizedSizes:{
        // we already have plenty on native-base
        
    }
});