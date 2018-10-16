var CountUp = function(h, b, i, e, g, n) {
    var a = 0;
    var l = ["webkit", "moz", "ms", "o"];
    for (var j = 0; j < l.length && !window.requestAnimationFrame; ++j) {
        window.requestAnimationFrame = window[l[j] + "RequestAnimationFrame"];
        window.cancelAnimationFrame = window[l[j] + "CancelAnimationFrame"] || window[l[j] + "CancelRequestAnimationFrame"]
    }
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(s, p) {
            var o = new Date().getTime();
            var q = Math.max(0, 16 - (o - a));
            var r = window.setTimeout(function() {
                s(o + q)
            }, q);
            a = o + q;
            return r
        }
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(o) {
            clearTimeout(o)
        }
    }
    var m = this;
    m.version = function() {
        return "1.8.5"
    };

    function d(s) {
        s = s.toFixed(m.decimals);
        s += "";
        var o, r, p, q;
        o = s.split(".");
        r = o[0];
        p = o.length > 1 ? m.options.decimal + o[1] : "";
        q = /(\d+)(\d{3})/;
        if (m.options.useGrouping) {
            while (q.test(r)) {
                r = r.replace(q, "$1" + m.options.separator + "$2")
            }
        }
        return m.options.prefix + r + p + m.options.suffix
    }

    function c(p, o, r, q) {
        return r * (-Math.pow(2, -10 * p / q) + 1) * 1024 / 1023 + o
    }

    function f(o) {
        return (typeof o === "number" && !isNaN(o))
    }
    m.options = {
        useEasing: true,
        useGrouping: true,
        separator: ",",
        decimal: ".",
        easingFn: c,
        formattingFn: d,
        prefix: "",
        suffix: ""
    };
    if (n && typeof n === "object") {
        for (var k in m.options) {
            if (n.hasOwnProperty(k) && n[k] !== null) {
                m.options[k] = n[k]
            }
        }
    }
    if (m.options.separator === "") {
        m.options.useGrouping = false
    }
    m.initialize = function() {
        if (m.initialized) {
            return true
        }
        m.d = (typeof h === "string") ? document.getElementById(h) : h;
        if (!m.d) {
            console.error("[CountUp] target is null or undefined", m.d);
            return false
        }
        m.startVal = Number(b);
        m.endVal = Number(i);
        if (f(m.startVal) && f(m.endVal)) {
            m.decimals = Math.max(0, e || 0);
            m.dec = Math.pow(10, m.decimals);
            m.duration = Number(g) * 1000 || 2000;
            m.countDown = (m.startVal > m.endVal);
            m.frameVal = m.startVal;
            m.initialized = true;
            return true
        } else {
            console.error("[CountUp] startVal or endVal is not a number", m.startVal, m.endVal);
            return false
        }
    };
    m.printValue = function(p) {
        var o = m.options.formattingFn(p);
        if (m.d.tagName === "INPUT") {
            this.d.value = o
        } else {
            if (m.d.tagName === "text" || m.d.tagName === "tspan") {
                this.d.textContent = o
            } else {
                this.d.innerHTML = o
            }
        }
    };
    m.count = function(p) {
        if (!m.startTime) {
            m.startTime = p
        }
        m.timestamp = p;
        var o = p - m.startTime;
        m.remaining = m.duration - o;
        if (m.options.useEasing) {
            if (m.countDown) {
                m.frameVal = m.startVal - m.options.easingFn(o, 0, m.startVal - m.endVal, m.duration)
            } else {
                m.frameVal = m.options.easingFn(o, m.startVal, m.endVal - m.startVal, m.duration)
            }
        } else {
            if (m.countDown) {
                m.frameVal = m.startVal - ((m.startVal - m.endVal) * (o / m.duration))
            } else {
                m.frameVal = m.startVal + (m.endVal - m.startVal) * (o / m.duration)
            }
        }
        if (m.countDown) {
            m.frameVal = (m.frameVal < m.endVal) ? m.endVal : m.frameVal
        } else {
            m.frameVal = (m.frameVal > m.endVal) ? m.endVal : m.frameVal
        }
        m.frameVal = Math.round(m.frameVal * m.dec) / m.dec;
        m.printValue(m.frameVal);
        if (o < m.duration) {
            m.rAF = requestAnimationFrame(m.count)
        } else {
            if (m.callback) {
                m.callback()
            }
        }
    };
    m.start = function(o) {
        if (!m.initialize()) {
            return
        }
        m.callback = o;
        m.rAF = requestAnimationFrame(m.count)
    };
    m.pauseResume = function() {
        if (!m.paused) {
            m.paused = true;
            cancelAnimationFrame(m.rAF)
        } else {
            m.paused = false;
            delete m.startTime;
            m.duration = m.remaining;
            m.startVal = m.frameVal;
            requestAnimationFrame(m.count)
        }
    };
    m.reset = function() {
        m.paused = false;
        delete m.startTime;
        m.initialized = false;
        if (m.initialize()) {
            cancelAnimationFrame(m.rAF);
            m.printValue(m.startVal)
        }
    };
    m.update = function(o) {
        if (!m.initialize()) {
            return
        }
        o = Number(o);
        if (!f(o)) {
            console.error("[CountUp] update() - new endVal is not a number", o);
            return
        }
        if (o === m.frameVal) {
            return
        }
        cancelAnimationFrame(m.rAF);
        m.paused = false;
        delete m.startTime;
        m.startVal = m.frameVal;
        m.endVal = o;
        m.countDown = (m.startVal > m.endVal);
        m.rAF = requestAnimationFrame(m.count)
    };
    if (m.initialize()) {
        m.printValue(m.startVal)
    }
};
