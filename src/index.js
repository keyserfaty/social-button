(function() {
  // utils
  // UI utils:
  // append elements to parent element
  // set list of attributes to element with object


  //api
  var socialButton = {};

  // props
  socialButton.strategy = '';
  socialButton.isActive = '';
  socialButton.isFocused = '';

  // events
  // socialButton.emit('onclick', function () {});
  // socialButton.emit('onhover', function () {});
  // socialButton.emit('onblur', function () {});
  // socialButton.emit('onfocused', function () {});

  // methods
  /**
   * Creates the social button
   * @param props: Object
   * @param cb: Function
   */
  socialButton.create = function(props, cb) {
    // props: all elements to lowercase

    // build button
    var doc = document;
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
    // append both to buttonContainer

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

    console.log(buttonContainer)




    // append events

    // return button
  };

  socialButton.create({
    strategy: 'facebook'
  }, function (res) {
    console.log(res);
  });

}());