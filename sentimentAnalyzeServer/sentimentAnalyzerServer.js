const express = require('express');
const bodyParser = require('body-parser');
const app = new express();
const env = require('dotenv');

env.config();

const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const watson = new NaturalLanguageUnderstandingV1({
  version: '2020-08-01',
  authenticator: new IamAuthenticator({
    apikey: process.env.key
  }),
  serviceUrl: process.env.url
});

app.use(express.static('client'))

const cors_app = require('cors');

app.use(cors_app());
app.use(bodyParser.urlencoded({ extended: true }));

/*
app.get("/", (req, res) => {
    res.render('index.html');
});
*/

app.get('/analyze', (req, res) => {

    const parameters = {
        text: req.query.text,
        language: 'en',
        features: {
            sentiment: {},
            emotion: {},
        }
    }

    watson.analyze(parameters)
    .then( response => {
        console.log(response.result)
        return res.send(response.result)
    }).catch( error => {
        console.log(error)
    })
});  

app.get('/sentiment', (req, res) => {
    
    let parameters = {
        language: 'en',
        features: {
            sentiment: {},
        }
    }

    /* analyze text */
    if(req.query.mode === 'text')
    {
        parameters.text = req.query.text

        watson.analyze(parameters)
            .then( response => {
                console.log(response.result)
                return res.send(response.result)
            })
            .catch( error => {
                console.log(error)
            })
    }

    /* analyze url and return category */
    if(req.query.mode === 'url')
    {
        parameters.url = req.query.text
        parameters.features.categories = {
            limit: 3
        }

        watson.analyze(parameters)
            .then( response => {
                console.log(response.result)
                return res.send(response.result)
            })
            .catch( error => {
                console.log(error)
            })
    }

})

app.get('/emotion', (req, res) => {
    
    let parameters = {
        language: 'en',
        features: {
            emotion: {},
        }
    }

     /* analyze text */
    if(req.query.mode === 'text')
    {
        parameters.text = req.query.text
        watson.analyze(parameters)
            .then( response => {
                console.log(response.result)
                return res.send(response.result)
            })
            .catch( error => {
                console.log(error)
            })
    }

    /* analyze url and return category */
    if(req.query.mode === 'url')
    {
        parameters.url = req.query.text
        parameters.features.categories = {
            limit: 3
        }

        watson.analyze(parameters)
            .then( response => {
                console.log(response.result)
                return res.send(response.result)
            })
            .catch( error => {
                console.log(error)
            })
    }

})

const server = app.listen(process.env.port, () => {
    console.log('Listening', server.address().port)
})

