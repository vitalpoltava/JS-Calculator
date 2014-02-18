Calculator.model = (function(){
    return {

        init: function() {
            this.subscribeEvents();
        },

        tabKeys: {
            48: "0", 49: "1", 50: "2", 51: "3", 52: "4", 53: "5", 54: "6",
            55: "7", 56: "8", 57: "9", 96: "0", 97: "1", 98: "2", 99: "3",
            100: "4", 101: "5", 102: "6", 103: "7", 104: "8", 105: "9",
            106: "*", 107: "+", 109: "-"
        },

        equalKeys: {
            187: "=", 13: "="
        },

        clearKeys: {
            46: "c", 67: "c", 27: "esc"
        },

        subscribeEvents: function() {
            Calculator.mediator.subscribe('keyPressed', this.numberPressed.bind(this));
            Calculator.mediator.subscribe('evalResult', this.evalResult.bind(this));
        },

        numberPressed: function(ev, num) {
            Calculator.mediator.publish('addDisplayValue', num)
        },

        evalResult: function(ev, exp) {
            var safeExp = this._sanitize(exp);
            if (!safeExp) return;
            safeExp  = 'return ' + safeExp + ';';
            var res = (Function(safeExp))();
            Calculator.mediator.publish('displayResult', res);
        },

        _sanitize: function(raw) {
            // remove unexpected characters
            return raw.replace(/[^0-9+-/*]/g, '')
                      .replace(/^\*+/, '');
        }
    }
}());