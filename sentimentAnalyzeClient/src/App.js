import './bootstrap.min.css';
import './App.css';
import EmotionTable from './EmotionTable.js';
import SentimentTable from './SentimentTable.js';

import React from 'react';
import axios from 'axios';

class App extends React.Component {
 
  constructor(props) {
    super(props)

    this.state = {
      mode: 'text',
    }
  }
  
  /* new code */

  handleMode = (mode) => {
    this.setState({
      mode: mode
    });
  }

  analyzeEmotion = (mode) => {
    let textToAnalyze = document.getElementById('textToAnalyze').value
    console.log(mode)
    axios.get('http://localhost:8080/emotion?mode=' + mode + '&text=' + textToAnalyze)
      .then( response => {
        this.setState({emotions:<EmotionTable emotions={response.data.emotion.document.emotion}/>})
        
    })
  }
  
  analyzeSentiment = (mode) => {
    let textToAnalyze = document.getElementById('textToAnalyze').value
    console.log(mode)
    axios.get('http://localhost:8080/sentiment?mode=' + mode + '&text=' + textToAnalyze)
      .then( response => {
        this.setState({sentiments:<SentimentTable sentiments={response.data} mode={this.state.mode}/>})  
    })
  }

  render() {
    return (  
      <div className="App">
        <div className="container p-4 bg-gray rounded mt-4">
          <div className="row">
            <div className="col-md-12 mb-5">
              <h1>Watson text analyzer</h1>
            </div>
            <div className="col-md-6">
              <button className="btn btn-dark" onClick={this.handleMode.bind(this, 'text')}>Mode Text</button>
            </div>
            <div className="col-md-6">
              <button className="btn btn-dark" onClick={this.handleMode.bind(this, 'url')}>Mode URL</button>
            </div>
            <div className="col-md-12">
              <div className="text-left mt-5 mb-5">
                <label className="lead" htmlFor="textToAnalyze">Please enter your <strong>{this.state.mode}</strong></label>
                <input type="text" id="textToAnalyze" className="p-3 w-full"/>
              </div>
            </div>
            <div className="col-md-6">
                <button className="btn btn-primary" onClick={this.analyzeEmotion.bind(this, this.state.mode)}>Analyze Emotion</button>
            </div>
            <div className="col-md-6">
                <button className="btn btn-primary" onClick={this.analyzeSentiment.bind(this, this.state.mode)}>Analyze Sentiment</button>
            </div>
            <div className="col-md-6">{this.state.emotions}</div>
            <div className="col-md-6">{this.state.sentiments}</div>
          </div>
        </div>
      </div>
    );
    }
}

export default App;
