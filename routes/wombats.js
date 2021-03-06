import express from 'express';
import * as respond from './respond'
import * as mammals from '../dal/mammals';
import {incrementTurn, locator} from '../gamelogic';
import {checkRoundStatus} from './rounds';

let wombats = express.Router();

// disallow PUT if round is over
wombats.put('/wombats/:name', checkRoundStatus);

wombats.route('/wombats')

  // GET /wombats
  .get((req, res) => {
    mammals.getAll('wombats')
      .then(
        wombats => res.send(wombats),
        err => respond.withError(res, err)
      );
  })

  // POST /wombats
  .post((req, res) => {
    mammals.create(req.body, 'wombats')
      .then(
        wombat => res.status(201).send(wombat),
        err => respond.withError(res, err)
      );
  });

wombats.route('/wombats/:name')

  // PUT /wombats/bartholemew
  .put((req, res) => {
    mammals.update(req.params.name, req.body, 'wombats')
      .then(
        result => incrementTurn().then(res.send(result)),
        err => respond.withError(res, err)
      );
  })

  // DELETE /wombats/bartholemew
  .delete((req, res) => {
    mammals.remove(req.params.name, 'wombats')
      .then(
        result => res.sendStatus(204),
        err => respond.withError(res, err) 
      );
  });

export default wombats;
