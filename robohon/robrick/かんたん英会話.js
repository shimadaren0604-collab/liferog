// リストを使ったかんたん英会話（JavaScript タブに貼る）
// questions[i] を英語で聞き、keywords[i] のどれかが聞こえたら replies[i] を返す
Robohon.startBlocks();

// ---- 会話のリスト（ここを書きかえれば内容を変えられる） ----
var questions = ['Hello! How are you?', 'What is your favorite food?', 'Do you like robots?'];
var keywords  = [['fine', 'good', 'great', 'ok'], ['i like', 'pizza', 'sushi', 'curry', 'ramen'], ['yes', 'no']];
var replies   = ['Great! I am fine, too.', 'Sounds delicious!', 'Thank you for answering!'];
var hints     = ['アイム、ファイン、って答えてみてね。', 'アイ、ライク、スシ、みたいに答えてみてね。', 'イエス、か、ノー、で答えてね。'];
var examples  = ['I am fine, thank you.', 'I like sushi.', 'Yes, I do.'];

Robohon.changeTTS('日本語');
Robohon.speech('英語でお話ししよう。英語で答えてね。');
Robohon.changeASR('英語');

var score = 0;
for (var i = 0; i < questions.length; i++) {
  var ok = false;
  // 1つの質問につき 2回までチャレンジ
  for (var t = 0; t < 2 && !ok; t++) {
    Robohon.changeTTS('英語');
    Robohon.speech(questions[i]);
    Robohon.listenWaitAny();
    var heard = String(Robohon.value('LastListenWord')).toLowerCase();
    for (var k = 0; k < keywords[i].length; k++) {
      if (heard.indexOf(keywords[i][k]) >= 0) {
        ok = true;
      }
    }
    if (ok) {
      if (i == 2 && heard.indexOf('no') >= 0) {
        Robohon.speech('Oh, really? I will try to be a good robot!');
      } else {
        Robohon.speech(replies[i]);
      }
      score = score + 1;
    } else {
      Robohon.changeTTS('日本語');
      Robohon.speech('こう聞こえたよ。');
      Robohon.changeTTS('英語');
      Robohon.speech(heard);
      Robohon.changeTTS('日本語');
      Robohon.speech(hints[i]);
    }
  }
  if (!ok) {
    Robohon.changeTTS('日本語');
    Robohon.speech('お手本はこうだよ。');
    Robohon.changeTTS('英語');
    Robohon.speech(examples[i]);
  }
}

// ---- おわり ----
Robohon.changeTTS('日本語');
Robohon.changeASR('日本語');
Robohon.speech(questions.length + '問中、' + score + '問答えられたよ。');
if (score == questions.length) {
  Robohon.speech('ぜんぶ通じたね！お祝いに踊るよ。');
  Robohon.dance('ランダム');
} else {
  Robohon.speech('また練習しようね。');
  Robohon.move('えへへ');
}
