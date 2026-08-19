/**
 * Semantic design tokens for the mobile app.
 *
 * These tokens mirror the naming conventions used in web artifacts (index.css)
 * so that multi-artifact projects share a cohesive visual identity.
 *
 * Replace the placeholder values below with values that match the project's
 * brand. If a sibling web artifact exists, read its index.css and convert the
 * HSL values to hex so both artifacts use the same palette.
 *
 * To add dark mode, add a `dark` key with the same token names.
 * The useColors() hook will automatically pick it up.
 */

const colors = {
  light: {
    text: '#26352F',
    tint: '#D96B4C',
    background: '#FFF9F3',
    foreground: '#26352F',
    card: '#FFFFFF',
    cardForeground: '#26352F',
    primary: '#D96B4C',
    primaryForeground: '#FFFFFF',
    secondary: '#F3E5D5',
    secondaryForeground: '#6F4D3C',
    muted: '#F7EDE3',
    mutedForeground: '#8B8178',
    accent: '#B9C9A8',
    accentForeground: '#304A36',
    destructive: '#B84E4E',
    destructiveForeground: '#FFFFFF',
    border: '#EADFD3',
    input: '#EADFD3',
    success: '#6D9B70',
    inkSoft: '#52625B',
    cream: '#FFF1D8',
  },
  radius: 22,
};

export default colors;
