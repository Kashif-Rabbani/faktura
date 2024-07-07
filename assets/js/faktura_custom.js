Array.from || (Array.from = function () {
    var r = Object.prototype.toString, n = function (n) {
        return "function" == typeof n || "[object Function]" === r.call(n)
    }, t = function (r) {
        var n = Number(r);
        return isNaN(n) ? 0 : 0 !== n && isFinite(n) ? (n > 0 ? 1 : -1) * Math.floor(Math.abs(n)) : n
    }, e = Math.pow(2, 53) - 1, o = function (r) {
        var n = t(r);
        return Math.min(Math.max(n, 0), e)
    };
    return function (r) {
        var t = this, e = Object(r);
        if (null == r) throw new TypeError("Array.from requires an array-like object - not null or undefined");
        var a, i = arguments.length > 1 ? arguments[1] : void 0;
        if ("undefined" != typeof i) {
            if (!n(i)) throw new TypeError("Array.from: when provided, the second argument must be a function");
            arguments.length > 2 && (a = arguments[2])
        }
        for (var f, u = o(e.length), c = n(t) ? Object(new t(u)) : new Array(u), h = 0; u > h;) f = e[h], i ? c[h] = "undefined" == typeof a ? i(f, h) : i.call(a, f, h) : c[h] = f, h += 1;
        return c.length = u, c
    }
}());
(function () {
    window.isSafari = "Apple Computer, Inc." === navigator.vendor
}).call(this);
(function () {
    var t, e, n, r, o, d;
    Element.prototype.empty = function () {
        var t;
        for (t = []; this.hasChildNodes();) t.push(this.removeChild(this.lastChild));
        return t
    }, n = function (t) {
        var e, n;
        return e = t.cloneNode(!0), n = e.querySelector(".page-splitted tbody"), e.emptyContent = function () {
            return n.empty()
        }, e.injectRows = function (t) {
            return n.appendChild(t)
        }, document.body.appendChild(e), e
    }, d = function () {
        var t, e, n, r, o, d, i, a, l, p;
        for (p = document.querySelectorAll(".page").length, i = document.querySelectorAll(".total-pages"), t = 0, o = i.length; o > t; t++) n = i[t], n.textContent = p;
        for (a = document.querySelectorAll(".current-page"), l = [], e = r = 0, d = a.length; d > r; e = ++r) n = a[e], l.push(n.textContent = e + 1);
        return l
    }, t = function (e) {
        var r, i, a, l, p, c, u, s, g, h, m, y, f, C, S, v, I, w, q, A;
        for (l = e.querySelector(".page-splitted"), c = l.parentNode, l.classList.contains("dynamic-sizing") || (c.style.height = Math.floor(c.getBoundingClientRect().height) + "px"), S = l.querySelectorAll("tbody tr"), A = l.querySelector("thead tr"), s = A.clientWidth, i = Array.from(A.querySelectorAll("th")).map(function (t) {
            return t.clientWidth
        }), h = 0, m = S.length; m > h; h++) f = S[h], Array.from(f.querySelectorAll("td")).forEach(function (t, e) {
            return 1 === t.colSpan ? t.style.setProperty("--cell-width", i[e] / s * 100 + "%") : void 0
        });
        return u = window.getComputedStyle(c), (w = l.querySelector(".sums")) && (I = window.getComputedStyle(w)), S.length > 0 && (C = window.getComputedStyle(S[S.length - 1].querySelector("td"))), p = Math.floor(c.getBoundingClientRect().height), p -= parseInt(u.paddingTop) + parseInt(u.paddingBottom) + (parseInt(u.marginTop) + parseInt(u.marginBottom)), I && (p -= parseInt(I.paddingTop) + parseInt(I.paddingBottom)), C && (p -= parseInt(C.borderTopWidth) + parseInt(C.borderBottomWidth) + parseInt(C.paddingTop)), a = Array.from(c.children).reduce(function (t, e) {
            var n;
            return n = window.getComputedStyle(e), t + Math.ceil(e.getBoundingClientRect().height)
        }, 0), a >= p && S.length ? (y = n(e), y.emptyContent(), e.classList.add("not-last-page"), u = window.getComputedStyle(c), p = Math.floor(c.getBoundingClientRect().height), p -= parseInt(u.paddingTop) + parseInt(u.paddingBottom), I && (p -= parseInt(I.paddingTop) + parseInt(I.paddingBottom)), C && (p -= parseInt(C.borderTopWidth) + parseInt(C.borderBottomWidth) + parseInt(C.paddingTop)), q = Array.from(c.children).filter(function (t) {
            return t !== l
        }).reduce(function (t, e) {
            var n;
            return n = window.getComputedStyle(e), t + e.offsetHeight + parseFloat(n.marginTop) + parseFloat(n.marginBottom)
        }, 0), r = p - q, v = Array.from(S).filter(function (t) {
            return t.offsetTop + t.clientHeight > r
        }), 0 === v.length && S.length > 1 && (v = Array.from(S).splice(-1)), g = document.createDocumentFragment(), v.forEach(function (t) {
            return g.appendChild(t)
        }), y.injectRows(g), t(y), d()) : (e.classList.add("last-page"), o())
    }, e = function () {
        var t;
        return t = document.createElement("div"), t.id = "done", t.style = "display:none", document.body.appendChild(t)
    }, o = function () {
        var t;
        return t = document.createEvent("Event"), t.initEvent("page_split:done", !0, !0), document.dispatchEvent(t)
    }, document.addEventListener("page_split:done", e, !1), r = document.querySelector(".page"), document.querySelector("body").classList.contains("pdf") ? t(r) : setTimeout(function () {
        return t(r)
    }, 100)
}).call(this);
(function () {
    var e;
    e = function () {
        var e;
        return e = window.frameElement, e.height = document.body.getBoundingClientRect().bottom, e.parentNode.classList.remove("loading"), e.classList.add("loaded")
    }, document.addEventListener("page_split:done", e, !1)
}).call(this);