const React = require('react')

const ViewCounterComponent = React.createClass({
   getInitialState: function(){
      let startingState = {
         upvotes: 0,
         downvotes: 1
      }

      return startingState
   },

   _handleVote: function(evt){
      console.log(evt.target)
      let theVoteTypeFromDataDash = evt.target.dataset.votetype

      let currentVotes, updatedVotes, newVoteStateObj

      if(theVoteTypeFromDataDash === 'upvote'){
          currentVotes = this.state.upvotes
          updatedVotes = currentVotes + 1
          newVoteStateObj = { upvotes: updatedVotes }
      } else {
          currentVotes = this.state.downvotes
          updatedVotes = currentVotes + 1
          newVoteStateObj = { downvotes: updatedVotes }
      }


      this.setState(newVoteStateObj)
   },

   render: function(){
      return (
         <div>
            <h2 className="bg-info">Thumbs up if you like React</h2>
            <p> <i className="fa fa-thumbs-up fa-3x" onClick={this._handleVote} data-votetype="upvote"></i>    <span className="badge"> {this.state.upvotes} </span> </p>
            <p> <i className="fa fa-thumbs-down fa-3x" onClick={this._handleVote} data-votetype="downvote"></i>  <span className="badge"> {this.state.downvotes} </span> </p>
            <hr/>
            <ReactEvaluation finalVoteTally={this.state.upvotes - this.state.downvotes}/>
         </div>
      )
   }
})
// (1) Create onClick listener for the <i> elements
// (2) Create the event-handler method(s) on the component
// (3) Write the logic for the increment and set the state


const  ReactEvaluation = React.createClass({
   render: function(){
      let theEvaluationMsg
      if ( this.props.finalVoteTally === 0 ){ theEvaluationMsg = 'they dont give a durn about react...' }
      if ( this.props.finalVoteTally > 0 ){ theEvaluationMsg = 'REACT is a SENSATION. They love it!!' }
      if ( this.props.finalVoteTally < 0 ){ theEvaluationMsg = 'I dont think they like the React very much' }


      return <h3 className="bg-warning">{theEvaluationMsg}</h3>
   }
})






module.exports = ViewCounterComponent
