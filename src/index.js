(function() {
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

  // API specific utils
  var hasStrategy = function(props) {
    return props.hasOwnProperty('strategy');
  };

  // UI utils:
  // append elements to parent element
  var appendChilds = function(container) {
    return function() {

    }
  };

  // set list of attributes to element with object
  var setAttributes = function(container, attrs) {
    Object.keys(attrs).map(function (key) {
      container.setAttribute(key, attrs[key]);
    });

    return container;
  };

  var createElementWithClass = function (tag, attrs) {
    var node = doc.createElement(tag);
    setAttributes(node, attrs);
    return node;
  };

  var addDynamicAttr = function(container, condition, attrs) {
    if (condition) setAttributes(container, attrs);
    return container;
  };

  // utils specific to the api
  var createButtonContainer = function(props) {
    var hasBackground = props.hasOwnProperty('background');
    var buttonAttrs = {
      'data-provider': props.strategy,
      'tabindex': 1,
      'type': 'button',
      'class': 'auth0-lock-social-button',
    };

    var buttonContainer = createElementWithClass('button', buttonAttrs);
    buttonContainer = addDynamicAttr(buttonContainer, hasBackground, {
      style: 'background-color: ' + props.background,
    });

    return buttonContainer;
  };

  var createIcon = function(props) {
    var hasIcon = props.hasOwnProperty('icon');
    var buttonIcon = createElementWithClass('div', {
      class: 'auth0-lock-social-button-icon'
    });

    buttonIcon = addDynamicAttr(buttonIcon, hasIcon, {
      style: 'background-image: url(\'' + props.icon + '\')',
      'background-size': '100%',
    });

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

    buttonLabel.appendChild(buttonInnerText);
    buttonLabel.appendChild(buttonInnerStrategy);

    return buttonLabel;
  };

  var createButton = function(props) {
    var buttonContainer = createButtonContainer(props);
    var buttonIcon = createIcon(props);
    var buttonLabel = createLabel(props);

    buttonContainer.appendChild(buttonIcon);
    buttonContainer.appendChild(buttonLabel);

    return buttonContainer;
  };

  //api
  var socialButton = {};

  // container element to add the button to
  socialButton.container = '';


  /**
   * Creates the social button
   * @param props: Object
   * @param cb: Function
   */
  socialButton.create = function(props) {
    if (!hasStrategy(props)) {
      return fail('You need to specify a strategy');
    }

    // Build button
    var lProps = toLower(props);
    var button = createButton(lProps);

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

  var button = socialButton.create({
    strategy: 'facebook',
    label: 'Magic label',
    icon: 'http://simpleicon.com/wp-content/uploads/twitter.png',
    background: '#ccc',
  });

  button.onclick = function() {
    console.log('click');
  };

}());