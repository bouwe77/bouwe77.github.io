function toggleLightDarkMode() {
  // Toggle the sun and moon icons
  const svg = document.getElementById('sun-moon')
  if (svg.getAttribute('viewBox') === '0 0 24 24') {
    svg.setAttribute('viewBox', '24 0 24 24')
  } else {
    svg.setAttribute('viewBox', '0 0 24 24')
  }

  // Toggle the light and dark themes
  document.body.classList.toggle('dark')
}
