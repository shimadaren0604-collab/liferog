// if（条件分岐）のテスト（JavaScript タブに貼る）
// ※ 動きの名前は変数で渡せないので、分岐ごとに直接書く
Robohon.startBlocks();
Robohon.speech('条件分岐のテストをするよ。');

// ---- 1. if / else：サイコロ ----
var dice = Math.floor(Math.random() * 6) + 1;
Robohon.speech('サイコロをふるよ。' + dice + 'が出たよ。');
if (dice >= 4) {
  Robohon.speech('大きい数だ！');
  Robohon.move('大きく右手を上げる');
  Robohon.move('右手を下げる');
} else {
  Robohon.speech('小さい数だね。');
  Robohon.move('下を向く');
}

// ---- 2. else if：偶数・奇数と 6 ----
if (dice == 6) {
  Robohon.speech('6はいちばん大きい目だよ。');
} else if (dice % 2 == 0) {
  Robohon.speech(dice + 'は偶数だよ。');
} else {
  Robohon.speech(dice + 'は奇数だよ。');
}

// ---- 3. かつ（&&）・または（||） ----
var hour = new Date().getHours();
Robohon.speech('今は' + hour + '時だよ。');
if (hour >= 5 && hour < 11) {
  Robohon.speech('おはよう！');
} else if (hour >= 11 && hour < 18) {
  Robohon.speech('こんにちは！');
} else {
  Robohon.speakmove('こんばんは。', 'おやすみ');
}

// ---- 4. 聞いた言葉で分岐（はい／いいえ） ----
Robohon.speech('ダンスを見たい？はいか、いいえで答えてね。');
Robohon.listenWaitAny();
var ans = Robohon.value('LastListenWord');
if (ans.indexOf('はい') >= 0 || ans.indexOf('うん') >= 0) {
  Robohon.speech('じゃあ踊るね！');
  Robohon.dance('ランダム');
} else if (ans.indexOf('いいえ') >= 0 || ans.indexOf('いや') >= 0) {
  Robohon.speech('そっか、残念。');
  Robohon.move('下を向く');
} else {
  Robohon.speech(ans + '、って聞こえたよ。よくわからなかった。');
  Robohon.move('えへへ');
}

// ---- 5. 入れ子の if：数あてクイズ ----
var answer = Math.floor(Math.random() * 3) + 1;
Robohon.speech('1、2、3のどれかを思いうかべたよ。どれだと思う？');
Robohon.listenWaitAny();
var guess = Robohon.value('LastListenWord');
if (guess.indexOf(String(answer)) >= 0) {
  Robohon.speech('正解！すごい！');
  Robohon.move('満腹');
} else {
  if (guess.indexOf('1') >= 0 || guess.indexOf('2') >= 0 || guess.indexOf('3') >= 0) {
    Robohon.speech('ざんねん。正解は' + answer + 'でした。');
  } else {
    Robohon.speech('数字が聞き取れなかったよ。正解は' + answer + 'でした。');
  }
}

Robohon.speech('条件分岐のテストおわり！');
