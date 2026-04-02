import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";
import { CategoriesProvider } from "../../features/categories/providers/CategoriesProvider";
import { I18nProvider } from "../../shared/i18n/I18nProvider";
import { ThemeProvider } from "../../shared/theme/ThemeProvider";

function AppProviders({ children }) {
  return (
    <BrowserRouter basename="/">
      <I18nProvider>
        <ThemeProvider>
          <Provider store={store}>
            <CategoriesProvider>{children}</CategoriesProvider>
          </Provider>
        </ThemeProvider>
      </I18nProvider>
    </BrowserRouter>
  );
}

export default AppProviders;
