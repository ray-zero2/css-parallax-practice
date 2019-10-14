import 'intersection-observer';
import Events from 'events';

export default class extends Events {
  constructor(selector) {
    super();
    const $elements = Array.from(document.querySelectorAll(selector));
    this.createObserver($elements);
  }

  createObserver($arrayItems) {
    const observer = new IntersectionObserver(
      (entries, object) => {
        entries.forEach(entry => {
          console.log(entry);
          if (!entry.isIntersecting) return;
          const $element = entry.target;
          this.notify($element);
          object.unobserve($element);
        });
      },
      {
        root: null,
        // rootMargin: 0,
        threshold: 0
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
