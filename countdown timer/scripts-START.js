let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');

const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    clearInterval(countdown);
    const now = Date.now();
    const then = seconds * 1000 + now;

    displayTimeLeft(seconds);
    displayEndtime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        console.log(secondsLeft);
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000)


}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    console.log(minutes);
    const secs = seconds % 60
    console.log(secs);
    const display = `${minutes}:${secs<10?'0':''}${secs}`;
    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndtime(timeStamp) {
    const end = new Date(timeStamp);
    const hour = end.getHours();
    const adjustHour = hour > 12 ? hour - 12 : hour;
    const minutes = end.getMinutes();
    endTime.textContent = `${adjustHour}:${minutes}`;
}

function startTimer() {
    const seconds = this.dataset.time;
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
});