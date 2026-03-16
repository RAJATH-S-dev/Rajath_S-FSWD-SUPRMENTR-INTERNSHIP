function getGreeting() {
  var hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

var footerEl = document.getElementById("footer-text");
var year = new Date().getFullYear();
footerEl.textContent = getGreeting() + " — © " + year + " Rajath S";