// Set a dynamic greeting in the footer based on time of day
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

// Display current year + greeting in footer
const footerEl = document.getElementById("footer-text");
const year = new Date().getFullYear();
footerEl.textContent = `${getGreeting()} — © ${year} Rajath S`;