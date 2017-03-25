import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Catalog } from '../../api/catalog'

import template from './bookList.html';

class BookListCtrl {
  constructor($scope) {
    $scope.viewModel(this);
    this.helpers({
      books(){
        return Catalog.find({
          type:'book'
        });
      }
    });
  }
  
  addBook(newBook) {
    newBook.type = 'book';
    newBook.createdOn = new Date;
    Catalog.insert(newBook);
    // Clear form
    this.newBook= {};
  }
}

export default angular.module('bookList', [
      angularMeteor
    ])
    .component('bookList', {
      templateUrl: 'imports/components/bookList/bookList.html',
      controller: ['$scope', BookListCtrl]
    });