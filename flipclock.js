function initTimer(elementId, datestr) {
  const mainContainer = document.getElementById(elementId);
  const containers = mainContainer.querySelectorAll(".container-sub");
  const days = mainContainer.querySelector(".days");
  const hours = mainContainer.querySelector(".hours");
  const minutes = mainContainer.querySelector(".minutes");
  const seconds = mainContainer.querySelector(".seconds");

  let check = [];
  let total = Math.floor((new Date(datestr).valueOf() - Date.now()) / 1000);

  function countDown() {
    const times = [{}, {}, {}, {}];
    total -= 1;
    let s1 = Math.floor(total % 60);
    times[3].front = s1;
    times[3].back = s1 === 0 ? 59 : s1 - 1;

    let min = total / 60;
    let m1 = Math.floor(min % 60);
    times[2].front = m1;
    times[2].back = m1 === 0 ? 59 : m1 - 1;

    let hour = min / 60;
    let h1 = Math.floor(hour % 24);
    times[1].front = h1;
    times[1].back = h1 === 0 ? 23 : h1 - 1;

    let day = hour / 24;
    let d1 = Math.floor(day);
    times[0].front = d1;
    times[0].back = d1 === 0 ? 0 : d1 - 1;

    let i = 0;
    containers.forEach((container) => {
      const clock = container.querySelector(".clock");

      const front = container.querySelector(".front");
      const back = container.querySelector(".back");

      const frontTime =
        times[i].front < 10 ? "0" + times[i].front : times[i].front;
      const backTime = times[i].back < 10 ? "0" + times[i].back : times[i].back;

      clock.dataset.before = frontTime;
      clock.dataset.after = backTime;
      front.textContent = frontTime;
      back.textContent = backTime;

      container.addEventListener(
        "animationend",
        () => {
          container.classList.remove("flip");
          front.textContent = back.textContent;
          clock.dataset.before = clock.dataset.after;
        },
        { once: true }
      );

      i++;
    });

    seconds.parentElement.classList.add("flip");

    if (seconds.dataset.before == "00") {
      minutes.parentElement.classList.add("flip");
    }
    if (seconds.dataset.before == "00" && minutes.dataset.before == "00") {
      hours.parentElement.classList.add("flip");
    }
    if (
      seconds.dataset.before == "00" &&
      minutes.dataset.before == "00" &&
      hours.dataset.before == "00"
    ) {
      days.parentElement.classList.add("flip");
    }
  }

  countDown();

  setInterval(countDown, 1000);
}

initTimer("kınatimer", "June 21 2024 15:00");
initTimer("nikahtimer", "June 24 2024 19:00");
