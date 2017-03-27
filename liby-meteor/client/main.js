import angular from 'angular';
import angularMeteor from 'angular-meteor';
import bookList from '../imports/components/bookList/bookList';

angular.module('liby', [
  angularMeteor,
    bookList.name
]);
