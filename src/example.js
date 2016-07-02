(function (socialButton) {
  var button = socialButton.create({
    strategy: 'twitter',
    container: 'div',
    label: 'Twitter magic login',
    icon: 'http://simpleicon.com/wp-content/uploads/twitter.png',
    background: '#aaa',
  });

  button.onclick = function() {
    console.log('click');
  };
}(socialButton));