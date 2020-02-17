const passport = require('passport');
const signIn = require('./controller').signIn;
const getFullProfile = require('./controller').getFullProfile;
const getUser = require('./controller').getUser;
/**
 * user apis
 */
const userAPI = (app) => {
  // get authenticated user
  app.get('/api/user/getUser/:username', (req, res) => {
    console.log(req.params.username);
    getUser(req.params.username).then(
      (data) => { res.send(data); },
      (error) => { res.send(error); }
    );
  });

  // app.post('/api/user/getUserDetails', (req, res) => {
  //   getUser(req.username).then(
  //     result => { res.send(result); },
  //     error => { res.send({ error }); }
  //   );
  // });

  // app.post('/api/user/getUserDetails', (req, res) => {
  //   console.log(req.params.username);
  //   getUser(req.params.username).then(
  //     (data) => { res.send(data); },
  //     (error) => { res.send(error); }
  //   );
  // });

  // github authentication route
  app.get(
    '/api/user/authViaGitHub'
    // passport.authenticate('github')
  );

  // callback route from github
  app.get(
    // this should match callback url of github app
    '/api/user/authViaGitHub/callback',
    // passport.authenticate('github', { failureRedirect: '/signIn/failed' }),
    (req, res) => { res.redirect('/'); }
  );

  // signout the user
  app.get('/api/user/signout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  // get user full profile
  app.get('/api/user/profile/:username', (req, res) => {
    // getFullProfile
    getUser(req.params.username).then(
      result => { res.send(result); },
      error => { res.send({ error }); }
    );
  });



};

module.exports = userAPI;
