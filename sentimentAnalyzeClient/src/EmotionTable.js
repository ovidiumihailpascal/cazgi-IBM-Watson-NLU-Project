import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
      return (  
          <div>
      
            <div>Anger: {this.props.emotions.anger}</div>
            <div>Sadness: {this.props.emotions.sadness}</div>
            <div>Joy: {this.props.emotions.joy}</div>
            <div>Fear: {this.props.emotions.fear}</div>
            <div>Disgust: {this.props.emotions.disgust}</div>
            
          </div>
        );
      }
    
}
export default EmotionTable;
