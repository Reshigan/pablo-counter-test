import express from 'express';
import { CounterModel } from '../../db/connection';
import { validateRequest } from '../../middleware/validation';
import { counterSchema } from '../../schemas/counter';

const router = express.Router();

// GET /api/counter - Fetch current counter value
router.get('/', async (req, res) => {
  try {
    const counter = CounterModel.get();
    res.json({
      success: true,
      data: counter,
      message: 'Counter value retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching counter:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve counter value',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// POST /api/counter/increment - Increment counter
router.post('/increment', validateRequest(counterSchema), async (req, res) => {
  try {
    const counter = CounterModel.increment();
    res.json({
      success: true,
      data: counter,
      message: 'Counter incremented successfully'
    });
  } catch (error) {
    console.error('Error incrementing counter:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to increment counter',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// POST /api/counter/decrement - Decrement counter
router.post('/decrement', validateRequest(counterSchema), async (req, res) => {
  try {
    const counter = CounterModel.decrement();
    res.json({
      success: true,
      data: counter,
      message: 'Counter decremented successfully'
    });
  } catch (error) {
    console.error('Error decrementing counter:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to decrement counter',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;