(function() {
  if (typeof Framer === 'undefined') {
    throw new Error('Couldn\'t find Framer. Make sure the framer-prevent-bounce.js script is loaded *after* loading framer.js.');
  };

  function addStyle(css) {
    var styleSheet = document.createElement('style');
    styleSheet.innerHTML = css;
    return document.head.appendChild(styleSheet);
  }

  function objectToCSS(obj) {
    var parts = [];
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        parts.push(prop + ': ' + obj[prop] + '; ');
      }
    }
    return parts.join('');
  }

  function preventScrollingOnRootElement() {
    root = document.getElementById('FramerRoot');
    if (!root) {
      return setTimeout(preventScrollingOnRootElement, 10);
    }

    var properties = {
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };

    addStyle('.framer-template-scroll-fix { ' + objectToCSS(properties) +' }');
    root.classList.add('framer-template-scroll-fix');

    root.addEventListener('touchmove', function(event) {
      event.preventDefault();
    });
  }

  function patchScrollingLayers() {
    var originalSetPropertyValue = Layer.prototype._setPropertyValue;

    Layer.prototype._setPropertyValue = function(k, v) {
      if (k === 'scrollVertical') {
        // We're checking for the existence of _eventListener, because
        // Framer seems to throw an exception if you try to remove a listener
        // that hasn't been added in the first place.
        if (this._eventListeners) {
          this.off('touchmove', handleScrollingLayerTouchMove);
          this.off('touchstart', handleScrollingLayerTouchStart);
        }

        if (v) {
          this.on('touchmove', handleScrollingLayerTouchMove);
          this.on('touchstart', handleScrollingLayerTouchStart);
        }
      }

      originalSetPropertyValue.call(this, k, v);
    }

    // Patch layers that have already been initialized
    if (Framer.Session) {
      var layers = Framer.Session._LayerList, i = layers.length;
      while(i--) {
        layers[i]._setPropertyValue = Layer.prototype._setPropertyValue.bind(layers[i]);
        if(layers[i].scrollVertical) {
          layers[i].scrollVertical = layers[i].scrollVertical;
        }
      }
    }
  }

  function handleScrollingLayerTouchMove(event) {
    event.stopPropagation();
  }

  function handleScrollingLayerTouchStart(event) {
    var element = this._element,
        startTopScroll = element.scrollTop;

    if (startTopScroll <= 0) {
      element.scrollTop = 1;
    }

    if (startTopScroll + element.offsetHeight >= element.scrollHeight) {
      element.scrollTop = element.scrollHeight - element.offsetHeight - 1;
    }
  }

  patchScrollingLayers();
  preventScrollingOnRootElement();
})();
