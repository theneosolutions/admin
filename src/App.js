import React, { useEffect } from "react";
import LocalesConfig from "./Localization/LocalesConfig";
import { store } from "./Services/redux/store";
import { Provider } from "react-redux";
import Routes from "./Routes";
import { ThemeProvider } from "Theme";
function App() {
  let lng = localStorage.getItem("preferredLanguage");
  let dir = localStorage.getItem("direction");

  useEffect(() => {
    if (!lng) {
      localStorage.setItem("preferredLanguage", "en");
    }
    if (!dir) {
      localStorage.setItem("direction", "ltr");
    }
  }, [lng, dir]);

  LocalesConfig(lng);

  return (
    <ThemeProvider>
      <Provider store={store}>
        <html dir={dir} className={lng === "ar" && `amiri-regular`}>
          <Routes />
        </html>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
