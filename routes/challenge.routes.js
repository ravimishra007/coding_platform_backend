import express from 'express';
import {
  getAllChallenges,
  getChallengeById,
  updateChallenge,
  deleteChallenge,
  createChallenge
} from '../controllers/challenge.controller.js';

const router = express.Router();

router.post('/', createChallenge);
router.get('/', getAllChallenges);
router.get('/:id', getChallengeById);
router.put('/:id', updateChallenge);
router.delete('/:id', deleteChallenge);

export default router; 