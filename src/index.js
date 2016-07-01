(function() {
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
  
  var addOwnClass = function() {
    
  };

  // UI utils:
  // append elements to parent element
  // set list of attributes to element with object


  //api
  var socialButton = {};

  // props
  socialButton.strategy = '';
  socialButton.isActive = '';
  socialButton.isFocused = '';

  // container element to add the button to
  socialButton.container = '';

  // events
  // create some other events?

  // methods
  /**
   * Creates the social button
   * @param props: Object
   * @param cb: Function
   */
  socialButton.create = function(props) {
    if (!hasStrategy(props)) {
      return fail('You need to specify a strategy');
    }

    var lProps = toLower(props);

    // basic selectors
    var doc = document;
    var body = doc.querySelector('body');
    
    var hasLabel = lProps.hasOwnProperty('label');
    var hasBackground = lProps.hasOwnProperty('background');
    var hasIcon = lProps.hasOwnProperty('icon');

    // build button
    var buttonContainer = doc.createElement('button');
    buttonContainer.setAttribute('data-provider', lProps.strategy);
    buttonContainer.setAttribute('tabindex', '1');
    buttonContainer.setAttribute('type', 'button');
    buttonContainer.setAttribute('class', 'auth0-lock-social-button');

    // set this class if no one is defined in props
    var buttonIcon = doc.createElement('div');
    buttonIcon.setAttribute('class', 'auth0-lock-social-button-icon');

    if (hasIcon) {
      buttonIcon.setAttribute('style', 'background-image: url(\'' + lProps.icon + '\'); background-size: 100%');
    }

    var buttonLabel = doc.createElement('div');
    buttonLabel.setAttribute('class', 'auth0-lock-social-button-text');

    var buttonInnerText = doc.createElement('span');
    var buttonInnerStrategy = doc.createElement('span');

    if (!hasLabel) {
      buttonInnerText.innerText = 'Login with ';
      buttonInnerStrategy.innerText = firstToUpper(lProps.strategy);
    }

    if (hasLabel) {
      buttonInnerText.innerText = lProps.label;
    }

    buttonLabel.appendChild(buttonInnerText);
    buttonLabel.appendChild(buttonInnerStrategy);

    buttonContainer.appendChild(buttonIcon);
    buttonContainer.appendChild(buttonLabel);

    // append to body
    body.appendChild(buttonContainer);

    return buttonContainer;
  };

  var button = socialButton.create({
    strategy: 'facebook',
    label: 'Magic label',
    icon: 'http://simpleicon.com/wp-content/uploads/twitter.png',
    background: '#ccc',
  });

  // back could be an hexa or a url?

  button.onclick = function() {
    console.log('click');
  };

}());