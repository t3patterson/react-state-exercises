const React = require('react')

const SelectViewComponent = React.createClass({
   getInitialState: function(){
      let startingState =  {
         itemsList: [
            {pid: 123, item: 'milk' },
            {pid: 321, item: 'bread'},
            {pid: 456, item: 'eggs'},
            {pid: 187, item: 'cola'},
            {pid: 713, item: 'milk'}
         ]
      }

      return startingState
   },

   render: function(){
      // (1) you need to create the jsx els with .map
      let jsxListEls =  this.state.itemsList.map(function(itemEl, i){
         return <GroceryItem key={i} itemData={itemEl}/>
      })

      return (
         <div className="container">
            <h2>Grocery List</h2>
            <ul style={{listStyleType: 'none', fontSize: '21px'}}>
               {jsxListEls}
            </ul>
         </div>
      )
   }
})

const GroceryItem = React.createClass({
   getInitialState: function(){
      let stateObj = {
         inInventory: false
      }
      return stateObj
   },

   _handleToggle: function(){
      // (3) the toggler
      if(this.state.inInventory === true){
         this.setState({inInventory: false})
      } else {
         this.setState({inInventory: true})
      }
   },

   render: function(){
      
      let styleObj = {padding: '10px 5px', background: '#ddd', marginBottom: '4px', cursor: 'pointer'}

      if(this.state.inInventory === true){
         styleObj.background= 'cadetblue'
      }


      {/*/(2) creating a click event on each Grocery Item that will
              toggle the isInventory state for the item-element clicked
         */}

      return <li onClick={this._handleToggle} style={styleObj}>{this.props.itemData.item}</li>
   }
})

module.exports = SelectViewComponent
