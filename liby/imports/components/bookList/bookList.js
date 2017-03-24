import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './bookList.html';

class BookListCtrl {
  constructor() {
    this.books = [{
      title: 'This is task 1'
    }, {
      title: 'This is task 2'
    }, {
      title: 'This is task 3'
    }];
  }
}


export default angular.module('bookList', [
      angularMeteor
    ])
    .component('bookList', {
      templateUrl: 'imports/components/bookList/bookList.html',
      controller: BookListCtrl
    });