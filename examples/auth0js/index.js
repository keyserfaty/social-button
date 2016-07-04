(function(socialButton) {
  // Define a strategy
  var strategy = 'github';

  // Register a new Auth0 instance
  var auth0 = new Auth0({
    domain:       'my-domain.com',
    clientID:     'XXX-XXXX-XXX-XXX',
    callbackURL:  'http://my-host/callback',
    callbackOnLocationHash: true
  });

  // Build a button
  var button = socialButton.create({
    strategy: strategy,
    container: '#container',
  });

  // Handle onclick event
  button.onclick = function() {
    auth0.login({
      connection: strategy
    });
  };

  // Once logged in..

  // Parse hash from the URL
  var result = auth0.parseHash(window.location.hash);

  // Use result.id_token to call your rest api

  if (result && result.id_token) {
    auth0.getProfile(result.id_token, function (err, profile) {
      alert('hello ' + profile.name);
    });
    // If offline_access was a requested scope
    // You can grab the result.refresh_token here

  } else if (result && result.error) {
    alert('error: ' + result.error);
  }

}(socialButton));
