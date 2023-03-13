import { body, ValidationChain } from 'express-validator';
import { Priority } from '../enums/Priority';
import { Status } from '../enums/Status';
//Request validator
export const createValidator: ValidationChain[] = [
  body('title')
    .not()
    .isEmpty()
    .withMessage('Please give a title to task')
    .trim()
    .isString()
    .withMessage('Title needs to be in a text format'),
  body('date')
    .not()
    .isEmpty()
    .withMessage('Please give a date to task')
    .isString()
    .withMessage('Date needs to be in a valid date format'),
  body('description')
    .trim()
    .isString()
    .withMessage('Description needs to be in a text format'),
  body('priority')
    .trim()
    .isIn([Priority.normal, Priority.high, Priority.low])
    .withMessage('Priority can only be low, normal or high'),
  body('status')
    .trim()
    .isIn([Status.todo, Status.inProgress, Status.completed])
    .withMessage('Priority can only be todo, inprogress or completed'),
];

export const updateValidator: ValidationChain[] = [
  body('id')
    .not()
    .isEmpty()
    .withMessage('Need task id')
    .trim()
    .isString()
    .withMessage('Id needs to be a valid uuid'),
  body('status')
    .trim()
    .isIn([Status.todo, Status.inProgress, Status.completed])
    .withMessage('Priority can only be todo, inprogress or completed'),
];
