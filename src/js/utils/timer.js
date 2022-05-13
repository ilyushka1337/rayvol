export default class Timer{
    constructor({container, timeLimit, onEnd = null}){
        this.container = container

        this.timeLimit = timeLimit;
        this.timePassed = 0;
        this.timeLeft = timeLimit;
        this.onEnd = onEnd

        let tpl = this.createTemplate()
        this.container.innerHTML = tpl

        this.remainingPath = this.container.querySelector('[data-remaining-path]')
        let pathLength = this.remainingPath.getTotalLength().toFixed(0)
        this.remainingPath.setAttribute("stroke-dasharray", pathLength);

        this.startTimer()
    }
    createTemplate(){
        return `
        <div class="base-timer">
            <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g class="base-timer__circle">
                    <path
                        data-remaining-path
                        stroke-dasharray=""
                        class="base-timer__path-remaining"
                        d="M 50, 50 m -50, 0 a 50,50 0 1,0 100,0 a 50,50 0 1,0 -100,0"
                    ></path>
                </g>
            </svg>
            <span data-timer-label class="base-timer__label">${this.formatTime(this.timeLeft)}</span>
        </div>
        `
    }
    formatTime(time) {
        let seconds = time % 60;
        return seconds;
    }
    startTimer() {
        const timerCycle = () => {
            // The amount of time passed increments by one
            this.timePassed = this.timePassed += 1;
            this.timeLeft = this.timeLimit - this.timePassed;
            
            // The time left label is updated
            this.container.querySelector('[data-timer-label]').innerHTML = this.formatTime(this.timeLeft);
            this.setCircleDasharray()
        }
        this.timerInterval = setInterval(() => {
            timerCycle()
            if (this.timeLeft <= 0){
                this.cancelTimer()
                this.onEnd ? this.onEnd() : null
            }

        }, 1000);
    }
    cancelTimer(){
        clearInterval(this.timerInterval)
    }
    calculateTimeFraction() {
        return this.timeLeft / this.timeLimit;
    }
    setCircleDasharray() {
        let pathLength = this.remainingPath.getTotalLength().toFixed(0)
        const circleDasharray = `${(this.calculateTimeFraction() * pathLength).toFixed(0)} ${pathLength}`;

        this.remainingPath.setAttribute("stroke-dasharray", circleDasharray);
    }
}