import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { cardTheme } from '../themeExtensions/cardTheme';
import { badgeTheme } from '../themeExtensions/badgeTheme';

const theme = extendTheme({
  colors: {
    primary: '#C562FF',
    secondary: '#2BC2A1',
    accent: '#E4FF45',
    systemAccent: '#7DBDFF',
  },
  components: {
    Card: cardTheme,
    Badge: badgeTheme,
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
