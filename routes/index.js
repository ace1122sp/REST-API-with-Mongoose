const express = require('express');
const accounts = require('./accounts');
const router = express.Router();

router.route('/accounts')
  .get(accounts.getAccounts)
  .post(accounts.createAccount);

router.route('/accounts/:id')
  .put(accounts.updateAccount)
  .delete(accounts.deleteAccount);

router.all('*', (req, res) => {
  res.status(404);
  res.send('error: not found');
});

module.exports = router;
