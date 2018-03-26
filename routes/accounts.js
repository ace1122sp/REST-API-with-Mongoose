const express = require('express');
const mongoose = require('mongoose');
const Account = require('../models');

module.exports = {
  getAccounts(req, res) {
    Account.find({}, (err, results) => {
      if(err) return console.error(err);
      console.log(results);
      res.status(200);
      res.send(results);
    });
  },
  createAccount(req, res) {
    if(!req.body.name) return res.sendStatus(400);
    const name = req.body.name.trim().toString();
    const balance = parseInt(req.body.balance) || 0;
    const account = new Account({ name, balance });
    account.save((err, acc) => {
      if(err) {
        console.error(err);
        return res.sendStatus(400);
      }
      res.status(201);
      res.send(acc.toJSON());
    });
  },
  updateAccount(req, res) {
    const id = req.params.id;
    const balance = parseInt(req.body.balance);
    Account.findById(id, (err, acc) => {
      if(err || !balance) {
        console.log(err);
        res.sendStatus(400);
      } else {
        acc.update({balance}, (err, result) => {
          if(err) {
            console.error(err);
            res.sendStatus(400);
          } else {
            console.log(result);
            res.status(200);
            res.send(`Account id: ${id} has been updated.`);
          }
        });
      }
    });
  },
  deleteAccount(req, res) {
    const id = req.params.id;
    if(!id) return res.sendStatus(400);
    Account.remove({_id: id}, err => {
      if(err) {
        console.error(err);
        res.sendStatus(400);
      } else {
        Account.findById(id, (err, res) => {
          if(err) {
            console.log('error');
          } else if(res) {
            console.log('not deleted');
          } else {
            console.log('deleted');
          }
        })
        res.status(200);
        res.send(`Account id: ${id} successfully deleted.`);
      }
    });
  }
}
