import Observer from './Observer';
import anime from 'animejs';

export default class {
  constructor(selectors) {
    const observer = new Observer(selectors);
    this.initScrollValue = {};
    this.clientRect = 0;

    observer.on('intersected', $item => {
      this.parallax($item);

    });
  }


  parallax($element) {
    $element.classList.add('js-fixed');
    const ratio = $item.dataset.ratio ? $item.dataset.ratio : 0.8;

    this.clientRectTop = $item.getBoundingClientRect().top;

    const positionY = window.pageYOffset + this.clientRectTop;
    $item.addEventListener('scroll', event => {

    }
  }
}
}
