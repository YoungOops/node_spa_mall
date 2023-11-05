const mongoose = require("mongoose");
//리콰이어 몽구스라는 명령어 몽구스 패키지에 있는 것을 가져와서 몽구스라는 변수에 할당함

const connect = () => {
  mongoose
    .connect("mongodb://localhost:27017/spa_mall")
    .catch(err => console.log(err));
};

mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err);
});

module.exports = connect;