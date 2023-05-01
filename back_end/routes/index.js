var express = require('express');
var router = express.Router();
var pool = require('./pool');

/* 
Routes:
/question/update_vote
/questions/get_vote
/questions/
/questions/:id

*/

router.post('/questions/update_vote', function(req, res) {
  const data = req.body;
  console.log(data);
  var count = data.count;
  var voted = data.voted;
  var err = false;
  var msg;
  if(!voted) {
    if(data.vote == "up_vote") {
      pool.query(`INSERT INTO question_votes (question_id, user_id, vote) values (${data.id}, ${data.user}, 1)`, (error, result) => {
        if(error) {
          err = true;
          msg = error.message;
        } else {
        }
      })
      count++;  
    } else {
      pool.query(`INSERT INTO question_votes (question_id, user_id) values (${data.id}, ${data.user})`, (error, result) => {
      if(error) {
        err = true;
        msg = error.message;
      } else {
      }
    })
      count--;
    }  
  } else {
    if(data.vote == "up_vote") {
      pool.query(`UPDATE question_votes SET vote = 1 WHERE question_id=${data.id} AND user_id=${data.user}`, (error, result) => {
        if(error) {
          err = true;
          msg = error.message;
        } else {
        }
      })
      count+=2;  
    } else {
      pool.query(`UPDATE question_votes SET vote = -1 WHERE question_id=${data.id} AND user_id=${data.user}`, (error, result) => {
      if(error) {
        err = true;
        msg = error.message;
      } else {
      }
    })
      count-=2 ;
    }
  
  }
  
  if(err) {
    res.status(400).send(msg);
  } else {
    pool.query(`UPDATE questions SET upvote_count=${count} WHERE question_id=${data.id}`, (error, result) => {
      if(error) {
        res.status(400).send(error.message);
      } else {
        res.status(200).send(result.rows);
      }
    })    
  }

}) 


router.get('/questions', function(req, res) {
  const pagenumber = Math.abs(req.query.page) || 1;
	const pagelimit = Math.abs(req.query.limit) || 10;
  const order_by = req.query.order_by || "question_id";

  pool.query(`SELECT * FROM questions INNER JOIN users ON  questions.created_by=users.user_id ORDER BY ${order_by} LIMIT ${pagelimit} OFFSET (${pagenumber} - 1) * ${pagelimit}`, (error, result) => {
    if(error) {
      res.status(400).send(error.message);
    } else {
      res.status(200).send(result.rows);
    }
  })
})

router.get('/questions/:id', function(req, res) {
  const user = req.query.user;
  console.log(req.query);
  pool.query(`SELECT * FROM questions INNER JOIN users ON  questions.created_by=users.user_id WHERE question_id=${req.params.id}`, (error, result) => {
    if(error) {
      res.status(400).send(error.message);
    } else {
      var answer = result.rows;
      pool.query(`SELECT vote from question_votes where question_id=${req.params.id} AND user_id=${user}`, (error, result) => {
        if(error) {
          res.status(400).send(error.message);
        } else {
          answer = [answer, result.rows];
          res.status(200).send(answer);
        }
      })
      
    }
  })
})



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
