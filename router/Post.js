// Todo를 위한 라우터
let express = require("express");
let router = express.Router();

// Todo 모델을 가지고 온다
const { Todo } = require("../model/TodoModel");

// User 모델의 내용을 참조
const { User } = require("../model/UserModel");

// 할일 등록
router.post("/submit", (req, res) => {
  // console.log(요청.body);
  // let temp = req.body;
  let temp = {
    id: req.body.id,
    title: req.body.title,
    completed: req.body.completed,
    uid: req.body.uid,
    // 바로 author를 저장할수 없다
    // User Model 에서 uid를 이용해서
    // ObjectId 를 알아내고 내용을 복사
  };

  // User Model 에서 req.body.uid 로 받은 값을
  // 이용해서 자료를 추출
  User.findOne({ uid: req.body.uid })
    .exec()
    .then((userInfo) => {
      // console.log(userInfo);
      temp.author = userInfo._id;
      // 실제 Post model 업데이트
      const todoPost = new Todo(temp);
      todoPost
        .save()
        .then(() => {
          // 데이터 저장이 성공한 경우
          res.status(200).json({ success: true });
        })
        .catch((err) => {
          // 데이터 저장이 실패한 경우
          console.log(err);
          res.status(400).json({ success: false });
        });
    })
    .catch((err) => {
      console.log(err);
    });
});
//   const todoPost = new Todo(temp);
//   todoPost
//     .save()
//     .then(() => {
//       // 데이터 저장 성공한 경우
//       res.status(200).json({ success: true });
//     })
//     .catch(() => {
//       // 데이터 저장 실패한 경우
//       console.log(err);
//       res.status(400).json({ success: false });
//     });
// });

// 목록 읽어오기
router.post("/list", (req, res) => {
  let sort = {};
  if (req.body.sort === "최신순") {
    sort = { id: -1 };
  } else {
    sort = { id: 1 };
  }

  Todo.find({ title: new RegExp(req.body.search), uid: req.body.uid })
    .populate("author")
    .sort(sort)
    .skip(req.body.skip)
    .limit(5)
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, initTodo: doc });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ success: false });
    });
});

// 할일 completed 업데이트
router.post("/updatetoggle", (req, res) => {
  let temp = { completed: req.body.completed };
  // mongoose 문서참조
  Todo.updateOne({ id: req.body.id }, { $set: temp })
    .exec()
    .then(() => {
      console.log("업데이트 완료");
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false });
    });
});

// 타이틀 업데이트
router.post("/updatetitle", (req, res) => {
  let temp = { title: req.body.title };
  Todo.updateOne({ id: req.body.id }, { $set: temp })
    .exec()
    .then(() => {
      console.log("업데이트 완료");
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false });
    });
});

// 할일 삭제
router.post("/delete", (req, res) => {
  Todo.deleteOne({ id: req.body.id })
    .exec()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false });
    });
});

// 모두 삭제
router.post("/deleteall", (req, res) => {
  Todo.deleteMany()
    .exec()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false });
    });
});

// 사용자 제거
router.post("/userout", (req, res) => {
  console.log("사용자 삭제 ", req.body);
  // mongoose 문서참조
  User.deleteOne({ uid: req.body.uid })
    .exec()
    .then(() => {
      console.log("사용자 삭제 성공!!!");
      // 실제 Post Model 업데이트
      Todo.deleteMany({ uid: req.body.uid })
        .then(() => {
          console.log("기록물 삭제 성공!!!");
          res.status(200).json({ success: true });
        })
        .catch((err) => {
          // 데이터 저장이 실패한 경우
          console.log(err);
          res.status(400).json({ success: false });
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
