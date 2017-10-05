const readline = require('readline');

class TimedInputOutput {
    constructor(separator, initialDelay, delay) {
        this.lastOutput = Promise.resolve(1);
        this.separator = separator;
        this.delay = delay;
        this.initialDelay = initialDelay;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    queueText(text) {
        let output = text.split(this.separator)
            .map((bit, index) => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        this.rl.write(bit + this.separator);
                        resolve();
                    }, this.initialDelay + index * this.delay);
                });
            });
        return Promise.all(output);
    }

    question() {
        return this.lastOutput = this.lastOutput.then(() => {
            return new Promise((resolve, reject) => {
                this.rl.question(' ', (answer) => {
                    resolve(answer);
                });
            });
        });
    }

    write(text) {
        return this.lastOutput = this.lastOutput.then(() => {
            return this.queueText(text);
        });
    }
}

module.exports = TimedInputOutput;

