(function() {
  //api
  var socialButton = {};

  // props
  socialButton.strategy = '';
  socialButton.isActive = '';
  socialButton.isFocused = '';

  // events
  socialButton.emit('onclick', function () {});
  socialButton.emit('onhover', function () {});
  socialButton.emit('onblur', function () {});
  socialButton.emit('onfocused', function () {});

  // methods
  socialButton.create = function(props, cb) {
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
    buttonInnerText.text = 'Login with ';
    var buttonInnerStrategy = doc.createElement('span');
    buttonInnerStrategy.text = props.strategy;
    // append all to parent


    
    // props is an object

    // if props doesnt have values return default style
    // add styles to the button

    // append events

    // return button
  };

}());