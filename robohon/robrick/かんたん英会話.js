// リストを使ったかんたん英会話（JavaScript タブに貼る）
// 答えにキーワードが入っていなければ "One more time, please." と言って聞き直す（3回まで）
// 反応を速くするため、言語の切り替えは最初と最後の1回だけ
Robohon.startBlocks();

var questions = ['Hello! How are you?', 'What is your favorite food?', 'Do you like robots?'];
var keywords  = [['fine', 'good', 'great', 'ok'], ['like', 'pizza', 'sushi', 'curry', 'ramen'], ['yes', 'no']];
var replies   = ['Great! Me too.', 'Sounds delicious!', 'Thank you for answering!'];

Robohon.speech('英語でお話ししよう。');
Robohon.changeTTS('英語');
Robohon.changeASR('英語');

for (var i = 0; i < questions.length; i++) {
  Robohon.speech(questions[i]);
  var ok = false;
  for (var t = 0; t < 3 && !ok; t++) {
    Robohon.listenWaitAny();
    var heard = String(Robohon.value('LastListenWord')).toLowerCase();
    for (var k = 0; k < keywords[i].length; k++) {
      if (heard.indexOf(keywords[i][k]) >= 0) {
        ok = true;
      }
    }
    if (!ok && t < 2) {
      Robohon.speech('One more time, please.');
    }
  }
  if (ok) {
    Robohon.speech(replies[i]);
  } else {
    Robohon.speech('That is OK. Next question.');
  }
}

Robohon.changeTTS('日本語');
Robohon.changeASR('日本語');
Robohon.speech('おしまい！またお話ししようね。');
