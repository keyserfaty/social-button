(function(socialButton) {
  var button = socialButton.create({
    strategy: 'twitter',
    container: '.container',
    label: 'Twitter magic login',
    icon: 'http://simpleicon.com/wp-content/uploads/twitter.png',
    background: '#aaa',
  });

  var button2 = socialButton.create({
    strategy: 'facebook',
    container: '.container',
  });

  button.onclick = function() {
    console.log('click');
  };
}(socialButton))
