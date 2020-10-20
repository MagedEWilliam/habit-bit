import '@ionic/core';
// import { setupConfig } from '@ionic/core';

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

toggleDarkTheme(prefersDark.matches);

prefersDark.addListener((mediaQuery) => toggleDarkTheme(mediaQuery.matches));

function toggleDarkTheme(shouldAdd) {
  document.body.classList.toggle('dark', shouldAdd);
}

export default () => {
  // setupConfig({
  //   mode: 'ios'
  // });
};
