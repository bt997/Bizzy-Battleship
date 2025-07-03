import mongoose from "mongoose";
import { GameSchema } from "../schema/game.schema.js";
import generateBoard from "../../../utils/generateBoard.js"
import { updateLosses, updateWins } from "./user.model.js";
const GameModel = mongoose.model("Game", GameSchema);


// functional
export function createGame(username) {
  const newGameInfo = {
    p1: username,
    p1Board: generateBoard(),
    p2Board: generateBoard(),
    turn: username,
  };

  return GameModel.create(newGameInfo);
}

// functional
export async function joinGame(username, gameId) {
  const openGame = await GameModel.findOne({_id: gameId});

  openGame.p2 = username;
  openGame.status = "Active";
  await openGame.save();
  return openGame;
}


export async function getByGameId(gameId) {
  return GameModel.findById(gameId).exec();
}

// make move
export async function makeMove(moveSet) {
  const { username, r, c, gameId } = moveSet;

  const game = await GameModel.findById(gameId);

  if (game.turn !== username) {
    throw new Error("Not your turn");
  }

  const isP1 = (game.p1 === username);
  const opponentBoard = isP1 ? game.p2Board : game.p1Board;

  const targetCell = opponentBoard[r][c];

  if (targetCell === "ship") {
    opponentBoard[r][c] = "hit"; 
  } else {
    opponentBoard[r][c] = "miss"; 
  }

  if (checkWinner(opponentBoard)) {
    game.status = "Completed";
    game.winner = username;
    const opponent = (username === game.p1) ? game.p2: game.p1
    await updateWins(username);
    await updateLosses(opponent)
    
  } else {
    game.turn = isP1 ? game.p2 : game.p1;
  }

  game.markModified("p1Board");
  game.markModified("p2Board");

  await game.save();
  return game;
}


export async function getAllGames() {
  return GameModel.find().exec();
}

export async function deleteAllGames(){
  return GameModel.deleteMany().exec();
}


// games: logged in

// functional
export async function getOtherOpenGames(username) {
  return GameModel.find({status: "Open",p1: { $ne: username }});
}

// functional
export async function getMyOpenGames(username) {
  return GameModel.find({
    status: "Open",
    p1: username,
    p2: "Player 2"
  });
}

export async function getMyActiveGames(username) {
  return GameModel.find({ status: "Active",$or: [{ p1: username },{ p2: username }]});
}

export async function getMyCompletedGames(username) {
  return GameModel.find({ status: "Completed",$or: [{ p1: username },{ p2: username }]});
}

// functional
export async function getOtherGames(username) {
  return GameModel.find({
    $and: [
      { $or: [{ status: "Active" }, { status: "Completed" }] },
      { p1: { $ne: username } },
      { p2: { $ne: username } }
    ]
  });
}

// games: not logged in

export async function getAllActiveGames(){
  return GameModel.find({status: "Active"}).exec();
}

export async function getAllCompletedGames(){
  return GameModel.find({status: "Completed"}).exec();
}

function checkWinner(board) {
  return board.every((row) => row.every((cell) => cell !== "ship"));
}

