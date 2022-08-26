const express = require("express")
const fs = require("fs")
const path = require("path")


const fileController = {
    uploadFile: async function (req, res) {
        let responseStatusCode, responseMessage, responseData;
        try {
            let data = {
                keywords: req.body.keywords,
                fileInput: req.body.fileInput
            }

            fs.writeFile(`Output${new Date().getTime()}.txt`, req.body.fileInput, function (err, text) {
                if (err) {
                    responseStatusCode = 404
                    responseMessage = "ERROR OCCURED";
                    responseData = err;
                }
                responseStatusCode = 200
                responseData = data;
                responseMessage = "SUCCESS"
            })
            responseStatusCode = 200
            responseData = data;
            responseMessage = "SUCCESS"
        } catch (error) {
            responseStatusCode = 404
            responseMessage = "ERROR OCCURED";
            responseData = error;

        } finally {
            return res.status(responseStatusCode).send({ statusCode: responseStatusCode, data: responseData, message: responseMessage })
        }
    }
}

module.exports = fileController