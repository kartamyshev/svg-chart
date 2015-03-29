function ajaxRequest(url, callback) {
    var xhr;

    if(typeof XMLHttpRequest !== 'undefined') xhr = new XMLHttpRequest();
    else {
        var versions = ["MSXML2.XmlHttp.5.0",
            "MSXML2.XmlHttp.4.0",
            "MSXML2.XmlHttp.3.0",
            "MSXML2.XmlHttp.2.0",
            "Microsoft.XmlHttp"];

        for(var i = 0, len = versions.length; i < len; i++) {
            try {
                xhr = new ActiveXObject(versions[i]);
                break;
            }
            catch(e){}
        }
    }

    xhr.onreadystatechange = ensureReadiness;

    function ensureReadiness() {
        if(xhr.readyState < 4) return;
        if(xhr.status !== 200) return;
        if(xhr.readyState === 4) callback(xhr);
    }

    xhr.open('GET', url, true);
    xhr.send('');
}

var $svgContainer = document.querySelector('svg'),
    svg = {width: 900, height: 500},
    charts = [],
    urls = {
        chartData: 'data/chartData.json'
    },
    balance = {
        min: 0,
        max: 0
    },
    sum = 0,
    ratio,
    chartData = [];

ajaxRequest(urls.chartData, function(xhr) {
    chartData = JSON.parse(xhr.responseText);

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
                neutral: 'rgba(0, 0, 0, .45)'
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
});

