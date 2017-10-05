# timed-terminal-print
A small node js module able to output text to the process output with a delay.

Install with:

`npm install timed-terminal-print --save`

Example:

```javascript
let writer = new TimedConsoleWritter('',10,10)

writer.write('Some text')

writer.write('text to write after the first one is done')

writer.write(`I even work great with
     multiline text`)
```