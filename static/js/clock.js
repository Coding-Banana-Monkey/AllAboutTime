function Page() {
  this.curStatus = {
    timer: null,
    status: -1,
    result: document.getElementById('result'),
    services: [new Clock(), new WorldClock(), new StopWatch()]
  }

  this.load = function() {
    var elButton = document.getElementById('button');
    //Create event listener:
    elButton.addEventListener('click', checkAndShow.bind(this), false);
  }

  function checkAndShow() {
    var options = document.getElementsByName('service');
    var curStatus = this.curStatus;
    for (var i = 0; i <= options.length; i++) {
      if (i == options.length) {
        alert('Please select one option before your submit, Thanks!');
        break;
      }
      if (options[i].checked) {
        pageUpdate(i);
        break;
      }
    }

    function pageUpdate(tag) {
      if (curStatus.status === tag) return;
      //for the case that user hadn't stopped the timer before switch the service
      if (curStatus.status === 2 && curStatus.services[2].running === true) {
        curStatus.services[2].clear();
      }
      curStatus.result.innerHTML = '';
      clearInterval(curStatus.timer);
      if (tag === 0) curStatus.timer = curStatus.services[0].showCurTime();
      else if (tag == 1) curStatus.timer = curStatus.services[1].showCurTime();
      else if (tag == 2) curStatus.timer = curStatus.services[2].showStopWatch();
      else {
        curStatus.timer = null;
        alert('Please select one feasible option! Thanks!');
      }
      curStatus.status = tag;
    }
  }

  function checkTime(i) {
    if (i < 10) i = "0" + i;
    return i;
  }

  function Clock() {
    this.showCurTime = function() {
      displayTime();
      var timer = setInterval(displayTime, 1000);
      return timer;
    }

    function displayTime() {
      var cur = new Date();
      var hr = cur.getHours();
      var min = cur.getMinutes();
      var sec = cur.getSeconds();
      min = checkTime(min);
      sec = checkTime(sec);
      result.innerHTML = "Current Time is : " + hr + ":" + min + ":" + sec;
    }
  }

  function StopWatch() {
    this.startTime = null;
    this.timer = null;
    this.time = [0, 0, 0];
    this.diff = 0;
    this.running = false;
    //this.watch = null;
    //this.laps = document.getElementById('lapLists');
    this.result = document.getElementById('result');

    this.clear = function() {
      if (this.timer) clearInterval(this.timer);
      this.startTime = null;
      this.time = [0, 0, 0];
      this.diff = 0;
      this.running = false;
    }

    this.showStopWatch = function() {
      var txt = '<a href="#" class="button">Start </a>';
      txt += '<a href="#" class="button">Stop </a>';
      txt += '<a href="#" class="button">Lap </a>';
      txt += '<a href="#" class="button">Reset </a>';
      txt += '<a href="#" class="button">Clear Laps</a>';
      var exButtons = document.createElement('nav');
      exButtons.setAttribute('id', 'exButtons');
      exButtons.innerHTML = txt;
      result.appendChild(exButtons);
      var watch = document.createElement('div');
      watch.setAttribute('id', 'watch');
      result.appendChild(watch);
      reset.bind(this)();

      var lapLists = document.createElement('div');
      lapLists.setAttribute('id', 'lapLists');
      this.result.appendChild(lapLists);

      var actions = document.getElementsByClassName('button');
      actions[0].addEventListener('click', start.bind(this), false);
      actions[1].addEventListener('click', stop.bind(this), false);
      actions[2].addEventListener('click', lap.bind(this), false);
      actions[3].addEventListener('click', reset.bind(this), false);
      actions[4].addEventListener('click', clearLaps.bind(this), false);
      return this.timer;
    }

    function reset() {
      this.clear();
      document.getElementById('watch').innerHTML = checkTime(this.time[0]) + ":" + checkTime(this.time[1]) + "." + checkTime(this.time[2]);
    }

    function start() {
      //if (this.running) return;
      if (!this.running && !this.startTime) {
        this.startTime = new Date().getTime();
      } else return;
      this.running = true;
      this.timer = setInterval(calculateTime.bind(this), 10);
    }

    function calculateTime() {
      var cur = new Date().getTime();
      var toAdd = (cur - this.startTime) / 10;
      this.time[2] = Math.floor((this.diff + toAdd) % 100);
      this.time[1] = Math.floor((this.diff + toAdd - (this.diff + toAdd) % 100) / 100 % 60);
      this.time[0] = Math.floor((this.diff + toAdd - (this.diff + toAdd - (this.diff + toAdd) % 100) / 100 % 60)/60/100);
      document.getElementById('watch').innerHTML = checkTime(this.time[0]) + ":" + checkTime(this.time[1]) + "." + checkTime(this.time[2]);
    }

    function stop() {
      if (!this.running || !this.startTime || !this.timer) return;
      clearInterval(this.timer);
      this.diff += (new Date().getTime() - this.startTime) / 10;
      this.running = false;
      this.startTime = null;
    }

    function lap() {
          var li = document.createElement('li');
          li.innerText = checkTime(this.time[0]) + ":" + checkTime(this.time[1]) + ":" + checkTime(this.time[2]);
          document.getElementById('lapLists').appendChild(li);
    }

    function clearLaps() {
      document.getElementById('lapLists').innerHTML = "";
    }
  }

  function WorldClock() {
    this.timer = null;
    this.cityList = [];
    this.timeList = [];

  }
}
var page = new Page();
page.load();
