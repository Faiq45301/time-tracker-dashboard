
let currentView = "weekly";


const buttons = document.querySelectorAll(".menu-btn");
const cards = document.querySelectorAll(".activity-card");


async function loadData() {
  const response = await fetch("data.json");
  const data = await response.json();
  showData(data, currentView);
}


function showData(data, view) {
  data.forEach((item, index) => {
    const card = cards[index];
    if (!card) return;

    const time = item.timeframes[view];
    const current = time.current;
    const previous = time.previous;


    card.querySelector(".activity-card-hours").textContent = `${current}hrs`;

    const label =
      view === "daily"
        ? "Yesterday"
        : view === "weekly"
        ? "Last Week"
        : "Last Month";

    card.querySelector(
      ".activity-card-previous"
    ).textContent = `${label} - ${previous}hrs`;
  });
}


buttons.forEach((btn) => {
  btn.addEventListener("click", () => {

    buttons.forEach((b) => b.classList.remove("active"));


    btn.classList.add("active");


    currentView = btn.textContent.toLowerCase();


    loadData();
  });
});


loadData();
