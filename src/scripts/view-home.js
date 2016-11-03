const React = require('react')

const HomeView = React.createClass({
   getInitialState: function(){
      return {}
   },

   render: function(){
      console.log("??/")
      return (
         <div className="container">
            <h2>Home</h2>
            <button className="">Push Me For Alert</button>
         </div>
      )
   }
})

module.exports = HomeView
