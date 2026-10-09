# ロボホン版ライフログ

`lifelog_v2.html` をロボホンの中で動かし、記録をロボホンが読み上げるアプリです。

## できること
- ヘッダーの「🤖 読み上げ」ボタン → 選んでいる日の記録をロボホンが読み上げる
- 「保存」ボタン → ロボホンが「保存したよ」と言う
- ロボホンに「今日の記録を教えて」と話しかける → 読み上げる

## ファイル構成
```
robohon/
├── assets/
│   ├── robohon.js          … JS 側（読み上げ文の作成・ボタン追加）
│   └── hvml/lifelog.hvml   … ロボホンの発話シナリオ
├── java/
│   ├── MainActivity.java   … WebView ＋ JS ブリッジ
│   └── RobohonSpeaker.java … SDK を呼ぶ部分（ここだけ SDK に依存）
└── AndroidManifest.xml     … 追加する箇所に ★ 印
```

## 手順（コピペ）
1. RoBoHoN SDK のサンプルプロジェクトを1つ複製して Android Studio で開く
   （パッケージ名は `com.example.robohonlifelog` に変更。別の名前にするなら、
   Java・HVML 内の `com.example.robohonlifelog` を全部置き換える）
2. `app/src/main/assets/` に次のファイルを置く
   - `lifelog_v2.html` を **`index.html`** という名前でコピーし、`</body>` の直前に
     `<script src="robohon.js"></script>` を1行追加する
   - `robohon.js`
   - `hvml/lifelog.hvml`（サンプルの hvml フォルダにある既存ファイルは消すか置き換える）
3. `app/src/main/java/com/example/robohonlifelog/` に `MainActivity.java` と
   `RobohonSpeaker.java` を置く
4. サンプルの **util パッケージ**（`VoiceUIListenerImpl` / `VoiceUIManagerUtil` /
   `VoiceUIVariableUtil`）を `com.example.robohonlifelog.util` に置く
5. `AndroidManifest.xml` の ★ の箇所を反映する
6. ロボホン実機にインストールして起動する

## 実機の前にブラウザで確認する
`index.html` と `robohon.js` を同じフォルダに置いて PC のブラウザで開くと、
ロボホンの代わりにブラウザの音声合成でしゃべります。読み上げる文章はここで確認できます。

## うまく動かないとき
- **util クラスのメソッド名が違う**：SDK のバージョンによって、サンプル util の
  クラス名やメソッド名（`ScenarioCallback` / `onScenarioEvent` など）が違うことがあります。
  `RobohonSpeaker.java` を手元のサンプルの書き方に合わせてください。
  SDK に触っているのはこのファイルだけです。
- **しゃべらない**：Logcat で `RobohonSpeaker` を確認し、HVML の `scene` / `accost` の値と
  Java の定数（`SCENE_COMMON` / `ACC_SPEAK` / `MEM_P_TEXT`）が一致しているか見てください。
- **グラフが出ない**：Wi-Fi が切れていると Chart.js を CDN から読めません。
  気になる場合は `chart.umd.min.js` をダウンロードして assets に入れ、
  `<script src="chart.umd.min.js">` に書き換えてください。
