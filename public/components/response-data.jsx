'use strict';

var React = require('react');

module.exports = ResponseData;

function ResponseData () {
  React.Component.apply(this, arguments);
  this.state = {};
  var xhr = this.createXHR(this.props.req);
}

ResponseData.prototype = new React.Component();

ResponseData.prototype.createXHR = function (req) {
  var data = req.data;
  this.state = {};
  if (!data) { return; }
  var xhr = this.xhr = new XMLHttpRequest();
  // xhr handlers
  xhr.onload = this.handleSuccess.bind(this);
  xhr.ontimeout = this.handleTimeout.bind(this);
  xhr.onerror = this.handleError.bind(this);
  // send xhr
  try {
    xhr.open(data.method, data.url, true);
    xhr.withCredentials = (data.withCredentials === 'on');
    data.headers.split(/\n/g).forEach(function (headerKeyVal) {
      var split = headerKeyVal.split('=');
      var key = split[0] && split[0].trim();
      var val = split[1] && split[1].trim();
      if (key) {
        xhr.setRequestHeader(key, val);
      }
    });
    xhr.send(data.body);
    console.log(req.id, Date.now(), 'sent!');
  }
  catch (e) {
    this.handleError(e);
  }
};

ResponseData.prototype.handleSuccess = function () {
  if (this.state.data != null) { return; }
  var xhr = this.xhr;
  this.setState({
    body: xhr.responseText
  });
};

ResponseData.prototype.handleTimeout = function () {
  this.setState({
    body: 'TIMEOUT:TIMEOUT:TIMEOUT:TIMEOUT:TIMEOUT'
  });
};

ResponseData.prototype.handleError = function (err) {
  window.hey = this;
  var self = this;
  this.setState({
    body: err.stack || 'Possibly CORS Error'
  });
};

ResponseData.prototype.render = function () {
  return <form>
    <div className="form-group">
      <label for="response">Response</label>
      <textarea value={ this.state.body } className="form-control" disabled={ true } rows="2" cols="50" name="response">
      </textarea>
    </div>
  </form>;
};