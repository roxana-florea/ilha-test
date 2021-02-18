require('dotenv').config();
const app = require('./app');
const { ExpressPeerServer } = require('peer');
const port = process.env.PORT || 5000;

const cors = require('cors');
const mongoose = require('mongoose');

const dbUrl = process.env.DB_URL;

app.use(cors());
app.use(express.json());

//connection to mongodb
mongoose.connect(dbUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connection established successfully');
});

//load the routers from other files
const plansRouter = require('./routes/plans');
const authRouter = require('./routes/auth');
const dashboardRouter = require('./routes/dashboard');
const verifyToken = require('./routes/validate-token');

//the routers are added as middleware
app.use('/plans', plansRouter);
app.use('/api/user', authRouter);
app.use('/api/dashboard', verifyToken, dashboardRouter);

const server = app.listen(port, (err) => {
  if (err) {
    console.log('Error occured');
  } else {
    console.log(`Successfuly connected to to port: ${port}`);
  }
});

const peerServer = ExpressPeerServer(server);
app.use('/peerjs', peerServer);
