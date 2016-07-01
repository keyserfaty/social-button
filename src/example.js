(function (socialButton) {
  var button = socialButton.create({
    strategy: 'facebook',
  });

  socialButton.container = 'div';

  button.onclick = function() {
    console.log('click');
  };
}(socialButton));