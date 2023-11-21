const checkTheme = (theme, darkElement, ligthElement) => {
    return theme === 'dark' ? darkElement : ligthElement;
  };

export {checkTheme}