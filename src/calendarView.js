import getLocalStorage from "./getLocalStorage";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isToday,
  getDay,
  setMonth,
  getMonth,
} from "date-fns";

let currentDate = new Date();

const renderCalendar = (date = new Date()) => {
  const calendarGrid = document.querySelector(".calendar-grid");
  const currentMonthLabel = document.getElementById("current-month");

  if (!calendarGrid || !currentMonthLabel) {
    console.error("Nie znaleziono elementów kalendarza!");
    return;
  }

  // Czyścimy poprzedni widok kalendarza
  calendarGrid.innerHTML = "";

  // Ustawiamy miesiąc w nagłówku kalendarza
  currentMonthLabel.textContent = format(date, "MMMM yyyy");

  // Wywołujemy renderowanie widoku miesiąca
  renderMonthView(date, calendarGrid);
};

// **📌 Widok miesiąca**
const renderMonthView = (date, grid) => {
  const projects = getLocalStorage("projects") || [];
  const firstDayOfMonth = startOfMonth(date);
  const lastDayOfMonth = endOfMonth(date);
  const startDayIndex = getDay(firstDayOfMonth);
  const emptyCells = startDayIndex === 0 ? 6 : startDayIndex - 1;

  // 🔹 Dodajemy puste komórki przed pierwszym dniem miesiąca
  for (let i = 0; i < emptyCells; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.classList.add("calendar-empty");
    grid.appendChild(emptyCell);
  }

  // 🔹 Dodajemy faktyczne dni miesiąca
  eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth }).forEach(
    (day) => {
      const formattedDate = format(day, "yyyy-MM-dd"); // Konwersja daty
      const dayElement = document.createElement("div");
      dayElement.classList.add("calendar-day");
      dayElement.textContent = format(day, "d");

      // 🔹 Sprawdzenie, czy dzień ma zadania
      const tasksForDay = [];
      projects.forEach((project) => {
        project.tasks.forEach((task) => {
          if (task.date === formattedDate) {
            tasksForDay.push(task);
            task.projectName = project.name; // Dodaj nazwę projektu do taska
          }
        });
      });

      renderTasksInDay(dayElement, tasksForDay);
      // Podświetlenie dzisiejszego dnia
      if (isToday(day)) {
        dayElement.classList.add("today-calendar");
      }

      grid.appendChild(dayElement);
    }
  );
};

// **📌 Funkcja renderowania tasków w dniu**
const renderTasksInDay = (dayElement, tasks) => {
  const dayNumber = parseInt(dayElement.textContent, 10);
  const fullDate = new Date(currentDate);
  fullDate.setDate(dayNumber); // Ustawiamy numer dnia w bieżącym miesiącu i roku
  // 🔹 Tworzymy span dla numeru dnia
  const dayNumberSpan = document.createElement("span");
  dayNumberSpan.classList.add("day-number");
  dayNumberSpan.textContent = format(fullDate, "d"); // Ustawiamy numer dnia

  // Czyścimy dayElement i dodajemy numer dnia
  dayElement.innerHTML = "";
  dayElement.appendChild(dayNumberSpan);

  const taskLimit = 2; // Maksymalnie 2 widoczne taski
  tasks.slice(0, taskLimit).forEach((task) => {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");
    taskItem.classList.add(`priority-${task.priority}`);
    taskItem.textContent = `${task.projectName}: ${task.name}`;
    dayElement.appendChild(taskItem);
  });
  if (tasks.length > 0) {
    const taskDotContainer = document.createElement("div");
    taskDotContainer.classList.add("task-dot-container");
    tasks.forEach((task) => {
      const taskDot = document.createElement("span");
      taskDot.classList.add("task-dot");
      if (task.priority === "high") {
        taskDot.style.backgroundColor = "red";
      } else if (task.priority === "medium") {
        taskDot.style.backgroundColor = "orange";
      } else {
        taskDot.style.backgroundColor = "green";
      }
      taskDotContainer.appendChild(taskDot);
    });
    dayElement.appendChild(taskDotContainer);
  }
  if (tasks.length > taskLimit) {
    const showMoreBtn = document.createElement("button");
    showMoreBtn.textContent = `+${tasks.length - taskLimit} more`;
    showMoreBtn.classList.add("show-more-btn");

    showMoreBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      showTaskPopup(tasks);
    });

    dayElement.appendChild(showMoreBtn);
  }

  dayElement.addEventListener("click", () => {
    showTaskPopup(tasks);
  });
};

// **📌 Funkcja otwierająca popup z pełną listą tasków**
const showTaskPopup = (tasks) => {
  let existingPopup = document.querySelector(".task-popup");
  if (existingPopup) existingPopup.remove();

  const popup = document.createElement("div");
  popup.classList.add("task-popup");

  const popupTitle = document.createElement("h3");
  popupTitle.textContent = "Tasks for this day";

  const taskList = document.createElement("ul");
  tasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.classList.add(`priority-${task.priority}`);
    taskItem.textContent = `${task.projectName}: ${task.name}`;
    taskList.appendChild(taskItem);
  });

  const closePopupBtn = document.createElement("button");
  closePopupBtn.textContent = "Close";
  closePopupBtn.classList.add("close-popup-btn");

  closePopupBtn.addEventListener("click", () => {
    popup.remove();
  });

  popup.appendChild(popupTitle);
  popup.appendChild(taskList);
  popup.appendChild(closePopupBtn);

  document.body.appendChild(popup);
};

// **📌 Obsługa zmiany miesiąca**
document.getElementById("prev-month-btn").addEventListener("click", () => {
  currentDate = setMonth(currentDate, getMonth(currentDate) - 1);
  renderCalendar(currentDate);
});

document.getElementById("next-month-btn").addEventListener("click", () => {
  currentDate = setMonth(currentDate, getMonth(currentDate) + 1);
  renderCalendar(currentDate);
});

// **📌 Inicjalizacja kalendarza**
renderCalendar(currentDate);

export default renderCalendar;
