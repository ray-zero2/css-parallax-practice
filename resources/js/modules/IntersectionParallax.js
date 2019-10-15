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
          // console.log(entry.intersectionRatio);
          this.animation(entry);
          // object.unobserve($element);
        });
      },
      {
        root: null,
        rootMargin: '0% 0% 0%',
        threshold: thresholdSet
      }
    );

    $arrayItems.forEach($item => {
      observer.observe($item);
    });
  }

  animation(entry) {
    const ratio = entry.intersectionRatio;
    const $image = entry.target;
    this.zoomIn($image, ratio);

    const children = Array.from(entry.target.children);
    const $layer = children.find($element => {
      return $element.classList.contains('layer');
    });
    this.darken($layer, ratio);
  }

  zoomIn($element, ratio) {
    const origScale = 0.8;
    const scale = Math.min(origScale + (1 - origScale) * ratio, 1);
    $element.style.transform = `scale(${scale})`;
  }

  darken($element, ratio) {
    const opacity = Math.max(0.1, ratio / 1.5);
    $element.style.opacity = opacity;
  }
}
