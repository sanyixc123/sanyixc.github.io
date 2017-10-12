; (function () {
    "use strict";
    var helperName = 'block';
    var _helper = {
        elements: {
            element: null
        },
        _create: function () {
            var $el = $('<div class="tianv-blocker" id="tianv-blocker"></div>');
            $el.prependTo($('body'));
            return $el;
        },
        status: {
            isInit: false,
            showing: false
        },
        isInit: false,
        init: function () {
            var _this = this;
            if (_this.status.isInit) return;
            else _this.status.isInit = true;
            var $el = _this._create();
            $el.fastClick(function () {
                _this.hide();
            });
            _this.elements.element = $el;
        },
        show: function (opacity, wh100) {
            var _this = this;
            _this.init();
            if(wh100) $('html').addClass('wh100');
            var $element = _this.elements.element;
            $element.velocity("stop");
            $element.velocity({
                opacity: (opacity ? opacity : 0.1)
            }, {
                display: "inherit",
                easing: "ease-out",
                duration: 200
            });
        },
        hide: function () {
            var _this = this;
            if (!_this.status.isInit) return;
            $('html').removeClass('wh100');
            var $element = _this.elements.element;
            $element.velocity("stop");
            $element.velocity({
                opacity: 0
            }, {
                display: "none",
                easing: "ease-in",
                duration: 200
            });
        }
    };
    window.helper = window.helper ? window.helper : {};
    window.helper[helperName] = _helper;
})();
; (function () {
    "use strict";
    var helperName = 'slidemenu';
    var _helper = {
        elements: {
            element: null
        },
        status: {
            isInit: false,
            showing: false
        },
        _create: function () {
            var $el = $('<div class="tianv-slidemenu" id="tianv-slidemenu" />');
            $el.prependTo($('body'));
            return $el;
        },
        init: function () {
            var _this = this;
            if (_this.status.isInit) return;
            else _this.status.isInit = true;
            var $el = _this._create();
            _this.elements.element = $el;
        },
        show: function (opacity) {
            var _this = this;
            _this.init();
            if (window.helper && window.helper['block']) {
                helper.block.show(0.6, true);
                helper.block.elements.element.one('fastClick', function () {
                    _this.hide();
                });
            }
            var $element = _this.elements.element;
            $element.velocity("stop");
            $element.velocity({
                left: '0px'
            }, {
                display: "inherit",
                easing: "ease-out",
                duration: 300
            });
            _this.status.showing = true;
        },
        hide: function () {
            var _this = this;
            if (!_this.status.isInit) return;
            var $element = _this.elements.element;
            $element.velocity("stop");
            $element.velocity({
                left: '-220px'
            }, {
                display: "none",
                easing: "ease-in",
                duration: 300
            });
            _this.status.showing = false;
        },
        toggle: function () {
            var _this = this;
            if (!_this.status.showing) _this.show();
            else _this.hide();
        }
    };
    window.helper = window.helper ? window.helper : {};
    window.helper[helperName] = _helper;
})();

$('#navbar-toggle').fastClick(function () {
    if (!window.helper || !window.helper['slidemenu'])
        return;
    $('html').addClass('wh100');
    helper.slidemenu.show();
    var $el = helper.slidemenu.elements.element;
    if ($el.data('menu'))
        return;
    var $menu = $('#navbar-collapse').children('ul');
    var $slidemenu = $menu.clone();
    DynamicElement($slidemenu);
    $slidemenu.find('.dropdown-menu').each(function () {
        var $smenu = $(this);
        var $btn = $('<span class="nav-collapse">+</span>');
        $btn.insertBefore($smenu);
        $btn.fastClick(function () {
            var $span = $(this);
            var $li = $span.parent();
            var $ul = $li.children('ul');
            var isDropdown = $li.hasClass('dropdown-in');
            if (isDropdown) {
                $li.removeClass('dropdown-in');
                $ul.slideUp('fast');
            }
            else {
                $li.addClass('dropdown-in');
                $ul.slideDown('fast');
                $li.siblings('.dropdown-in').each(function () {
                    var $me = $(this);
                    $me.children('ul').slideUp('fast');
                    $me.removeClass('dropdown-in');
                });
            }
        });
    });
    $el.append($slidemenu);
    $el.data('menu', true);
    return false;
});