const checkDarkMode = () => {
  const darkModeSwitch = document.getElementById('dark-mode-switch');

  const activeMode = getColorModePreference() || getSystemColorModePreference();
  darkModeSwitch.checked = activeMode === 'dark';

  watchColorToggle();
}


const watchColorToggle = () => {
  const darkModeSwitch = document.getElementById('dark-mode-switch');
  const systemColorMode = getSystemColorModePreference();
  darkModeSwitch.addEventListener('change', (e) => {
    const preferredMode = e.target.checked ? 'dark' : 'light';


    if (systemColorMode == preferredMode) {
      removeColorModePreference();
    } else {
      saveColorModePreference(preferredMode);
    }
  });
}

const saveColorModePreference = (mode) => {
  localStorage.setItem('color-mode', mode);
}

const removeColorModePreference = () => {
  localStorage.removeItem('color-mode');
}

const getColorModePreference = () => {
  if (localStorage.getItem('color-mode')) {
    return localStorage.getItem('color-mode');
  }
  return null;
}

const getSystemColorModePreference = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

checkDarkMode();
