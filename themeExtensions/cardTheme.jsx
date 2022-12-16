import { cardAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  container: {
    backgroundColor: '#fff',
    // MozBorderRadiusTopleft: '25px',
    border: '1px solid #000',
    borderBottom: 'none',
    margin: '0px',
    marginTop: '0px',
  },
  header: {
    fontWeight: 'bold',
    paddingBottom: '2px',
  },
  body: {
    // paddingTop: '2px',
  },
  footer: {
    // paddingTop: '2px',
  },
});

const sizes = definePartsStyle({
  md: {
    container: {
      borderRadius: '0px',
      marginTop: '0px !important',
    },
  },
});

export const cardTheme = defineMultiStyleConfig({ baseStyle, sizes });
