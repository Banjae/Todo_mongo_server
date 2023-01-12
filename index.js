// express 서버
const express = require("express");
// 서버 경로 모듈
const path = require("path");
// mongoose 모듈
const mongoose = require("mongoose");
// const { Todo } = require("./model/TodoModel.js");

// 개발 인증 관련
const config = require("./config/key.js");
const app = express();
const port = 5000;
// 고정된 Path 경로 설정
app.use(express.static(path.join(__dirname, "../client/build/")));
// 요청이 들어오면 json 사용 및 url 인코딩
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Post Router 연결
app.use("/api/post", require("./router/Post"));

// User Router 연결
app.use("/api/user", require("./router/User"));

// 서버가 요청을 받아들이기 위해서 대기 중
app.listen(port, () => {
  // MONGO DB 관련
  mongoose
    .connect(config.mongoURI)
    .then(() => {
      console.log("DB Connect Success");
      console.log(`Example app listening on port ${port}`);
    })
    .catch((err) => {
      console.log("DB Connect ${err}");
    });
});

// 요청 : Request
// 응답 : Response
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// // 할일 등록
// app.post("/api/post/submit", (req, res) => {
//   // console.log(요청.body);
//   let temp = req.body;
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

// // 목록 읽어오기
// app.post("/api/post/list", (req, res) => {
//   Todo.find({})
//     .exec()
//     .then((doc) => {
//       res.status(200).json({ success: true, initTodo: doc });
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(400).json({ success: false });
//     });
// });

// // 할일 completed 업데이트
// app.post("/api/post/updatetoggle", (req, res) => {
//   let temp = { completed: req.body.completed };
//   // mongoose 문서참조
//   Todo.updateOne({ id: req.body.id }, { $set: temp })
//     .exec()
//     .then(() => {
//       console.log("업데이트 완료");
//       res.status(200).json({ success: true });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json({ success: false });
//     });
// });

// // 타이틀 업데이트
// app.post("/api/post/updatetitle", (req, res) => {
//   let temp = { title: req.body.title };
//   Todo.updateOne({ id: req.body.id }, { $set: temp })
//     .exec()
//     .then(() => {
//       console.log("업데이트 완료");
//       res.status(200).json({ success: true });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json({ success: false });
//     });
// });

// // 할일 삭제
// app.post("/api/post/delete", (req, res) => {
//   Todo.deleteOne({ id: req.body.id })
//     .exec()
//     .then(() => {
//       res.status(200).json({ success: true });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json({ success: false });
//     });
// });

// // 모두 삭제
// app.post("/api/post/deleteall", (req, res) => {
//   Todo.deleteMany()
//     .exec()
//     .then(() => {
//       res.status(200).json({ success: true });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json({ success: false });
//     });
// });

app.post("/api/user/register", (req, res) => {});
