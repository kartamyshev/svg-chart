var $svgContainer = document.querySelector('svg'),
    svg = {width: 900, height: 500},
    charts = [],
    balance = {
        min: 0,
        max: 0
    },
    sum = 0,
    ratio,
    chartData = [
        {"cashBalance": 100, "points": {"currentState": 120, "duration": 40}},
        {"cashBalance": 350, "points": {"currentState": 240, "duration": 60}},
        {"cashBalance": -340, "points": {"currentState": 200, "duration": 90}},
        {"cashBalance": 0, "points": {"currentState": 220, "duration": 40}},
        {"cashBalance": 618, "points": {"currentState": 40, "duration": 40}},
        {"cashBalance": 900, "points": {"currentState": 140, "duration": 40}},
        {"cashBalance": -980, "points": {"currentState": 400, "duration": 40}},
        {"cashBalance": 0, "points": {"currentState": 120, "duration": 130}},
        {"cashBalance": 130, "points": {"currentState": 300, "duration": 20}},
        {"cashBalance": 100, "points": {"currentState": 120, "duration": 40}},
        {"cashBalance": -790, "points": {"currentState": 250, "duration": 90}},
        {"cashBalance": -380, "points": {"currentState": 200, "duration": 90}},
        {"cashBalance": 0, "points": {"currentState": 220, "duration": 40}},
        {"cashBalance": 818, "points": {"currentState": 194, "duration": 70}},
        {"cashBalance": -340, "points": {"currentState": 200, "duration": 90}},
        {"cashBalance": 7, "points": {"currentState": 220, "duration": 40}},
        {"cashBalance": 820, "points": {"currentState": 92, "duration": 250}},
        {"cashBalance": 700, "points": {"currentState": 140, "duration": 40}},
        {"cashBalance": -380, "points": {"currentState": 200, "duration": 90}},
        {"cashBalance": 0, "points": {"currentState": 220, "duration": 140}},
        {"cashBalance": 432, "points": {"currentState": 10, "duration": 40}},
        {"cashBalance": -340, "points": {"currentState": 200, "duration": 90}},
        {"cashBalance": -580, "points": {"currentState": 189, "duration": 90}},
        {"cashBalance": 0, "points": {"currentState": 220, "duration": 40}},
        {"cashBalance": 818, "points": {"currentState": 10, "duration": 40}},
        {"cashBalance": 900, "points": {"currentState": 140, "duration": 40}},
        {"cashBalance": -980, "points": {"currentState": 400, "duration": 40}},
        {"cashBalance": 900, "points": {"currentState": 140, "duration": 40}},
        {"cashBalance": -760, "points": {"currentState": 211, "duration": 40}},
        {"cashBalance": 0, "points": {"currentState": 120, "duration": 130}},
        {"cashBalance": -680, "points": {"currentState": 400, "duration": 40}},
        {"cashBalance": 0, "points": {"currentState": 210, "duration": 130}},
        {"cashBalance": 130, "points": {"currentState": 300, "duration": 20}},
        {"cashBalance": -300, "points": {"currentState": 310, "duration": 25}},
        {"cashBalance": 0, "points": {"currentState": 4, "duration": 60}}
    ];

balance.min = chartData[0].cashBalance;
balance.max = chartData[0].cashBalance;

chartData.forEach(function (d) {
    if (d.cashBalance < balance.min) balance.min = d.cashBalance;
    if (d.cashBalance > balance.max) balance.max = d.cashBalance;
    sum += d.points.duration;
});

ratio = +(svg.width / sum).toFixed(4);

chartData.forEach(function (d) {
    d.points.duration = d.points.duration * ratio;
});


!function drawChart() {
    var colors = {
            positive: '',
            negative: '',
            neutral: 'rgba(0, 0, 0, .4)'
        },
        x = 0,
        hue = 170,
        tone = 60,
        startFrom = 0,
        currentState = 0;

    $svgContainer.style.width = svg.width + 'px';
    $svgContainer.style.height = svg.height + 'px';

    return charts = chartData.map(function (c, ind, arr) {
        x += c.points.duration;
        startFrom = ind === 0 ? 0 : +(startFrom += arr[ind - 1].points.duration).toFixed(2);
        currentState = c.points.currentState >= 0 ? c.points.currentState : 0;
        var alpha;

        var fillColor = function () {
            var color;

            if (c.cashBalance !== 0) {
                if (c.cashBalance > 0) {
                    alpha = (Math.abs(c.cashBalance / balance.min)).toFixed(3);
                    colors.negative = 'rgba(' + tone + ', ' + hue + ', ' + tone + ', ' + alpha + ')';
                    color = colors.negative;
                } else {
                    alpha = (Math.abs(c.cashBalance / balance.max)).toFixed(3);
                    colors.positive = 'rgba(' + hue + ', ' + tone + ', ' + tone + ', ' + alpha + ')';
                    color = colors.positive;
                }
            } else color = colors.neutral;

            return color;
        };


        var d = "M" +
            startFrom + ' ' + svg.height + ' L ' +
            startFrom + ' ' +
            currentState + ', ' + x + ' ' +
            currentState + ', ' + x + ' ' + svg.height;

        $svgContainer.innerHTML += "<path fill='" + fillColor() + "' d='" + d + "' stroke='#000' stroke-width='1' />";
    });
}();