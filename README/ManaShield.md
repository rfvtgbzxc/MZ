# [マナシールド](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_ManaShield.js)
# Ver.1.1.1
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_ManaShield.js)  

HPダメージの代わりにMPにダメージを受けさせます。  
最大HPが1000 最大MPが600の場合  
#### 【HPダメージ量】  
受けたダメージの肩代わりしたダメージ分、MPにダメージを受けます。  
500のHPダメージを受けた時に５０％の場合はMPが250減りHPは250だけダメージを受けます。  
MPの変換後負担率が６０％の場合はMPが150減りHPは250のダメージを受けます。  
#### 【最大HP割合比例】  
受けたダメージの肩代わりしたダメージ分が最大HPからの割合と最大MPに比例してMPにダメージを受けます。  
500のHPダメージを受けた時に５０％の場合はMPが150減りHPは250だけダメージを受けます。  
MPの変換後負担率が６０％の場合はMPが90減りHPは250のダメージを受けます。  

### 設定方法
特徴を有するメモ欄  
`<ManaShield:[rate]>` マナシールドを発動する特徴を設定します。  
[rate]:肩代わりするダメージの割合  
`<ManaShield:50>` HPダメージの50％がMPダメージに変換されます。  

![gif](img/DamagePopUpSimulDisplay1.gif)  

### 更新履歴
2022/1/29  Ver.1.1.1  
元の機能と選択できるように変更。  
2022/1/29  Ver.1.1.0  
MPダメージの計算方法を最大HPからの割合で算出するように変更。  
2021/8/1 Ver.1.0.1  
MPダメージを受けてないのにSEが再生される問題を修正。  
MP不足だった時のHPダメージが正常に計算されていなかった問題を修正。  
回復時にも影響していた問題を修正。  
2021/8/1 Ver.1.0.0  
初版  
