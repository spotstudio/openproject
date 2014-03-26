angular.module('openproject.models')

.constant('OPERATORS_REQUIRING_VALUES', ['o', 'c', '!*', '*', 't', 'w'])
.factory('Filter', ['OPERATORS_REQUIRING_VALUES', function(OPERATORS_REQUIRING_VALUES) {
  Filter = function (data) {
    angular.extend(this, data);
  };

  Filter.prototype = {
    toParams: function() {
      var params = {};

      params['op[' + this.name + ']'] = this.operator;
      params['v[' + this.name + '][]'] = this.valuesAsArray();

      return params;
    },

    valuesAsArray: function() {
      if (this.values instanceof Array) {
        return this.values;
      } else {
        return [this.values];
      }
    },

    requiresValues: function() {
      return OPERATORS_REQUIRING_VALUES.indexOf(this.operator) === -1;
    },

    isConfigured: function() {
      return this.operator && (this.values || !this.requiresValues());
    }
  };

  return Filter;
}]);