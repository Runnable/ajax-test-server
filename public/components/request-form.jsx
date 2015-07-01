'use strict';

var React = require('react');
var formToObj = require('form-to-object');
var $responses = document.getElementById('responses');
var set = require('101/set');
var clone = require('101/clone');
var noop = require('101/noop');

module.exports = RequestForm;

function RequestForm () {
  React.Component.apply(this, arguments);
  this.onSubmit = this.props.onSubmit || noop;
  this.state = {
    formData: clone(this.props.formData || {}),
    disabled: this.props.disabled
  };
}

RequestForm.prototype = new React.Component();

RequestForm.prototype.render = function () {
  var disabled = this.state.disabled;
  var formData = this.state.formData;

  return <form onSubmit={ this.onSubmit }>
    <div className="col-sm-12">
      <div className="form-group">
        <label for="url">URL</label>
        <input className="form-control" disabled={ disabled } type="text" name="url" value={ formData.url } />
      </div>
    </div>
    <div className="col-sm-6">
      <div className="form-group">
        <label for="method">Method</label>
        <select className="form-control" value={ formData.method } defaultValue='GET' disabled={ disabled } required name="method">
          <option value="POST"  >POST</option>
          <option value="GET"   >GET</option>
          <option value="PUT"   >PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>
      <div className="form-group">
        <label for="body">Body</label>
        <textarea value={ formData.body } className="form-control" disabled={ disabled } rows="4" cols="50" name="body">
        </textarea>
      </div>
    </div>
    <div className="col-sm-6">
      <div className="form-group">
        <label for="headers">Headers</label>
        <textarea value={ formData.headers } className="form-control" disabled={ disabled } rows="2" cols="50" name="headers">
        </textarea>
      </div>
      <div className="checkbox">
        <label>
          <input type="checkbox" name="withCredentials" checked={ formData.withCredentials }>withCredentials</input>
        </label>
      </div>
      <div className="form-group">
        <label for="numRequests">NumRequests</label>
        <select className="form-control" value={ formData.numRequests } defaultValue='1' disabled={ disabled } required name="numRequests">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>
      <button className={ disabled ? 'hide' : '' } type="submit">Submit</button>
    </div>
  </form>;

  function isSelected (key, compare, isDefault) {
    var val = formData[key];
    return val ? (val === compare) : isDefault;
  }
};