// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongodb = require('./data/database');
const GitHubStrategy = require('passport-github2').Strategy;


const passport = require('passport');
const session = require('express-session');

const port = process.env.PORT || 3000;
const app = express();

app.set('trust proxy', 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: '*' }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/', (req, res) => {res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")});

app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs', seission: false}),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  });

// routes
app.use('/', require('./routes'));

app.use((req, res) => {
  res.status(404).json({ error: 'NotFound', message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    error: err.name || 'ServerError',
    message: err.message || 'Something went wrong'
  });
});

mongodb.initDb((err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
