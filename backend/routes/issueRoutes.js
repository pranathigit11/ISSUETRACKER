const express = require('express')
const router = express.Router()
const {
  getAllIssues, getIssueById, createIssue,
  updateIssue, deleteIssue, addComment, deleteComment, getStats
} = require('../controllers/issueController')

router.get('/stats', getStats)
router.get('/', getAllIssues)
router.get('/:id', getIssueById)
router.post('/', createIssue)
router.put('/:id', updateIssue)
router.delete('/:id', deleteIssue)
router.post('/:id/comments', addComment)
router.delete('/:id/comments/:commentId', deleteComment)

module.exports = router
