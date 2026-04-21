const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)')
const moonIcon = `
  <path
    d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"
    fill="currentColor"
  />
`
const sunIcon = `
  <circle cx="12" cy="12" r="5" fill="currentColor" />
  <g
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    fill="none"
  >
    <line x1="12" y1="1.5" x2="12" y2="4" />
    <line x1="12" y1="20" x2="12" y2="22.5" />
    <line x1="1.5" y1="12" x2="4" y2="12" />
    <line x1="20" y1="12" x2="22.5" y2="12" />
    <line x1="4.6" y1="4.6" x2="6.4" y2="6.4" />
    <line x1="17.6" y1="17.6" x2="19.4" y2="19.4" />
    <line x1="4.6" y1="19.4" x2="6.4" y2="17.6" />
    <line x1="17.6" y1="6.4" x2="19.4" y2="4.6" />
  </g>
`

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
  if (!svg) return

  svg.setAttribute('viewBox', '0 0 24 24')
  svg.innerHTML = icon === 'sun' ? sunIcon : moonIcon
}

// Apply the theme
function setTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark')
  } else {
    document.body.classList.remove('dark')
  }
}
