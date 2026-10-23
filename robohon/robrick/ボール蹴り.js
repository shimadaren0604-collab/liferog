// ボール蹴りの課題（JavaScript タブに貼る）
// 1. 座る → 立つ → 右にランダム(3〜7)回る → 前にランダム(2〜5)歩く
// 2. 「僕をボールまで案内して」→ 「右」「左」「前」の声で動く
// 3. 「そこ」「蹴って」などでキック → 蹴れたか確認 → 蹴れたら終了、まだなら 2 から
Robohon.startBlocks();

// ---- 1. スタート位置をランダムにする ----
Robohon.standSit('座る');
Robohon.standSit('立ち上がる');
var turn = Math.floor(Math.random() * 5) + 3;   // 3〜7
var walk = Math.floor(Math.random() * 4) + 2;   // 2〜5
Robohon.stepMotion(turn, '回、右に回る');
Robohon.stepMotion(walk, '歩、前へ歩く');

// ---- 2〜3. 案内 → キック → 確認 ----
var done = false;
while (!done) {
  Robohon.speech('僕をボールまで案内して。');

  // 案内してもらう
  while (true) {
    Robohon.listenWaitAny();
    var w = Robohon.value('LastListenWord');
    if (w.indexOf('そこ') >= 0 || w.indexOf('蹴') >= 0 || w.indexOf('キック') >= 0 || w.indexOf('シュート') >= 0) {
      break;
    } else if (w.indexOf('右') >= 0) {
      Robohon.stepMotion(2, '回、右に回る');
    } else if (w.indexOf('左') >= 0) {
      Robohon.stepMotion(2, '回、左に回る');
    } else if (w.indexOf('前') >= 0) {
      Robohon.stepMotion(2, '歩、前へ歩く');
    } else {
      Robohon.speech('右、左、前、で教えてね。');
    }
  }

  // キック（キック専用の動きがないので、勢いよく前に出て当てる）
  Robohon.speech('いくよ、えいっ！');
  Robohon.stepMotion(2, '歩、前へ歩く');

  // 蹴れたか確認
  Robohon.speech('ボール、蹴れた？');
  Robohon.listenWaitAny();
  var ans = Robohon.value('LastListenWord');
  if (ans.indexOf('はい') >= 0 || ans.indexOf('うん') >= 0 || ans.indexOf('蹴れた') >= 0) {
    done = true;
  } else {
    Robohon.speech('ざんねん。もう一回やるね。');
  }
}

Robohon.speech('やったー！ゴール！');
Robohon.move('大きく右手を上げる');
Robohon.move('右手を下げる');
