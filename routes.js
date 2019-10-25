const express = require('express');
const router = express.Router();

const controller = require('./controller');

const authenticate = require('./authenticate');
var path = require('path');

module.exports = app => {
  router.get("/api/logout", (req, res) => {
    authenticate.logout(res);
    res.redirect("/");
  });

  router.get("/api/login", async (req, res) => authenticate.login(app, req, res));

  router.post("/api/user", async (req, res) => {
    let nu = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    };
    controller.addUser(app, nu, res);
  });

  //Access main ejs page when clicking on Super6 button
  router.get("/", async (req, res) => {
    let meme = await controller.getGame(app);
	router.post('/api/user/predictions', async (req, res) => {
		if (authenticate.isAuthenticated(req)) {
			let userScores = req.body;

    console.log("Username  " + authenticate.getUsername(req));

    return res.render("main", {
      loggedIn: authenticate.isAuthenticated(req),
      meme: meme
    });
  });
			let matches = Object.values(userScores);
			console.log(matches);

  router.get("/login", async (req, res) => {
    return res.render("login", {
      loggedIn: false
    });
  });

  router.get("/matches", async (req, res) => {
    if (authenticate.isAuthenticated(req)) {
      let meme = await controller.getGame(app);
      return res.render("matches", {
        loggedIn: true,
        title: "game week one",
        meme: meme
      });
    } else {
      res.redirect("/login");
    }
  });
			for (let i = 0; i < 6; i++) {
				i = [req.body.i, req.body.i++];
				console.log(i);
			}

  //Access register (ejs) page from home page
  router.get("/register", async (req, res) => {
    let nu = {
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      email: ""
    };
    return res.render("register", {
      loggedIn: false,
      firstnameerror: "",
      lastnameerror: "",
      usernameerror: "",
      passworderror: "",
      emailerror: "",
      user: nu
    });
  });
			let user = await controller.getUser(app);

  // THESE ROUTES ARE ONLY FOR TESTING AND NOT PART
  // OF THE MAIN SITE
			let up = {
				$set: {
					game: {
						gw1: [matches]
					}
				}
			};

			console.log(up);
			res.redirect('/');
			controller.addUserPredictions(app, up, res);
		} else {
			res.redirect('/');
			console.info('Session ran out');
		}
	});
	router.get('/', async (req, res) => {
		let meme = await controller.getGame(app);

		return res.render('main', {
			loggedIn: authenticate.isAuthenticated(req),
			meme: meme
		});
	});

	router.get('/matches', async (req, res) => {
		if (authenticate.isAuthenticated(req)) {
			let meme = await controller.getGame(app);
			return res.render('matches', {
				loggedIn: true,
				title: 'game week one',
				meme: meme
			});
		} else {
			res.redirect('/login');
		}
	});

	//Access register (ejs) page from home page
	router.get('/register', async (req, res) => {
		return res.render('register', {
			loggedIn: false,
			error: ''
		});
	});

	// THESE ROUTES ARE ONLY FOR TESTING AND NOT PART
	// OF THE MAIN SITE

	router.get('/api/user', async (req, res) => {
		if (authenticate.isAuthenticated(req)) {
			let users = await controller.getUsers(app);
			return res.json(users);
		} else {
			res.status(404).send('Unauthorized');
		}
	});

	router.get('/team', async (req, res) => {
		let team = await controller.getTeams(app);
		return res.json(team);
	});

	router.get('/game', async (req, res) => {
		let game = await controller.getGame(app);
		return res.json(game);
	});

	return router;
};
