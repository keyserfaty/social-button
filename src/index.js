(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory;
  } else {
    root.socialButton = factory();
  }
})(this, function() {
  'use strict';

  var doc = document;

  // Utils:
  var fail = function(err) {
    return console.log(err);
  };

  var existy = function (str) {
    return str != null;
  };

  var truthy = function(str) {
    return str !== false && existy(str);
  };

  var empty = function (str) {
    return str.length === 0;
  };

  var valid = function (str) {
    return truthy(str) && !empty(str);
  };

  var toLower = function(col) {
    if (Array.isArray(col)) {
      return col.map(function (elem) {
        return elem.toLowerCase();
      });
    }

    Object.keys(col).map(function (elem) {
      return col[elem] = col[elem].toLowerCase();
    });

    return col;
  };

  var firstToUpper = function(str) {
    return str[0].toUpperCase() + str.slice(1);
  };

  // UI utils:
  /**
   * Append any number of child elements to a container element
   * @param container
   * @returns {appendToContainer}
   */
  var appendChilds = function appendChildren(container) {
    return function appendToContainer() {
      return Array.prototype.map.call(arguments, function (elem) {
        container.appendChild(elem);
      });
    }
  };

  /**
   * Set any number of attributes to a DOM element
   * @param container
   * @param attrs
   * @returns {*}
   */
  var setAttributes = function(container, attrs) {
    Object.keys(attrs).map(function (key) {
      container.setAttribute(key, attrs[key]);
    });

    return container;
  };

  /**
   * Create an element with a predefined class
   * @param tag
   * @param attrs
   * @returns {Element}
   */
  var createElementWithClass = function (tag, attrs) {
    var node = doc.createElement(tag);
    setAttributes(node, attrs);
    return node;
  };

  // API specific utils
  var hasProp = function(props, prop) {
    return props.hasOwnProperty(prop) && valid(props[prop]);
  };

  var createButtonContainer = function(props) {
    var hasBackground = props.hasOwnProperty('background');
    var buttonAttrs = {
      'data-provider': props.strategy,
      'tabindex': 1,
      'type': 'button',
      'class': 'auth0-lock-social-button',
    };

    var buttonContainer = createElementWithClass('button', buttonAttrs);
    if (hasBackground) {
      buttonContainer = setAttributes(buttonContainer, {
        style: 'background-color: ' + props.background,
      });

      return buttonContainer;
    }

    return buttonContainer;
  };

  var createIcon = function(props) {
    var hasIcon = props.hasOwnProperty('icon');
    var buttonIcon = createElementWithClass('div', {
      class: 'auth0-lock-social-button-icon'
    });

    if (hasIcon) {
      buttonIcon = setAttributes(buttonIcon, {
        style: 'background-image: url(\'' + props.icon + '\')',
        'background-size': '100%',
      });

      return buttonIcon;
    }

    return buttonIcon;
  };

  var createLabel = function(props) {
    var hasLabel = props.hasOwnProperty('label');

    var buttonLabel = createElementWithClass('div', {
      class: 'auth0-lock-social-button-text',
    });

    var buttonInnerText = doc.createElement('span');
    var buttonInnerStrategy = doc.createElement('span');

    if (!hasLabel) {
      buttonInnerText.innerText = 'Login with ';
      buttonInnerStrategy.innerText = firstToUpper(props.strategy);
    }

    if (hasLabel) {
      buttonInnerText.innerText = props.label;
    }

    var container = appendChilds(buttonLabel);
    container(buttonInnerText, buttonInnerStrategy);

    return buttonLabel;
  };

  var createButton = function(props) {
    var buttonContainer = createButtonContainer(props);
    var buttonIcon = createIcon(props);
    var buttonLabel = createLabel(props);

    var container = appendChilds(buttonContainer);
    container(buttonIcon, buttonLabel);

    return buttonContainer;
  };

  // API
  var socialButton = {};

  /**
   * Creates the social button
   * @param props: Object.
   */
  socialButton.create = function(props) {
    if (!hasProp(props, 'strategy')) {
      return fail('You need to specify a strategy');
    }

    // Build button
    var button = createButton(props);

    // Append button to DOM
    if (!valid(this.container)) {
      var body = doc.querySelector('body');
      body.appendChild(button);
      return button;
    }

    var container = doc.querySelector(this.container);
    container.appendChild(button);
    return button;
  };

  return socialButton;
});
