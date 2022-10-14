# [TPBタイムライン](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_TPBTimeLine.js)
# Ver.1.0.1
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_TPBTimeLine.js)  

戦闘画面にTPBタイムラインを表示します。  
バトラーが移動する方向は、上から下、下から上、左から右、右から左の4パターンから選択できます。  

![gif](img/TimeLine1.gif)

## 設定
#### アクター、敵キャラのメモ欄  
`<TimeLineImg:[img]>` 画像タイプを画像に指定したときに表示する画像ファイル名を設定します。未指定の場合はキャラチップが表示されます。  
`[img]`:イメージファイル(拡張子なし)  

#### 敵キャラのメモ欄  
`<TpbTimeLineCharacter:[img], [index]>` 画像タイプをキャラチップに指定したときに表示する画像ファイル名を設定します。未指定の場合はモンスター画像で表示されます。  
`[img]`:characters直下のイメージファイル(拡張子なし)  
`[index]`:インデックス  

#### バトラー表示高さ
タイムライン上に表示するバトラー画像の最大高さを指定します。  

## 更新履歴
2022/7/10 Ver.1.0.1  
敵の画像設定を画像に指定すると戦闘開始時にエラーが出る問題を修正。  
タイムラインの画面上の基本位置を設定する機能を追加。  
2022/7/9 Ver.1.0.0  
初版  
