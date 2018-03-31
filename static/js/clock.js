function Page () {
    this.curStatus = {
        timer: null,
        status: -1,
        result: document.getElementById('result'),
        services: [new Clock(), new WorldClock(), new StopWatch()]
    };

    this.load = function() {
        var elButton = document.getElementById('button');
        // Create event listener:
        elButton.addEventListener('click', checkAndShow.bind(this), false);
    };

    function checkAndShow() {
        var options = document.getElementsByName('service');
        var curStatus = this.curStatus;

        for (var i = 0; i <= options.length; i++) {
            if (i === options.length) {
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
            // for the case that user hadn't stopped the timer before switch the service
            if (curStatus.status === 2 && curStatus.services[2].running === true) {
                curStatus.services[2].clear();
            } else if (curStatus.status === 0) {
                clearInterval(curStatus.timer);
            } else if (curStatus.status === 1) {
                curStatus.timer.forEach(function(e) {
                    clearInterval(e);
                });
            };
            curStatus.result.innerHTML = '';

            if (tag === 0) curStatus.timer = curStatus.services[0].showCurTime();
            else if (tag === 1) curStatus.timer = curStatus.services[1].showClock();
            else if (tag === 2) curStatus.timer = curStatus.services[2].showStopWatch();
            else {
                curStatus.timer = null;
                alert('Please select one feasible option! Thanks!');
            }
            curStatus.status = tag;
        }
    }

    function checkTime(i) {
        if (i < 10) i = '0' + i;
        return i;
    }

    function Clock() {
        this.showCurTime = function() {
            displayTime();
            var timer = setInterval(displayTime, 1000);
            return timer;
        };

        function displayTime() {
            var cur = new Date();
            var hr = cur.getHours();
            var min = cur.getMinutes();
            var sec = cur.getSeconds();
            min = checkTime(min);
            sec = checkTime(sec);
            var result = document.getElementById('result');
            result.innerHTML = '<div class="curClock">' + '<div class="h">' + hr + '</div><div class="m">' + min + "</div><div class ='s'>" + sec + '</div></div>';
        }
    }

    function StopWatch() {
        this.startTime = null;
        this.timer = null;
        this.time = [0, 0, 0];
        this.diff = 0;
        this.running = false;
        this.result = document.getElementById('result');

        this.clear = function() {
            if (this.timer) clearInterval(this.timer);
            this.startTime = null;
            this.time = [0, 0, 0];
            this.diff = 0;
            this.running = false;
        };

        this.showStopWatch = function() {
            var watch = document.createElement('div');
            var result = document.getElementById('result');
            watch.setAttribute('id', 'watch');
            result.appendChild(watch);
            reset.bind(this)();

            var txt = '<a href="#" class="button">Start </a>';
            txt += '<a href="#" class="button">Stop </a>';
            txt += '<a href="#" class="button">Lap </a>';
            txt += '<a href="#" class="button">Reset </a>';
            txt += '<a href="#" class="button">Clear Laps</a>';
            var exButtons = document.createElement('div');
            exButtons.setAttribute('id', 'exButtons');
            exButtons.innerHTML = txt;
            result.appendChild(exButtons);

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
        };

        function reset() {
            this.clear();
            document.getElementById('watch').innerHTML = checkTime(this.time[0]) + ' : ' + checkTime(this.time[1]) + '.' + checkTime(this.time[2]);
        }

        function start() {
            if (!this.running && !this.startTime) {
                this.startTime = new Date().getTime();
            } else return;
            this.running = true;
            this.timer = setInterval(calculateTime.bind(this), 10);
        }

        function calculateTime () {
            var cur = new Date().getTime();
            var toAdd = (cur - this.startTime) / 10;
            this.time[2] = Math.floor((this.diff + toAdd) % 100);
            this.time[1] = Math.floor((this.diff + toAdd - (this.diff + toAdd) % 100) / 100 % 60);
            this.time[0] = Math.floor((this.diff + toAdd - (this.diff + toAdd - (this.diff + toAdd) % 100) / 100 % 60) / 60 / 100);
            document.getElementById('watch').innerHTML = checkTime(this.time[0]) + ' : ' + checkTime(this.time[1]) + '.' + checkTime(this.time[2]);
        }

        function stop () {
            if (!this.running || !this.startTime || !this.timer) return;
            clearInterval(this.timer);
            this.diff += (new Date().getTime() - this.startTime) / 10;
            this.running = false;
            this.startTime = null;
        }

        function lap() {
            var li = document.createElement('li');
            li.innerText = checkTime(this.time[0]) + ':' + checkTime(this.time[1]) + '.' + checkTime(this.time[2]);
            document.getElementById('lapLists').appendChild(li);
        }

        function clearLaps() {
            document.getElementById('lapLists').innerHTML = '';
        }
    }

    function WorldClock() {
        this.result = document.getElementById('result');
        this.timeList = [
            {
                city: 'Seattle',
                offset: 0
            },
            {
                city: 'Minneapolis',
                offset: 2
            },
            {
                city: 'New York',
                offset: 3
            },
            {
                city: 'London',
                offset: 8
            },
            {
                city: 'Berlin',
                offset: 9
            },
            {
                city: 'Beijing',
                offset: 15
            },
            {
                city: 'Tokyo',
                offset: 16
            },
            {
                city: 'Sydney',
                offset: 18
            }
        ];

        this.init = function() {
            var container = document.createElement('div');
            container.setAttribute('class', 'clock-container');
            this.result.appendChild(container);

            this.timeList.forEach(function(e) {
                var div = document.createElement('div');
                div.setAttribute('id', e.city);
                div.setAttribute('class', 'worldClock');
                container.appendChild(div);

                var city = document.createElement('div');
                city.setAttribute('class', 'cityName');
                city.innerHTML = e.city;
                div.appendChild(city);

                var canvas = document.createElement('canvas');
                canvas.setAttribute('id', e.city + '-canvas');
                canvas.setAttribute('class', 'clockCanvas');
                canvas.setAttribute('width', '200');
                canvas.setAttribute('height', '200');
                canvas.setAttribute('style', 'background-color:#222');
                div.appendChild(canvas);
            });
        };

        this.showClock = function() {
            this.init();
            var that = this;
            var timers = [];
            for (var i = 0; i < that.timeList.length; i++) {
                var canvas = document.getElementById(that.timeList[i].city + '-canvas');
                var offset = that.timeList[i].offset;
                var ctx = canvas.getContext('2d');
                var radius = canvas.height / 2;
                ctx.translate(radius, radius);
                radius *= 0.9;
                drawClock(ctx, offset, radius);
                var timer = setInterval(drawClock.bind(null, ctx, offset, radius), 1000);
                timers.push(timer);
            }
            return timers;

            function drawClock(ctx, offset, radius) {
                drawFace(ctx, radius);
                drawTime(ctx, offset, radius);
            }

            function drawFace(ctx, radius) {
                ctx.beginPath();
                ctx.arc(0, 0, radius, 0, 2 * Math.PI);
                ctx.fillStyle = '#333';
                ctx.fill();
                ctx.beginPath();
                ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
                ctx.fillStyle = '#222';
                ctx.fill();
            }

            function drawTime(ctx, offset, radius) {
                var localTime = new Date();
                var localHr = localTime.getHours();
                var min = localTime.getMinutes();
                var sec = localTime.getSeconds();
                var hr = calculateHr(localHr, offset);
                var degree = calDegree(hr, min, sec);

                drawHand(ctx, degree.hrDgr, radius * 0.5, radius * 0.07);
                drawHand(ctx, degree.minDgr, radius * 0.8, radius * 0.07);
                drawHand(ctx, degree.secDgr, radius * 0.9, radius * 0.02);

                function drawHand (ctx, dgr, height, width) {
                    ctx.beginPath();
                    ctx.lineWidth = width;
                    ctx.lineCap = 'round';
                    ctx.moveTo(0, 0);
                    ctx.rotate(dgr);
                    ctx.lineTo(0, -height);
                    ctx.strokeStyle = '#4CAF50';
                    ctx.stroke();
                    ctx.rotate(-dgr);
                }

                function calDegree (hr, min, sec) {
                    var degree = {
                        hrDgr: Math.PI * (hr + min / 60 + sec / 3600) / 6,
                        minDgr: Math.PI * (min / 30 + sec / 1800),
                        secDgr: Math.PI * (sec / 30)
                    };
                    return degree;
                }

                function calculateHr (hr, offset) {
                    var calHr = hr + offset;
                    while (calHr < 0) {
                        calHr += 12;
                    }
                    if (calHr >= 12) {
                        calHr %= 12;
                    }
                    return calHr;
                }
            }
        };
    }
}
var page = new Page();
page.load();
