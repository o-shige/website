var express = require("express");
var router = express.Router();
const User = require("../models/user");

router.post("/", function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  // ログインが成功したらユーザーを次のページにリダイレクト
  //   if (username.length > 0 && password.length > 0) {
  //     if (password === "pass") {
  //       //res.send("to nextpage");
  //       res.render("profile", {title: 'profilePage'});
  //     } else {
  //       res.send("Invalid username or password");
  //     }
  //   } else {
  //     res.send("Invalid username or password");
  //   }
  // });
  User.findOne({ where: { username: username, password: password } })
    .then((user) => {
      if (user) {
        if (password == user.password) {
          // ログイン成功
          res.render("profile", { title: "profilePage" });
        } else {
          // ログイン失敗（パスワード不一致）
          res.send("Invalid username or password");
        }
      } else {
        // ログイン失敗（ユーザーが存在しない）
        res.send("Invalid username or password");
      }
    })
    .catch((err) => {
      console.error(err);
      res.send("Error occurred while processing your request");
    });
});

module.exports = router;
