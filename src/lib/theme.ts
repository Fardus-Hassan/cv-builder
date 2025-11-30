// Theme configuration for easy color customization
// Change these values to update the entire color scheme

export const theme = {
  primary: '#22C55E', // Green color for active states and buttons
  primaryHover: '#16A34A',
  primaryLight: '#DCFCE7',
  secondary: '#6B7280', // Gray for inactive states
  secondaryLight: '#F3F4F6',
  text: {
    primary: '#1F2937', // Dark gray for main text
    secondary: '#6B7280', // Medium gray for secondary text
    light: '#9CA3AF', // Light gray for placeholders
  },
  background: {
    white: '#FFFFFF',
    gray: '#F9FAFB',
  },
  border: {
    default: '#E5E7EB',
    focus: '#22C55E',
  },
  error: '#EF4444',
  success: '#22C55E',
};

export type Theme = typeof theme;

