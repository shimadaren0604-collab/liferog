// ロブリックの JavaScript タブに貼って使う（実機で動作確認済み）
Robohon.startBlocks();
Robohon.speech('前、後ろ、右、左で動くよ。おしまいで終わるね。');
while (true) {
  Robohon.speech('どうする？');
  Robohon.listenWaitAny();
  var w = Robohon.value('LastListenWord');
  if (w.indexOf('前') >= 0) {
    Robohon.speech('前に進むよ。');
    Robohon.stepMotion(3, '歩、前へ歩く');
  } else if (w.indexOf('後ろ') >= 0) {
    Robohon.speech('下がるね。');
    Robohon.stepMotion(2, '歩、後ろへ歩く');
  } else if (w.indexOf('右') >= 0) {
    Robohon.stepMotion(3, '回、右に回る');
  } else if (w.indexOf('左') >= 0) {
    Robohon.stepMotion(3, '回、左に回る');
  } else if (w.indexOf('おしまい') >= 0) {
    Robohon.speech('楽しかった！またあそぼうね。');
    break;
  } else {
    Robohon.speech('ごめん、もう一回言って。');
  }
}
