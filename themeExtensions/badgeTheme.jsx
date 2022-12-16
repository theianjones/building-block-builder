import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const brandPrimary = defineStyle({
  background: '#fff',
  color: 'black',
  fontFamily: 'serif',
  fontWeight: 'normal',
  border: '1px solid black',
  borderRadius: '100px',
  textTransform: 'uppercase',
  padding: '8px 16px',
  marginBottom: '8px',
});

export const badgeTheme = defineStyleConfig({
  variants: { brandPrimary },
});
