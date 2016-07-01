(function() {
  // UTILS
  // Basic utils:
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
       return col[elem] = col[elem].toLocaleLowerCase();
    });

    return col;
  };

  var firstToUpper = function(str) {
    return str[0].toUpperCase() + str.slice(1);
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
    // props: all elements to lowercase
    var lProps = toLower(props);
    console.log(lProps)
    console.log(firstToUpper('holi'))

    // build button
    var doc = document;
    var body = doc.querySelector('body');

    var buttonContainer = doc.createElement('button');
    buttonContainer.setAttribute('data-provider', props.strategy);
    buttonContainer.setAttribute('tabindex', '1');
    buttonContainer.setAttribute('type', 'button');
    buttonContainer.setAttribute('class', 'auth0-lock-social-button');

    // set this class if no one is defined in props
    var buttonIcon = doc.createElement('div');
    buttonIcon.setAttribute('class', 'auth0-lock-social-button-icon');

    var buttonLabel = doc.createElement('div');
    buttonLabel.setAttribute('class', 'auth0-lock-social-button-text');

    var buttonInnerText = doc.createElement('span');
    buttonInnerText.innerText = 'Login with ';
    var buttonInnerStrategy = doc.createElement('span');
    // first letter to uppercase
    buttonInnerStrategy.innerText = props.strategy;
    // append all to parent

    buttonLabel.appendChild(buttonInnerText);
    buttonLabel.appendChild(buttonInnerStrategy);

    buttonContainer.appendChild(buttonIcon);
    buttonContainer.appendChild(buttonLabel);

    // append to body
    body.appendChild(buttonContainer);

    return buttonContainer;
  };

  var button = socialButton.create({
    strategy: 'FACEBOOK',
    label: 'Mi red',
    icon: '',
    background: '',
  });

  // back could be an hexa or a url?

  button.onclick = function() {
    console.log('click');
  };

}());