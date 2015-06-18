"use strict";

var svg = {
    container: document.querySelector("svg"),
    width: 800,
    height: 500
};

function normalizeYPoint(data) {
    return data.map(function (point) {
        return {
            x: point.x,
            y: svg.height - point.y
        };
    });
}

var clicksData = normalizeYPoint([{ x: 0, y: 0 }, { x: 100, y: 140 }, { x: 200, y: 50 }, { x: 300, y: 50 }, { x: 400, y: 200 }, { x: 500, y: 300 }, { x: 600, y: 150 }, { x: 700, y: 340 }, { x: 800, y: 0 }]);
var clicksPathD = "M" + clicksData[0].x + " " + clicksData[0].y + " ";
clicksData.forEach(function (point, ind) {
    clicksPathD += "L " + point.x + " " + point.y + " ";
    if (ind > 0 && ind < clicksData.length - 1) {
        document.querySelector(".click-circles").innerHTML += "<circle fill=white stroke-width=3 stroke=green r=" + 7 + " cx=" + point.x + " cy=" + point.y + "  />";
    }
});
document.querySelector(".clicks").setAttribute("d", clicksPathD);

var moneyData = normalizeYPoint([{ x: 0, y: 0 }, { x: 120, y: 140 }, { x: 200, y: 150 }, { x: 300, y: 250 }, { x: 400, y: 100 }, { x: 500, y: 100 }, { x: 600, y: 60 }, { x: 700, y: 220 }, { x: 800, y: 0 }]);
var moneyPathD = "M" + moneyData[0].x + " " + moneyData[0].y + " ";
moneyData.forEach(function (point, ind) {
    moneyPathD += "L " + point.x + " " + point.y + " ";
    if (ind > 0 && ind < moneyData.length - 1) {
        document.querySelector(".money-circles").innerHTML += "<circle stroke-opacity=0.5 fill=white stroke-width=3 stroke=#8B1510 r=" + 7 + " cx=" + point.x + " cy=" + point.y + "  />";
    }
});
document.querySelector(".money").setAttribute("d", moneyPathD);
