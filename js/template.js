/**
 *  Template
 */

Calculator.template = [
    '<div class="calculator">',
        '<div class="row flex">',
            '<span class="key clear">C</span>',
            '<span class="flexbox display"></span>',
        '</div>',

        '<div class="row">',
            '<span class="key num">7</span>',
            '<span class="key num">8</span>',
            '<span class="key num">9</span>',
            '<span class="key num operation">-</span>',
        '</div>',
        '<div class="row">',
            '<span class="key num">4</span>',
            '<span class="key num">5</span>',
            '<span class="key num">6</span>',
            '<span class="key num operation">+</span>',
        '</div>',
        '<div class="row">',
            '<span class="key num">1</span>',
            '<span class="key num">2</span>',
            '<span class="key num">3</span>',
            '<span class="key num operation">*</span>',
        '</div>',
        '<div class="row flex">',
            '<span class="key num">0</span>',
            '<span class="key operation flexbox eval-result">=</span>',
        '</div>',
    '</div>'
].join('');