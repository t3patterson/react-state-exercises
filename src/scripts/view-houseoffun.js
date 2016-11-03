const React = require('react')

const $ = require('jquery')

const FunHouse = React.createClass({
   getInitialState: function(){
      return {
         funMessages: []
      }
   },

   _addTheFun: function(){
      let newMsg = (new Date()).toString()
      let copyMsgList = this.state.funMessages.map( function(msg) {return msg } )
      // console.log(copyMsgList)
      $.getJSON(`https://www.foaas.com/because/${newMsg.split(' ').join('_')}?`)
         .then((resData)=>{
            console.log(resData)
            copyMsgList.push(`${resData.message} ---- ${resData.subtitle}`)
            this.setState({ funMessages: copyMsgList   })

         })

   },

   render: function(){
      console.log('state', this.state.funMessages)
      return <div>
         <h3 className="bg-danger"> Push me for fun</h3>
         <button className="btn-danger btn" onClick={this._addTheFun}> + </button>
         <hr/>
         <ul >
            { this.state.funMessages.map( function(msg){return <li >{msg}</li>  }   )}
         </ul>
      </div>
   }
})

module.exports = FunHouse

//(2) create a click event on each Grocery Item that will toggle the isInventory for the item clicked,
//     HINT: you may need to use the `data` attribute
