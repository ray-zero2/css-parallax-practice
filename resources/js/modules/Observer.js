import 'intersection-observer';
import Events from 'events';

export default class extends Events {
  constructor(selector) {
    super();
    const $elements = Array.from(document.querySelectorAll(selector));
    this.createObserver($elements);
  }

  createObserver($arrayItems) {
    let thresholdSet = [];
    for (let i = 0; i < 1.0; i += 0.01) {
      thresholdSet.push(i);
    }

    const observer = new IntersectionObserver(
      (entries, object) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          console.log(entry.intersectionRatio);
          const $element = entry.target;
          this.notify($element);
          // object.unobserve($element);
        });
      },
      {
        root: null,
        rootMargin: '-10% 0%',
        threshold: thresholdSet
      }
    );

    $arrayItems.forEach($item => {
      observer.observe($item);
    });
  }

  notify($element) {
    this.emit('intersected', $element);
  }
}
