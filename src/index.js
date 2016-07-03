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

  // UI utils:
  /**
   * Append any number of child elements to a container element
   * @param container
   * @returns {appendToContainer}
   */
  var appendChildren = function (container) {
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
  var strategies = ["amazon", "aol", "baidu", "bitbucket", "dropbox", "ebay", "facebook", "google", "instagram", "linkedin", "github", "paypal", "salesforce", "shopify", "soundcloud", "renren", "exact", "twitter", "yandex", "thecity", "planningcenter", "thirtysevensignals", "fitbit", "wordpress", "yahoo", "box", "vkontakte", "dwolla", "miicard", "yammer", "weibo", "windows", "microsoft"];

  var hasProp = function(props, prop) {
    var hasStrategy;
    if (props.hasOwnProperty(prop) && valid(props[prop])) {
      if (prop === 'strategy') {
        hasStrategy = strategies.indexOf(props[prop]) !== -1;

        if (!hasStrategy) return fail('The strategy specified is not present');
        return true;
      }
      return true;
    }
    return false;
  };

  var getContainer = function(container) {
    var response;

    if (container[0] === '#') {
      response = doc.getElementById(container.slice(1));

      if (!valid(response)) return fail('The id name is not valid');
      return response;
    }

    if (container[0] === '.') {
      response = doc.getElementsByClassName(container.slice(1))[0];

      if (!valid(response)) return fail('The class name is not valid');
      return response;
    }

    response = doc.getElementsByTagName(container)[0];

    if (!valid(response)) return fail('The tag name is not valid');
    return response;
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
      buttonInnerStrategy.innerText = props.strategy;
    }

    if (hasLabel) {
      buttonInnerText.innerText = props.label;
    }

    var container = appendChildren(buttonLabel);
    container(buttonInnerText, buttonInnerStrategy);

    return buttonLabel;
  };

  var createButton = function(props) {
    var buttonContainer = createButtonContainer(props);
    var buttonIcon = createIcon(props);
    var buttonLabel = createLabel(props);

    var container = appendChildren(buttonContainer);
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
    if (!hasProp(props, 'strategy') || !hasProp(props, 'container')) {
      return fail('You need to specify a strategy and a container');
    }

    // Build button
    var button = createButton(props);

    // Append button to DOM
    var container = getContainer(props.container);
    container.appendChild(button);
    return button;
  };

  return socialButton;
});
