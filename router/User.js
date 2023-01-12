// User를 위한 라우터
let express = require("express");
let router = express.Router();

// User 모델을 가지고 온다
const { User } = require("../model/UserModel");

// 사용자 가입 등록
router.post("/register", (req, res) => {
  // console.log(req.body);
  const userData = new User(req.body);
  userData
    .save()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false });
    });
});

// 이름 중복검사
router.post("/namecheck", (req, res) => {
  console.log(req.body.displayName);
  User.findOne({ displayName: req.body.displayName })
    .exec()
    .then((doc) => {
      let check = true;
      if (doc) {
        check = false;
      }
      res.status(200).json({ success: true, check });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false });
    });
});

module.exports = router;
