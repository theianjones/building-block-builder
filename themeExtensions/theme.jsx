import { extendTheme } from '@chakra-ui/react';
import { cardTheme } from '../cardTheme';

const theme = extendTheme({
  colors: {
    primary: '#C562FF',
    secondary: '#2BC2A1',
    accent: '#E4FF45',
  },
  components: {
    Card: cardTheme,
  },
});

export default theme;
