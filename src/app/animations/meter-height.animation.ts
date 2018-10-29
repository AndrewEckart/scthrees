import {animate, state, style, transition, trigger} from '@angular/animations';

export const meterHeight = trigger('meterHeight', [
    state('empty', style({
      height: '0'
    })),
    state('filled', style({
      height: '{{ height }}'
    }), {params: {height: '0'}}),
    transition('* <=> *', [
      animate('{{ timings }}')
    ])
  ]
);
