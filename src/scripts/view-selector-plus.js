const React = require('react')
const Backbone = require('backbone')


const SelectPlusViewComponent = React.createClass({
   getInitialState: function(){
      let startingState =  {
         itemsList: [
            {pid: 123, item: 'milk' , inInventory: false},
            {pid: 321, item: 'bread', inInventory: false},
            {pid: 456, item: 'eggs', inInventory: false},
            {pid: 187, item: 'cola', inInventory: false},
            {pid: 713, item: 'milk', inInventory: false}
         ]
      }

      return startingState
   },

   //note: executes before the initial rendering of the component
   componentWillMount: function(){
      //(3) Here backbone listens for 'changed-inventory-status' event
      //    and receives the relevant data (pid, inventoryStatus) in the callback function
      var self = this
      Backbone.Events.on('change-inventory-status', function(clickedPID, newStatus){
          console.log('INVENTORY STATUS CHANGED!!', clickedPID, newStatus)

         //  make an array copy
         let itemsCopy = self.state.itemsList.map((copy) => {return copy} )
         let indexFoundAt
         // return the object in the array where .pid value matches
         let clickedObj = itemsCopy.find(function(itemObj, i ){
            indexFoundAt = i
            return itemObj.pid === clickedPID
         })

         //set the .inInventory value to true/false on the object
         clickedObj.inInventory = newStatus

         // replace the object in the array at the proper index
         itemsCopy[indexFoundAt] = clickedObj

         //set the state
         self.setState({itemsList: itemsCopy})

      })
   },

   render: function(){
      let jsxListEls =  this.state.itemsList.map(function(itemEl, i){
         return <GroceryItem key={i} itemData={itemEl}/>
      })

      return (
         <div className="container">
            <h2>Grocery List</h2>
            <ul style={{listStyleType: 'none', fontSize: '21px'}}>
               {jsxListEls}
            </ul>
            <hr/>
            <ListStatus allItems={this.state.itemsList}/>
         </div>
      )
   }
})

const GroceryItem = React.createClass({


   _handleToggle: function(){

      // (1) Capture the relevant data that has changed
      let inventoryStatus, itemPID

      itemPID = this.props.itemData.pid

      if(this.props.itemData.inInventory === true){
         inventoryStatus = false
      } else {
         inventoryStatus = true
      }
      //(2) Trigger a custom event and pass the data to the top-le
      Backbone.Events.trigger("change-inventory-status", itemPID, inventoryStatus )
   },

   render: function(){
      let styleObj = {padding: '10px 5px', background: '#ddd', marginBottom: '4px', cursor: 'pointer'}

      if(this.props.itemData.inInventory === true){
         styleObj.background= 'cadetblue'
      }


      return <li onClick={this._handleToggle} style={styleObj}>{this.props.itemData.item}</li>
   }
})

const ListStatus = React.createClass({

   render: function(){
      var inInventoryItems = this.props.allItems.filter(function(itemObj){
         return itemObj.inInventory === true
      })

      return <div className="text-center">
         <h3 className="bg-primary"># Of Items Currently In Inventory:</h3>
         <h3 className="text-muted">{inInventoryItems.length}</h3>

      </div>
   }
})

module.exports = SelectPlusViewComponent
