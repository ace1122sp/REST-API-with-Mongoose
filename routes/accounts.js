const express = require('express');
const mongoose = require('mongoose');
const Account = require('../models');

module.exports = {
  //handling get requests
  getAccounts(req, res) {
    //comunicating with mongoose Account model
    Account.find({}, (err, results) => {
      //sending response
      if(err) {
        console.error(err);
        return res.sendStatus(500);
      }
      console.log(results);
      res.status(200);
      res.send(results);
    });
  },
  //handling post requests
  createAccount(req, res) {
    if(!req.body.name) return res.sendStatus(400);
    //validation
    const name = req.body.name.toString();
    const balance = parseInt(req.body.balance) || 0;
    //creating new document from Account model
    const account = new Account({ name, balance });
    account.save((err, acc) => {
      //sending response
      if(err) {
        console.error(err);
        return res.sendStatus(500);
      }
      res.status(201);
      res.send(acc.toJSON());
    });
  },
  //handling put requests
  updateAccount(req, res) {
    //validation
    const id = req.params.id;
    const balance = parseInt(req.body.balance);
    //comunicating with mongoose Account model
    Account.findById(id, (err, acc) => {
      if(err || !balance) {
        console.log(err);
        res.sendStatus(400);
      } else {
        acc.update({balance}, (err, result) => {
          //sending response
          if(err) {
            console.error(err);
            res.sendStatus(500);
          } else {
            console.log(result);
            res.status(200);
            res.send(`Account id: ${id} has been updated.`);
          }
        });
      }
    });
  },
  //handling delete requests
  deleteAccount(req, res) {
    const id = req.params.id;
    //comunicating with mongoose Account model
    Account.remove({_id: id}, err => {
      //sending response
      if(err) {
        console.error(err);
        res.sendStatus(400);
      } else {
        res.status(200);
        res.send(`Account id: ${id} successfully deleted.`);
      }
    });
  }
}
