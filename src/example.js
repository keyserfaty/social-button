(function (socialButton) {
  var button = socialButton.create({
    strategy: 'facebook',
    label: 'Twitter magic login',
    icon: 'http://simpleicon.com/wp-content/uploads/twitter.png',
    background: '#aaa',
  });

  socialButton.container = 'div';

  button.onclick = function() {
    console.log('click');
  };
}(socialButton));