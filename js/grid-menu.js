/**
 * This file contains the actual plugin gridMenu.js!
 *
 * GridMenu.js is a simple grid driven responsize menu system.
 * For details see README.md
 *
 * For basic jQuery plugin information to help understand some of
 * the code see http://docs.jquery.com/Plugins/Authoring
 */

(function ($) {

    var gridMenu = {

        options: undefined,

        /**
         * Initilze the gridMenu plugin, called when first created.
         *
         * @param  {[map]}  options User defined options(optional)
         * @return {[jQuery]}       Chainable
         */
        init: function (options) {

            //return this to maintian chainability
            return this.each(function () {

                // extends data, so any options passed to the
                // function, will overide these defaults
                gridMenu.options = $.extend({
                    menu_selector  : '.menu',
                    menu_focus     :  'home',
                    complete       : undefined,
                    grid_buttons: {
                        width         : 225,
                        gutter        : 20,
                        selector      : '.button',
                        animate       : false,
                        animateOption: {
                            queue         : true,
                            speed         : 200,
                            duration      : 300,
                            effect        : 'fadeInOnApper'
                        }
                    }
                }, options);

                var data   = gridMenu.options,
                    menus  = $(this).children(data.menu_selector)
                                    .children(data.grid_buttons.selector);

                data.that  = this;

                gridMenu.applyOnClickEvent(menus);

                //apply the jquery.grid-a-licuos plugin to all the menus
                $(data.menu_selector).gridalicious(data.grid_buttons);

                //Hide all the menus except the home menu
                $(this).children(data.menu_selector).hide();
                $(gridMenu.selectorFor(data.menu_focus)).show();

            });
        },

        /**
         * Rendors the selected menu, and hids the current one.
         *
         * @param  {string} menu The name of the menu id (don't inlcude '#')
         * @return {undefined}
         */
        rendor: function (menu) {

            var data = gridMenu.options;

            gridMenu.animate(data.menu_focus, menu);

            data.menu_focus = menu;

            //callback
            if (data.complete) {
                data.complete(menu);
            }
        },

        /**
         * Animation for the menu transistion
         * @param  {string} from Name of the menu to transition from.
         * @param  {[type]} to   Name of the menu to transition to.
         * @return {undefined}
         */
        animate: function (from, to) {

            //TODO: Cool animations :)
            $(gridMenu.selectorFor(from)).hide('slide');
            $(gridMenu.selectorFor(to)).show('slide');
        },

        /**
         * Get the selector string for the menu name.
         * @param  {string} menu     Name of the menu
         * @return {jQuery.element}  The menu element
         */
        selectorFor: function (menu) {

            var data = gridMenu.options;

            return $(data.that).children('#' + menu + data.menu_selector);
        },

        /**
         * Apply the on click attribute
         * @param  {jQuery.element[]} menus Array of jQuery menu elements
         * @return {undefined}
         */
        applyOnClickEvent: function (menus) {

            //add onclick attribute for transitioning to the next menu
            var gridId = $(this).attr('id');

            menus.each(function (i, menu) {

                if (!$(menu).attr('onclick')) {

                    $(menu).attr('onclick',
                        "$('#" + gridId + "').gridMenu('rendor','" + $(menu).attr('id') + "')");
                }
            });
        }
    };

    // this is a copy-paste from jquery website
    $.fn.gridMenu = function (method) {
        if (gridMenu[method]) {
            return gridMenu[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return gridMenu.init.apply(this, arguments);
        } else {
            $.error('Method ' +  method + ' does not exist on jQuery.tooltip');
        }
    };

}) (jQuery);