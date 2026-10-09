/* ============================================================
   robohon.js — ライフログ × ロボホン連携
   lifelog_v2.html の </body> 直前に
     <script src="robohon.js"></script>
   を1行追加して読み込む（本体スクリプトより後に読むこと）。

   - ロボホン上（WebView）: Java 側の RobohonBridge.speak() で発話
   - PC/スマホのブラウザ  : Web Speech API で代わりに読み上げ（動作確認用）
============================================================ */
(function () {
  'use strict';

  const onRobohon = typeof window.RobohonBridge !== 'undefined';

  /** テキストをしゃべらせる */
  function speak(text) {
    if (!text) return;
    if (onRobohon) {
      window.RobohonBridge.speak(text);
    } else if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'ja-JP';
      speechSynthesis.speak(u);
    } else {
      showToast('🤖 ' + text);
    }
  }

  /** 分 → 「X時間Y分」（読み上げ用） */
  function minsToSpeech(mins) {
    if (!mins) return '0分';
    const h = Math.floor(mins / 60), m = mins % 60;
    if (h && m) return `${h}時間${m}分`;
    return h ? `${h}時間` : `${m}分`;
  }

  /** 指定日の保存データから読み上げ文を作る */
  function buildDayReport(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    const dateLabel = `${d.getMonth() + 1}月${d.getDate()}日`;
    const day = loadAllData()[dateStr];
    if (!day) return `${dateLabel}の記録は、まだないよ。`;

    const parts = [`${dateLabel}の記録だよ。`];

    const tasks = day.tasks || [];
    if (tasks.length) {
      const total = tasks.reduce((s, t) => s + timeDiffMin(t.start, t.end), 0);
      const titles = tasks.slice(0, 3).map(t => t.title).join('、');
      parts.push(`タスクは${tasks.length}件。${titles}${tasks.length > 3 ? 'など' : ''}。`);
      if (total) parts.push(`合計${minsToSpeech(total)}がんばったね。`);
    } else {
      parts.push('タスクの記録はなかったよ。');
    }

    const sleep = timeDiffMin(day.sleep?.start, day.sleep?.end);
    if (sleep) {
      parts.push(`睡眠は${minsToSpeech(sleep)}。`);
      if (sleep < 360) parts.push('ちょっと寝不足かも。');
    }

    const inc = day.money?.income || 0, exp = day.money?.expense || 0;
    if (inc || exp) {
      parts.push(`収入${inc}円、支出${exp}円。`);
      const bal = inc - exp;
      parts.push(bal >= 0 ? `差し引き${bal}円のプラスだよ。` : `差し引き${-bal}円のマイナスだよ。`);
    }
    return parts.join('');
  }

  /** 記録タブで選択中の日付を読み上げ */
  function readSelectedDay() {
    speak(buildDayReport(document.getElementById('date-input').value || todayStr()));
  }

  // ---- ヘッダーに「🤖 読み上げ」ボタンを追加 ----
  const btn = document.createElement('button');
  btn.textContent = '🤖 読み上げ';
  btn.style.cssText =
    'background:var(--accent);color:#fff;border:none;border-radius:999px;' +
    'padding:6px 14px;font:600 .8rem var(--font-body);cursor:pointer;';
  btn.addEventListener('click', readSelectedDay);
  const headerDate = document.getElementById('header-date');
  headerDate.parentNode.insertBefore(btn, headerDate);

  // ---- 保存したらロボホンがひとこと ----
  document.getElementById('btn-save').addEventListener('click', () => {
    if (document.getElementById('date-input').value) speak('保存したよ。');
  });

  // Java 側（音声コマンド「今日の記録を教えて」など）からも呼べるよう公開
  window.robohon = { speak, buildDayReport, readSelectedDay };
})();
