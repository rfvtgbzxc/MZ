# [レベル上限限界突破](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_LevelUnlimited.js)
# Ver.1.2.0  
 [ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_LevelUnlimited.js)

アクターのレベルの最大値を100以上にすることができます。  

### 最大レベルの設定
アクターのメモ欄  
`<MaxLevel:[maxlevel]>` 最大レベルを設定します。  
`<MaxLevel:200>` 最大レベルが200になります。  

`<StartLevel:[level]>` 加入時の初期レベルを設定します。  
`<StartLevel:120>` 加入時のレベルが120になります。  

`<TestMaxLevel:[level]>` テスト戦闘でのレベルを設定します。  
`<TestMaxLevel:130>` テスト戦闘でのレベルを130に設定します。

### レベル100以上でのスキル習得設定
データベース上ではレベル99まで設定できませんが、習得スキルのメモ欄に以下を記入します。  
`<LearnSkill:[Learnlevel]>` 習得レベルを設定します。  
`<LearnSkill:153>` 設定のスキルをレベル153で習得します。  
上記のタグを記入した場合、データベース上で設定している習得するスキルのレベルは無視されます。  

## 更新履歴
2022/9/18 Ver 1.2.0  
テストプレイ時のレベルにレベル100以上できる機能を追加。  
2021/6/27 Ver 1.1.0  
初期レベルをレベル100以上に設定できる機能を追加。  
2020/12/12 Ver 1.0.1  
レベル100以上のステータスの計算が間違っていたのを修正。  
2020/12/12 Ver 1.0.0  
初版  
