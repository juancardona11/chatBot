const express = require('express')
const dialogflow = require("dialogflow")
const request = require('request')


exports.chat = async (req, res, next) => {
    
    var message = {
            message: req.body.message,
            sessionId: req.body.message
    }
    console.log(message.message)

    var sendIntent = async (message1, sessionId) => {
        const sessionClient = new dialogflow.SessionsClient(
            {
                projectId: 'mybikeshop-1ab06',
                keyFilename: './dialogFlowKey.json'
            }
        )
        const sessionPath = sessionClient.sessionPath("mybikeshop-1ab06", sessionId)
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: message1,
                    languageCode: 'es-ES'
                }
            }
        }
    
        try {
            console.log('llamada')
            var res = await sessionClient.detectIntent(request)
            
            return res
        
        } catch (error) {
            return `Error en la conexión con el agente: ${error}`
        }
    }
    try{
    var result = await sendIntent("hola", "1234")
    console.log('llamada2')
    var texts = []
    result.data[0].queryResult.fulfillmentMessages.forEach(element => {
        texts.push(element.text.text[0])
    });
    
    res.send(texts)

    }

    catch{
      res.send('error')  

    }
    

}