/* eslint-disable */
// CommonJS package manager support
if (typeof module !== 'undefined' && typeof exports !== 'undefined' &&
  module.exports === exports) {
  // Export the *name* of this Angular module
  // Sample usage:
  //
  //   import lbServices from './lb-services';
  //   angular.module('app', [lbServices]);
  //
  module.exports = "lbServices";
}

(function (window, angular, undefined) {
  'use strict';
  
  var urlBase = "/api";
  var authHeader = 'authorization';
  
  function getHost(url) {
    var m = url.match(/^(?:https?:)?\/\/([^\/]+)/);
    return m ? m[1] : null;
  }
  
  var urlBaseHost = getHost(urlBase) || location.host;
  
  /**
   * @ngdoc overview
   * @name lbServices
   * @module
   * @description
   *
   * The `lbServices` module provides services for interacting with
   * the models exposed by the LoopBack server via the REST API.
   *
   */
  var module = angular.module("lbServices", ['ngResource']);
  
  /**
   * @ngdoc object
   * @name lbServices.User
   * @header lbServices.User
   * @object
   *
   * @description
   *
   * A $resource object for interacting with the `User` model.
   *
   * ## Example
   *
   * See
   * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
   * for an example of using this object.
   *
   */
  module.factory(
    "User",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function (LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
          urlBase + "/users/:id",
          {'id': '@id'},
          {
            
            /**
             * @ngdoc method
             * @name lbServices.User#prototype$__findById__accessTokens
             * @methodOf lbServices.User
             *
             * @description
             *
             * Find a related item by id for accessTokens.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for accessTokens
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "prototype$__findById__accessTokens": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/users/:id/accessTokens/:fk",
              method: "GET",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.User#prototype$__destroyById__accessTokens
             * @methodOf lbServices.User
             *
             * @description
             *
             * Delete a related item by id for accessTokens.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for accessTokens
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "prototype$__destroyById__accessTokens": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/users/:id/accessTokens/:fk",
              method: "DELETE",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.User#prototype$__updateById__accessTokens
             * @methodOf lbServices.User
             *
             * @description
             *
             * Update a related item by id for accessTokens.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             *  - `fk` – `{*}` - Foreign key for accessTokens
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "prototype$__updateById__accessTokens": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/users/:id/accessTokens/:fk",
              method: "PUT",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.User#prototype$__get__accessTokens
             * @methodOf lbServices.User
             *
             * @description
             *
             * Queries accessTokens of user.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             *  - `options` – `{object=}` -
             *
             *  - `filter` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "prototype$__get__accessTokens": {
              isArray: true,
              url: urlBase + "/users/:id/accessTokens",
              method: "GET",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.User#prototype$__create__accessTokens
             * @methodOf lbServices.User
             *
             * @description
             *
             * Creates a new instance in accessTokens of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "prototype$__create__accessTokens": {
              url: urlBase + "/users/:id/accessTokens",
              method: "POST",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.User#prototype$__delete__accessTokens
             * @methodOf lbServices.User
             *
             * @description
             *
             * Deletes all accessTokens of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "prototype$__delete__accessTokens": {
              url: urlBase + "/users/:id/accessTokens",
              method: "DELETE",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.User#prototype$__count__accessTokens
             * @methodOf lbServices.User
             *
             * @description
             *
             * Counts accessTokens of user.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "prototype$__count__accessTokens": {
              url: urlBase + "/users/:id/accessTokens/count",
              method: "GET",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.User#create
             * @methodOf lbServices.User
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "create": {
              url: urlBase + "/users",
              method: "POST",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.User#createMany
             * @methodOf lbServices.User
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "createMany": {
              isArray: true,
              url: urlBase + "/users",
              method: "POST",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.User#patchOrCreate
             * @methodOf lbServices.User
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "patchOrCreate": {
              url: urlBase + "/users",
              method: "PATCH",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.User#replaceOrCreate
             * @methodOf lbServices.User
             *
             * @description
             *
             * Replace an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "replaceOrCreate": {
              url: urlBase + "/users/replaceOrCreate",
              method: "POST",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.User#upsertWithWhere
             * @methodOf lbServices.User
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "upsertWithWhere": {
              url: urlBase + "/users/upsertWithWhere",
              method: "POST",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.User#exists
             * @methodOf lbServices.User
             *
             * @description
             *
             * Check whether a model instance exists in the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `exists` – `{boolean=}` -
             */
            "exists": {
              url: urlBase + "/users/:id/exists",
              method: "GET",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.User#findById
             * @methodOf lbServices.User
             *
             * @description
             *
             * Find a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/users/:id",
              method: "GET",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.User#replaceById
             * @methodOf lbServices.User
             *
             * @description
             *
             * Replace attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "replaceById": {
              url: urlBase + "/users/:id/replace",
              method: "POST",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.User#find
             * @methodOf lbServices.User
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/users",
              method: "GET",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.User#findOne
             * @methodOf lbServices.User
             *
             * @description
             *
             * Find first instance of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "findOne": {
              url: urlBase + "/users/findOne",
              method: "GET",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.User#destroyAll
             * @methodOf lbServices.User
             *
             * @description
             *
             * Delete all matching records.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - filter.where object
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * The number of instances deleted
             */
            "destroyAll": {
              url: urlBase + "/users",
              method: "DELETE",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.User#updateAll
             * @methodOf lbServices.User
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
            "updateAll": {
              url: urlBase + "/users/update",
              method: "POST",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.User#deleteById
             * @methodOf lbServices.User
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "deleteById": {
              url: urlBase + "/users/:id",
              method: "DELETE",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.User#count
             * @methodOf lbServices.User
             *
             * @description
             *
             * Count instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "count": {
              url: urlBase + "/users/count",
              method: "GET",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.User#prototype$patchAttributes
             * @methodOf lbServices.User
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "prototype$patchAttributes": {
              url: urlBase + "/users/:id",
              method: "PATCH",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.User#createChangeStream
             * @methodOf lbServices.User
             *
             * @description
             *
             * Create a change stream.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `changes` – `{ReadableStream=}` -
             */
            "createChangeStream": {
              url: urlBase + "/users/change-stream",
              method: "POST",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.User#login
             * @methodOf lbServices.User
             *
             * @description
             *
             * Login a user with username/email and password.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `include` – `{string=}` - Related objects to include in the response. See the description of return value for more details.
             *   Default value: `user`.
             *
             *  - `rememberMe` - `boolean` - Whether the authentication credentials
             *     should be remembered in localStorage across app/browser restarts.
             *     Default: `true`.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * The response body contains properties of the AccessToken created on login.
             * Depending on the value of `include` parameter, the body may contain additional properties:
             *   - `user` - `U+007BUserU+007D` - Data of the currently logged in user. (`include=user`)
             *
             */
            "login": {
              params: {
                include: 'user',
              },
              interceptor: {
                response: function (response) {
                  var accessToken = response.data;
                  LoopBackAuth.setUser(
                    accessToken.id, accessToken.userId, accessToken.user);
                  LoopBackAuth.rememberMe =
                    response.config.params.rememberMe !== false;
                  LoopBackAuth.save();
                  return response.resource;
                },
              },
              url: urlBase + "/users/login",
              method: "POST",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.User#logout
             * @methodOf lbServices.User
             *
             * @description
             *
             * Logout a user with access token.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `access_token` – `{string=}` - Do not supply this argument, it is automatically extracted from request headers.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "logout": {
              interceptor: {
                response: function (response) {
                  LoopBackAuth.clearUser();
                  LoopBackAuth.clearStorage();
                  return response.resource;
                },
                responseError: function (responseError) {
                  LoopBackAuth.clearUser();
                  LoopBackAuth.clearStorage();
                  return responseError.resource;
                },
              },
              url: urlBase + "/users/logout",
              method: "POST",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.User#prototype$verify
             * @methodOf lbServices.User
             *
             * @description
             *
             * Trigger user's identity verification with configured verifyOptions
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - user id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `verifyOptions` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "prototype$verify": {
              url: urlBase + "/users/:id/verify",
              method: "POST",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.User#confirm
             * @methodOf lbServices.User
             *
             * @description
             *
             * Confirm a user registration with identity verification token.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `uid` – `{string}` -
             *
             *  - `token` – `{string}` -
             *
             *  - `redirect` – `{string=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "confirm": {
              url: urlBase + "/users/confirm",
              method: "GET",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.User#resetPassword
             * @methodOf lbServices.User
             *
             * @description
             *
             * Reset password for a user with email.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "resetPassword": {
              url: urlBase + "/users/reset",
              method: "POST",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.User#changePassword
             * @methodOf lbServices.User
             *
             * @description
             *
             * Change a user's password.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `id` – `{*=}` -
             *
             *  - `oldPassword` – `{string}` -
             *
             *  - `newPassword` – `{string}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "changePassword": {
              url: urlBase + "/users/change-password",
              method: "POST",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.User#setPassword
             * @methodOf lbServices.User
             *
             * @description
             *
             * Reset user's password via a password-reset token.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `id` – `{*=}` -
             *
             *  - `newPassword` – `{string}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "setPassword": {
              url: urlBase + "/users/reset-password",
              method: "POST",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.User#usernameAvailable
             * @methodOf lbServices.User
             *
             * @description
             *
             * <em>
             * (The remote method definition does not provide any description.)
             * </em>
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `username` – `{string}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `available` – `{Boolean=}` -
             */
            "usernameAvailable": {
              url: urlBase + "/users/available/:username",
              method: "GET",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.User#username2id
             * @methodOf lbServices.User
             *
             * @description
             *
             * <em>
             * (The remote method definition does not provide any description.)
             * </em>
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `username` – `{string}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "username2id": {
              url: urlBase + "/users/username2id/:username",
              method: "GET",
            },
            
            // INTERNAL. Use Org.admins.link() instead.
            "::link::Org::admins": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/orgs/:id/admins/rel/:fk",
              method: "PUT",
            },
            
            // INTERNAL. Use Org.admins.unlink() instead.
            "::unlink::Org::admins": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/orgs/:id/admins/rel/:fk",
              method: "DELETE",
            },
            
            // INTERNAL. Use Org.admins() instead.
            "::get::Org::admins": {
              isArray: true,
              url: urlBase + "/orgs/:id/admins",
              method: "GET",
            },
            
            // INTERNAL. Use Catalog.owners.link() instead.
            "::link::Catalog::owners": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/catalog/:id/owners/rel/:fk",
              method: "PUT",
            },
            
            // INTERNAL. Use Catalog.owners.unlink() instead.
            "::unlink::Catalog::owners": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/catalog/:id/owners/rel/:fk",
              method: "DELETE",
            },
            
            // INTERNAL. Use Catalog.readers.link() instead.
            "::link::Catalog::readers": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/catalog/:id/readers/rel/:fk",
              method: "PUT",
            },
            
            // INTERNAL. Use Catalog.readers.unlink() instead.
            "::unlink::Catalog::readers": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/catalog/:id/readers/rel/:fk",
              method: "DELETE",
            },
            
            // INTERNAL. Use Catalog.owners() instead.
            "::get::Catalog::owners": {
              isArray: true,
              url: urlBase + "/catalog/:id/owners",
              method: "GET",
            },
            
            // INTERNAL. Use Catalog.readers() instead.
            "::get::Catalog::readers": {
              isArray: true,
              url: urlBase + "/catalog/:id/readers",
              method: "GET",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.User#getCurrent
             * @methodOf lbServices.User
             *
             * @description
             *
             * Get data of the currently logged user. Fail with HTTP result 401
             * when there is no user logged in.
             *
             * @param {function(Object,Object)=} successCb
             *    Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *    `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             */
            'getCurrent': {
              url: urlBase + "/users" + '/:id',
              method: 'GET',
              params: {
                id: function () {
                  var id = LoopBackAuth.currentUserId;
                  if (id == null) id = '__anonymous__';
                  return id;
                },
              },
              interceptor: {
                response: function (response) {
                  LoopBackAuth.currentUserData = response.data;
                  return response.resource;
                },
                responseError: function (responseError) {
                  LoopBackAuth.clearUser();
                  LoopBackAuth.clearStorage();
                  return $q.reject(responseError);
                },
              },
              __isGetCurrentUser__: true,
            },
          }
        );
        
        
        /**
         * @ngdoc method
         * @name lbServices.User#upsert
         * @methodOf lbServices.User
         *
         * @description
         *
         * Patch an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `data` – `{object=}` - Model instance data
         *
         *  - `options` – `{object=}` -
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        R["upsert"] = R["patchOrCreate"];
        
        /**
         * @ngdoc method
         * @name lbServices.User#updateOrCreate
         * @methodOf lbServices.User
         *
         * @description
         *
         * Patch an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `data` – `{object=}` - Model instance data
         *
         *  - `options` – `{object=}` -
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        R["updateOrCreate"] = R["patchOrCreate"];
        
        /**
         * @ngdoc method
         * @name lbServices.User#patchOrCreateWithWhere
         * @methodOf lbServices.User
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source based on the where criteria.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         *  - `data` – `{object=}` - An object of model property name/value pairs
         *
         *  - `options` – `{object=}` -
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        R["patchOrCreateWithWhere"] = R["upsertWithWhere"];
        
        /**
         * @ngdoc method
         * @name lbServices.User#update
         * @methodOf lbServices.User
         *
         * @description
         *
         * Update instances of the model matched by {{where}} from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         *  - `data` – `{object=}` - An object of model property name/value pairs
         *
         *  - `options` – `{object=}` -
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Information related to the outcome of the operation
         */
        R["update"] = R["updateAll"];
        
        /**
         * @ngdoc method
         * @name lbServices.User#destroyById
         * @methodOf lbServices.User
         *
         * @description
         *
         * Delete a model instance by {{id}} from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `options` – `{object=}` -
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];
        
        /**
         * @ngdoc method
         * @name lbServices.User#removeById
         * @methodOf lbServices.User
         *
         * @description
         *
         * Delete a model instance by {{id}} from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `options` – `{object=}` -
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];
        
        /**
         * @ngdoc method
         * @name lbServices.User#prototype$updateAttributes
         * @methodOf lbServices.User
         *
         * @description
         *
         * Patch attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - user id
         *
         *  - `options` – `{object=}` -
         *
         *  - `data` – `{object=}` - An object of model property name/value pairs
         *
         *  - `options` – `{object=}` -
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        R["prototype$updateAttributes"] = R["prototype$patchAttributes"];
        
        /**
         * @ngdoc method
         * @name lbServices.User#getCachedCurrent
         * @methodOf lbServices.User
         *
         * @description
         *
         * Get data of the currently logged user that was returned by the last
         * call to {@link lbServices.User#login} or
         * {@link lbServices.User#getCurrent}. Return null when there
         * is no user logged in or the data of the current user were not fetched
         * yet.
         *
         * @returns {Object} A User instance.
         */
        R.getCachedCurrent = function () {
          var data = LoopBackAuth.currentUserData;
          return data ? new R(data) : null;
        };
        
        /**
         * @ngdoc method
         * @name lbServices.User#isAuthenticated
         * @methodOf lbServices.User
         *
         * @returns {boolean} True if the current user is authenticated (logged in).
         */
        R.isAuthenticated = function () {
          return this.getCurrentId() != null;
        };
        
        /**
         * @ngdoc method
         * @name lbServices.User#getCurrentId
         * @methodOf lbServices.User
         *
         * @returns {Object} Id of the currently logged-in user or null.
         */
        R.getCurrentId = function () {
          return LoopBackAuth.currentUserId;
        };
        
        /**
         * @ngdoc property
         * @name lbServices.User#modelName
         * @propertyOf lbServices.User
         * @description
         * The name of the model represented by this $resource,
         * i.e. `User`.
         */
        R.modelName = "User";
        
        
        return R;
      }]);
  
  /**
   * @ngdoc object
   * @name lbServices.Org
   * @header lbServices.Org
   * @object
   *
   * @description
   *
   * A $resource object for interacting with the `Org` model.
   *
   * ## Example
   *
   * See
   * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
   * for an example of using this object.
   *
   */
  module.factory(
    "Org",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function (LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
          urlBase + "/orgs/:id",
          {'id': '@id'},
          {
            
            // INTERNAL. Use Org.admins.link() instead.
            "prototype$__link__admins": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/orgs/:id/admins/rel/:fk",
              method: "PUT",
            },
            
            // INTERNAL. Use Org.admins.unlink() instead.
            "prototype$__unlink__admins": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/orgs/:id/admins/rel/:fk",
              method: "DELETE",
            },
            
            // INTERNAL. Use Org.admins() instead.
            "prototype$__get__admins": {
              isArray: true,
              url: urlBase + "/orgs/:id/admins",
              method: "GET",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.Org#create
             * @methodOf lbServices.Org
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Org` object.)
             * </em>
             */
            "create": {
              url: urlBase + "/orgs",
              method: "POST",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.Org#createMany
             * @methodOf lbServices.Org
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Org` object.)
             * </em>
             */
            "createMany": {
              isArray: true,
              url: urlBase + "/orgs",
              method: "POST",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.Org#exists
             * @methodOf lbServices.Org
             *
             * @description
             *
             * Check whether a model instance exists in the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `exists` – `{boolean=}` -
             */
            "exists": {
              url: urlBase + "/orgs/:id/exists",
              method: "GET",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.Org#findById
             * @methodOf lbServices.Org
             *
             * @description
             *
             * Find a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Org` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/orgs/:id",
              method: "GET",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.Org#find
             * @methodOf lbServices.Org
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Org` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/orgs",
              method: "GET",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.Org#count
             * @methodOf lbServices.Org
             *
             * @description
             *
             * Count instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "count": {
              url: urlBase + "/orgs/count",
              method: "GET",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.Org#createChangeStream
             * @methodOf lbServices.Org
             *
             * @description
             *
             * Create a change stream.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `changes` – `{ReadableStream=}` -
             */
            "createChangeStream": {
              url: urlBase + "/orgs/change-stream",
              method: "POST",
            },
            
            // INTERNAL. Use Catalog.org() instead.
            "::get::Catalog::org": {
              url: urlBase + "/catalog/:id/org",
              method: "GET",
            },
          }
        );
        
        
        /**
         * @ngdoc property
         * @name lbServices.Org#modelName
         * @propertyOf lbServices.Org
         * @description
         * The name of the model represented by this $resource,
         * i.e. `Org`.
         */
        R.modelName = "Org";
        
        /**
         * @ngdoc object
         * @name lbServices.Org.admins
         * @header lbServices.Org.admins
         * @object
         * @description
         *
         * The object `Org.admins` groups methods
         * manipulating `User` instances related to `Org`.
         *
         * Call {@link lbServices.Org#admins Org.admins()}
         * to query all related instances.
         */
        
        
        /**
         * @ngdoc method
         * @name lbServices.Org#admins
         * @methodOf lbServices.Org
         *
         * @description
         *
         * Queries admins of org.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - org id
         *
         *  - `options` – `{object=}` -
         *
         *  - `filter` – `{object=}` -
         *
         *  - `options` – `{object=}` -
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        R.admins = function () {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::get::Org::admins"];
          return action.apply(R, arguments);
        };
        
        /**
         * @ngdoc method
         * @name lbServices.Org.admins#link
         * @methodOf lbServices.Org.admins
         *
         * @description
         *
         * Add a related item by id for admins.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - org id
         *
         *  - `fk` – `{*}` - Foreign key for admins
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` -
         *
         *  - `options` – `{object=}` -
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        R.admins.link = function () {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::link::Org::admins"];
          return action.apply(R, arguments);
        };
        
        /**
         * @ngdoc method
         * @name lbServices.Org.admins#unlink
         * @methodOf lbServices.Org.admins
         *
         * @description
         *
         * Remove the admins relation to an item by id.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - org id
         *
         *  - `options` – `{object=}` -
         *
         *  - `fk` – `{*}` - Foreign key for admins
         *
         *  - `options` – `{object=}` -
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.admins.unlink = function () {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::unlink::Org::admins"];
          return action.apply(R, arguments);
        };
        
        
        return R;
      }]);
  
  /**
   * @ngdoc object
   * @name lbServices.Catalog
   * @header lbServices.Catalog
   * @object
   *
   * @description
   *
   * A $resource object for interacting with the `Catalog` model.
   *
   * ## Example
   *
   * See
   * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
   * for an example of using this object.
   *
   */
  module.factory(
    "Catalog",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function (LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
          urlBase + "/catalog/:id",
          {'id': '@id'},
          {
            
            // INTERNAL. Use Catalog.org() instead.
            "prototype$__get__org": {
              url: urlBase + "/catalog/:id/org",
              method: "GET",
            },
            
            // INTERNAL. Use Catalog.owners.link() instead.
            "prototype$__link__owners": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/catalog/:id/owners/rel/:fk",
              method: "PUT",
            },
            
            // INTERNAL. Use Catalog.owners.unlink() instead.
            "prototype$__unlink__owners": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/catalog/:id/owners/rel/:fk",
              method: "DELETE",
            },
            
            // INTERNAL. Use Catalog.readers.link() instead.
            "prototype$__link__readers": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/catalog/:id/readers/rel/:fk",
              method: "PUT",
            },
            
            // INTERNAL. Use Catalog.readers.unlink() instead.
            "prototype$__unlink__readers": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/catalog/:id/readers/rel/:fk",
              method: "DELETE",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.Catalog#prototype$__findById__entries
             * @methodOf lbServices.Catalog
             *
             * @description
             *
             * Find a related item by id for entries.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - catalog id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for entries
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Catalog` object.)
             * </em>
             */
            "prototype$__findById__entries": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/catalog/:id/entries/:fk",
              method: "GET",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.Catalog#prototype$__destroyById__entries
             * @methodOf lbServices.Catalog
             *
             * @description
             *
             * Delete a related item by id for entries.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - catalog id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for entries
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "prototype$__destroyById__entries": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/catalog/:id/entries/:fk",
              method: "DELETE",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.Catalog#prototype$__updateById__entries
             * @methodOf lbServices.Catalog
             *
             * @description
             *
             * Update a related item by id for entries.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - catalog id
             *
             *  - `fk` – `{*}` - Foreign key for entries
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Catalog` object.)
             * </em>
             */
            "prototype$__updateById__entries": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/catalog/:id/entries/:fk",
              method: "PUT",
            },
            
            // INTERNAL. Use Catalog.owners() instead.
            "prototype$__get__owners": {
              isArray: true,
              url: urlBase + "/catalog/:id/owners",
              method: "GET",
            },
            
            // INTERNAL. Use Catalog.readers() instead.
            "prototype$__get__readers": {
              isArray: true,
              url: urlBase + "/catalog/:id/readers",
              method: "GET",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.Catalog#prototype$__get__entries
             * @methodOf lbServices.Catalog
             *
             * @description
             *
             * Queries entries of catalog.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - catalog id
             *
             *  - `options` – `{object=}` -
             *
             *  - `filter` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Catalog` object.)
             * </em>
             */
            "prototype$__get__entries": {
              isArray: true,
              url: urlBase + "/catalog/:id/entries",
              method: "GET",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.Catalog#prototype$__create__entries
             * @methodOf lbServices.Catalog
             *
             * @description
             *
             * Creates a new instance in entries of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - catalog id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Catalog` object.)
             * </em>
             */
            "prototype$__create__entries": {
              url: urlBase + "/catalog/:id/entries",
              method: "POST",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.Catalog#prototype$__count__entries
             * @methodOf lbServices.Catalog
             *
             * @description
             *
             * Counts entries of catalog.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - catalog id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "prototype$__count__entries": {
              url: urlBase + "/catalog/:id/entries/count",
              method: "GET",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.Catalog#create
             * @methodOf lbServices.Catalog
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Catalog` object.)
             * </em>
             */
            "create": {
              url: urlBase + "/catalog",
              method: "POST",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.Catalog#createMany
             * @methodOf lbServices.Catalog
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Catalog` object.)
             * </em>
             */
            "createMany": {
              isArray: true,
              url: urlBase + "/catalog",
              method: "POST",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.Catalog#exists
             * @methodOf lbServices.Catalog
             *
             * @description
             *
             * Check whether a model instance exists in the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `exists` – `{boolean=}` -
             */
            "exists": {
              url: urlBase + "/catalog/:id/exists",
              method: "GET",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.Catalog#findById
             * @methodOf lbServices.Catalog
             *
             * @description
             *
             * Find a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Catalog` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/catalog/:id",
              method: "GET",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.Catalog#find
             * @methodOf lbServices.Catalog
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Catalog` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/catalog",
              method: "GET",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.Catalog#count
             * @methodOf lbServices.Catalog
             *
             * @description
             *
             * Count instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "count": {
              url: urlBase + "/catalog/count",
              method: "GET",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.Catalog#createChangeStream
             * @methodOf lbServices.Catalog
             *
             * @description
             *
             * Create a change stream.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `changes` – `{ReadableStream=}` -
             */
            "createChangeStream": {
              url: urlBase + "/catalog/change-stream",
              method: "POST",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.Catalog#owned
             * @methodOf lbServices.Catalog
             *
             * @description
             *
             * <em>
             * (The remote method definition does not provide any description.)
             * </em>
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Catalog` object.)
             * </em>
             */
            "owned": {
              isArray: true,
              url: urlBase + "/catalog/owned",
              method: "GET",
            },
            
            /**
             * @ngdoc method
             * @name lbServices.Catalog#idxAvailable
             * @methodOf lbServices.Catalog
             *
             * @description
             *
             * <em>
             * (The remote method definition does not provide any description.)
             * </em>
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `orgIdx` – `{string}` -
             *
             *  - `catalogIdx` – `{string}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `available` – `{Boolean=}` -
             */
            "idxAvailable": {
              url: urlBase + "/catalog/available/:orgIdx/:catalogIdx",
              method: "GET",
            },
          }
        );
        
        
        /**
         * @ngdoc property
         * @name lbServices.Catalog#modelName
         * @propertyOf lbServices.Catalog
         * @description
         * The name of the model represented by this $resource,
         * i.e. `Catalog`.
         */
        R.modelName = "Catalog";
        
        
        /**
         * @ngdoc method
         * @name lbServices.Catalog#org
         * @methodOf lbServices.Catalog
         *
         * @description
         *
         * Fetches belongsTo relation org.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - catalog id
         *
         *  - `options` – `{object=}` -
         *
         *  - `refresh` – `{boolean=}` -
         *
         *  - `options` – `{object=}` -
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Org` object.)
         * </em>
         */
        R.org = function () {
          var TargetResource = $injector.get("Org");
          var action = TargetResource["::get::Catalog::org"];
          return action.apply(R, arguments);
        };
        /**
         * @ngdoc object
         * @name lbServices.Catalog.owners
         * @header lbServices.Catalog.owners
         * @object
         * @description
         *
         * The object `Catalog.owners` groups methods
         * manipulating `User` instances related to `Catalog`.
         *
         * Call {@link lbServices.Catalog#owners Catalog.owners()}
         * to query all related instances.
         */
        
        
        /**
         * @ngdoc method
         * @name lbServices.Catalog#owners
         * @methodOf lbServices.Catalog
         *
         * @description
         *
         * Queries owners of catalog.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - catalog id
         *
         *  - `options` – `{object=}` -
         *
         *  - `filter` – `{object=}` -
         *
         *  - `options` – `{object=}` -
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        R.owners = function () {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::get::Catalog::owners"];
          return action.apply(R, arguments);
        };
        
        /**
         * @ngdoc method
         * @name lbServices.Catalog.owners#link
         * @methodOf lbServices.Catalog.owners
         *
         * @description
         *
         * Add a related item by id for owners.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - catalog id
         *
         *  - `fk` – `{*}` - Foreign key for owners
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` -
         *
         *  - `options` – `{object=}` -
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        R.owners.link = function () {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::link::Catalog::owners"];
          return action.apply(R, arguments);
        };
        
        /**
         * @ngdoc method
         * @name lbServices.Catalog.owners#unlink
         * @methodOf lbServices.Catalog.owners
         *
         * @description
         *
         * Remove the owners relation to an item by id.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - catalog id
         *
         *  - `options` – `{object=}` -
         *
         *  - `fk` – `{*}` - Foreign key for owners
         *
         *  - `options` – `{object=}` -
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.owners.unlink = function () {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::unlink::Catalog::owners"];
          return action.apply(R, arguments);
        };
        /**
         * @ngdoc object
         * @name lbServices.Catalog.readers
         * @header lbServices.Catalog.readers
         * @object
         * @description
         *
         * The object `Catalog.readers` groups methods
         * manipulating `User` instances related to `Catalog`.
         *
         * Call {@link lbServices.Catalog#readers Catalog.readers()}
         * to query all related instances.
         */
        
        
        /**
         * @ngdoc method
         * @name lbServices.Catalog#readers
         * @methodOf lbServices.Catalog
         *
         * @description
         *
         * Queries readers of catalog.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - catalog id
         *
         *  - `options` – `{object=}` -
         *
         *  - `filter` – `{object=}` -
         *
         *  - `options` – `{object=}` -
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        R.readers = function () {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::get::Catalog::readers"];
          return action.apply(R, arguments);
        };
        
        /**
         * @ngdoc method
         * @name lbServices.Catalog.readers#link
         * @methodOf lbServices.Catalog.readers
         *
         * @description
         *
         * Add a related item by id for readers.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - catalog id
         *
         *  - `fk` – `{*}` - Foreign key for readers
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` -
         *
         *  - `options` – `{object=}` -
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `User` object.)
         * </em>
         */
        R.readers.link = function () {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::link::Catalog::readers"];
          return action.apply(R, arguments);
        };
        
        /**
         * @ngdoc method
         * @name lbServices.Catalog.readers#unlink
         * @methodOf lbServices.Catalog.readers
         *
         * @description
         *
         * Remove the readers relation to an item by id.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - catalog id
         *
         *  - `options` – `{object=}` -
         *
         *  - `fk` – `{*}` - Foreign key for readers
         *
         *  - `options` – `{object=}` -
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.readers.unlink = function () {
          var TargetResource = $injector.get("User");
          var action = TargetResource["::unlink::Catalog::readers"];
          return action.apply(R, arguments);
        };
        
        
        return R;
      }]);
  
  
  module
    .factory('LoopBackAuth', function () {
      var props = ['accessTokenId', 'currentUserId', 'rememberMe', 'currentUserData'];
      var propsPrefix = '$LibyCat$';
      
      function LoopBackAuth() {
        var self = this;
        props.forEach(function (name) {
          let val = load(name);
          try {
            self[name] = JSON.parse(val);
          } catch (e) {
            self[name] = val;
          }
        });
        //this.currentUserData = null;
      }
      
      LoopBackAuth.prototype.save = function () {
        var self = this;
        var storage = this.rememberMe ? localStorage : sessionStorage;
        props.forEach(function (name) {
          save(storage, name, self[name]);
        });
      };
      
      LoopBackAuth.prototype.setUser = function (accessTokenId, userId, userData) {
        this.accessTokenId = accessTokenId;
        this.currentUserId = userId;
        this.currentUserData = userData;
      };
      
      LoopBackAuth.prototype.clearUser = function () {
        this.accessTokenId = null;
        this.currentUserId = null;
        this.currentUserData = null;
      };
      
      LoopBackAuth.prototype.clearStorage = function () {
        props.forEach(function (name) {
          save(sessionStorage, name, null);
          save(localStorage, name, null);
        });
      };
      
      return new LoopBackAuth();
      
      // Note: LocalStorage converts the value to string
      // We are using empty string as a marker for null/undefined values.
      function save(storage, name, value) {
        try {
          var key = propsPrefix + name;
          value = value === null ? value : JSON.stringify(value);
          storage[key] = value;
        } catch (err) {
          console.log('Cannot access local/session storage:', err);
        }
      }
      
      function load(name) {
        var key = propsPrefix + name;
        return localStorage[key] || sessionStorage[key] || null;
      }
    })
    .config(['$httpProvider', function ($httpProvider) {
      $httpProvider.interceptors.push('LoopBackAuthRequestInterceptor');
    }])
    .factory('LoopBackAuthRequestInterceptor', ['$q', 'LoopBackAuth',
      function ($q, LoopBackAuth) {
        return {
          'request': function (config) {
            // filter out external requests
            var host = getHost(config.url);
            if (host && host !== urlBaseHost) {
              return config;
            }
            
            if (LoopBackAuth.accessTokenId) {
              config.headers[authHeader] = LoopBackAuth.accessTokenId;
            } else if (config.__isGetCurrentUser__) {
              // Return a stub 401 error for User.getCurrent() when
              // there is no user logged in
              var res = {
                body: {error: {status: 401}},
                status: 401,
                config: config,
                headers: function () {
                  return undefined;
                },
              };
              return $q.reject(res);
            }
            return config || $q.when(config);
          },
        };
      }])
    
    /**
     * @ngdoc object
     * @name lbServices.LoopBackResourceProvider
     * @header lbServices.LoopBackResourceProvider
     * @description
     * Use `LoopBackResourceProvider` to change the global configuration
     * settings used by all models. Note that the provider is available
     * to Configuration Blocks only, see
     * {@link https://docs.angularjs.org/guide/module#module-loading-dependencies Module Loading & Dependencies}
     * for more details.
     *
     * ## Example
     *
     * ```js
     * angular.module('app')
     *  .config(function(LoopBackResourceProvider) {
   *     LoopBackResourceProvider.setAuthHeader('X-Access-Token');
   *  });
     * ```
     */
    .provider('LoopBackResource', function LoopBackResourceProvider() {
      /**
       * @ngdoc method
       * @name lbServices.LoopBackResourceProvider#setAuthHeader
       * @methodOf lbServices.LoopBackResourceProvider
       * @param {string} header The header name to use, e.g. `X-Access-Token`
       * @description
       * Configure the REST transport to use a different header for sending
       * the authentication token. It is sent in the `Authorization` header
       * by default.
       */
      this.setAuthHeader = function (header) {
        authHeader = header;
      };
      
      /**
       * @ngdoc method
       * @name lbServices.LoopBackResourceProvider#getAuthHeader
       * @methodOf lbServices.LoopBackResourceProvider
       * @description
       * Get the header name that is used for sending the authentication token.
       */
      this.getAuthHeader = function () {
        return authHeader;
      };
      
      /**
       * @ngdoc method
       * @name lbServices.LoopBackResourceProvider#setUrlBase
       * @methodOf lbServices.LoopBackResourceProvider
       * @param {string} url The URL to use, e.g. `/api` or `//example.com/api`.
       * @description
       * Change the URL of the REST API server. By default, the URL provided
       * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
       */
      this.setUrlBase = function (url) {
        urlBase = url;
        urlBaseHost = getHost(urlBase) || location.host;
      };
      
      /**
       * @ngdoc method
       * @name lbServices.LoopBackResourceProvider#getUrlBase
       * @methodOf lbServices.LoopBackResourceProvider
       * @description
       * Get the URL of the REST API server. The URL provided
       * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
       */
      this.getUrlBase = function () {
        return urlBase;
      };
      
      this.$get = ['$resource', function ($resource) {
        var LoopBackResource = function (url, params, actions) {
          var resource = $resource(url, params, actions);
          
          // Angular always calls POST on $save()
          // This hack is based on
          // http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/
          resource.prototype.$save = function (success, error) {
            // Fortunately, LoopBack provides a convenient `upsert` method
            // that exactly fits our needs.
            var result = resource.upsert.call(this, {}, this, success, error);
            return result.$promise || result;
          };
          return resource;
        };
        
        LoopBackResource.getUrlBase = function () {
          return urlBase;
        };
        
        LoopBackResource.getAuthHeader = function () {
          return authHeader;
        };
        
        return LoopBackResource;
      }];
    });
})(window, window.angular);
