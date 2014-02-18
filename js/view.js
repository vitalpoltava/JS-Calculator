/**
 * Calculator View
 */

Calculator.view = (function(){
    return {

        init: function() {
            this.render('main', Calculator.template || 'No template found!')
                .subscribeEvents()
                .attachEvents();
        },

        render: function(id, template) {
            var wrapper = document.getElementById(id);
            wrapper.innerHTML = template;
            this.display = document.getElementsByClassName('display')[0];
            return this;
        },

        subscribeEvents: function() {
            Calculator.mediator.subscribe('addDisplayValue', this.addDisplayValue.bind(this));
            Calculator.mediator.subscribe('clearDisplay', this.clearDisplay.bind(this));
            Calculator.mediator.subscribe('displayResult', this.displayResult.bind(this));
            return this;
        },

        attachEvents: function() {
            // handle keys
            var nodeSet = document.getElementsByClassName('num');
            [].slice.call(nodeSet).forEach(this.publishNumberEvent);

            // handle keyboard
            this.handleKeyboard();

            // handle clear button
            var clearButton = document.getElementsByClassName('clear')[0];
            clearButton.addEventListener('click', function() {
                Calculator.mediator.publish('clearDisplay');
            });

            // handle evaluate
            var evalButton = document.getElementsByClassName('eval-result')[0];
            evalButton.addEventListener('click', function() {
                Calculator.mediator.publish('evalResult', this.display.innerHTML || '');
            }.bind(this));

            return this;
        },

        publishNumberEvent: function(el) {
            el.addEventListener('click', function(e) {
                var el = e.currentTarget || e.target;
                var num = el.textContent || el.outerText;
                Calculator.mediator.publish('keyPressed', num);
            });
        },

        addDisplayValue: function(ev, val) {
            this.display.innerHTML = this.display.innerHTML + val;
        },

        displayResult: function(ev, res) {
            this.display.innerHTML = res;
        },

        clearDisplay: function() {
            this.display.innerHTML = '';
        },

        handleKeyboard: function() {
            document.addEventListener('keydown', function(e) {
                var tabKeys = Calculator.model.tabKeys;
                var equalSign = Calculator.model.equalKeys;
                var clearKeys = Calculator.model.clearKeys;
                var code = e.keyCode || e.which;

                // pad keys
                if (tabKeys[code]) {
                    Calculator.mediator.publish('keyPressed', tabKeys[code]);
                }

                // equal (evaluate) sign
                if (equalSign[code]) {
                    Calculator.mediator.publish('evalResult', this.display.innerHTML || '');
                }

                // clear sign
                if (clearKeys[code]) {
                    Calculator.mediator.publish('clearDisplay');
                }
            }.bind(this));
        }
    }
}());