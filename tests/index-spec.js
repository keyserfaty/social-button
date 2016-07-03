var jsdom = require('mocha-jsdom');
var expect = require('chai').expect;

var appendChilds = function appendChildren(container) {
  return function appendToContainer() {
    return Array.prototype.map.call(arguments, function (elem) {
      container.appendChild(elem);
    });
  }
};

var setAttributes = function(container, attrs) {
  Object.keys(attrs).map(function (key) {
    container.setAttribute(key, attrs[key]);
  });

  return container;
};

var createElementWithClass = function (tag, attrs) {
  var node = doc.createElement(tag);
  setAttributes(node, attrs);
  return node;
};

describe('mocha tests', function () {

  jsdom();

  it('has document', function () {
    var div = document.createElement('div');
    expect(div.nodeName).eql('DIV');
  });

});