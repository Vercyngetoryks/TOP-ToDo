const toggleView = () => {
  const toggleViewBtn = document.getElementById("toggle-view-btn");
  const todoContainer = document.querySelector(".todo-container");
  const calendarContainer = document.querySelector(".calendar-container");

  if (!toggleViewBtn || !todoContainer || !calendarContainer) {
    console.error("Nie znaleziono elementów do przełączania widoku!");
    return;
  }

  toggleViewBtn.addEventListener("click", () => {
    todoContainer.classList.toggle("hidden");
    calendarContainer.classList.toggle("visible");

    if (calendarContainer.classList.contains("visible")) {
      toggleViewBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="toggle-view-icon">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
      </svg>
      <span id="toggle-view-btn-tooltip">Toggle View</span>
      `;
    } else {
      toggleViewBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="toggle-view-icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
        </svg>
        <span id="toggle-view-btn-tooltip">Toggle View</span>
        `;
    }
  });
};

export default toggleView;
