const router = require('express').Router();
const Plan = require('../models/plans');

router.route('/').get((req, res) => {
  Plan.find()
    .then(plans => res.json(plans))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
  const planName = req.body.planName;
//   plan.date = Date.parse(req.body.date);
  const newPlan = new Plan({planName});

  newPlan.save()
  .then(() => res.json('Plan added!'))
  .catch(err => res.status(400).json('Error: ' + err));
  
});




router.route('/:id').get((req, res) => {
  Plan.findById(req.params.id)
    .then(plan => res.json(plan))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').delete((req, res) => {
  Plan.findByIdAndDelete(req.params.id)
    .then(() => res.json('Plan deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

/**
 * updates an existing plan item. 
 * For this endpoint, we first retrieve the old plan item from the database based on the id. 
 * Then, we set the plan property values to what’s available in the request body. 
 * Finally, we call plan.save to save the updated object in the database.
 */
router.route('/:id').put((req, res) => {
  Plan.findById(req.params.id)
    .then(plan => {
      plan.username = req.body.username;
     
      plan.date = Date.parse(req.body.date);

      plan.save()
        .then(() => res.json('plan updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;