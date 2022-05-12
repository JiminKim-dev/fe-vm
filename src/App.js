import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'theme/GlobalStyles';
import theme from 'theme/theme';
import Router from 'Router';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  );
}

export default App;
