import React from 'react';
import './bootstrap.min.css';

class SentimentTable extends React.Component {
    render() {
      let result = null

      if(this.props.mode === 'url')  
        result = <div>
            <div>{this.props.sentiments.categories[0].score}</div>
            <div>{this.props.sentiments.categories[0].label}</div>
        </div>

      if(this.props.mode === 'text')  
        result = <div>
            <div>{this.props.sentiments.sentiment.document.score}</div>
            <div>{this.props.sentiments.sentiment.document.label}</div>
        </div>  

      return (  
          <div>
              {result}  
          </div>
        );
      }
    
}
export default SentimentTable;
