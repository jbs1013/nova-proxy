const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const homeScreen = document.getElementById("homeScreen");
const browserScreen = document.getElementById("browserScreen");
const addressInput = document.getElementById("addressInput");
const tabs = document.getElementById("tabs");

let tabCount = 1;
let currentWebsite = "";

searchForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const query = searchInput.value.trim();

  if (!query) return;

  openWebsite(query);
});

function openWebsite(query) {
  let destination;

  if (/^https?:\/\//i.test(query)) {
    destination = query;
  } else if (
    /^[a-z0-9-]+\.[a-z]{2,}(\/.*)?$/i.test(query)
  ) {
    destination = "https://" + query;
  } else {
    destination =
      "https://www.google.com/search?q=" +
      encodeURIComponent(query);
  }

  window.open(destination, "_blank", "noopener,noreferrer");
}

function navigateAddress() {
  const address = addressInput.value.trim();

  if (!address) return;

  openWebsite(address);
}

addressInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    navigateAddress();
  }
});

function showHome() {
  homeScreen.style.display = "block";
  browserScreen.style.display = "none";
  currentWebsite = "";
}

function addTab() {
  tabCount++;

  const tab = document.createElement("button");

  tab.className = "tab";
  tab.textContent = "Tab " + tabCount;

  tab.addEventListener("click", function() {
    document.querySelectorAll(".tab").forEach(function(item) {
      item.classList.remove("active");
    });

    tab.classList.add("active");
    showHome();
  });

  tabs.appendChild(tab);
  showHome();
}

function goBack() {
  showHome();
}

function toggleTheme() {
  document.body.classList.toggle("light-mode");
}
