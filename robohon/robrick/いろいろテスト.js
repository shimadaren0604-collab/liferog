// いろいろ順番に試すテスト（JavaScript タブに貼る）
// 「次は○○」と言ってから実行する。止まったら直前の○○が使えない名前。
Robohon.startBlocks();
Robohon.speech('いろいろテストするよ。');

// ---- 1. 動き（move） ----
var moves = ['右を向く', '下を向く', 'よろしくね', 'おやすみ', 'えへへ', '満腹',
             '小さく左手を上げる', '左手を下げる', '大きく右手を上げる', '右手を下げる'];
for (var i = 0; i < moves.length; i++) {
  Robohon.speech('次は、' + moves[i]);
  Robohon.move(moves[i]);
}

// ---- 2. しゃべりながら動く（speakmove） ----
Robohon.speakmove('しゃべりながら手をあげるよ。', '大きく右手を上げる');
Robohon.move('右手を下げる');

// ---- 3. 歩く・回る（stepMotion） ----
Robohon.speech('次は、右に回る');
Robohon.stepMotion(3, '回、右に回る');
Robohon.speech('次は、左に回る');
Robohon.stepMotion(3, '回、左に回る');

// ---- 4. しゃべる速さ ----
var speeds = ['とても遅く', 'ちょっと遅く', '普通の速さに', 'ちょっと速く', 'とても速く'];
for (var j = 0; j < speeds.length; j++) {
  Robohon.changeSpeakSpeed(speeds[j]);
  Robohon.speech(speeds[j] + 'しゃべるよ。');
}
Robohon.changeSpeakSpeed('普通の速さに');

// ---- 5. 英語でしゃべる ----
Robohon.changeTTS('英語');
Robohon.speech('Hello, nice to meet you.');
Robohon.changeTTS('日本語');

// ---- 6. 待つ ----
Robohon.speech('3秒待つよ。');
Robohon.wait(3);
Robohon.speech('3秒たったよ。');

// ---- 7. 計算してしゃべる ----
var a = Math.floor(Math.random() * 10) + 1;
var b = Math.floor(Math.random() * 10) + 1;
Robohon.speech(a + 'たす' + b + 'は、' + (a + b) + 'だよ。');

// ---- 8. 歌とダンス ----
Robohon.speech('次は、歌');
Robohon.sing('ランダム');
Robohon.speech('次は、ダンス');
Robohon.dance('ランダム');

Robohon.speech('テストおわり！全部できたよ。');
