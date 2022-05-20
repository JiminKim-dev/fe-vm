import { MoneyProvider } from 'context/MoneyContext';
import { ThemeProvider } from 'styled-components';
import { LogProvider } from 'context/LogContext';
import { ProductsProvider } from 'context/ProductContext';
import { TimerProvider } from 'context/TimerContext';

import GlobalStyle from 'theme/GlobalStyles';
import theme from 'theme/theme';
import Router from 'Router';

function App() {
  return (
    <TimerProvider>
      <MoneyProvider>
        <LogProvider>
          <ProductsProvider>
            <ThemeProvider theme={theme}>
              <GlobalStyle />
              <Router />
            </ThemeProvider>
          </ProductsProvider>
        </LogProvider>
      </MoneyProvider>
    </TimerProvider>
  );
}

export default App;
