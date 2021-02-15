const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/fruits', { useNewUrlParser: true, useUnifiedTopology: true  });

const fruitsSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, 'Please specify the name! it is mandatory']
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const Fruit = mongoose.model('Fruit', fruitsSchema);

const fruit = new Fruit ({
    name:'Banana',
    rating: 9,
    review: 'Yummy'
});

fruit.save().then(console.log("banana saved"));