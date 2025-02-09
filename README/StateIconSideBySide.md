# [ステート横並び表示](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_StateIconSideBySide.js)
# Ver.1.3.2
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_StateIconSideBySide.js)

戦闘中に表示するステートを横並び表示にします。  
総ステート数が表示できる個数を超えた場合はアイコンが切り替わります。  
このプラグインには残りターンを表示する機能が備わっているため、ステート、バフ残りターン表示プラグインとの併用はできません。  

![画像](img/StateIconSideBySide1.png)  

## 設定方法
#### 表示ターンモード  
'remaining'指定時のデフォルトの補正値は1です。  
'elapsed'指定時はターン数補正を-1に設定してください。  
経過ターンを表示させるには[ステート経過ターンカウント](https://github.com/nuun888/MZ/blob/master/README/StateTurnCount.md)プラグインが必要です。  

ステートアイコンの座標を変更するプラグインを使用している場合は、味方アイコン表示位置座標の設定をデフォルトにしてください。  

## 競合情報
MOG_BattleHudには対応しておりません。  

## 更新履歴
2022/8/22 Ver.1.3.2  
アイコンの表示位置とアイコンの表示揃えの設定を分割。  
2022/7/2 Ver.1.3.1  
メンバー交代後ステートアイコンが残ってしまう問題を修正。  
2022/4/9 Ver.1.3.0  
表示アイコンの行を指定できる機能を追加。  
処理の軽量化。  
2022/3/31 Ver.1.2.3  
疑似3Dバトルとの併用時にアクターのステートが表示されない問題を修正。  
2022/3/30 Ver.1.2.2  
ステートが表示できる個数を超えて付加されている時に画像が乱れる問題を修正。  
2022/3/28 Ver.1.2.1  
特定のプラグインにてアイコン表示部分に線のような画像が表示されてしまう問題を修正。  
2022/1/21 Ver.1.1.0  
ステートのターンの表示方法に経過ターンを追加。（要ステート経過ターンカウント）  
2021/9/23 Ver.1.1.0  
ステートの表示切り替え反映による処理の大幅変更。  
敵にも横並び表示に出来る機能を追加。  
2021/1/24 Ver.1.0.3  
バトルスタイル拡張併用時の処理を再度修正。  
2021/1/17 Ver.1.0.2  
バトルスタイル拡張プラグイン導入時、ステートの座標許可をtureにすると座標が反映されない問題を修正。  
バトルスタイル拡張プラグイン2.0.0以降対応。  
2021/1/3 Ver.1.0.1  
表示する横幅を指定できるように変更。  
2021/1/2 Ver.1.0.0  
初版  
