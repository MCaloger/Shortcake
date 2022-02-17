const request = require("supertest");
const express = require('express');
const app = express();
const UrlController = require('./UrlController.js')

describe('Url controller', () => {
    it('should return a URL on submitting a Post to /new', async () => {
        return new Promise((resolve, reject) => {

            request(app)
                .post("/new")
                .send({url: "https://caloger.com/"})
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) reject(err);
                    resolve()
                });
        })
    })

    // it('should test that error is thrown on invalid URL', () => {
    //     expect(() => {
    //         UrlSanitizer.sanitize('!@#$%^&*()////<script>alert("hello");</script>')
    //     }).toThrow('Invalid Url.')
    // })


    // it('should test that error is thrown on invalid URL protocol', () => {
    //     expect(() => {
    //         UrlSanitizer.sanitize("javascript:console.log('javascript');alert('javascript')")
    //     }).toThrow('Invalid Url.')
    // })
})