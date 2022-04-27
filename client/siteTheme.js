import { createTheme } from "@mui/material/styles";

 export const theme = createTheme({
  palette: {
    primary: {
      main: '#D9AABA',
      contrastText: '#fff'
    },
    secondary: {
      main: '#98798E',
    },
  },
  typography: {
    fontFamily: [
      'Abril Fatface',
      'Lato'
    ]
  },
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: '70px',
          height: '70px'
        }
      }
    }
  }
})