# [ダメージ床拡張](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_DamagedFloorEX.js)
# Ver.1.1.0
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_DamagedFloorEX.js)  
#### 必須、前提プラグイン
[共通処理](https://github.com/nuun888/MZ/blob/master/README/Base.md)  

ダメージ床のダメージ時の処理を拡張します。

## 設定方法
### 床のダメージを設定
ダメージ床の設定は評価式が使用できます。  
`a`：アクター  
例  
`Math.max(1,a.mhp * 0.01)`　最大HPの1％のダメージを受けます。  

## ダメージ床設定
ダメージ床設定では指定したタイルセットを指定しているマップで適用されます。
### 適用条件
適用できる条件はリージョンIDまたは地形タグから指定できます。  
リージョン設定を0にすることでリージョンを指定していないマップタイルで適用されます。  
リージョンIDまたは地形タグを両方指定している場合はどちらかが一致したときに適用されます。  
リージョン、地形タグを設定した条件は上のほうに設定してください。  
同じマップ内で異なる床ダメージを設定できます。  
例  
リージョン1 毒の沼　10ダメージ　リージョン2 猛毒の沼25ダメージ  
### フラッシュ設定  
フラッシュ設定はフレーム数の数値を0と入力することでフラッシュされません。

## 更新履歴  
2022/4/2 Ver.1.1.0
特定のアクターのみダメージを受ける機能を追加。  
フラッシュの設定方法を変更。  
2021/10/31 Ver.1.0.3  
地形タグ、フラッシュを設定できる機能を追加。  
2021/10/24 Ver.1.0.2  
床ダメージを評価式が使用できるように変更。  
2021/10/24 Ver.1.0.1  
デフォルトの床ダメージ、床ダメージ時のSEを指定できる機能を追加。  
2021/10/24 Ver.1.0.0  
初版  
