;(function($) {
	$.LdirValidation = function( main, setting ) {
    var opt = {
      'main'  : $(main),
      'timer' : {},
      'map'   : {},
      'method'   : [
        'required','minlength','maxlength','email','url','number','digit',
        'date','day','month','year','amount','telephone','mobile',
        'postnumber','creditcardnumber','atleastoption','parent_target',
        'tab_target_class','personnumber','interval','text','accountnumber',
        'kidormsg'
      ],
      'selector' : ':text, [type="password"], [type="file"], select, textarea, ' +
        '[type="number"], [type="search"] ,[type="tel"], [type="url"], ' +
        '[type="email"], [type="datetime"], [type="date"], [type="month"], ' +
        '[type="week"], [type="time"], [type="datetime-local"], [type="hidden"],' +
        '[type="range"], [type="color"], [type="radio"], [type="checkbox"]',

      'validation' : {
        'email' : /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'url'   : /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
        'date'  : /^(0?[1-9]|[12][0-9]|3[01])([\/\-\.])(0?[1-9]|1[012])([\/\-\.])(\d{4})$/, // DD.MM.YYYY
        'number': /^(\-|\+)?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/,
        'phonenumber'  : /^\+?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/,
        'postnumber'   : /^\d{4}$/,
        'personnumber' : /^\d{6}(\s+)?\d{5}$/,
        'accountnumber': /^\d{4}(\s+)?\d{2}(\s+)?\d{5}$/,
        'contrycode'   : /^\+\d{2,3}|00(\s)?\+\d{2,3}/,
        'monthCountDay': [0,31,28,31,30,31,30,31,31,30,31,30,31],
        'monthName'    : ['','january','february','march','april','may','june','july','august','september','october','november','desember']
      },
      'message' : {
        'invalid-personnumber'               : 'Ugyldig personnummer.',
        'invalid-personnumber-length'        : 'Ugyldig tekst lengde.',
        'invalid-email'                      : 'Ugyldig e-post adresse.',
        'invalid-accountnumber'              : 'Ugyldig kontonummer.',
        'invalid-accountnumber-length'       : 'Ugyldig tekst lengde.',
        'invalid-mobilenumber'               : 'Ugyldig mobilnummer.',
        'invalid-mobilenumber-length'        : 'Ugyldig tekst lengde.',
        'invalid-telephonenumber'            : 'Ugyldig mobilnummer.',
        'invalid-telephonenumber-length'     : 'Ugyldig tekst lengde.',
        'invalid-required-field'             : 'Feltet er påkrevd.',
        'invalid-required-selection'         : 'Valget er påkrevd.',
        'invalid-creditcardnumber'           : 'Ugyldig Kortnummer.',
        'invalid-creditcardnumber-length'    : 'Ugyldig tekst lengde.',
        'invalid-kidnumber'                  : 'Ugyldig kidnummer.',
        'invalid-kidnumber-length'           : 'Ugyldig tekst lengde.',
        'invalid-organizationsnumber'        : 'Ugyldig organisasjonsnummer.',
        'invalid-organizationsnumber-length' : 'Ugyldig tekst lengde.',
        'invalid-number'                     : 'Ugyldig nummer.',
        'invalid-minlength'                  : 'Ugyldig lengde.'
      }
    };

    var helper = {
      /***********************************************************************
      === Initialization ===
      ************************************************************************/
      init : function() {
        helper.initBindInput();
        opt.form = opt.main.is('form') ? opt.main : opt.main.find('form');
        opt.form.off('submit', helper._submit).on('submit', helper._submit);
      },

      initBindInput: function () {
        opt.all = opt.main.find( opt.selector ).each( function(i,dom) {
          var input = $(dom), rule = helper._getRule( input );
          if ( ! rule ) { return; }

          opt.map[ helper._generateId(input) ] = rule;
          if ( rule.parent ) {
            var parent = input.closest( rule.parent );
            if ( parent.size() ) {
              rule.parent = helper._generateId( parent );
            } else { rule.parent = ''; }
          }

          for ( var j=0; j<opt.method.length; j++ ) {
            if ( typeof(rule[opt.method[j]]) === 'undefined' ) continue;

            var key = '_verify'+helper._capitaliseFirstLetter(opt.method[j]);      
            if ( typeof(helper[key]) !== 'function' ) continue;

            if (opt.method[j] === 'required')
              input.attr('aria-required','true');
            else 
              helper[key]({'target': input, 'type':'blur'},rule[opt.method[j]]);
          }

          if ( helper.isClickable(input) ) 
            input.off( 'change', helper._change ).on( 'change', helper._change );
          else {
            input.prop('value') ? input.addClass('-has-value') :
              input.removeClass('-has-value');
   
            input.off('focus',helper._focus).off('blur',helper._blur).off('keyup',helper._keyup);
            input.on('focus',helper._focus).on('blur',helper._blur).on('keyup',helper._keyup);  
          }
          //input.off('validate',helper._validateInput).on('validate', helper._validateInput );
        });
      },

      /***********************************************************************
      === PUBLIC FUNCTIOn ===
      ************************************************************************/
      isSuccess : function ( wrapper ) {
        var input = $( wrapper || opt.main ).find( opt.selector );
        var loop  = input.size();
        for ( var i=0; i<loop; i++ ) {
          if ( input.eq(i).attr('aria-invalid') ) return false;
        }
        return true;
      },  

      validate : function( input ) {
      },

      isRadio : function( input ) {
        return ($(input).attr('type') || '').match(/radio/i) !== null;
      },

      isClickable: function( input ) {
        var node = $( input ), dom = node.get(0);
        var type = node.attr('type'), tag = dom.nodeName.toLowerCase();
        return (type +' '+tag).match(/radio|checkbox|select|option/i) !== null;
      },

      isCheckable: function( input ) {
        return ($(input).attr('type') || '').match(/radio|checkbox/i) !== null;
      },

      getFormat : function( value, type ) {
        var text = (value || '').replace(/\s+/g,''), out  = '';

        if ( type === 'accountnumber' ) {
          out = [text.substring(0,4),text.substring(4,6),text.substring(6)]
            .join(' ').replace(/\s+/g,' ').replace(/\s+$/g,'');
        } else if ( type === 'personnumber' ) {
          out = [text.substring(0,6),text.substring(6)]
            .join(' ').replace(/\s+/g,' ').replace(/\s+$/g,'');
        } else if ( type === 'organizationsnumber' ) {
          out = [text.substring(0,3),text.substring(3,6),text.substring(6,9),text.substring(9,12)]
            .join(' ').replace(/\s+/g,' ').replace(/\s+$/g,'');
        } else if ( type === 'amount' ) {
          out = this._splitText( text, 3 ).join(' ');
        } else if ( type === 'creditcardnumber' ) {
          //out = this._splitText( text, 4 ).join(' ');
          out = [text.substring(0,4),text.substring(4,8),text.substring(8,12),text.substring(12,16)]
            .join(' ').replace(/\s+/g,' ').replace(/\s+$/g,'');
        } else if ( type === 'mobile' ||  type === 'telephone') {
          var plus = text.match(/^\+/) ? '+' : '', list = [];
          if ( plus ) {
            text = text.replace( /^\+/, '');
            var splited = text.split('');
            if ( splited.length > 2 ) {
              plus += splited.shift() + splited.shift() + ' ';
              text = splited.join('');
            }
          }

          if ( type === 'telephone' )
            list = helper._splitText( text, 2);
          else {
            var a = text.split(''), t = 3, j = 0;
            for ( var i=0; i<a.length; i++ ) {
              if ( ! list[j] ) { list[j] = ''; }
              list[j] += (a[i]+'');
              if ( --t === 0 ) {
                t = list[j].length === 3 ? 2 : 3;
                j = j+1;
              }
            }
          }
          out = plus+list.join(' ');
        }

        return out || text;
      },

      hasError : function( input ) {
        return input && input.size() ? 
          (input.attr('aria-invalid') ? true :false) : false;
      },

      mod11OfNumberWithControlDigit : function ( value ) {
        var text = value || '', number = 2, sum = 0, i = text.length - 2;
        for ( i; i >= 0; --i ) {
          sum += text.charAt(i) * number;
          if (++number > 7) { number = 2; }
        }
        var result = (11 - sum % 11);
        return result === 11 ? 0 : result;
      },

      luhnChecksumOfNumberWithControlDigit : function( value ){
        var sum = 0, dbl = 0, text = value || '';
        for(var i = text.length-2; i >= 0; i-=2){
            dbl = (parseInt(text.charAt(i), 10) * 2).toString();
            sum += parseInt(dbl.charAt(0), 10) + parseInt(dbl.charAt(1) || 0, 10);
        }
        for(var i = text.length -3; i >= 0; i-=2){
            sum += parseInt(text.charAt(i), 10);
        }
        sum = sum.toString();
        return 10 - parseInt(sum.charAt(sum.length -1), 10);
      }, 

      /***********************************************************************
      === INTERNAL FUNCTIOn ===
      ************************************************************************/
      _trim : function( text, noSpace ) {
        var out = (text || '').replace(/^\s+/, '').replace(/\s+$/g, '');
        return noSpace ? out.replace( /\s+/g, '' ) : out.replace( /\s+/g, ' ' );
      },

      _getRule : function ( input ) {
        var node = $(input), rule = {}, sequance = [], list = [node.attr('data-rule')];
        if ( node.attr('required')  ) { list.push('required');                              }
        if ( node.attr('minlength') ) { list.push('minlength['+node.attr('minlength')+']'); }
        if ( node.attr('maxlength') ) { list.push('maxlength['+node.attr('maxlength')+']'); }

        var type = node.attr('type') || '';
        var reg  = type ? new RegExp('(^|\\s)'+type+'(\\s|$)','i') : null;
        if ( reg && opt.method && opt.method.join(' ').match(reg) && type !== 'text' ) 
          list.push( type ); 

        var text = helper._trim( list.join(' ') );
        if ( ! text ) { return; }

        var render = function( v, d ) {      
          if ( ! d ) { d = rule; }
          var m = v.match( /(\w+)\[(.*)\]/ );
          if ( m ) {
            if ( m[1] === 'interval' ) {
              d[m[1]] = m[2] ? $.map( m[2].split(','), function(param){
                var number = parseFloat(param || '');
                return isNaN(number) ? null : number;
              }) : [null,null];
              sequance.push( m[1] );
            }
            else if ( m[2].match( /(.*\,|^)(\w+\[.*\])/ ) ) {
              if ( ! d[m[1]] || typeof(d[m[1]]) === 'string' ) { d[m[1]] = {}; }
              sequance.push( m[1] );
              render( m[2], rule[m[1]] );
            } else { 
              d[m[1]] = m[2].match(/^[\d+\.]$/) ? parseFloat(m[2]) : m[2]; 
              sequance.push( m[1] );              
            }
          } else { 
            d[v] = ''; 
            sequance.push( v );
          }
        };

        var test = text.match( /([\w\-\_]+)(\[[\w\s\"\,\_\.\#\-]+\])?(\s+|$)/g ) || [];
        for ( var i=0; i<test.length; i++ ) { render( helper._trim(test[i]) ); }

        var tmp = [], original = [];
        while ( sequance.length ) {
          var value = sequance.shift();
          if ( value === 'required' ) 
            tmp.unshift( value );
          else if ( value === 'maxlength' || value === 'minlength' ) 
            tmp.push( value );
          else
            original.push( value ); 
        }
        rule.sequance = tmp.concat( original );
        return rule;
      },

      _generateId : function( node ) {
        var id = node.attr('id');
        if ( ! id ) {
          id = 'auto_'+(new Date()).getTime()+'_'+Math.floor((Math.random()*1000)+1);
          node.attr('id',id);
        }
        return id;
      },

      _getLength: function( input ) {
        var node = $( input ), dom = node.get(0);
        var tag  = dom.nodeName.toLowerCase();

        if ( tag === 'select' )
          return node.find('option:selected').length;

        if ( tag === 'input' && helper.isCheckable(input) ) {
          var any = helper._getInputByName( dom.name ).filter( ':checked' );
          return ((any.size() ? any.prop('value') : '' ) || '').length;
        }
        return (dom.value || '').length;
      }, 

      _getInputByName: function( name ) {
        return opt.all.filter('[name="'+name+'"]');
      },

      _capitaliseFirstLetter : function(text){
        return text ? (text.charAt(0).toUpperCase()+text.slice(1).toLowerCase()): '';
      },

      _isNoneCharacter : function( e ) {
        var code = e ? e.keyCode || 0 : 0;
        if ( ! code ) { return true; }        
        return  e.shiftKey || e.ctrlKey || (code>=16&&code<=18) || code===9 || code===8 || code===13  || (code>=35&&code<=40) ?
          true : false;
      },

      _splitText : function( text, split ) {
          var i = (text||'').length % split, list = i ? [text.substr(0,i)] : [];
          for ( i; i<text.length; i += split ) {
              list.push(text.substr(i,split));
          }
          return list;
      },

      _getCursorPosition: function( input ) {
        var position = 0, dom = input ? $( input ).get( 0 ) : null;
        if ( dom ) {
          if ( 'selectionStart' in dom ) 
            position = dom.selectionStart;
          else if ( document.selection ) {
            var sel = document.selection.createRange();
            var selLen = document.selection.createRange().text.length;
            sel.moveStart('character', -dom.value.length);
            position =  sel.text.length - selLen;
          }
        }
        return position;
      },

      _getSelection : function() {
        var selection = '';
        try { selection = window.getSelection().toString(); }
        catch( error ) {}
        return selection;
      },

      _selectText : function( start, end, field ) {
        var dom = field.get(0), value = field.val() || '';
        if ( isNaN(end) ) { end = value.length; }

        var interval = [isNaN(start) ? 0 : start, isNaN(end) ? 0 : end];
        if ( ! isNaN(interval[0]) && ! isNaN(interval[1]) ) {
          if (dom.setSelectionRange)// Firefox and other gecko based browsers
              dom.setSelectionRange(interval[0], interval[1]);
          else if (dom.createTextRange) { // Internet Explorer
            var range = dom.createTextRange();
            range.collapse(true);
            range.moveEnd('character', interval[0]);
            range.moveStart('character', interval[1]);
            range.select();
          }
          else if (dom.selectionStart) { // Other browsers
            dom.selectionStart = interval[0];
            dom.selectionEnd   = interval[1];
          }
        }
      },

      _getErrorMessage : function( e, param, invalid ) {
        var field = $(e.currentTarget || e.target), id = field.attr('id') || '';
        var name  = field.attr('id') || '';
        var msg   = opt.message || {};
        return msg[invalid+'-'+name] || msg[invalid+'-'+id] || msg[invalid] || invalid;
      },

      _toggleErrorMessage: function( e, force, message ) {
        var input = $(e.currentTarget || e.target), id = input.attr('id');
        var rule  = opt.map[ id ] || {};
        var pin   = 'invalid-msg-for-'+(rule.parent || id), exist = $( '#'+pin ); 
        if ( force ) {
          if ( exist.size() && exist.text() === message ) return;
          var next = rule.parent ? $('#'+rule.parent) : input.next( 'label[for="'+id+'"]' );

          exist.remove();
          $('<div id="'+pin+'" role="alert" class="error-message">'+message+'</div>')
            .insertAfter( next.size() ? next : input );

          if ( helper.isRadio(input) ) {
            helper._getInputByName(input.attr('name')).each( function(i,dom){
              $(dom).attr('aria-invalid',true).addClass('haveErrors -error');
            });
          } else { input.attr('aria-invalid',true).addClass('haveErrors -error'); }
          
        } else {
          exist.remove();
          if ( helper.isRadio(input) ) {
            helper._getInputByName(input.attr('name')).each( function(i,dom){
              $(dom).removeAttr('aria-invalid').removeClass('haveErrors -error');
            });
          } else { input.removeAttr('aria-invalid').removeClass('haveErrors -error'); }
        }
      },

      _submit : function( e, ignor ) {
        if ( ! ignor ) {
          e.preventDefault();
          var form = $(e.currentTarget);
          form.find( opt.selector ).each( function(i,dom) {
            helper._validate({'currentTarget':dom,'type':'blur'}, true );
          });
          if ( helper.isSuccess(form) ) helper._submit(e,true);
        } else { 
        }
      },

      _validate : function( e, required ) {
        var keyup = e.type === 'keyup', noneCharacter = helper._isNoneCharacter(e);
        if ( keyup && noneCharacter ) return;

        var input = $( e.currentTarget || e.target ), id = input.attr('id');
        var rule = opt.map[ id ] || {}, sequance = rule.sequance || [];
        var loop = sequance.length, j = 0, i = 0, blur = e.type === 'blur';
        var has  = helper.hasError( input ), option = {'list':[]};

        for ( var i=0; i<loop; i++ ) {
          if ( ! has && sequance[i] === 'required' && ! required ) continue;

          var param = rule[sequance[i]];  
          var key = '_verify'+helper._capitaliseFirstLetter(sequance[i]);          
          if ( typeof(helper[key]) !== 'function' )  continue;

          option.invalid = helper[key](e,param);
          option.list.push( option.invalid===null ? 'null' : option.invalid);
          if ( ! option.invalid ) continue;

          j = i; i = loop+1;
          option.message = helper._getErrorMessage( e, param, option.invalid );
        }

        if ( i>loop) {
          if ( i==loop && option.list.join('').match(/null/i) ) { 
            return helper._debug('P : '+ option.list); 
          }
          var force = i>loop || (option.list.join('').match(/invalid/ig) ? true : false);
          helper._toggleErrorMessage( e, force, option.message );
        }
        else if ( blur || e.type==='change' || (keyup && has) ) {
          helper._toggleErrorMessage( e, false, '' );
        } else {
        }
      },

      _focus : function( e ) { helper._validate( e ); },
      _keyup : function( e ) { helper._validate( e ); },
      _blur  : function( e ) { helper._validate( e ); },
      _change: function( e ) { helper._validate( e ); },

      /***********************************************************************
      === INTERNAL VALIDATION FUNCTIOn ===
      ************************************************************************/
      _verifyRequired: function( e, param ) {   
        var input = $(e.currentTarget || e.target);
        var dom   = input.get(0), length = 0, type = 'field';

        if ( dom.nodeName.toLowerCase() === 'select' || helper.isCheckable(input) ) {
          length = helper._getLength( input ); 
          type   = 'selection';
        }  else {
          length = helper._trim( dom.value, true ).length;
          if ( ! length && param==='visible' &&! input.prop('clientHeight') )
            length = 1;
        }
        return length > 0 ? '' : 'invalid-required-'+type;  
      },

      _verifyMinlength : function( e, param ) {
        var field = $(e.currentTarget || e.target), value = field.prop('value') || '';
        var text = value.replace(/\s+/g,''), has = helper.hasError( field );
        if ( ! text ) { return has ? null : ''; }

        var keyup  = e.type === 'keyup', focus = e.type === 'focus';
        if ( focus || keyup ) {
            if ( helper._isNoneCharacter(e) || value===helper._getSelection() ) {
              return has ? null : '';
            }
            if ( focus || (keyup && ! has) ) { return ''; }
        } 

        var min = param ? parseInt( param ) : 0, length = text.length;
        return ! length || isNaN(min) || length >= param ? '' : 'invalid-minlength';
      },

      _verifyEmail : function( e, param ) {
        var field = $(e.currentTarget || e.target), value = field.prop('value') || '';
        var text = value.replace(/\s+/g,''), has = helper.hasError( field );
        if ( ! text ) { return has ? null : ''; }

        var keyup  = e.type === 'keyup', focus = e.type === 'focus';
        if ( focus || keyup ) {
            if ( helper._isNoneCharacter(e) || value===helper._getSelection() ) {
                return has ? null : '';
            }
            if ( focus || (keyup && ! has) ) { return ''; }
        } 
        return text.match( opt.validation.email ) ? '' : 'invalid-email';
      },

      _verifyUrl : function( e, param ) {
        var field = $(e.currentTarget || e.target), value = field.prop('value') || '';
        var text = value.replace(/\s+/g,''), has = helper.hasError( field );
        if ( ! text ) { return has ? null : ''; }

        var keyup  = e.type === 'keyup', focus = e.type === 'focus';
        if ( focus || keyup ) {
            if ( helper._isNoneCharacter(e) || value===helper._getSelection() ) {
                return has ? null : '';
            }
            if ( focus || (keyup && ! has) ) { return ''; }
        } 
        return ext.match( opt.validation.url ) ? '' : 'invalid-url';
      },

      _verifyPersonnumber: function( e, param ) {
        var field = $(e.currentTarget || e.target), value = field.prop('value') || '';
        var text = value.replace(/\s+/g,''), has = helper.hasError( field );
        if ( ! text ) { return has ? null : ''; }

        var keyup  = e.type === 'keyup', focus = e.type === 'focus';

        if ( focus || keyup ) {
          if ( helper._isNoneCharacter(e) || value===helper._getSelection() ) {
            return has ? null : '';
          }

          var pos = helper._getCursorPosition( field );
          field.prop('value', helper.getFormat(text,'personnumber'));

          if ( keyup && pos !== value.length ) {
            helper._selectText( pos, pos, field );
          }
          if ( focus || (keyup && ! has) ) { return ''; }
        } else if ( e.type === 'focusout' || e.type === 'blur' ) {
          field.prop('value', helper.getFormat(text,'personnumber'));
        }

        if ( ! text.match(opt.validation.number) )       return 'invalid-personnumber'; 
        if ( text.length < 11 )                          return 'invalid-personnumber-length';
        if ( ! text.match(opt.validation.personnumber) ) return 'invalid-personnumber'; 


        var sum = function(tNumber, factors){
          var s = 0, i = 0, l = factors.length;
          for ( i; i<l; ++i ){ s += parseInt(tNumber.charAt(i),10)*factors[i]; }
          return s;
        };

        var cSum1 = 11 - (sum(text, [3, 7, 6, 1, 8, 9, 4, 5, 2]) % 11);
        if (cSum1 === 11) { cSum1 = 0; }

        var cSum2 = 11 - (sum(text, [5, 4, 3, 2, 7, 6, 5, 4, 3, 2]) % 11);
        if (cSum2 === 11) { cSum2 = 0; }

        var invalid = ! ( 
          cSum1 === parseInt(text.charAt(9), 10) && cSum2 === parseInt(text.charAt(10), 10) 
        );
        return invalid ? 'invalid-personnumber' : '';
      },

      _verifyAccountnumber: function( e, param ) {
        var field = $(e.currentTarget || e.target), value = field.prop('value') || '';
        var text = value.replace(/\s+/g,''), has = helper.hasError( field );
        if ( ! text ) { return has ? null : ''; }

        var keyup  = e.type === 'keyup', focus = e.type === 'focus'; 

        if ( focus || keyup ) {
          if ( helper._isNoneCharacter(e) || value===helper._getSelection() ) {
            return has ? null : '';
          }

          var pos = helper._getCursorPosition( field );
          field.prop('value', helper.getFormat(text,'accountnumber'));

          if ( keyup && pos !== value.length ) {
            helper._selectText( pos, pos, field );
          }
          if ( focus || (keyup && ! has) ) { return ''; }
        } else if ( e.type === 'focusout' || e.type === 'blur' ) {
          field.prop('value', helper.getFormat(text,'accountnumber'));
        }

        if ( ! text.match(opt.validation.number) )        return 'invalid-accountnumber'; 
        if ( text.length < 11 )                           return 'invalid-accountnumber-length';
        if ( ! text.match(opt.validation.accountnumber) ) return 'invalid-accountnumber'; 

        var test    = parseInt(text.charAt(text.length - 1), 10);
        var invalid = ! (test === helper.mod11OfNumberWithControlDigit(text));
        return invalid ? 'invalid-accountnumber' : '';
      },

      _verifyCreditcardnumber: function( e, param ) {
        var field = $(e.currentTarget || e.target), value = field.prop('value') || '';
        var text = value.replace(/\s+/g,''), has = helper.hasError( field );
        if ( ! text ) { return has ? null : ''; }

        var keyup  = e.type === 'keyup', focus = e.type === 'focus'; 
        if ( focus || keyup ) {
          if ( helper._isNoneCharacter(e) || value===helper._getSelection() ) {
            return has ? null : '';
          }

          var pos = helper._getCursorPosition( field );
          field.prop('value', helper.getFormat(text,'creditcardnumber'));

          if ( keyup && pos !== value.length ) {
            helper._selectText( pos, pos, field );
          }
          if ( focus || (keyup && ! has) ) { return ''; }
        } else if ( e.type === 'focusout' || e.type === 'blur' ) {
            field.prop('value', helper.getFormat(text,'creditcardnumber'));
        }

        if ( ! text.match(opt.validation.number) ) return 'invalid-creditcardnumber'; 
        return text.length < 16 ? 'invalid-creditcardnumber-length' : '';
      },

      _verifyOrganizationsnumber : function( e, option ) {
        var field = $(e.currentTarget || e.target), value = field.prop('value') || '';
        var text = value.replace(/\s+/g,''), has = helper.hasError( field );
        if ( ! text ) { return has ? null : ''; }

        var keyup  = e.type === 'keyup', focus = e.type === 'focus';
        if ( focus || keyup ) {
            if ( helper._isNoneCharacter(e) || value===helper._getSelection() ) {
              return has ? null : '';
            }
            if ( focus || (keyup && ! has) ) { return ''; }
        } 

        if ( ! text.match(opt.validation.number) ) return 'invalid-organizationsnumber';
        if ( text.length < 9 )                     return 'invalid-organizationsnumber-length';

        var test    = parseInt(text.charAt(text.length - 1), 10);
        var invalid = ! (test === helper.mod11OfNumberWithControlDigit(text));        
        return invalid ? 'invalid-organizationsnumber' : '';
      },

      _verifyKidnumber : function( e, option ) {
        var field = $(e.currentTarget || e.target), value = field.prop('value') || '';
        var text = value.replace(/\s+/g,''), has = helper.hasError( field );
        if ( ! text ) { return has ? null : ''; }

        var keyup  = e.type === 'keyup', focus = e.type === 'focus';
        if ( focus || keyup ) {
          if ( helper._isNoneCharacter(e) || value===helper._getSelection() ) {
            return has ? null : '';
          }
          if ( focus || (keyup && ! has) ) { return ''; }
        } 

        if ( text.match(opt.validation.number) ) return 'invalid-kidnumber';

        var digit = text.charAt(text.length - 1);
        var isMod11 = parseInt(digit, 10) === helper.mod11OfNumberWithControlDigit(text);
        var isLuhn  = parseInt(digit, 10) === helper.luhnChecksumOfNumberWithControlDigit(text);
        return isMod11 || isLuhn ? '' : 'invalid-kidnumber';
      },

      _verifyAmount : function( e, option ) {
        return helper._verifyNumber( e, option, 'amount' );
      },

      _verifyNumber : function( e, option, type ) {
        var field = $(e.currentTarget || e.target), value = field.prop('value') || '';
        var text = value.replace(/\s+/g,''), has = helper.hasError( field );
        if ( ! text ) { return has ? null : ''; }

        var keyup  = e.type === 'keyup', focus = e.type === 'focus'; 
        var number = parseFloat(text.replace(/^0+/,''));

        if ( focus || keyup ) {
            if ( focus ) { field.prop('value', text); }
            if ( helper._isNoneCharacter(e) || value===helper._getSelection() ) {
                return has ? null : '';
            }
            if ( focus || (keyup && ! has) ) { return ''; }
        } else if ( e.type === 'focusout' || e.type === 'blur' ) {
          field.prop('value', helper.getFormat(text,'amount'));
        }

        var error = '';
        if ( type === 'amount' ) {
          error = isNaN(number) || (text && text.match(/\D/)) || number<0 ? 'invalid-amount' : '';
        } else {
          error = text.match( opt.validation.number ) ? '' : 'invalid-number';
        }
        return error;
      },

      _verifyMobile : function( e, option ) {
        return helper._verifyTelephone( e, option, 'mobile' );
      },

      _verifyTelephone : function( e, option, type ) {
        var field = $(e.currentTarget || e.target), value = field.prop('value') || '';
        var text = value.replace(/\s+/g,''), has = helper.hasError( field );
        if ( ! text ) { return has ? null : ''; }

        var keyup  = e.type === 'keyup', focus = e.type === 'focus'; 
        if ( ! type ) type = 'telephone';

        if ( focus || keyup ) {
          if ( helper._isNoneCharacter(e) || value===helper._getSelection() ) {
              return has ? null : '';
          }

          var pos = helper._getCursorPosition( field );
          field.prop('value', helper.getFormat(text,type));

          if ( keyup && pos !== value.length ) {
              helper._selectText( pos, pos, field );
          }
          if ( focus || (keyup && ! has) ) { return ''; }
        } else if ( e.type === 'focusout' || e.type === 'blur' ) {
          field.prop('value', helper.getFormat(text,type));
        }

        if ( ! text.match(opt.validation.number) ) return 'invalid-'+type+'number'; 
        if ( text.length < 8 )                     return 'invalid-'+type+'number-length';

        return text.match(opt.validation.phonenumber) ? '' : 'invalid-'+type+'number';  
      },

      _debug: function ( text, value ) {
        var debug = $('#debugWidget'), v = '', d = new Date();
        if ( ! debug.size() ) {
          var style = 'position:fixed;right:5px;bottom:5px;z-index:1000;'+
            'background-color:#fff;border:1px solid red;'+
            'overflow:scroll;font-size:11px;line-height:16px;width:300px;height:300px;';
          debug = $('<div id="debugWidget" style="'+style+'"></div>').appendTo('body');
        }
        
        var p = debug.html();
        var t = d.getMinutes() + ':' + d.getSeconds();
        if ( value != null ) {
          if ( typeof(value) != 'object' )
            v = value;
          else if( value instanceof Array )
            v = value.join('<br/>');
          else {
            var data = [];
            for ( var k in value ) data.push( k + ' : ' + value[k]);
            v = data.join( '<br/>' );
          }
        }
        debug.html( t + '<br/>' + text + '<br/>' + v + '<div>&nbsp;</div>' + p);
      }
    };

    var method = {};
    for ( var k in helper ) { 
      if ( ! k.match(/^(init|setup|_)/i) ) { method[k] = helper[k]; }
    }
    helper.init();
    return method;
	};

  $.fn.ldirValidation = function ( config ) {
    if ( ! config ) { config = {}; }
    return this.each( function( i, dom ) {
      this.LdirValidation = new $.LdirValidation(this, config);
    });
  }; 
})( jQuery );