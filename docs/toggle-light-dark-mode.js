const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)')

// Listen to color scheme changes in the system settings
mediaQueryList.addEventListener('change', (event) => {
  const isDark = event.matches
  setTheme(isDark ? 'dark' : 'light')
  setToggleIcon(isDark ? 'sun' : 'moon')
})

// Initialize the theme when opening the page
function initLightDarkMode() {
  let isDark = true

  // Check if a preference is set in localStorage.
  // If not, check if the system is set to dark mode.
  const theme = localStorage.getItem('theme')
  if (theme === 'light') isDark = false
  else isDark = mediaQueryList.matches

  setTheme(isDark ? 'dark' : 'light')
  setToggleIcon(isDark ? 'sun' : 'moon')
}

// Toggle the light and dark themes when clicking the toggle button
function toggleLightDarkMode() {
  const willBecomeLight = document.body.classList.contains('dark')

  localStorage.setItem('theme', willBecomeLight ? 'light' : 'dark')

  setTheme(willBecomeLight ? 'light' : 'dark')
  setToggleIcon(willBecomeLight ? 'moon' : 'sun')
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
