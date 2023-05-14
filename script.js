//getting all the hour, min and sec box
hour = document.querySelector("#hour");
min = document.querySelector("#min");
sec = document.querySelector("#sec");

//getting all the buttons
countdownBtn = document.querySelector("#btn-id-countdown");
stopwatchBtn = document.querySelector("#btn-id-stopwatch");
startBtn = document.querySelector("#start");
pauseBtn = document.querySelector("#pause");
resetBtn = document.querySelector("#reset");
continueBtn = document.querySelector("#continue");
title = document.querySelector(".title");
let startTime,
  startStopWatchTimer,
  startStopWatchInterval,
  countdownPage,
  stopwatchPage;

let switchMode = 0;

//After onclick event switching the page to StopWatch
stopwatchBtn.addEventListener("click", (e) => {
  stopwatchBtn.style.display = "none";
  countdownBtn.style.display = "initial";

  title.innerHTML = title.innerHTML.replace("Countdown", "Stopwatch");
  switchMode = 1;
});

//After onclick event switching the page to countdown
countdownBtn.addEventListener("click", (e) => {
  countdownBtn.style.display = "none";
  stopwatchBtn.style.display = "initial";
  title.innerHTML = title.innerHTML.replace("Stopwatch", "Countdown");
  switchMode = 0;
});

//--------------- Start Button on click Event Actions ---------------------
startBtn.addEventListener("click", () => {
  // ------------- Countdown Setinterval Functions-----------------------
  startInterval = () => {
    startBtn.style.display = "none";
    pauseBtn.style.display = "initial";
    startTime = setInterval(() => {
      startTimer();
    }, 1000);
  };

  // ------------- Stopwatch Setinterval Functions-----------------------
  startStopWatch = () => {
    startBtn.style.display = "none";
    pauseBtn.style.display = "initial";
    startStopWatchInterval = setInterval(() => {
      startStopWatchTimer();
    }, 1000);
  };

  // Switch for Start button click Event (1 for Starting Stopwatch) & (0 for Startinng Countdown)
  if (switchMode == 1) {
    startStopWatch();
  } else {
    if (hour.value == 0 && min.value == 0 && sec.value == 0) return;
    startInterval();
  }
});

//--------------- Stop function for Stopping timer ---------------------
stopTimer = () => {
  clearInterval(startTime);
  clearInterval(startStopWatchInterval);
};

//--------------- Pause Button on click Event Actions ---------------------
pauseBtn.addEventListener("click", () => {
  stopTimer();
  continueBtn.style.display = "initial";
  pauseBtn.style.display = "none";
  startBtn.style.display = "none";
});

//--------------- Continue Button on click Event Actions ---------------------
continueBtn.addEventListener("click", () => {
  if (switchMode == 1) {
    startStopWatch();
  } else {
    if (hour.value == 0 && min.value == 0 && sec.value == 0) return;
    startInterval();
  }
  continueBtn.style.display = "none";
  pauseBtn.style.display = "initial";
  startBtn.style.display = "none";
});

//--------------- Reset Button on click Event Actions ---------------------
resetBtn.addEventListener("click", () => {
  continueBtn.style.display = "none";
  startBtn.style.display = "initial";
  pauseBtn.style.display = "none";
  stopTimer();
  hour.value = "";
  min.value = "";
  sec.value = "";
});

//------------------start countdown timer function-----------------------//
startTimer = () => {
  //--------If seconds value exceeds 60------------------
  if (sec.value > 60) {
    min.value = String(Number(min.value) + 1).padStart(2, "0");
    sec.value = String(Number(sec.value) - 60).padStart(2, "0");
  }
  //--------If min value exceeds 60------------------
  if (min.value > 60) {
    hour.value = String(Number(hour.value) + 1).padStart(2, "0");
    min.value = String(Number(min.value) - 60).padStart(2, "0");
  }

  if (hour.value == 0 && min.value == 0 && sec.value == 0) {
    hour.value = "";
    min.value = "";
    sec.value = "";
    stopTimer();
  } else if (sec.value != 0) {
    sec.value = String(Number(sec.value) - 1).padStart(2, "0");
  } else if (min.value != 0 && sec.value == 0) {
    min.value = String(Number(min.value) - 1).padStart(2, "0");
    sec.value = 59;
  } else if (hour.value != 0 && min.value == 0) {
    hour.value = String(Number(hour.value) - 1).padStart(2, "0");
    sec.value = 59;
    min.value = 59;
  }
};

// ---------------  Stop Watch Timer Function ----------------------- //

startStopWatchTimer = () => {
  //--------If seconds value exceeds 60------------------
  if (sec.value >= 59) {
    min.value = String(Number(min.value) + 1).padStart(2, "0");
    sec.value = String(Number(sec.value) - 60).padStart(2, "0");
  }
  //--------If min value exceeds 60------------------
  if (min.value >= 60) {
    hour.value = String(Number(hour.value) + 1).padStart(2, "0");
    min.value = String(Number(min.value) - 60).padStart(2, "0");
  }
  sec.value = String(Number(sec.value) + 1).padStart(2, "0");
};
