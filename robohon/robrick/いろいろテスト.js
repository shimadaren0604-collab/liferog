// いろいろ順番に試すテスト（JavaScript タブに貼る）
// 「次は○○」と言ってから実行する。止まったら直前の○○が使えない名前。
// ※ 動き・速さ・言語などの名前は変数で渡せない。必ず '〜' と直接書く。
Robohon.startBlocks();
Robohon.speech('いろいろテストするよ。');

// ---- 1. 動き（move） ----
Robohon.speech('次は、右を向く');
Robohon.move('右を向く');
Robohon.speech('次は、下を向く');
Robohon.move('下を向く');
Robohon.speech('次は、おやすみ');
Robohon.move('おやすみ');
Robohon.speech('次は、えへへ');
Robohon.move('えへへ');
Robohon.speech('次は、満腹');
Robohon.move('満腹');
Robohon.speech('次は、小さく左手を上げる');
Robohon.move('小さく左手を上げる');
Robohon.speech('次は、左手を下げる');
Robohon.move('左手を下げる');
Robohon.speech('次は、大きく右手を上げる');
Robohon.move('大きく右手を上げる');
Robohon.speech('次は、右手を下げる');
Robohon.move('右手を下げる');

// ---- 2. しゃべりながら動く（speakmove） ----
Robohon.speakmove('しゃべりながら手をあげるよ。', '大きく右手を上げる');
Robohon.speakmove('よろしくね。', 'よろしくね'); // よろしくね は speakmove 専用？
Robohon.move('右手を下げる');

// ---- 3. 歩く・回る（stepMotion） ----
Robohon.speech('次は、右に回る');
Robohon.stepMotion(3, '回、右に回る');
Robohon.speech('次は、左に回る');
Robohon.stepMotion(3, '回、左に回る');

// ---- 4. しゃべる速さ ----
Robohon.changeSpeakSpeed('とても遅く');
Robohon.speech('とても遅くしゃべるよ。');
Robohon.changeSpeakSpeed('ちょっと遅く');
Robohon.speech('ちょっと遅くしゃべるよ。');
Robohon.changeSpeakSpeed('ちょっと速く');
Robohon.speech('ちょっと速くしゃべるよ。');
Robohon.changeSpeakSpeed('とても速く');
Robohon.speech('とても速くしゃべるよ。');
Robohon.changeSpeakSpeed('普通の速さに');
Robohon.speech('ふつうに戻したよ。');

// ---- 5. 英語でしゃべる ----
Robohon.changeTTS('英語');
Robohon.speech('Hello, nice to meet you.');
Robohon.changeTTS('日本語');

// ---- 6. 計算してしゃべる ----
var a = Math.floor(Math.random() * 10) + 1;
var b = Math.floor(Math.random() * 10) + 1;
Robohon.speech(a + 'たす' + b + 'は、' + (a + b) + 'だよ。');

// ---- 7. 歌とダンス ----
Robohon.speech('次は、歌');
Robohon.sing('ランダム');
Robohon.speech('次は、ダンス');
Robohon.dance('ランダム');

Robohon.speech('テストおわり！全部できたよ。');
