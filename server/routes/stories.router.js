const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route for all stoies with the category and featured image (if there is one)
 * Featured image will be NULL if one does not exist
 */
router.get('/', (req, res) => {
    const sqlText = `
        SELECT stories.id, stories.name, stories.location, stories.title, stories.aquatic_therapist, 
        stories.message, stories.email, categories.category, images.img_link
        FROM stories
        JOIN categories ON stories.category_id = categories.id
        LEFT JOIN images ON images.story_id = stories.id AND featured_img = true
        ORDER BY id ASC;`;
    pool.query(sqlText).then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    })
})

/**
 * DELETE route for deleting a specific story
 * Removes a specific story based on the id
 */
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `DELETE FROM stories WHERE id = $1;`;
    pool.query(sqlText, [req.params.id]).then(result => {
        res.sendStatus(200);
    }).catch(error => {
        console.log(error);
        res.sendStatus(500);
    })
})

module.exports = router;