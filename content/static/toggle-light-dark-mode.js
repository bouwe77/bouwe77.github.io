const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)')

// Listen to color scheme changes in the system settings
mediaQueryList.addEventListener('change', (event) => {
  const isDark = event.matches
  setTheme(isDark ? 'dark' : 'light')
  setToggleIcon(isDark ? 'sun' : 'moon')
})

// Initialize the theme when opening the page
function initLightDarkMode() {
  const isDark = mediaQueryList.matches
  setTheme(isDark ? 'dark' : 'light')
  setToggleIcon(isDark ? 'sun' : 'moon')
}

// Toggle the light and dark themes when clicking the toggle button
function toggleLightDarkMode() {
  const isDark = document.body.classList.contains('dark')
  setTheme(isDark ? 'light' : 'dark')
  setToggleIcon(isDark ? 'moon' : 'sun')
}

function setToggleIcon(icon) {
  const svg = document.getElementById('sun-moon')
  if (icon === 'sun') {
    svg.setAttribute('viewBox', '24 0 24 24')
  } else {
    svg.setAttribute('viewBox', '0 0 24 24')
  }
}

// Apply the theme
function setTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark')
  } else {
    document.body.classList.remove('dark')
  }
}
