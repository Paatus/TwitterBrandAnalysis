/*
 Highmaps JS v1.0.4 (2014-09-02)

 (c) 2009-2014 Torstein Honsi

 License: www.highcharts.com/license
*/
(function() {
    function q(a, b) {
        var c;
        a || (a = {});
        for (c in b) a[c] = b[c];
        return a
    }

    function v() {
        var a, b = arguments,
            c, d = {},
            e = function(a, b) {
                var c, d;
                typeof a !== "object" && (a = {});
                for (d in b) b.hasOwnProperty(d) && (c = b[d], a[d] = c && typeof c === "object" && Object.prototype.toString.call(c) !== "[object Array]" && d !== "renderTo" && typeof c.nodeType !== "number" ? e(a[d] || {}, c) : b[d]);
                return a
            };
        b[0] === !0 && (d = b[1], b = Array.prototype.slice.call(b, 2));
        c = b.length;
        for (a = 0; a < c; a++) d = e(d, b[a]);
        return d
    }

    function B(a, b) {
        return parseInt(a, b ||
            10)
    }

    function Ca(a) {
        return typeof a === "string"
    }

    function fa(a) {
        return a && typeof a === "object"
    }

    function Da(a) {
        return Object.prototype.toString.call(a) === "[object Array]"
    }

    function ka(a) {
        return typeof a === "number"
    }

    function Pa(a) {
        return F.log(a) / F.LN10
    }

    function la(a) {
        return F.pow(10, a)
    }

    function ta(a, b) {
        for (var c = a.length; c--;)
            if (a[c] === b) {
                a.splice(c, 1);
                break
            }
    }

    function t(a) {
        return a !== r && a !== null
    }

    function G(a, b, c) {
        var d, e;
        if (Ca(b)) t(c) ? a.setAttribute(b, c) : a && a.getAttribute && (e = a.getAttribute(b));
        else if (t(b) &&
            fa(b))
            for (d in b) a.setAttribute(d, b[d]);
        return e
    }

    function na(a) {
        return Da(a) ? a : [a]
    }

    function p() {
        var a = arguments,
            b, c, d = a.length;
        for (b = 0; b < d; b++)
            if (c = a[b], c !== r && c !== null) return c
    }

    function D(a, b) {
        if (za && !ca && b && b.opacity !== r) b.filter = "alpha(opacity=" + b.opacity * 100 + ")";
        q(a.style, b)
    }

    function $(a, b, c, d, e) {
        a = y.createElement(a);
        b && q(a, b);
        e && D(a, {
            padding: 0,
            border: S,
            margin: 0
        });
        c && D(a, c);
        d && d.appendChild(a);
        return a
    }

    function da(a, b) {
        var c = function() {
            return r
        };
        c.prototype = new a;
        q(c.prototype, b);
        return c
    }

    function oa(a,
        b, c, d) {
        var e = K.numberFormat,
            f = J.lang,
            g = +a || 0,
            h = b === -1 ? (g.toString().split(".")[1] || "").length : isNaN(b = U(b)) ? 2 : b,
            i = c === void 0 ? f.decimalPoint : c,
            f = d === void 0 ? f.thousandsSep : d,
            j = g < 0 ? "-" : "",
            k = String(B(g = U(g).toFixed(h))),
            l = k.length > 3 ? k.length % 3 : 0;
        return e !== oa ? e(a, b, c, d) : j + (l ? k.substr(0, l) + f : "") + k.substr(l).replace(/(\d{3})(?=\d)/g, "$1" + f) + (h ? i + U(g - k).toFixed(h).slice(2) : "")
    }

    function Ea(a, b) {
        return Array((b || 2) + 1 - String(a).length).join(0) + a
    }

    function X(a, b, c) {
        var d = a[b];
        a[b] = function() {
            var a = Array.prototype.slice.call(arguments);
            a.unshift(d);
            return c.apply(this, a)
        }
    }

    function Ia(a, b) {
        for (var c = "{", d = !1, e, f, g, h, i, j = [];
            (c = a.indexOf(c)) !== -1;) {
            e = a.slice(0, c);
            if (d) {
                f = e.split(":");
                g = f.shift().split(".");
                i = g.length;
                e = b;
                for (h = 0; h < i; h++) e = e[g[h]];
                if (f.length) f = f.join(":"), g = /\.([0-9])/, h = J.lang, i = void 0, /f$/.test(f) ? (i = (i = f.match(g)) ? i[1] : -1, e !== null && (e = oa(e, i, h.decimalPoint, f.indexOf(",") > -1 ? h.thousandsSep : ""))) : e = $a(f, e)
            }
            j.push(e);
            a = a.slice(c + 1);
            c = (d = !d) ? "}" : "{"
        }
        j.push(a);
        return j.join("")
    }

    function pb(a, b, c, d) {
        var e, c = p(c, 1);
        e =
            a / c;
        b || (b = [1, 2, 2.5, 5, 10], d === !1 && (c === 1 ? b = [1, 2, 5, 10] : c <= 0.1 && (b = [1 / c])));
        for (d = 0; d < b.length; d++)
            if (a = b[d], e <= (b[d] + (b[d + 1] || b[d])) / 2) break;
        a *= c;
        return a
    }

    function gb(a, b) {
        var c = a.length,
            d, e;
        for (e = 0; e < c; e++) a[e].ss_i = e;
        a.sort(function(a, c) {
            d = b(a, c);
            return d === 0 ? a.ss_i - c.ss_i : d
        });
        for (e = 0; e < c; e++) delete a[e].ss_i
    }

    function Qa(a) {
        for (var b = a.length, c = a[0]; b--;) a[b] < c && (c = a[b]);
        return c
    }

    function Fa(a) {
        for (var b = a.length, c = a[0]; b--;) a[b] > c && (c = a[b]);
        return c
    }

    function ab(a, b) {
        for (var c in a) a[c] && a[c] !== b &&
            a[c].destroy && a[c].destroy(), delete a[c]
    }

    function Ja(a) {
        bb || (bb = $(Ga));
        a && bb.appendChild(a);
        bb.innerHTML = ""
    }

    function ua(a) {
        return parseFloat(a.toPrecision(14))
    }

    function qb() {
        var a = J.global.useUTC,
            b = a ? "getUTC" : "get";
        Ka = J.global.Date || window.Date;
        rb = (a && J.global.timezoneOffset || 0) * 6E4;
        sb = b + "Minutes";
        tb = b + "Hours";
        ub = b + "Day";
        vb = b + "Date";
        wb = b + "Month";
        xb = b + "FullYear"
    }

    function H() {}

    function La(a, b, c, d) {
        this.axis = a;
        this.pos = b;
        this.type = c || "";
        this.isNew = !0;
        !c && !d && this.addLabel()
    }

    function Q() {
        this.init.apply(this,
            arguments)
    }

    function pa() {
        this.init.apply(this, arguments)
    }

    function yb(a, b, c, d, e, f, g, h, i) {
        a = a["stroke-width"] % 2 / 2;
        b -= a;
        c -= a;
        return ["M", b + f, c, "L", b + d - g, c, "C", b + d - g / 2, c, b + d, c + g / 2, b + d, c + g, "L", b + d, c + e - h, "C", b + d, c + e - h / 2, b + d - h / 2, c + e, b + d - h, c + e, "L", b + i, c + e, "C", b + i / 2, c + e, b, c + e - i / 2, b, c + e - i, "L", b, c + f, "C", b, c + f / 2, b + f / 2, c, b + f, c, "Z"]
    }
    var r, y = document,
        I = window,
        F = Math,
        w = F.round,
        ea = F.floor,
        Ha = F.ceil,
        s = F.max,
        R = F.min,
        U = F.abs,
        qa = F.cos,
        va = F.sin,
        hb = F.PI,
        Aa = hb * 2 / 360,
        wa = navigator.userAgent,
        zb = I.opera,
        za = /msie/i.test(wa) &&
        !zb,
        cb = y.documentMode === 8,
        ib = /AppleWebKit/.test(wa),
        Ma = /Firefox/.test(wa),
        Ab = /(Mobile|Android|Windows Phone)/.test(wa),
        xa = "http://www.w3.org/2000/svg",
        ca = !!y.createElementNS && !!y.createElementNS(xa, "svg").createSVGRect,
        Hb = Ma && parseInt(wa.split("Firefox/")[1], 10) < 4,
        ga = !ca && !za && !!y.createElement("canvas").getContext,
        Na, Ra, Bb = {},
        jb = 0,
        bb, J, $a, ha, kb, Oa, ja, aa = function() {
            return r
        },
        V = [],
        Sa = 0,
        Ga = "div",
        S = "none",
        Ib = /^[0-9]+$/,
        Jb = "stroke-width",
        Ka, rb, sb, tb, ub, vb, wb, xb, u = {},
        K;
    I.Highcharts ? ja(16, !0) : K = I.Highcharts = {};
    $a = function(a, b, c) {
        if (!t(b) || isNaN(b)) return "Invalid date";
        var a = p(a, "%Y-%m-%d %H:%M:%S"),
            d = new Ka(b - rb),
            e, f = d[tb](),
            g = d[ub](),
            h = d[vb](),
            i = d[wb](),
            j = d[xb](),
            k = J.lang,
            l = k.weekdays,
            d = q({
                a: l[g].substr(0, 3),
                A: l[g],
                d: Ea(h),
                e: h,
                b: k.shortMonths[i],
                B: k.months[i],
                m: Ea(i + 1),
                y: j.toString().substr(2, 2),
                Y: j,
                H: Ea(f),
                I: Ea(f % 12 || 12),
                l: f % 12 || 12,
                M: Ea(d[sb]()),
                p: f < 12 ? "AM" : "PM",
                P: f < 12 ? "am" : "pm",
                S: Ea(d.getSeconds()),
                L: Ea(w(b % 1E3), 3)
            }, K.dateFormats);
        for (e in d)
            for (; a.indexOf("%" + e) !== -1;) a = a.replace("%" + e, typeof d[e] ===
                "function" ? d[e](b) : d[e]);
        return c ? a.substr(0, 1).toUpperCase() + a.substr(1) : a
    };
    ja = function(a, b) {
        var c = "Highcharts error #" + a + ": www.highcharts.com/errors/" + a;
        if (b) throw c;
        I.console && console.log(c)
    };
    Oa = {
        millisecond: 1,
        second: 1E3,
        minute: 6E4,
        hour: 36E5,
        day: 864E5,
        week: 6048E5,
        month: 26784E5,
        year: 31556952E3
    };
    kb = {
        init: function(a, b, c) {
            var b = b || "",
                d = a.shift,
                e = b.indexOf("C") > -1,
                f = e ? 7 : 3,
                g, b = b.split(" "),
                c = [].concat(c),
                h, i, j = function(a) {
                    for (g = a.length; g--;) a[g] === "M" && a.splice(g + 1, 0, a[g + 1], a[g + 2], a[g + 1], a[g + 2])
                };
            e && (j(b), j(c));
            a.isArea && (h = b.splice(b.length - 6, 6), i = c.splice(c.length - 6, 6));
            if (d <= c.length / f && b.length === c.length)
                for (; d--;) c = [].concat(c).splice(0, f).concat(c);
            a.shift = 0;
            if (b.length)
                for (a = c.length; b.length < a;) d = [].concat(b).splice(b.length - f, f), e && (d[f - 6] = d[f - 2], d[f - 5] = d[f - 1]), b = b.concat(d);
            h && (b = b.concat(h), c = c.concat(i));
            return [b, c]
        },
        step: function(a, b, c, d) {
            var e = [],
                f = a.length;
            if (c === 1) e = d;
            else if (f === b.length && c < 1)
                for (; f--;) d = parseFloat(a[f]), e[f] = isNaN(d) ? a[f] : c * parseFloat(b[f] - d) + d;
            else e = b;
            return e
        }
    };
    (function(a) {
        I.HighchartsAdapter = I.HighchartsAdapter || a && {
            init: function(b) {
                var c = a.fx;
                a.extend(a.easing, {
                    easeOutQuad: function(a, b, c, g, h) {
                        return -g * (b /= h) * (b - 2) + c
                    }
                });
                a.each(["cur", "_default", "width", "height", "opacity"], function(b, e) {
                    var f = c.step,
                        g;
                    e === "cur" ? f = c.prototype : e === "_default" && a.Tween && (f = a.Tween.propHooks[e], e = "set");
                    (g = f[e]) && (f[e] = function(a) {
                        var c, a = b ? a : this;
                        if (a.prop !== "align") return c = a.elem, c.attr ? c.attr(a.prop, e === "cur" ? r : a.now) : g.apply(this, arguments)
                    })
                });
                X(a.cssHooks.opacity,
                    "get",
                    function(a, b, c) {
                        return b.attr ? b.opacity || 0 : a.call(this, b, c)
                    });
                this.addAnimSetter("d", function(a) {
                    var c = a.elem,
                        f;
                    if (!a.started) f = b.init(c, c.d, c.toD), a.start = f[0], a.end = f[1], a.started = !0;
                    c.attr("d", b.step(a.start, a.end, a.pos, c.toD))
                });
                this.each = Array.prototype.forEach ? function(a, b) {
                    return Array.prototype.forEach.call(a, b)
                } : function(a, b) {
                    var c, g = a.length;
                    for (c = 0; c < g; c++)
                        if (b.call(a[c], a[c], c, a) === !1) return c
                };
                a.fn.highcharts = function() {
                    var a = "Chart",
                        b = arguments,
                        c, g;
                    if (this[0]) {
                        Ca(b[0]) && (a = b[0],
                            b = Array.prototype.slice.call(b, 1));
                        c = b[0];
                        if (c !== r) c.chart = c.chart || {}, c.chart.renderTo = this[0], new K[a](c, b[1]), g = this;
                        c === r && (g = V[G(this[0], "data-highcharts-chart")])
                    }
                    return g
                }
            },
            addAnimSetter: function(b, c) {
                a.Tween ? a.Tween.propHooks[b] = {
                    set: c
                } : a.fx.step[b] = c
            },
            getScript: a.getScript,
            inArray: a.inArray,
            adapterRun: function(b, c) {
                return a(b)[c]()
            },
            grep: a.grep,
            map: function(a, c) {
                for (var d = [], e = 0, f = a.length; e < f; e++) d[e] = c.call(a[e], a[e], e, a);
                return d
            },
            offset: function(b) {
                return a(b).offset()
            },
            addEvent: function(b,
                c, d) {
                a(b).bind(c, d)
            },
            removeEvent: function(b, c, d) {
                var e = y.removeEventListener ? "removeEventListener" : "detachEvent";
                y[e] && b && !b[e] && (b[e] = function() {});
                a(b).unbind(c, d)
            },
            fireEvent: function(b, c, d, e) {
                var f = a.Event(c),
                    g = "detached" + c,
                    h;
                !za && d && (delete d.layerX, delete d.layerY, delete d.returnValue);
                q(f, d);
                b[c] && (b[g] = b[c], b[c] = null);
                a.each(["preventDefault", "stopPropagation"], function(a, b) {
                    var c = f[b];
                    f[b] = function() {
                        try {
                            c.call(f)
                        } catch (a) {
                            b === "preventDefault" && (h = !0)
                        }
                    }
                });
                a(b).trigger(f);
                b[g] && (b[c] = b[g],
                    b[g] = null);
                e && !f.isDefaultPrevented() && !h && e(f)
            },
            washMouseEvent: function(a) {
                var c = a.originalEvent || a;
                if (c.pageX === r) c.pageX = a.pageX, c.pageY = a.pageY;
                return c
            },
            animate: function(b, c, d) {
                var e = a(b);
                if (!b.style) b.style = {};
                if (c.d) b.toD = c.d, c.d = 1;
                e.stop();
                c.opacity !== r && b.attr && (c.opacity += "px");
                b.hasAnim = 1;
                e.animate(c, d)
            },
            stop: function(b) {
                b.hasAnim && a(b).stop()
            }
        }
    })(I.jQuery);
    var ra = I.HighchartsAdapter,
        P = ra || {};
    ra && ra.init.call(ra, kb);
    var db = P.adapterRun,
        Kb = P.getScript,
        Ta = P.inArray,
        o = P.each,
        Cb = P.grep,
        Lb =
        P.offset,
        Ua = P.map,
        N = P.addEvent,
        Y = P.removeEvent,
        C = P.fireEvent,
        Mb = P.washMouseEvent,
        eb = P.animate,
        Va = P.stop,
        P = {
            enabled: !0,
            x: 0,
            y: 15,
            style: {
                color: "#606060",
                cursor: "default",
                fontSize: "11px"
            }
        };
    J = {
        colors: "#7cb5ec,#434348,#90ed7d,#f7a35c,#8085e9,#f15c80,#e4d354,#8085e8,#8d4653,#91e8e1".split(","),
        symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
        lang: {
            loading: "Loading...",
            months: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
            shortMonths: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
            weekdays: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
            decimalPoint: ".",
            numericSymbols: "k,M,G,T,P,E".split(","),
            resetZoom: "Reset zoom",
            resetZoomTitle: "Reset zoom level 1:1",
            thousandsSep: ","
        },
        global: {
            useUTC: !0,
            canvasToolsURL: "http://code.highcharts.com/maps/1.0.4/modules/canvas-tools.js",
            VMLRadialGradientURL: "http://code.highcharts.com/maps/1.0.4/gfx/vml-radial-gradient.png"
        },
        chart: {
            borderColor: "#4572A7",
            borderRadius: 0,
            defaultSeriesType: "line",
            ignoreHiddenSeries: !0,
            spacing: [10,
                10, 15, 10
            ],
            backgroundColor: "#FFFFFF",
            plotBorderColor: "#C0C0C0",
            resetZoomButton: {
                theme: {
                    zIndex: 20
                },
                position: {
                    align: "right",
                    x: -10,
                    y: 10
                }
            }
        },
        title: {
            text: "Chart title",
            align: "center",
            margin: 15,
            style: {
                color: "#333333",
                fontSize: "18px"
            }
        },
        subtitle: {
            text: "",
            align: "center",
            style: {
                color: "#555555"
            }
        },
        plotOptions: {
            line: {
                allowPointSelect: !1,
                showCheckbox: !1,
                animation: {
                    duration: 1E3
                },
                events: {},
                lineWidth: 2,
                marker: {
                    lineWidth: 0,
                    radius: 4,
                    lineColor: "#FFFFFF",
                    states: {
                        hover: {
                            enabled: !0,
                            lineWidthPlus: 1,
                            radiusPlus: 2
                        },
                        select: {
                            fillColor: "#FFFFFF",
                            lineColor: "#000000",
                            lineWidth: 2
                        }
                    }
                },
                point: {
                    events: {}
                },
                dataLabels: v(P, {
                    align: "center",
                    enabled: !1,
                    formatter: function() {
                        return this.y === null ? "" : oa(this.y, -1)
                    },
                    verticalAlign: "bottom",
                    y: 0
                }),
                cropThreshold: 300,
                pointRange: 0,
                states: {
                    hover: {
                        lineWidthPlus: 1,
                        marker: {},
                        halo: {
                            size: 10,
                            opacity: 0.25
                        }
                    },
                    select: {
                        marker: {}
                    }
                },
                stickyTracking: !0,
                turboThreshold: 1E3
            }
        },
        labels: {
            style: {
                position: "absolute",
                color: "#3E576F"
            }
        },
        legend: {
            enabled: !0,
            align: "center",
            layout: "horizontal",
            labelFormatter: function() {
                return this.name
            },
            borderColor: "#909090",
            borderRadius: 0,
            navigation: {
                activeColor: "#274b6d",
                inactiveColor: "#CCC"
            },
            shadow: !1,
            itemStyle: {
                color: "#333333",
                fontSize: "12px",
                fontWeight: "bold"
            },
            itemHoverStyle: {
                color: "#000"
            },
            itemHiddenStyle: {
                color: "#CCC"
            },
            itemCheckboxStyle: {
                position: "absolute",
                width: "13px",
                height: "13px"
            },
            symbolPadding: 5,
            verticalAlign: "bottom",
            x: 0,
            y: 0,
            title: {
                style: {
                    fontWeight: "bold"
                }
            }
        },
        loading: {
            labelStyle: {
                fontWeight: "bold",
                position: "relative",
                top: "45%"
            },
            style: {
                position: "absolute",
                backgroundColor: "white",
                opacity: 0.5,
                textAlign: "center"
            }
        },
        tooltip: {
            enabled: !0,
            animation: ca,
            backgroundColor: "rgba(249, 249, 249, .85)",
            borderWidth: 1,
            borderRadius: 3,
            dateTimeLabelFormats: {
                millisecond: "%A, %b %e, %H:%M:%S.%L",
                second: "%A, %b %e, %H:%M:%S",
                minute: "%A, %b %e, %H:%M",
                hour: "%A, %b %e, %H:%M",
                day: "%A, %b %e, %Y",
                week: "Week from %A, %b %e, %Y",
                month: "%B %Y",
                year: "%Y"
            },
            headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
            pointFormat: '<span style="color:{series.color}">●</span> {series.name}: <b>{point.y}</b><br/>',
            shadow: !0,
            snap: Ab ?
                25 : 10,
            style: {
                color: "#333333",
                cursor: "default",
                fontSize: "12px",
                padding: "8px",
                whiteSpace: "nowrap"
            }
        },
        credits: {
            enabled: !0,
            text: "Highcharts.com",
            href: "http://www.highcharts.com",
            position: {
                align: "right",
                x: -10,
                verticalAlign: "bottom",
                y: -5
            },
            style: {
                cursor: "pointer",
                color: "#909090",
                fontSize: "9px"
            }
        }
    };
    var W = J.plotOptions,
        ra = W.line;
    qb();
    var Nb = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
        Ob = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,
        Pb = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
        Z = function(a) {
            var b = [],
                c, d;
            (function(a) {
                a && a.stops ? d = Ua(a.stops, function(a) {
                    return Z(a[1])
                }) : (c = Nb.exec(a)) ? b = [B(c[1]), B(c[2]), B(c[3]), parseFloat(c[4], 10)] : (c = Ob.exec(a)) ? b = [B(c[1], 16), B(c[2], 16), B(c[3], 16), 1] : (c = Pb.exec(a)) && (b = [B(c[1]), B(c[2]), B(c[3]), 1])
            })(a);
            return {
                get: function(c) {
                    var f;
                    d ? (f = v(a), f.stops = [].concat(f.stops), o(d, function(a, b) {
                        f.stops[b] = [f.stops[b][0], a.get(c)]
                    })) : f = b && !isNaN(b[0]) ? c === "rgb" ? "rgb(" + b[0] + "," + b[1] + "," + b[2] + ")" : c === "a" ? b[3] : "rgba(" + b.join(",") + ")" : a;
                    return f
                },
                brighten: function(a) {
                    if (d) o(d,
                        function(b) {
                            b.brighten(a)
                        });
                    else if (ka(a) && a !== 0) {
                        var c;
                        for (c = 0; c < 3; c++) b[c] += B(a * 255), b[c] < 0 && (b[c] = 0), b[c] > 255 && (b[c] = 255)
                    }
                    return this
                },
                rgba: b,
                setOpacity: function(a) {
                    b[3] = a;
                    return this
                }
            }
        };
    H.prototype = {
        opacity: 1,
        textProps: "fontSize,fontWeight,fontFamily,color,lineHeight,width,textDecoration,textShadow,HcTextStroke".split(","),
        init: function(a, b) {
            this.element = b === "span" ? $(b) : y.createElementNS(xa, b);
            this.renderer = a
        },
        animate: function(a, b, c) {
            b = p(b, ha, !0);
            Va(this);
            if (b) {
                b = v(b, {});
                if (c) b.complete = c;
                eb(this,
                    a, b)
            } else this.attr(a), c && c();
            return this
        },
        colorGradient: function(a, b, c) {
            var d = this.renderer,
                e, f, g, h, i, j, k, l, n, m, x = [];
            a.linearGradient ? f = "linearGradient" : a.radialGradient && (f = "radialGradient");
            if (f) {
                g = a[f];
                h = d.gradients;
                j = a.stops;
                n = c.radialReference;
                Da(g) && (a[f] = g = {
                    x1: g[0],
                    y1: g[1],
                    x2: g[2],
                    y2: g[3],
                    gradientUnits: "userSpaceOnUse"
                });
                f === "radialGradient" && n && !t(g.gradientUnits) && (g = v(g, {
                    cx: n[0] - n[2] / 2 + g.cx * n[2],
                    cy: n[1] - n[2] / 2 + g.cy * n[2],
                    r: g.r * n[2],
                    gradientUnits: "userSpaceOnUse"
                }));
                for (m in g) m !== "id" &&
                    x.push(m, g[m]);
                for (m in j) x.push(j[m]);
                x = x.join(",");
                h[x] ? a = h[x].attr("id") : (g.id = a = "highcharts-" + jb++, h[x] = i = d.createElement(f).attr(g).add(d.defs), i.stops = [], o(j, function(a) {
                    a[1].indexOf("rgba") === 0 ? (e = Z(a[1]), k = e.get("rgb"), l = e.get("a")) : (k = a[1], l = 1);
                    a = d.createElement("stop").attr({
                        offset: a[0],
                        "stop-color": k,
                        "stop-opacity": l
                    }).add(i);
                    i.stops.push(a)
                }));
                c.setAttribute(b, "url(" + d.url + "#" + a + ")")
            }
        },
        attr: function(a, b) {
            var c, d, e = this.element,
                f, g = this,
                h;
            typeof a === "string" && b !== r && (c = a, a = {}, a[c] = b);
            if (typeof a ===
                "string") g = (this[a + "Getter"] || this._defaultGetter).call(this, a, e);
            else {
                for (c in a) {
                    d = a[c];
                    h = !1;
                    this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(c) && (f || (this.symbolAttr(a), f = !0), h = !0);
                    if (this.rotation && (c === "x" || c === "y")) this.doTransform = !0;
                    h || (this[c + "Setter"] || this._defaultSetter).call(this, d, c, e);
                    this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(c) && this.updateShadows(c, d)
                }
                if (this.doTransform) this.updateTransform(), this.doTransform = !1
            }
            return g
        },
        updateShadows: function(a, b) {
            for (var c = this.shadows, d = c.length; d--;) c[d].setAttribute(a, a === "height" ? s(b - (c[d].cutHeight || 0), 0) : a === "d" ? this.d : b)
        },
        addClass: function(a) {
            var b = this.element,
                c = G(b, "class") || "";
            c.indexOf(a) === -1 && G(b, "class", c + " " + a);
            return this
        },
        symbolAttr: function(a) {
            var b = this;
            o("x,y,r,start,end,width,height,innerR,anchorX,anchorY".split(","), function(c) {
                b[c] = p(a[c], b[c])
            });
            b.attr({
                d: b.renderer.symbols[b.symbolName](b.x, b.y, b.width, b.height, b)
            })
        },
        clip: function(a) {
            return this.attr("clip-path",
                a ? "url(" + this.renderer.url + "#" + a.id + ")" : S)
        },
        crisp: function(a) {
            var b, c = {},
                d, e = a.strokeWidth || this.strokeWidth || 0;
            d = w(e) % 2 / 2;
            a.x = ea(a.x || this.x || 0) + d;
            a.y = ea(a.y || this.y || 0) + d;
            a.width = ea((a.width || this.width || 0) - 2 * d);
            a.height = ea((a.height || this.height || 0) - 2 * d);
            a.strokeWidth = e;
            for (b in a) this[b] !== a[b] && (this[b] = c[b] = a[b]);
            return c
        },
        css: function(a) {
            var b = this.styles,
                c = {},
                d = this.element,
                e, f, g = "";
            e = !b;
            if (a && a.color) a.fill = a.color;
            if (b)
                for (f in a) a[f] !== b[f] && (c[f] = a[f], e = !0);
            if (e) {
                e = this.textWidth = a && a.width &&
                    d.nodeName.toLowerCase() === "text" && B(a.width);
                b && (a = q(b, c));
                this.styles = a;
                e && (ga || !ca && this.renderer.forExport) && delete a.width;
                if (za && !ca) D(this.element, a);
                else {
                    b = function(a, b) {
                        return "-" + b.toLowerCase()
                    };
                    for (f in a) g += f.replace(/([A-Z])/g, b) + ":" + a[f] + ";";
                    G(d, "style", g)
                }
                e && this.added && this.renderer.buildText(this)
            }
            return this
        },
        on: function(a, b) {
            var c = this,
                d = c.element;
            Ra && a === "click" ? (d.ontouchstart = function(a) {
                c.touchEventFired = Ka.now();
                a.preventDefault();
                b.call(d, a)
            }, d.onclick = function(a) {
                (wa.indexOf("Android") ===
                    -1 || Ka.now() - (c.touchEventFired || 0) > 1100) && b.call(d, a)
            }) : d["on" + a] = b;
            return this
        },
        setRadialReference: function(a) {
            this.element.radialReference = a;
            return this
        },
        translate: function(a, b) {
            return this.attr({
                translateX: a,
                translateY: b
            })
        },
        invert: function() {
            this.inverted = !0;
            this.updateTransform();
            return this
        },
        updateTransform: function() {
            var a = this.translateX || 0,
                b = this.translateY || 0,
                c = this.scaleX,
                d = this.scaleY,
                e = this.inverted,
                f = this.rotation,
                g = this.element;
            e && (a += this.attr("width"), b += this.attr("height"));
            a = ["translate(" +
                a + "," + b + ")"
            ];
            e ? a.push("rotate(90) scale(-1,1)") : f && a.push("rotate(" + f + " " + (g.getAttribute("x") || 0) + " " + (g.getAttribute("y") || 0) + ")");
            (t(c) || t(d)) && a.push("scale(" + p(c, 1) + " " + p(d, 1) + ")");
            a.length && g.setAttribute("transform", a.join(" "))
        },
        toFront: function() {
            var a = this.element;
            a.parentNode.appendChild(a);
            return this
        },
        align: function(a, b, c) {
            var d, e, f, g, h = {};
            e = this.renderer;
            f = e.alignedObjects;
            if (a) {
                if (this.alignOptions = a, this.alignByTranslate = b, !c || Ca(c)) this.alignTo = d = c || "renderer", ta(f, this), f.push(this),
                    c = null
            } else a = this.alignOptions, b = this.alignByTranslate, d = this.alignTo;
            c = p(c, e[d], e);
            d = a.align;
            e = a.verticalAlign;
            f = (c.x || 0) + (a.x || 0);
            g = (c.y || 0) + (a.y || 0);
            if (d === "right" || d === "center") f += (c.width - (a.width || 0)) / {
                right: 1,
                center: 2
            }[d];
            h[b ? "translateX" : "x"] = w(f);
            if (e === "bottom" || e === "middle") g += (c.height - (a.height || 0)) / ({
                bottom: 1,
                middle: 2
            }[e] || 1);
            h[b ? "translateY" : "y"] = w(g);
            this[this.placed ? "animate" : "attr"](h);
            this.placed = !0;
            this.alignAttr = h;
            return this
        },
        getBBox: function() {
            var a = this.bBox,
                b = this.renderer,
                c, d, e = this.rotation;
            c = this.element;
            var f = this.styles,
                g = e * Aa;
            d = this.textStr;
            var h;
            if (d === "" || Ib.test(d)) h = "num." + d.toString().length + (f ? "|" + f.fontSize + "|" + f.fontFamily : "");
            h && (a = b.cache[h]);
            if (!a) {
                if (c.namespaceURI === xa || b.forExport) {
                    try {
                        a = c.getBBox ? q({}, c.getBBox()) : {
                            width: c.offsetWidth,
                            height: c.offsetHeight
                        }
                    } catch (i) {}
                    if (!a || a.width < 0) a = {
                        width: 0,
                        height: 0
                    }
                } else a = this.htmlGetBBox();
                if (b.isSVG) {
                    c = a.width;
                    d = a.height;
                    if (za && f && f.fontSize === "11px" && d.toPrecision(3) === "16.9") a.height = d = 14;
                    if (e) a.width =
                        U(d * va(g)) + U(c * qa(g)), a.height = U(d * qa(g)) + U(c * va(g))
                }
                this.bBox = a;
                h && (b.cache[h] = a)
            }
            return a
        },
        show: function(a) {
            a && this.element.namespaceURI === xa ? this.element.removeAttribute("visibility") : this.attr({
                visibility: a ? "inherit" : "visible"
            });
            return this
        },
        hide: function() {
            return this.attr({
                visibility: "hidden"
            })
        },
        fadeOut: function(a) {
            var b = this;
            b.animate({
                opacity: 0
            }, {
                duration: a || 150,
                complete: function() {
                    b.attr({
                        y: -9999
                    })
                }
            })
        },
        add: function(a) {
            var b = this.renderer,
                c = a || b,
                d = c.element || b.box,
                e = this.element,
                f = this.zIndex,
                g, h;
            if (a) this.parentGroup = a;
            this.parentInverted = a && a.inverted;
            this.textStr !== void 0 && b.buildText(this);
            if (f) c.handleZ = !0, f = B(f);
            if (c.handleZ) {
                a = d.childNodes;
                for (g = 0; g < a.length; g++)
                    if (b = a[g], c = G(b, "zIndex"), b !== e && (B(c) > f || !t(f) && t(c))) {
                        d.insertBefore(e, b);
                        h = !0;
                        break
                    }
            }
            h || d.appendChild(e);
            this.added = !0;
            if (this.onAdd) this.onAdd();
            return this
        },
        safeRemoveChild: function(a) {
            var b = a.parentNode;
            b && b.removeChild(a)
        },
        destroy: function() {
            var a = this,
                b = a.element || {},
                c = a.shadows,
                d = a.renderer.isSVG && b.nodeName ===
                "SPAN" && a.parentGroup,
                e, f;
            b.onclick = b.onmouseout = b.onmouseover = b.onmousemove = b.point = null;
            Va(a);
            if (a.clipPath) a.clipPath = a.clipPath.destroy();
            if (a.stops) {
                for (f = 0; f < a.stops.length; f++) a.stops[f] = a.stops[f].destroy();
                a.stops = null
            }
            a.safeRemoveChild(b);
            for (c && o(c, function(b) {
                    a.safeRemoveChild(b)
                }); d && d.div && d.div.childNodes.length === 0;) b = d.parentGroup, a.safeRemoveChild(d.div), delete d.div, d = b;
            a.alignTo && ta(a.renderer.alignedObjects, a);
            for (e in a) delete a[e];
            return null
        },
        shadow: function(a, b, c) {
            var d = [],
                e, f, g = this.element,
                h, i, j, k;
            if (a) {
                i = p(a.width, 3);
                j = (a.opacity || 0.15) / i;
                k = this.parentInverted ? "(-1,-1)" : "(" + p(a.offsetX, 1) + ", " + p(a.offsetY, 1) + ")";
                for (e = 1; e <= i; e++) {
                    f = g.cloneNode(0);
                    h = i * 2 + 1 - 2 * e;
                    G(f, {
                        isShadow: "true",
                        stroke: a.color || "black",
                        "stroke-opacity": j * e,
                        "stroke-width": h,
                        transform: "translate" + k,
                        fill: S
                    });
                    if (c) G(f, "height", s(G(f, "height") - h, 0)), f.cutHeight = h;
                    b ? b.element.appendChild(f) : g.parentNode.insertBefore(f, g);
                    d.push(f)
                }
                this.shadows = d
            }
            return this
        },
        xGetter: function(a) {
            this.element.nodeName ===
                "circle" && (a = {
                    x: "cx",
                    y: "cy"
                }[a] || a);
            return this._defaultGetter(a)
        },
        _defaultGetter: function(a) {
            a = p(this[a], this.element ? this.element.getAttribute(a) : null, 0);
            /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
            return a
        },
        dSetter: function(a, b, c) {
            a && a.join && (a = a.join(" "));
            /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
            c.setAttribute(b, a);
            this[b] = a
        },
        dashstyleSetter: function(a) {
            var b;
            if (a = a && a.toLowerCase()) {
                a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash",
                    "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                for (b = a.length; b--;) a[b] = B(a[b]) * this["stroke-width"];
                a = a.join(",").replace("NaN", "none");
                this.element.setAttribute("stroke-dasharray", a)
            }
        },
        alignSetter: function(a) {
            this.element.setAttribute("text-anchor", {
                left: "start",
                center: "middle",
                right: "end"
            }[a])
        },
        opacitySetter: function(a, b, c) {
            this[b] = a;
            c.setAttribute(b, a)
        },
        titleSetter: function(a) {
            var b = this.element.getElementsByTagName("title")[0];
            b ||
                (b = y.createElementNS(xa, "title"), this.element.appendChild(b));
            b.textContent = p(a, "").replace(/<[^>]*>/g, "")
        },
        textSetter: function(a) {
            if (a !== this.textStr) delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this)
        },
        fillSetter: function(a, b, c) {
            typeof a === "string" ? c.setAttribute(b, a) : a && this.colorGradient(a, b, c)
        },
        zIndexSetter: function(a, b, c) {
            c.setAttribute(b, a);
            this[b] = a
        },
        _defaultSetter: function(a, b, c) {
            c.setAttribute(b, a)
        }
    };
    H.prototype.yGetter = H.prototype.xGetter;
    H.prototype.translateXSetter =
        H.prototype.translateYSetter = H.prototype.rotationSetter = H.prototype.verticalAlignSetter = H.prototype.scaleXSetter = H.prototype.scaleYSetter = function(a, b) {
            this[b] = a;
            this.doTransform = !0
        };
    H.prototype["stroke-widthSetter"] = H.prototype.strokeSetter = function(a, b, c) {
        this[b] = a;
        if (this.stroke && this["stroke-width"]) this.strokeWidth = this["stroke-width"], H.prototype.fillSetter.call(this, this.stroke, "stroke", c), c.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0;
        else if (b === "stroke-width" && a ===
            0 && this.hasStroke) c.removeAttribute("stroke"), this.hasStroke = !1
    };
    var ba = function() {
        this.init.apply(this, arguments)
    };
    ba.prototype = {
        Element: H,
        init: function(a, b, c, d, e) {
            var f = location,
                g, d = this.createElement("svg").attr({
                    version: "1.1"
                }).css(this.getStyle(d));
            g = d.element;
            a.appendChild(g);
            a.innerHTML.indexOf("xmlns") === -1 && G(g, "xmlns", xa);
            this.isSVG = !0;
            this.box = g;
            this.boxWrapper = d;
            this.alignedObjects = [];
            this.url = (Ma || ib) && y.getElementsByTagName("base").length ? f.href.replace(/#.*?$/, "").replace(/([\('\)])/g,
                "\\$1").replace(/ /g, "%20") : "";
            this.createElement("desc").add().element.appendChild(y.createTextNode("Created with Highmaps 1.0.4"));
            this.defs = this.createElement("defs").add();
            this.forExport = e;
            this.gradients = {};
            this.cache = {};
            this.setSize(b, c, !1);
            var h;
            if (Ma && a.getBoundingClientRect) this.subPixelFix = b = function() {
                D(a, {
                    left: 0,
                    top: 0
                });
                h = a.getBoundingClientRect();
                D(a, {
                    left: Ha(h.left) - h.left + "px",
                    top: Ha(h.top) - h.top + "px"
                })
            }, b(), N(I, "resize", b)
        },
        getStyle: function(a) {
            return this.style = q({
                fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                fontSize: "12px"
            }, a)
        },
        isHidden: function() {
            return !this.boxWrapper.getBBox().width
        },
        destroy: function() {
            var a = this.defs;
            this.box = null;
            this.boxWrapper = this.boxWrapper.destroy();
            ab(this.gradients || {});
            this.gradients = null;
            if (a) this.defs = a.destroy();
            this.subPixelFix && Y(I, "resize", this.subPixelFix);
            return this.alignedObjects = null
        },
        createElement: function(a) {
            var b = new this.Element;
            b.init(this, a);
            return b
        },
        draw: function() {},
        buildText: function(a) {
            for (var b = a.element, c = this, d = c.forExport, e = p(a.textStr, "").toString(),
                    f = e.indexOf("<") !== -1, g = b.childNodes, h, i, j = G(b, "x"), k = a.styles, l = a.textWidth, n = k && k.lineHeight, m = k && k.HcTextStroke, x = g.length, M = function(a) {
                        return n ? B(n) : c.fontMetrics(/(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : k && k.fontSize || c.style.fontSize || 12, a).h
                    }; x--;) b.removeChild(g[x]);
            !f && !m && e.indexOf(" ") === -1 ? b.appendChild(y.createTextNode(e)) : (h = /<.*style="([^"]+)".*>/, i = /<.*href="(http[^"]+)".*>/, l && !a.added && this.box.appendChild(b), e = f ? e.replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g,
                '<span style="font-style:italic">').replace(/<a/g, "<span").replace(/<\/(b|strong|i|em|a)>/g, "</span>").split(/<br.*?>/g) : [e], e[e.length - 1] === "" && e.pop(), o(e, function(e, f) {
                var g, n = 0,
                    e = e.replace(/<span/g, "|||<span").replace(/<\/span>/g, "</span>|||");
                g = e.split("|||");
                o(g, function(e) {
                    if (e !== "" || g.length === 1) {
                        var m = {},
                            x = y.createElementNS(xa, "tspan"),
                            p;
                        h.test(e) && (p = e.match(h)[1].replace(/(;| |^)color([ :])/, "$1fill$2"), G(x, "style", p));
                        i.test(e) && !d && (G(x, "onclick", 'location.href="' + e.match(i)[1] + '"'),
                            D(x, {
                                cursor: "pointer"
                            }));
                        e = (e.replace(/<(.|\n)*?>/g, "") || " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
                        if (e !== " ") {
                            x.appendChild(y.createTextNode(e));
                            if (n) m.dx = 0;
                            else if (f && j !== null) m.x = j;
                            G(x, m);
                            b.appendChild(x);
                            !n && f && (!ca && d && D(x, {
                                display: "block"
                            }), G(x, "dy", M(x)));
                            if (l)
                                for (var e = e.replace(/([^\^])-/g, "$1- ").split(" "), m = g.length > 1 || e.length > 1 && k.whiteSpace !== "nowrap", o, z, r = k.HcHeight, q = [], t = M(x), Db = 1; m && (e.length || q.length);) delete a.bBox, o = a.getBBox(), z = o.width, !ca && c.forExport && (z = c.measureSpanWidth(x.firstChild.data,
                                    a.styles)), o = z > l, !o || e.length === 1 ? (e = q, q = [], e.length && (Db++, r && Db * t > r ? (e = ["..."], a.attr("title", a.textStr)) : (x = y.createElementNS(xa, "tspan"), G(x, {
                                    dy: t,
                                    x: j
                                }), p && G(x, "style", p), b.appendChild(x))), z > l && (l = z)) : (x.removeChild(x.firstChild), q.unshift(e.pop())), e.length && x.appendChild(y.createTextNode(e.join(" ").replace(/- /g, "-")));
                            n++
                        }
                    }
                })
            }))
        },
        button: function(a, b, c, d, e, f, g, h, i) {
            var j = this.label(a, b, c, i, null, null, null, null, "button"),
                k = 0,
                l, n, m, x, p, o, a = {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                e = v({
                    "stroke-width": 1,
                    stroke: "#CCCCCC",
                    fill: {
                        linearGradient: a,
                        stops: [
                            [0, "#FEFEFE"],
                            [1, "#F6F6F6"]
                        ]
                    },
                    r: 2,
                    padding: 5,
                    style: {
                        color: "black"
                    }
                }, e);
            m = e.style;
            delete e.style;
            f = v(e, {
                stroke: "#68A",
                fill: {
                    linearGradient: a,
                    stops: [
                        [0, "#FFF"],
                        [1, "#ACF"]
                    ]
                }
            }, f);
            x = f.style;
            delete f.style;
            g = v(e, {
                stroke: "#68A",
                fill: {
                    linearGradient: a,
                    stops: [
                        [0, "#9BD"],
                        [1, "#CDF"]
                    ]
                }
            }, g);
            p = g.style;
            delete g.style;
            h = v(e, {
                style: {
                    color: "#CCC"
                }
            }, h);
            o = h.style;
            delete h.style;
            N(j.element, za ? "mouseover" : "mouseenter", function() {
                k !== 3 && j.attr(f).css(x)
            });
            N(j.element, za ? "mouseout" : "mouseleave",
                function() {
                    k !== 3 && (l = [e, f, g][k], n = [m, x, p][k], j.attr(l).css(n))
                });
            j.setState = function(a) {
                (j.state = k = a) ? a === 2 ? j.attr(g).css(p) : a === 3 && j.attr(h).css(o): j.attr(e).css(m)
            };
            return j.on("click", function() {
                k !== 3 && d.call(j)
            }).attr(e).css(q({
                cursor: "default"
            }, m))
        },
        crispLine: function(a, b) {
            a[1] === a[4] && (a[1] = a[4] = w(a[1]) - b % 2 / 2);
            a[2] === a[5] && (a[2] = a[5] = w(a[2]) + b % 2 / 2);
            return a
        },
        path: function(a) {
            var b = {
                fill: S
            };
            Da(a) ? b.d = a : fa(a) && q(b, a);
            return this.createElement("path").attr(b)
        },
        circle: function(a, b, c) {
            a = fa(a) ? a : {
                x: a,
                y: b,
                r: c
            };
            b = this.createElement("circle");
            b.xSetter = function(a) {
                this.element.setAttribute("cx", a)
            };
            b.ySetter = function(a) {
                this.element.setAttribute("cy", a)
            };
            return b.attr(a)
        },
        arc: function(a, b, c, d, e, f) {
            if (fa(a)) b = a.y, c = a.r, d = a.innerR, e = a.start, f = a.end, a = a.x;
            a = this.symbol("arc", a || 0, b || 0, c || 0, c || 0, {
                innerR: d || 0,
                start: e || 0,
                end: f || 0
            });
            a.r = c;
            return a
        },
        rect: function(a, b, c, d, e, f) {
            var e = fa(a) ? a.r : e,
                g = this.createElement("rect"),
                a = fa(a) ? a : a === r ? {} : {
                    x: a,
                    y: b,
                    width: s(c, 0),
                    height: s(d, 0)
                };
            if (f !== r) a.strokeWidth =
                f, a = g.crisp(a);
            if (e) a.r = e;
            g.rSetter = function(a) {
                G(this.element, {
                    rx: a,
                    ry: a
                })
            };
            return g.attr(a)
        },
        setSize: function(a, b, c) {
            var d = this.alignedObjects,
                e = d.length;
            this.width = a;
            this.height = b;
            for (this.boxWrapper[p(c, !0) ? "animate" : "attr"]({
                    width: a,
                    height: b
                }); e--;) d[e].align()
        },
        g: function(a) {
            var b = this.createElement("g");
            return t(a) ? b.attr({
                "class": "highcharts-" + a
            }) : b
        },
        image: function(a, b, c, d, e) {
            var f = {
                preserveAspectRatio: S
            };
            arguments.length > 1 && q(f, {
                x: b,
                y: c,
                width: d,
                height: e
            });
            f = this.createElement("image").attr(f);
            f.element.setAttributeNS ? f.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) : f.element.setAttribute("hc-svg-href", a);
            return f
        },
        symbol: function(a, b, c, d, e, f) {
            var g, h = this.symbols[a],
                h = h && h(w(b), w(c), d, e, f),
                i = /^url\((.*?)\)$/,
                j, k;
            if (h) g = this.path(h), q(g, {
                symbolName: a,
                x: b,
                y: c,
                width: d,
                height: e
            }), f && q(g, f);
            else if (i.test(a)) k = function(a, b) {
                a.element && (a.attr({
                    width: b[0],
                    height: b[1]
                }), a.alignByTranslate || a.translate(w((d - b[0]) / 2), w((e - b[1]) / 2)))
            }, j = a.match(i)[1], a = Bb[j] || f && f.width && f.height && [f.width, f.height], g = this.image(j).attr({
                x: b,
                y: c
            }), g.isImg = !0, a ? k(g, a) : (g.attr({
                width: 0,
                height: 0
            }), $("img", {
                onload: function() {
                    k(g, Bb[j] = [this.width, this.height])
                },
                src: j
            }));
            return g
        },
        symbols: {
            circle: function(a, b, c, d) {
                var e = 0.166 * c;
                return ["M", a + c / 2, b, "C", a + c + e, b, a + c + e, b + d, a + c / 2, b + d, "C", a - e, b + d, a - e, b, a + c / 2, b, "Z"]
            },
            square: function(a, b, c, d) {
                return ["M", a, b, "L", a + c, b, a + c, b + d, a, b + d, "Z"]
            },
            triangle: function(a, b, c, d) {
                return ["M", a + c / 2, b, "L", a + c, b + d, a, b + d, "Z"]
            },
            "triangle-down": function(a, b, c, d) {
                return ["M", a, b,
                    "L", a + c, b, a + c / 2, b + d, "Z"
                ]
            },
            diamond: function(a, b, c, d) {
                return ["M", a + c / 2, b, "L", a + c, b + d / 2, a + c / 2, b + d, a, b + d / 2, "Z"]
            },
            arc: function(a, b, c, d, e) {
                var f = e.start,
                    c = e.r || c || d,
                    g = e.end - 0.001,
                    d = e.innerR,
                    h = e.open,
                    i = qa(f),
                    j = va(f),
                    k = qa(g),
                    g = va(g),
                    e = e.end - f < hb ? 0 : 1;
                return ["M", a + c * i, b + c * j, "A", c, c, 0, e, 1, a + c * k, b + c * g, h ? "M" : "L", a + d * k, b + d * g, "A", d, d, 0, e, 0, a + d * i, b + d * j, h ? "" : "Z"]
            },
            callout: function(a, b, c, d, e) {
                var f = R(e && e.r || 0, c, d),
                    g = f + 6,
                    h = e && e.anchorX,
                    i = e && e.anchorY,
                    e = w(e.strokeWidth || 0) % 2 / 2;
                a += e;
                b += e;
                e = ["M", a + f, b, "L", a + c - f, b, "C",
                    a + c, b, a + c, b, a + c, b + f, "L", a + c, b + d - f, "C", a + c, b + d, a + c, b + d, a + c - f, b + d, "L", a + f, b + d, "C", a, b + d, a, b + d, a, b + d - f, "L", a, b + f, "C", a, b, a, b, a + f, b
                ];
                h && h > c && i > b + g && i < b + d - g ? e.splice(13, 3, "L", a + c, i - 6, a + c + 6, i, a + c, i + 6, a + c, b + d - f) : h && h < 0 && i > b + g && i < b + d - g ? e.splice(33, 3, "L", a, i + 6, a - 6, i, a, i - 6, a, b + f) : i && i > d && h > a + g && h < a + c - g ? e.splice(23, 3, "L", h + 6, b + d, h, b + d + 6, h - 6, b + d, a + f, b + d) : i && i < 0 && h > a + g && h < a + c - g && e.splice(3, 3, "L", h - 6, b, h, b - 6, h + 6, b, c - f, b);
                return e
            }
        },
        clipRect: function(a, b, c, d) {
            var e = "highcharts-" + jb++,
                f = this.createElement("clipPath").attr({
                    id: e
                }).add(this.defs),
                a = this.rect(a, b, c, d, 0).add(f);
            a.id = e;
            a.clipPath = f;
            return a
        },
        text: function(a, b, c, d) {
            var e = ga || !ca && this.forExport,
                f = {};
            if (d && !this.forExport) return this.html(a, b, c);
            f.x = Math.round(b || 0);
            if (c) f.y = Math.round(c);
            if (a || a === 0) f.text = a;
            a = this.createElement("text").attr(f);
            e && a.css({
                position: "absolute"
            });
            if (!d) a.xSetter = function(a, b, c) {
                var d = c.getElementsByTagName("tspan"),
                    e, f = c.getAttribute(b),
                    n;
                for (n = 0; n < d.length; n++) e = d[n], e.getAttribute(b) === f && e.setAttribute(b, a);
                c.setAttribute(b, a)
            };
            return a
        },
        fontMetrics: function(a,
            b) {
            a = a || this.style.fontSize;
            if (b && I.getComputedStyle) b = b.element || b, a = I.getComputedStyle(b, "").fontSize;
            var a = /px/.test(a) ? B(a) : /em/.test(a) ? parseFloat(a) * 12 : 12,
                c = a < 24 ? a + 4 : w(a * 1.2),
                d = w(c * 0.8);
            return {
                h: c,
                b: d,
                f: a
            }
        },
        label: function(a, b, c, d, e, f, g, h, i) {
            function j() {
                var a, b;
                a = x.element.style;
                z = (s === void 0 || u === void 0 || m.styles.textAlign) && x.textStr && x.getBBox();
                m.width = (s || z.width || 0) + 2 * E + fb;
                m.height = (u || z.height || 0) + 2 * E;
                Ba = E + n.fontMetrics(a && a.fontSize, x).b;
                if (mb) {
                    if (!p) a = w(-O * E), b = h ? -Ba : 0, m.box = p = d ? n.symbol(d,
                        a, b, m.width, m.height, A) : n.rect(a, b, m.width, m.height, 0, A[Jb]), p.attr("fill", S).add(m);
                    p.isImg || p.attr(q({
                        width: w(m.width),
                        height: w(m.height)
                    }, A));
                    A = null
                }
            }

            function k() {
                var a = m.styles,
                    a = a && a.textAlign,
                    b = fb + E * (1 - O),
                    c;
                c = h ? 0 : Ba;
                if (t(s) && z && (a === "center" || a === "right")) b += {
                    center: 0.5,
                    right: 1
                }[a] * (s - z.width);
                if (b !== x.x || c !== x.y) x.attr("x", b), c !== r && x.attr("y", c);
                x.x = b;
                x.y = c
            }

            function l(a, b) {
                p ? p.attr(a, b) : A[a] = b
            }
            var n = this,
                m = n.g(i),
                x = n.text("", 0, 0, g).attr({
                    zIndex: 1
                }),
                p, z, O = 0,
                E = 3,
                fb = 0,
                s, u, lb, y, B = 0,
                A = {},
                Ba, mb;
            m.onAdd = function() {
                x.add(m);
                m.attr({
                    text: a || a === 0 ? a : "",
                    x: b,
                    y: c
                });
                p && t(e) && m.attr({
                    anchorX: e,
                    anchorY: f
                })
            };
            m.widthSetter = function(a) {
                s = a
            };
            m.heightSetter = function(a) {
                u = a
            };
            m.paddingSetter = function(a) {
                t(a) && a !== E && (E = a, k())
            };
            m.paddingLeftSetter = function(a) {
                t(a) && a !== fb && (fb = a, k())
            };
            m.alignSetter = function(a) {
                O = {
                    left: 0,
                    center: 0.5,
                    right: 1
                }[a]
            };
            m.textSetter = function(a) {
                a !== r && x.textSetter(a);
                j();
                k()
            };
            m["stroke-widthSetter"] = function(a, b) {
                a && (mb = !0);
                B = a % 2 / 2;
                l(b, a)
            };
            m.strokeSetter = m.fillSetter = m.rSetter = function(a,
                b) {
                b === "fill" && a && (mb = !0);
                l(b, a)
            };
            m.anchorXSetter = function(a, b) {
                e = a;
                l(b, a + B - lb)
            };
            m.anchorYSetter = function(a, b) {
                f = a;
                l(b, a - y)
            };
            m.xSetter = function(a) {
                m.x = a;
                O && (a -= O * ((s || z.width) + E));
                lb = w(a);
                m.attr("translateX", lb)
            };
            m.ySetter = function(a) {
                y = m.y = w(a);
                m.attr("translateY", y)
            };
            var D = m.css;
            return q(m, {
                css: function(a) {
                    if (a) {
                        var b = {},
                            a = v(a);
                        o(m.textProps, function(c) {
                            a[c] !== r && (b[c] = a[c], delete a[c])
                        });
                        x.css(b)
                    }
                    return D.call(m, a)
                },
                getBBox: function() {
                    return {
                        width: z.width + 2 * E,
                        height: z.height + 2 * E,
                        x: z.x - E,
                        y: z.y -
                            E
                    }
                },
                shadow: function(a) {
                    p && p.shadow(a);
                    return m
                },
                destroy: function() {
                    Y(m.element, "mouseenter");
                    Y(m.element, "mouseleave");
                    x && (x = x.destroy());
                    p && (p = p.destroy());
                    H.prototype.destroy.call(m);
                    m = n = j = k = l = null
                }
            })
        }
    };
    Na = ba;
    q(H.prototype, {
        htmlCss: function(a) {
            var b = this.element;
            if (b = a && b.tagName === "SPAN" && a.width) delete a.width, this.textWidth = b, this.updateTransform();
            this.styles = q(this.styles, a);
            D(this.element, a);
            return this
        },
        htmlGetBBox: function() {
            var a = this.element,
                b = this.bBox;
            if (!b) {
                if (a.nodeName === "text") a.style.position =
                    "absolute";
                b = this.bBox = {
                    x: a.offsetLeft,
                    y: a.offsetTop,
                    width: a.offsetWidth,
                    height: a.offsetHeight
                }
            }
            return b
        },
        htmlUpdateTransform: function() {
            if (this.added) {
                var a = this.renderer,
                    b = this.element,
                    c = this.translateX || 0,
                    d = this.translateY || 0,
                    e = this.x || 0,
                    f = this.y || 0,
                    g = this.textAlign || "left",
                    h = {
                        left: 0,
                        center: 0.5,
                        right: 1
                    }[g],
                    i = this.shadows;
                D(b, {
                    marginLeft: c,
                    marginTop: d
                });
                i && o(i, function(a) {
                    D(a, {
                        marginLeft: c + 1,
                        marginTop: d + 1
                    })
                });
                this.inverted && o(b.childNodes, function(c) {
                    a.invertChild(c, b)
                });
                if (b.tagName === "SPAN") {
                    var j =
                        this.rotation,
                        k, l = B(this.textWidth),
                        n = [j, g, b.innerHTML, this.textWidth].join(",");
                    if (n !== this.cTT) {
                        k = a.fontMetrics(b.style.fontSize).b;
                        t(j) && this.setSpanRotation(j, h, k);
                        i = p(this.elemWidth, b.offsetWidth);
                        if (i > l && /[ \-]/.test(b.textContent || b.innerText)) D(b, {
                            width: l + "px",
                            display: "block",
                            whiteSpace: "normal"
                        }), i = l;
                        this.getSpanCorrection(i, k, h, j, g)
                    }
                    D(b, {
                        left: e + (this.xCorr || 0) + "px",
                        top: f + (this.yCorr || 0) + "px"
                    });
                    if (ib) k = b.offsetHeight;
                    this.cTT = n
                }
            } else this.alignOnAdd = !0
        },
        setSpanRotation: function(a, b, c) {
            var d = {},
                e = za ? "-ms-transform" : ib ? "-webkit-transform" : Ma ? "MozTransform" : zb ? "-o-transform" : "";
            d[e] = d.transform = "rotate(" + a + "deg)";
            d[e + (Ma ? "Origin" : "-origin")] = d.transformOrigin = b * 100 + "% " + c + "px";
            D(this.element, d)
        },
        getSpanCorrection: function(a, b, c) {
            this.xCorr = -a * c;
            this.yCorr = -b
        }
    });
    q(ba.prototype, {
        html: function(a, b, c) {
            var d = this.createElement("span"),
                e = d.element,
                f = d.renderer;
            d.textSetter = function(a) {
                a !== e.innerHTML && delete this.bBox;
                e.innerHTML = this.textStr = a
            };
            d.xSetter = d.ySetter = d.alignSetter = d.rotationSetter =
                function(a, b) {
                    b === "align" && (b = "textAlign");
                    d[b] = a;
                    d.htmlUpdateTransform()
                };
            d.attr({
                text: a,
                x: w(b),
                y: w(c)
            }).css({
                position: "absolute",
                whiteSpace: "nowrap",
                fontFamily: this.style.fontFamily,
                fontSize: this.style.fontSize
            });
            d.css = d.htmlCss;
            if (f.isSVG) d.add = function(a) {
                var b, c = f.box.parentNode,
                    j = [];
                if (this.parentGroup = a) {
                    if (b = a.div, !b) {
                        for (; a;) j.push(a), a = a.parentGroup;
                        o(j.reverse(), function(a) {
                            var d;
                            b = a.div = a.div || $(Ga, {
                                className: G(a.element, "class")
                            }, {
                                position: "absolute",
                                left: (a.translateX || 0) + "px",
                                top: (a.translateY ||
                                    0) + "px"
                            }, b || c);
                            d = b.style;
                            q(a, {
                                translateXSetter: function(b, c) {
                                    d.left = b + "px";
                                    a[c] = b;
                                    a.doTransform = !0
                                },
                                translateYSetter: function(b, c) {
                                    d.top = b + "px";
                                    a[c] = b;
                                    a.doTransform = !0
                                },
                                visibilitySetter: function(a, b) {
                                    d[b] = a
                                }
                            })
                        })
                    }
                } else b = c;
                b.appendChild(e);
                d.added = !0;
                d.alignOnAdd && d.htmlUpdateTransform();
                return d
            };
            return d
        }
    });
    var Wa, L;
    if (!ca && !ga) L = {
            init: function(a, b) {
                var c = ["<", b, ' filled="f" stroked="f"'],
                    d = ["position: ", "absolute", ";"],
                    e = b === Ga;
                (b === "shape" || e) && d.push("left:0;top:0;width:1px;height:1px;");
                d.push("visibility: ",
                    e ? "hidden" : "visible");
                c.push(' style="', d.join(""), '"/>');
                if (b) c = e || b === "span" || b === "img" ? c.join("") : a.prepVML(c), this.element = $(c);
                this.renderer = a
            },
            add: function(a) {
                var b = this.renderer,
                    c = this.element,
                    d = b.box,
                    d = a ? a.element || a : d;
                a && a.inverted && b.invertChild(c, d);
                d.appendChild(c);
                this.added = !0;
                this.alignOnAdd && !this.deferUpdateTransform && this.updateTransform();
                if (this.onAdd) this.onAdd();
                return this
            },
            updateTransform: H.prototype.htmlUpdateTransform,
            setSpanRotation: function() {
                var a = this.rotation,
                    b = qa(a *
                        Aa),
                    c = va(a * Aa);
                D(this.element, {
                    filter: a ? ["progid:DXImageTransform.Microsoft.Matrix(M11=", b, ", M12=", -c, ", M21=", c, ", M22=", b, ", sizingMethod='auto expand')"].join("") : S
                })
            },
            getSpanCorrection: function(a, b, c, d, e) {
                var f = d ? qa(d * Aa) : 1,
                    g = d ? va(d * Aa) : 0,
                    h = p(this.elemHeight, this.element.offsetHeight),
                    i;
                this.xCorr = f < 0 && -a;
                this.yCorr = g < 0 && -h;
                i = f * g < 0;
                this.xCorr += g * b * (i ? 1 - c : c);
                this.yCorr -= f * b * (d ? i ? c : 1 - c : 1);
                e && e !== "left" && (this.xCorr -= a * c * (f < 0 ? -1 : 1), d && (this.yCorr -= h * c * (g < 0 ? -1 : 1)), D(this.element, {
                    textAlign: e
                }))
            },
            pathToVML: function(a) {
                for (var b = a.length, c = []; b--;)
                    if (ka(a[b])) c[b] = w(a[b] * 10) - 5;
                    else if (a[b] === "Z") c[b] = "x";
                else if (c[b] = a[b], a.isArc && (a[b] === "wa" || a[b] === "at")) c[b + 5] === c[b + 7] && (c[b + 7] += a[b + 7] > a[b + 5] ? 1 : -1), c[b + 6] === c[b + 8] && (c[b + 8] += a[b + 8] > a[b + 6] ? 1 : -1);
                return c.join(" ") || "x"
            },
            clip: function(a) {
                var b = this,
                    c;
                a ? (c = a.members, ta(c, b), c.push(b), b.destroyClip = function() {
                    ta(c, b)
                }, a = a.getCSS(b)) : (b.destroyClip && b.destroyClip(), a = {
                    clip: cb ? "inherit" : "rect(auto)"
                });
                return b.css(a)
            },
            css: H.prototype.htmlCss,
            safeRemoveChild: function(a) {
                a.parentNode && Ja(a)
            },
            destroy: function() {
                this.destroyClip && this.destroyClip();
                return H.prototype.destroy.apply(this)
            },
            on: function(a, b) {
                this.element["on" + a] = function() {
                    var a = I.event;
                    a.target = a.srcElement;
                    b(a)
                };
                return this
            },
            cutOffPath: function(a, b) {
                var c, a = a.split(/[ ,]/);
                c = a.length;
                if (c === 9 || c === 11) a[c - 4] = a[c - 2] = B(a[c - 2]) - 10 * b;
                return a.join(" ")
            },
            shadow: function(a, b, c) {
                var d = [],
                    e, f = this.element,
                    g = this.renderer,
                    h, i = f.style,
                    j, k = f.path,
                    l, n, m, x;
                k && typeof k.value !== "string" &&
                    (k = "x");
                n = k;
                if (a) {
                    m = p(a.width, 3);
                    x = (a.opacity || 0.15) / m;
                    for (e = 1; e <= 3; e++) {
                        l = m * 2 + 1 - 2 * e;
                        c && (n = this.cutOffPath(k.value, l + 0.5));
                        j = ['<shape isShadow="true" strokeweight="', l, '" filled="false" path="', n, '" coordsize="10 10" style="', f.style.cssText, '" />'];
                        h = $(g.prepVML(j), null, {
                            left: B(i.left) + p(a.offsetX, 1),
                            top: B(i.top) + p(a.offsetY, 1)
                        });
                        if (c) h.cutOff = l + 1;
                        j = ['<stroke color="', a.color || "black", '" opacity="', x * e, '"/>'];
                        $(g.prepVML(j), null, null, h);
                        b ? b.element.appendChild(h) : f.parentNode.insertBefore(h, f);
                        d.push(h)
                    }
                    this.shadows =
                        d
                }
                return this
            },
            updateShadows: aa,
            setAttr: function(a, b) {
                cb ? this.element[a] = b : this.element.setAttribute(a, b)
            },
            classSetter: function(a) {
                this.element.className = a
            },
            dashstyleSetter: function(a, b, c) {
                (c.getElementsByTagName("stroke")[0] || $(this.renderer.prepVML(["<stroke/>"]), null, null, c))[b] = a || "solid";
                this[b] = a
            },
            dSetter: function(a, b, c) {
                var d = this.shadows,
                    a = a || [];
                this.d = a.join && a.join(" ");
                c.path = a = this.pathToVML(a);
                if (d)
                    for (c = d.length; c--;) d[c].path = d[c].cutOff ? this.cutOffPath(a, d[c].cutOff) : a;
                this.setAttr(b,
                    a)
            },
            fillSetter: function(a, b, c) {
                var d = c.nodeName;
                if (d === "SPAN") c.style.color = a;
                else if (d !== "IMG") c.filled = a !== S, this.setAttr("fillcolor", this.renderer.color(a, c, b, this))
            },
            opacitySetter: aa,
            rotationSetter: function(a, b, c) {
                c = c.style;
                this[b] = c[b] = a;
                c.left = -w(va(a * Aa) + 1) + "px";
                c.top = w(qa(a * Aa)) + "px"
            },
            strokeSetter: function(a, b, c) {
                this.setAttr("strokecolor", this.renderer.color(a, c, b))
            },
            "stroke-widthSetter": function(a, b, c) {
                c.stroked = !!a;
                this[b] = a;
                ka(a) && (a += "px");
                this.setAttr("strokeweight", a)
            },
            titleSetter: function(a,
                b) {
                this.setAttr(b, a)
            },
            visibilitySetter: function(a, b, c) {
                a === "inherit" && (a = "visible");
                this.shadows && o(this.shadows, function(c) {
                    c.style[b] = a
                });
                c.nodeName === "DIV" && (a = a === "hidden" ? "-999em" : 0, cb || (c.style[b] = a ? "visible" : "hidden"), b = "top");
                c.style[b] = a
            },
            xSetter: function(a, b, c) {
                this[b] = a;
                b === "x" ? b = "left" : b === "y" && (b = "top");
                this.updateClipping ? (this[b] = a, this.updateClipping()) : c.style[b] = a
            },
            zIndexSetter: function(a, b, c) {
                c.style[b] = a
            }
        }, K.VMLElement = L = da(H, L), L.prototype.ySetter = L.prototype.widthSetter = L.prototype.heightSetter =
        L.prototype.xSetter, L = {
            Element: L,
            isIE8: wa.indexOf("MSIE 8.0") > -1,
            init: function(a, b, c, d) {
                var e;
                this.alignedObjects = [];
                d = this.createElement(Ga).css(q(this.getStyle(d), {
                    position: "relative"
                }));
                e = d.element;
                a.appendChild(d.element);
                this.isVML = !0;
                this.box = e;
                this.boxWrapper = d;
                this.cache = {};
                this.setSize(b, c, !1);
                if (!y.namespaces.hcv) {
                    y.namespaces.add("hcv", "urn:schemas-microsoft-com:vml");
                    try {
                        y.createStyleSheet().cssText = "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
                    } catch (f) {
                        y.styleSheets[0].cssText +=
                            "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
                    }
                }
            },
            isHidden: function() {
                return !this.box.offsetWidth
            },
            clipRect: function(a, b, c, d) {
                var e = this.createElement(),
                    f = fa(a);
                return q(e, {
                    members: [],
                    left: (f ? a.x : a) + 1,
                    top: (f ? a.y : b) + 1,
                    width: (f ? a.width : c) - 1,
                    height: (f ? a.height : d) - 1,
                    getCSS: function(a) {
                        var b = a.element,
                            c = b.nodeName,
                            a = a.inverted,
                            d = this.top - (c === "shape" ? b.offsetTop : 0),
                            e = this.left,
                            b = e + this.width,
                            f = d + this.height,
                            d = {
                                clip: "rect(" + w(a ? e : d) + "px," + w(a ?
                                    f : b) + "px," + w(a ? b : f) + "px," + w(a ? d : e) + "px)"
                            };
                        !a && cb && c === "DIV" && q(d, {
                            width: b + "px",
                            height: f + "px"
                        });
                        return d
                    },
                    updateClipping: function() {
                        o(e.members, function(a) {
                            a.element && a.css(e.getCSS(a))
                        })
                    }
                })
            },
            color: function(a, b, c, d) {
                var e = this,
                    f, g = /^rgba/,
                    h, i, j = S;
                a && a.linearGradient ? i = "gradient" : a && a.radialGradient && (i = "pattern");
                if (i) {
                    var k, l, n = a.linearGradient || a.radialGradient,
                        m, p, M, z, O, E = "",
                        a = a.stops,
                        r, q = [],
                        s = function() {
                            h = ['<fill colors="' + q.join(",") + '" opacity="', M, '" o:opacity2="', p, '" type="', i, '" ', E, 'focus="100%" method="any" />'];
                            $(e.prepVML(h), null, null, b)
                        };
                    m = a[0];
                    r = a[a.length - 1];
                    m[0] > 0 && a.unshift([0, m[1]]);
                    r[0] < 1 && a.push([1, r[1]]);
                    o(a, function(a, b) {
                        g.test(a[1]) ? (f = Z(a[1]), k = f.get("rgb"), l = f.get("a")) : (k = a[1], l = 1);
                        q.push(a[0] * 100 + "% " + k);
                        b ? (M = l, z = k) : (p = l, O = k)
                    });
                    if (c === "fill")
                        if (i === "gradient") c = n.x1 || n[0] || 0, a = n.y1 || n[1] || 0, m = n.x2 || n[2] || 0, n = n.y2 || n[3] || 0, E = 'angle="' + (90 - F.atan((n - a) / (m - c)) * 180 / hb) + '"', s();
                        else {
                            var j = n.r,
                                t = j * 2,
                                w = j * 2,
                                u = n.cx,
                                A = n.cy,
                                v = b.radialReference,
                                y, j = function() {
                                    v && (y = d.getBBox(), u += (v[0] - y.x) / y.width -
                                        0.5, A += (v[1] - y.y) / y.height - 0.5, t *= v[2] / y.width, w *= v[2] / y.height);
                                    E = 'src="' + J.global.VMLRadialGradientURL + '" size="' + t + "," + w + '" origin="0.5,0.5" position="' + u + "," + A + '" color2="' + O + '" ';
                                    s()
                                };
                            d.added ? j() : d.onAdd = j;
                            j = z
                        } else j = k
                } else if (g.test(a) && b.tagName !== "IMG") f = Z(a), h = ["<", c, ' opacity="', f.get("a"), '"/>'], $(this.prepVML(h), null, null, b), j = f.get("rgb");
                else {
                    j = b.getElementsByTagName(c);
                    if (j.length) j[0].opacity = 1, j[0].type = "solid";
                    j = a
                }
                return j
            },
            prepVML: function(a) {
                var b = this.isIE8,
                    a = a.join("");
                b ? (a =
                    a.replace("/>", ' xmlns="urn:schemas-microsoft-com:vml" />'), a = a.indexOf('style="') === -1 ? a.replace("/>", ' style="display:inline-block;behavior:url(#default#VML);" />') : a.replace('style="', 'style="display:inline-block;behavior:url(#default#VML);')) : a = a.replace("<", "<hcv:");
                return a
            },
            text: ba.prototype.html,
            path: function(a) {
                var b = {
                    coordsize: "10 10"
                };
                Da(a) ? b.d = a : fa(a) && q(b, a);
                return this.createElement("shape").attr(b)
            },
            circle: function(a, b, c) {
                var d = this.symbol("circle");
                if (fa(a)) c = a.r, b = a.y, a = a.x;
                d.isCircle = !0;
                d.r = c;
                return d.attr({
                    x: a,
                    y: b
                })
            },
            g: function(a) {
                var b;
                a && (b = {
                    className: "highcharts-" + a,
                    "class": "highcharts-" + a
                });
                return this.createElement(Ga).attr(b)
            },
            image: function(a, b, c, d, e) {
                var f = this.createElement("img").attr({
                    src: a
                });
                arguments.length > 1 && f.attr({
                    x: b,
                    y: c,
                    width: d,
                    height: e
                });
                return f
            },
            createElement: function(a) {
                return a === "rect" ? this.symbol(a) : ba.prototype.createElement.call(this, a)
            },
            invertChild: function(a, b) {
                var c = this,
                    d = b.style,
                    e = a.tagName === "IMG" && a.style;
                D(a, {
                    flip: "x",
                    left: B(d.width) - (e ? B(e.top) :
                        1),
                    top: B(d.height) - (e ? B(e.left) : 1),
                    rotation: -90
                });
                o(a.childNodes, function(b) {
                    c.invertChild(b, a)
                })
            },
            symbols: {
                arc: function(a, b, c, d, e) {
                    var f = e.start,
                        g = e.end,
                        h = e.r || c || d,
                        c = e.innerR,
                        d = qa(f),
                        i = va(f),
                        j = qa(g),
                        k = va(g);
                    if (g - f === 0) return ["x"];
                    f = ["wa", a - h, b - h, a + h, b + h, a + h * d, b + h * i, a + h * j, b + h * k];
                    e.open && !c && f.push("e", "M", a, b);
                    f.push("at", a - c, b - c, a + c, b + c, a + c * j, b + c * k, a + c * d, b + c * i, "x", "e");
                    f.isArc = !0;
                    return f
                },
                circle: function(a, b, c, d, e) {
                    e && (c = d = 2 * e.r);
                    e && e.isCircle && (a -= c / 2, b -= d / 2);
                    return ["wa", a, b, a + c, b + d, a + c, b + d / 2,
                        a + c, b + d / 2, "e"
                    ]
                },
                rect: function(a, b, c, d, e) {
                    return ba.prototype.symbols[!t(e) || !e.r ? "square" : "callout"].call(0, a, b, c, d, e)
                }
            }
        }, K.VMLRenderer = Wa = function() {
            this.init.apply(this, arguments)
        }, Wa.prototype = v(ba.prototype, L), Na = Wa;
    ba.prototype.measureSpanWidth = function(a, b) {
        var c = y.createElement("span"),
            d;
        d = y.createTextNode(a);
        c.appendChild(d);
        D(c, b);
        this.box.appendChild(c);
        d = c.offsetWidth;
        Ja(c);
        return d
    };
    var Eb;
    if (ga) K.CanVGRenderer = L = function() {
            xa = "http://www.w3.org/1999/xhtml"
        }, L.prototype.symbols = {}, Eb =
        function() {
            function a() {
                var a = b.length,
                    d;
                for (d = 0; d < a; d++) b[d]();
                b = []
            }
            var b = [];
            return {
                push: function(c, d) {
                    b.length === 0 && Kb(d, a);
                    b.push(c)
                }
            }
        }(), Na = L;
    La.prototype = {
        addLabel: function() {
            var a = this.axis,
                b = a.options,
                c = a.chart,
                d = a.horiz,
                e = a.categories,
                f = a.names,
                g = this.pos,
                h = b.labels,
                i = h.rotation,
                j = a.tickPositions,
                d = d && e && !h.step && !h.staggerLines && !h.rotation && c.plotWidth / j.length || !d && (c.margin[3] || c.chartWidth * 0.33),
                k = g === j[0],
                l = g === j[j.length - 1],
                n, f = e ? p(e[g], f[g], g) : g,
                e = this.label,
                m = j.info;
            a.isDatetimeAxis &&
                m && (n = b.dateTimeLabelFormats[m.higherRanks[g] || m.unitName]);
            this.isFirst = k;
            this.isLast = l;
            b = a.labelFormatter.call({
                axis: a,
                chart: c,
                isFirst: k,
                isLast: l,
                dateTimeLabelFormat: n,
                value: a.isLog ? ua(la(f)) : f
            });
            g = d && {
                width: s(1, w(d - 2 * (h.padding || 10))) + "px"
            };
            if (t(e)) e && e.attr({
                text: b
            }).css(g);
            else {
                n = {
                    align: a.labelAlign
                };
                if (ka(i)) n.rotation = i;
                if (d && h.ellipsis) g.HcHeight = a.len / j.length;
                this.label = e = t(b) && h.enabled ? c.renderer.text(b, 0, 0, h.useHTML).attr(n).css(q(g, h.style)).add(a.labelGroup) : null;
                a.tickBaseline = c.renderer.fontMetrics(h.style.fontSize,
                    e).b;
                i && a.side === 2 && (a.tickBaseline *= qa(i * Aa))
            }
            this.yOffset = e ? p(h.y, a.tickBaseline + (a.side === 2 ? 8 : -(e.getBBox().height / 2))) : 0
        },
        getLabelSize: function() {
            var a = this.label,
                b = this.axis;
            return a ? a.getBBox()[b.horiz ? "height" : "width"] : 0
        },
        getLabelSides: function() {
            var a = this.label.getBBox(),
                b = this.axis,
                c = b.horiz,
                d = b.options.labels,
                a = c ? a.width : a.height,
                b = c ? d.x - a * {
                    left: 0,
                    center: 0.5,
                    right: 1
                }[b.labelAlign] : 0;
            return [b, c ? a + b : a]
        },
        handleOverflow: function(a, b) {
            var c = !0,
                d = this.axis,
                e = this.isFirst,
                f = this.isLast,
                g = d.horiz ?
                b.x : b.y,
                h = d.reversed,
                i = d.tickPositions,
                j = this.getLabelSides(),
                k = j[0],
                j = j[1],
                l, n, m, p = this.label.line;
            l = p || 0;
            n = d.labelEdge;
            m = d.justifyLabels && (e || f);
            n[l] === r || g + k > n[l] ? n[l] = g + j : m || (c = !1);
            if (m) {
                l = (n = d.justifyToPlot) ? d.pos : 0;
                n = n ? l + d.len : d.chart.chartWidth;
                do a += e ? 1 : -1, m = d.ticks[i[a]]; while (i[a] && (!m || !m.label || m.label.line !== p));
                d = m && m.label.xy && m.label.xy.x + m.getLabelSides()[e ? 0 : 1];
                e && !h || f && h ? g + k < l && (g = l - k, m && g + j > d && (c = !1)) : g + j > n && (g = n - j, m && g + k < d && (c = !1));
                b.x = g
            }
            return c
        },
        getPosition: function(a, b, c,
            d) {
            var e = this.axis,
                f = e.chart,
                g = d && f.oldChartHeight || f.chartHeight;
            return {
                x: a ? e.translate(b + c, null, null, d) + e.transB : e.left + e.offset + (e.opposite ? (d && f.oldChartWidth || f.chartWidth) - e.right - e.left : 0),
                y: a ? g - e.bottom + e.offset - (e.opposite ? e.height : 0) : g - e.translate(b + c, null, null, d) - e.transB
            }
        },
        getLabelPosition: function(a, b, c, d, e, f, g, h) {
            var i = this.axis,
                j = i.transA,
                k = i.reversed,
                l = i.staggerLines,
                a = a + e.x - (f && d ? f * j * (k ? -1 : 1) : 0),
                b = b + this.yOffset - (f && !d ? f * j * (k ? 1 : -1) : 0);
            if (l) c.line = g / (h || 1) % l, b += c.line * (i.labelOffset /
                l);
            return {
                x: a,
                y: b
            }
        },
        getMarkPath: function(a, b, c, d, e, f) {
            return f.crispLine(["M", a, b, "L", a + (e ? 0 : -c), b + (e ? c : 0)], d)
        },
        render: function(a, b, c) {
            var d = this.axis,
                e = d.options,
                f = d.chart.renderer,
                g = d.horiz,
                h = this.type,
                i = this.label,
                j = this.pos,
                k = e.labels,
                l = this.gridLine,
                n = h ? h + "Grid" : "grid",
                m = h ? h + "Tick" : "tick",
                x = e[n + "LineWidth"],
                o = e[n + "LineColor"],
                z = e[n + "LineDashStyle"],
                O = e[m + "Length"],
                n = e[m + "Width"] || 0,
                E = e[m + "Color"],
                q = e[m + "Position"],
                m = this.mark,
                s = k.step,
                t = !0,
                w = d.tickmarkOffset,
                u = this.getPosition(g, j, w, b),
                v = u.x,
                u = u.y,
                A = g && v === d.pos + d.len || !g && u === d.pos ? -1 : 1,
                c = p(c, 1);
            this.isActive = !0;
            if (x) {
                j = d.getPlotLinePath(j + w, x * A, b, !0);
                if (l === r) {
                    l = {
                        stroke: o,
                        "stroke-width": x
                    };
                    if (z) l.dashstyle = z;
                    if (!h) l.zIndex = 1;
                    if (b) l.opacity = 0;
                    this.gridLine = l = x ? f.path(j).attr(l).add(d.gridGroup) : null
                }
                if (!b && l && j) l[this.isNew ? "attr" : "animate"]({
                    d: j,
                    opacity: c
                })
            }
            if (n && O) q === "inside" && (O = -O), d.opposite && (O = -O), h = this.getMarkPath(v, u, O, n * A, g, f), m ? m.animate({
                d: h,
                opacity: c
            }) : this.mark = f.path(h).attr({
                stroke: E,
                "stroke-width": n,
                opacity: c
            }).add(d.axisGroup);
            if (i && !isNaN(v)) i.xy = u = this.getLabelPosition(v, u, i, g, k, w, a, s), this.isFirst && !this.isLast && !p(e.showFirstLabel, 1) || this.isLast && !this.isFirst && !p(e.showLastLabel, 1) ? t = !1 : !d.isRadial && !k.step && !k.rotation && !b && c !== 0 && (t = this.handleOverflow(a, u)), s && a % s && (t = !1), t && !isNaN(u.y) ? (u.opacity = c, i[this.isNew ? "attr" : "animate"](u), this.isNew = !1) : i.attr("y", -9999)
        },
        destroy: function() {
            ab(this, this.axis)
        }
    };
    Q.prototype = {
        defaultOptions: {
            dateTimeLabelFormats: {
                millisecond: "%H:%M:%S.%L",
                second: "%H:%M:%S",
                minute: "%H:%M",
                hour: "%H:%M",
                day: "%e. %b",
                week: "%e. %b",
                month: "%b '%y",
                year: "%Y"
            },
            endOnTick: !1,
            gridLineColor: "#C0C0C0",
            labels: P,
            lineColor: "#C0D0E0",
            lineWidth: 1,
            minPadding: 0.01,
            maxPadding: 0.01,
            minorGridLineColor: "#E0E0E0",
            minorGridLineWidth: 1,
            minorTickColor: "#A0A0A0",
            minorTickLength: 2,
            minorTickPosition: "outside",
            startOfWeek: 1,
            startOnTick: !1,
            tickColor: "#C0D0E0",
            tickLength: 10,
            tickmarkPlacement: "between",
            tickPixelInterval: 100,
            tickPosition: "outside",
            tickWidth: 1,
            title: {
                align: "middle",
                style: {
                    color: "#707070"
                }
            },
            type: "linear"
        },
        defaultYAxisOptions: {
            endOnTick: !0,
            gridLineWidth: 1,
            tickPixelInterval: 72,
            showLastLabel: !0,
            labels: {
                x: -8,
                y: 3
            },
            lineWidth: 0,
            maxPadding: 0.05,
            minPadding: 0.05,
            startOnTick: !0,
            tickWidth: 0,
            title: {
                rotation: 270,
                text: "Values"
            },
            stackLabels: {
                enabled: !1,
                formatter: function() {
                    return oa(this.total, -1)
                },
                style: P.style
            }
        },
        defaultLeftAxisOptions: {
            labels: {
                x: -15,
                y: null
            },
            title: {
                rotation: 270
            }
        },
        defaultRightAxisOptions: {
            labels: {
                x: 15,
                y: null
            },
            title: {
                rotation: 90
            }
        },
        defaultBottomAxisOptions: {
            labels: {
                x: 0,
                y: null
            },
            title: {
                rotation: 0
            }
        },
        defaultTopAxisOptions: {
            labels: {
                x: 0,
                y: -15
            },
            title: {
                rotation: 0
            }
        },
        init: function(a, b) {
            var c = b.isX;
            this.horiz = a.inverted ? !c : c;
            this.coll = (this.isXAxis = c) ? "xAxis" : "yAxis";
            this.opposite = b.opposite;
            this.side = b.side || (this.horiz ? this.opposite ? 0 : 2 : this.opposite ? 1 : 3);
            this.setOptions(b);
            var d = this.options,
                e = d.type;
            this.labelFormatter = d.labels.formatter || this.defaultLabelFormatter;
            this.userOptions = b;
            this.minPixelPadding = 0;
            this.chart = a;
            this.reversed = d.reversed;
            this.zoomEnabled = d.zoomEnabled !== !1;
            this.categories = d.categories || e === "category";
            this.names = [];
            this.isLog = e === "logarithmic";
            this.isDatetimeAxis = e === "datetime";
            this.isLinked = t(d.linkedTo);
            this.tickmarkOffset = this.categories && d.tickmarkPlacement === "between" && p(d.tickInterval, 1) === 1 ? 0.5 : 0;
            this.ticks = {};
            this.labelEdge = [];
            this.minorTicks = {};
            this.plotLinesAndBands = [];
            this.alternateBands = {};
            this.len = 0;
            this.minRange = this.userMinRange = d.minRange || d.maxZoom;
            this.range = d.range;
            this.offset = d.offset || 0;
            this.stacks = {};
            this.oldStacks = {};
            this.min = this.max = null;
            this.crosshair = p(d.crosshair, na(a.options.tooltip.crosshairs)[c ?
                0 : 1], !1);
            var f, d = this.options.events;
            Ta(this, a.axes) === -1 && (c && !this.isColorAxis ? a.axes.splice(a.xAxis.length, 0, this) : a.axes.push(this), a[this.coll].push(this));
            this.series = this.series || [];
            if (a.inverted && c && this.reversed === r) this.reversed = !0;
            this.removePlotLine = this.removePlotBand = this.removePlotBandOrLine;
            for (f in d) N(this, f, d[f]);
            if (this.isLog) this.val2lin = Pa, this.lin2val = la
        },
        setOptions: function(a) {
            this.options = v(this.defaultOptions, this.isXAxis ? {} : this.defaultYAxisOptions, [this.defaultTopAxisOptions,
                this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions
            ][this.side], v(J[this.coll], a))
        },
        defaultLabelFormatter: function() {
            var a = this.axis,
                b = this.value,
                c = a.categories,
                d = this.dateTimeLabelFormat,
                e = J.lang.numericSymbols,
                f = e && e.length,
                g, h = a.options.labels.format,
                a = a.isLog ? b : a.tickInterval;
            if (h) g = Ia(h, this);
            else if (c) g = b;
            else if (d) g = $a(d, b);
            else if (f && a >= 1E3)
                for (; f-- && g === r;) c = Math.pow(1E3, f + 1), a >= c && e[f] !== null && (g = oa(b / c, -1) + e[f]);
            g === r && (g = U(b) >= 1E4 ? oa(b, 0) : oa(b, -1, r, ""));
            return g
        },
        getSeriesExtremes: function() {
            var a = this,
                b = a.chart;
            a.hasVisibleSeries = !1;
            a.dataMin = a.dataMax = a.ignoreMinPadding = a.ignoreMaxPadding = null;
            a.buildStacks && a.buildStacks();
            o(a.series, function(c) {
                if (c.visible || !b.options.chart.ignoreHiddenSeries) {
                    var d;
                    d = c.options.threshold;
                    var e;
                    a.hasVisibleSeries = !0;
                    a.isLog && d <= 0 && (d = null);
                    if (a.isXAxis) {
                        if (d = c.xData, d.length) a.dataMin = R(p(a.dataMin, d[0]), Qa(d)), a.dataMax = s(p(a.dataMax, d[0]), Fa(d))
                    } else {
                        c.getExtremes();
                        e = c.dataMax;
                        c = c.dataMin;
                        if (t(c) && t(e)) a.dataMin =
                            R(p(a.dataMin, c), c), a.dataMax = s(p(a.dataMax, e), e);
                        if (t(d))
                            if (a.dataMin >= d) a.dataMin = d, a.ignoreMinPadding = !0;
                            else if (a.dataMax < d) a.dataMax = d, a.ignoreMaxPadding = !0
                    }
                }
            })
        },
        translate: function(a, b, c, d, e, f) {
            var g = 1,
                h = 0,
                i = d ? this.oldTransA : this.transA,
                d = d ? this.oldMin : this.min,
                j = this.minPixelPadding,
                e = (this.options.ordinal || this.isLog && e) && this.lin2val;
            if (!i) i = this.transA;
            if (c) g *= -1, h = this.len;
            this.reversed && (g *= -1, h -= g * (this.sector || this.len));
            b ? (a = a * g + h, a -= j, a = a / i + d, e && (a = this.lin2val(a))) : (e && (a = this.val2lin(a)),
                f === "between" && (f = 0.5), a = g * (a - d) * i + h + g * j + (ka(f) ? i * f * this.pointRange : 0));
            return a
        },
        toPixels: function(a, b) {
            return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos)
        },
        toValue: function(a, b) {
            return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null, !0)
        },
        getPlotLinePath: function(a, b, c, d, e) {
            var f = this.chart,
                g = this.left,
                h = this.top,
                i, j, k = c && f.oldChartHeight || f.chartHeight,
                l = c && f.oldChartWidth || f.chartWidth,
                n;
            i = this.transB;
            e = p(e, this.translate(a, null, null, c));
            a = c = w(e + i);
            i = j = w(k - e - i);
            if (isNaN(e)) n = !0;
            else if (this.horiz) {
                if (i = h, j = k - this.bottom, a < g || a > g + this.width) n = !0
            } else if (a = g, c = l - this.right, i < h || i > h + this.height) n = !0;
            return n && !d ? null : f.renderer.crispLine(["M", a, i, "L", c, j], b || 1)
        },
        getLinearTickPositions: function(a, b, c) {
            var d, e = ua(ea(b / a) * a),
                f = ua(Ha(c / a) * a),
                g = [];
            if (b === c && ka(b)) return [b];
            for (b = e; b <= f;) {
                g.push(b);
                b = ua(b + a);
                if (b === d) break;
                d = b
            }
            return g
        },
        getMinorTickPositions: function() {
            var a = this.options,
                b = this.tickPositions,
                c = this.minorTickInterval,
                d = [],
                e;
            if (this.isLog) {
                e = b.length;
                for (a = 1; a < e; a++) d =
                    d.concat(this.getLogTickPositions(c, b[a - 1], b[a], !0))
            } else if (this.isDatetimeAxis && a.minorTickInterval === "auto") d = d.concat(this.getTimeTicks(this.normalizeTimeTickInterval(c), this.min, this.max, a.startOfWeek)), d[0] < this.min && d.shift();
            else
                for (b = this.min + (b[0] - this.min) % c; b <= this.max; b += c) d.push(b);
            return d
        },
        adjustForMinRange: function() {
            var a = this.options,
                b = this.min,
                c = this.max,
                d, e = this.dataMax - this.dataMin >= this.minRange,
                f, g, h, i, j;
            if (this.isXAxis && this.minRange === r && !this.isLog) t(a.min) || t(a.max) ? this.minRange =
                null : (o(this.series, function(a) {
                    i = a.xData;
                    for (g = j = a.xIncrement ? 1 : i.length - 1; g > 0; g--)
                        if (h = i[g] - i[g - 1], f === r || h < f) f = h
                }), this.minRange = R(f * 5, this.dataMax - this.dataMin));
            if (c - b < this.minRange) {
                var k = this.minRange;
                d = (k - c + b) / 2;
                d = [b - d, p(a.min, b - d)];
                if (e) d[2] = this.dataMin;
                b = Fa(d);
                c = [b + k, p(a.max, b + k)];
                if (e) c[2] = this.dataMax;
                c = Qa(c);
                c - b < k && (d[0] = c - k, d[1] = p(a.min, c - k), b = Fa(d))
            }
            this.min = b;
            this.max = c
        },
        setAxisTranslation: function(a) {
            var b = this,
                c = b.max - b.min,
                d = b.axisPointRange || 0,
                e, f = 0,
                g = 0,
                h = b.linkedParent,
                i = !!b.categories,
                j = b.transA;
            if (b.isXAxis || i || d) h ? (f = h.minPointOffset, g = h.pointRangePadding) : o(b.series, function(a) {
                var h = i ? 1 : b.isXAxis ? a.pointRange : b.axisPointRange || 0,
                    j = a.options.pointPlacement,
                    m = a.closestPointRange;
                h > c && (h = 0);
                d = s(d, h);
                f = s(f, Ca(j) ? 0 : h / 2);
                g = s(g, j === "on" ? 0 : h);
                !a.noSharedTooltip && t(m) && (e = t(e) ? R(e, m) : m)
            }), h = b.ordinalSlope && e ? b.ordinalSlope / e : 1, b.minPointOffset = f *= h, b.pointRangePadding = g *= h, b.pointRange = R(d, c), b.closestPointRange = e;
            if (a) b.oldTransA = j;
            b.translationSlope = b.transA = j = b.len / (c + g || 1);
            b.transB =
                b.horiz ? b.left : b.bottom;
            b.minPixelPadding = j * f
        },
        setTickPositions: function(a) {
            var b = this,
                c = b.chart,
                d = b.options,
                e = d.startOnTick,
                f = d.endOnTick,
                g = b.isLog,
                h = b.isDatetimeAxis,
                i = b.isXAxis,
                j = b.isLinked,
                k = b.options.tickPositioner,
                l = d.maxPadding,
                n = d.minPadding,
                m = d.tickInterval,
                x = d.minTickInterval,
                M = d.tickPixelInterval,
                z, O = b.categories;
            j ? (b.linkedParent = c[b.coll][d.linkedTo], c = b.linkedParent.getExtremes(), b.min = p(c.min, c.dataMin), b.max = p(c.max, c.dataMax), d.type !== b.linkedParent.options.type && ja(11, 1)) : (b.min =
                p(b.userMin, d.min, b.dataMin), b.max = p(b.userMax, d.max, b.dataMax));
            if (g) !a && R(b.min, p(b.dataMin, b.min)) <= 0 && ja(10, 1), b.min = ua(Pa(b.min)), b.max = ua(Pa(b.max));
            if (b.range && t(b.max)) b.userMin = b.min = s(b.min, b.max - b.range), b.userMax = b.max, b.range = null;
            b.beforePadding && b.beforePadding();
            b.adjustForMinRange();
            if (!O && !b.axisPointRange && !b.usePercentage && !j && t(b.min) && t(b.max) && (c = b.max - b.min)) {
                if (!t(d.min) && !t(b.userMin) && n && (b.dataMin < 0 || !b.ignoreMinPadding)) b.min -= c * n;
                if (!t(d.max) && !t(b.userMax) && l && (b.dataMax >
                        0 || !b.ignoreMaxPadding)) b.max += c * l
            }
            if (ka(d.floor)) b.min = s(b.min, d.floor);
            if (ka(d.ceiling)) b.max = R(b.max, d.ceiling);
            b.min === b.max || b.min === void 0 || b.max === void 0 ? b.tickInterval = 1 : j && !m && M === b.linkedParent.options.tickPixelInterval ? b.tickInterval = b.linkedParent.tickInterval : (b.tickInterval = p(m, O ? 1 : (b.max - b.min) * M / s(b.len, M)), !t(m) && b.len < M && !this.isRadial && !this.isLog && !O && e && f && (z = !0, b.tickInterval /= 4));
            i && !a && o(b.series, function(a) {
                a.processData(b.min !== b.oldMin || b.max !== b.oldMax)
            });
            b.setAxisTranslation(!0);
            b.beforeSetTickPositions && b.beforeSetTickPositions();
            if (b.postProcessTickInterval) b.tickInterval = b.postProcessTickInterval(b.tickInterval);
            if (b.pointRange) b.tickInterval = s(b.pointRange, b.tickInterval);
            if (!m && b.tickInterval < x) b.tickInterval = x;
            if (!h && !g && !m) b.tickInterval = pb(b.tickInterval, null, F.pow(10, ea(F.log(b.tickInterval) / F.LN10)), p(d.allowDecimals, !(b.tickInterval > 1 && b.tickInterval < 5 && b.max > 1E3 && b.max < 9999)));
            b.minorTickInterval = d.minorTickInterval === "auto" && b.tickInterval ? b.tickInterval / 5 : d.minorTickInterval;
            b.tickPositions = a = d.tickPositions ? [].concat(d.tickPositions) : k && k.apply(b, [b.min, b.max]);
            if (!a) !b.ordinalPositions && (b.max - b.min) / b.tickInterval > s(2 * b.len, 200) && ja(19, !0), a = h ? b.getTimeTicks(b.normalizeTimeTickInterval(b.tickInterval, d.units), b.min, b.max, d.startOfWeek, b.ordinalPositions, b.closestPointRange, !0) : g ? b.getLogTickPositions(b.tickInterval, b.min, b.max) : b.getLinearTickPositions(b.tickInterval, b.min, b.max), z && a.splice(1, a.length - 2), b.tickPositions = a;
            if (!j) d = a[0], g = a[a.length - 1], h = b.minPointOffset ||
                0, e ? b.min = d : b.min - h > d && a.shift(), f ? b.max = g : b.max + h < g && a.pop(), a.length === 0 && t(d) && a.push((g + d) / 2), a.length === 1 && (e = U(b.max) > 1E13 ? 1 : 0.001, b.min -= e, b.max += e)
        },
        setMaxTicks: function() {
            var a = this.chart,
                b = a.maxTicks || {},
                c = this.tickPositions,
                d = this._maxTicksKey = [this.coll, this.pos, this.len].join("-");
            if (!this.isLinked && !this.isDatetimeAxis && c && c.length > (b[d] || 0) && this.options.alignTicks !== !1) b[d] = c.length;
            a.maxTicks = b
        },
        adjustTickAmount: function() {
            var a = this._maxTicksKey,
                b = this.tickPositions,
                c = this.chart.maxTicks;
            if (c && c[a] && !this.isDatetimeAxis && !this.categories && !this.isLinked && this.options.alignTicks !== !1 && this.min !== r) {
                var d = this.tickAmount,
                    e = b.length;
                this.tickAmount = a = c[a];
                if (e < a) {
                    for (; b.length < a;) b.push(ua(b[b.length - 1] + this.tickInterval));
                    this.transA *= (e - 1) / (a - 1);
                    this.max = b[b.length - 1]
                }
                if (t(d) && a !== d) this.isDirty = !0
            }
        },
        setScale: function() {
            var a = this.stacks,
                b, c, d, e;
            this.oldMin = this.min;
            this.oldMax = this.max;
            this.oldAxisLength = this.len;
            this.setAxisSize();
            e = this.len !== this.oldAxisLength;
            o(this.series, function(a) {
                if (a.isDirtyData ||
                    a.isDirty || a.xAxis.isDirty) d = !0
            });
            if (e || d || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax) {
                if (!this.isXAxis)
                    for (b in a)
                        for (c in a[b]) a[b][c].total = null, a[b][c].cum = 0;
                this.forceRedraw = !1;
                this.getSeriesExtremes();
                this.setTickPositions();
                this.oldUserMin = this.userMin;
                this.oldUserMax = this.userMax;
                if (!this.isDirty) this.isDirty = e || this.min !== this.oldMin || this.max !== this.oldMax
            } else if (!this.isXAxis) {
                if (this.oldStacks) a = this.stacks = this.oldStacks;
                for (b in a)
                    for (c in a[b]) a[b][c].cum =
                        a[b][c].total
            }
            this.setMaxTicks()
        },
        setExtremes: function(a, b, c, d, e) {
            var f = this,
                g = f.chart,
                c = p(c, !0),
                e = q(e, {
                    min: a,
                    max: b
                });
            C(f, "setExtremes", e, function() {
                f.userMin = a;
                f.userMax = b;
                f.eventArgs = e;
                f.isDirtyExtremes = !0;
                c && g.redraw(d)
            })
        },
        zoom: function(a, b) {
            var c = this.dataMin,
                d = this.dataMax,
                e = this.options;
            this.allowZoomOutside || (t(c) && a <= R(c, p(e.min, c)) && (a = r), t(d) && b >= s(d, p(e.max, d)) && (b = r));
            this.displayBtn = a !== r || b !== r;
            this.setExtremes(a, b, !1, r, {
                trigger: "zoom"
            });
            return !0
        },
        setAxisSize: function() {
            var a = this.chart,
                b = this.options,
                c = b.offsetLeft || 0,
                d = this.horiz,
                e = p(b.width, a.plotWidth - c + (b.offsetRight || 0)),
                f = p(b.height, a.plotHeight),
                g = p(b.top, a.plotTop),
                b = p(b.left, a.plotLeft + c),
                c = /%$/;
            c.test(f) && (f = parseInt(f, 10) / 100 * a.plotHeight);
            c.test(g) && (g = parseInt(g, 10) / 100 * a.plotHeight + a.plotTop);
            this.left = b;
            this.top = g;
            this.width = e;
            this.height = f;
            this.bottom = a.chartHeight - f - g;
            this.right = a.chartWidth - e - b;
            this.len = s(d ? e : f, 0);
            this.pos = d ? b : g
        },
        getExtremes: function() {
            var a = this.isLog;
            return {
                min: a ? ua(la(this.min)) : this.min,
                max: a ?
                    ua(la(this.max)) : this.max,
                dataMin: this.dataMin,
                dataMax: this.dataMax,
                userMin: this.userMin,
                userMax: this.userMax
            }
        },
        getThreshold: function(a) {
            var b = this.isLog,
                c = b ? la(this.min) : this.min,
                b = b ? la(this.max) : this.max;
            c > a || a === null ? a = c : b < a && (a = b);
            return this.translate(a, 0, 1, 0, 1)
        },
        autoLabelAlign: function(a) {
            a = (p(a, 0) - this.side * 90 + 720) % 360;
            return a > 15 && a < 165 ? "right" : a > 195 && a < 345 ? "left" : "center"
        },
        getOffset: function() {
            var a = this,
                b = a.chart,
                c = b.renderer,
                d = a.options,
                e = a.tickPositions,
                f = a.ticks,
                g = a.horiz,
                h = a.side,
                i =
                b.inverted ? [1, 0, 3, 2][h] : h,
                j, k, l = 0,
                n, m = 0,
                x = d.title,
                M = d.labels,
                z = 0,
                O = b.axisOffset,
                b = b.clipOffset,
                E = [-1, 1, 1, -1][h],
                q, w = 1,
                u = p(M.maxStaggerLines, 5),
                v, y, B, A, Ba;
            a.hasData = j = a.hasVisibleSeries || t(a.min) && t(a.max) && !!e;
            a.showAxis = k = j || p(d.showEmpty, !0);
            a.staggerLines = a.horiz && M.staggerLines;
            if (!a.axisGroup) a.gridGroup = c.g("grid").attr({
                zIndex: d.gridZIndex || 1
            }).add(), a.axisGroup = c.g("axis").attr({
                zIndex: d.zIndex || 2
            }).add(), a.labelGroup = c.g("axis-labels").attr({
                zIndex: M.zIndex || 7
            }).addClass("highcharts-" + a.coll.toLowerCase() +
                "-labels").add();
            if (j || a.isLinked) {
                a.labelAlign = p(M.align || a.autoLabelAlign(M.rotation));
                o(e, function(b) {
                    f[b] ? f[b].addLabel() : f[b] = new La(a, b)
                });
                if (a.horiz && !a.staggerLines && u && !M.rotation) {
                    for (j = a.reversed ? [].concat(e).reverse() : e; w < u;) {
                        v = [];
                        y = !1;
                        for (q = 0; q < j.length; q++) B = j[q], A = (A = f[B].label && f[B].label.getBBox()) ? A.width : 0, Ba = q % w, A && (B = a.translate(B), v[Ba] !== r && B < v[Ba] && (y = !0), v[Ba] = B + A);
                        if (y) w++;
                        else break
                    }
                    if (w > 1) a.staggerLines = w
                }
                o(e, function(b) {
                    if (h === 0 || h === 2 || {
                            1: "left",
                            3: "right"
                        }[h] === a.labelAlign) z =
                        s(f[b].getLabelSize(), z)
                });
                if (a.staggerLines) z *= a.staggerLines, a.labelOffset = z
            } else
                for (q in f) f[q].destroy(), delete f[q];
            if (x && x.text && x.enabled !== !1) {
                if (!a.axisTitle) a.axisTitle = c.text(x.text, 0, 0, x.useHTML).attr({
                    zIndex: 7,
                    rotation: x.rotation || 0,
                    align: x.textAlign || {
                        low: "left",
                        middle: "center",
                        high: "right"
                    }[x.align]
                }).addClass("highcharts-" + this.coll.toLowerCase() + "-title").css(x.style).add(a.axisGroup), a.axisTitle.isNew = !0;
                if (k) l = a.axisTitle.getBBox()[g ? "height" : "width"], n = x.offset, m = t(n) ? 0 : p(x.margin,
                    g ? 5 : 10);
                a.axisTitle[k ? "show" : "hide"]()
            }
            a.offset = E * p(d.offset, O[h]);
            c = h === 2 ? a.tickBaseline : 0;
            g = z + m + (z && E * (g ? p(M.y, a.tickBaseline + 8) : M.x) - c);
            a.axisTitleMargin = p(n, g);
            O[h] = s(O[h], a.axisTitleMargin + l + E * a.offset, g);
            b[i] = s(b[i], ea(d.lineWidth / 2) * 2)
        },
        getLinePath: function(a) {
            var b = this.chart,
                c = this.opposite,
                d = this.offset,
                e = this.horiz,
                f = this.left + (c ? this.width : 0) + d,
                d = b.chartHeight - this.bottom - (c ? this.height : 0) + d;
            c && (a *= -1);
            return b.renderer.crispLine(["M", e ? this.left : f, e ? d : this.top, "L", e ? b.chartWidth - this.right :
                f, e ? d : b.chartHeight - this.bottom
            ], a)
        },
        getTitlePosition: function() {
            var a = this.horiz,
                b = this.left,
                c = this.top,
                d = this.len,
                e = this.options.title,
                f = a ? b : c,
                g = this.opposite,
                h = this.offset,
                i = B(e.style.fontSize || 12),
                d = {
                    low: f + (a ? 0 : d),
                    middle: f + d / 2,
                    high: f + (a ? d : 0)
                }[e.align],
                b = (a ? c + this.height : b) + (a ? 1 : -1) * (g ? -1 : 1) * this.axisTitleMargin + (this.side === 2 ? i : 0);
            return {
                x: a ? d : b + (g ? this.width : 0) + h + (e.x || 0),
                y: a ? b - (g ? this.height : 0) + h : d + (e.y || 0)
            }
        },
        render: function() {
            var a = this,
                b = a.horiz,
                c = a.reversed,
                d = a.chart,
                e = d.renderer,
                f = a.options,
                g = a.isLog,
                h = a.isLinked,
                i = a.tickPositions,
                j, k = a.axisTitle,
                l = a.ticks,
                n = a.minorTicks,
                m = a.alternateBands,
                p = f.stackLabels,
                M = f.alternateGridColor,
                z = a.tickmarkOffset,
                O = f.lineWidth,
                E = d.hasRendered && t(a.oldMin) && !isNaN(a.oldMin),
                q = a.hasData,
                s = a.showAxis,
                w, u = f.labels.overflow,
                v = a.justifyLabels = b && u !== !1,
                y;
            a.labelEdge.length = 0;
            a.justifyToPlot = u === "justify";
            o([l, n, m], function(a) {
                for (var b in a) a[b].isActive = !1
            });
            if (q || h)
                if (a.minorTickInterval && !a.categories && o(a.getMinorTickPositions(), function(b) {
                        n[b] || (n[b] =
                            new La(a, b, "minor"));
                        E && n[b].isNew && n[b].render(null, !0);
                        n[b].render(null, !1, 1)
                    }), i.length && (j = i.slice(), (b && c || !b && !c) && j.reverse(), v && (j = j.slice(1).concat([j[0]])), o(j, function(b, c) {
                        v && (c = c === j.length - 1 ? 0 : c + 1);
                        if (!h || b >= a.min && b <= a.max) l[b] || (l[b] = new La(a, b)), E && l[b].isNew && l[b].render(c, !0, 0.1), l[b].render(c)
                    }), z && a.min === 0 && (l[-1] || (l[-1] = new La(a, -1, null, !0)), l[-1].render(-1))), M && o(i, function(b, c) {
                        if (c % 2 === 0 && b < a.max) m[b] || (m[b] = new K.PlotLineOrBand(a)), w = b + z, y = i[c + 1] !== r ? i[c + 1] + z : a.max, m[b].options = {
                            from: g ? la(w) : w,
                            to: g ? la(y) : y,
                            color: M
                        }, m[b].render(), m[b].isActive = !0
                    }), !a._addedPlotLB) o((f.plotLines || []).concat(f.plotBands || []), function(b) {
                    a.addPlotBandOrLine(b)
                }), a._addedPlotLB = !0;
            o([l, n, m], function(a) {
                var b, c, e = [],
                    f = ha ? ha.duration || 500 : 0,
                    g = function() {
                        for (c = e.length; c--;) a[e[c]] && !a[e[c]].isActive && (a[e[c]].destroy(), delete a[e[c]])
                    };
                for (b in a)
                    if (!a[b].isActive) a[b].render(b, !1, 0), a[b].isActive = !1, e.push(b);
                a === m || !d.hasRendered || !f ? g() : f && setTimeout(g, f)
            });
            if (O) b = a.getLinePath(O), a.axisLine ?
                a.axisLine.animate({
                    d: b
                }) : a.axisLine = e.path(b).attr({
                    stroke: f.lineColor,
                    "stroke-width": O,
                    zIndex: 7
                }).add(a.axisGroup), a.axisLine[s ? "show" : "hide"]();
            if (k && s) k[k.isNew ? "attr" : "animate"](a.getTitlePosition()), k.isNew = !1;
            p && p.enabled && a.renderStackTotals();
            a.isDirty = !1
        },
        redraw: function() {
            this.render();
            o(this.plotLinesAndBands, function(a) {
                a.render()
            });
            o(this.series, function(a) {
                a.isDirty = !0
            })
        },
        destroy: function(a) {
            var b = this,
                c = b.stacks,
                d, e = b.plotLinesAndBands;
            a || Y(b);
            for (d in c) ab(c[d]), c[d] = null;
            o([b.ticks,
                b.minorTicks, b.alternateBands
            ], function(a) {
                ab(a)
            });
            for (a = e.length; a--;) e[a].destroy();
            o("stackTotalGroup,axisLine,axisTitle,axisGroup,cross,gridGroup,labelGroup".split(","), function(a) {
                b[a] && (b[a] = b[a].destroy())
            });
            this.cross && this.cross.destroy()
        },
        drawCrosshair: function(a, b) {
            if (this.crosshair)
                if ((t(b) || !p(this.crosshair.snap, !0)) === !1) this.hideCrosshair();
                else {
                    var c, d = this.crosshair,
                        e = d.animation;
                    p(d.snap, !0) ? t(b) && (c = this.chart.inverted != this.horiz ? b.plotX : this.len - b.plotY) : c = this.horiz ? a.chartX -
                        this.pos : this.len - a.chartY + this.pos;
                    c = this.isRadial ? this.getPlotLinePath(this.isXAxis ? b.x : p(b.stackY, b.y)) : this.getPlotLinePath(null, null, null, null, c);
                    if (c === null) this.hideCrosshair();
                    else if (this.cross) this.cross.attr({
                        visibility: "visible"
                    })[e ? "animate" : "attr"]({
                        d: c
                    }, e);
                    else {
                        e = {
                            "stroke-width": d.width || 1,
                            stroke: d.color || "#C0C0C0",
                            zIndex: d.zIndex || 2
                        };
                        if (d.dashStyle) e.dashstyle = d.dashStyle;
                        this.cross = this.chart.renderer.path(c).attr(e).add()
                    }
                }
        },
        hideCrosshair: function() {
            this.cross && this.cross.hide()
        }
    };
    q(Q.prototype, void 0);
    Q.prototype.getLogTickPositions = function(a, b, c, d) {
        var e = this.options,
            f = this.len,
            g = [];
        if (!d) this._minorAutoInterval = null;
        if (a >= 0.5) a = w(a), g = this.getLinearTickPositions(a, b, c);
        else if (a >= 0.08)
            for (var f = ea(b), h, i, j, k, l, e = a > 0.3 ? [1, 2, 4] : a > 0.15 ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; f < c + 1 && !l; f++) {
                i = e.length;
                for (h = 0; h < i && !l; h++) j = Pa(la(f) * e[h]), j > b && (!d || k <= c) && k !== r && g.push(k), k > c && (l = !0), k = j
            } else if (b = la(b), c = la(c), a = e[d ? "minorTickInterval" : "tickInterval"], a = p(a === "auto" ? null : a, this._minorAutoInterval, (c - b) * (e.tickPixelInterval / (d ? 5 : 1)) / ((d ? f / this.tickPositions.length : f) || 1)), a = pb(a, null, F.pow(10, ea(F.log(a) / F.LN10))), g = Ua(this.getLinearTickPositions(a, b, c), Pa), !d) this._minorAutoInterval = a / 5;
        if (!d) this.tickInterval = a;
        return g
    };
    var Fb = K.Tooltip = function() {
        this.init.apply(this, arguments)
    };
    Fb.prototype = {
        init: function(a, b) {
            var c = b.borderWidth,
                d = b.style,
                e = B(d.padding);
            this.chart = a;
            this.options = b;
            this.crosshairs = [];
            this.now = {
                x: 0,
                y: 0
            };
            this.isHidden = !0;
            this.label = a.renderer.label("", 0, 0, b.shape || "callout",
                null, null, b.useHTML, null, "tooltip").attr({
                padding: e,
                fill: b.backgroundColor,
                "stroke-width": c,
                r: b.borderRadius,
                zIndex: 8
            }).css(d).css({
                padding: 0
            }).add().attr({
                y: -9999
            });
            ga || this.label.shadow(b.shadow);
            this.shared = b.shared
        },
        destroy: function() {
            if (this.label) this.label = this.label.destroy();
            clearTimeout(this.hideTimer);
            clearTimeout(this.tooltipTimeout)
        },
        move: function(a, b, c, d) {
            var e = this,
                f = e.now,
                g = e.options.animation !== !1 && !e.isHidden && (U(a - f.x) > 1 || U(b - f.y) > 1),
                h = e.followPointer || e.len > 1;
            q(f, {
                x: g ? (2 * f.x + a) /
                    3 : a,
                y: g ? (f.y + b) / 2 : b,
                anchorX: h ? r : g ? (2 * f.anchorX + c) / 3 : c,
                anchorY: h ? r : g ? (f.anchorY + d) / 2 : d
            });
            e.label.attr(f);
            if (g) clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function() {
                e && e.move(a, b, c, d)
            }, 32)
        },
        hide: function(a) {
            var b = this,
                c;
            clearTimeout(this.hideTimer);
            if (!this.isHidden) c = this.chart.hoverPoints, this.hideTimer = setTimeout(function() {
                b.label.fadeOut();
                b.isHidden = !0
            }, p(a, this.options.hideDelay, 500)), c && o(c, function(a) {
                a.setState()
            }), this.chart.hoverPoints = null
        },
        getAnchor: function(a, b) {
            var c,
                d = this.chart,
                e = d.inverted,
                f = d.plotTop,
                g = 0,
                h = 0,
                i, a = na(a);
            c = a[0].tooltipPos;
            this.followPointer && b && (b.chartX === r && (b = d.pointer.normalize(b)), c = [b.chartX - d.plotLeft, b.chartY - f]);
            c || (o(a, function(a) {
                i = a.series.yAxis;
                g += a.plotX;
                h += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!e && i ? i.top - f : 0)
            }), g /= a.length, h /= a.length, c = [e ? d.plotWidth - h : g, this.shared && !e && a.length > 1 && b ? b.chartY - f : e ? d.plotHeight - g : h]);
            return Ua(c, w)
        },
        getPosition: function(a, b, c) {
            var d = this.chart,
                e = this.distance,
                f = {},
                g, h = ["y", d.chartHeight,
                    b, c.plotY + d.plotTop
                ],
                i = ["x", d.chartWidth, a, c.plotX + d.plotLeft],
                j = c.ttBelow || d.inverted && !c.negative || !d.inverted && c.negative,
                k = function(a, b, c, d) {
                    var g = c < d - e,
                        b = d + e + c < b,
                        c = d - e - c;
                    d += e;
                    if (j && b) f[a] = d;
                    else if (!j && g) f[a] = c;
                    else if (g) f[a] = c;
                    else if (b) f[a] = d;
                    else return !1
                },
                l = function(a, b, c, d) {
                    if (d < e || d > b - e) return !1;
                    else f[a] = d < c / 2 ? 1 : d > b - c / 2 ? b - c - 2 : d - c / 2
                },
                n = function(a) {
                    var b = h;
                    h = i;
                    i = b;
                    g = a
                },
                m = function() {
                    k.apply(0, h) !== !1 ? l.apply(0, i) === !1 && !g && (n(!0), m()) : g ? f.x = f.y = 0 : (n(!0), m())
                };
            (d.inverted || this.len > 1) && n();
            m();
            return f
        },
        defaultFormatter: function(a) {
            var b = this.points || na(this),
                c = b[0].series,
                d;
            d = [a.tooltipHeaderFormatter(b[0])];
            o(b, function(a) {
                c = a.series;
                d.push(c.tooltipFormatter && c.tooltipFormatter(a) || a.point.tooltipFormatter(c.tooltipOptions.pointFormat))
            });
            d.push(a.options.footerFormat || "");
            return d.join("")
        },
        refresh: function(a, b) {
            var c = this.chart,
                d = this.label,
                e = this.options,
                f, g, h = {},
                i, j = [];
            i = e.formatter || this.defaultFormatter;
            var h = c.hoverPoints,
                k, l = this.shared;
            clearTimeout(this.hideTimer);
            this.followPointer =
                na(a)[0].series.tooltipOptions.followPointer;
            g = this.getAnchor(a, b);
            f = g[0];
            g = g[1];
            l && (!a.series || !a.series.noSharedTooltip) ? (c.hoverPoints = a, h && o(h, function(a) {
                a.setState()
            }), o(a, function(a) {
                a.setState("hover");
                j.push(a.getLabelConfig())
            }), h = {
                x: a[0].category,
                y: a[0].y
            }, h.points = j, this.len = j.length, a = a[0]) : h = a.getLabelConfig();
            i = i.call(h, this);
            h = a.series;
            this.distance = p(h.tooltipOptions.distance, 16);
            i === !1 ? this.hide() : (this.isHidden && (Va(d), d.attr("opacity", 1).show()), d.attr({
                    text: i
                }), k = e.borderColor ||
                a.color || h.color || "#606060", d.attr({
                    stroke: k
                }), this.updatePosition({
                    plotX: f,
                    plotY: g,
                    negative: a.negative,
                    ttBelow: a.ttBelow
                }), this.isHidden = !1);
            C(c, "tooltipRefresh", {
                text: i,
                x: f + c.plotLeft,
                y: g + c.plotTop,
                borderColor: k
            })
        },
        updatePosition: function(a) {
            var b = this.chart,
                c = this.label,
                c = (this.options.positioner || this.getPosition).call(this, c.width, c.height, a);
            this.move(w(c.x), w(c.y), a.plotX + b.plotLeft, a.plotY + b.plotTop)
        },
        tooltipHeaderFormatter: function(a) {
            var b = a.series,
                c = b.tooltipOptions,
                d = c.dateTimeLabelFormats,
                e = c.xDateFormat,
                f = b.xAxis,
                g = f && f.options.type === "datetime" && ka(a.key),
                c = c.headerFormat,
                f = f && f.closestPointRange,
                h;
            if (g && !e) {
                if (f)
                    for (h in Oa) {
                        if (Oa[h] >= f || Oa[h] <= Oa.day && a.key % Oa[h] > 0) {
                            e = d[h];
                            break
                        }
                    } else e = d.day;
                e = e || d.year
            }
            g && e && (c = c.replace("{point.key}", "{point.key:" + e + "}"));
            return Ia(c, {
                point: a,
                series: b
            })
        }
    };
    var ma;
    Ra = y.documentElement.ontouchstart !== r;
    var ya = K.Pointer = function(a, b) {
        this.init(a, b)
    };
    ya.prototype = {
        init: function(a, b) {
            var c = b.chart,
                d = c.events,
                e = ga ? "" : c.zoomType,
                c = a.inverted,
                f;
            this.options =
                b;
            this.chart = a;
            this.zoomX = f = /x/.test(e);
            this.zoomY = e = /y/.test(e);
            this.zoomHor = f && !c || e && c;
            this.zoomVert = e && !c || f && c;
            this.hasZoom = f || e;
            this.runChartClick = d && !!d.click;
            this.pinchDown = [];
            this.lastValidTouch = {};
            if (K.Tooltip && b.tooltip.enabled) a.tooltip = new Fb(a, b.tooltip), this.followTouchMove = b.tooltip.followTouchMove;
            this.setDOMEvents()
        },
        normalize: function(a, b) {
            var c, d, a = a || window.event,
                a = Mb(a);
            if (!a.target) a.target = a.srcElement;
            d = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a;
            if (!b) this.chartPosition =
                b = Lb(this.chart.container);
            d.pageX === r ? (c = s(a.x, a.clientX - b.left), d = a.y) : (c = d.pageX - b.left, d = d.pageY - b.top);
            return q(a, {
                chartX: w(c),
                chartY: w(d)
            })
        },
        getCoordinates: function(a) {
            var b = {
                xAxis: [],
                yAxis: []
            };
            o(this.chart.axes, function(c) {
                b[c.isXAxis ? "xAxis" : "yAxis"].push({
                    axis: c,
                    value: c.toValue(a[c.horiz ? "chartX" : "chartY"])
                })
            });
            return b
        },
        getIndex: function(a) {
            var b = this.chart;
            return b.inverted ? b.plotHeight + b.plotTop - a.chartY : a.chartX - b.plotLeft
        },
        runPointActions: function(a) {
            var b = this.chart,
                c = b.series,
                d = b.tooltip,
                e, f, g = b.hoverPoint,
                h = b.hoverSeries,
                i, j, k = b.chartWidth,
                l = this.getIndex(a);
            if (d && this.options.tooltip.shared && (!h || !h.noSharedTooltip)) {
                f = [];
                i = c.length;
                for (j = 0; j < i; j++)
                    if (c[j].visible && c[j].options.enableMouseTracking !== !1 && !c[j].noSharedTooltip && c[j].singularTooltips !== !0 && c[j].tooltipPoints.length && (e = c[j].tooltipPoints[l]) && e.series) e._dist = U(l - e.clientX), k = R(k, e._dist), f.push(e);
                for (i = f.length; i--;) f[i]._dist > k && f.splice(i, 1);
                if (f.length && f[0].clientX !== this.hoverX) d.refresh(f, a), this.hoverX = f[0].clientX
            }
            c =
                h && h.tooltipOptions.followPointer;
            if (h && h.tracker && !c) {
                if ((e = h.tooltipPoints[l]) && e !== g) e.onMouseOver(a)
            } else d && c && !d.isHidden && (h = d.getAnchor([{}], a), d.updatePosition({
                plotX: h[0],
                plotY: h[1]
            }));
            if (d && !this._onDocumentMouseMove) this._onDocumentMouseMove = function(a) {
                if (V[ma]) V[ma].pointer.onDocumentMouseMove(a)
            }, N(y, "mousemove", this._onDocumentMouseMove);
            o(b.axes, function(b) {
                b.drawCrosshair(a, p(e, g))
            })
        },
        reset: function(a, b) {
            var c = this.chart,
                d = c.hoverSeries,
                e = c.hoverPoint,
                f = c.tooltip,
                g = f && f.shared ? c.hoverPoints :
                e;
            (a = a && f && g) && na(g)[0].plotX === r && (a = !1);
            if (a) f.refresh(g), e && e.setState(e.state, !0);
            else {
                if (e) e.onMouseOut();
                if (d) d.onMouseOut();
                f && f.hide(b);
                if (this._onDocumentMouseMove) Y(y, "mousemove", this._onDocumentMouseMove), this._onDocumentMouseMove = null;
                o(c.axes, function(a) {
                    a.hideCrosshair()
                });
                this.hoverX = null
            }
        },
        scaleGroups: function(a, b) {
            var c = this.chart,
                d;
            o(c.series, function(e) {
                d = a || e.getPlotBox();
                e.xAxis && e.xAxis.zoomEnabled && (e.group.attr(d), e.markerGroup && (e.markerGroup.attr(d), e.markerGroup.clip(b ?
                    c.clipRect : null)), e.dataLabelsGroup && e.dataLabelsGroup.attr(d))
            });
            c.clipRect.attr(b || c.clipBox)
        },
        dragStart: function(a) {
            var b = this.chart;
            b.mouseIsDown = a.type;
            b.cancelClick = !1;
            b.mouseDownX = this.mouseDownX = a.chartX;
            b.mouseDownY = this.mouseDownY = a.chartY
        },
        drag: function(a) {
            var b = this.chart,
                c = b.options.chart,
                d = a.chartX,
                e = a.chartY,
                f = this.zoomHor,
                g = this.zoomVert,
                h = b.plotLeft,
                i = b.plotTop,
                j = b.plotWidth,
                k = b.plotHeight,
                l, n = this.mouseDownX,
                m = this.mouseDownY,
                p = c.panKey && a[c.panKey + "Key"];
            d < h ? d = h : d > h + j && (d = h + j);
            e < i ? e = i : e > i + k && (e = i + k);
            this.hasDragged = Math.sqrt(Math.pow(n - d, 2) + Math.pow(m - e, 2));
            if (this.hasDragged > 10) {
                l = b.isInsidePlot(n - h, m - i);
                if (b.hasCartesianSeries && (this.zoomX || this.zoomY) && l && !p && !this.selectionMarker) this.selectionMarker = b.renderer.rect(h, i, f ? 1 : j, g ? 1 : k, 0).attr({
                    fill: c.selectionMarkerFill || "rgba(69,114,167,0.25)",
                    zIndex: 7
                }).add();
                this.selectionMarker && f && (d -= n, this.selectionMarker.attr({
                    width: U(d),
                    x: (d > 0 ? 0 : d) + n
                }));
                this.selectionMarker && g && (d = e - m, this.selectionMarker.attr({
                    height: U(d),
                    y: (d >
                        0 ? 0 : d) + m
                }));
                l && !this.selectionMarker && c.panning && b.pan(a, c.panning)
            }
        },
        drop: function(a) {
            var b = this.chart,
                c = this.hasPinched;
            if (this.selectionMarker) {
                var d = {
                        xAxis: [],
                        yAxis: [],
                        originalEvent: a.originalEvent || a
                    },
                    e = this.selectionMarker,
                    f = e.attr ? e.attr("x") : e.x,
                    g = e.attr ? e.attr("y") : e.y,
                    h = e.attr ? e.attr("width") : e.width,
                    i = e.attr ? e.attr("height") : e.height,
                    j;
                if (this.hasDragged || c) o(b.axes, function(b) {
                    if (b.zoomEnabled) {
                        var c = b.horiz,
                            e = a.type === "touchend" ? b.minPixelPadding : 0,
                            m = b.toValue((c ? f : g) + e),
                            c = b.toValue((c ?
                                f + h : g + i) - e);
                        !isNaN(m) && !isNaN(c) && (d[b.coll].push({
                            axis: b,
                            min: R(m, c),
                            max: s(m, c)
                        }), j = !0)
                    }
                }), j && C(b, "selection", d, function(a) {
                    b.zoom(q(a, c ? {
                        animation: !1
                    } : null))
                });
                this.selectionMarker = this.selectionMarker.destroy();
                c && this.scaleGroups()
            }
            if (b) D(b.container, {
                cursor: b._cursor
            }), b.cancelClick = this.hasDragged > 10, b.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = []
        },
        onContainerMouseDown: function(a) {
            a = this.normalize(a);
            a.preventDefault && a.preventDefault();
            this.dragStart(a)
        },
        onDocumentMouseUp: function(a) {
            V[ma] &&
                V[ma].pointer.drop(a)
        },
        onDocumentMouseMove: function(a) {
            var b = this.chart,
                c = this.chartPosition,
                d = b.hoverSeries,
                a = this.normalize(a, c);
            c && d && !this.inClass(a.target, "highcharts-tracker") && !b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) && this.reset()
        },
        onContainerMouseLeave: function() {
            var a = V[ma];
            if (a) a.pointer.reset(), a.pointer.chartPosition = null
        },
        onContainerMouseMove: function(a) {
            var b = this.chart;
            ma = b.index;
            a = this.normalize(a);
            a.returnValue = !1;
            b.mouseIsDown === "mousedown" && this.drag(a);
            (this.inClass(a.target,
                "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop)) && !b.openMenu && this.runPointActions(a)
        },
        inClass: function(a, b) {
            for (var c; a;) {
                if (c = G(a, "class"))
                    if (c.indexOf(b) !== -1) return !0;
                    else if (c.indexOf("highcharts-container") !== -1) return !1;
                a = a.parentNode
            }
        },
        onTrackerMouseOut: function(a) {
            var b = this.chart.hoverSeries,
                c = (a = a.relatedTarget || a.toElement) && a.point && a.point.series;
            if (b && !b.options.stickyTracking && !this.inClass(a, "highcharts-tooltip") && c !== b) b.onMouseOut()
        },
        onContainerClick: function(a) {
            var b =
                this.chart,
                c = b.hoverPoint,
                d = b.plotLeft,
                e = b.plotTop,
                a = this.normalize(a);
            a.cancelBubble = !0;
            b.cancelClick || (c && this.inClass(a.target, "highcharts-tracker") ? (C(c.series, "click", q(a, {
                point: c
            })), b.hoverPoint && c.firePointEvent("click", a)) : (q(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - d, a.chartY - e) && C(b, "click", a)))
        },
        setDOMEvents: function() {
            var a = this,
                b = a.chart.container;
            b.onmousedown = function(b) {
                a.onContainerMouseDown(b)
            };
            b.onmousemove = function(b) {
                a.onContainerMouseMove(b)
            };
            b.onclick = function(b) {
                a.onContainerClick(b)
            };
            N(b, "mouseleave", a.onContainerMouseLeave);
            Sa === 1 && N(y, "mouseup", a.onDocumentMouseUp);
            if (Ra) b.ontouchstart = function(b) {
                a.onContainerTouchStart(b)
            }, b.ontouchmove = function(b) {
                a.onContainerTouchMove(b)
            }, Sa === 1 && N(y, "touchend", a.onDocumentTouchEnd)
        },
        destroy: function() {
            var a;
            Y(this.chart.container, "mouseleave", this.onContainerMouseLeave);
            Sa || (Y(y, "mouseup", this.onDocumentMouseUp), Y(y, "touchend", this.onDocumentTouchEnd));
            clearInterval(this.tooltipTimeout);
            for (a in this) this[a] = null
        }
    };
    q(K.Pointer.prototype, {
        pinchTranslate: function(a, b, c, d, e, f) {
            (this.zoomHor || this.pinchHor) && this.pinchTranslateDirection(!0, a, b, c, d, e, f);
            (this.zoomVert || this.pinchVert) && this.pinchTranslateDirection(!1, a, b, c, d, e, f)
        },
        pinchTranslateDirection: function(a, b, c, d, e, f, g, h) {
            var i = this.chart,
                j = a ? "x" : "y",
                k = a ? "X" : "Y",
                l = "chart" + k,
                n = a ? "width" : "height",
                m = i["plot" + (a ? "Left" : "Top")],
                p, o, z = h || 1,
                q = i.inverted,
                E = i.bounds[a ? "h" : "v"],
                r = b.length === 1,
                s = b[0][l],
                t = c[0][l],
                w = !r && b[1][l],
                u = !r && c[1][l],
                v, c = function() {
                    !r && U(s - w) > 20 && (z = h || U(t - u) / U(s -
                        w));
                    o = (m - t) / z + s;
                    p = i["plot" + (a ? "Width" : "Height")] / z
                };
            c();
            b = o;
            b < E.min ? (b = E.min, v = !0) : b + p > E.max && (b = E.max - p, v = !0);
            v ? (t -= 0.8 * (t - g[j][0]), r || (u -= 0.8 * (u - g[j][1])), c()) : g[j] = [t, u];
            q || (f[j] = o - m, f[n] = p);
            f = q ? 1 / z : z;
            e[n] = p;
            e[j] = b;
            d[q ? a ? "scaleY" : "scaleX" : "scale" + k] = z;
            d["translate" + k] = f * m + (t - f * s)
        },
        pinch: function(a) {
            var b = this,
                c = b.chart,
                d = b.pinchDown,
                e = b.followTouchMove,
                f = a.touches,
                g = f.length,
                h = b.lastValidTouch,
                i = b.hasZoom,
                j = b.selectionMarker,
                k = {},
                l = g === 1 && (b.inClass(a.target, "highcharts-tracker") && c.runTrackerClick ||
                    b.runChartClick),
                n = {};
            (i || e) && !l && a.preventDefault();
            Ua(f, function(a) {
                return b.normalize(a)
            });
            if (a.type === "touchstart") o(f, function(a, b) {
                d[b] = {
                    chartX: a.chartX,
                    chartY: a.chartY
                }
            }), h.x = [d[0].chartX, d[1] && d[1].chartX], h.y = [d[0].chartY, d[1] && d[1].chartY], o(c.axes, function(a) {
                if (a.zoomEnabled) {
                    var b = c.bounds[a.horiz ? "h" : "v"],
                        d = a.minPixelPadding,
                        e = a.toPixels(p(a.options.min, a.dataMin)),
                        f = a.toPixels(p(a.options.max, a.dataMax)),
                        g = R(e, f),
                        e = s(e, f);
                    b.min = R(a.pos, g - d);
                    b.max = s(a.pos + a.len, e + d)
                }
            }), b.res = !0;
            else if (d.length) {
                if (!j) b.selectionMarker =
                    j = q({
                        destroy: aa
                    }, c.plotBox);
                b.pinchTranslate(d, f, k, j, n, h);
                b.hasPinched = i;
                b.scaleGroups(k, n);
                if (!i && e && g === 1) this.runPointActions(b.normalize(a));
                else if (b.res) b.res = !1, this.reset(!1, 0)
            }
        },
        onContainerTouchStart: function(a) {
            var b = this.chart;
            ma = b.index;
            a.touches.length === 1 ? (a = this.normalize(a), b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) ? (this.runPointActions(a), this.pinch(a)) : this.reset()) : a.touches.length === 2 && this.pinch(a)
        },
        onContainerTouchMove: function(a) {
            (a.touches.length === 1 || a.touches.length ===
                2) && this.pinch(a)
        },
        onDocumentTouchEnd: function(a) {
            V[ma] && V[ma].pointer.drop(a)
        }
    });
    if (I.PointerEvent || I.MSPointerEvent) {
        var sa = {},
            nb = !!I.PointerEvent,
            Qb = function() {
                var a, b = [];
                b.item = function(a) {
                    return this[a]
                };
                for (a in sa) sa.hasOwnProperty(a) && b.push({
                    pageX: sa[a].pageX,
                    pageY: sa[a].pageY,
                    target: sa[a].target
                });
                return b
            },
            ob = function(a, b, c, d) {
                a = a.originalEvent || a;
                if ((a.pointerType === "touch" || a.pointerType === a.MSPOINTER_TYPE_TOUCH) && V[ma]) d(a), d = V[ma].pointer, d[b]({
                    type: c,
                    target: a.currentTarget,
                    preventDefault: aa,
                    touches: Qb()
                })
            };
        q(ya.prototype, {
            onContainerPointerDown: function(a) {
                ob(a, "onContainerTouchStart", "touchstart", function(a) {
                    sa[a.pointerId] = {
                        pageX: a.pageX,
                        pageY: a.pageY,
                        target: a.currentTarget
                    }
                })
            },
            onContainerPointerMove: function(a) {
                ob(a, "onContainerTouchMove", "touchmove", function(a) {
                    sa[a.pointerId] = {
                        pageX: a.pageX,
                        pageY: a.pageY
                    };
                    if (!sa[a.pointerId].target) sa[a.pointerId].target = a.currentTarget
                })
            },
            onDocumentPointerUp: function(a) {
                ob(a, "onContainerTouchEnd", "touchend", function(a) {
                    delete sa[a.pointerId]
                })
            },
            batchMSEvents: function(a) {
                a(this.chart.container, nb ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                a(this.chart.container, nb ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                a(y, nb ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
            }
        });
        X(ya.prototype, "init", function(a, b, c) {
            a.call(this, b, c);
            (this.hasZoom || this.followTouchMove) && D(b.container, {
                "-ms-touch-action": S,
                "touch-action": S
            })
        });
        X(ya.prototype, "setDOMEvents", function(a) {
            a.apply(this);
            (this.hasZoom || this.followTouchMove) &&
            this.batchMSEvents(N)
        });
        X(ya.prototype, "destroy", function(a) {
            this.batchMSEvents(Y);
            a.call(this)
        })
    }
    var Xa = K.Legend = function(a, b) {
        this.init(a, b)
    };
    Xa.prototype = {
        init: function(a, b) {
            var c = this,
                d = b.itemStyle,
                e = p(b.padding, 8),
                f = b.itemMarginTop || 0;
            this.options = b;
            if (b.enabled) c.itemStyle = d, c.itemHiddenStyle = v(d, b.itemHiddenStyle), c.itemMarginTop = f, c.padding = e, c.initialItemX = e, c.initialItemY = e - 5, c.maxItemWidth = 0, c.chart = a, c.itemHeight = 0, c.lastLineHeight = 0, c.symbolWidth = p(b.symbolWidth, 16), c.pages = [], c.render(),
                N(c.chart, "endResize", function() {
                    c.positionCheckboxes()
                })
        },
        colorizeItem: function(a, b) {
            var c = this.options,
                d = a.legendItem,
                e = a.legendLine,
                f = a.legendSymbol,
                g = this.itemHiddenStyle.color,
                c = b ? c.itemStyle.color : g,
                h = b ? a.legendColor || a.color || "#CCC" : g,
                g = a.options && a.options.marker,
                i = {
                    fill: h
                },
                j;
            d && d.css({
                fill: c,
                color: c
            });
            e && e.attr({
                stroke: h
            });
            if (f) {
                if (g && f.isMarker)
                    for (j in i.stroke = h, g = a.convertAttribs(g), g) d = g[j], d !== r && (i[j] = d);
                f.attr(i)
            }
        },
        positionItem: function(a) {
            var b = this.options,
                c = b.symbolPadding,
                b = !b.rtl,
                d = a._legendItemPos,
                e = d[0],
                d = d[1],
                f = a.checkbox;
            a.legendGroup && a.legendGroup.translate(b ? e : this.legendWidth - e - 2 * c - 4, d);
            if (f) f.x = e, f.y = d
        },
        destroyItem: function(a) {
            var b = a.checkbox;
            o(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function(b) {
                a[b] && (a[b] = a[b].destroy())
            });
            b && Ja(a.checkbox)
        },
        destroy: function() {
            var a = this.group,
                b = this.box;
            if (b) this.box = b.destroy();
            if (a) this.group = a.destroy()
        },
        positionCheckboxes: function(a) {
            var b = this.group.alignAttr,
                c, d = this.clipHeight || this.legendHeight;
            if (b) c =
                b.translateY, o(this.allItems, function(e) {
                    var f = e.checkbox,
                        g;
                    f && (g = c + f.y + (a || 0) + 3, D(f, {
                        left: b.translateX + e.checkboxOffset + f.x - 20 + "px",
                        top: g + "px",
                        display: g > c - 6 && g < c + d - 6 ? "" : S
                    }))
                })
        },
        renderTitle: function() {
            var a = this.padding,
                b = this.options.title,
                c = 0;
            if (b.text) {
                if (!this.title) this.title = this.chart.renderer.label(b.text, a - 3, a - 4, null, null, null, null, null, "legend-title").attr({
                    zIndex: 1
                }).css(b.style).add(this.group);
                a = this.title.getBBox();
                c = a.height;
                this.offsetWidth = a.width;
                this.contentGroup.attr({
                    translateY: c
                })
            }
            this.titleHeight =
                c
        },
        renderItem: function(a) {
            var b = this.chart,
                c = b.renderer,
                d = this.options,
                e = d.layout === "horizontal",
                f = this.symbolWidth,
                g = d.symbolPadding,
                h = this.itemStyle,
                i = this.itemHiddenStyle,
                j = this.padding,
                k = e ? p(d.itemDistance, 20) : 0,
                l = !d.rtl,
                n = d.width,
                m = d.itemMarginBottom || 0,
                o = this.itemMarginTop,
                M = this.initialItemX,
                z = a.legendItem,
                q = a.series && a.series.drawLegendSymbol ? a.series : a,
                E = q.options,
                E = this.createCheckboxForItem && E && E.showCheckbox,
                r = d.useHTML;
            if (!z) {
                a.legendGroup = c.g("legend-item").attr({
                    zIndex: 1
                }).add(this.scrollGroup);
                a.legendItem = z = c.text(d.labelFormat ? Ia(d.labelFormat, a) : d.labelFormatter.call(a), l ? f + g : -g, this.baseline || 0, r).css(v(a.visible ? h : i)).attr({
                    align: l ? "left" : "right",
                    zIndex: 2
                }).add(a.legendGroup);
                if (!this.baseline) this.baseline = c.fontMetrics(h.fontSize, z).f + 3 + o, z.attr("y", this.baseline);
                q.drawLegendSymbol(this, a);
                this.setItemEvents && this.setItemEvents(a, z, r, h, i);
                this.colorizeItem(a, a.visible);
                E && this.createCheckboxForItem(a)
            }
            c = z.getBBox();
            f = a.checkboxOffset = d.itemWidth || a.legendItemWidth || f + g + c.width +
                k + (E ? 20 : 0);
            this.itemHeight = g = w(a.legendItemHeight || c.height);
            if (e && this.itemX - M + f > (n || b.chartWidth - 2 * j - M - d.x)) this.itemX = M, this.itemY += o + this.lastLineHeight + m, this.lastLineHeight = 0;
            this.maxItemWidth = s(this.maxItemWidth, f);
            this.lastItemY = o + this.itemY + m;
            this.lastLineHeight = s(g, this.lastLineHeight);
            a._legendItemPos = [this.itemX, this.itemY];
            e ? this.itemX += f : (this.itemY += o + g + m, this.lastLineHeight = g);
            this.offsetWidth = n || s((e ? this.itemX - M - k : f) + j, this.offsetWidth)
        },
        getAllItems: function() {
            var a = [];
            o(this.chart.series,
                function(b) {
                    var c = b.options;
                    if (p(c.showInLegend, !t(c.linkedTo) ? r : !1, !0)) a = a.concat(b.legendItems || (c.legendType === "point" ? b.data : b))
                });
            return a
        },
        render: function() {
            var a = this,
                b = a.chart,
                c = b.renderer,
                d = a.group,
                e, f, g, h, i = a.box,
                j = a.options,
                k = a.padding,
                l = j.borderWidth,
                n = j.backgroundColor;
            a.itemX = a.initialItemX;
            a.itemY = a.initialItemY;
            a.offsetWidth = 0;
            a.lastItemY = 0;
            if (!d) a.group = d = c.g("legend").attr({
                zIndex: 7
            }).add(), a.contentGroup = c.g().attr({
                zIndex: 1
            }).add(d), a.scrollGroup = c.g().add(a.contentGroup);
            a.renderTitle();
            e = a.getAllItems();
            gb(e, function(a, b) {
                return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0)
            });
            j.reversed && e.reverse();
            a.allItems = e;
            a.display = f = !!e.length;
            o(e, function(b) {
                a.renderItem(b)
            });
            g = j.width || a.offsetWidth;
            h = a.lastItemY + a.lastLineHeight + a.titleHeight;
            h = a.handleOverflow(h);
            if (l || n) {
                g += k;
                h += k;
                if (i) {
                    if (g > 0 && h > 0) i[i.isNew ? "attr" : "animate"](i.crisp({
                        width: g,
                        height: h
                    })), i.isNew = !1
                } else a.box = i = c.rect(0, 0, g, h, j.borderRadius, l || 0).attr({
                    stroke: j.borderColor,
                    "stroke-width": l ||
                        0,
                    fill: n || S
                }).add(d).shadow(j.shadow), i.isNew = !0;
                i[f ? "show" : "hide"]()
            }
            a.legendWidth = g;
            a.legendHeight = h;
            o(e, function(b) {
                a.positionItem(b)
            });
            f && d.align(q({
                width: g,
                height: h
            }, j), !0, "spacingBox");
            b.isResizing || this.positionCheckboxes()
        },
        handleOverflow: function(a) {
            var b = this,
                c = this.chart,
                d = c.renderer,
                e = this.options,
                f = e.y,
                f = c.spacingBox.height + (e.verticalAlign === "top" ? -f : f) - this.padding,
                g = e.maxHeight,
                h, i = this.clipRect,
                j = e.navigation,
                k = p(j.animation, !0),
                l = j.arrowSize || 12,
                n = this.nav,
                m = this.pages,
                x, M = this.allItems;
            e.layout === "horizontal" && (f /= 2);
            g && (f = R(f, g));
            m.length = 0;
            if (a > f && !e.useHTML) {
                this.clipHeight = h = s(f - 20 - this.titleHeight - this.padding, 0);
                this.currentPage = p(this.currentPage, 1);
                this.fullHeight = a;
                o(M, function(a, b) {
                    var c = a._legendItemPos[1],
                        d = w(a.legendItem.getBBox().height),
                        e = m.length;
                    if (!e || c - m[e - 1] > h && (x || c) !== m[e - 1]) m.push(x || c), e++;
                    b === M.length - 1 && c + d - m[e - 1] > h && m.push(c);
                    c !== x && (x = c)
                });
                if (!i) i = b.clipRect = d.clipRect(0, this.padding, 9999, 0), b.contentGroup.clip(i);
                i.attr({
                    height: h
                });
                if (!n) this.nav = n =
                    d.g().attr({
                        zIndex: 1
                    }).add(this.group), this.up = d.symbol("triangle", 0, 0, l, l).on("click", function() {
                        b.scroll(-1, k)
                    }).add(n), this.pager = d.text("", 15, 10).css(j.style).add(n), this.down = d.symbol("triangle-down", 0, 0, l, l).on("click", function() {
                        b.scroll(1, k)
                    }).add(n);
                b.scroll(0);
                a = f
            } else if (n) i.attr({
                height: c.chartHeight
            }), n.hide(), this.scrollGroup.attr({
                translateY: 1
            }), this.clipHeight = 0;
            return a
        },
        scroll: function(a, b) {
            var c = this.pages,
                d = c.length,
                e = this.currentPage + a,
                f = this.clipHeight,
                g = this.options.navigation,
                h = g.activeColor,
                g = g.inactiveColor,
                i = this.pager,
                j = this.padding;
            e > d && (e = d);
            if (e > 0) b !== r && (ha = p(b, this.chart.animation)), this.nav.attr({
                    translateX: j,
                    translateY: f + this.padding + 7 + this.titleHeight,
                    visibility: "visible"
                }), this.up.attr({
                    fill: e === 1 ? g : h
                }).css({
                    cursor: e === 1 ? "default" : "pointer"
                }), i.attr({
                    text: e + "/" + d
                }), this.down.attr({
                    x: 18 + this.pager.getBBox().width,
                    fill: e === d ? g : h
                }).css({
                    cursor: e === d ? "default" : "pointer"
                }), c = -c[e - 1] + this.initialItemY, this.scrollGroup.animate({
                    translateY: c
                }), this.currentPage = e,
                this.positionCheckboxes(c)
        }
    };
    var Ya = K.LegendSymbolMixin = {
        drawRectangle: function(a, b) {
            var c = a.options.symbolHeight || 12;
            b.legendSymbol = this.chart.renderer.rect(0, a.baseline - 5 - c / 2, a.symbolWidth, c, a.options.symbolRadius || 0).attr({
                zIndex: 3
            }).add(b.legendGroup)
        },
        drawLineMarker: function(a) {
            var b = this.options,
                c = b.marker,
                d;
            d = a.symbolWidth;
            var e = this.chart.renderer,
                f = this.legendGroup,
                a = a.baseline - w(e.fontMetrics(a.options.itemStyle.fontSize, this.legendItem).b * 0.3),
                g;
            if (b.lineWidth) {
                g = {
                    "stroke-width": b.lineWidth
                };
                if (b.dashStyle) g.dashstyle = b.dashStyle;
                this.legendLine = e.path(["M", 0, a, "L", d, a]).attr(g).add(f)
            }
            if (c && c.enabled !== !1) b = c.radius, this.legendSymbol = d = e.symbol(this.symbol, d / 2 - b, a - b, 2 * b, 2 * b).add(f), d.isMarker = !0
        }
    };
    (/Trident\/7\.0/.test(wa) || Ma) && X(Xa.prototype, "positionItem", function(a, b) {
        var c = this,
            d = function() {
                b._legendItemPos && a.call(c, b)
            };
        d();
        setTimeout(d)
    });
    pa.prototype = {
        init: function(a, b) {
            var c, d = a.series;
            a.series = null;
            c = v(J, a);
            c.series = a.series = d;
            this.userOptions = a;
            d = c.chart;
            this.margin = this.splashArray("margin",
                d);
            this.spacing = this.splashArray("spacing", d);
            var e = d.events;
            this.bounds = {
                h: {},
                v: {}
            };
            this.callback = b;
            this.isResizing = 0;
            this.options = c;
            this.axes = [];
            this.series = [];
            this.hasCartesianSeries = d.showAxes;
            var f = this,
                g;
            f.index = V.length;
            V.push(f);
            Sa++;
            d.reflow !== !1 && N(f, "load", function() {
                f.initReflow()
            });
            if (e)
                for (g in e) N(f, g, e[g]);
            f.xAxis = [];
            f.yAxis = [];
            f.animation = ga ? !1 : p(d.animation, !0);
            f.pointCount = f.colorCounter = f.symbolCounter = 0;
            f.firstRender()
        },
        initSeries: function(a) {
            var b = this.options.chart;
            (b = u[a.type ||
                b.type || b.defaultSeriesType]) || ja(17, !0);
            b = new b;
            b.init(this, a);
            return b
        },
        isInsidePlot: function(a, b, c) {
            var d = c ? b : a,
                a = c ? a : b;
            return d >= 0 && d <= this.plotWidth && a >= 0 && a <= this.plotHeight
        },
        adjustTickAmounts: function() {
            this.options.chart.alignTicks !== !1 && o(this.axes, function(a) {
                a.adjustTickAmount()
            });
            this.maxTicks = null
        },
        redraw: function(a) {
            var b = this.axes,
                c = this.series,
                d = this.pointer,
                e = this.legend,
                f = this.isDirtyLegend,
                g, h, i = this.hasCartesianSeries,
                j = this.isDirtyBox,
                k = c.length,
                l = k,
                n = this.renderer,
                m = n.isHidden(),
                x = [];
            ha = p(a, this.animation);
            m && this.cloneRenderTo();
            for (this.layOutTitles(); l--;)
                if (a = c[l], a.options.stacking && (g = !0, a.isDirty)) {
                    h = !0;
                    break
                }
            if (h)
                for (l = k; l--;)
                    if (a = c[l], a.options.stacking) a.isDirty = !0;
            o(c, function(a) {
                a.isDirty && a.options.legendType === "point" && (f = !0)
            });
            if (f && e.options.enabled) e.render(), this.isDirtyLegend = !1;
            g && this.getStacks();
            if (i) {
                if (!this.isResizing) this.maxTicks = null, o(b, function(a) {
                    a.setScale()
                });
                this.adjustTickAmounts()
            }
            this.getMargins();
            i && (o(b, function(a) {
                    a.isDirty && (j = !0)
                }),
                o(b, function(a) {
                    if (a.isDirtyExtremes) a.isDirtyExtremes = !1, x.push(function() {
                        C(a, "afterSetExtremes", q(a.eventArgs, a.getExtremes()));
                        delete a.eventArgs
                    });
                    (j || g) && a.redraw()
                }));
            j && this.drawChartBox();
            o(c, function(a) {
                a.isDirty && a.visible && (!a.isCartesian || a.xAxis) && a.redraw()
            });
            d && d.reset(!0);
            n.draw();
            C(this, "redraw");
            m && this.cloneRenderTo(!0);
            o(x, function(a) {
                a.call()
            })
        },
        get: function(a) {
            var b = this.axes,
                c = this.series,
                d, e;
            for (d = 0; d < b.length; d++)
                if (b[d].options.id === a) return b[d];
            for (d = 0; d < c.length; d++)
                if (c[d].options.id ===
                    a) return c[d];
            for (d = 0; d < c.length; d++) {
                e = c[d].points || [];
                for (b = 0; b < e.length; b++)
                    if (e[b].id === a) return e[b]
            }
            return null
        },
        getAxes: function() {
            var a = this,
                b = this.options,
                c = b.xAxis = na(b.xAxis || {}),
                b = b.yAxis = na(b.yAxis || {});
            o(c, function(a, b) {
                a.index = b;
                a.isX = !0
            });
            o(b, function(a, b) {
                a.index = b
            });
            c = c.concat(b);
            o(c, function(b) {
                new Q(a, b)
            });
            a.adjustTickAmounts()
        },
        getSelectedPoints: function() {
            var a = [];
            o(this.series, function(b) {
                a = a.concat(Cb(b.points || [], function(a) {
                    return a.selected
                }))
            });
            return a
        },
        getSelectedSeries: function() {
            return Cb(this.series,
                function(a) {
                    return a.selected
                })
        },
        getStacks: function() {
            var a = this;
            o(a.yAxis, function(a) {
                if (a.stacks && a.hasVisibleSeries) a.oldStacks = a.stacks
            });
            o(a.series, function(b) {
                if (b.options.stacking && (b.visible === !0 || a.options.chart.ignoreHiddenSeries === !1)) b.stackKey = b.type + p(b.options.stack, "")
            })
        },
        setTitle: function(a, b, c) {
            var g;
            var d = this,
                e = d.options,
                f;
            f = e.title = v(e.title, a);
            g = e.subtitle = v(e.subtitle, b), e = g;
            o([
                ["title", a, f],
                ["subtitle", b, e]
            ], function(a) {
                var b = a[0],
                    c = d[b],
                    e = a[1],
                    a = a[2];
                c && e && (d[b] = c = c.destroy());
                a && a.text && !c && (d[b] = d.renderer.text(a.text, 0, 0, a.useHTML).attr({
                    align: a.align,
                    "class": "highcharts-" + b,
                    zIndex: a.zIndex || 4
                }).css(a.style).add())
            });
            d.layOutTitles(c)
        },
        layOutTitles: function(a) {
            var b = 0,
                c = this.title,
                d = this.subtitle,
                e = this.options,
                f = e.title,
                e = e.subtitle,
                g = this.renderer,
                h = this.spacingBox.width - 44;
            if (c && (c.css({
                    width: (f.width || h) + "px"
                }).align(q({
                    y: g.fontMetrics(f.style.fontSize, c).b - 3
                }, f), !1, "spacingBox"), !f.floating && !f.verticalAlign)) b = c.getBBox().height;
            d && (d.css({
                width: (e.width || h) + "px"
            }).align(q({
                y: b +
                    (f.margin - 13) + g.fontMetrics(f.style.fontSize, d).b
            }, e), !1, "spacingBox"), !e.floating && !e.verticalAlign && (b = Ha(b + d.getBBox().height)));
            c = this.titleOffset !== b;
            this.titleOffset = b;
            if (!this.isDirtyBox && c) this.isDirtyBox = c, this.hasRendered && p(a, !0) && this.isDirtyBox && this.redraw()
        },
        getChartSize: function() {
            var a = this.options.chart,
                b = a.width,
                a = a.height,
                c = this.renderToClone || this.renderTo;
            if (!t(b)) this.containerWidth = db(c, "width");
            if (!t(a)) this.containerHeight = db(c, "height");
            this.chartWidth = s(0, b || this.containerWidth ||
                600);
            this.chartHeight = s(0, p(a, this.containerHeight > 19 ? this.containerHeight : 400))
        },
        cloneRenderTo: function(a) {
            var b = this.renderToClone,
                c = this.container;
            a ? b && (this.renderTo.appendChild(c), Ja(b), delete this.renderToClone) : (c && c.parentNode === this.renderTo && this.renderTo.removeChild(c), this.renderToClone = b = this.renderTo.cloneNode(0), D(b, {
                position: "absolute",
                top: "-9999px",
                display: "block"
            }), b.style.setProperty && b.style.setProperty("display", "block", "important"), y.body.appendChild(b), c && b.appendChild(c))
        },
        getContainer: function() {
            var a, b = this.options.chart,
                c, d, e;
            this.renderTo = a = b.renderTo;
            e = "highcharts-" + jb++;
            if (Ca(a)) this.renderTo = a = y.getElementById(a);
            a || ja(13, !0);
            c = B(G(a, "data-highcharts-chart"));
            !isNaN(c) && V[c] && V[c].hasRendered && V[c].destroy();
            G(a, "data-highcharts-chart", this.index);
            a.innerHTML = "";
            !b.skipClone && !a.offsetWidth && this.cloneRenderTo();
            this.getChartSize();
            c = this.chartWidth;
            d = this.chartHeight;
            this.container = a = $(Ga, {
                    className: "highcharts-container" + (b.className ? " " + b.className : ""),
                    id: e
                },
                q({
                    position: "relative",
                    overflow: "hidden",
                    width: c + "px",
                    height: d + "px",
                    textAlign: "left",
                    lineHeight: "normal",
                    zIndex: 0,
                    "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
                }, b.style), this.renderToClone || a);
            this._cursor = a.style.cursor;
            this.renderer = b.forExport ? new ba(a, c, d, b.style, !0) : new Na(a, c, d, b.style);
            ga && this.renderer.create(this, a, c, d)
        },
        getMargins: function() {
            var a = this.spacing,
                b, c = this.legend,
                d = this.margin,
                e = this.options.legend,
                f = p(e.margin, 20),
                g = e.x,
                h = e.y,
                i = e.align,
                j = e.verticalAlign,
                k = this.titleOffset;
            this.resetMargins();
            b = this.axisOffset;
            if (k && !t(d[0])) this.plotTop = s(this.plotTop, k + this.options.title.margin + a[0]);
            if (c.display && !e.floating)
                if (i === "right") {
                    if (!t(d[1])) this.marginRight = s(this.marginRight, c.legendWidth - g + f + a[1])
                } else if (i === "left") {
                if (!t(d[3])) this.plotLeft = s(this.plotLeft, c.legendWidth + g + f + a[3])
            } else if (j === "top") {
                if (!t(d[0])) this.plotTop = s(this.plotTop, c.legendHeight + h + f + a[0])
            } else if (j === "bottom" && !t(d[2])) this.marginBottom = s(this.marginBottom, c.legendHeight - h + f + a[2]);
            this.extraBottomMargin &&
                (this.marginBottom += this.extraBottomMargin);
            this.extraTopMargin && (this.plotTop += this.extraTopMargin);
            this.hasCartesianSeries && o(this.axes, function(a) {
                a.getOffset()
            });
            t(d[3]) || (this.plotLeft += b[3]);
            t(d[0]) || (this.plotTop += b[0]);
            t(d[2]) || (this.marginBottom += b[2]);
            t(d[1]) || (this.marginRight += b[1]);
            this.setChartSize()
        },
        reflow: function(a) {
            var b = this,
                c = b.options.chart,
                d = b.renderTo,
                e = c.width || db(d, "width"),
                f = c.height || db(d, "height"),
                c = a ? a.target : I,
                d = function() {
                    if (b.container) b.setSize(e, f, !1), b.hasUserSize =
                        null
                };
            if (!b.hasUserSize && e && f && (c === I || c === y)) {
                if (e !== b.containerWidth || f !== b.containerHeight) clearTimeout(b.reflowTimeout), a ? b.reflowTimeout = setTimeout(d, 100) : d();
                b.containerWidth = e;
                b.containerHeight = f
            }
        },
        initReflow: function() {
            var a = this,
                b = function(b) {
                    a.reflow(b)
                };
            N(I, "resize", b);
            N(a, "destroy", function() {
                Y(I, "resize", b)
            })
        },
        setSize: function(a, b, c) {
            var d = this,
                e, f, g;
            d.isResizing += 1;
            g = function() {
                d && C(d, "endResize", null, function() {
                    d.isResizing -= 1
                })
            };
            ha = p(c, d.animation);
            d.oldChartHeight = d.chartHeight;
            d.oldChartWidth =
                d.chartWidth;
            if (t(a)) d.chartWidth = e = s(0, w(a)), d.hasUserSize = !!e;
            if (t(b)) d.chartHeight = f = s(0, w(b));
            (ha ? eb : D)(d.container, {
                width: e + "px",
                height: f + "px"
            }, ha);
            d.setChartSize(!0);
            d.renderer.setSize(e, f, c);
            d.maxTicks = null;
            o(d.axes, function(a) {
                a.isDirty = !0;
                a.setScale()
            });
            o(d.series, function(a) {
                a.isDirty = !0
            });
            d.isDirtyLegend = !0;
            d.isDirtyBox = !0;
            d.layOutTitles();
            d.getMargins();
            d.redraw(c);
            d.oldChartHeight = null;
            C(d, "resize");
            ha === !1 ? g() : setTimeout(g, ha && ha.duration || 500)
        },
        setChartSize: function(a) {
            var b = this.inverted,
                c = this.renderer,
                d = this.chartWidth,
                e = this.chartHeight,
                f = this.options.chart,
                g = this.spacing,
                h = this.clipOffset,
                i, j, k, l;
            this.plotLeft = i = w(this.plotLeft);
            this.plotTop = j = w(this.plotTop);
            this.plotWidth = k = s(0, w(d - i - this.marginRight));
            this.plotHeight = l = s(0, w(e - j - this.marginBottom));
            this.plotSizeX = b ? l : k;
            this.plotSizeY = b ? k : l;
            this.plotBorderWidth = f.plotBorderWidth || 0;
            this.spacingBox = c.spacingBox = {
                x: g[3],
                y: g[0],
                width: d - g[3] - g[1],
                height: e - g[0] - g[2]
            };
            this.plotBox = c.plotBox = {
                x: i,
                y: j,
                width: k,
                height: l
            };
            d = 2 * ea(this.plotBorderWidth /
                2);
            b = Ha(s(d, h[3]) / 2);
            c = Ha(s(d, h[0]) / 2);
            this.clipBox = {
                x: b,
                y: c,
                width: ea(this.plotSizeX - s(d, h[1]) / 2 - b),
                height: s(0, ea(this.plotSizeY - s(d, h[2]) / 2 - c))
            };
            a || o(this.axes, function(a) {
                a.setAxisSize();
                a.setAxisTranslation()
            })
        },
        resetMargins: function() {
            var a = this.spacing,
                b = this.margin;
            this.plotTop = p(b[0], a[0]);
            this.marginRight = p(b[1], a[1]);
            this.marginBottom = p(b[2], a[2]);
            this.plotLeft = p(b[3], a[3]);
            this.axisOffset = [0, 0, 0, 0];
            this.clipOffset = [0, 0, 0, 0]
        },
        drawChartBox: function() {
            var a = this.options.chart,
                b = this.renderer,
                c = this.chartWidth,
                d = this.chartHeight,
                e = this.chartBackground,
                f = this.plotBackground,
                g = this.plotBorder,
                h = this.plotBGImage,
                i = a.borderWidth || 0,
                j = a.backgroundColor,
                k = a.plotBackgroundColor,
                l = a.plotBackgroundImage,
                n = a.plotBorderWidth || 0,
                m, p = this.plotLeft,
                o = this.plotTop,
                q = this.plotWidth,
                r = this.plotHeight,
                s = this.plotBox,
                t = this.clipRect,
                w = this.clipBox;
            m = i + (a.shadow ? 8 : 0);
            if (i || j)
                if (e) e.animate(e.crisp({
                    width: c - m,
                    height: d - m
                }));
                else {
                    e = {
                        fill: j || S
                    };
                    if (i) e.stroke = a.borderColor, e["stroke-width"] = i;
                    this.chartBackground =
                        b.rect(m / 2, m / 2, c - m, d - m, a.borderRadius, i).attr(e).addClass("highcharts-background").add().shadow(a.shadow)
                }
            if (k) f ? f.animate(s) : this.plotBackground = b.rect(p, o, q, r, 0).attr({
                fill: k
            }).add().shadow(a.plotShadow);
            if (l) h ? h.animate(s) : this.plotBGImage = b.image(l, p, o, q, r).add();
            t ? t.animate({
                width: w.width,
                height: w.height
            }) : this.clipRect = b.clipRect(w);
            if (n) g ? g.animate(g.crisp({
                x: p,
                y: o,
                width: q,
                height: r,
                strokeWidth: -n
            })) : this.plotBorder = b.rect(p, o, q, r, 0, -n).attr({
                stroke: a.plotBorderColor,
                "stroke-width": n,
                fill: S,
                zIndex: 1
            }).add();
            this.isDirtyBox = !1
        },
        propFromSeries: function() {
            var a = this,
                b = a.options.chart,
                c, d = a.options.series,
                e, f;
            o(["inverted", "angular", "polar"], function(g) {
                c = u[b.type || b.defaultSeriesType];
                f = a[g] || b[g] || c && c.prototype[g];
                for (e = d && d.length; !f && e--;)(c = u[d[e].type]) && c.prototype[g] && (f = !0);
                a[g] = f
            })
        },
        linkSeries: function() {
            var a = this,
                b = a.series;
            o(b, function(a) {
                a.linkedSeries.length = 0
            });
            o(b, function(b) {
                var d = b.options.linkedTo;
                if (Ca(d) && (d = d === ":previous" ? a.series[b.index - 1] : a.get(d))) d.linkedSeries.push(b),
                    b.linkedParent = d
            })
        },
        renderSeries: function() {
            o(this.series, function(a) {
                a.translate();
                a.setTooltipPoints && a.setTooltipPoints();
                a.render()
            })
        },
        renderLabels: function() {
            var a = this,
                b = a.options.labels;
            b.items && o(b.items, function(c) {
                var d = q(b.style, c.style),
                    e = B(d.left) + a.plotLeft,
                    f = B(d.top) + a.plotTop + 12;
                delete d.left;
                delete d.top;
                a.renderer.text(c.html, e, f).attr({
                    zIndex: 2
                }).css(d).add()
            })
        },
        render: function() {
            var a = this.axes,
                b = this.renderer,
                c = this.options;
            this.setTitle();
            this.legend = new Xa(this, c.legend);
            this.getStacks();
            o(a, function(a) {
                a.setScale()
            });
            this.getMargins();
            this.maxTicks = null;
            o(a, function(a) {
                a.setTickPositions(!0);
                a.setMaxTicks()
            });
            this.adjustTickAmounts();
            this.getMargins();
            this.drawChartBox();
            this.hasCartesianSeries && o(a, function(a) {
                a.render()
            });
            if (!this.seriesGroup) this.seriesGroup = b.g("series-group").attr({
                zIndex: 3
            }).add();
            this.renderSeries();
            this.renderLabels();
            this.showCredits(c.credits);
            this.hasRendered = !0
        },
        showCredits: function(a) {
            if (a.enabled && !this.credits) this.credits = this.renderer.text(a.text,
                0, 0).on("click", function() {
                if (a.href) location.href = a.href
            }).attr({
                align: a.position.align,
                zIndex: 8
            }).css(a.style).add().align(a.position)
        },
        destroy: function() {
            var a = this,
                b = a.axes,
                c = a.series,
                d = a.container,
                e, f = d && d.parentNode;
            C(a, "destroy");
            V[a.index] = r;
            Sa--;
            a.renderTo.removeAttribute("data-highcharts-chart");
            Y(a);
            for (e = b.length; e--;) b[e] = b[e].destroy();
            for (e = c.length; e--;) c[e] = c[e].destroy();
            o("title,subtitle,chartBackground,plotBackground,plotBGImage,plotBorder,seriesGroup,clipRect,credits,pointer,scroller,rangeSelector,legend,resetZoomButton,tooltip,renderer".split(","),
                function(b) {
                    var c = a[b];
                    c && c.destroy && (a[b] = c.destroy())
                });
            if (d) d.innerHTML = "", Y(d), f && Ja(d);
            for (e in a) delete a[e]
        },
        isReadyToRender: function() {
            var a = this;
            return !ca && I == I.top && y.readyState !== "complete" || ga && !I.canvg ? (ga ? Eb.push(function() {
                a.firstRender()
            }, a.options.global.canvasToolsURL) : y.attachEvent("onreadystatechange", function() {
                y.detachEvent("onreadystatechange", a.firstRender);
                y.readyState === "complete" && a.firstRender()
            }), !1) : !0
        },
        firstRender: function() {
            var a = this,
                b = a.options,
                c = a.callback;
            if (a.isReadyToRender()) {
                a.getContainer();
                C(a, "init");
                a.resetMargins();
                a.setChartSize();
                a.propFromSeries();
                a.getAxes();
                o(b.series || [], function(b) {
                    a.initSeries(b)
                });
                a.linkSeries();
                C(a, "beforeRender");
                if (K.Pointer) a.pointer = new ya(a, b);
                a.render();
                a.renderer.draw();
                c && c.apply(a, [a]);
                o(a.callbacks, function(b) {
                    b.apply(a, [a])
                });
                a.cloneRenderTo(!0);
                C(a, "load")
            }
        },
        splashArray: function(a, b) {
            var c = b[a],
                c = fa(c) ? c : [c, c, c, c];
            return [p(b[a + "Top"], c[0]), p(b[a + "Right"], c[1]), p(b[a + "Bottom"], c[2]), p(b[a + "Left"], c[3])]
        }
    };
    pa.prototype.callbacks = [];
    var ia = function() {};
    ia.prototype = {
        init: function(a, b, c) {
            this.series = a;
            this.applyOptions(b, c);
            this.pointAttr = {};
            if (a.options.colorByPoint && (b = a.options.colors || a.chart.options.colors, this.color = this.color || b[a.colorCounter++], a.colorCounter === b.length)) a.colorCounter = 0;
            a.chart.pointCount++;
            return this
        },
        applyOptions: function(a, b) {
            var c = this.series,
                d = c.options.pointValKey || c.pointValKey,
                a = ia.prototype.optionsToObject.call(this, a);
            q(this, a);
            this.options = this.options ? q(this.options, a) : a;
            if (d) this.y = this[d];
            if (this.x === r &&
                c) this.x = b === r ? c.autoIncrement() : b;
            return this
        },
        optionsToObject: function(a) {
            var b = {},
                c = this.series,
                d = c.pointArrayMap || ["y"],
                e = d.length,
                f = 0,
                g = 0;
            if (typeof a === "number" || a === null) b[d[0]] = a;
            else if (Da(a)) {
                if (a.length > e) {
                    c = typeof a[0];
                    if (c === "string") b.name = a[0];
                    else if (c === "number") b.x = a[0];
                    f++
                }
                for (; g < e;) b[d[g++]] = a[f++]
            } else if (typeof a === "object") {
                b = a;
                if (a.dataLabels) c._hasPointLabels = !0;
                if (a.marker) c._hasPointMarkers = !0
            }
            return b
        },
        destroy: function() {
            var a = this.series.chart,
                b = a.hoverPoints,
                c;
            a.pointCount--;
            if (b && (this.setState(), ta(b, this), !b.length)) a.hoverPoints = null;
            if (this === a.hoverPoint) this.onMouseOut();
            if (this.graphic || this.dataLabel) Y(this), this.destroyElements();
            this.legendItem && a.legend.destroyItem(this);
            for (c in this) this[c] = null
        },
        destroyElements: function() {
            for (var a = "graphic,dataLabel,dataLabelUpper,group,connector,shadowGroup".split(","), b, c = 6; c--;) b = a[c], this[b] && (this[b] = this[b].destroy())
        },
        getLabelConfig: function() {
            return {
                x: this.category,
                y: this.y,
                key: this.name || this.category,
                series: this.series,
                point: this,
                percentage: this.percentage,
                total: this.total || this.stackTotal
            }
        },
        tooltipFormatter: function(a) {
            var b = this.series,
                c = b.tooltipOptions,
                d = p(c.valueDecimals, ""),
                e = c.valuePrefix || "",
                f = c.valueSuffix || "";
            o(b.pointArrayMap || ["y"], function(b) {
                b = "{point." + b;
                if (e || f) a = a.replace(b + "}", e + b + "}" + f);
                a = a.replace(b + "}", b + ":,." + d + "f}")
            });
            return Ia(a, {
                point: this,
                series: this.series
            })
        },
        firePointEvent: function(a, b, c) {
            var d = this,
                e = this.series.options;
            (e.point.events[a] || d.options && d.options.events && d.options.events[a]) &&
            this.importEvents();
            a === "click" && e.allowPointSelect && (c = function(a) {
                d.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
            });
            C(this, a, b, c)
        }
    };
    var T = function() {};
    T.prototype = {
        isCartesian: !0,
        type: "line",
        pointClass: ia,
        sorted: !0,
        requireSorting: !0,
        pointAttrToOptions: {
            stroke: "lineColor",
            "stroke-width": "lineWidth",
            fill: "fillColor",
            r: "radius"
        },
        axisTypes: ["xAxis", "yAxis"],
        colorCounter: 0,
        parallelArrays: ["x", "y"],
        init: function(a, b) {
            var c = this,
                d, e, f = a.series,
                g = function(a, b) {
                    return p(a.options.index, a._i) - p(b.options.index,
                        b._i)
                };
            c.chart = a;
            c.options = b = c.setOptions(b);
            c.linkedSeries = [];
            c.bindAxes();
            q(c, {
                name: b.name,
                state: "",
                pointAttr: {},
                visible: b.visible !== !1,
                selected: b.selected === !0
            });
            if (ga) b.animation = !1;
            e = b.events;
            for (d in e) N(c, d, e[d]);
            if (e && e.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect) a.runTrackerClick = !0;
            c.getColor();
            c.getSymbol();
            o(c.parallelArrays, function(a) {
                c[a + "Data"] = []
            });
            c.setData(b.data, !1);
            if (c.isCartesian) a.hasCartesianSeries = !0;
            f.push(c);
            c._i = f.length - 1;
            gb(f, g);
            this.yAxis &&
                gb(this.yAxis.series, g);
            o(f, function(a, b) {
                a.index = b;
                a.name = a.name || "Series " + (b + 1)
            })
        },
        bindAxes: function() {
            var a = this,
                b = a.options,
                c = a.chart,
                d;
            o(a.axisTypes || [], function(e) {
                o(c[e], function(c) {
                    d = c.options;
                    if (b[e] === d.index || b[e] !== r && b[e] === d.id || b[e] === r && d.index === 0) c.series.push(a), a[e] = c, c.isDirty = !0
                });
                !a[e] && a.optionalAxis !== e && ja(18, !0)
            })
        },
        updateParallelArrays: function(a, b) {
            var c = a.series,
                d = arguments;
            o(c.parallelArrays, typeof b === "number" ? function(d) {
                var f = d === "y" && c.toYData ? c.toYData(a) : a[d];
                c[d + "Data"][b] = f
            } : function(a) {
                Array.prototype[b].apply(c[a + "Data"], Array.prototype.slice.call(d, 2))
            })
        },
        autoIncrement: function() {
            var a = this.options,
                b = this.xIncrement,
                b = p(b, a.pointStart, 0);
            this.pointInterval = p(this.pointInterval, a.pointInterval, 1);
            this.xIncrement = b + this.pointInterval;
            return b
        },
        getSegments: function() {
            var a = -1,
                b = [],
                c, d = this.points,
                e = d.length;
            if (e)
                if (this.options.connectNulls) {
                    for (c = e; c--;) d[c].y === null && d.splice(c, 1);
                    d.length && (b = [d])
                } else o(d, function(c, g) {
                    c.y === null ? (g > a + 1 && b.push(d.slice(a +
                        1, g)), a = g) : g === e - 1 && b.push(d.slice(a + 1, g + 1))
                });
            this.segments = b
        },
        setOptions: function(a) {
            var b = this.chart,
                c = b.options.plotOptions,
                b = b.userOptions || {},
                d = b.plotOptions || {},
                e = c[this.type];
            this.userOptions = a;
            c = v(e, c.series, a);
            this.tooltipOptions = v(J.tooltip, J.plotOptions[this.type].tooltip, b.tooltip, d.series && d.series.tooltip, d[this.type] && d[this.type].tooltip, a.tooltip);
            e.marker === null && delete c.marker;
            return c
        },
        getCyclic: function(a, b, c) {
            var d = this.userOptions,
                e = "_" + a + "Index",
                f = a + "Counter";
            b || (t(d[e]) ?
                b = d[e] : (d[e] = b = this.chart[f] % c.length, this.chart[f] += 1), b = c[b]);
            this[a] = b
        },
        getColor: function() {
            this.options.colorByPoint || this.getCyclic("color", this.options.color || W[this.type].color, this.chart.options.colors)
        },
        getSymbol: function() {
            var a = this.options.marker;
            this.getCyclic("symbol", a.symbol, this.chart.options.symbols);
            if (/^url/.test(this.symbol)) a.radius = 0
        },
        drawLegendSymbol: Ya.drawLineMarker,
        setData: function(a, b, c, d) {
            var e = this,
                f = e.points,
                g = f && f.length || 0,
                h, i = e.options,
                j = e.chart,
                k = null,
                l = e.xAxis,
                n = l && !!l.categories,
                m = e.tooltipPoints,
                x = i.turboThreshold,
                q = this.xData,
                z = this.yData,
                s = (h = e.pointArrayMap) && h.length,
                a = a || [];
            h = a.length;
            b = p(b, !0);
            if (d !== !1 && h && g === h && !e.cropped && !e.hasGroupedData) o(a, function(a, b) {
                f[b].update(a, !1, null, !1)
            });
            else {
                e.xIncrement = null;
                e.pointRange = n ? 1 : i.pointRange;
                e.colorCounter = 0;
                o(this.parallelArrays, function(a) {
                    e[a + "Data"].length = 0
                });
                if (x && h > x) {
                    for (c = 0; k === null && c < h;) k = a[c], c++;
                    if (ka(k)) {
                        n = p(i.pointStart, 0);
                        i = p(i.pointInterval, 1);
                        for (c = 0; c < h; c++) q[c] = n, z[c] = a[c], n +=
                            i;
                        e.xIncrement = n
                    } else if (Da(k))
                        if (s)
                            for (c = 0; c < h; c++) i = a[c], q[c] = i[0], z[c] = i.slice(1, s + 1);
                        else
                            for (c = 0; c < h; c++) i = a[c], q[c] = i[0], z[c] = i[1];
                    else ja(12)
                } else
                    for (c = 0; c < h; c++)
                        if (a[c] !== r && (i = {
                                series: e
                            }, e.pointClass.prototype.applyOptions.apply(i, [a[c]]), e.updateParallelArrays(i, c), n && i.name)) l.names[i.x] = i.name;
                Ca(z[0]) && ja(14, !0);
                e.data = [];
                e.options.data = a;
                for (c = g; c--;) f[c] && f[c].destroy && f[c].destroy();
                if (m) m.length = 0;
                if (l) l.minRange = l.userMinRange;
                e.isDirty = e.isDirtyData = j.isDirtyBox = !0;
                c = !1
            }
            b && j.redraw(c)
        },
        processData: function(a) {
            var b = this.xData,
                c = this.yData,
                d = b.length,
                e;
            e = 0;
            var f, g, h = this.xAxis,
                i, j = this.options;
            i = j.cropThreshold;
            var k = 0,
                l = this.isCartesian,
                n, m;
            if (l && !this.isDirty && !h.isDirty && !this.yAxis.isDirty && !a) return !1;
            if (h) n = h.getExtremes(), m = n.min, n = n.max;
            if (l && this.sorted && (!i || d > i || this.forceCrop))
                if (b[d - 1] < m || b[0] > n) b = [], c = [];
                else if (b[0] < m || b[d - 1] > n) e = this.cropData(this.xData, this.yData, m, n), b = e.xData, c = e.yData, e = e.start, f = !0, k = b.length;
            for (i = b.length - 1; i >= 0; i--) d = b[i] - b[i - 1], !f && b[i] >
                m && b[i] < n && k++, d > 0 && (g === r || d < g) ? g = d : d < 0 && this.requireSorting && ja(15);
            this.cropped = f;
            this.cropStart = e;
            this.processedXData = b;
            this.processedYData = c;
            this.activePointCount = k;
            if (j.pointRange === null) this.pointRange = g || 1;
            this.closestPointRange = g
        },
        cropData: function(a, b, c, d) {
            var e = a.length,
                f = 0,
                g = e,
                h = p(this.cropShoulder, 1),
                i;
            for (i = 0; i < e; i++)
                if (a[i] >= c) {
                    f = s(0, i - h);
                    break
                }
            for (; i < e; i++)
                if (a[i] > d) {
                    g = i + h;
                    break
                }
            return {
                xData: a.slice(f, g),
                yData: b.slice(f, g),
                start: f,
                end: g
            }
        },
        generatePoints: function() {
            var a = this.options.data,
                b = this.data,
                c, d = this.processedXData,
                e = this.processedYData,
                f = this.pointClass,
                g = d.length,
                h = this.cropStart || 0,
                i, j = this.hasGroupedData,
                k, l = [],
                n;
            if (!b && !j) b = [], b.length = a.length, b = this.data = b;
            for (n = 0; n < g; n++) i = h + n, j ? l[n] = (new f).init(this, [d[n]].concat(na(e[n]))) : (b[i] ? k = b[i] : a[i] !== r && (b[i] = k = (new f).init(this, a[i], d[n])), l[n] = k), l[n].index = i;
            if (b && (g !== (c = b.length) || j))
                for (n = 0; n < c; n++)
                    if (n === h && !j && (n += g), b[n]) b[n].destroyElements(), b[n].plotX = r;
            this.data = b;
            this.points = l
        },
        getExtremes: function(a) {
            var b =
                this.yAxis,
                c = this.processedXData,
                d, e = [],
                f = 0;
            d = this.xAxis.getExtremes();
            var g = d.min,
                h = d.max,
                i, j, k, l, a = a || this.stackedYData || this.processedYData;
            d = a.length;
            for (l = 0; l < d; l++)
                if (j = c[l], k = a[l], i = k !== null && k !== r && (!b.isLog || k.length || k > 0), j = this.getExtremesFromAll || this.cropped || (c[l + 1] || j) >= g && (c[l - 1] || j) <= h, i && j)
                    if (i = k.length)
                        for (; i--;) k[i] !== null && (e[f++] = k[i]);
                    else e[f++] = k;
            this.dataMin = p(void 0, Qa(e));
            this.dataMax = p(void 0, Fa(e))
        },
        translate: function() {
            this.processedXData || this.processData();
            this.generatePoints();
            for (var a = this.options, b = a.stacking, c = this.xAxis, d = c.categories, e = this.yAxis, f = this.points, g = f.length, h = !!this.modifyValue, i = a.pointPlacement, j = i === "between" || ka(i), k = a.threshold, a = 0; a < g; a++) {
                var l = f[a],
                    n = l.x,
                    m = l.y,
                    o = l.low,
                    q = b && e.stacks[(this.negStacks && m < k ? "-" : "") + this.stackKey];
                if (e.isLog && m <= 0) l.y = m = null, ja(10);
                l.plotX = c.translate(n, 0, 0, 0, 1, i, this.type === "flags");
                if (b && this.visible && q && q[n]) q = q[n], m = q.points[this.index + "," + a], o = m[0], m = m[1], o === 0 && (o = p(k, e.min)), e.isLog && o <= 0 && (o = null), l.total =
                    l.stackTotal = q.total, l.percentage = q.total && l.y / q.total * 100, l.stackY = m, q.setOffset(this.pointXOffset || 0, this.barW || 0);
                l.yBottom = t(o) ? e.translate(o, 0, 1, 0, 1) : null;
                h && (m = this.modifyValue(m, l));
                l.plotY = typeof m === "number" && m !== Infinity ? e.translate(m, 0, 1, 0, 1) : r;
                l.clientX = j ? c.translate(n, 0, 0, 0, 1) : l.plotX;
                l.negative = l.y < (k || 0);
                l.category = d && d[l.x] !== r ? d[l.x] : l.x
            }
            this.getSegments()
        },
        animate: function(a) {
            var b = this.chart,
                c = b.renderer,
                d;
            d = this.options.animation;
            var e = this.clipBox || b.clipBox,
                f = b.inverted,
                g;
            if (d &&
                !fa(d)) d = W[this.type].animation;
            g = ["_sharedClip", d.duration, d.easing, e.height].join(",");
            a ? (a = b[g], d = b[g + "m"], a || (b[g] = a = c.clipRect(q(e, {
                width: 0
            })), b[g + "m"] = d = c.clipRect(-99, f ? -b.plotLeft : -b.plotTop, 99, f ? b.chartWidth : b.chartHeight)), this.group.clip(a), this.markerGroup.clip(d), this.sharedClipKey = g) : ((a = b[g]) && a.animate({
                width: b.plotSizeX
            }, d), b[g + "m"] && b[g + "m"].animate({
                width: b.plotSizeX + 99
            }, d), this.animate = null)
        },
        afterAnimate: function() {
            var a = this.chart,
                b = this.sharedClipKey,
                c = this.group,
                d = this.clipBox;
            if (c && this.options.clip !== !1) {
                if (!b || !d) c.clip(d ? a.renderer.clipRect(d) : a.clipRect);
                this.markerGroup.clip()
            }
            C(this, "afterAnimate");
            setTimeout(function() {
                b && a[b] && (d || (a[b] = a[b].destroy()), a[b + "m"] && (a[b + "m"] = a[b + "m"].destroy()))
            }, 100)
        },
        drawPoints: function() {
            var a, b = this.points,
                c = this.chart,
                d, e, f, g, h, i, j, k, l = this.options.marker,
                n = this.pointAttr[""],
                m, o, s, z = this.markerGroup,
                t = p(l.enabled, !this.requireSorting || this.activePointCount < 0.5 * this.xAxis.len / l.radius);
            if (l.enabled !== !1 || this._hasPointMarkers)
                for (f =
                    b.length; f--;)
                    if (g = b[f], d = ea(g.plotX), e = g.plotY, k = g.graphic, m = g.marker || {}, o = !!g.marker, a = t && m.enabled === r || m.enabled, s = c.isInsidePlot(w(d), e, c.inverted), a && e !== r && !isNaN(e) && g.y !== null)
                        if (a = g.pointAttr[g.selected ? "select" : ""] || n, h = a.r, i = p(m.symbol, this.symbol), j = i.indexOf("url") === 0, k) k[s ? "show" : "hide"](!0).animate(q({
                            x: d - h,
                            y: e - h
                        }, k.symbolName ? {
                            width: 2 * h,
                            height: 2 * h
                        } : {}));
                        else {
                            if (s && (h > 0 || j)) g.graphic = c.renderer.symbol(i, d - h, e - h, 2 * h, 2 * h, o ? m : l).attr(a).add(z)
                        } else if (k) g.graphic = k.destroy()
        },
        convertAttribs: function(a,
            b, c, d) {
            var e = this.pointAttrToOptions,
                f, g, h = {},
                a = a || {},
                b = b || {},
                c = c || {},
                d = d || {};
            for (f in e) g = e[f], h[f] = p(a[g], b[f], c[f], d[f]);
            return h
        },
        getAttribs: function() {
            var a = this,
                b = a.options,
                c = W[a.type].marker ? b.marker : b,
                d = c.states,
                e = d.hover,
                f, g = a.color;
            f = {
                stroke: g,
                fill: g
            };
            var h = a.points || [],
                i, j = [],
                k, l = a.pointAttrToOptions;
            k = a.hasPointSpecificOptions;
            var n = b.negativeColor,
                m = c.lineColor,
                p = c.fillColor;
            i = b.turboThreshold;
            var r;
            b.marker ? (e.radius = e.radius || c.radius + e.radiusPlus, e.lineWidth = e.lineWidth || c.lineWidth +
                e.lineWidthPlus) : e.color = e.color || Z(e.color || g).brighten(e.brightness).get();
            j[""] = a.convertAttribs(c, f);
            o(["hover", "select"], function(b) {
                j[b] = a.convertAttribs(d[b], j[""])
            });
            a.pointAttr = j;
            g = h.length;
            if (!i || g < i || k)
                for (; g--;) {
                    i = h[g];
                    if ((c = i.options && i.options.marker || i.options) && c.enabled === !1) c.radius = 0;
                    if (i.negative && n) i.color = i.fillColor = n;
                    k = b.colorByPoint || i.color;
                    if (i.options)
                        for (r in l) t(c[l[r]]) && (k = !0);
                    if (k) {
                        c = c || {};
                        k = [];
                        d = c.states || {};
                        f = d.hover = d.hover || {};
                        if (!b.marker) f.color = f.color || !i.options.color &&
                            e.color || Z(i.color).brighten(f.brightness || e.brightness).get();
                        f = {
                            color: i.color
                        };
                        if (!p) f.fillColor = i.color;
                        if (!m) f.lineColor = i.color;
                        k[""] = a.convertAttribs(q(f, c), j[""]);
                        k.hover = a.convertAttribs(d.hover, j.hover, k[""]);
                        k.select = a.convertAttribs(d.select, j.select, k[""])
                    } else k = j;
                    i.pointAttr = k
                }
        },
        destroy: function() {
            var a = this,
                b = a.chart,
                c = /AppleWebKit\/533/.test(wa),
                d, e, f = a.data || [],
                g, h, i;
            C(a, "destroy");
            Y(a);
            o(a.axisTypes || [], function(b) {
                if (i = a[b]) ta(i.series, a), i.isDirty = i.forceRedraw = !0
            });
            a.legendItem &&
                a.chart.legend.destroyItem(a);
            for (e = f.length; e--;)(g = f[e]) && g.destroy && g.destroy();
            a.points = null;
            clearTimeout(a.animationTimeout);
            o("area,graph,dataLabelsGroup,group,markerGroup,tracker,graphNeg,areaNeg,posClip,negClip".split(","), function(b) {
                a[b] && (d = c && b === "group" ? "hide" : "destroy", a[b][d]())
            });
            if (b.hoverSeries === a) b.hoverSeries = null;
            ta(b.series, a);
            for (h in a) delete a[h]
        },
        getSegmentPath: function(a) {
            var b = this,
                c = [],
                d = b.options.step;
            o(a, function(e, f) {
                var g = e.plotX,
                    h = e.plotY,
                    i;
                b.getPointSpline ? c.push.apply(c,
                    b.getPointSpline(a, e, f)) : (c.push(f ? "L" : "M"), d && f && (i = a[f - 1], d === "right" ? c.push(i.plotX, h) : d === "center" ? c.push((i.plotX + g) / 2, i.plotY, (i.plotX + g) / 2, h) : c.push(g, i.plotY)), c.push(e.plotX, e.plotY))
            });
            return c
        },
        getGraphPath: function() {
            var a = this,
                b = [],
                c, d = [];
            o(a.segments, function(e) {
                c = a.getSegmentPath(e);
                e.length > 1 ? b = b.concat(c) : d.push(e[0])
            });
            a.singlePoints = d;
            return a.graphPath = b
        },
        drawGraph: function() {
            var a = this,
                b = this.options,
                c = [
                    ["graph", b.lineColor || this.color]
                ],
                d = b.lineWidth,
                e = b.dashStyle,
                f = b.linecap !==
                "square",
                g = this.getGraphPath(),
                h = b.negativeColor;
            h && c.push(["graphNeg", h]);
            o(c, function(c, h) {
                var k = c[0],
                    l = a[k];
                if (l) Va(l), l.animate({
                    d: g
                });
                else if (d && g.length) l = {
                    stroke: c[1],
                    "stroke-width": d,
                    fill: S,
                    zIndex: 1
                }, e ? l.dashstyle = e : f && (l["stroke-linecap"] = l["stroke-linejoin"] = "round"), a[k] = a.chart.renderer.path(g).attr(l).add(a.group).shadow(!h && b.shadow)
            })
        },
        clipNeg: function() {
            var a = this.options,
                b = this.chart,
                c = b.renderer,
                d = a.negativeColor || a.negativeFillColor,
                e, f = this.graph,
                g = this.area,
                h = this.posClip,
                i = this.negClip;
            e = b.chartWidth;
            var j = b.chartHeight,
                k = s(e, j),
                l = this.yAxis;
            if (d && (f || g)) {
                d = w(l.toPixels(a.threshold || 0, !0));
                d < 0 && (k -= d);
                a = {
                    x: 0,
                    y: 0,
                    width: k,
                    height: d
                };
                k = {
                    x: 0,
                    y: d,
                    width: k,
                    height: k
                };
                if (b.inverted) a.height = k.y = b.plotWidth - d, c.isVML && (a = {
                    x: b.plotWidth - d - b.plotLeft,
                    y: 0,
                    width: e,
                    height: j
                }, k = {
                    x: d + b.plotLeft - e,
                    y: 0,
                    width: b.plotLeft + d,
                    height: e
                });
                l.reversed ? (b = k, e = a) : (b = a, e = k);
                h ? (h.animate(b), i.animate(e)) : (this.posClip = h = c.clipRect(b), this.negClip = i = c.clipRect(e), f && this.graphNeg && (f.clip(h), this.graphNeg.clip(i)),
                    g && (g.clip(h), this.areaNeg.clip(i)))
            }
        },
        invertGroups: function() {
            function a() {
                var a = {
                    width: b.yAxis.len,
                    height: b.xAxis.len
                };
                o(["group", "markerGroup"], function(c) {
                    b[c] && b[c].attr(a).invert()
                })
            }
            var b = this,
                c = b.chart;
            if (b.xAxis) N(c, "resize", a), N(b, "destroy", function() {
                Y(c, "resize", a)
            }), a(), b.invertGroups = a
        },
        plotGroup: function(a, b, c, d, e) {
            var f = this[a],
                g = !f;
            g && (this[a] = f = this.chart.renderer.g(b).attr({
                visibility: c,
                zIndex: d || 0.1
            }).add(e));
            f[g ? "attr" : "animate"](this.getPlotBox());
            return f
        },
        getPlotBox: function() {
            var a =
                this.chart,
                b = this.xAxis,
                c = this.yAxis;
            if (a.inverted) b = c, c = this.xAxis;
            return {
                translateX: b ? b.left : a.plotLeft,
                translateY: c ? c.top : a.plotTop,
                scaleX: 1,
                scaleY: 1
            }
        },
        render: function() {
            var a = this,
                b = a.chart,
                c, d = a.options,
                e = (c = d.animation) && !!a.animate && b.renderer.isSVG && p(c.duration, 500) || 0,
                f = a.visible ? "visible" : "hidden",
                g = d.zIndex,
                h = a.hasRendered,
                i = b.seriesGroup;
            c = a.plotGroup("group", "series", f, g, i);
            a.markerGroup = a.plotGroup("markerGroup", "markers", f, g, i);
            e && a.animate(!0);
            a.getAttribs();
            c.inverted = a.isCartesian ?
                b.inverted : !1;
            a.drawGraph && (a.drawGraph(), a.clipNeg());
            o(a.points, function(a) {
                a.redraw && a.redraw()
            });
            a.drawDataLabels && a.drawDataLabels();
            a.visible && a.drawPoints();
            a.drawTracker && a.options.enableMouseTracking !== !1 && a.drawTracker();
            b.inverted && a.invertGroups();
            d.clip !== !1 && !a.sharedClipKey && !h && c.clip(b.clipRect);
            e && a.animate();
            if (!h) e ? a.animationTimeout = setTimeout(function() {
                a.afterAnimate()
            }, e) : a.afterAnimate();
            a.isDirty = a.isDirtyData = !1;
            a.hasRendered = !0
        },
        redraw: function() {
            var a = this.chart,
                b = this.isDirtyData,
                c = this.group,
                d = this.xAxis,
                e = this.yAxis;
            c && (a.inverted && c.attr({
                width: a.plotWidth,
                height: a.plotHeight
            }), c.animate({
                translateX: p(d && d.left, a.plotLeft),
                translateY: p(e && e.top, a.plotTop)
            }));
            this.translate();
            this.setTooltipPoints && this.setTooltipPoints(!0);
            this.render();
            b && C(this, "updatedData")
        }
    };
    q(pa.prototype, {
        addSeries: function(a, b, c) {
            var d, e = this;
            a && (b = p(b, !0), C(e, "addSeries", {
                options: a
            }, function() {
                d = e.initSeries(a);
                e.isDirtyLegend = !0;
                e.linkSeries();
                b && e.redraw(c)
            }));
            return d
        },
        addAxis: function(a, b,
            c, d) {
            var e = b ? "xAxis" : "yAxis",
                f = this.options;
            new Q(this, v(a, {
                index: this[e].length,
                isX: b
            }));
            f[e] = na(f[e] || {});
            f[e].push(a);
            p(c, !0) && this.redraw(d)
        },
        showLoading: function(a) {
            var b = this,
                c = b.options,
                d = b.loadingDiv,
                e = c.loading,
                f = function() {
                    d && D(d, {
                        left: b.plotLeft + "px",
                        top: b.plotTop + "px",
                        width: b.plotWidth + "px",
                        height: b.plotHeight + "px"
                    })
                };
            if (!d) b.loadingDiv = d = $(Ga, {
                className: "highcharts-loading"
            }, q(e.style, {
                zIndex: 10,
                display: S
            }), b.container), b.loadingSpan = $("span", null, e.labelStyle, d), N(b, "redraw", f);
            b.loadingSpan.innerHTML =
                a || c.lang.loading;
            if (!b.loadingShown) D(d, {
                opacity: 0,
                display: ""
            }), eb(d, {
                opacity: e.style.opacity
            }, {
                duration: e.showDuration || 0
            }), b.loadingShown = !0;
            f()
        },
        hideLoading: function() {
            var a = this.options,
                b = this.loadingDiv;
            b && eb(b, {
                opacity: 0
            }, {
                duration: a.loading.hideDuration || 100,
                complete: function() {
                    D(b, {
                        display: S
                    })
                }
            });
            this.loadingShown = !1
        }
    });
    q(ia.prototype, {
        update: function(a, b, c, d) {
            function e() {
                f.applyOptions(a);
                if (fa(a) && !Da(a)) f.redraw = function() {
                    if (h) a && a.marker && a.marker.symbol ? f.graphic = h.destroy() : h.attr(f.pointAttr[f.state ||
                        ""]);
                    if (a && a.dataLabels && f.dataLabel) f.dataLabel = f.dataLabel.destroy();
                    f.redraw = null
                };
                i = f.index;
                g.updateParallelArrays(f, i);
                k.data[i] = f.options;
                g.isDirty = g.isDirtyData = !0;
                if (!g.fixedBox && g.hasCartesianSeries) j.isDirtyBox = !0;
                k.legendType === "point" && j.legend.destroyItem(f);
                b && j.redraw(c)
            }
            var f = this,
                g = f.series,
                h = f.graphic,
                i, j = g.chart,
                k = g.options,
                b = p(b, !0);
            d === !1 ? e() : f.firePointEvent("update", {
                options: a
            }, e)
        },
        remove: function(a, b) {
            var c = this,
                d = c.series,
                e = d.points,
                f = d.chart,
                g, h = d.data;
            ha = p(b, f.animation);
            a = p(a, !0);
            c.firePointEvent("remove", null, function() {
                g = Ta(c, h);
                h.length === e.length && e.splice(g, 1);
                h.splice(g, 1);
                d.options.data.splice(g, 1);
                d.updateParallelArrays(c, "splice", g, 1);
                c.destroy();
                d.isDirty = !0;
                d.isDirtyData = !0;
                a && f.redraw()
            })
        }
    });
    q(T.prototype, {
        addPoint: function(a, b, c, d) {
            var e = this.options,
                f = this.data,
                g = this.graph,
                h = this.area,
                i = this.chart,
                j = this.xAxis && this.xAxis.names,
                k = g && g.shift || 0,
                l = e.data,
                n, m = this.xData;
            ha = p(d, i.animation);
            c && o([g, h, this.graphNeg, this.areaNeg], function(a) {
                if (a) a.shift =
                    k + 1
            });
            if (h) h.isArea = !0;
            b = p(b, !0);
            d = {
                series: this
            };
            this.pointClass.prototype.applyOptions.apply(d, [a]);
            g = d.x;
            h = m.length;
            if (this.requireSorting && g < m[h - 1])
                for (n = !0; h && m[h - 1] > g;) h--;
            this.updateParallelArrays(d, "splice", h, 0, 0);
            this.updateParallelArrays(d, h);
            if (j && d.name) j[g] = d.name;
            l.splice(h, 0, a);
            n && (this.data.splice(h, 0, null), this.processData());
            e.legendType === "point" && this.generatePoints();
            c && (f[0] && f[0].remove ? f[0].remove(!1) : (f.shift(), this.updateParallelArrays(d, "shift"), l.shift()));
            this.isDirtyData =
                this.isDirty = !0;
            b && (this.getAttribs(), i.redraw())
        },
        remove: function(a, b) {
            var c = this,
                d = c.chart,
                a = p(a, !0);
            if (!c.isRemoving) c.isRemoving = !0, C(c, "remove", null, function() {
                c.destroy();
                d.isDirtyLegend = d.isDirtyBox = !0;
                d.linkSeries();
                a && d.redraw(b)
            });
            c.isRemoving = !1
        },
        update: function(a, b) {
            var c = this,
                d = this.chart,
                e = this.userOptions,
                f = this.type,
                g = u[f].prototype,
                h = ["group", "markerGroup", "dataLabelsGroup"],
                i;
            o(h, function(a) {
                h[a] = c[a];
                delete c[a]
            });
            a = v(e, {
                    animation: !1,
                    index: this.index,
                    pointStart: this.xData[0]
                }, {
                    data: this.options.data
                },
                a);
            this.remove(!1);
            for (i in g) g.hasOwnProperty(i) && (this[i] = r);
            q(this, u[a.type || f].prototype);
            o(h, function(a) {
                c[a] = h[a]
            });
            this.init(d, a);
            d.linkSeries();
            p(b, !0) && d.redraw(!1)
        }
    });
    q(Q.prototype, {
        update: function(a, b) {
            var c = this.chart,
                a = c.options[this.coll][this.options.index] = v(this.userOptions, a);
            this.destroy(!0);
            this._addedPlotLB = r;
            this.init(c, q(a, {
                events: r
            }));
            c.isDirtyBox = !0;
            p(b, !0) && c.redraw()
        },
        remove: function(a) {
            for (var b = this.chart, c = this.coll, d = this.series, e = d.length; e--;) d[e] && d[e].remove(!1);
            ta(b.axes, this);
            ta(b[c], this);
            b.options[c].splice(this.options.index, 1);
            o(b[c], function(a, b) {
                a.options.index = b
            });
            this.destroy();
            b.isDirtyBox = !0;
            p(a, !0) && b.redraw()
        },
        setTitle: function(a, b) {
            this.update({
                title: a
            }, b)
        },
        setCategories: function(a, b) {
            this.update({
                categories: a
            }, b)
        }
    });
    P = da(T);
    u.line = P;
    W.column = v(ra, {
        borderColor: "#FFFFFF",
        borderRadius: 0,
        groupPadding: 0.2,
        marker: null,
        pointPadding: 0.1,
        minPointLength: 0,
        cropThreshold: 50,
        pointRange: null,
        states: {
            hover: {
                brightness: 0.1,
                shadow: !1,
                halo: !1
            },
            select: {
                color: "#C0C0C0",
                borderColor: "#000000",
                shadow: !1
            }
        },
        dataLabels: {
            align: null,
            verticalAlign: null,
            y: null
        },
        stickyTracking: !1,
        tooltip: {
            distance: 6
        },
        threshold: 0
    });
    P = da(T, {
        type: "column",
        pointAttrToOptions: {
            stroke: "borderColor",
            fill: "color",
            r: "borderRadius"
        },
        cropShoulder: 0,
        trackerGroups: ["group", "dataLabelsGroup"],
        negStacks: !0,
        init: function() {
            T.prototype.init.apply(this, arguments);
            var a = this,
                b = a.chart;
            b.hasRendered && o(b.series, function(b) {
                if (b.type === a.type) b.isDirty = !0
            })
        },
        getColumnMetrics: function() {
            var a = this,
                b = a.options,
                c = a.xAxis,
                d = a.yAxis,
                e = c.reversed,
                f, g = {},
                h, i = 0;
            b.grouping === !1 ? i = 1 : o(a.chart.series, function(b) {
                var c = b.options,
                    e = b.yAxis;
                if (b.type === a.type && b.visible && d.len === e.len && d.pos === e.pos) c.stacking ? (f = b.stackKey, g[f] === r && (g[f] = i++), h = g[f]) : c.grouping !== !1 && (h = i++), b.columnIndex = h
            });
            var c = R(U(c.transA) * (c.ordinalSlope || b.pointRange || c.closestPointRange || c.tickInterval || 1), c.len),
                j = c * b.groupPadding,
                k = (c - 2 * j) / i,
                l = b.pointWidth,
                b = t(l) ? (k - l) / 2 : k * b.pointPadding,
                l = p(l, k - 2 * b);
            return a.columnMetrics = {
                width: l,
                offset: b +
                    (j + ((e ? i - (a.columnIndex || 0) : a.columnIndex) || 0) * k - c / 2) * (e ? -1 : 1)
            }
        },
        translate: function() {
            var a = this,
                b = a.chart,
                c = a.options,
                d = a.borderWidth = p(c.borderWidth, a.activePointCount > 0.5 * a.xAxis.len ? 0 : 1),
                e = a.yAxis,
                f = a.translatedThreshold = e.getThreshold(c.threshold),
                g = p(c.minPointLength, 5),
                h = a.getColumnMetrics(),
                i = h.width,
                j = a.barW = s(i, 1 + 2 * d),
                k = a.pointXOffset = h.offset,
                l = -(d % 2 ? 0.5 : 0),
                n = d % 2 ? 0.5 : 1;
            b.renderer.isVML && b.inverted && (n += 1);
            c.pointPadding && (j = Ha(j));
            T.prototype.translate.apply(a);
            o(a.points, function(c) {
                var d =
                    p(c.yBottom, f),
                    h = R(s(-999 - d, c.plotY), e.len + 999 + d),
                    o = c.plotX + k,
                    q = j,
                    r = R(h, d),
                    t;
                t = s(h, d) - r;
                U(t) < g && g && (t = g, r = w(U(r - f) > g ? d - g : f - (e.translate(c.y, 0, 1, 0, 1) <= f ? g : 0)));
                c.barX = o;
                c.pointWidth = i;
                c.tooltipPos = b.inverted ? [e.len - h, a.xAxis.len - o - q / 2] : [o + q / 2, h + e.pos - b.plotTop];
                q = w(o + q) + l;
                o = w(o) + l;
                q -= o;
                d = U(r) < 0.5;
                t = w(r + t) + n;
                r = w(r) + n;
                t -= r;
                d && (r -= 1, t += 1);
                c.shapeType = "rect";
                c.shapeArgs = {
                    x: o,
                    y: r,
                    width: q,
                    height: t
                }
            })
        },
        getSymbol: aa,
        drawLegendSymbol: Ya.drawRectangle,
        drawGraph: aa,
        drawPoints: function() {
            var a = this,
                b = this.chart,
                c = a.options,
                d = b.renderer,
                e = c.animationLimit || 250,
                f, g;
            o(a.points, function(h) {
                var i = h.plotY,
                    j = h.graphic;
                if (i !== r && !isNaN(i) && h.y !== null) f = h.shapeArgs, i = t(a.borderWidth) ? {
                    "stroke-width": a.borderWidth
                } : {}, g = h.pointAttr[h.selected ? "select" : ""] || a.pointAttr[""], j ? (Va(j), j.attr(i)[b.pointCount < e ? "animate" : "attr"](v(f))) : h.graphic = d[h.shapeType](f).attr(g).attr(i).add(a.group).shadow(c.shadow, null, c.stacking && !c.borderRadius);
                else if (j) h.graphic = j.destroy()
            })
        },
        animate: function(a) {
            var b = this.yAxis,
                c = this.options,
                d = this.chart.inverted,
                e = {};
            if (ca) a ? (e.scaleY = 0.001, a = R(b.pos + b.len, s(b.pos, b.toPixels(c.threshold))), d ? e.translateX = a - b.len : e.translateY = a, this.group.attr(e)) : (e.scaleY = 1, e[d ? "translateX" : "translateY"] = b.pos, this.group.animate(e, this.options.animation), this.animate = null)
        },
        remove: function() {
            var a = this,
                b = a.chart;
            b.hasRendered && o(b.series, function(b) {
                if (b.type === a.type) b.isDirty = !0
            });
            T.prototype.remove.apply(a, arguments)
        }
    });
    u.column = P;
    W.scatter = v(ra, {
        lineWidth: 0,
        tooltip: {
            headerFormat: '<span style="color:{series.color}">●</span> <span style="font-size: 10px;"> {series.name}</span><br/>',
            pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"
        },
        stickyTracking: !1
    });
    ra = da(T, {
        type: "scatter",
        sorted: !1,
        requireSorting: !1,
        noSharedTooltip: !0,
        trackerGroups: ["markerGroup", "dataLabelsGroup"],
        takeOrdinalPosition: !1,
        singularTooltips: !0,
        drawGraph: function() {
            this.options.lineWidth && T.prototype.drawGraph.call(this)
        }
    });
    u.scatter = ra;
    T.prototype.drawDataLabels = function() {
        var a = this,
            b = a.options,
            c = b.cursor,
            d = b.dataLabels,
            e = a.points,
            f, g, h = a.hasRendered || 0,
            i, j;
        if (d.enabled || a._hasPointLabels) a.dlProcessOptions &&
            a.dlProcessOptions(d), j = a.plotGroup("dataLabelsGroup", "data-labels", d.defer ? "hidden" : "visible", d.zIndex || 6), p(d.defer, !0) && (j.attr({
                opacity: +h
            }), h || N(a, "afterAnimate", function() {
                a.visible && j.show();
                j[b.animation ? "animate" : "attr"]({
                    opacity: 1
                }, {
                    duration: 200
                })
            })), g = d, o(e, function(b) {
                var e, h = b.dataLabel,
                    m, o, s = b.connector,
                    w = !0;
                f = b.options && b.options.dataLabels;
                e = p(f && f.enabled, g.enabled);
                if (h && !e) b.dataLabel = h.destroy();
                else if (e) {
                    d = v(g, f);
                    e = d.rotation;
                    m = b.getLabelConfig();
                    i = d.format ? Ia(d.format, m) : d.formatter.call(m,
                        d);
                    d.style.color = p(d.color, d.style.color, a.color, "black");
                    if (h)
                        if (t(i)) h.attr({
                            text: i
                        }), w = !1;
                        else {
                            if (b.dataLabel = h = h.destroy(), s) b.connector = s.destroy()
                        } else if (t(i)) {
                        h = {
                            fill: d.backgroundColor,
                            stroke: d.borderColor,
                            "stroke-width": d.borderWidth,
                            r: d.borderRadius || 0,
                            rotation: e,
                            padding: d.padding,
                            zIndex: 1
                        };
                        for (o in h) h[o] === r && delete h[o];
                        h = b.dataLabel = a.chart.renderer[e ? "text" : "label"](i, 0, -999, null, null, null, d.useHTML).attr(h).css(q(d.style, c && {
                            cursor: c
                        })).add(j).shadow(d.shadow)
                    }
                    h && a.alignDataLabel(b,
                        h, d, null, w)
                }
            })
    };
    T.prototype.alignDataLabel = function(a, b, c, d, e) {
        var f = this.chart,
            g = f.inverted,
            h = p(a.plotX, -999),
            i = p(a.plotY, -999),
            j = b.getBBox();
        if (a = this.visible && (a.series.forceDL || f.isInsidePlot(h, w(i), g) || d && f.isInsidePlot(h, g ? d.x + 1 : d.y + d.height - 1, g))) d = q({
            x: g ? f.plotWidth - i : h,
            y: w(g ? f.plotHeight - h : i),
            width: 0,
            height: 0
        }, d), q(c, {
            width: j.width,
            height: j.height
        }), c.rotation ? b[e ? "attr" : "animate"]({
            x: d.x + c.x + d.width / 2,
            y: d.y + c.y + d.height / 2
        }).attr({
            align: c.align
        }) : (b.align(c, null, d), g = b.alignAttr, p(c.overflow,
            "justify") === "justify" ? this.justifyDataLabel(b, c, g, j, d, e) : p(c.crop, !0) && (a = f.isInsidePlot(g.x, g.y) && f.isInsidePlot(g.x + j.width, g.y + j.height)));
        if (!a) b.attr({
            y: -999
        }), b.placed = !1
    };
    T.prototype.justifyDataLabel = function(a, b, c, d, e, f) {
        var g = this.chart,
            h = b.align,
            i = b.verticalAlign,
            j, k;
        j = c.x;
        if (j < 0) h === "right" ? b.align = "left" : b.x = -j, k = !0;
        j = c.x + d.width;
        if (j > g.plotWidth) h === "left" ? b.align = "right" : b.x = g.plotWidth - j, k = !0;
        j = c.y;
        if (j < 0) i === "bottom" ? b.verticalAlign = "top" : b.y = -j, k = !0;
        j = c.y + d.height;
        if (j > g.plotHeight) i ===
            "top" ? b.verticalAlign = "bottom" : b.y = g.plotHeight - j, k = !0;
        if (k) a.placed = !f, a.align(b, null, e)
    };
    if (u.pie) u.pie.prototype.drawDataLabels = function() {
            var a = this,
                b = a.data,
                c, d = a.chart,
                e = a.options.dataLabels,
                f = p(e.connectorPadding, 10),
                g = p(e.connectorWidth, 1),
                h = d.plotWidth,
                i = d.plotHeight,
                j, k, l = p(e.softConnector, !0),
                n = e.distance,
                m = a.center,
                q = m[2] / 2,
                r = m[1],
                t = n > 0,
                u, v, y, B = [
                    [],
                    []
                ],
                D, C, K, J, A, F = [0, 0, 0, 0],
                N = function(a, b) {
                    return b.y - a.y
                };
            if (a.visible && (e.enabled || a._hasPointLabels)) {
                T.prototype.drawDataLabels.apply(a);
                o(b, function(a) {
                    a.dataLabel && a.visible && B[a.half].push(a)
                });
                for (J = 2; J--;) {
                    var I = [],
                        P = [],
                        G = B[J],
                        L = G.length,
                        H;
                    if (L) {
                        a.sortByAngle(G, J - 0.5);
                        for (A = b = 0; !b && G[A];) b = G[A] && G[A].dataLabel && (G[A].dataLabel.getBBox().height || 21), A++;
                        if (n > 0) {
                            v = R(r + q + n, d.plotHeight);
                            for (A = s(0, r - q - n); A <= v; A += b) I.push(A);
                            v = I.length;
                            if (L > v) {
                                c = [].concat(G);
                                c.sort(N);
                                for (A = L; A--;) c[A].rank = A;
                                for (A = L; A--;) G[A].rank >= v && G.splice(A, 1);
                                L = G.length
                            }
                            for (A = 0; A < L; A++) {
                                c = G[A];
                                y = c.labelPos;
                                c = 9999;
                                var S, Q;
                                for (Q = 0; Q < v; Q++) S = U(I[Q] - y[1]), S < c &&
                                    (c = S, H = Q);
                                if (H < A && I[A] !== null) H = A;
                                else
                                    for (v < L - A + H && I[A] !== null && (H = v - L + A); I[H] === null;) H++;
                                P.push({
                                    i: H,
                                    y: I[H]
                                });
                                I[H] = null
                            }
                            P.sort(N)
                        }
                        for (A = 0; A < L; A++) {
                            c = G[A];
                            y = c.labelPos;
                            u = c.dataLabel;
                            K = c.visible === !1 ? "hidden" : "visible";
                            c = y[1];
                            if (n > 0) {
                                if (v = P.pop(), H = v.i, C = v.y, c > C && I[H + 1] !== null || c < C && I[H - 1] !== null) C = R(s(0, c), d.plotHeight)
                            } else C = c;
                            D = e.justify ? m[0] + (J ? -1 : 1) * (q + n) : a.getX(C === r - q - n || C === r + q + n ? c : C, J);
                            u._attr = {
                                visibility: K,
                                align: y[6]
                            };
                            u._pos = {
                                x: D + e.x + ({
                                    left: f,
                                    right: -f
                                }[y[6]] || 0),
                                y: C + e.y - 10
                            };
                            u.connX = D;
                            u.connY = C;
                            if (this.options.size === null) v = u.width, D - v < f ? F[3] = s(w(v - D + f), F[3]) : D + v > h - f && (F[1] = s(w(D + v - h + f), F[1])), C - b / 2 < 0 ? F[0] = s(w(-C + b / 2), F[0]) : C + b / 2 > i && (F[2] = s(w(C + b / 2 - i), F[2]))
                        }
                    }
                }
                if (Fa(F) === 0 || this.verifyDataLabelOverflow(F)) this.placeDataLabels(), t && g && o(this.points, function(b) {
                    j = b.connector;
                    y = b.labelPos;
                    if ((u = b.dataLabel) && u._pos) K = u._attr.visibility, D = u.connX, C = u.connY, k = l ? ["M", D + (y[6] === "left" ? 5 : -5), C, "C", D, C, 2 * y[2] - y[4], 2 * y[3] - y[5], y[2], y[3], "L", y[4], y[5]] : ["M", D + (y[6] === "left" ? 5 : -5), C, "L", y[2],
                        y[3], "L", y[4], y[5]
                    ], j ? (j.animate({
                        d: k
                    }), j.attr("visibility", K)) : b.connector = j = a.chart.renderer.path(k).attr({
                        "stroke-width": g,
                        stroke: e.connectorColor || b.color || "#606060",
                        visibility: K
                    }).add(a.dataLabelsGroup);
                    else if (j) b.connector = j.destroy()
                })
            }
        }, u.pie.prototype.placeDataLabels = function() {
            o(this.points, function(a) {
                var a = a.dataLabel,
                    b;
                if (a)(b = a._pos) ? (a.attr(a._attr), a[a.moved ? "animate" : "attr"](b), a.moved = !0) : a && a.attr({
                    y: -999
                })
            })
        }, u.pie.prototype.alignDataLabel = aa, u.pie.prototype.verifyDataLabelOverflow =
        function(a) {
            var b = this.center,
                c = this.options,
                d = c.center,
                e = c = c.minSize || 80,
                f;
            d[0] !== null ? e = s(b[2] - s(a[1], a[3]), c) : (e = s(b[2] - a[1] - a[3], c), b[0] += (a[3] - a[1]) / 2);
            d[1] !== null ? e = s(R(e, b[2] - s(a[0], a[2])), c) : (e = s(R(e, b[2] - a[0] - a[2]), c), b[1] += (a[0] - a[2]) / 2);
            e < b[2] ? (b[2] = e, this.translate(b), o(this.points, function(a) {
                if (a.dataLabel) a.dataLabel._pos = null
            }), this.drawDataLabels && this.drawDataLabels()) : f = !0;
            return f
        };
    if (u.column) u.column.prototype.alignDataLabel = function(a, b, c, d, e) {
        var f = this.chart,
            g = f.inverted,
            h = a.dlBox || a.shapeArgs,
            i = a.below || a.plotY > p(this.translatedThreshold, f.plotSizeY),
            j = p(c.inside, !!this.options.stacking);
        if (h && (d = v(h), g && (d = {
                x: f.plotWidth - d.y - d.height,
                y: f.plotHeight - d.x - d.width,
                width: d.height,
                height: d.width
            }), !j)) g ? (d.x += i ? 0 : d.width, d.width = 0) : (d.y += i ? d.height : 0, d.height = 0);
        c.align = p(c.align, !g || j ? "center" : i ? "right" : "left");
        c.verticalAlign = p(c.verticalAlign, g || j ? "middle" : i ? "top" : "bottom");
        T.prototype.alignDataLabel.call(this, a, b, c, d, e)
    };
    X(Q.prototype, "getSeriesExtremes", function(a) {
        var b =
            this.isXAxis,
            c, d, e = [],
            f;
        b && o(this.series, function(a, b) {
            if (a.useMapGeometry) e[b] = a.xData, a.xData = []
        });
        a.call(this);
        if (b && (c = p(this.dataMin, Number.MAX_VALUE), d = p(this.dataMax, Number.MIN_VALUE), o(this.series, function(a, b) {
                if (a.useMapGeometry) c = Math.min(c, p(a.minX, c)), d = Math.max(d, p(a.maxX, c)), a.xData = e[b], f = !0
            }), f)) this.dataMin = c, this.dataMax = d
    });
    X(Q.prototype, "setAxisTranslation", function(a) {
        var b = this.chart,
            c = b.plotWidth / b.plotHeight,
            d = b.xAxis[0];
        a.call(this);
        if (b.options.chart.preserveAspectRatio &&
            this.coll === "yAxis" && d.transA !== r && (this.transA = d.transA = Math.min(this.transA, d.transA), a = c / ((d.max - d.min) / (this.max - this.min)), d = a < 1 ? this : d, a = (d.max - d.min) * d.transA, d.pixelPadding = d.len - a, d.minPixelPadding = d.pixelPadding / 2, a = d.fixTo)) {
            a = a[1] - d.toValue(a[0], !0);
            a *= d.transA;
            if (Math.abs(a) > d.minPixelPadding || d.min === d.dataMin && d.max === d.dataMax) a = 0;
            d.minPixelPadding -= a
        }
    });
    X(Q.prototype, "render", function(a) {
        a.call(this);
        this.fixTo = null
    });
    var Za = K.ColorAxis = function() {
        this.isColorAxis = !0;
        this.init.apply(this,
            arguments)
    };
    q(Za.prototype, Q.prototype);
    q(Za.prototype, {
        defaultColorAxisOptions: {
            lineWidth: 0,
            gridLineWidth: 1,
            tickPixelInterval: 72,
            startOnTick: !0,
            endOnTick: !0,
            offset: 0,
            marker: {
                animation: {
                    duration: 50
                },
                color: "gray",
                width: 0.01
            },
            labels: {
                overflow: "justify"
            },
            minColor: "#EFEFFF",
            maxColor: "#003875",
            tickLength: 5
        },
        init: function(a, b) {
            var c = a.options.legend.layout !== "vertical",
                d;
            d = v(this.defaultColorAxisOptions, {
                side: c ? 2 : 1,
                reversed: !c
            }, b, {
                isX: c,
                opposite: !c,
                showEmpty: !1,
                title: null,
                isColor: !0
            });
            Q.prototype.init.call(this,
                a, d);
            b.dataClasses && this.initDataClasses(b);
            this.initStops(b);
            this.isXAxis = !0;
            this.horiz = c;
            this.zoomEnabled = !1
        },
        tweenColors: function(a, b, c) {
            var d = b.rgba[3] !== 1 || a.rgba[3] !== 1;
            return (d ? "rgba(" : "rgb(") + Math.round(b.rgba[0] + (a.rgba[0] - b.rgba[0]) * (1 - c)) + "," + Math.round(b.rgba[1] + (a.rgba[1] - b.rgba[1]) * (1 - c)) + "," + Math.round(b.rgba[2] + (a.rgba[2] - b.rgba[2]) * (1 - c)) + (d ? "," + (b.rgba[3] + (a.rgba[3] - b.rgba[3]) * (1 - c)) : "") + ")"
        },
        initDataClasses: function(a) {
            var b = this,
                c = this.chart,
                d, e = 0,
                f = this.options,
                g = a.dataClasses.length;
            this.dataClasses = d = [];
            this.legendItems = [];
            o(a.dataClasses, function(a, i) {
                var j, a = v(a);
                d.push(a);
                if (!a.color) f.dataClassColor === "category" ? (j = c.options.colors, a.color = j[e++], e === j.length && (e = 0)) : a.color = b.tweenColors(Z(f.minColor), Z(f.maxColor), g < 2 ? 0.5 : i / (g - 1))
            })
        },
        initStops: function(a) {
            this.stops = a.stops || [
                [0, this.options.minColor],
                [1, this.options.maxColor]
            ];
            o(this.stops, function(a) {
                a.color = Z(a[1])
            })
        },
        setOptions: function(a) {
            Q.prototype.setOptions.call(this, a);
            this.options.crosshair = this.options.marker;
            this.coll = "colorAxis"
        },
        setAxisSize: function() {
            var a = this.legendSymbol,
                b = this.chart,
                c, d, e;
            if (a) this.left = c = a.attr("x"), this.top = d = a.attr("y"), this.width = e = a.attr("width"), this.height = a = a.attr("height"), this.right = b.chartWidth - c - e, this.bottom = b.chartHeight - d - a, this.len = this.horiz ? e : a, this.pos = this.horiz ? c : d
        },
        toColor: function(a, b) {
            var c, d = this.stops,
                e, f = this.dataClasses,
                g, h;
            if (f)
                for (h = f.length; h--;) {
                    if (g = f[h], e = g.from, d = g.to, (e === r || a >= e) && (d === r || a <= d)) {
                        c = g.color;
                        if (b) b.dataClass = h;
                        break
                    }
                } else {
                    this.isLog &&
                        (a = this.val2lin(a));
                    c = 1 - (this.max - a) / (this.max - this.min || 1);
                    for (h = d.length; h--;)
                        if (c > d[h][0]) break;
                    e = d[h] || d[h + 1];
                    d = d[h + 1] || e;
                    c = 1 - (d[0] - c) / (d[0] - e[0] || 1);
                    c = this.tweenColors(e.color, d.color, c)
                }
            return c
        },
        getOffset: function() {
            var a = this.legendGroup,
                b = this.chart.axisOffset[this.side];
            if (a) {
                Q.prototype.getOffset.call(this);
                if (!this.axisGroup.parentGroup) this.axisGroup.add(a), this.gridGroup.add(a), this.labelGroup.add(a), this.added = !0;
                this.chart.axisOffset[this.side] = b
            }
        },
        setLegendColor: function() {
            var a,
                b = this.options;
            a = this.horiz ? [0, 0, 1, 0] : [0, 0, 0, 1];
            this.legendColor = {
                linearGradient: {
                    x1: a[0],
                    y1: a[1],
                    x2: a[2],
                    y2: a[3]
                },
                stops: b.stops || [
                    [0, b.minColor],
                    [1, b.maxColor]
                ]
            }
        },
        drawLegendSymbol: function(a, b) {
            var c = a.padding,
                d = a.options,
                e = this.horiz,
                f = p(d.symbolWidth, e ? 200 : 12),
                g = p(d.symbolHeight, e ? 12 : 200),
                h = p(d.labelPadding, e ? 16 : 30),
                d = p(d.itemDistance, 10);
            this.setLegendColor();
            b.legendSymbol = this.chart.renderer.rect(0, a.baseline - 11, f, g).attr({
                zIndex: 1
            }).add(b.legendGroup);
            b.legendSymbol.getBBox();
            this.legendItemWidth =
                f + c + (e ? d : h);
            this.legendItemHeight = g + c + (e ? h : 0)
        },
        setState: aa,
        visible: !0,
        setVisible: aa,
        getSeriesExtremes: function() {
            var a;
            if (this.series.length) a = this.series[0], this.dataMin = a.valueMin, this.dataMax = a.valueMax
        },
        drawCrosshair: function(a, b) {
            var c = !this.cross,
                d = b && b.plotX,
                e = b && b.plotY,
                f, g = this.pos,
                h = this.len;
            if (b) f = this.toPixels(b.value), f < g ? f = g - 2 : f > g + h && (f = g + h + 2), b.plotX = f, b.plotY = this.len - f, Q.prototype.drawCrosshair.call(this, a, b), b.plotX = d, b.plotY = e, !c && this.cross && this.cross.attr({
                fill: this.crosshair.color
            }).add(this.labelGroup)
        },
        getPlotLinePath: function(a, b, c, d, e) {
            return e ? this.horiz ? ["M", e - 4, this.top - 6, "L", e + 4, this.top - 6, e, this.top, "Z"] : ["M", this.left, e, "L", this.left - 6, e + 6, this.left - 6, e - 6, "Z"] : Q.prototype.getPlotLinePath.call(this, a, b, c, d)
        },
        update: function(a, b) {
            o(this.series, function(a) {
                a.isDirtyData = !0
            });
            Q.prototype.update.call(this, a, b);
            this.legendItem && (this.setLegendColor(), this.chart.legend.colorizeItem(this, !0))
        },
        getDataClassLegendSymbols: function() {
            var a = this,
                b = this.chart,
                c = this.legendItems,
                d = b.options.legend,
                e = d.valueDecimals,
                f = d.valueSuffix || "",
                g;
            c.length || o(this.dataClasses, function(d, i) {
                var j = !0,
                    k = d.from,
                    l = d.to;
                g = "";
                k === r ? g = "< " : l === r && (g = "> ");
                k !== r && (g += oa(k, e) + f);
                k !== r && l !== r && (g += " - ");
                l !== r && (g += oa(l, e) + f);
                c.push(q({
                    chart: b,
                    name: g,
                    options: {},
                    drawLegendSymbol: Ya.drawRectangle,
                    visible: !0,
                    setState: aa,
                    setVisible: function() {
                        j = this.visible = !j;
                        o(a.series, function(a) {
                            o(a.points, function(a) {
                                a.dataClass === i && a.setVisible(j)
                            })
                        });
                        b.legend.colorizeItem(this, j)
                    }
                }, d))
            });
            return c
        },
        name: ""
    });
    o(["fill", "stroke"], function(a) {
        HighchartsAdapter.addAnimSetter(a,
            function(b) {
                b.elem.attr(a, Za.prototype.tweenColors(Z(b.start), Z(b.end), b.pos))
            })
    });
    X(pa.prototype, "getAxes", function(a) {
        var b = this.options.colorAxis;
        a.call(this);
        this.colorAxis = [];
        b && new Za(this, b)
    });
    X(Xa.prototype, "getAllItems", function(a) {
        var b = [],
            c = this.chart.colorAxis[0];
        c && (c.options.dataClasses ? b = b.concat(c.getDataClassLegendSymbols()) : b.push(c), o(c.series, function(a) {
            a.options.showInLegend = !1
        }));
        return b.concat(a.call(this))
    });
    L = {
        pointAttrToOptions: {
            stroke: "borderColor",
            "stroke-width": "borderWidth",
            fill: "color",
            dashstyle: "dashStyle"
        },
        pointArrayMap: ["value"],
        axisTypes: ["xAxis", "yAxis", "colorAxis"],
        optionalAxis: "colorAxis",
        trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
        getSymbol: aa,
        parallelArrays: ["x", "y", "value"],
        colorKey: "value",
        translateColors: function() {
            var a = this,
                b = this.options.nullColor,
                c = this.colorAxis,
                d = this.colorKey;
            o(this.data, function(e) {
                var f = e[d];
                if (f = f === null ? b : c && f !== void 0 ? c.toColor(f, e) : e.color || a.color) e.color = f
            })
        }
    };
    X(ba.prototype, "buildText", function(a, b) {
        var c = b.styles &&
            b.styles.HcTextStroke;
        a.call(this, b);
        c && b.applyTextStroke && b.applyTextStroke(c)
    });
    ba.prototype.Element.prototype.applyTextStroke = function(a) {
        var b = this.element,
            c, d, a = a.split(" ");
        c = b.getElementsByTagName("tspan");
        d = b.firstChild;
        this.ySetter = this.xSetter;
        o([].slice.call(c), function(c, f) {
            var g;
            f === 0 && (c.setAttribute("x", b.getAttribute("x")), (f = b.getAttribute("y")) !== null && c.setAttribute("y", f));
            g = c.cloneNode(1);
            g.setAttribute("stroke", a[1]);
            g.setAttribute("stroke-width", a[0]);
            g.setAttribute("stroke-linejoin",
                "round");
            b.insertBefore(g, d)
        })
    };
    W.map = v(W.scatter, {
        allAreas: !0,
        animation: !1,
        nullColor: "#F8F8F8",
        borderColor: "silver",
        borderWidth: 1,
        marker: null,
        stickyTracking: !1,
        dataLabels: {
            formatter: function() {
                return this.point.value
            },
            verticalAlign: "middle",
            crop: !1,
            overflow: !1,
            padding: 0,
            style: {
                color: "white",
                fontWeight: "bold",
                HcTextStroke: "3px rgba(0,0,0,0.5)"
            }
        },
        turboThreshold: 0,
        tooltip: {
            followPointer: !0,
            pointFormat: "{point.name}: {point.value}<br/>"
        },
        states: {
            normal: {
                animation: !0
            },
            hover: {
                brightness: 0.2,
                halo: null
            }
        }
    });
    var Gb = da(ia, {
        applyOptions: function(a, b) {
            var c = ia.prototype.applyOptions.call(this, a, b),
                d = this.series,
                e = d.joinBy;
            if (d.mapData)
                if (e = c[e[1]] !== void 0 && d.mapMap[c[e[1]]]) {
                    if (d.xyFromShape) c.x = e._midX, c.y = e._midY;
                    q(c, e)
                } else c.value = c.value || null;
            return c
        },
        setVisible: function(a) {
            var b = this,
                c = a ? "show" : "hide";
            o(["graphic", "dataLabel"], function(a) {
                if (b[a]) b[a][c]()
            })
        },
        onMouseOver: function(a) {
            clearTimeout(this.colorInterval);
            this.value !== null && ia.prototype.onMouseOver.call(this, a)
        },
        onMouseOut: function() {
            var a =
                this,
                b = +new Ka,
                c = Z(a.color),
                d = Z(a.pointAttr.hover.fill),
                e = a.series.options.states.normal.animation,
                f = e && (e.duration || 500),
                g;
            if (f && c.rgba.length === 4 && d.rgba.length === 4 && a.state !== "select") g = a.pointAttr[""].fill, delete a.pointAttr[""].fill, clearTimeout(a.colorInterval), a.colorInterval = setInterval(function() {
                var e = (new Ka - b) / f,
                    g = a.graphic;
                e > 1 && (e = 1);
                g && g.attr("fill", Za.prototype.tweenColors.call(0, d, c, e));
                e >= 1 && clearTimeout(a.colorInterval)
            }, 13);
            ia.prototype.onMouseOut.call(a);
            if (g) a.pointAttr[""].fill =
                g
        },
        zoomTo: function() {
            var a = this.series;
            a.xAxis.setExtremes(this._minX, this._maxX, !1);
            a.yAxis.setExtremes(this._minY, this._maxY, !1);
            a.chart.redraw()
        }
    });
    u.map = da(u.scatter, v(L, {
        type: "map",
        pointClass: Gb,
        supportsDrilldown: !0,
        getExtremesFromAll: !0,
        useMapGeometry: !0,
        forceDL: !0,
        getBox: function(a) {
            var b = Number.MAX_VALUE,
                c = -b,
                d = b,
                e = -b,
                f = b,
                g = b,
                h = this.xAxis,
                i = this.yAxis,
                j;
            o(a || [], function(a) {
                if (a.path) {
                    if (typeof a.path === "string") a.path = K.splitPath(a.path);
                    var h = a.path || [],
                        i = h.length,
                        m = !1,
                        o = -b,
                        q = b,
                        r = -b,
                        s = b,
                        t = a.properties;
                    if (!a._foundBox) {
                        for (; i--;) typeof h[i] === "number" && !isNaN(h[i]) && (m ? (o = Math.max(o, h[i]), q = Math.min(q, h[i])) : (r = Math.max(r, h[i]), s = Math.min(s, h[i])), m = !m);
                        a._midX = q + (o - q) * (a.middleX || t && t["hc-middle-x"] || 0.5);
                        a._midY = s + (r - s) * (a.middleY || t && t["hc-middle-y"] || 0.5);
                        a._maxX = o;
                        a._minX = q;
                        a._maxY = r;
                        a._minY = s;
                        a.labelrank = p(a.labelrank, (o - q) * (r - s));
                        a._foundBox = !0
                    }
                    c = Math.max(c, a._maxX);
                    d = Math.min(d, a._minX);
                    e = Math.max(e, a._maxY);
                    f = Math.min(f, a._minY);
                    g = Math.min(a._maxX - a._minX, a._maxY - a._minY,
                        g);
                    j = !0
                }
            });
            if (j) {
                this.minY = Math.min(f, p(this.minY, b));
                this.maxY = Math.max(e, p(this.maxY, -b));
                this.minX = Math.min(d, p(this.minX, b));
                this.maxX = Math.max(c, p(this.maxX, -b));
                if (h && h.options.minRange === void 0) h.minRange = Math.min(5 * g, (this.maxX - this.minX) / 5, h.minRange || b);
                if (i && i.options.minRange === void 0) i.minRange = Math.min(5 * g, (this.maxY - this.minY) / 5, i.minRange || b)
            }
        },
        getExtremes: function() {
            T.prototype.getExtremes.call(this, this.valueData);
            this.chart.hasRendered && this.isDirtyData && this.getBox(this.options.data);
            this.valueMin = this.dataMin;
            this.valueMax = this.dataMax;
            this.dataMin = this.minY;
            this.dataMax = this.maxY
        },
        translatePath: function(a) {
            var b = !1,
                c = this.xAxis,
                d = this.yAxis,
                e = c.min,
                f = c.transA,
                c = c.minPixelPadding,
                g = d.min,
                h = d.transA,
                d = d.minPixelPadding,
                i, j = [];
            if (a)
                for (i = a.length; i--;) typeof a[i] === "number" ? (j[i] = b ? (a[i] - e) * f + c : (a[i] - g) * h + d, b = !b) : j[i] = a[i];
            return j
        },
        setData: function(a, b) {
            var c = this.options,
                d = c.mapData,
                e = c.joinBy,
                f = e === null,
                g = [],
                h, i, j;
            f && (e = "_i");
            e = this.joinBy = K.splat(e);
            e[1] || (e[1] = e[0]);
            a && o(a,
                function(b, c) {
                    typeof b === "number" && (a[c] = {
                        value: b
                    });
                    if (f) a[c]._i = c
                });
            this.getBox(a);
            if (d) {
                d.type === "FeatureCollection" && (d = K.geojson(d, this.type, this));
                this.getBox(d);
                this.mapData = d;
                this.mapMap = {};
                for (j = 0; j < d.length; j++) h = d[j], i = h.properties, h._i = j, e[0] && i && i[e[0]] && (h[e[0]] = i[e[0]]), this.mapMap[h[e[0]]] = h;
                c.allAreas && (a = a || [], e[1] && o(a, function(a) {
                    g.push(a[e[1]])
                }), g = "|" + g.join("|") + "|", o(d, function(b) {
                    (!e[0] || g.indexOf("|" + b[e[0]] + "|") === -1) && a.push(v(b, {
                        value: null
                    }))
                }))
            }
            T.prototype.setData.call(this,
                a, b)
        },
        drawGraph: aa,
        drawDataLabels: aa,
        doFullTranslate: function() {
            return this.isDirtyData || this.chart.renderer.isVML || !this.baseTrans
        },
        translate: function() {
            var a = this,
                b = a.xAxis,
                c = a.yAxis,
                d = a.doFullTranslate();
            a.generatePoints();
            o(a.data, function(e) {
                e.plotX = b.toPixels(e._midX, !0);
                e.plotY = c.toPixels(e._midY, !0);
                if (d) e.shapeType = "path", e.shapeArgs = {
                    d: a.translatePath(e.path),
                    "vector-effect": "non-scaling-stroke"
                }
            });
            a.translateColors()
        },
        drawPoints: function() {
            var a = this.xAxis,
                b = this.yAxis,
                c = this.group,
                d = this.chart,
                e = d.renderer,
                f = this.baseTrans;
            if (!this.transformGroup) this.transformGroup = e.g().attr({
                scaleX: 1,
                scaleY: 1
            }).add(c);
            this.doFullTranslate() ? (d.hasRendered && this.pointAttrToOptions.fill === "color" && o(this.points, function(a) {
                a.graphic && a.graphic.attr("fill", a.color)
            }), this.group = this.transformGroup, u.column.prototype.drawPoints.apply(this), this.group = c, o(this.points, function(a) {
                a.graphic && (a.name && a.graphic.addClass("highcharts-name-" + a.name.replace(" ", "-").toLowerCase()), a.properties && a.properties["hc-key"] &&
                    a.graphic.addClass("highcharts-key-" + a.properties["hc-key"].toLowerCase()))
            }), this.baseTrans = {
                originX: a.min - a.minPixelPadding / a.transA,
                originY: b.min - b.minPixelPadding / b.transA + (b.reversed ? 0 : b.len / b.transA),
                transAX: a.transA,
                transAY: b.transA
            }) : (c = a.transA / f.transAX, d = b.transA / f.transAY, c > 0.99 && c < 1.01 && d > 0.99 && d < 1.01 ? (b = a = 0, d = c = 1) : (a = a.toPixels(f.originX, !0), b = b.toPixels(f.originY, !0)), this.transformGroup.animate({
                translateX: a,
                translateY: b,
                scaleX: c,
                scaleY: d
            }));
            this.drawMapDataLabels()
        },
        drawMapDataLabels: function() {
            T.prototype.drawDataLabels.call(this);
            this.dataLabelsGroup && this.dataLabelsGroup.clip(this.chart.clipRect);
            this.hideOverlappingDataLabels()
        },
        hideOverlappingDataLabels: function() {
            var a = this.points,
                b = a.length,
                c, d, e, f;
            o(a, function(a, b) {
                if (b = a.dataLabel) b.oldOpacity = b.opacity, b.newOpacity = 1
            });
            for (c = 0; c < b - 1; ++c) {
                e = a[c].dataLabel;
                for (d = c + 1; d < b; ++d)
                    if (f = a[d].dataLabel, e && f && e.newOpacity !== 0 && f.newOpacity !== 0 && !(f.alignAttr.x > e.alignAttr.x + e.width || f.alignAttr.x + f.width < e.alignAttr.x || f.alignAttr.y > e.alignAttr.y + e.height || f.alignAttr.y + f.height <
                            e.alignAttr.y))(a[c].labelrank < a[d].labelrank ? e : f).newOpacity = 0
            }
            o(a, function(a, b) {
                if (b = a.dataLabel) {
                    if (b.oldOpacity !== b.newOpacity) b[b.isOld ? "animate" : "attr"](q({
                        opacity: b.newOpacity
                    }, b.alignAttr));
                    b.isOld = !0
                }
            })
        },
        render: function() {
            var a = this,
                b = T.prototype.render;
            a.chart.renderer.isVML && a.data.length > 3E3 ? setTimeout(function() {
                b.call(a)
            }) : b.call(a)
        },
        animate: function(a) {
            var b = this.options.animation,
                c = this.group,
                d = this.xAxis,
                e = this.yAxis,
                f = d.pos,
                g = e.pos;
            if (this.chart.renderer.isSVG) b === !0 && (b = {
                    duration: 1E3
                }),
                a ? c.attr({
                    translateX: f + d.len / 2,
                    translateY: g + e.len / 2,
                    scaleX: 0.001,
                    scaleY: 0.001
                }) : (c.animate({
                    translateX: f,
                    translateY: g,
                    scaleX: 1,
                    scaleY: 1
                }, b), this.animate = null)
        },
        animateDrilldown: function(a) {
            var b = this.chart.plotBox,
                c = this.chart.drilldownLevels[this.chart.drilldownLevels.length - 1],
                d = c.bBox,
                e = this.chart.options.drilldown.animation;
            if (!a) a = Math.min(d.width / b.width, d.height / b.height), c.shapeArgs = {
                scaleX: a,
                scaleY: a,
                translateX: d.x,
                translateY: d.y
            }, o(this.points, function(a) {
                a.graphic.attr(c.shapeArgs).animate({
                    scaleX: 1,
                    scaleY: 1,
                    translateX: 0,
                    translateY: 0
                }, e)
            }), this.animate = null
        },
        drawLegendSymbol: Ya.drawRectangle,
        animateDrillupFrom: function(a) {
            u.column.prototype.animateDrillupFrom.call(this, a)
        },
        animateDrillupTo: function(a) {
            u.column.prototype.animateDrillupTo.call(this, a)
        }
    }));
    q(pa.prototype, {
        renderMapNavigation: function() {
            var a = this,
                b = this.options.mapNavigation,
                c = b.buttons,
                d, e, f, g, h = function() {
                    this.handler.call(a)
                };
            if (p(b.enableButtons, b.enabled) && !a.renderer.forExport)
                for (d in c)
                    if (c.hasOwnProperty(d)) f = v(b.buttonOptions,
                        c[d]), e = f.theme, g = e.states, e = a.renderer.button(f.text, 0, 0, h, e, g && g.hover, g && g.select, 0, d === "zoomIn" ? "topbutton" : "bottombutton").attr({
                        width: f.width,
                        height: f.height,
                        title: a.options.lang[d],
                        zIndex: 5
                    }).css(f.style).add(), e.handler = f.onclick, e.align(q(f, {
                        width: e.width,
                        height: 2 * e.height
                    }), null, f.alignTo)
        },
        fitToBox: function(a, b) {
            o([
                ["x", "width"],
                ["y", "height"]
            ], function(c) {
                var d = c[0],
                    c = c[1];
                a[d] + a[c] > b[d] + b[c] && (a[c] > b[c] ? (a[c] = b[c], a[d] = b[d]) : a[d] = b[d] + b[c] - a[c]);
                a[c] > b[c] && (a[c] = b[c]);
                a[d] < b[d] && (a[d] =
                    b[d])
            });
            return a
        },
        mapZoom: function(a, b, c, d, e) {
            var f = this.xAxis[0],
                g = f.max - f.min,
                h = p(b, f.min + g / 2),
                i = g * a,
                g = this.yAxis[0],
                j = g.max - g.min,
                k = p(c, g.min + j / 2);
            j *= a;
            h = this.fitToBox({
                x: h - i * (d ? (d - f.pos) / f.len : 0.5),
                y: k - j * (e ? (e - g.pos) / g.len : 0.5),
                width: i,
                height: j
            }, {
                x: f.dataMin,
                y: g.dataMin,
                width: f.dataMax - f.dataMin,
                height: g.dataMax - g.dataMin
            });
            if (d) f.fixTo = [d - f.pos, b];
            if (e) g.fixTo = [e - g.pos, c];
            a !== void 0 ? (f.setExtremes(h.x, h.x + h.width, !1), g.setExtremes(h.y, h.y + h.height, !1)) : (f.setExtremes(void 0, void 0, !1), g.setExtremes(void 0,
                void 0, !1));
            this.redraw()
        }
    });
    X(pa.prototype, "render", function(a) {
        var b = this,
            c = b.options.mapNavigation;
        b.renderMapNavigation();
        a.call(b);
        (p(c.enableDoubleClickZoom, c.enabled) || c.enableDoubleClickZoomTo) && N(b.container, "dblclick", function(a) {
            b.pointer.onContainerDblClick(a)
        });
        p(c.enableMouseWheelZoom, c.enabled) && N(b.container, document.onmousewheel === void 0 ? "DOMMouseScroll" : "mousewheel", function(a) {
            b.pointer.onContainerMouseWheel(a);
            return !1
        })
    });
    q(ya.prototype, {
        onContainerDblClick: function(a) {
            var b =
                this.chart,
                a = this.normalize(a);
            b.options.mapNavigation.enableDoubleClickZoomTo ? b.pointer.inClass(a.target, "highcharts-tracker") && b.hoverPoint.zoomTo() : b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) && b.mapZoom(0.5, b.xAxis[0].toValue(a.chartX), b.yAxis[0].toValue(a.chartY), a.chartX, a.chartY)
        },
        onContainerMouseWheel: function(a) {
            var b = this.chart,
                c, a = this.normalize(a);
            c = a.detail || -(a.wheelDelta / 120);
            b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) && b.mapZoom(Math.pow(2, c), b.xAxis[0].toValue(a.chartX),
                b.yAxis[0].toValue(a.chartY), a.chartX, a.chartY)
        }
    });
    X(ya.prototype, "init", function(a, b, c) {
        a.call(this, b, c);
        if (p(c.mapNavigation.enableTouchZoom, c.mapNavigation.enabled)) this.pinchX = this.pinchHor = this.pinchY = this.pinchVert = this.hasZoom = !0
    });
    X(ya.prototype, "pinchTranslate", function(a, b, c, d, e, f, g) {
        a.call(this, b, c, d, e, f, g);
        this.chart.options.chart.type === "map" && this.hasZoom && (a = d.scaleX > d.scaleY, this.pinchTranslateDirection(!a, b, c, d, e, f, g, a ? d.scaleX : d.scaleY))
    });
    W.mapline = v(W.map, {
        lineWidth: 1,
        fillColor: "none"
    });
    u.mapline = da(u.map, {
        type: "mapline",
        pointAttrToOptions: {
            stroke: "color",
            "stroke-width": "lineWidth",
            fill: "fillColor",
            dashstyle: "dashStyle"
        },
        drawLegendSymbol: u.line.prototype.drawLegendSymbol
    });
    W.mappoint = v(W.scatter, {
        dataLabels: {
            enabled: !0,
            formatter: function() {
                return this.point.name
            },
            color: "black",
            crop: !1,
            defer: !1,
            overflow: !1,
            style: {
                HcTextStroke: "3px rgba(255,255,255,0.5)"
            }
        }
    });
    u.mappoint = da(u.scatter, {
        type: "mappoint",
        forceDL: !0
    });
    W.bubble = v(W.scatter, {
        dataLabels: {
            formatter: function() {
                return this.point.z
            },
            inside: !0,
            style: {
                color: "white",
                textShadow: "0px 0px 3px black"
            },
            verticalAlign: "middle"
        },
        marker: {
            lineColor: null,
            lineWidth: 1
        },
        minSize: 8,
        maxSize: "20%",
        states: {
            hover: {
                halo: {
                    size: 5
                }
            }
        },
        tooltip: {
            pointFormat: "({point.x}, {point.y}), Size: {point.z}"
        },
        turboThreshold: 0,
        zThreshold: 0
    });
    var Rb = da(ia, {
        haloPath: function() {
            return ia.prototype.haloPath.call(this, this.shapeArgs.r + this.series.options.states.hover.halo.size)
        }
    });
    u.bubble = da(u.scatter, {
        type: "bubble",
        pointClass: Rb,
        pointArrayMap: ["y", "z"],
        parallelArrays: ["x",
            "y", "z"
        ],
        trackerGroups: ["group", "dataLabelsGroup"],
        bubblePadding: !0,
        pointAttrToOptions: {
            stroke: "lineColor",
            "stroke-width": "lineWidth",
            fill: "fillColor"
        },
        applyOpacity: function(a) {
            var b = this.options.marker,
                c = p(b.fillOpacity, 0.5),
                a = a || b.fillColor || this.color;
            c !== 1 && (a = Z(a).setOpacity(c).get("rgba"));
            return a
        },
        convertAttribs: function() {
            var a = T.prototype.convertAttribs.apply(this, arguments);
            a.fill = this.applyOpacity(a.fill);
            return a
        },
        getRadii: function(a, b, c, d) {
            var e, f, g, h = this.zData,
                i = [],
                j = this.options.sizeBy !==
                "width";
            for (f = 0, e = h.length; f < e; f++) g = b - a, g = g > 0 ? (h[f] - a) / (b - a) : 0.5, j && g >= 0 && (g = Math.sqrt(g)), i.push(F.ceil(c + g * (d - c)) / 2);
            this.radii = i
        },
        animate: function(a) {
            var b = this.options.animation;
            if (!a) o(this.points, function(a) {
                var d = a.graphic,
                    a = a.shapeArgs;
                d && a && (d.attr("r", 1), d.animate({
                    r: a.r
                }, b))
            }), this.animate = null
        },
        translate: function() {
            var a, b = this.data,
                c, d, e = this.radii;
            u.scatter.prototype.translate.call(this);
            for (a = b.length; a--;) c = b[a], d = e ? e[a] : 0, c.negative = c.z < (this.options.zThreshold || 0), d >= this.minPxSize /
                2 ? (c.shapeType = "circle", c.shapeArgs = {
                    x: c.plotX,
                    y: c.plotY,
                    r: d
                }, c.dlBox = {
                    x: c.plotX - d,
                    y: c.plotY - d,
                    width: 2 * d,
                    height: 2 * d
                }) : c.shapeArgs = c.plotY = c.dlBox = r
        },
        drawLegendSymbol: function(a, b) {
            var c = B(a.itemStyle.fontSize) / 2;
            b.legendSymbol = this.chart.renderer.circle(c, a.baseline - c, c).attr({
                zIndex: 3
            }).add(b.legendGroup);
            b.legendSymbol.isMarker = !0
        },
        drawPoints: u.column.prototype.drawPoints,
        alignDataLabel: u.column.prototype.alignDataLabel
    });
    Q.prototype.beforePadding = function() {
        var a = this,
            b = this.len,
            c = this.chart,
            d =
            0,
            e = b,
            f = this.isXAxis,
            g = f ? "xData" : "yData",
            h = this.min,
            i = {},
            j = F.min(c.plotWidth, c.plotHeight),
            k = Number.MAX_VALUE,
            l = -Number.MAX_VALUE,
            n = this.max - h,
            m = b / n,
            q = [];
        this.tickPositions && (o(this.series, function(b) {
            var d = b.options;
            if (b.bubblePadding && (b.visible || !c.options.chart.ignoreHiddenSeries))
                if (a.allowZoomOutside = !0, q.push(b), f) o(["minSize", "maxSize"], function(a) {
                    var b = d[a],
                        c = /%$/.test(b),
                        b = B(b);
                    i[a] = c ? j * b / 100 : b
                }), b.minPxSize = i.minSize, b = b.zData, b.length && (k = p(d.zMin, F.min(k, F.max(Qa(b), d.displayNegative ===
                    !1 ? d.zThreshold : -Number.MAX_VALUE))), l = p(d.zMax, F.max(l, Fa(b))))
        }), o(q, function(a) {
            var b = a[g],
                c = b.length,
                j;
            f && a.getRadii(k, l, i.minSize, i.maxSize);
            if (n > 0)
                for (; c--;) typeof b[c] === "number" && (j = a.radii[c], d = Math.min((b[c] - h) * m - j, d), e = Math.max((b[c] - h) * m + j, e))
        }), q.length && n > 0 && p(this.options.min, this.userMin) === r && p(this.options.max, this.userMax) === r && (e -= b, m *= (b + d - e) / b, this.min += d / m, this.max += e / m))
    };
    if (u.bubble) W.mapbubble = v(W.bubble, {
            animationLimit: 500,
            tooltip: {
                pointFormat: "{point.name}: {point.z}"
            }
        }),
        u.mapbubble = da(u.bubble, {
            pointClass: da(ia, {
                applyOptions: Gb.prototype.applyOptions
            }),
            xyFromShape: !0,
            type: "mapbubble",
            pointArrayMap: ["z"],
            getMapData: u.map.prototype.getMapData,
            getBox: u.map.prototype.getBox,
            setData: u.map.prototype.setData
        });
    K.geojson = function(a, b, c) {
        var d = [],
            e = [],
            f = function(a) {
                var b = 0,
                    c = a.length;
                for (e.push("M"); b < c; b++) b === 1 && e.push("L"), e.push(a[b][0], -a[b][1])
            },
            b = b || "map";
        o(a.features, function(a) {
            var c = a.geometry,
                i = c.type,
                c = c.coordinates,
                a = a.properties,
                j;
            e = [];
            b === "map" || b === "mapbubble" ?
                (i === "Polygon" ? (o(c, f), e.push("Z")) : i === "MultiPolygon" && (o(c, function(a) {
                    o(a, f)
                }), e.push("Z")), e.length && (j = {
                    path: e
                })) : b === "mapline" ? (i === "LineString" ? f(c) : i === "MultiLineString" && o(c, f), e.length && (j = {
                    path: e
                })) : b === "mappoint" && i === "Point" && (j = {
                    x: c[0],
                    y: -c[1]
                });
            j && d.push(q(j, {
                name: a.name || a.NAME,
                properties: a
            }))
        });
        if (c) c.chart.mapCredits = '<a href="http://www.highcharts.com">Highcharts</a> © <a href="' + a.copyrightUrl + '">' + a.copyrightShort + "</a>";
        return d
    };
    X(pa.prototype, "showCredits", function(a, b) {
        if (J.credits.text ===
            this.options.credits.text && this.mapCredits) b.text = this.mapCredits, b.href = null;
        a.call(this, b)
    });
    q(J.lang, {
        zoomIn: "Zoom in",
        zoomOut: "Zoom out"
    });
    J.mapNavigation = {
        buttonOptions: {
            alignTo: "plotBox",
            align: "left",
            verticalAlign: "top",
            x: 0,
            width: 18,
            height: 18,
            style: {
                fontSize: "15px",
                fontWeight: "bold",
                textAlign: "center"
            },
            theme: {
                "stroke-width": 1
            }
        },
        buttons: {
            zoomIn: {
                onclick: function() {
                    this.mapZoom(0.5)
                },
                text: "+",
                y: 0
            },
            zoomOut: {
                onclick: function() {
                    this.mapZoom(2)
                },
                text: "-",
                y: 28
            }
        }
    };
    K.splitPath = function(a) {
        var b, a = a.replace(/([A-Za-z])/g,
                " $1 "),
            a = a.replace(/^\s*/, "").replace(/\s*$/, ""),
            a = a.split(/[ ,]+/);
        for (b = 0; b < a.length; b++) /[a-zA-Z]/.test(a[b]) || (a[b] = parseFloat(a[b]));
        return a
    };
    K.maps = {};
    ba.prototype.symbols.topbutton = function(a, b, c, d, e) {
        return yb(e, a, b, c, d, e.r, e.r, 0, 0)
    };
    ba.prototype.symbols.bottombutton = function(a, b, c, d, e) {
        return yb(e, a, b, c, d, 0, 0, e.r, e.r)
    };
    Na === Wa && o(["topbutton", "bottombutton"], function(a) {
        Wa.prototype.symbols[a] = ba.prototype.symbols[a]
    });
    K.Map = function(a, b) {
        var c = {
                endOnTick: !1,
                gridLineWidth: 0,
                lineWidth: 0,
                minPadding: 0,
                maxPadding: 0,
                startOnTick: !1,
                title: null,
                tickPositions: []
            },
            d;
        d = a.series;
        a.series = null;
        a = v({
            chart: {
                panning: "xy",
                type: "map"
            },
            xAxis: c,
            yAxis: v(c, {
                reversed: !0
            })
        }, a, {
            chart: {
                inverted: !1,
                alignTicks: !1,
                preserveAspectRatio: !0
            }
        });
        a.series = d;
        return new pa(a, b)
    };
    J.plotOptions.heatmap = v(J.plotOptions.scatter, {
        animation: !1,
        borderWidth: 0,
        nullColor: "#F8F8F8",
        dataLabels: {
            formatter: function() {
                return this.point.value
            },
            verticalAlign: "middle",
            crop: !1,
            overflow: !1,
            style: {
                color: "white",
                fontWeight: "bold",
                HcTextStroke: "1px rgba(0,0,0,0.5)"
            }
        },
        marker: null,
        tooltip: {
            pointFormat: "{point.x}, {point.y}: {point.value}<br/>"
        },
        states: {
            normal: {
                animation: !0
            },
            hover: {
                brightness: 0.2
            }
        }
    });
    u.heatmap = da(u.scatter, v(L, {
        type: "heatmap",
        pointArrayMap: ["y", "value"],
        hasPointSpecificOptions: !0,
        supportsDrilldown: !0,
        getExtremesFromAll: !0,
        init: function() {
            u.scatter.prototype.init.apply(this, arguments);
            this.pointRange = this.options.colsize || 1;
            this.yAxis.axisPointRange = this.options.rowsize || 1
        },
        translate: function() {
            var a = this.options,
                b = this.xAxis,
                c = this.yAxis;
            this.generatePoints();
            o(this.points, function(d) {
                var e = (a.colsize || 1) / 2,
                    f = (a.rowsize || 1) / 2,
                    g = Math.round(b.len - b.translate(d.x - e, 0, 1, 0, 1)),
                    e = Math.round(b.len - b.translate(d.x + e, 0, 1, 0, 1)),
                    h = Math.round(c.translate(d.y - f, 0, 1, 0, 1)),
                    f = Math.round(c.translate(d.y + f, 0, 1, 0, 1));
                d.plotX = (g + e) / 2;
                d.plotY = (h + f) / 2;
                d.shapeType = "rect";
                d.shapeArgs = {
                    x: Math.min(g, e),
                    y: Math.min(h, f),
                    width: Math.abs(e - g),
                    height: Math.abs(f - h)
                }
            });
            this.translateColors();
            this.chart.hasRendered && o(this.points, function(a) {
                a.shapeArgs.fill = a.options.color || a.color
            })
        },
        drawPoints: u.column.prototype.drawPoints,
        animate: aa,
        getBox: aa,
        drawLegendSymbol: Ya.drawRectangle,
        getExtremes: function() {
            T.prototype.getExtremes.call(this, this.valueData);
            this.valueMin = this.dataMin;
            this.valueMax = this.dataMax;
            T.prototype.getExtremes.call(this)
        }
    }));
    L = K.TrackerMixin = {
        drawTrackerPoint: function() {
            var a = this,
                b = a.chart,
                c = b.pointer,
                d = a.options.cursor,
                e = d && {
                    cursor: d
                },
                f = function(c) {
                    var d = c.target,
                        e;
                    if (b.hoverSeries !== a) a.onMouseOver();
                    for (; d && !e;) e = d.point, d = d.parentNode;
                    if (e !== r && e !== b.hoverPoint) e.onMouseOver(c)
                };
            o(a.points, function(a) {
                if (a.graphic) a.graphic.element.point = a;
                if (a.dataLabel) a.dataLabel.element.point = a
            });
            if (!a._hasTracking) o(a.trackerGroups, function(b) {
                if (a[b] && (a[b].addClass("highcharts-tracker").on("mouseover", f).on("mouseout", function(a) {
                        c.onTrackerMouseOut(a)
                    }).css(e), Ra)) a[b].on("touchstart", f)
            }), a._hasTracking = !0
        },
        drawTrackerGraph: function() {
            var a = this,
                b = a.options,
                c = b.trackByArea,
                d = [].concat(c ? a.areaPath : a.graphPath),
                e = d.length,
                f = a.chart,
                g = f.pointer,
                h = f.renderer,
                i = f.options.tooltip.snap,
                j = a.tracker,
                k = b.cursor,
                l = k && {
                    cursor: k
                },
                k = a.singlePoints,
                n, m = function() {
                    if (f.hoverSeries !== a) a.onMouseOver()
                },
                p = "rgba(192,192,192," + (ca ? 1.0E-4 : 0.002) + ")";
            if (e && !c)
                for (n = e + 1; n--;) d[n] === "M" && d.splice(n + 1, 0, d[n + 1] - i, d[n + 2], "L"), (n && d[n] === "M" || n === e) && d.splice(n, 0, "L", d[n - 2] + i, d[n - 1]);
            for (n = 0; n < k.length; n++) e = k[n], d.push("M", e.plotX - i, e.plotY, "L", e.plotX + i, e.plotY);
            j ? j.attr({
                d: d
            }) : (a.tracker = h.path(d).attr({
                "stroke-linejoin": "round",
                visibility: a.visible ? "visible" : "hidden",
                stroke: p,
                fill: c ? p : S,
                "stroke-width": b.lineWidth +
                    (c ? 0 : 2 * i),
                zIndex: 2
            }).add(a.group), o([a.tracker, a.markerGroup], function(a) {
                a.addClass("highcharts-tracker").on("mouseover", m).on("mouseout", function(a) {
                    g.onTrackerMouseOut(a)
                }).css(l);
                if (Ra) a.on("touchstart", m)
            }))
        }
    };
    if (u.column) P.prototype.drawTracker = L.drawTrackerPoint;
    if (u.pie) u.pie.prototype.drawTracker = L.drawTrackerPoint;
    if (u.scatter) ra.prototype.drawTracker = L.drawTrackerPoint;
    q(Xa.prototype, {
        setItemEvents: function(a, b, c, d, e) {
            var f = this;
            (c ? b : a.legendGroup).on("mouseover", function() {
                a.setState("hover");
                b.css(f.options.itemHoverStyle)
            }).on("mouseout", function() {
                b.css(a.visible ? d : e);
                a.setState()
            }).on("click", function(b) {
                var c = function() {
                        a.setVisible()
                    },
                    b = {
                        browserEvent: b
                    };
                a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : C(a, "legendItemClick", b, c)
            })
        },
        createCheckboxForItem: function(a) {
            a.checkbox = $("input", {
                type: "checkbox",
                checked: a.selected,
                defaultChecked: a.selected
            }, this.options.itemCheckboxStyle, this.chart.container);
            N(a.checkbox, "click", function(b) {
                C(a, "checkboxClick", {
                        checked: b.target.checked
                    },
                    function() {
                        a.select()
                    })
            })
        }
    });
    J.legend.itemStyle.cursor = "pointer";
    q(pa.prototype, {
        showResetZoom: function() {
            var a = this,
                b = J.lang,
                c = a.options.chart.resetZoomButton,
                d = c.theme,
                e = d.states,
                f = c.relativeTo === "chart" ? null : "plotBox";
            this.resetZoomButton = a.renderer.button(b.resetZoom, null, null, function() {
                a.zoomOut()
            }, d, e && e.hover).attr({
                align: c.position.align,
                title: b.resetZoomTitle
            }).add().align(c.position, !1, f)
        },
        zoomOut: function() {
            var a = this;
            C(a, "selection", {
                resetSelection: !0
            }, function() {
                a.zoom()
            })
        },
        zoom: function(a) {
            var b,
                c = this.pointer,
                d = !1,
                e;
            !a || a.resetSelection ? o(this.axes, function(a) {
                b = a.zoom()
            }) : o(a.xAxis.concat(a.yAxis), function(a) {
                var e = a.axis,
                    h = e.isXAxis;
                if (c[h ? "zoomX" : "zoomY"] || c[h ? "pinchX" : "pinchY"]) b = e.zoom(a.min, a.max), e.displayBtn && (d = !0)
            });
            e = this.resetZoomButton;
            if (d && !e) this.showResetZoom();
            else if (!d && fa(e)) this.resetZoomButton = e.destroy();
            b && this.redraw(p(this.options.chart.animation, a && a.animation, this.pointCount < 100))
        },
        pan: function(a, b) {
            var c = this,
                d = c.hoverPoints,
                e;
            d && o(d, function(a) {
                a.setState()
            });
            o(b === "xy" ? [1, 0] : [1], function(b) {
                var d = a[b ? "chartX" : "chartY"],
                    h = c[b ? "xAxis" : "yAxis"][0],
                    i = c[b ? "mouseDownX" : "mouseDownY"],
                    j = (h.pointRange || 0) / 2,
                    k = h.getExtremes(),
                    l = h.toValue(i - d, !0) + j,
                    i = h.toValue(i + c[b ? "plotWidth" : "plotHeight"] - d, !0) - j;
                h.series.length && l > R(k.dataMin, k.min) && i < s(k.dataMax, k.max) && (h.setExtremes(l, i, !1, !1, {
                    trigger: "pan"
                }), e = !0);
                c[b ? "mouseDownX" : "mouseDownY"] = d
            });
            e && c.redraw(!1);
            D(c.container, {
                cursor: "move"
            })
        }
    });
    q(ia.prototype, {
        select: function(a, b) {
            var c = this,
                d = c.series,
                e = d.chart,
                a = p(a, !c.selected);
            c.firePointEvent(a ? "select" : "unselect", {
                accumulate: b
            }, function() {
                c.selected = c.options.selected = a;
                d.options.data[Ta(c, d.data)] = c.options;
                c.setState(a && "select");
                b || o(e.getSelectedPoints(), function(a) {
                    if (a.selected && a !== c) a.selected = a.options.selected = !1, d.options.data[Ta(a, d.data)] = a.options, a.setState(""), a.firePointEvent("unselect")
                })
            })
        },
        onMouseOver: function(a) {
            var b = this.series,
                c = b.chart,
                d = c.tooltip,
                e = c.hoverPoint;
            if (e && e !== this) e.onMouseOut();
            this.firePointEvent("mouseOver");
            d && (!d.shared ||
                b.noSharedTooltip) && d.refresh(this, a);
            this.setState("hover");
            c.hoverPoint = this
        },
        onMouseOut: function() {
            var a = this.series.chart,
                b = a.hoverPoints;
            this.firePointEvent("mouseOut");
            if (!b || Ta(this, b) === -1) this.setState(), a.hoverPoint = null
        },
        importEvents: function() {
            if (!this.hasImportedEvents) {
                var a = v(this.series.options.point, this.options).events,
                    b;
                this.events = a;
                for (b in a) N(this, b, a[b]);
                this.hasImportedEvents = !0
            }
        },
        setState: function(a, b) {
            var c = this.plotX,
                d = this.plotY,
                e = this.series,
                f = e.options.states,
                g = W[e.type].marker &&
                e.options.marker,
                h = g && !g.enabled,
                i = g && g.states[a],
                j = i && i.enabled === !1,
                k = e.stateMarkerGraphic,
                l = this.marker || {},
                n = e.chart,
                m = e.halo,
                o, a = a || "";
            o = this.pointAttr[a] || e.pointAttr[a];
            if (!(a === this.state && !b || this.selected && a !== "select" || f[a] && f[a].enabled === !1 || a && (j || h && i.enabled === !1) || a && l.states && l.states[a] && l.states[a].enabled === !1)) {
                if (this.graphic) g = g && this.graphic.symbolName && o.r, this.graphic.attr(v(o, g ? {
                    x: c - g,
                    y: d - g,
                    width: 2 * g,
                    height: 2 * g
                } : {})), k && k.hide();
                else {
                    if (a && i)
                        if (g = i.radius, l = l.symbol || e.symbol,
                            k && k.currentSymbol !== l && (k = k.destroy()), k) k[b ? "animate" : "attr"]({
                            x: c - g,
                            y: d - g
                        });
                        else if (l) e.stateMarkerGraphic = k = n.renderer.symbol(l, c - g, d - g, 2 * g, 2 * g).attr(o).add(e.markerGroup), k.currentSymbol = l;
                    if (k) k[a && n.isInsidePlot(c, d, n.inverted) ? "show" : "hide"]()
                }
                if ((c = f[a] && f[a].halo) && c.size) {
                    if (!m) e.halo = m = n.renderer.path().add(e.seriesGroup);
                    m.attr(q({
                        fill: Z(this.color || e.color).setOpacity(c.opacity).get()
                    }, c.attributes))[b ? "animate" : "attr"]({
                        d: this.haloPath(c.size)
                    })
                } else m && m.attr({
                    d: []
                });
                this.state = a
            }
        },
        haloPath: function(a) {
            var b = this.series,
                c = b.chart,
                d = b.getPlotBox(),
                e = c.inverted;
            return c.renderer.symbols.circle(d.translateX + (e ? b.yAxis.len - this.plotY : this.plotX) - a, d.translateY + (e ? b.xAxis.len - this.plotX : this.plotY) - a, a * 2, a * 2)
        }
    });
    q(T.prototype, {
        onMouseOver: function() {
            var a = this.chart,
                b = a.hoverSeries;
            if (b && b !== this) b.onMouseOut();
            this.options.events.mouseOver && C(this, "mouseOver");
            this.setState("hover");
            a.hoverSeries = this
        },
        onMouseOut: function() {
            var a = this.options,
                b = this.chart,
                c = b.tooltip,
                d = b.hoverPoint;
            if (d) d.onMouseOut();
            this && a.events.mouseOut && C(this, "mouseOut");
            c && !a.stickyTracking && (!c.shared || this.noSharedTooltip) && c.hide();
            this.setState();
            b.hoverSeries = null
        },
        setState: function(a) {
            var b = this.options,
                c = this.graph,
                d = this.graphNeg,
                e = b.states,
                b = b.lineWidth,
                a = a || "";
            if (this.state !== a) this.state = a, e[a] && e[a].enabled === !1 || (a && (b = e[a].lineWidth || b + (e[a].lineWidthPlus || 0)), c && !c.dashstyle && (a = {
                "stroke-width": b
            }, c.attr(a), d && d.attr(a)))
        },
        setVisible: function(a, b) {
            var c = this,
                d = c.chart,
                e = c.legendItem,
                f,
                g = d.options.chart.ignoreHiddenSeries,
                h = c.visible;
            f = (c.visible = a = c.userOptions.visible = a === r ? !h : a) ? "show" : "hide";
            o(["group", "dataLabelsGroup", "markerGroup", "tracker"], function(a) {
                if (c[a]) c[a][f]()
            });
            if (d.hoverSeries === c) c.onMouseOut();
            e && d.legend.colorizeItem(c, a);
            c.isDirty = !0;
            c.options.stacking && o(d.series, function(a) {
                if (a.options.stacking && a.visible) a.isDirty = !0
            });
            o(c.linkedSeries, function(b) {
                b.setVisible(a, !1)
            });
            if (g) d.isDirtyBox = !0;
            b !== !1 && d.redraw();
            C(c, f)
        },
        setTooltipPoints: function(a) {
            var b = [],
                c, d, e = this.xAxis,
                f = e && e.getExtremes(),
                g = e ? e.tooltipLen || e.len : this.chart.plotSizeX,
                h, i, j = [];
            if (!(this.options.enableMouseTracking === !1 || this.singularTooltips)) {
                if (a) this.tooltipPoints = null;
                o(this.segments || this.points, function(a) {
                    b = b.concat(a)
                });
                e && e.reversed && (b = b.reverse());
                this.orderTooltipPoints && this.orderTooltipPoints(b);
                a = b.length;
                for (i = 0; i < a; i++)
                    if (e = b[i], c = e.x, c >= f.min && c <= f.max) {
                        h = b[i + 1];
                        c = d === r ? 0 : d + 1;
                        for (d = b[i + 1] ? R(s(0, ea((e.clientX + (h ? h.wrappedClientX || h.clientX : g)) / 2)), g) : g; c >= 0 &&
                            c <= d;) j[c++] = e
                    }
                this.tooltipPoints = j
            }
        },
        show: function() {
            this.setVisible(!0)
        },
        hide: function() {
            this.setVisible(!1)
        },
        select: function(a) {
            this.selected = a = a === r ? !this.selected : a;
            if (this.checkbox) this.checkbox.checked = a;
            C(this, a ? "select" : "unselect")
        },
        drawTracker: L.drawTrackerGraph
    });
    q(K, {
        Axis: Q,
        Chart: pa,
        Color: Z,
        Point: ia,
        Tick: La,
        Renderer: Na,
        Series: T,
        SVGElement: H,
        SVGRenderer: ba,
        arrayMin: Qa,
        arrayMax: Fa,
        charts: V,
        dateFormat: $a,
        format: Ia,
        pathAnim: kb,
        getOptions: function() {
            return J
        },
        hasBidiBug: Hb,
        isTouchDevice: Ab,
        numberFormat: oa,
        seriesTypes: u,
        setOptions: function(a) {
            J = v(!0, J, a);
            qb();
            return J
        },
        addEvent: N,
        removeEvent: Y,
        createElement: $,
        discardElement: Ja,
        css: D,
        each: o,
        extend: q,
        map: Ua,
        merge: v,
        pick: p,
        splat: na,
        extendClass: da,
        pInt: B,
        wrap: X,
        svg: ca,
        canvas: ga,
        vml: !ca && !ga,
        product: "Highmaps",
        version: "1.0.4"
    })
})();