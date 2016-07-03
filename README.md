SocialButton
===================

**SocialButton** is a simple js button that is styled as a social network you specify. It also lets you customise the icon, background color and label text it displays.

----------


Create a button
---------------

To build a button you just need to specify a **social network** and a **container** element. You can find a complete list of all the social networks that are supported [here](#Social networks supported).
```javascript
var myButton = socialButton.create({
   strategy: 'facebook',
   container: '.container',
 });
```

This will build a basic button with the background color and icon of Facebook. You can customise the label text, background color and icon of the button like this:

```javascript
var myButton = socialButton.create({
   strategy: 'facebook',
   container: '.container',
   label: 'Facebook magic login text',
   icon: 'http://simpleicon.com/wp-content/uploads/facebook.png',
   background: '#aaa',
 });
```

After that you can simply listen for events of the button as you would with any other DOM element:
```javascript
myButton.onclick = function() {
   console.log('click');
 };
```

API
---


SocialButton has only a simple method: **create**. This method expects an object as its first argument. This is the list of properties it can have:

**Properties**

| Property      | Type | Description                              |
|------------|---------|---------------------------------|
| strategy *(required)* | String | A social network name. You can find a complete list of all the strategies supported [here](#Social networks supported) |
| container *(required)*  | String | A container element where you want the button to be placed. You can get the container element by class, id or tag name. To do that you must specify the element name as `.container`, `#container` or `container` accordingly |
| label | String | The text to be displayed in the button |
| icon |String | A url of the icon     |
| background |  String | An hexadecimal value like `#AAAAAA`     |


**Social networks supported**

`amazon`, `aol`, `baidu`, `bitbucket`, `dropbox`, `ebay`, `facebook`, `google`, `instagram`, `linkedin`, `github`, `paypal`, `salesforce`, `shopify`, `soundcloud`, `renren`, `exact`, `twitter`, `yandex`, `thecity`, `planningcenter`, `thirtysevensignals`, `fitbit`, `wordpress`, `yahoo`, `box`, `vkontakte`, `dwolla`, `miicard`, `yammer`, `weibo`, `windows`, `microsoft`


Using the button with Auth0.js
------------------------------


You can integrate `Auth0.js` to perform a real login. First of all you will need to create a new `Auth0` instance:

```javascript
// Register a new Auth0 instance
 var auth0 = new Auth0({
   domain:       'my-domain.com',
   clientID:     'XXX-XXXX-XXX-XXX',
   callbackURL:  'http://my-host/callback',
   callbackOnLocationHash: true
 });
```

Then you will need to create a **SocialButton** and handle the button's `onclick` event to start the login:

```javascript
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
```

Once the user is logged in you will be redirected to the callback URL you specified with the user's token:

```javascript
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
```
