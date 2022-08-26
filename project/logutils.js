var logEnabled = true;

function enableLog() {
  logEnabled = true;
}

function disableLog() {
  logEnabled = false;
}

function log(str) {
  if(logEnabled) {
    console.log(str);
  }
}
