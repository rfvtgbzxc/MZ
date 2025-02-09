# [アイテム最大所持数変更](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_MaxItem.js)
# Ver.1.4.0  
 [ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_MaxItem.js)  
 #### 必須、前提プラグイン
[共通処理](https://github.com/nuun888/MZ/blob/master/README/Base.md)  

アイテムの最大所持数を変更します。  

## 設定
アイテム、武器、防具のメモ欄　　
`<MaxItems:10>` そのアイテムは最大１０個までしか持つことはできません。  
`<NoItemNum>` アイテムの個数を表示しません。  
`<ItemGroup:[GroupName]>` アイテムのグループを割り当てます。`[GroupName]`:グループ名  
アイテムのグループごとに最大所持数を変更するときに使用します。  
`<ItemGroup:回復>`このアイテムのグループは回復に属します。  
  
優先度  
個別に設定した最大数 ＞ 変更した最大数 ＞ グループの最大所持数 ＞ カテゴリー内の最大数 ＞ デフォルト最大数  
  
最大所持数を高く設定すると個数表示上、文字が潰れて読みづらくなった場合、個数の桁数の増やしてみてください。（デフォルト00)  

グループまたはカテゴリーごとに最大所持数を設定できます。なおカテゴリーは別途NUUN_ItemCategoryが必要です。  
優先度はグループの最大所持数＞カテゴリーの最大所持数になります。  
`<CategoryType:[key]>` に設定したカテゴリーのアイテムのデフォルトの最大所持数が変更されます。  

#### 予約キー
`keyItem`：大事なもの  
`HiddenItemA`：隠しアイテムA  
`HiddenItemB`：隠しアイテムB  

## 更新履歴
2022/6/11 Ver 1.4.0  
変更した最大数と個別に設定した最大数の適用優先度を変更。  
個数表示を別プラグイン化。  
2021/10/21 Ver 1.3.1  
防具の最大数の変更が正常に反映されていなかった問題を修正。  
2021/10/17 Ver 1.3.0  
アイテム個別の最大所持数を変更しても反映されない問題を修正。  
グループとカテゴリーの最大所持数の設定を共通化。 
2021/7/24 Ver 1.2.0  
最大所持数を変更できる機能を追加。  
2021/7/11 Ver 1.1.0  
特定のアイテム個数を非表示にする機能を追加。  
所持個数/最大個数で表示させる機能を追加。  
2021/6/21 Ver 1.0.1  
隠しアイテムに対応。（要NUUN_ItemCategory）  
2021/6/20 Ver 1.0.0  
初版  
