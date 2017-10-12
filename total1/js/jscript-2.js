var _tianvConfig = {
    matchMedias: [320, 480, 640, 768, 992, 1200]
};
var tianvConfig = {
    matchMedias: {
        "w320": {
            "width": _tianvConfig.matchMedias[0],
            "query": "(max-width: 479px)",//(min-width: 320px) and 
            "match": function (w) { return w <= (_tianvConfig.matchMedias[1] - 1); }//w >= 320 && 
        },
        "w480": {
            "width": _tianvConfig.matchMedias[1],
            "query": "(min-width: " + _tianvConfig.matchMedias[1] + "px) and (max-width: " + (_tianvConfig.matchMedias[2] - 1) + "px)",
            "match": function (w) { return w >= _tianvConfig.matchMedias[1] && w <= (_tianvConfig.matchMedias[2] - 1); }
        },
        "w640": {
            "width": _tianvConfig.matchMedias[2],
            "query": "(min-width: " + _tianvConfig.matchMedias[2] + "px) and (max-width: " + (_tianvConfig.matchMedias[3] - 1) + "px)",
            "match": function (w) { return w >= _tianvConfig.matchMedias[2] && w <= (_tianvConfig.matchMedias[3] - 1); }
        },
        "w768": {
            "width": _tianvConfig.matchMedias[3],
            "query": "(min-width: " + _tianvConfig.matchMedias[3] + "px) and (max-width: " + (_tianvConfig.matchMedias[4] - 1) + "px)",
            "match": function (w) { return w >= _tianvConfig.matchMedias[3] && w <= (_tianvConfig.matchMedias[4] - 1); }
        },
        "w992": {
            "width": _tianvConfig.matchMedias[4],
            "query": "(min-width: " + _tianvConfig.matchMedias[4] + "px) and (max-width: " + (_tianvConfig.matchMedias[5] - 1) + "px)",
            "match": function (w) { return w >= _tianvConfig.matchMedias[4] && w <= (_tianvConfig.matchMedias[5] - 1); }
        },
        "w1200": {
            "width": _tianvConfig.matchMedias[5],
            "query": "(min-width: " + _tianvConfig.matchMedias[5] + "px)",
            "match": function (w) { return w >= _tianvConfig.matchMedias[5]; }
        }
    }
};
var msie = null;
; (function () {
    function isIE() {
        var myNav = navigator.userAgent.toLowerCase();
        return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
    }
    msie = isIE();
})();
; (function () {
    var console = (window.console = window.console || {});
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var method;
    var noop = function () {
        var args = Array.prototype.slice.call(arguments);
        for (var i = 0; i < args.length; i++) {
            //alert(args[i]);
        }
    };
    for (var i = 0; i < methods.length; i++) {
        method = methods[i];
        if (console[method]) continue;
        console[method] = noop;
    }
})();
var templateName = '';
; (function () {
    "use strict";
    var links = document.getElementsByTagName('link');
    if (links.length <= 0) return;
    for (var i = 0; i < links.length; i++) {
        var link = links[i];
        var href = link.getAttribute('href');
        if (!href || href.length <= 0) return;
        var reg = /^\/themes\/([a-z][0-9a-zA-Z]+)\/external\/tianv\/style.css$/;
        if (reg.test(href)) {
            templateName = reg.exec(href)[1];
            break;
        }
    }
})();
var jqueryFns = new Array();
; (function () {
    function callJqueryFns() {
        if (!jqueryFns || jqueryFns.length <= 0)
            return;
        for (var i = 0; i < jqueryFns.length; i++) {
            var jqueryFn = jqueryFns[i];
            jqueryFn(jQuery);
        }
    }
    var jqueryInterval;
    jqueryInterval = setInterval(function () {
        if (typeof jQuery == 'undefined') return;
        clearInterval(jqueryInterval);
        setTimeout(callJqueryFns, 50);
    }, 20);
})();
var dynamicElementFns = new Array();
; (function () {
    window.DynamicElement = function ($items) {
        //console.log(dynamicElementFns);
        if (!dynamicElementFns || dynamicElementFns.length <= 0)
            return;
        for (var i = 0; i < dynamicElementFns.length; i++) {
            var dynamicElementFn = dynamicElementFns[i];
            dynamicElementFn($items);
        }
    };
})();
var windowResizeFns = new Array();
; (function () {
    function callWindowResizeFns(){
        if( !windowResizeFns || windowResizeFns.length<=0 )
            return;
        for (var i = 0; i < windowResizeFns.length; i++) {
            var windowResizeFn = windowResizeFns[i];
            if (typeof (windowResizeFn) == 'object' && windowResizeFn.fn && windowResizeFn.args) {
                windowResizeFn.fn(windowResizeFn.args);
            }
            else {
                windowResizeFn();
            }
        }
    }
    var windowResizeTimeout;
    window.onresize = function () {
        if (windowResizeTimeout) { clearTimeout(windowResizeTimeout); };
        windowResizeTimeout = setTimeout(callWindowResizeFns, 50);
    };
})();
var windowMatchMediaFns = new Array();
var matchWidth = -1;
; (function () {
    function callWindowMatchMediaFns(width) {
        if (!windowMatchMediaFns || windowMatchMediaFns.length <= 0)
            return;
        for (var i = 0; i < windowMatchMediaFns.length; i++) {
            var windowMatchMediaFn = windowMatchMediaFns[i];
            if (typeof (windowMatchMediaFn) == 'object' && windowMatchMediaFn.fn && windowMatchMediaFn.args) {
                windowMatchMediaFn.fn(width, windowMatchMediaFn.args);
            }
            else {
                windowMatchMediaFn(width);
            }
        }
    }
    function getMatchWidth() {
        var bodyWidth = window.innerWidth ? window.innerWidth : document.body.clientWidth;
        if (tianvConfig.matchMedias.w320.match(bodyWidth)) return tianvConfig.matchMedias.w320.width;
        else if (tianvConfig.matchMedias.w480.match(bodyWidth)) return tianvConfig.matchMedias.w480.width;
        else if (tianvConfig.matchMedias.w640.match(bodyWidth)) return tianvConfig.matchMedias.w640.width;
        else if (tianvConfig.matchMedias.w768.match(bodyWidth)) return tianvConfig.matchMedias.w768.width;
        else if (tianvConfig.matchMedias.w992.match(bodyWidth)) return tianvConfig.matchMedias.w992.width;
        else return tianvConfig.matchMedias.w1200.width;
    }
    matchWidth = getMatchWidth();
    if (window.matchMedia) {
        if (msie == 8) return;
        var matchMedias = tianvConfig.matchMedias;
        window.matchMedia(matchMedias.w320.query).addListener(function (data) {
            if (!data.matches) return;
            callWindowMatchMediaFns(matchMedias.w320.width);
        });
        window.matchMedia(matchMedias.w480.query).addListener(function (data) {
            if (!data.matches) return;
            callWindowMatchMediaFns(matchMedias.w480.width);
        });
        window.matchMedia(matchMedias.w640.query).addListener(function (data) {
            if (!data.matches) return;
            callWindowMatchMediaFns(matchMedias.w640.width);
        });
        window.matchMedia(matchMedias.w768.query).addListener(function (data) {
            if (!data.matches) return;
            callWindowMatchMediaFns(matchMedias.w768.width);
        });
        window.matchMedia(matchMedias.w992.query).addListener(function (data) {
            if (!data.matches) return;
            callWindowMatchMediaFns(matchMedias.w992.width);
        });
        window.matchMedia(matchMedias.w1200.query).addListener(function (data) {
            if (!data.matches) return;
            callWindowMatchMediaFns(matchMedias.w1200.width);
        });
        return;
    }
    windowResizeFns.push(function () {
        var width = getMatchWidth();
        if (width == matchWidth) return;
        matchWidth == width;
        callWindowMatchMediaFns(width);
    });
})();
; (function () {
    "use strict";
    var debugEnable = false;
    if (debugEnable) console.log('smartimage -> debug enable');
    var bodyWide = false;
    var body = document.getElementsByTagName('body');
    if (body && body.length>=1) {
        var bodyClass = body[0].getAttribute('class');
        if (bodyClass && bodyClass.length >= 1 && bodyClass.toString().indexOf('wide'))
            bodyWide = true;
    }
    window.ResizeImage = function (img, width) {
        var isFullWidth = false;
        if (width >= 1200) {
            var pImg = img;
            do {
                pImg = pImg.parentElement;
                if (!pImg) break;
                var pClass = pImg.getAttribute('class');// pImg.hasAttribute('')
                if (pClass && pClass.length >= 1 && pClass.indexOf('container') != -1 && pClass.indexOf('full-width') != -1) {
                    isFullWidth = true;
                    break;
                }
            } while (true);
        }
        var src ;//= img.getAttribute('data-src-w' + width.toString());
        if (isFullWidth) {
            src = img.getAttribute('data-src');
        } else {
            src = img.getAttribute('data-src-w' + width.toString());
        }
        if (!src && width == 1200) {
            ResizeImage(img, 992);
            return;
        }
        if (!src && width == 992) {
            ResizeImage(img, 960);
            return;
        }
        if (!src) return;
        if (!img.getAttribute('data-src-def')) {
            img.setAttribute('data-src-def', img.getAttribute('src'));
        }
        var nImg = new Image();
        nImg.src = src;
        if (!document.addEventListener) {
            img.src = src;
        }
        else {
            nImg.addEventListener('load', (function (img, src) {
                img.src = src;
            })(img, src));
        }
    };
    window.SmartImage = function (matchWidth) {
        if (debugEnable) console.log('smartimage -> SmartImage size -> ' + matchWidth);
        var imgs = document.getElementsByTagName('img');
        var nimgs = [];
        for (var j = 0; j < imgs.length; j++) {
            var img = imgs[j];
            ResizeImage(img, matchWidth);
        }
    };
    if (msie == 8) {
        SmartImage(1200);
        return;
    }
    SmartImage(matchWidth);
    windowMatchMediaFns.push(SmartImage);
    dynamicElementFns.push(function ($items) {
        var width = matchWidth;
        $items.find('img').each(function () {
            var img = this;
            ResizeImage(img, width);
        });
    });
})();
