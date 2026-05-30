const express = require('express')
const router = express.Router()
const { getAllTeam, addMember, deleteMember } = require('../controllers/teamController')

router.get('/', getAllTeam)
router.post('/', addMember)
router.delete('/:id', deleteMember)

module.exports = router
