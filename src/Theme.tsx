import { MantineProvider } from '@mantine/core';

interface ThemeProps {
  children: React.ReactNode;
}

const Theme = ({ children }: ThemeProps) => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'dark',
        globalStyles: () => ({
          'html, body, #root': {
            height: '100%',
            minHeight: '100%',
          },
        }),
      }}
    >
      {children}
    </MantineProvider>
  );
};

export default Theme;
