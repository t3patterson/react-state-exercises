const Backbone = require('backbone')
const React = require('react')
const ReactDOM = require('react-dom')
const CounterView = require('./view-counter.js')
const SelectView = require('./view-selector.js')
const SelectPlusViewComponent = require('./view-selector-plus.js')

const FunHouse = require('./view-houseoffun.js')

const AppRouter = Backbone.Router.extend({
   routes: {
      'fun': 'showHouseOfFun',
      "counter" : "showCounter",
      "select-plus" : "showSelectPlus",
      "select" : "showSelect",
      "" : "showHomeView"
   },

   showSelectPlus: function(){
      console.log('ok')
      ReactDOM.render( <SelectPlusViewComponent/>  ,  document.querySelector('#app-container') )
   },


   showHouseOfFun: function(){
      console.log('ok')
      ReactDOM.render( <FunHouse/>  ,  document.querySelector('#app-container') )

   },

   showCounter: function(){
      ReactDOM.render( <CounterView/>  ,  document.querySelector('#app-container') )
   },

   showSelect: function(){
      ReactDOM.render( <SelectView/>  ,  document.querySelector('#app-container') )
   },


   showHomeView: function(){
      document.querySelector( '#app-container').innerHTML = `
      <h2 class="text-primary">React State Demos</h2>
      <a class='btn btn-primary' href="#counter">Counter Component</a> |
      <a class='btn btn-success' href="#select"> List Selector Component</a> |
      <a class='btn btn-danger' href="#select-plus"> Component State Modifying Other Components</a> |
      `
   },

   initialize: function(){
      Backbone.history.start()
   }
})

new AppRouter()
