'use strict';

var React = require('react');
var put = require('101/put');
var clone = require('101/clone');
var RequestForm = require('./request-form.jsx');
var ResponseData = require('./response-data.jsx');
var formToObj = require('form-to-object');
var reqId = 0;


module.exports = App;

function App () {
  React.Component.apply(this, arguments);
  this.state = {
    requests: []
  };
}

App.prototype = new React.Component();

App.prototype.handleSubmit = function (evt) {
  evt.preventDefault();
  var $form = evt.currentTarget;
  var data = formToObj($form);
  var requests = this.state.requests.slice();

  reqId++;
  requests.push({
    id: reqId,
    data: data
  });

  var newState = put(this.state, 'requests', requests);
  this.setState(newState);
};

App.prototype.render = function () {
  var self = this;
  var requests = this.state.requests;
  var responses = [];

  return <div className="container">
    <div className="row">
      <RequestForm onSubmit={ this.handleSubmit.bind(this) }/>
    </div>
    <hr/>
    <hr/>
    <hr/>
    {
      requests.reverse().map(function (req) {
        var reqCount = 0;
        var responses = [];
        var numRequests = parseInt(req.data.numRequests);
        if (isNaN(numRequests)) { numRequests = 1; }
        for(var i=0; i < req.data.numRequests; i++) {
          var uniqueReq = clone(req);
          uniqueReq.data.url = addQuery(req.data.url, 'uid', i);
          responses.push(
            <div className="row">
              <div className="col-sm-12">
                <ResponseData req={ uniqueReq } />
              </div>
            </div>
          );
        }
        return <div key={ req.id }>
          <div className="row">
            <RequestForm formData={ req.data } disabled={ true } />
          </div>
          { responses }
          <hr/>
        </div>
      })
    }
  </div>;
}

function addQuery (url, key, val) {
  var delimeter = (~url.indexOf('?')) ? '&' : '?'
  return url + delimeter + key + '=' + val;
}