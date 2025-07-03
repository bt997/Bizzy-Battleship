import express from "express"
const router = express.Router();
import { joinGame, getAllGames, deleteAllGames, getAllActiveGames, getAllCompletedGames, getOtherOpenGames,
getMyActiveGames, getMyOpenGames, getMyCompletedGames, getOtherGames, createGame, getByGameId, makeMove } from "./db/model/game.model.js";

// create: functional
router.post("/", async (req, res) => {
    const username = req.cookies.user;  // retrieve user logged in w/ cookies
    if (!username) {
        res.status(400).send("Username required");
        return;
    }
    try {
        const game = await createGame(username);
        res.json(game);
    } catch (e) {
        res.status(400).send(e.message);
    } 
});

// join: functional
router.post("/joinGame", async function (req, res) {
    const username = req.cookies.user;
    const gameId = req.body.gameId;
    if (!username) {
        res.status(400).send("Username required");
        return;
    }

    try {
        const game = await joinGame(username, gameId);
        res.json(game);
    }
    catch  (e) {
        res.status(400).send(e.message);
    }  
});



// make move
router.post("/move", async function (req, res) {
    const username = req.cookies.user
    const r = req.body.r;       // row
    const c = req.body.c    // col
    const gameId = req.body.gameId

    if (!username || r === undefined || c === undefined || !gameId) {
        res.status(400).send("Incomplete information given (username/row/column");
        return;
    }

    try {
        const updatedGame = await makeMove({ username, r, c, gameId });
        res.status(200).json(updatedGame);
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }

})  


// logged in (all games page)
router.get("/otherOpenGames/:username", async function(req, res) {
    const username = req.params.username;
    const allOtherOpen = await getOtherOpenGames(username);
    res.json(allOtherOpen);
})


router.get("/myOpenGames/:username", async function(req, res) {
    const username = req.params.username;
    const myOpen = await getMyOpenGames(username);
    res.json(myOpen);
})

router.get("/myActiveGames/:username", async function(req, res) {
    const username = req.params.username;
    const myActive = await getMyActiveGames(username);
    res.json(myActive);
})
router.get("/myCompletedGames/:username", async function(req, res) {
    const username = req.params.username;
    const myCompleted = await getMyCompletedGames(username);
    res.json(myCompleted);
})
router.get("/otherGames/:username", async function(req, res) {
    const username = req.params.username;
    const otherGames = await getOtherGames(username);
    res.json(otherGames);
})

// not logged in (all games page)

// get all active games
router.get("/allActive", async function (req, res) {
    const allActive = await getAllActiveGames();
    res.json(allActive);
})

// get all completed ganmes
router.get("/allCompleted", async function (req, res) {
    const allCompleted = await getAllCompletedGames();
    res.json(allCompleted);
})

// retrieve all games (functional)
router.get("/all", async function (req, res) {
    const allGames = await getAllGames();
    res.json(allGames);
})


// getBygameId
router.get("/:gameId", async function(req, res) {
    const {gameId} = req.params;

    try {
        const game = await getByGameId(gameId);
        res.send(game)

    } catch (e) {
        res.status(400).send(e.message)
    }

})

// functional delete all games 4 testing
router.delete("/deleteAll", async function (req, res) {
    const deleteAll = await deleteAllGames();
    res.json(deleteAll);
})



export default router;
