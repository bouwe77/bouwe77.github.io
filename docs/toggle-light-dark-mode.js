const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)')

// Listen to color scheme changes in the system settings
mediaQueryList.addEventListener('change', (event) => {
  const isDark = event.matches
  setTheme(isDark)
  setToggleIcon(isDark)
})

// Initialize the theme when opening the page
function initLightDarkMode() {
  const isDark = mediaQueryList.matches
  setTheme(isDark)
  setToggleIcon(isDark)
}

// Toggle the light and dark themes when clicking the toggle button
function toggleLightDarkMode() {
  const isDark = document.body.classList.contains('dark')
  setTheme(!isDark)
  setToggleIcon(!isDark)
}

function setToggleIcon(isDark) {
  const svg = document.getElementById('sun-moon')
  if (isDark) {
    svg.setAttribute('viewBox', '24 0 24 24')
  } else {
    svg.setAttribute('viewBox', '0 0 24 24')
  }
}

// Apply the theme
function setTheme(isDark) {
  if (isDark) {
    document.body.classList.add('dark')
  } else {
    document.body.classList.remove('dark')
  }
}
