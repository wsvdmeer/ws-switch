
/*
 *  Project: WS Switch
 *  Description: create a switch out of a checkbox;   
 *  Author: Wiebe Steven v/d Meer
 *  License:
 */
;(function ( $, window, document, undefined ) {
    //DEFAULTS
    var pluginName = "wsSwitch",
        defaults = {
          'value':'1',
          'onChange':function(obj){}
        };

    //CONSTRUCTOR
    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init(); 
    }
    
    //PROTOTYPE
    Plugin.prototype = {
        init: function() {
            
            //OBJECT
            var obj = $(this.element);
            var onChange = this.options.onChange;
            
            //WRAP OBJECTS
            obj.wrap('<div class="ws-switch"/>').wrap('<div class="ws-switch-button" />').wrap('<div class="ws-switch-button-inner"/>');
            obj.removeClass();

            //VARIABLES
            var main = obj.closest(".ws-switch");
            main.append('<span class="switch-icon on"></span>');
            main.append('<span class="switch-icon off"></span>');
            
            var state = obj.prop('checked');
            var on = main.children(".on");
            var off = main.children(".off");
            var button = main.children(".ws-switch-button");
            var offset = button.position().left;
            var init = true;
            
            //ON CLICK
            main.click(function(){
                if(state == false){
                    toggle(true,true)
                }else{
                    toggle(false,true)
                }
            });
           
            //ON INIT
            toggle(state,false);
            
            //TOGGLE
            //boolean toggle true/false
            //boolean animate true/false 
            function toggle(bool,animate){
               if(bool == true){
                    if(animate){  
                        button.stop(true,true).animate({left:'50%'}, 200);
                    }else{
                        button.stop(true,true).css({left:'50%'});
                    }
                    obj.prop('checked', true);
                    state = true;
                    main.addClass("checked");
               }else{
                    if(animate){
                        button.stop(true,true).animate({left:offset+'px'}, 200);
                    }else{
                        button.stop(true,true).css({left:offset+'px'});
                    }
                    obj.prop('checked', false)
                    state = false;
                    main.removeClass("checked")
               }
               
               //DONT CALL ONCHANGE ON INIT
               if(!init){
                 onChange.call(this,{value:state,target:obj});
               }
               init = false;
            }
           
            /**
            *DEBUG FUNCTION
            *log: login string
            */
            function debug(log) {
                if (window.console != undefined) {
                    console.log(log);
                }
            }
        },
    };

    $.fn[pluginName] = function ( options ) {
        var args = arguments;
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {
                if (!$.data(this, 'plugin_' + pluginName)) {
                    $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
                }
            });
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
            var returns;
            this.each(function () {
                var instance = $.data(this, 'plugin_' + pluginName);
                if (instance instanceof Plugin && typeof instance[options] === 'function') {
                    returns = instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
                }
                if (options === 'destroy') {
                  $.data(this, 'plugin_' + pluginName, null);
                }
            });
            return returns !== undefined ? returns : this;
        }
    };

}(jQuery, window,document));


