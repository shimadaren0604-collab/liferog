// リストを使ったかんたん英会話・軽量版（JavaScript タブに貼る）
// 命令の数を減らして反応を速くした：言語切り替えは最初と最後の1回だけ、判定なし
Robohon.startBlocks();

var questions = ['Hello! How are you?', 'What is your favorite food?', 'Do you like robots?'];
var replies   = ['Great! Me too.', 'Sounds delicious!', 'Thank you! I like you, too.'];

Robohon.speech('英語でお話ししよう。');
Robohon.changeTTS('英語');
Robohon.changeASR('英語');

for (var i = 0; i < questions.length; i++) {
  Robohon.speech(questions[i]);
  Robohon.listenWaitAny();
  Robohon.speech(replies[i]);
}

Robohon.changeTTS('日本語');
Robohon.changeASR('日本語');
Robohon.speech('おしまい！またお話ししようね。');
