/*:-----------------------------------------------------------------------------------
 * NUUN_EnemyBook_Ver2.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */ 
/*:
 * @target MZ
 * @plugindesc モンスター図鑑
 * @author NUUN
 * @version 2.0.0
 * 
 * @help
 * モンスター図鑑を実装します。
 * このプラグインではエネミーの表示内容を自由に設定することが出来ます。
 * 
 * 以下の項目が表示できます。
 * 
 * 最大HP（アナライズモードではゲージが表示可能です）
 * 最大MP（アナライズモードではゲージが表示可能です）
 * 攻撃力
 * 防御力
 * 魔法力
 * 魔法防御
 * 敏捷性
 * 運
 * 命中率
 * 回避率
 * 会心率
 * 会心回避率
 * 魔法回避率
 * 魔法反射率
 * 反撃率
 * HP再生率
 * MP再生率
 * TP再生率
 * 狙われ率
 * 防御効果率
 * 回復効果率
 * 薬の知識
 * MP消費率
 * TPチャージ率
 * 物理ダメージ率
 * 魔法ダメージ率
 * 経験値
 * 獲得金額
 * 倒した数
 * モンスター名
 * 名称のみ
 * 耐性属性
 * 弱点属性
 * 無効属性
 * 耐性ステート
 * 弱点ステート
 * 無効ステート
 * 耐性デバフ（未実装）
 * 弱点デバフ（未実装）
 * ドロップアイテム
 * スティールアイテム（盗みスキル導入時）
 * 記述欄（フリーテキストスペース　制御文字が使用できます）
 * オリジナルパラメータ（任意のステータス）
 * 行動（未実装）
 * モンスター画像
 * 
 * 戦闘中にパーティコマンドからエネミー図鑑を開くことが出来ます。
 * アナライズ機能を使う場合、TPBバトルでは開いている間TPBゲージを止める仕様にしています。
 * 
 * 
 * 敵キャラのメモ欄
 * <[tag]:[text]> 記述欄１のテキスト
 * [tag]:記述欄タグ名　デフォルト設定だとモンスターの説明を記述するタグはdesc1に設定されています。
 * [text]:表示するテキスト。
 * 改行すれば何行でも表示可能ですので、独自の項目を追加することも可能です。
 * <desc1:ああああ> desc1とタグ付けされた項目に「ああああ」が表示されます。
 * デフォルト設定では４ページ目に表示される項目にdesc1が設定されていますので、文章を表示させる場合は<desc1:[text]>と記入してください。
 * 
 * <NoBook>
 * モンスター図鑑に表示されません。
 * 
 * <ShowDataBook>
 * 未撃破でも撃破済みと判定されます。また情報がすべて表示されます。
 * 
 * <EB_SVBattler:[fileName]> モンスター画像をサイドビュー画像で表示させます。(モンスターにサイドビューアクターを表示する系のプラグイン導入が前提としています)
 * [fileName]:ファイル名　サイドビューバトラー画像を指定します。sv_actorsフォルダ内のファイル名を拡張子なしで指定してください。
 * <EB_SVBattlerMotion:[motionId]> 指定したモーションで表示させます。記入なしの場合は0のモーションで表示されます。
 * [motionId]:モーションID
 * 
 * スキル、アイテムのメモ欄
 * <AnalyzeSkill:1> このスキル、アイテムはアナライズスキルとし、「アナライズスキル設定」の１番の設定で発動します。
 * アイテムのメモ欄
 * <NoDropProbability>
 * このタグを記入したアイテムはドロップアイテムの確率表示を表示しません。
 * 
 * 図鑑の登録のタイミングは遭遇時、撃破時、アナライズ時、撃破及びアナライズ時から選択できますが
 * 
 * アナライズの設定
 * 図鑑と同じ表示ではなくアナライズ用の表示項目を設定できます。下位スキルと上位スキルと使い分けることが可能になります。
 * 
 * アナライズスキル設定の失敗時のメッセージ
 * %1:ターゲット名
 * %2:使用者名
 * 「%2はアナライズに失敗した。」の時、スキル使用者がリードの場合は「リードはアナライズに失敗した。」と表示されます。
 * 
 * モンスターの種類カテゴリーの設定
 * モンスターを種類別に表示させることが出来ます。
 * カテゴリーkeyはallを除いて任意の文字列で設定可能です。
 * allを記入の場合は図鑑に登録される全てのモンスターが表示されます。
 * 敵キャラのメモ欄
 * <CategoryKey:[Key]> 表示するカテゴリーを設定します。
 * <CategoryKey:[Key],[Key]....> 表示出来るカテゴリーは複数設定可能です。
 * [Key]:カテゴリーKey([]は付けずにプラグインパラメータで設定した文字列を記入してください)
 * 
 * ページの設定
 * 名称の設定
 * モンスター名、モンスター画像以外で任意の名称を設定できます。
 * 無記入の場合はデーターベース及びこのプラグイン内で設定した名称が表示されます。
 * 
 * システム項目文字色の設定
 * 名称の文字色を指定します。
 * 
 * パラメータ評価式の設定
 * 評価式を記入します。オリジナルパラメータでは必ず記入してください。
 * モンスター名、モンスター画像、耐性属性、弱点属性、無効属性、耐性ステート、弱点ステート、無効ステート、ドロップアイテム、スティールアイテム以外でも有効ですが
 * 無記入の場合は自動的に参照されます。
 * 
 * 追加項目の設定
 * 記述欄はプラグインパラメータ「textMethod」（記述欄タグ名）に任意の文字列を記入してください。一部文字列は使用できない場合も
 * ありますので注意してください。desc1と記入した場合はモンスターのメモ欄に<desc1:ああああ>と記入したとき、記述欄タグ名にdesc1と
 * 記入した項目に「ああああ」と表示されます。
 * 
 * X表示位置の設定
 * 表示する列を指定します。
 * 
 * Y表示位置の設定
 * 表示する行を指定します。
 * 
 * 項目表示モードの設定
 * 項目を複数列に跨いで表示します。
 * 
 * 情報未登録ステータス表示の設定
 * ステータスデータを登録していない（撃破してない又はアナライズをされていない）モンスターのステータスを隠します。
 * 
 * 名称、モンスター名表示位置の設定
 * 名称、モンスター名の文字の位置を指定します。
 * 
 * 画像の最大縦幅の設定
 * モンスターの表示サイズを指定した行分のサイズに調整します。デフォルトで８行で設定されていますので８行分の高さを超えたらサイズ調整します。
 * 
 * 対応プラグイン
 * ドロップアイテム追加
 * 盗みスキル
 * 
 * 背景画像について
 * 背景画像を表示させる場合は、ゲームフォルダーのimgフォルダーを開き右クリック→新規作成→フォルダーの順にクリックし、
 * 「新しいフォルダー」というフォルダー名をnuun_backgroundに変更してください。
 * また画像を表示させるには「共通処理」(NUUN_Base)プラグインが必要となります。
 * 
 * 操作方法
 * 上下（↑ ↓）キー：モンスター選択
 * 左右（← →）キー ：ページ切り替え
 * PgUp PgDnキー：モンスターページ送り
 * 
 * タッチ操作
 * <>ボタン：ページ切り替え
 * 上下スワイプ：スクロール（弾くように勢いよくスワイプすることでページ送りと同等になります）
 * 
 * プラグインコマンド
 * EnemyBookOpen              図鑑を開きます。
 * EnemyBookAdd               モンスターを図鑑に追加します。ステータス情報は登録されません。
 * EnemyBookRemove            モンスターを図鑑から削除します。
 * EnemyBookComplete          図鑑を完成させます。
 * EnemyBookClear             図鑑をクリア（全削除）させます。
 * EnemyBookStatusAdd         モンスターのステータス情報を登録します。
 * EnemyBookStatusRemove      モンスターをステータス情報を削除します。
 * EnemyBookAddDefeat         モンスターを撃破済みにします。
 * EnemyBookRemoveDefeat      モンスターの撃破数をリセットします。
 * EnemyBookGetDropItem       モンスターのドロップアイテムを取得済みにさせます。
 * EnemyBookRemoveDropItem    モンスターのドロップアイテムを未収得にさせます。
 * EnemyBookGetStealItem      モンスターのスティールアイテムを取得済みにします。
 * EnemyBookRemoveStealItem   モンスターのスティールアイテムを未収得にさせます。
 * EnemyBookDefeatEnemy       撃破したモンスター数を変数に格納します。
 * EnemyBookEncounteredEnemy  遭遇済みのモンスター数を変数に格納します。
 * EnemyBookCompleteRate      現在の完成度を変数に格納します。
 * EnemyBookDefeatEnemySum    指定のモンスターの撃破数を変数に格納します。
 * DorpItemAcquired           指定のアイテムがドロップ済みか判定します。
 * StealItemAcquired          指定のアイテムが盗み済みか判定します。
 * 
 * オリジナルパラメータ参照変数
 * this._enemy　データベースのモンスターデータを取得します。
 * this._enemy.meta メタタグを取得します。
 * enemy Game_Enemyのデータを取得します。
 * 
 * このプラグインはYoji Ojima様及びヱビ様、TOMY (Kamesoft)様を参考にさせていただきました。
 * 
 * 仕様
 * ページ選択ウィンドウのカーソル移動は左右キーのみ動作します。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/4/25 Ver.2.0.0
 * 敵のステータスを表示する項目を大幅にリニューアル。
 * ステータス情報の登録タイミングを指定できる機能を追加。
 * ステータス情報未登録時に耐性属性、弱点属性、無効属性、耐性ステート、弱点ステート、無敵ステートに未登録時の表示アイコンを指定できる機能を追加。
 * 背景画像の参照先を指定できるように変更。
 * 完成度を撃破数からステータス登録した数に変更。
 * プラグインコマンド「図鑑完成」を実行すると撃破数がリセットされる問題を修正。
 * 2021/4/19 Ver.1.4.5
 * 戦闘中でモンスターのカテゴリーをONにして図鑑を開いたときにスクロールしてしまう問題を修正。
 * 一部の不具合が再発していたので修正。
 * 2021/4/15 Ver.1.4.4
 * サイズによってはモンスターのサイズ調整がうまくいっていなかった問題を修正。
 * ボタン画像が表示されていない時に図鑑を開くとエラーが出る問題を修正。
 * 2021/4/13 Ver.1.4.3
 * 完成度ウィンドウを非表示にする機能が機能していなかった問題を修正。
 * 2021/4/12 Ver.1.4.2
 * 戦闘中で背景画像を表示できる機能を追加。
 * モンスターを登録した後、項目が未登録のままになる問題を修正。
 * 2021/4/11 Ver.1.4.1
 * 未登録のモンスターを選択した状態で図鑑を閉じた時にエラーが出る問題を修正。
 * 2021/4/11 Ver.1.4.0
 * サイドビューアクターを表示する機能を追加。
 * 2021/4/10 Ver.1.3.0
 * モンスターを種類毎に表示する機能を追加。
 * 2021/4/8 Ver.1.2.2
 * 耐性ステートで無効を反映した時にステート無効化が反映されない問題を修正。
 * 2021/4/1 Ver.1.2.1
 * 色相の異なるモンスターを連続で表示すると一瞬別の色相が反映されてしまう問題を修正。
 * 2021/3/31 Ver.1.2.0
 * ドロップアイテム、スティールアイテムのWideModeをtrueにしたときにアイテムの表示を２列にする機能を追加。
 * 特定のドロップアイテムの確率表示を表示しない機能を追加。
 * 2021/3/27 Ver.1.1.5
 * オリジナルパラメータが反映されていなかった問題を修正。
 * 2021/3/17 Ver.1.1.4
 * 背景画像の参照先が変更されていなかった問題を修正。
 * 2021/3/16 Ver.1.1.3
 * アナライズを使用し、ウィンドウを閉じるとき一瞬別のモンスターが表示される問題を修正。
 * アナライズを使用すると別のターゲットの情報が表示される問題を修正。
 * 2021/3/14 Ver.1.1.2
 * アナライズモードの時にバフ、デバフ以外の色指定がカラーコードになっていたので修正。
 * 2021/3/14 Ver.1.1.1
 * アナライズ設定で一部の設定が空欄の時エラーが出る問題を修正。
 * 2021/3/14 Ver.1.1.0
 * 一部プラグイン導入時、戦闘開始時にエラーが出る問題を修正。
 * アナライズでHP,MPの現在のステータス以外が取得できていなかった問題を修正。
 * アナライズでモンスターの現在のステータス表示が機能していなかった問題を修正。
 * 登録タイミングに「撃破時及びアナライズ時」を追加。
 * アナライズモードでコモンイベント経由で使用すると行動失敗時でも画面が開いてしまう問題があったため、メモ欄での指定に変更。
 * アナライズでバフ、デバフ時ステータスの文字色を指定できる機能を追加。
 * 背景画像の指定先フォルダーを変更。
 * 2021/3/10 Ver.1.0.11
 * 新規に登録されたモンスター名の文字色を付ける機能を追加。
 * 2021/3/6 Ver.1.0.10
 * タッチUIがOFFの時にウィンドウの表示範囲を上に詰める機能を追加。
 * 2021/2/28 Ver.1.0.9
 * 背景画像が反映されていなかった問題を修正。
 * 2021/2/24 Ver.1.0.8
 * バトルリザルト中にモンスター図鑑を閉じるように修正。
 * 2021/2/22 Ver.1.0.7
 * ロード後に図鑑を開いてドロップアイテムのあるページを表示するとエラーが出る問題を修正。
 * 2021/2/18 Ver.1.0.6
 * 戦闘中のモンスター図鑑の表示スイッチをメニューコマンドと別に変更。
 * プラグインコマンドに「モンスターを撃破済みにする」を追加。
 * 2021/2/16 Ver.1.0.5
 * Scene_Base.prototype.isBottomHelpMode、Scene_Base.prototype.isBottomButtonModeで設定の反映するように修正。
 * 2021/2/15 Ver.1.0.4
 * PageUp・PageDownキーでモンスターリストをページ送り出来る仕様に変更。なおモンスター情報ページの切り替えは左右（← →）キーのみになります。
 * ターン制の時に図鑑を開いたとき、裏でアクションが進行してしまう問題を修正。
 * アナライズモード以外で開くとHP,MPゲージが表示される問題を修正。
 * 2021/2/14 Ver.1.0.3
 * 戦闘中でアナライズを使用中PageUp・PageDownキーを押した後操作ができなくなる問題を修正。
 * 図鑑の登録タイミングが「撃破時」に設定している時にアナライズを使用した際、画面が空白になる問題を修正。
 * プラグインコマンドで「モンスター削除」「撃破数」「図鑑完成度」を実行するとエラーが出る問題を修正。
 * プラグインコマンドで「モンスター撃破数リセット」「遭遇数」「総撃破数」を実行しても変数が変わらない問題を修正。
 * 「モンスター撃破数リセット」が「図鑑完成度」と表示されていた問題を修正。
 * 2021/2/14 Ver.1.0.2
 * 特定の条件下で図鑑を開きドロップアイテム、スティールアイテムのあるページを開くとエラーが出る問題を修正。
 * 2021/2/14 Ver.1.0.1
 * アナライズモードをオープンした際の他のウィンドウの処理を変更。
 * 2021/2/7 Ver.1.0.0
 * 初版
 * 
 * @command EnemyBookOpen
 * @desc モンスター図鑑を開きます。
 * @text モンスター図鑑オープン
 * 
 * @command EnemyBookAdd
 * @desc モンスターを図鑑に追加します。
 * @text モンスター追加
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @command EnemyBookRemove
 * @desc モンスターを図鑑から削除します。
 * @text モンスター削除
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @command EnemyBookStatusAdd
 * @desc モンスターのステータス情報を登録します。
 * @text モンスターステータス情報登録
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @command EnemyBookStatusRemove
 * @desc モンスターのステータス情報を削除します。
 * @text モンスターステータス情報削除
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @command EnemyBookComplete
 * @desc 図鑑を完成させます。
 * @text 図鑑完成
 * 
 * @command EnemyBookClear
 * @desc 図鑑をクリア（消去）します。
 * @text 図鑑初期化
 * 
 * @command EnemyBookAddDefeat
 * @desc モンスターを撃破済みにします。
 * @text モンスター撃破済み
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 *  
 * @command EnemyBookRemoveDefeat
 * @desc モンスターの撃破数をリセットします。(0で全てのモンスターの撃破数をリセットします)
 * @text 撃破数初期化
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @command EnemyBookGetDropItem
 * @desc モンスターのドロップアイテムを取得済みにします。
 * @text モンスタードロップアイテム習得済み
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @arg dropListId
 * @type number
 * @default 0
 * @text ドロップアイテムリストID
 * @desc ドロップアイテムリストIDを指定します。（0ですべて取得済みにします）
 * 
 * @command EnemyBookRemoveDropItem
 * @desc モンスターのドロップアイテムを未収得にします。
 * @text モンスタードロップアイテム未収得
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @arg dropListId
 * @type number
 * @default 0
 * @text ドロップアイテムリストID
 * @desc ドロップアイテムリストIDを指定します。（0ですべて未取得済みにします）
 * 
 * @command EnemyBookGetStealItem
 * @desc モンスターのスティールアイテムを取得済みにします。
 * @text モンスタースティールアイテム取得済み
 *
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @arg stealListId
 * @type number
 * @default 0
 * @text スティールアイテムリストID
 * @desc スティールアイテムリストIDを指定します。（0ですべて取得済みにします）
 * 
 * @command EnemyBookRemoveStealItem
 * @desc モンスターのスティールアイテムを未取得にします。
 * @text モンスタースティールアイテム未取得
 * @type 0
 * @default 0
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @arg stealListId
 * @type number
 * @default 0
 * @text スティールアイテムリストID
 * @desc スティールアイテムリストIDを指定します。（0ですべて未取得済みにします）
 * 
 * @command EnemyBookDefeatEnemy
 * @desc 撃破済みのモンスター数を格納します。
 * @text 総撃破数モンスター数
 * 
 * @arg DefeatEnemy
 * @type variable
 * @default 0
 * @text 変数
 * @desc 撃破済みモンスター数を代入する変数を指定します。
 * 
 * @command EnemyBookEncounteredEnemy
 * @desc 遭遇したモンスター数を格納します。
 * @text 遭遇数
 * 
 * @arg EncounteredEnemy
 * @type variable
 * @default 0
 * @text 変数
 * @desc 遭遇したモンスター数を代入する変数を指定します。
 * 
 * @command EnemyBookCompleteRate
 * @desc 図鑑の完成度を格納します。
 * @text 図鑑完成度
 * 
 * @arg CompleteRate
 * @type variable
 * @default 0
 * @text 変数
 * @desc 図鑑の完成度を代入する変数を指定します。
 * 
 * @command EnemyBookDefeatEnemySum
 * @desc モンスターの撃破数を格納します。
 * @text 総撃破数
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @text モンスター
 * @desc モンスターを指定します。
 * 
 * @arg DefeatEnemySum
 * @type variable
 * @default 0
 * @text 変数
 * @desc モンスターの撃破数を代入する変数を指定します。
 * 
 * @command DorpItemAcquired
 * @desc 指定のアイテムがドロップ済みか判定します。
 * @text アイテムドロップ済み判定。
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @arg DorpItemAcquiredId
 * @type number
 * @default 0
 * @text アイテムドロップリストID
 * @desc アイテムドロップリストIDを指定します。（0ですべて）
 * 
 * @arg DorpItemAcquiredswitch
 * @type switch
 * @default 0
 * @text 格納スイッチ
 * @desc アイテムがドロップ済みかを代入する変数を指定します。
 * 
 * @command StealItemAcquired
 * @desc 指定のアイテムが盗み済みか判定します。
 * @text アイテム盗み済み判定。
 * 
 * @arg enemyId
 * @type enemy
 * @default 0
 * @desc モンスターIDを指定します。
 * 
 * @arg stealAcquiredId
 * @type number
 * @default 0
 * @text スティールアイテムリストID
 * @desc スティールアイテムリストIDを指定します。（0ですべて）
 * 
 * @arg StealAcquiredswitch
 * @type switch
 * @default 0
 * @text 格納スイッチ
 * @desc アイテムが盗み済みかを代入する変数を指定します。
 * 
 * 
 * パラメータ
 * @param BasicSetting
 * @text 基本設定
 * @default ------------------------------
 * 
 * @param WindowMode
 * @desc モンスター選択画面の表示位置を指定します。
 * @text モンスター選択画面位置
 * @type select
 * @option 左側表示
 * @value 0
 * @option 右側表示
 * @value 1
 * @default 0
 * @parent BasicSetting
 * 
 * @param NumberType
 * @text モンスターのナンバー表示
 * @desc モンスターのナンバーを表示します。
 * @type select
 * @option モンスターNoの表示なし
 * @value 0
 * @option モンスターNoを表示する。
 * @value 1
 * @option モンスターNoを表示し、0埋めをする。
 * @value 2
 * @desc モンスターのNo表示
 * @default 1
 * @parent BasicSetting
 * 
 * @param RegistrationTiming
 * @text 登録タイミング
 * @desc 図鑑の登録タイミング。
 * @type select
 * @option 遭遇時
 * @value 0
 * @option 撃破時
 * @value 1
 * @option アナライズ時
 * @value 2
 * @option 撃破時またはアナライズ時
 * @value 3
 * @desc 図鑑の登録タイミング
 * @default 0
 * @parent BasicSetting
 * 
 * @param RegistrationStatusTiming
 * @text ステータス情報登録タイミング
 * @desc ステータス情報登録タイミング。
 * @type select
 * @option 遭遇時
 * @value 0
 * @option 撃破時
 * @value 1
 * @option アナライズ時
 * @value 2
 * @option 撃破時またはアナライズ時
 * @value 3
 * @default 1
 * @parent BasicSetting
 * 
 * @param UnknownStatus
 * @desc ステータス情報未登録時のステータス表示名
 * @text ステータス情報未登録時ステータス表示名
 * @type string
 * @default ？？？
 * @parent BasicSetting
 * 
 * @param UnknownData
 * @desc 未確認の索引名です。？1文字だけ入れると名前の文字数に応じて？に置き換えられます。
 * @text 未確認エネミー及びアイテム名
 * @type string
 * @default ？
 * @parent BasicSetting
 * 
 * @param TransformDefeat
 * @desc 変身前の敵を撃破したものとみなす。
 * @text 変身前撃破
 * @type boolean
 * @default true
 * @parent BasicSetting
 * 
 * @param NoTouchUIWindow
 * @type boolean
 * @default false
 * @text 戦闘時タッチUI OFF時ウィンドウ上詰め
 * @desc 戦闘時タッチUIがOFFの時ウィンドウを上に詰めます。
 * @parent BasicSetting
 * 
 * @param SVEnemyMirror
 * @type boolean
 * @default true
 * @text サイドビューバトラー反転
 * @desc サイドビューバトラーを表示時、画像を反転させる。
 * @parent BasicSetting
 * 
 * @param Category
 * @text カテゴリー設定
 * @default ------------------------------
 * 
 * @param CategoryOn
 * @type boolean
 * @default false
 * @text モンスターカテゴリー表示
 * @desc モンスターをカテゴリー毎に表示する。
 * @parent Category
 * 
 * @param EnemyBookCategory
 * @desc モンスターカテゴリーの設定をします。
 * @text モンスターカテゴリー設定
 * @type struct<BookCategoryList>[]
 * @default ["{\"CategoryName\":\"全て\",\"CategoryKey\":\"all\"}","{\"CategoryName\":\"ボス\",\"CategoryKey\":\"boss\"}"]
 * @parent Category
 * 
 * @param BackGround
 * @text 背景設定
 * @default ------------------------------
 * 
 * @param BackGroundImg
 * @desc 背景画像ファイル名を指定します。
 * @text 背景画像
 * @type file[]
 * @dir img/
 * @default []
 * @parent BackGround
 * 
 * @param AnalyzeBackGroundImg
 * @desc アナライズ用の背景画像ファイル名を指定します。
 * @text アナライズ用背景画像
 * @type file[]
 * @dir img/
 * @default []
 * @parent BackGround
 * 
 * @param BackUiWidth
 * @text 背景サイズをUIに合わせる
 * @desc 背景サイズをUIに合わせる。
 * @type boolean
 * @default true
 * @parent BackGround
 * 
 * @param NoCursorBackground
 * @desc エネミー選択欄の背景を表示しない。
 * @text カーソル背景無し
 * @type boolean
 * @default false
 * @parent BackGround
 * 
 * @param PercentWindow
 * @text 完成度ウィンドウ設定
 * @default ------------------------------
 * 
 * @param PercentWindowVisible
 * @type boolean
 * @default true
 * @text 完成度ウィンドウ表示
 * @desc 完成度ウィンドウを表示する。
 * @parent PercentWindow
 * 
 * @param PercentContent
 * @desc 完成度ウィンドウの表示項目を設定をします。
 * @text 表示項目設定
 * @type struct<PercentContentList>[]
 * @default ["{\"ContentName\":\"完成度\",\"ContentDate\":\"0\"}","{\"ContentName\":\"遭遇済み\",\"ContentDate\":\"1\"}","{\"ContentName\":\"撃破済み\",\"ContentDate\":\"2\"}"]
 * @parent PercentWindow
 * 
 * @param Interval
 * @desc 完成度ウィンドウの更新フレーム
 * @text 更新フレーム間隔
 * @type number
 * @default 100
 * @max 999999
 * @min 0
 * @parent PercentWindow
 * 
 * @param CommandData
 * @text コマンド設定
 * @default ------------------------------
 * 
 * @param ShowCommand
 * @desc メニューコマンドにエネミー図鑑を追加します。
 * @text メニューコマンド表示
 * @type boolean
 * @default false
 * @parent CommandData
 * 
 * @param enemyBookSwitch 
 * @desc 表示させるフラグスイッチID
 * @text メニューコマンド表示スイッチ
 * @type switch
 * @default 0
 * @parent CommandData
 * 
 * @param ShowBattleCommand
 * @desc 戦闘中のパーティコマンドにエネミー図鑑を追加します。
 * @text パーティコマンド表示
 * @type boolean
 * @default false
 * @parent CommandData
 * 
 * @param enemyBookBattleSwitch
 * @desc 戦闘中に表示させるフラグスイッチID
 * @text パーティコマンド表示スイッチ
 * @type switch
 * @default 0
 * @parent CommandData
 * 
 * @param CommandName
 * @desc コマンドの名称。
 * @text コマンドの表示名
 * @type string
 * @default 魔物図鑑
 * @parent CommandData
 * 
 * @param PageData
 * @text 表示ページ設定
 * @default ------------------------------
 * 
 * @param PageSetting
 * @desc ページ設定。
 * @text ページ設定
 * @type struct<PageSettingData>[]
 * @default ["{\"ListDateSetting\":\"1\",\"PageCategoryName\":\"基本情報\"}","{\"ListDateSetting\":\"2\",\"PageCategoryName\":\"属性、ステート\"}","{\"ListDateSetting\":\"3\",\"PageCategoryName\":\"ドロップアイテム\"}","{\"ListDateSetting\":\"4\",\"PageCategoryName\":\"説明\"}"]
 * @parent PageData
 * 
 * @param PageCols
 * @desc ページの最大表示列。
 * @text ページ最大表示列
 * @type number
 * @default 4
 * @min 1
 * @parent PageData
 * 
 * @param ContentCols
 * @text モンスター情報項目列数
 * @desc モンスター情報の項目列数。
 * @type select
 * @option ２列
 * @value 2
 * @option ３列
 * @value 3
 * @default 2
 * @parent PageData
 * 
 * @param AnalyzeSetting
 * @text アナライズ設定
 * @default ------------------------------
 * 
 * @param AnalyzeSkillMode
 * @desc アナライズスキルの設定をします。0:図鑑設定と同じ　1:AnalyzePageList1　2:AnalyzePageList2　3以上は反映されません。
 * @text アナライズスキル設定
 * @type struct<AnalyzeSkill>[]
 * @default ["{\"PageCols\":\"4\",\"Mode\":\"0\",\"StatusGaugeVisible\":\"true\",\"EnemyCurrentStatus\":\"true\",\"AnalyzeMissMessage\":\"%2はアナライズに失敗した。\",\"BuffColor\":\"0\",\"DebuffColor\":\"0\"}","{\"PageCols\":\"1\",\"Mode\":\"1\",\"StatusGaugeVisible\":\"true\",\"EnemyCurrentStatus\":\"true\",\"AnalyzeMissMessage\":\"%2はアナライズに失敗した。\",\"BuffColor\":\"0\",\"DebuffColor\":\"0\"}"]
 * @parent AnalyzeSetting
 * 
 * @param AnalyzePageList1
 * @desc 表示する項目設定。
 * @text 表示項目設定１
 * @type struct<PageSettingData>[]
 * @default ["{\"ListDateSetting\":\"11\",\"PageCategoryName\":\"\"}"]
 * @parent AnalyzeSetting
 * 
 * @param AnalyzePageList2
 * @desc 表示する項目設定。
 * @text 表示項目設定２
 * @type struct<PageSettingData>[]
 * @default []
 * @parent AnalyzeSetting
 * 
 * @param HPgaugeWidth
 * @desc アナライズ時のHPゲージ横幅
 * @text アナライズ時HPゲージ横幅
 * @type number
 * @default 128
 * @max 999
 * @min 0
 * @parent AnalyzeSetting
 * 
 * @param MPgaugeWidth
 * @desc アナライズ時のMPゲージ横幅
 * @text アナライズ時MPゲージ横幅
 * @type number
 * @default 128
 * @max 999
 * @min 0
 * @parent AnalyzeSetting
 * 
 * @param ListData
 * @text 表示項目設定
 * @default ------------------------------
 * 
 * @param ListData1_10
 * @text 表示項目設定1-10
 * @default ------------------------------
 * @parent ListData
 * 
 * @param PageList1
 * @desc 表示するリスト。
 * @text 表示リスト１
 * @type struct<PageListData>[]
 * @default ["{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"33\",\"DetaEval\":\"\",\"NameColor\":\"0\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"WideMode\":\"2\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"center\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"200\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"ＨＰ\",\"DateSelect\":\"1\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"2\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"ＭＰ\",\"DateSelect\":\"2\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"3\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"3\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"4\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"4\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"5\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"5\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"6\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"6\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"7\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"7\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"8\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"8\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"9\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"30\",\"DetaEval\":\"\",\"NameColor\":\"27\",\"X_Position\":\"1\",\"Y_Position\":\"10\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"31\",\"DetaEval\":\"\",\"NameColor\":\"27\",\"X_Position\":\"2\",\"Y_Position\":\"10\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"32\",\"DetaEval\":\"\",\"NameColor\":\"27\",\"X_Position\":\"2\",\"Y_Position\":\"11\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}"]
 * @parent ListData1_10
 * 
 * @param PageList2
 * @desc 表示するリスト。
 * @text 表示リスト２
 * @type struct<PageListData>[]
 * @default ["{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"33\",\"DetaEval\":\"\",\"NameColor\":\"0\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"WideMode\":\"2\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"center\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"200\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"ＨＰ\",\"DateSelect\":\"1\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"2\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"ＭＰ\",\"DateSelect\":\"2\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"3\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"3\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"4\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"4\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"5\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"5\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"6\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"6\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"7\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"7\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"8\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"8\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"9\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"40\",\"DetaEval\":\"\",\"NameColor\":\"2\",\"X_Position\":\"1\",\"Y_Position\":\"10\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"41\",\"DetaEval\":\"\",\"NameColor\":\"2\",\"X_Position\":\"2\",\"Y_Position\":\"10\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"45\",\"DetaEval\":\"\",\"NameColor\":\"3\",\"X_Position\":\"1\",\"Y_Position\":\"12\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"46\",\"DetaEval\":\"\",\"NameColor\":\"3\",\"X_Position\":\"2\",\"Y_Position\":\"12\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}"]
 * @parent ListData1_10
 * 
 * @param PageList3
 * @desc 表示するリスト。
 * @text 表示リスト３
 * @type struct<PageListData>[]
 * @default ["{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"33\",\"DetaEval\":\"\",\"NameColor\":\"0\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"WideMode\":\"2\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"center\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"200\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"ＨＰ\",\"DateSelect\":\"1\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"2\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"ＭＰ\",\"DateSelect\":\"2\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"3\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"3\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"4\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"4\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"5\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"5\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"6\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"6\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"7\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"7\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"8\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"8\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"9\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"60\",\"DetaEval\":\"\",\"NameColor\":\"1\",\"X_Position\":\"1\",\"Y_Position\":\"10\",\"WideMode\":\"2\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}"]
 * @parent ListData1_10
 * 
 * @param PageList4
 * @desc 表示するリスト。
 * @text 表示リスト４
 * @type struct<PageListData>[]
 * @default ["{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"33\",\"DetaEval\":\"\",\"NameColor\":\"0\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"WideMode\":\"2\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"center\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"200\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"ＨＰ\",\"DateSelect\":\"1\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"2\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"ＭＰ\",\"DateSelect\":\"2\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"3\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"3\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"4\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"4\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"5\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"5\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"6\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"6\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"7\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"7\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"8\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"8\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"9\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"70\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"1\",\"Y_Position\":\"10\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"desc1\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}"]
 * @parent ListData1_10
 * 
 * @param PageList5
 * @desc 表示するリスト。
 * @text 表示リスト５
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData1_10
 * 
 * @param PageList6
 * @desc 表示するリスト。
 * @text 表示リスト６
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData1_10
 * 
 * @param PageList7
 * @desc 表示するリスト。
 * @text 表示リスト７
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData1_10
 * 
 * @param PageList8
 * @desc 表示するリスト。
 * @text 表示リスト８
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData1_10
 * 
 * @param PageList9
 * @desc 表示するリスト。
 * @text 表示リスト９
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData1_10
 * 
 * @param PageList10
 * @desc 表示するリスト。
 * @text 表示リスト１０
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData1_10
 * 
 * @param ListData11_20
 * @text 表示項目設定11-20
 * @default ------------------------------
 * @parent ListData
 * 
 * @param PageList11
 * @desc 表示するリスト。
 * @text 表示リスト１１
 * @type struct<PageListData>[]
 * @default ["{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"33\",\"DetaEval\":\"\",\"NameColor\":\"0\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"WideMode\":\"2\",\"MaskMode\":\"false\",\"nameSetting\":\"\",\"namePosition\":\"\\\"center\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"200\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"WideMode\":\"2\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"1\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"1\",\"Y_Position\":\"10\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"2\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"10\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"3\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"1\",\"Y_Position\":\"11\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"4\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"11\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"5\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"1\",\"Y_Position\":\"12\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"6\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"12\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"7\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"1\",\"Y_Position\":\"13\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}","{\"BasicSetting\":\"\",\"paramName\":\"\",\"DateSelect\":\"8\",\"DetaEval\":\"\",\"NameColor\":\"16\",\"X_Position\":\"2\",\"Y_Position\":\"13\",\"WideMode\":\"1\",\"MaskMode\":\"true\",\"nameSetting\":\"\",\"namePosition\":\"\\\"left\\\"\",\"textSetting\":\"\",\"textMethod\":\"\",\"enemySetting\":\"\",\"ImgMaxHeight\":\"8\"}"]
 * @parent ListData11_20
 * 
 * @param PageList12
 * @desc 表示するリスト。
 * @text 表示リスト１２
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData11_20
 * 
 * @param PageList13
 * @desc 表示するリスト。
 * @text 表示リスト１３
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData11_20
 * 
 * @param PageList14
 * @desc 表示するリスト。
 * @text 表示リスト１４
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData11_20
 * 
 * @param PageList15
 * @desc 表示するリスト。
 * @text 表示リスト１５
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData11_20
 * 
 * @param PageList16
 * @desc 表示するリスト。
 * @text 表示リスト１６
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData11_20
 * 
 * @param PageList17
 * @desc 表示するリスト。
 * @text 表示リスト１７
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData11_20
 * 
 * @param PageList18
 * @desc 表示するリスト。
 * @text 表示リスト１８
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData11_20
 * 
 * @param PageList19
 * @desc 表示するリスト。
 * @text 表示リスト１９
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData11_20
 * 
 * @param PageList20
 * @desc 表示するリスト。
 * @text 表示リスト１２０
 * @type struct<PageListData>[]
 * @default []
 * @parent ListData11_20
 * 
 * @param DropItemData
 * @text ドロップアイテム設定
 * @default ------------------------------
 * 
 * @param DropItemProbabilityShow
 * @desc 確率を表示する。
 * @text 確率表示
 * @type boolean
 * @default true
 * @parent DropItemData
 * 
 * @param ShowDropItemName
 * @desc 未確認のドロップアイテムを隠す。
 * @text 未確認ドロップアイテム名
 * @type boolean
 * @default false
 * @parent DropItemData
 * 
 * @param DropItemMultiCol
 * @desc ワイドモード２列表示以上時の複数列表示。
 * @text ワイドモード時の複数列表示
 * @type boolean
 * @default false
 * @parent DropItemData
 * 
 * @param StealItemData
 * @text スティールアイテム設定
 * @default ------------------------------
 * 
 * @param ShowStealItemName
 * @desc 未確認のスティールアイテムを隠す。
 * @text 未確認スティールアイテム表示
 * @type boolean
 * @default false
 * @parent StealItemData
 * 
 * @param StealItemProbabilityShow
 * @desc 確率を表示する。
 * @text 確率表示
 * @type boolean
 * @default true
 * @parent StealItemData
 * 
 * @param StealItem2Col
 * @desc ワイドモード２列表示以上時の複数列表示。
 * @text ワイドモード時の複数列表示
 * @type boolean
 * @default false
 * @parent StealItemData
 * 
 * @param ResistWeakData
 * @text 耐性弱点設定
 * @default ------------------------------
 * 
 * @param ElementList
 * @desc 表示する属性。
 * @text 表示属性
 * @type struct<ElementData>[]
 * @default ["{\"ElementNo\":\"1\",\"ElementIconId\":\"76\"}","{\"ElementNo\":\"2\",\"ElementIconId\":\"64\"}","{\"ElementNo\":\"3\",\"ElementIconId\":\"65\"}","{\"ElementNo\":\"4\",\"ElementIconId\":\"66\"}","{\"ElementNo\":\"5\",\"ElementIconId\":\"67\"}","{\"ElementNo\":\"6\",\"ElementIconId\":\"68\"}","{\"ElementNo\":\"7\",\"ElementIconId\":\"69\"}","{\"ElementNo\":\"8\",\"ElementIconId\":\"70\"}","{\"ElementNo\":\"9\",\"ElementIconId\":\"71\"}"]
 * @parent ResistWeakData
 * 
 * @param StateList
 * @desc 表示するステート。
 * @text 表示ステート
 * @type struct<StateData>[]
 * @default ["{\"StateId\":\"1\"}","{\"StateId\":\"4\"}","{\"StateId\":\"5\"}","{\"StateId\":\"6\"}","{\"StateId\":\"7\"}","{\"StateId\":\"8\"}","{\"StateId\":\"9\"}","{\"StateId\":\"10\"}","{\"StateId\":\"12\"}","{\"StateId\":\"13\"}"]
 * @parent ResistWeakData
 * 
 * @param WeakElementName
 * @desc 効きやすい属性の名前です。属性有効度が101%以上で表示されます。
 * @text 効きやすい属性名称。
 * @type string
 * @default 弱点属性
 * @parent ResistWeakData
 * 
 * @param ResistElementName
 * @desc 効きにくい属性の名前です。
 * @text 効きやすい属性名称。
 * @type string
 * @default 耐性属性
 * @parent ResistWeakData
 * 
 * @param ResistNoEffectElement
 * @desc 効きにくい属性に無効を反映させるか。
 * @text 効きにくい属性に無効反映
 * @type boolean
 * @default true
 * @parent ResistWeakData
 * 
 * @param NoEffectElementName
 * @desc 効かない属性の名前です。
 * @text 効かない属性名称
 * @type string
 * @default 無効属性
 * @parent ResistWeakData
 * 
 * @param ElementUnknownIconId
 * @desc ステータス情報未登録時に表示するアイコンのIDを指定します。
 * @text ステータス情報未登録時アイコンID
 * @type number
 * @default 0
 * @parent ResistWeakData
 * 
 * @param WeakStateName
 * @desc 効きやすいステートの名前です。
 * @text 効きやすいステート名称
 * @type string
 * @default 弱点ステート
 * @parent ResistWeakData
 * 
 * @param NormalWeakState
 * @desc 効きやすいステート対象を有効度100%以上から反映させるか。
 * @text 効きやすい属性有効度100%反映
 * @type boolean
 * @default true
 * @parent ResistWeakData
 * 
 * @param ResistStateName
 * @desc 効きにくいステートの名前です。
 * @text 効きにくいステート名称
 * @type string
 * @default 耐性ステート
 * @parent ResistWeakData
 * 
 * @param ResistNoEffectState
 * @desc 効きにくいステートに無効を反映させるか。
 * @text 効きにくいステートに無効反映
 * @type boolean
 * @default true
 * @parent ResistWeakData
 * 
 * @param NoEffectStateName
 * @desc 効かないステートの名前です。
 * @text 効かないステート名称
 * @type string
 * @default 無効ステート
 * @parent ResistWeakData
 * 
 * @param ResistWeakDataMaskMode
 * @desc 未撃破のエネミーの耐性弱点を表示させません。
 * @text 未撃破耐性弱点非表示
 * @type boolean
 * @default false
 * @parent ResistWeakData
 * 
 * @param StateUnknownIconId
 * @desc ステータス情報未登録時に表示するアイコンのIDを指定します。
 * @text ステータス情報未登録時アイコンID
 * @type number
 * @default 0
 * @parent ResistWeakData
 * 
 */
/*~struct~ElementData:
 * 
 * @param ElementNo
 * @desc 表示する属性番号です。
 * @text 属性番号
 * @type number
 * 
 * @param ElementIconId
 * @desc アイコンのIDを指定します。
 * @text アイコンID
 * @type number
 */
/*~struct~StateData:
 *
 * @param StateId
 * @desc 表示するステートです。
 * @text 表示ステート
 * @type state
 *
 */
/*~struct~PageSettingData:
 * 
 * @param ListDateSetting
 * @desc 表示するリストを指定します。
 * @text 表示リスト指定
 * @type select
 * @option 表示リスト１
 * @value 1
 * @option 表示リスト２
 * @value 2
 * @option 表示リスト３
 * @value 3
 * @option 表示リスト４
 * @value 4
 * @option 表示リスト５
 * @value 5
 * @option 表示リスト６
 * @value 6
 * @option 表示リスト７
 * @value 7
 * @option 表示リスト８
 * @value 8
 * @option 表示リスト９
 * @value 9
 * @option 表示リスト１０
 * @value 10
 * @option 表示リスト１１
 * @value 11
 * @option 表示リスト１２
 * @value 12
 * @option 表示リスト１３
 * @value 13
 * @option 表示リスト１４
 * @value 14
 * @option 表示リスト１５
 * @value 15
 * @option 表示リスト１６
 * @value 16
 * @option 表示リスト１７
 * @value 17
 * @option 表示リスト１８
 * @value 18
 * @option 表示リスト１９
 * @value 19
 * @option 表示リスト２０
 * @value 20 
 * @default 1
 * 
 * @param PageCategoryName
 * @desc ページカテゴリーの名前を設定します。
 * @text ページカテゴリー名
 * @type string
 * @default
 *  
 */
/*~struct~PageListData:
 * 
 * @param BasicSetting
 * @text 基本設定
 * 
 * @param paramName
 * @desc 表示する項目の名称を設定します。
 * @text 名称
 * @type string
 * @default
 * @parent BasicSetting
 * 
 * @param DateSelect
 * @desc 表示させる項目を指定。
 * @text 項目リスト
 * @type select
 * @option 表示なし
 * @value 0
 * @option 最大HP
 * @value 1
 * @option 最大MP
 * @value 2
 * @option 攻撃力
 * @value 3
 * @option 防御力
 * @value 4
 * @option 魔法力
 * @value 5
 * @option 魔法防御
 * @value 6
 * @option 敏捷性
 * @value 7
 * @option 運
 * @value 8
 * @option 命中率
 * @value 10
 * @option 回避率
 * @value 11
 * @option 会心率
 * @value 12
 * @option 会心回避率
 * @value 13
 * @option 魔法回避率
 * @value 14
 * @option 魔法反射率
 * @value 15
 * @option 反撃率
 * @value 16
 * @option HP再生率
 * @value 17
 * @option MP再生率
 * @value 18
 * @option TP再生率
 * @value 19
 * @option 狙われ率
 * @value 20
 * @option 防御効果率
 * @value 21
 * @option 回復効果率
 * @value 22
 * @option 薬の知識
 * @value 23
 * @option MP消費率
 * @value 24
 * @option TPチャージ率
 * @value 25
 * @option 物理ダメージ率
 * @value 26
 * @option 魔法ダメージ率
 * @value 27
 * @option 経験値
 * @value 30
 * @option 獲得金額
 * @value 31
 * @option 倒した数
 * @value 32
 * @option モンスター名
 * @value 33
 * @option 名称のみ
 * @value 35
 * @option 耐性属性
 * @value 40
 * @option 弱点属性
 * @value 41
 * @option 無効属性
 * @value 42
 * @option 耐性ステート
 * @value 45
 * @option 弱点ステート
 * @value 46
 * @option 無効ステート
 * @value 47
 * @option 耐性デバフ（未実装）
 * @value 50
 * @option 弱点デバフ（未実装）
 * @value 51
 * @option ドロップアイテム
 * @value 60
 * @option スティールアイテム
 * @value 61
 * @option 記述欄
 * @value 70
 * @option オリジナルパラメータ
 * @value 80
 * @option 行動（未実装）
 * @value 100
 * @option モンスター画像
 * @value 200
 * @option ライン
 * @value 1000
 * @default 0
 * @parent BasicSetting
 * 
 * @param DetaEval
 * @desc パラメータ評価式を設定します。
 * @text パラメータ評価式
 * @type string
 * @default 
 * @parent BasicSetting
 * 
 * @param NameColor
 * @desc システム項目の文字色。
 * @text システム項目文字色
 * @type number
 * @default 16
 * @min 0
 * @parent BasicSetting
 * 
 * @param X_Position
 * @text X表示位置
 * @desc X表示位置
 * @type number
 * @default 1
 * @min 1
 * @max 3
 * @parent BasicSetting
 * 
 * @param Y_Position
 * @desc Y表示位置
 * @text Y表示位置
 * @type number
 * @default 1
 * @min 1
 * @parent BasicSetting
 * 
 * @param WideMode
 * @desc 項目表示モード
 * @text 項目表示モード
 * @type select
 * @option １列表示
 * @value 1
 * @option ２列表示
 * @value 2
 * @option ３列表示（表示列数が３の時のみ）
 * @value 3
 * @default 1
 * @parent BasicSetting
 * 
 * @param MaskMode
 * @desc 図鑑登録の際、撃破及びアナライズで情報開示してない場合はステータスを隠す。
 * @text 情報未登録ステータス表示
 * @type boolean
 * @default true
 * @parent BasicSetting
 * 
 * @param nameSetting
 * @text 名称、モンスター名設定
 * 
 * @param namePosition
 * @desc 名称、モンスター名の表示位置を指定します
 * @text 名称、モンスター名表示位置
 * @type select
 * @option 左
 * @value "left"
 * @option 中央
 * @value "center"
 * @option 右
 * @value "raight"
 * @default "left"
 * @parent nameSetting
 * 
 * @param textSetting
 * @text 記述欄設定
 * 
 * @param textMethod
 * @desc 記述欄に紐づけするタグ名
 * @text 記述欄タグ名
 * @type string
 * @default 
 * @parent textSetting
 * 
 * @param enemySetting
 * @text モンスター画像設定
 * 
 * @param ImgMaxHeight
 * @desc 画像の最大縦幅（行数で指定）
 * @text 画像の最大縦幅
 * @type number
 * @default 8
 * @min 0
 * @parent enemySetting
 * 
 */
/*~struct~AnalyzeSkill:
 * 
 * @param PageCols
 * @desc ページの最大表示列。
 * @text ページ最大表示列
 * @type number
 * @default 4
 * @min 1
 * 
 * @param Mode
 * @desc 表示するアナライズ画面を指定します。
 * @text アナライズ画面指定
 * @type select
 * @option 図鑑表示と同じ
 * @value 0
 * @option 表示項目設定１
 * @value 1
 * @option 表示項目設定２
 * @value 2
 * @default 0
 * 
 * @param StatusGaugeVisible
 * @type boolean
 * @default true
 * @text ゲージを表示
 * @desc HP、MPのゲージを表示します。
 * 
 * @param EnemyCurrentStatus
 * @type boolean
 * @default true
 * @text エネミーの現在ステータス表示
 * @desc エネミーの現在のステータスを表示します。
 * 
 * @param AnalyzeMissMessage
 * @type string
 * @default %2はアナライズに失敗した。
 * @text アナライズ失敗時メッセージ
 * @desc アナライズの失敗時のメッセージを設定します。
 * 
 * @param BuffColor
 * @desc バフ時の文字色。
 * @text バフ時文字色
 * @type number
 * @default 0
 * @max 999999
 * 
 * @param DebuffColor
 * @desc デバフ時の文字色。
 * @text デバフ時文字色
 * @type number
 * @default 0
 * @max 999999
 * 
 * 
 */
/*~struct~BookCategoryList:
 * 
 * @param CategoryName
 * @desc カテゴリー名を設定します。
 * @text カテゴリー名
 * @type string
 * 
 * @param CategoryKey
 * @desc カテゴリーのKeyを設定します。(all:全て表示)
 * @text カテゴリーKey
 * @type string
 */
/*~struct~PercentContentList:
 *
 * @param ContentName
 * @desc 名称。
 * @text 表示名称
 * @type string
 * @default 
 * 
 * @param ContentDate
 * @desc 表示する
 * @text 名称、モンスター名表示位置
 * @type select
 * @option 完成度
 * @value 0
 * @option 遭遇済み
 * @value 1
 * @option 撃破済み
 * @value 2
 * @default 0
 * @parent nameSetting
*
*/
var Imported = Imported || {};
Imported.NUUN_EnemyBook_Ver2 = true;
(() => {
const parameters = PluginManager.parameters('NUUN_EnemyBook_Ver2');
const param = JSON.parse(JSON.stringify(parameters, function(key, value) {
  try {
      return JSON.parse(value);
  } catch (e) {
      try {
          return eval(value);
      } catch (e) {
          return value;
      }
  }
}));
param.BackGroundImg = param.BackGroundImg && param.BackGroundImg.length > 0 ? param.BackGroundImg[0] : null;
param.AnalyzeBackGroundImg = param.AnalyzeBackGroundImg && param.AnalyzeBackGroundImg.length > 0 ? param.AnalyzeBackGroundImg[0] : null;
const PercentContentLength = param.PercentWindowVisible && (param.PercentContent && param.PercentContent.length > 0);
let openAnalyze = false;

//プラグインコマンド
const pluginName = "NUUN_EnemyBook_Ver2";

PluginManager.registerCommand(pluginName, 'EnemyBookOpen', args => {
  SceneManager.push(Scene_EnemyBook);
});

PluginManager.registerCommand(pluginName, 'EnemyBookAdd', args => {
  const enemyId = Number(args.enemyId);
  if (enemyId > 0) {
    $gameSystem.addToEnemyBook(enemyId);
  }
});

PluginManager.registerCommand(pluginName, 'EnemyBookRemove', args => {
  const enemyId = Number(args.enemyId);
  if (enemyId > 0) {
    $gameSystem.removeFromEnemyBook(enemyId);
  }
});

PluginManager.registerCommand(pluginName, 'EnemyBookStatusAdd', args => {
  const enemyId = Number(args.enemyId);
  if (enemyId > 0) {
    $gameSystem.statusToEnemyBook(enemyId);
  }
});

PluginManager.registerCommand(pluginName, 'EnemyBookStatusRemove', args => {
  const enemyId = Number(args.enemyId);
  if (enemyId > 0) {
    $gameSystem.removeStatusEnemyBook(enemyId);
  }
});

PluginManager.registerCommand(pluginName, 'EnemyBookComplete', args => {
  $gameSystem.completeEnemyBook();
});

PluginManager.registerCommand(pluginName, 'EnemyBookClear', args => {
  $gameSystem.clearEnemyBook();
});

PluginManager.registerCommand(pluginName, 'EnemyBookAddDefeat', args => {
  const enemyId = Number(args.enemyId);
  if (enemyId > 0) {
    $gameSystem.addDefeat(enemyId);
  }
});

PluginManager.registerCommand(pluginName, 'EnemyBookRemoveDefeat', args => {
  $gameSystem.resetDefeat(Number(args.enemyId));
});

PluginManager.registerCommand(pluginName, 'EnemyBookGetDropItem', args => {
  $gameSystem.dropItemListFlag(Number(args.enemyId), Number(args.dropListId) - 1, true);
});

PluginManager.registerCommand(pluginName, 'EnemyBookRemoveDropItem', args => {
  $gameSystem.dropItemListFlag(Number(args.enemyId), Number(args.dropListId) - 1, false);
});

PluginManager.registerCommand(pluginName, 'EnemyBookGetStealItem', args => {
  $gameSystem.stealItemListFlag(Number(args.enemyId) , Number(args.stealListId) - 1, true);
});

PluginManager.registerCommand(pluginName, 'EnemyBookRemoveStealItem', args => {
  $gameSystem.stealItemListFlag(Number(args.enemyId) , Number(args.stealListId) - 1, false);
});

PluginManager.registerCommand(pluginName, 'EnemyBookDefeatEnemy', args => {
  $gameSystem.defeatEnemyVar(Number(args.DefeatEnemy));
});

PluginManager.registerCommand(pluginName, 'EnemyBookEncounteredEnemy', args => {
  $gameSystem.encounteredEnemyVar(Number(args.EncounteredEnemy));
});

PluginManager.registerCommand(pluginName, 'EnemyBookCompleteRate', args => {
  $gameSystem.completeRateVariables(Number(args.CompleteRate));
});

PluginManager.registerCommand(pluginName, 'EnemyBookDefeatEnemySum', args => {
  const enemyId = Number(args.enemyId);
  if (enemyId > 0) {
    $gameSystem.defeatEnemySumVar(enemyId, Number(args.DefeatEnemySum));
  }
});

PluginManager.registerCommand(pluginName, 'DorpItemAcquired', args => {
  $gameSystem.dorpItemAcquired(Number(args.DorpItemAcquiredswitch), Number(args.enemyId), Number(args.DorpItemAcquiredId) - 1);
});

PluginManager.registerCommand(pluginName, 'StealItemAcquired', args => {
  $gameSystem.stealItemAcquired(Number(args.StealAcquiredswitch), Number(args.enemyId), Number(args.stealAcquiredId) - 1);
});

//Game_System
Game_System.prototype.addToEnemyBook = function(enemyId) {
  if(!this._enemyBookFlags) {
    this.clearEnemyBookFlags();
  }
  this._enemyBookFlags[enemyId] = true;
};

Game_System.prototype.addStatusToEnemyBook = function(enemyId) {
  if(!this._enemyBookStatusFlags) {
    this.clearEnemyBookStatusFlags();
  }
  this._enemyBookStatusFlags[enemyId] = true;
};

Game_System.prototype.statusToEnemyBook = function(enemyId) {
  this.addToEnemyBook(enemyId);
  this.addStatusToEnemyBook(enemyId);
};

Game_System.prototype.removeEnemyBook = function(enemyId) {
  if(!this._enemyBookFlags) {
    this.clearEnemyBookFlags();
  }
  this._enemyBookFlags[enemyId] = false;
};

Game_System.prototype.removeStatusEnemyBook = function(enemyId) {
  if(!this._enemyBookStatusFlags) {
    this.clearEnemyBookStatusFlags();
  }
  this._enemyBookStatusFlags[enemyId] = false;
};

Game_System.prototype.removeFromEnemyBook = function(enemyId) {
  if(this._enemyBookFlags) {
    this._enemyBookFlags[enemyId] = false;
    this.removeStatusEnemyBook(enemyId);
    this.dropItemListFlag(enemyId, 0, false);
    this.stealItemListFlag(enemyId, 0, false);
    if (!this._defeatNumber) {
      this.clearDefeat();
    }
    this._defeatNumber[enemyId] = 0;
  }
};

Game_System.prototype.clearEnemyBookFlags = function() {
  this._enemyBookFlags = [];
};

Game_System.prototype.clearEnemyBookStatusFlags = function() {
  this._enemyBookStatusFlags = [];
};

Game_System.prototype.clearEnemyBook = function() {
  this.clearEnemyBookFlags();
  this.clearEnemyBookStatusFlags();
  this.clearDefeat();
  this.clearDropItem();
  this.clearStealItem();
};

Game_System.prototype.completeEnemyBook = function() {
  //this.clearEnemyBook();
  for (let i = 1; i < $dataEnemies.length; i++) {
    this.addToEnemyBook(i);
    this.addStatusToEnemyBook(i);
    this.dropItemListFlag(i, 0, true);
    this.stealItemListFlag(i, 0, true);
  }
};

Game_System.prototype.isInEnemyBook = function(enemy) {
  return enemy && enemy.name && this._enemyBookFlags && this._enemyBookFlags[enemy.id];
};

Game_System.prototype.isInEnemyBookStatus = function(enemy) {
  return enemy && enemy.name && this._enemyBookStatusFlags && this._enemyBookStatusFlags[enemy.id];
};

Game_System.prototype.completeRateVariables = function(val) {
  const rate = this.completeRate();
  $gameVariables.setValue(val, rate);
};

Game_System.prototype.completeRate = function() {
  return this.onStatusEnemyDate() / this.bookEnemyDate() * 100;
};

Game_System.prototype.bookEnemyDate = function() {
  return $dataEnemies.reduce((r, enemy) => {
    return r + (enemy && enemy.name && !enemy.meta.NoBook ? 1 : 0);
  }, 0);
};

Game_System.prototype.onStatusEnemyDate = function(enemyList) {
  const enemy = enemyList ? enemyList : $dataEnemies;
  return enemy.reduce((r, enemy) => {
    return r + (enemy && enemy.name && !enemy.meta.NoBook && this.isInEnemyBookStatus(enemy) ? 1 : 0);
  }, 0);
};

Game_System.prototype.clearDefeat = function() {
	this._defeatNumber = [];
};

Game_System.prototype.defeatCount = function(enemyId) {
  if (!this._defeatNumber) {
    this.clearDefeat();
  }
  this._defeatNumber[enemyId] = this._defeatNumber[enemyId] || 0;
  this._defeatNumber[enemyId]++;
};

Game_System.prototype.defeatNumber = function(enemyId) {
  if(this._defeatNumber && this._defeatNumber[enemyId]) {
    return this._defeatNumber[enemyId];
  }
  return 0;
};

Game_System.prototype.setDefeatEnemy = function(enemyList) {
  const enemy = enemyList ? enemyList : $dataEnemies;
  this._defeatEnemy = enemy.reduce((r, enemy) => {
    return r + (enemy && enemy.name && (this.defeatNumber(enemy.id) > 0 || enemy.meta.ShowDataBook && !enemy.meta.NoBook) ? 1 : 0);
  }, 0);
};

Game_System.prototype.defeatEnemy = function(enemyList) {
  this.setDefeatEnemy(enemyList);
  return this._defeatEnemy;
};

Game_System.prototype.defeatEnemyVar = function(val) {
  this.setDefeatEnemy();
  $gameVariables.setValue(val, this._defeatEnemy);
};

Game_System.prototype.defeatEnemySumVar = function(enemy, val) {
  $gameVariables.setValue(val, this.defeatNumber(enemy));
};

Game_System.prototype.addDefeat = function(enemy) {
  if (this.defeatNumber(enemy) <= 0) {
    this.defeatCount(enemy);
  }
};

Game_System.prototype.resetDefeat = function(enemyId) {
  if (!this._defeatNumber) {
    this.clearDefeat();
  }
  if (enemyId > 0) {
    if(this._defeatNumber[enemyId]) {
      this._defeatNumber[enemyId] = 0;
    }
  } else {
    for(let i = 1; $dataEnemies.length > i; i++) {
      this._defeatNumber[i] = 0;
    }
  }
};

Game_System.prototype.setEncounteredEnemy = function(enemyList) {
  const enemy = enemyList ? enemyList : $dataEnemies;
  this._EncounteredEnemy = enemy.reduce((r ,enemy) => {
    return r + (this.encounteredEnemyBook(enemy) ? 1 : 0);
  }, 0);
};

Game_System.prototype.encounteredEnemy = function(enemyList) {
  this.setEncounteredEnemy(enemyList);
  return this._EncounteredEnemy;
};

Game_System.prototype.encounteredEnemyVar = function(val) {
  this.setEncounteredEnemy();
  $gameVariables.setValue(val, this._EncounteredEnemy);
};

Game_System.prototype.encounteredEnemyBook = function(enemy) {
  return enemy && enemy.name && !enemy.meta.NoBook && this.isInEnemyBook(enemy);
};

Game_System.prototype.clearDropItem = function() {
	this._itemDorps = [];
};

Game_System.prototype.setDropItemFlag = function(enemyId, dropId, flag) {
	if (!this._itemDorps) {
		this.clearDropItem();
  }
  this._itemDorps[enemyId] = this._itemDorps[enemyId] || [];
  this._itemDorps[enemyId][dropId] = flag;
};

Game_System.prototype.getDropItemFlag = function(enemyId, dropId) {
  if(!this._itemDorps || !this._itemDorps[enemyId] || !this._itemDorps[enemyId][dropId]) {
    return false;
  }
  return this._itemDorps[enemyId][dropId];
};

Game_System.prototype.clearStealItem = function() {
	this._stealItem = [];
};

Game_System.prototype.setStealItemFlag = function(enemyId, stealId, flag) {
	if (!this._stealItem) {
		this.clearStealItem();
  }
  this._stealItem[enemyId] = this._stealItem[enemyId] || [];
  this._stealItem[enemyId][stealId] = flag;
};

Game_System.prototype.getStealItemFlag = function(enemyId, stealId) {
  if(!this._stealItem || !this._stealItem[enemyId] || !this._stealItem[enemyId][stealId]) {
    return false;
  }
  return this._stealItem[enemyId][stealId];
};

Game_System.prototype.dropItemListFlag = function(enemyId, dropListId, mode) {
	if(enemyId > 0){
    if(dropListId > 0){
      this.setDropItemFlag(enemyId, dropListId, mode);
    } else {
      let itemList = $dataEnemies[enemyId].dropItems;
       for(let i = 0; itemList.length > i; i++){
        this.setDropItemFlag(enemyId, i, mode);
      }
    }
  }
};

Game_System.prototype.stealItemListFlag = function(enemyId, stealListId, mode) {
	if(enemyId > 0){
    if(stealListId > 0){
      this.setStealItemFlag (enemyId, stealListId, mode);
    } else {
      const enemy = $dataEnemies[enemyId];
      const itemList = (Imported.NUUN_StealableItems ? this.getStealList(enemy) : null);
      if(itemList) {
        for(let i = 0; itemList.length > i; i++){
          this.setStealItemFlag(enemyId, i, mode);
        }
      }
    }
  }
};

Game_System.prototype.dorpItemAcquired = function(switchId, enemyId, dropId) {
  if (dropId > 0) {
    drop = this.getDropItemFlag(enemyId, dropId);
  } else {
    drop = false;
    const itemList = $dataEnemies[enemyId].dropItems;
    if (itemList) {
      for(let i = 0; itemList.length > i; i++){
        if (itemList[i].kind > 0) {
          drop = this.getDropItemFlag(enemyId, i);
          if (!drop) {
            break;
          }
        }
      }
    }
  }
  if (switchId > 0) {
    $gameSwitches.setValue(switchId, drop);
  } else {
    return drop;
  }
};

Game_System.prototype.stealItemAcquired = function(switchId, enemyId, stealId) {
  if (stealId > 0) {
    steal = this.getStealItemFlag(enemyId, stealId);
  } else {
    steal = false;
    const itemList = this.getStealList($dataEnemies[enemyId]);
    if (itemList) {
      for(let i = 0; itemList.length > i; i++){
        steal = this.getStealItemFlag(enemyId, stealId);
        if (!steal) {
          break;
        }
      }
    }
  }
  if (switchId > 0) {
    $gameSwitches.setValue(switchId, steal);
  } else {
    return steal;
  }
};

Game_System.prototype.registrationTiming = function() {
  return param.RegistrationTiming;
};

Game_System.prototype.registrationStatusTiming = function() {
  return param.RegistrationStatusTiming;
};

Game_System.prototype.getStealList = function(enemy) {
  const re =/<(?:steal)\s*([IWAM]):\s*(\d+(?:\s*,\s*\d+)*)>/g;
  const stealItems = [];
	while(true) {
		let match = re.exec(enemy.note);
		if (match) {
			let data = match[2].split(',');
			switch (match[1]) {
				case 'I':
					stealItems.push({dataId: parseInt(data[0]), denominator: parseInt(data[1]), kind:1});
					break;
				case 'W':
					stealItems.push({dataId: parseInt(data[0]), denominator: parseInt(data[1]), kind:2});
					break;
				case 'A':
					stealItems.push({dataId: parseInt(data[0]), denominator: parseInt(data[1]), kind:3});
					break;
				case 'M':
					stealItems.push({dataId: parseInt(data[0]), denominator: parseInt(data[1]), kind:4});
					break;
			}
		} else {
			return stealItems;
		}
	}
};

//Game_Troop
const _Game_Troop_setup = Game_Troop.prototype.setup;
Game_Troop.prototype.setup = function(troopId) {
  _Game_Troop_setup.call(this, troopId);
  this.members().forEach(function(enemy) {
    if (enemy.isAppeared() && $gameSystem.registrationTiming() === 0) {
      $gameSystem.addToEnemyBook(enemy.enemyId());
      if ($gameSystem.registrationStatusTiming() === 0) {
        $gameSystem.addStatusToEnemyBook(enemy.enemyId());
      }
    }
  }, this);
};

//Game_Enemy
const _Game_Enemy_appear = Game_Enemy.prototype.appear;
Game_Enemy.prototype.appear = function() {
  _Game_Enemy_appear.call(this);
  if ($gameSystem.registrationTiming() === 0) {
    $gameSystem.addToEnemyBook(this._enemyId);
    if ($gameSystem.registrationStatusTiming() === 0) {
      $gameSystem.addStatusToEnemyBook(enemy.enemyId());
    }
  }
};

const _Game_Enemy_transform = Game_Enemy.prototype.transform;
Game_Enemy.prototype.transform = function(enemyId) {
  if (param.TransformDefeat) {
    $gameSystem.defeatCount(this.enemyId());
  }
  _Game_Enemy_transform.call(this, enemyId);
  if ($gameSystem.registrationTiming() === 0) {
    $gameSystem.addToEnemyBook(enemyId);
    if ($gameSystem.registrationStatusTiming() === 0) {
      $gameSystem.addStatusToEnemyBook(enemyId);
    }
  }
};

const _Game_Enemy_die = Game_Enemy.prototype.die;
Game_Enemy.prototype.die = function() {
  _Game_Enemy_die.call(this);
  if ($gameSystem.registrationStatusTiming() === 1 || $gameSystem.registrationStatusTiming() === 3) {
    $gameSystem.addStatusToEnemyBook(this.enemyId());
  } else if ($gameSystem.registrationTiming() === 1 || $gameSystem.registrationTiming() === 3) {
    $gameSystem.addToEnemyBook(this.enemyId());
  }
  $gameSystem.defeatCount(this.enemyId());
};

Game_Enemy.prototype.dropItemFlag = function(drop) {
  let di = this.enemy().dropItems;
  for (let i = 0; i < drop.length; i++){
    for(let r = 0; r < di.length; r++){
      if(drop[i].id === di[r].dataId){
        switch (di[r].kind) {
        case 1:
          if(DataManager.isItem(drop[i])){
            $gameSystem.setDropItemFlag(this._enemyId, r, true);
          }
          break;
        case 2:
          if(DataManager.isWeapon(drop[i])){
            $gameSystem.setDropItemFlag(this._enemyId, r, true);
          }
          break;
        case 3:
          if(DataManager.isArmor(drop[i])){
            $gameSystem.setDropItemFlag(this._enemyId, r, true);
          }
          break;
        }
      }
    }
  }
};

const _Game_Enemy_makeDropItems = Game_Enemy.prototype.makeDropItems;
Game_Enemy.prototype.makeDropItems = function() {
  const drop = _Game_Enemy_makeDropItems.call(this);
  this.dropItemFlag(drop);
  return drop;
};

Game_Enemy.prototype.stealItemFlag = function() {
  const enemyId = this._enemyId;
  const number = $gameSystem._stealIndex;
  $gameSystem.setStealItemFlag(enemyId, number, true);
};

const _Game_Enemy_makeStealItems = Game_Enemy.prototype.makeStealItems;
Game_Enemy.prototype.makeStealItems = function(rate, mode) {
  const di = _Game_Enemy_makeStealItems.call(this, rate, mode)
  if(mode === 1 && di){
    this.stealItemFlag();
  }
  return di;
};

const _Game_Action_apply = Game_Action.prototype.apply
Game_Action.prototype.apply = function(target) {
  this._analyzeDate = this.item().meta.AnalyzeSkill ? param.AnalyzeSkillMode[Number(this.item().meta.AnalyzeSkill) - 1] : null;
  if (this._analyzeDate) {
    const text = this._analyzeDate.AnalyzeMissMessage
    if (text) {
      BattleManager.analyzeMissMessage = text.format(target.name(), this.subject().name())
    }
  }
  _Game_Action_apply.call(this, target);
};

const _Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
  _Game_Action_applyItemUserEffect.call(this, target);
  if (this._analyzeDate) {
    BattleManager.analyzeTarget = target;
    SceneManager._scene.enemyBookEnemyAnalyze(this._analyzeDate);
  }
};

//Scene_Menu
const _Scene_Menu_createCommandWindow =　Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
  _Scene_Menu_createCommandWindow.call(this);
    this._commandWindow.setHandler("enemyBook", this.commandEnemyBook.bind(this));
};

Scene_Menu.prototype.commandEnemyBook = function() {
  SceneManager.push(Scene_EnemyBook);
};

const _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
  _Window_MenuCommand_addOriginalCommands.call(this);
  if(param.ShowCommand && ($gameSwitches.value(param.enemyBookSwitch) || param.enemyBookSwitch === 0)) {
    this.addCommand(param.CommandName, "enemyBook");
  }
};


//Scene_EnemyBook
function Scene_EnemyBook() {
  this.initialize(...arguments);
}

Scene_EnemyBook.prototype = Object.create(Scene_MenuBase.prototype);
Scene_EnemyBook.prototype.constructor = Scene_EnemyBook;

Scene_EnemyBook.prototype.initialize = function() {
  Scene_MenuBase.prototype.initialize.call(this);
};

Scene_EnemyBook.prototype.create = function() {
  Scene_MenuBase.prototype.create.call(this);
  this.createPercentWindow();
  this.createIndexWindow();
  this.createEnemyPageWindow();
  this.createEnemyWindow();
  if (param.CategoryOn && param.EnemyBookCategory) {
    this.createCategoryNameWindow();
    this.createCategoryWindow();
    this.enemyCategorySelection();
  } else {
    this.enemyIndexSelection();
  }
};

Scene_EnemyBook.prototype.createIndexWindow = function() {
  const rect = this.indexWindowRect();
  this._indexWindow = new Window_EnemyBook_Index(rect);
  this._indexWindow.setHandler("cancel", this.onEnemyIndexCancel.bind(this));
  this.addWindow(this._indexWindow);
  this._indexWindow.setPercentWindow(this._percentWindow);
  this._indexWindow.activate();
  this._indexWindow.hide();
  if (param.BackGroundImg) {
    this._indexWindow.opacity = 0;
    this._indexWindow.frameVisible = false;
  }
};

Scene_EnemyBook.prototype.createCategoryNameWindow = function() {
  const rect = this.categoryNameWindowRect();
  this._categoryNameWindow = new Window_EnemyBook_CategoryName(rect);
  this.addWindow(this._categoryNameWindow);
  if (param.BackGroundImg) {
    this._categoryNameWindow.opacity = 0;
    this._categoryNameWindow.frameVisible = false;
  }
};

Scene_EnemyBook.prototype.createCategoryWindow = function() {
  const rect = this.indexWindowRect();
  this._categoryWindow = new Window_EnemyBook_Category(rect);
  this._categoryWindow.setHandler("cancel", this.popScene.bind(this));
  this._categoryWindow.setHandler("ok", this.onCategoryOk.bind(this));
  this.addWindow(this._categoryWindow);
  this._categoryWindow.hide();
  this._indexWindow.setCategoryWindow(this._categoryWindow);
  this._categoryNameWindow.setCategoryWindow(this._categoryWindow);
  if (param.BackGroundImg) {
    this._categoryWindow.opacity = 0;
    this._categoryWindow.frameVisible = false;
  }
};

Scene_EnemyBook.prototype.createPercentWindow = function() {
  if (PercentContentLength) {
    const rect = this.percentWindowRect();
    this._percentWindow = new Window_EnemyBook_Percent(rect);
    this.addWindow(this._percentWindow);
    if (param.BackGroundImg) {
      this._percentWindow.opacity = 0;
      this._percentWindow.frameVisible = false;
    }
  }
};

Scene_EnemyBook.prototype.createEnemyWindow = function() {
  const rect = this.enemyWindowRect();
  this._enemyWindow = new Window_EnemyBook(rect);
  this.addWindow(this._enemyWindow);
  this._indexWindow.setEnemyWindow(this._enemyWindow);
  this._enemyPageWindow.setEnemyWindow(this._enemyWindow);
  this._indexWindow.select(Window_EnemyBook_Index._lastIndex);
  if (param.BackGroundImg) {
    this._enemyWindow.opacity = 0;
    this._enemyWindow.frameVisible = false;
  }
  this.setMaxPage(param.PageSetting);
};

Scene_EnemyBook.prototype.createEnemyPageWindow = function() {
  const rect = this.enemyWindowPageRect();
  this._enemyPageWindow = new Window_EnemyBookPageCategory(rect);
  this.addWindow(this._enemyPageWindow);
  if (param.BackGroundImg) {
    this._enemyPageWindow.opacity = 0;
    this._enemyPageWindow.frameVisible = false;
  }
  this._enemyPageWindow.setPageList(param.PageSetting, param.PageCols);
  if (param.PageSetting.length <= 1) {
    this._enemyPageWindow.height = 0;
    this._enemyPageWindow.hide();
  }
};

Scene_EnemyBook.prototype.percentWindowRect = function() {
  const wx = param.WindowMode === 0 ? 0 : this.enemyWindowWidth();
  const wy = this.mainAreaTop();
  const ww = Graphics.boxWidth / 3;
  const wh = PercentContentLength ? this.calcWindowHeight(1, true) : 0;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_EnemyBook.prototype.enemyWindowPageRect = function() {
  const wx = param.WindowMode === 0 ? Graphics.boxWidth / 3 : 0;
  const wy = this.mainAreaTop();
  const ww = this.enemyWindowWidth();
  const wh = this.calcWindowHeight(1, true);
  return new Rectangle(wx, wy, ww, wh);
};

Scene_EnemyBook.prototype.indexWindowRect = function() {
  const height = this.percentWindowRect().height;
  const wx = param.WindowMode === 0 ? 0 : this.enemyWindowWidth();
  const wy = this.mainAreaTop() + height;
  const ww = Graphics.boxWidth / 3;
  const wh = this.mainAreaHeight() - height;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_EnemyBook.prototype.enemyWindowRect = function() {
  const wx = param.WindowMode === 0 ? Graphics.boxWidth / 3 : 0;
  const wy = this.mainAreaTop() + this._enemyPageWindow.height;
  const ww = this.enemyWindowWidth();
  const wh = this.mainAreaHeight() - this._enemyPageWindow.height;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_EnemyBook.prototype.categoryNameWindowRect = function() {
  const wx = param.WindowMode === 0 ? 0 : this.enemyWindowWidth();
  const wy = this.mainAreaTop() + this.percentWindowRect().height;
  const ww = Graphics.boxWidth / 3;
  const wh = this.calcWindowHeight(1, true);
  this._indexWindow.y += wh;
  this._indexWindow.height -= wh;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_EnemyBook.prototype.enemyWindowWidth = function() {
  return Graphics.boxWidth - Graphics.boxWidth / 3;
};

Scene_EnemyBook.prototype.helpAreaHeight = function() {
  return 0;
};

Scene_EnemyBook.prototype.setMaxPage = function(page) {
  this._maxPage = page.length;
  this._enemyWindow.displayList = page;
};

Scene_EnemyBook.prototype.getMaxPage = function() {
  return this._maxPage;
};

const _Scene_EnemyBook_createBackground = Scene_EnemyBook.prototype.createBackground;
Scene_EnemyBook.prototype.createBackground = function() {
  _Scene_EnemyBook_createBackground.call(this);
	if (param.BackGroundImg) {
		const sprite = new Sprite();
    sprite.bitmap = ImageManager.nuun_LoadPictures(param.BackGroundImg);
    sprite.x = param.BackUiWidth ? (Graphics.width - (Graphics.boxWidth + 8)) / 2 : 0;
    sprite.y = param.BackUiWidth ? (Graphics.height - (Graphics.boxHeight + 8)) / 2 : 0;
    this.addChild(sprite);
    this._backGroundImg = sprite;
  }
};

Scene_EnemyBook.prototype.update = function() {
  Scene_MenuBase.prototype.update.call(this);
  if (param.BackGroundImg) {
    const sprite = this._backGroundImg;
    if(param.BackUiWidth) {
      sprite.scale.x = (Graphics.boxWidth + 8 !== sprite.bitmap.width ? (Graphics.boxWidth + 8) / sprite.bitmap.width : 1);
      sprite.scale.y = (Graphics.boxHeight + 8!== sprite.bitmap.height ? (Graphics.boxHeight + 8) / sprite.bitmap.height : 1);
    } else {
      sprite.scale.x = (Graphics.width !== sprite.bitmap.width ? Graphics.width / sprite.bitmap.width : 1);
      sprite.scale.y = (Graphics.height !== sprite.bitmap.height ? Graphics.height / sprite.bitmap.height : 1);
    }
	}
};

Scene_EnemyBook.prototype.onEnemyIndexCancel = function() {
  if (param.CategoryOn && param.EnemyBookCategory) {
    this.enemyCategorySelection();
  } else {
    this.popScene();
  }
};

Scene_EnemyBook.prototype.onCategoryOk = function() {
  this.enemyIndexSelection();
  this._indexWindow.setCategory();
  this._indexWindow.refresh();
};

Scene_EnemyBook.prototype.enemyIndexSelection = function() {
  if (param.CategoryOn && param.EnemyBookCategory) {
    this._categoryWindow.hide();
    this._categoryWindow.deselect();
    this._categoryWindow.deactivate();
    this._categoryNameWindow.setName(this._categoryWindow.index());
  }
  this._indexWindow.show();
  this._indexWindow.activate();
  this._enemyPageWindow.setPage();
  this._enemyPageWindow.activate();
};

Scene_EnemyBook.prototype.enemyCategorySelection = function() {
  this._categoryWindow.setSelect();
  this._categoryWindow.show();
  this._indexWindow.hide();
  this._categoryWindow.activate();
  this._indexWindow.deselect();
  this._indexWindow.deactivate();
  this._enemyPageWindow.deselect();
  this._enemyPageWindow.deactivate();
  this._enemyPageWindow.itemClear();
};


//Window_EnemyBook_Percent
function Window_EnemyBook_Percent() {
  this.initialize(...arguments);
}

Window_EnemyBook_Percent.prototype = Object.create(Window_Selectable.prototype);
Window_EnemyBook_Percent.prototype.constructor = Window_EnemyBook_Percent;

Window_EnemyBook_Percent.prototype.initialize = function(rect) {
  Window_Selectable.prototype.initialize.call(this, rect);
  this._defeat = {};
  this._encountered = {};
  this._duration = 0;
  this._oy = 0;
  this._percentContent = param.PercentContent;
  this._percentContentLength = this._percentContent.length;
};

Window_EnemyBook_Percent.prototype.percentRefresh = function(enemyList) {
  this.defeatPercent(enemyList);
  this.encounteredPercent(enemyList);
  this.refresh();
};

Window_EnemyBook_Percent.prototype.defeatPercent = function(enemyList) {
  this._defeat.encNum = $gameSystem.defeatEnemy(enemyList);
  this._defeat.onStatus = $gameSystem.onStatusEnemyDate(enemyList);
  this._defeat.Percent = Math.floor(this._defeat.encNum / enemyList.length * 100);
  this._defeat.complete = Math.floor(this._defeat.onStatus / enemyList.length * 100);
  this._defeat.length = enemyList.length;
};

Window_EnemyBook_Percent.prototype.encounteredPercent = function(enemyList) {
  this._encountered.encNum = $gameSystem.encounteredEnemy(enemyList);
  //this._encountered.Percent = Math.floor(this._encountered.encNum / enemyList.length * 100);
  this._encountered.length = enemyList.length;
};

Window_EnemyBook_Percent.prototype.refresh = function() {
  const lineHeight = this.lineHeight();
  const rect = this.itemLineRect(0);
  let y = rect.y + (this._oy * -1);
  this.contents.clear();
  for (const content of this._percentContent) {
    const text = this.getParam(content);
    this.drawText(text, rect.x, y, rect.width, 'center');
    y += lineHeight;
  }
  const text = this.getParam(this._percentContent[0]);
  this.drawText(text, rect.x, y, rect.width, 'center');
  //this.drawText(param.EncountName +'：'+ this._encountered.encNum +'/'+ this._encountered.length, rect.x, y, rect.width, 'center');
  //this.drawText(param.DefeatName +'：'+ this._defeat.encNum +'/'+ this._defeat.length, rect.x, y + lineHeight * 1, rect.width, 'center');
  //this.drawText(param.EncountName +'：'+ this._encountered.encNum +'/'+ this._encountered.length, rect.x, y + lineHeight * 3, rect.width, 'center');
  //this.drawText(param.completeName +'：'+ this._defeat.complete +' %', rect.x, y + lineHeight * 2, rect.width, 'center');
};

Window_EnemyBook_Percent.prototype.getParam = function(content) {
  let text = null;
  if (content.ContentDate === 0) {
    text = content.ContentName +' : '+ this._defeat.complete +' %';
  } else if (content.ContentDate === 1) {
    text = content.ContentName +' : '+ this._encountered.encNum +'/'+ this._encountered.length;
  } else if (content.ContentDate === 2) {
    text = content.ContentName +' : '+ this._defeat.encNum +'/'+ this._defeat.length;
  }
  return text;
};

Window_EnemyBook_Percent.prototype.update = function() {
  Window_Selectable.prototype.update.call(this);
  if (this._percentContentLength > 1) {
    this._duration++;
    this.updateInterval();
  }
};

Window_EnemyBook_Percent.prototype.updateInterval = function() {
  const lineHeight = this.lineHeight();
  if(this._duration >= param.Interval && this._duration < param.Interval + lineHeight){
    this._oy++;
    this.refresh();
  }
  if(this._duration >= param.Interval + lineHeight){
    this._duration = 0;
    if(this._oy >= lineHeight * this._percentContentLength){
       this._oy = 0;
    }
  }
};

//Window_EnemyBook_CategoryName
function Window_EnemyBook_CategoryName() {
  this.initialize(...arguments);
}

Window_EnemyBook_CategoryName.prototype = Object.create(Window_Selectable.prototype);
Window_EnemyBook_CategoryName.prototype.constructor = Window_EnemyBook_CategoryName;

Window_EnemyBook_CategoryName.prototype.initialize = function(rect) {
  Window_Selectable.prototype.initialize.call(this, rect);
  this._categoryName = null;
  this.refresh();
};

Window_EnemyBook_CategoryName.prototype.setName = function() {
  const name = this._categoryWindow._categoryList[this._categoryWindow._categorySelect].CategoryName;
  this._categoryName = name;
  this.refresh();
};

Window_EnemyBook_CategoryName.prototype.refresh = function() {
  const rect = this.itemLineRect(0);
  this.contents.clear();
  this.drawText(this._categoryName, rect.x, rect.y, rect.width);
};

Window_EnemyBook_CategoryName.prototype.setCategoryWindow = function(categoryWindow) {
  this._categoryWindow = categoryWindow;
};


//Window_EnemyBook_Category
function Window_EnemyBook_Category() {
  this.initialize(...arguments);
}

Window_EnemyBook_Category.prototype = Object.create(Window_Selectable.prototype);
Window_EnemyBook_Category.prototype.constructor = Window_EnemyBook_Category;

Window_EnemyBook_Category.prototype.initialize = function(rect) {
  Window_Selectable.prototype.initialize.call(this, rect);
  this._categoryList = param.EnemyBookCategory;
  this._categorySelect = 0;
  this.select(this._categorySelect);
  this.refresh();
};

Window_EnemyBook_Category.prototype.maxCols = function() {
  return 1;
};

Window_EnemyBook_Category.prototype.maxItems = function() {
  return this._categoryList.length;
};

Window_EnemyBook_Category.prototype.processOk = function() {
  this._categorySelect = this.index();
  Window_Selectable.prototype.processOk.call(this);
};

Window_EnemyBook_Category.prototype.processCancel = function() {
  this._categorySelect = this.index();
  Window_Selectable.prototype.processCancel.call(this);
};

Window_EnemyBook_Category.prototype.getDate = function(index) {
  return this._categoryList[index];
};

Window_EnemyBook_Category.prototype.drawItem = function(index) {
  const rect = this.itemLineRect(index);
  const categoryName = this._categoryList[index].CategoryName;
  this.drawText(categoryName, rect.x, rect.y, rect.width);
};

Window_EnemyBook_Category.prototype.setSelect = function() {
  this.select(this._categorySelect);
};

Window_EnemyBook_Category.prototype.drawItemBackground = function(index) {
  if(!param.NoCursorBackground) {
    Window_Selectable.prototype.drawItemBackground.call(this, index);
  }
};

//Window_EnemyBook_Index
function Window_EnemyBook_Index() {
  this.initialize(...arguments);
}

Window_EnemyBook_Index.prototype = Object.create(Window_Selectable.prototype);
Window_EnemyBook_Index.prototype.constructor = Window_EnemyBook_Index;

Window_EnemyBook_Index._lastTopRow = 0;
Window_EnemyBook_Index._lastIndex = 0;

Window_EnemyBook_Index.prototype.initialize = function(rect) {
  Window_Selectable.prototype.initialize.call(this, rect);
  this._enemyList = [];
  this._category = null;
  this.refresh();
};

Window_EnemyBook_Index.prototype.setSelect = function() {
  if (param.CategoryOn && param.EnemyBookCategory) {
    Window_EnemyBook_Index._lastIndex = this.maxItems() > 0 ? Math.min(Window_EnemyBook_Index._lastIndex, this.maxItems() - 1) : 0;
  }
  if (Window_EnemyBook_Index._lastTopRow + this.maxPageRows() - 1 < Window_EnemyBook_Index._lastIndex) {
    Window_EnemyBook_Index._lastTopRow += 1;
  }
  this.setTopRow(Window_EnemyBook_Index._lastTopRow);
  this.select(Window_EnemyBook_Index._lastIndex);
};

Window_EnemyBook_Index.prototype.maxCols = function() {
  return 1;
};

Window_EnemyBook_Index.prototype.maxItems = function() {
  return this._enemyList ? this._enemyList.length : 0;
};

Window_EnemyBook_Index.prototype.update = function() {
	Window_Selectable.prototype.update.call(this);
  //this.updateEnemyStatus();
};

Window_EnemyBook_Index.prototype.select = function(index) {
  Window_Selectable.prototype.select.call(this, index);
  if (this.index() >= 0) {
    this.updateIndex();
  }
  this.updateEnemyStatus();
};

Window_EnemyBook_Index.prototype.updatePercent = function() {
  if (this._percentWindow) {
    const enemy = this._enemyPercentList;
    this._percentWindow.percentRefresh(enemy);
  }
};

Window_EnemyBook_Index.prototype.updateEnemyStatus = function() {
  if (this._enemyWindow) {
    const enemy = this.getEnemy();
    this._enemyWindow.setEnemy(enemy);
  }
};

Window_EnemyBook_Index.prototype.updateIndex = function() {
  Window_EnemyBook_Index._lastTopRow = this.topRow();
  Window_EnemyBook_Index._lastIndex = this.index();
};

Window_EnemyBook_Index.prototype.getEnemy = function() {
  return this._enemyList[this.index()];
};

Window_EnemyBook_Index.prototype.setPercentWindow = function(percentWindow) {
  this._percentWindow = percentWindow;
  this.updatePercent();
};

Window_EnemyBook_Index.prototype.setEnemyWindow = function(enemyWindow) {
  this._enemyWindow = enemyWindow;
};

Window_EnemyBook_Index.prototype.setCategoryWindow = function(categoryWindow) {
  this._categoryWindow = categoryWindow;
};

Window_EnemyBook_Index.prototype.setCategory = function() {
  const index = this._categoryWindow._categorySelect;
  this._category = this._categoryWindow.getDate(index);
};

Window_EnemyBook_Index.prototype.enemyAt = function(index) {
  return this._enemyList && index >= 0 ? this._enemyList[index] : null;
};

Window_EnemyBook_Index.prototype.makeEnemyList = function() {
  this._enemyPercentList = [];
  this._listIndex = 0;
  this._listEnemy = [];
  this._enemyList = $dataEnemies.filter(enemy => this.includes(enemy));
};

Window_EnemyBook_Index.prototype.includes = function(enemy) {
  const result = enemy && enemy.name && !enemy.meta.NoBook;
  if (result) {
    this._listIndex++;
    this._enemyPercentList.push(enemy);
  }
  if (result && this.categoryIncludes(enemy)) {
    this._listEnemy.push(this._listIndex);
    return true;
  }
  return false;
};

Window_EnemyBook_Index.prototype.categoryIncludes = function(enemy) { 
  if (!this._category || this._category.CategoryKey === "all") {
    return true;
  }
  const enemyCategory = enemy.meta.CategoryKey ? enemy.meta.CategoryKey.split(',') : ["all"];
  return enemyCategory.find(category => category === this._category.CategoryKey);
};

Window_EnemyBook_Index.prototype.drawItem = function(index) {
  const enemy = this.enemyAt(index);
  if(enemy) {
    const rect = this.itemLineRect(index);
    let name = '';
    if ($gameSystem.isInEnemyBook(enemy)) {
      name = enemy.name;
    } else {
      name = this.unknownDataLength(enemy);
    }
    if(param.NumberType > 0) {
      let numberText = this._listEnemy[index];
      const textWidth = this.numberWidth(numberText);
      if (param.NumberType === 2) {
        numberText = this.numberWidthSlice(numberText);
      }
      this.drawText(numberText, rect.x, rect.y, textWidth);
      this.drawText(":", rect.x + textWidth + 6, rect.y);
      this.drawText(name, rect.x + textWidth + 22, rect.y, rect.width - textWidth - 22);
    } else {
      this.drawText(name, rect.x, rect.y, rect.width);
    }
  }
};

Window_EnemyBook_Index.prototype.numberWidth = function(numberText) {
  return this.textWidth(this._enemyList.length >= 1000 || param.NumberType === 2 ? '000' : '00');
};

Window_EnemyBook_Index.prototype.numberWidthSlice = function(indexText) {
  return (this._enemyList.length >= 1000 ? ('0000' + indexText).slice(-4) : ('000' + indexText).slice(-3));
};

Window_EnemyBook_Index.prototype.unknownDataLength = function(enemy) {
  if(param.UnknownData === '？' || param.UnknownData === '?') {
    const name_length = this.EnemyNameLength(enemy);
    return param.UnknownData.repeat(name_length);
  } else {
    return param.UnknownData;
  }
};

Window_EnemyBook_Index.prototype.EnemyNameLength = function(enemy) {
	return enemy.name.length;
};

Window_EnemyBook_Index.prototype.drawItemBackground = function(index) {
  if(!param.NoCursorBackground) {
    Window_Selectable.prototype.drawItemBackground.call(this, index);
  }
};

Window_EnemyBook_Index.prototype.refresh = function() {
  this.makeEnemyList();
  this.updatePercent();
  this.setSelect();
  Window_Selectable.prototype.refresh.call(this);
};


//Window_EnemyBook
function Window_EnemyBook() {
  this.initialize(...arguments);
}

Window_EnemyBook.prototype = Object.create(Window_Selectable.prototype);
Window_EnemyBook.prototype.constructor = Window_EnemyBook;

Window_EnemyBook.prototype.initialize = function(rect) {
  Window_Selectable.prototype.initialize.call(this, rect);
  this._additionalSprites = {};
  this._enemy = null;
  this._bookMode = 0;
  this._enemy = null;
  this._enemyData = [];
  this._pageMode = 0;
  this._enemySprite = new Sprite_BookEnemy();
  this.selectEnemy = null;
  this._AnalyzeStatus = null;
  this.displayList = null;
  this.addChildToBack(this._enemySprite);
  this.refresh();
};

Window_EnemyBook.prototype.setAnalyzeStatus = function(args) {
  this._AnalyzeStatus = args;
};

Window_EnemyBook.prototype.setEnemy = function(enemy) {
  if(this._enemy !== enemy) {
    this._enemy = enemy;
    this.refresh();
  }
};

Window_EnemyBook.prototype.maxCols = function() {
  return param.ContentCols;
};

Window_EnemyBook.prototype.defeatFlag = function() {
  return $gameSystem.defeatNumber(this._enemy.id) > 0;
};

Window_EnemyBook.prototype.paramMask = function(MaskMode) {
  return MaskMode && !this.noUnknownStatus() ? $gameSystem.isInEnemyBookStatus(this._enemy) : true;
};

Window_EnemyBook.prototype.paramEXMask = function(MaskMode) {
  return MaskMode && !this.noUnknownStatus() ? $gameSystem.isInEnemyBookStatus(this._enemy) : true;
};

Window_EnemyBook.prototype.resistWeakDataMask = function(MaskMode) {
  return MaskMode && !this.noUnknownStatus() ? $gameSystem.isInEnemyBookStatus(this._enemy) : true;
};

Window_EnemyBook.prototype.showDropItemMask = function(MaskMode) {
  return MaskMode && !this.noUnknownStatus() ? $gameSystem.isInEnemyBookStatus(this._enemy): true;
};

Window_EnemyBook.prototype.dropItemFlag = function(index) {
  return param.ShowDropItemName ? $gameSystem.getDropItemFlag(this._enemy.id, index) : true;
};

Window_EnemyBook.prototype.showStealItemMask = function(MaskMode) {
  return MaskMode && !this.noUnknownStatus() ? $gameSystem.isInEnemyBookStatus(this._enemy): true;
};

Window_EnemyBook.prototype.stealItemFlag = function(index) {
  return param.ShowStealItemName ? $gameSystem.getStealItemFlag(this._enemy.id, index) : true;
};

Window_EnemyBook.prototype.noUnknownStatus = function(enemy) {
  return this._enemy.meta.ShowDataBook || this._bookMode === 1;
};

Window_EnemyBook.prototype.analyzeGaugeVisible = function() {
  return this._AnalyzeStatus && eval(this._AnalyzeStatus.StatusGaugeVisible);
};

Window_EnemyBook.prototype.analyzeCurrentStatus = function() {
  return this._AnalyzeStatus && eval(this._AnalyzeStatus.EnemyCurrentStatus);
};

Window_EnemyBook.prototype.maxWidth = function() {
  return this.itemWidth() / 2 - this.itemPadding() * 2;
};

Window_EnemyBook.prototype.statusLineHeight = function() {
  return Math.floor((Graphics.boxHeight - 616) / 60) * 36;
};

Window_EnemyBook.prototype.crisisColor = function(enemy) {
  return enemy.isDying() ? ColorManager.crisisColor() : ColorManager.normalColor();
};

Window_EnemyBook.prototype.buffColor = function(params, nparams) {
  if (!this._AnalyzeStatus) {
    return ColorManager.normalColor();
  } else if (params > nparams) {
    return ColorManager.textColor(this._AnalyzeStatus.BuffColor) || ColorManager.normalColor();
  } else if (params < nparams) {
    return ColorManager.textColor(this._AnalyzeStatus.DebuffColor) || ColorManager.normalColor();
  } else {
    return ColorManager.normalColor();
  }
};

Window_EnemyBook.prototype.refresh = function() {
  if(!this._enemy || this._pageMode < 0) {
    this.contents.clear();
    this._enemySprite.bitmap = null;
    return;
  }
  let enemy = null;
  if (this._bookMode === 1) {
    enemy = this.analyzeCurrentStatus() ? this.selectEnemy : new Game_Enemy(this._enemy.id, 0, 0);
  } else {
    if(!this._enemyData[this._enemy.id]) {
      enemy = new Game_Enemy(this._enemy.id, 0, 0);
      this._enemyData[this._enemy.id] = enemy;
    } else {
      enemy = this._enemyData[this._enemy.id];
    }
  }
  this.contents.clear();
  this._enemySprite.bitmap = null;
  this._enemySprite._svEnemy = false;
  if ($gameParty.inBattle()) {
    this.removeGauge();
  }
  if (this._bookMode === 0) {//通常モード
    if (!enemy || !$gameSystem.isInEnemyBook(this._enemy)) {
      return;
    }
  } else if (this._bookMode === 1){//アナライズモード
    if (!enemy) {
      return;
    }
  } else {

  }
  this.page(enemy);
};

Window_EnemyBook.prototype.page = function(enemy) {
  if (!this.displayList || this.displayList.length <= 0) {
    return;
  }//ListDateSetting
  const list = this.displayList[this._pageMode];
  const listContent = this.listDate(list);
  const lineHeight = this.lineHeight();
  for (const date of listContent) {
    const x_Position = date.X_Position;
    const position = Math.min(x_Position, this.maxCols());
    const rect = this.itemRect(position - 1);
    const x = rect.x;
    const y = (date.Y_Position - 1) * lineHeight + rect.y;
    const width = this.widthMode(date, rect);
    this.dateDisplay(date, enemy, x, y, width);
  }
};

Window_EnemyBook.prototype.widthMode = function(list, rect) {
  if (list.WideMode === 2) {
    rect.width = rect.width * 2 + this.colSpacing();
  } else if (list.WideMode === 3 && param.ContentCols === 3) {
    rect.width = rect.width * 3 + (this.colSpacing() * 2);
  }
  return rect.width;
};

Window_EnemyBook.prototype.listDate = function(list) {
  switch (list.ListDateSetting) {
    case 1:
      return param.PageList1;
    case 2:
      return param.PageList2;
    case 3:
      return param.PageList3;
    case 4:
      return param.PageList4;
    case 5:
      return param.PageList5;
    case 6:
      return param.PageList6;
    case 7:
      return param.PageList7;
    case 8:
      return param.PageList8;
    case 9:
      return param.PageList9;
    case 10:
      return param.PageList10;
    case 11:
      return param.PageList11;
    case 12:
      return param.PageList12;
    case 13:
      return param.PageList13;
    case 14:
      return param.PageList14;
    case 15:
      return param.PageList15;
    case 16:
      return param.PageList16;
    case 17:
      return param.PageList17;
    case 18:
      return param.PageList18;
    case 19:
      return param.PageList19;
    case 20:
      return param.PageList20;
    default:
      return null;
  }
};

Window_EnemyBook.prototype.dateDisplay = function(list, enemy, x, y, width) {
  switch (list.DateSelect) {
    case 0:
      break;
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 18:
    case 19:
    case 20:
    case 21:
    case 22:
    case 23:
    case 24:
    case 25:
    case 26:
    case 27:
    case 28:
    case 29:
      this.enemyParams(list, enemy, x, y, width);
      break;
    case 30:
      this.enemyExp(list, enemy, x, y, width);
      break;
    case 31:
      this.enemyGold(list, enemy, x, y, width);
      break;
    case 32:
      this.defeat(list, enemy, x, y, width);
      break;
    case 33:
      this.enemyName(list, enemy, x, y, width);
      break;
    case 35:
      this.name(list, enemy, x, y, width);
      break;
    case 40:
      this.drawResistElement(list, enemy, x, y, width);
      break;
    case 41:
      this.drawWeakElement(list, enemy, x, y, width);
      break;
    case 42:
      this.drawNoEffectElement(list, enemy, x, y, width);
      break;
    case 45:
      this.drawResistStates(list, enemy, x, y, width);
      break;
    case 46:
      this.drawWeakStates(list, enemy, x, y, width);
      break;
    case 47:
      this.drawNoEffectStates(list, enemy, x, y, width);
      break;
    case 50:
      break;
    case 51:
      break;
    case 60:
      this.dropItems(list, enemy, x, y, width);
      break;
    case 61:
      this.stealItems(list, enemy, x, y, width);
      break;
    case 70:
      this.drawDesc(list, enemy, x, y, width);
      break;
    case 80:
      this.originalParams(list, enemy, x, y, width);
      break;
    case 100:
      break;
    case 200:
      this.enemyImg(list, enemy, x - 4, y - 4, width);
      break;
    case 1000:
      this.horzLine(list, enemy, x, y, width);
      break;
    default:
      break;
  }
};

Window_EnemyBook.prototype.paramNameShow = function(list, enemy) {
  if (list.paramName) {
    return list.paramName
  }
  const params = list.DateSelect;
  switch (params) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
      return TextManager.param(params - 1);
    case 10:
    case 11:
      return TextManager.param(params - 2);
    case 12:
      return "会心率";
    case 13:
      return "会心回避率";
    case 14:
      return "魔法回避率";
    case 15:
      return "魔法反射率";
    case 16:
      return "反撃率";
    case 17:
      return "HP再生率";
    case 18:
      return "MP再生率";
    case 19:
      return "TP再生率";
    case 20:
      return "狙われ率";
    case 21:
      return "防御効果率";
    case 22:
      return "回復効果率";
    case 23:
      return "薬の知識";
    case 24:
      return "MP消費率";
    case 25:
      return "TPチャージ率";
    case 26:
      return "物理ダメージ率";
    case 27:
      return "魔法ダメージ率";
    case 28:
      return "床ダメージ率";
    case 29:
      return "獲得経験率";
    default:
      return null;
  }
};

Window_EnemyBook.prototype.paramShow = function(list, enemy) {
  if (list.DetaEval) {
    return eval(list.DetaEval);
  }
  const params = list.DateSelect;
  switch (params) {
    case 1:
      return this._bookMode === 1 && this.analyzeCurrentStatus() ? enemy._hp : enemy.param(params - 1);
    case 2:
      return this._bookMode === 1 && this.analyzeCurrentStatus() ? enemy._mp : enemy.param(params - 1);
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
      return enemy.param(params - 1);
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 18:
    case 19:
      return enemy.xparam(params - 10) * 100;
    case 20:
    case 21:
    case 22:
    case 23:
    case 24:
    case 25:
    case 26:
    case 27:
    case 28:
    case 29:
      return enemy.sparam(params - 20) * 100;
    default:
      return null;
  }
};

Window_EnemyBook.prototype.normalParam = function(list, enemy) {
  if (list.DetaEval) {
    return eval(list.DetaEval);
  }
  const params = list.DateSelect;
  if (params >= 10) {
    return this.paramShow(list, enemy);
  }
  switch (params) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
      return this._enemy.params[params - 1];
    default:
      return null;
  }
};

Window_EnemyBook.prototype.enemyParams = function(list, enemy, x, y, width) {
  let text = this.paramShow(list, enemy);
  let textWidth = width;
  if (text !== undefined) {
    if ((list.DateSelect === 1 || list.DateSelect === 2) && $gameParty.inBattle() && enemy && this.analyzeGaugeVisible()) {
    } else {
      this.changeTextColor(ColorManager.textColor(list.NameColor));
      nameText = this.paramNameShow(list, enemy);
      textWidth = Math.min(this.textWidth(nameText), width - Math.floor(width / 3));
      this.drawText(nameText, x, y, textWidth);
    }
    this.resetTextColor();
    if(!this.paramMask(list.MaskMode)){
      text = param.UnknownStatus;
    }
    if ($gameParty.inBattle() && this.analyzeGaugeVisible() && list.DateSelect === 1) {
      this.placeGauge(enemy, "hp", x, y);
    } else if ($gameParty.inBattle() && this.analyzeGaugeVisible() && list.DateSelect === 2) {
      this.placeGauge(enemy, "mp", x, y);
    } else {
      if (this._bookMode === 1 && this.analyzeCurrentStatus()) {
        if (!this.analyzeGaugeVisible() && list.DateSelect === 1) {
          this.changeTextColor(this.crisisColor(enemy));
        } else {
          this.changeTextColor(this.buffColor(text, this.normalParam(list, enemy)));
        }
      }
      if (list.DateSelect >= 10) {
        text += "%";
      }
      this.drawText(text, x + textWidth + 8, y, width - (textWidth + 8), 'right');
      this.resetTextColor();
    }
  }
};

Window_EnemyBook.prototype.enemyImg = function(list, enemy, x, y, width) {
  const height = list.ImgMaxHeight * this.lineHeight();
  const itemPadding = this.itemPadding();
  this._enemySprite.setMaxWidth(width);
  this._enemySprite.setMaxHeight(height - itemPadding);
  this._enemySprite.setup(enemy, width / 2 + x + (itemPadding * 2), (y + height / 2) + (itemPadding * 2));
};

Window_EnemyBook.prototype.enemyName = function(list, enemy, x, y, width) {
	this.changeTextColor(ColorManager.textColor(list.NameColor));
	this.drawText(enemy.name(), x, y, width, list.namePosition);
};

Window_EnemyBook.prototype.enemyExp = function(list, enemy, x, y, width) {
  this.changeTextColor(ColorManager.textColor(list.NameColor));
  const nameText = list.paramName ? list.paramName : TextManager.exp;
  const textWidth = Math.min(this.textWidth(nameText), width - Math.floor(width / 3));
  this.drawText(nameText, x, y, textWidth);
  this.resetTextColor();
  let text;
  if(this.paramEXMask(list.MaskMode)) {
    text = list.DetaEval ? eval(list.DetaEval) : enemy.exp();
  } else {
    text = param.UnknownStatus;
  }
  this.drawText(text, x + textWidth + 8, y, width - (textWidth + 8), 'right');
};

Window_EnemyBook.prototype.enemyGold = function(list, enemy, x, y, width) {
  this.changeTextColor(ColorManager.textColor(list.NameColor));
  const nameText = list.paramName ? list.paramName : "獲得金額";
  const textWidth = Math.min(this.textWidth(nameText), width - Math.floor(width / 3));
  this.drawText(nameText, x, y, textWidth);
  this.resetTextColor();
  let text;
  if(this.paramEXMask(list.MaskMode)){
    text = list.DetaEval ? eval(list.DetaEval) : enemy.gold();
    this.drawCurrencyValue(text, this.currencyUnit(), x + textWidth + 8, y, width - (textWidth + 8));
  } else {
    text = param.UnknownStatus;
    this.drawText(text, x + textWidth + 8, y, width - (textWidth + 8), 'right');
  }
};

Window_EnemyBook.prototype.defeat = function(list, enemy, x, y, width) {
  this.changeTextColor(ColorManager.textColor(list.NameColor));
  const nameText = list.paramName ? list.paramName : "倒した数";
  const textWidth = Math.min(this.textWidth(nameText), width - Math.floor(width / 3));
  this.drawText(nameText, x, y, textWidth);
  this.resetTextColor();
  let text;
  if(this.paramEXMask(list.MaskMode)){
    text = list.DetaEval ? eval(list.DetaEval) : $gameSystem.defeatNumber(enemy.enemyId());
  } else {
    text = param.UnknownStatus;
  }
  this.drawText(text, x + textWidth + 8, y, width - (textWidth + 8), 'right');
};

Window_EnemyBook.prototype.name = function(list, enemy, x, y, width) {
  const nameText = list.paramName
  if (nameText) {
    this.changeTextColor(ColorManager.textColor(list.NameColor));
    this.drawText(nameText, x, y, width, list.namePosition);
  }
};

Window_EnemyBook.prototype.horzLine = function(list, enemy, x, y, width) {
  const lineY = y + this.lineHeight() / 2 - 1;
  this.contents.paintOpacity = 48;
  this.contents.fillRect(x, lineY, width, 2, ColorManager.textColor(list.NameColor));
  this.contents.paintOpacity = 255;
};

Window_EnemyBook.prototype.drawResistElement = function(list, enemy, x, y, width) {
  if(!param.ElementList){
    return;
  }
  let Unknown = false;
  this.changeTextColor(ColorManager.textColor(list.NameColor));
  const nameText = list.paramName ? list.paramName : "耐性属性";
  this.drawText(nameText, x, y);
  if(!this.resistWeakDataMask(list.MaskMode)){
    if (param.ElementUnknownIconId === 0) {
      return;
    }
    Unknown = true;
  }
  let icons = [];
  param.ElementList.forEach(Element => {
    if(Element.ElementNo){
      let rate = enemy.elementRate(Element.ElementNo);
      if(rate < 1 && param.ResistNoEffectElement || (rate < 1 && rate > 0 && !param.ResistNoEffectElement)){
        let icon = Unknown ? param.ElementUnknownIconId : Element.ElementIconId;
        if (icon && icon > 0) icons.push(icon);
      }
    }
  });
  let dx = this.iconX(icons, width);
  y += this.lineHeight();
  icons.forEach(icon => {
		this.drawIcon(icon, x, y);
		x += dx;
	});
};

Window_EnemyBook.prototype.drawWeakElement = function(list, enemy, x, y, width) {
  if(!param.ElementList){
    return;
  }
  let Unknown = false;
  this.changeTextColor(ColorManager.textColor(list.NameColor));
  const nameText = list.paramName ? list.paramName : "弱点属性";
  this.drawText(nameText, x, y);
  if(!this.resistWeakDataMask(list.MaskMode)){
    if (param.ElementUnknownIconId === 0) {
      return;
    }
    Unknown = true;
  }
  let icons = [];
  param.ElementList.forEach(Element => {
    if (Element.ElementNo) {
      let rate = enemy.elementRate(Element.ElementNo);
      if (rate > 1) {
        let icon = Unknown ? param.ElementUnknownIconId : Element.ElementIconId;
        if (icon && icon > 0) icons.push(icon);
      }
    }
  });
	let dx = this.iconX(icons, width);
  y += this.lineHeight();
  icons.forEach(icon => {
		this.drawIcon(icon, x, y);
		x += dx;
	});
};

Window_EnemyBook.prototype.drawNoEffectElement = function(list, enemy, x, y, width) {
  if(!param.ElementList){
    return;
  }
  let Unknown = false;
  this.changeTextColor(ColorManager.textColor(list.NameColor));
  const nameText = list.paramName ? list.paramName : "無効属性";
  this.drawText(nameText, x, y);
  if(!this.resistWeakDataMask(list.MaskMode)){
    if (param.ElementUnknownIconId === 0) {
      return;
    }
    Unknown = true;
  }
  let icons = [];
  param.ElementList.forEach(Element => {
    if (Element.ElementNo) {
      let rate = enemy.elementRate(Element.ElementNo);
      if (rate <= 0) {
        let icon = Unknown ? param.ElementUnknownIconId : Element.ElementIconId;
        if (icon && icon > 0) icons.push(icon);
      }
    }
  });
	let dx = this.iconX(icons, width);
  y += this.lineHeight();
  icons.forEach(icon => {
		this.drawIcon(icon, x, y);
		x += dx;
	});
};

Window_EnemyBook.prototype.drawResistStates = function(list, enemy, x, y, width) {
  if(!param.StateList){
    return;
  }
  let Unknown = false;
  this.changeTextColor(ColorManager.textColor(list.NameColor));
  const nameText = list.paramName ? list.paramName : "耐性ステート";
  this.drawText(nameText, x, y);
  if(!this.resistWeakDataMask(list.MaskMode)){
    if (param.StateUnknownIconId === 0) {
      return;
    }
    Unknown = true;
  }
  let icons = [];
  param.StateList.forEach(State => {
    if(State.StateId){
      let stateId = State.StateId;
      let rate = enemy.stateRate(stateId);
      if (param.ResistNoEffectState) {
        rate *= enemy.isStateResist(stateId) ? 0 : 1;
      }
      if (rate < 1 && (param.ResistNoEffectState || (!param.ResistNoEffectState && rate > 0))) {
        let icon = Unknown ? param.StateUnknownIconId : $dataStates[stateId].iconIndex;
        if (icon && icon > 0) icons.push(icon);
      }
    }
  });
  let dx = this.iconX(icons, width);
  y += this.lineHeight();
  icons.forEach(icon => {
	  this.drawIcon(icon, x, y);
	  x += dx;
  });
};

Window_EnemyBook.prototype.drawWeakStates = function(list, enemy, x, y, width) {
  if(!param.StateList){
    return;
  }
  let Unknown = false;
  this.changeTextColor(ColorManager.textColor(list.NameColor));
  const nameText = list.paramName ? list.paramName : "弱点ステート";
  this.drawText(nameText, x, y);
  if(!this.resistWeakDataMask(list.MaskMode)){
    if (param.StateUnknownIconId === 0) {
      return;
    }
    Unknown = true;
  }
  let icons = [];
  param.StateList.forEach(State => {
  if(State.StateId){
    let stateId = State.StateId;
    let rate = enemy.stateRate(stateId);
    if (rate > 1 && !param.NormalWeakState || rate >= 1 && param.NormalWeakState) {
      let icon = Unknown ? param.StateUnknownIconId : $dataStates[stateId].iconIndex;
      if (icon && icon > 0) icons.push(icon);
      }
    }
  });
  let dx = this.iconX(icons, width);
  y += this.lineHeight();
  icons.forEach(icon => {
	  this.drawIcon(icon, x, y);
	  x += dx;
  });
};

Window_EnemyBook.prototype.drawNoEffectStates = function(list, enemy, x, y, width) {
  if(!param.StateList){
    return;
  }
  let Unknown = false;
  this.changeTextColor(ColorManager.textColor(list.NameColor));
  const nameText = list.paramName ? list.paramName : "無効ステート";
  this.drawText(nameText, x, y);
  if(!this.resistWeakDataMask(list.MaskMode)){
    if (param.StateUnknownIconId === 0) {
      return;
    }
    Unknown = true;
  }
  let icons = [];
  param.StateList.forEach(State => {
    if(State.StateId){
      let stateId = State.StateId;
      let icon = null;
      let rate = enemy.stateRate(stateId);
      if (rate <= 0 || enemy.isStateResist(stateId)) {
        icon = Unknown ? param.StateUnknownIconId : $dataStates[stateId].iconIndex;
        if (icon && icon > 0) icons.push(icon);
      }
    }
  });
  let dx = this.iconX(icons, width);
  y += this.lineHeight();
  icons.forEach(icon => {
	  this.drawIcon(icon, x, y);
	  x += dx;
	});
};

Window_EnemyBook.prototype.dropItems = function(list, enemy, x, y, width) {
  this.changeTextColor(ColorManager.textColor(list.NameColor));
  const nameText = list.paramName ? list.paramName : "ドロップアイテム";
  this.drawText(nameText, x, y);
  const lineHeight = this.lineHeight();
  let cols = 1;
  if (param.DropItemMultiCol) {
    if (list.WideMode === 2) {
      width = (width - this.colSpacing()) / 2;
      cols = 2;
    } else if (list.WideMode === 3 && param.ContentCols === 3) {
      width = (width - this.colSpacing() * 2) / 3;
      cols = 3;
    }
  }
  const dropList = this._enemy.dropItems;
  let x2 = x;
  let y2 = y;
  let dropIndex = 0;
  const listLength = dropList.length;
  for(i = 0; i < listLength; i++){
    if(dropList[i].kind > 0){
      if (param.DropItemMultiCol) {
        x2 = Math.floor(dropIndex % cols) * (width + this.itemPadding()) + x;
        y2 = Math.floor(dropIndex / cols) * lineHeight + y + lineHeight;
      } else {
        y2 += lineHeight;
      }
      let item = enemy.itemObject(dropList[i].kind, dropList[i].dataId);
      if((this.showDropItemMask(list.MaskMode, enemy) && this.dropItemFlag(i))) {
        let rate = dropList[i].denominator;
        let textWidth = this.textWidth("1/" + rate);
        this.drawItemName(item, x2, y2, width - textWidth - this.itemPadding());
        if (param.DropItemProbabilityShow && !item.meta.NoDropProbability) {
          this.drawEnemyBookNumber("1/" + rate, x2, y2, width);
        }
        dropIndex++;
      } else {
        this.resetTextColor();
        this.drawText(this.unknownDataLength(item.name), x2, y2, width,'left');
        dropIndex++;
      }
    }
  }
};

Window_EnemyBook.prototype.stealItems = function(list, enemy, x, y, width) {
  if (!Imported.NUUN_StealableItems) {
    return;
  }
  this.changeTextColor(ColorManager.textColor(list.NameColor));
  const nameText = list.paramName ? list.paramName : "盗めるアイテム";
  this.drawText(nameText, x, y);
  const lineHeight = this.lineHeight();
  let cols = 1;
  if (param.DropItemMultiCol) {
    if (list.WideMode === 2) {
      width = (width - this.colSpacing()) / 2;
      cols = 1;
    } else if (list.WideMode === 3) {
      width = (width - this.colSpacing() * 2) / 3;
      cols = 2;
    }
  }
  const stealList = enemy._stealItems;
  let x2 = x;
  let y2 = y;
  let stealIndex = 0;
  const listLength = stealList.length;
  for(let i = 0; listLength > i; i++){
    if (stealList[i].kind > 0 && stealList[i].kind < 4) {
      if (mode && param.DropItemMultiCol) {
        x2 = Math.floor(dropIndex % cols) * (width + this.itemPadding()) + x;
        y2 = Math.floor(dropIndex / cols) * lineHeight + y + lineHeight;
      } else {
        y2 += lineHeight;
      }
      let item = enemy.stealObject(stealList[i].kind, stealList[i].dataId);
      if((this.showStealItemMask(list.MaskMode, enemy) && this.stealItemFlag(i))) {
        let rate = stealList[i].denominator;
        let textWidth = this.textWidth(rate +"%");
        this.drawItemName(item, x2, y2, width - textWidth - this.itemPadding());
        if (param.StealItemProbabilityShow) {
          this.drawEnemyBookNumber(rate +"%", x2, y2, width);
        }
        stealIndex++;
      } else {
        this.resetTextColor();
        this.drawText(this.unknownDataLength(item.name), x2, y2, width,'left');
        stealIndex++;
      }
    }
  }
};

Window_EnemyBook.prototype.drawDesc = function(list, enemy, x, y, width) {
  const nameText = list.paramName
  if (nameText) {
    this.changeTextColor(ColorManager.textColor(list.NameColor));
    this.drawText(nameText, x, y);
    y += this.lineHeight();
  }
  this.resetTextColor();
  if(this.paramEXMask(list.MaskMode)){
    let text = list.DetaEval;
    if (!text) {
      const method = list.textMethod;
      if (method) {
        text = enemy.enemy().meta[method];
      }
    } else {
      text = eval(text);
    }
    if(text){
      this.drawTextEx(text, x, y, width);
    }
  }
};

Window_EnemyBook.prototype.originalParams = function(list, enemy, x, y, width) {
  this.changeTextColor(ColorManager.textColor(list.NameColor));
  const nameText = list.paramName;
  let textWidth = width;
  if (nameText) {
    textWidth = Math.min(this.textWidth(nameText), width - Math.floor(width / 3));
    this.drawText(nameText, x, y, textWidth);
  }
  this.resetTextColor();
  let text;
  if(this.paramEXMask(list.MaskMode)){
    text = eval(list.DetaEval);
  } else {
    text = param.UnknownStatus;
  }
  this.drawText(text, x + textWidth + 8, y, width - (textWidth + 8), 'right');
};

Window_EnemyBook.prototype.nameLength = function(name) {
	return name.length;
};

Window_EnemyBook.prototype.unknownDataLength = function(name) {
  if(param.UnknownData === '？' || param.UnknownData === '?') {
    const name_length = this.nameLength(name);
    return param.UnknownData.repeat(name_length);
  } else {
    return param.UnknownData;
  }
};

Window_EnemyBook.prototype.iconX = function(icons, width) {
	if (32 * icons.length > width) {
		return Math.floor(width / icons.length);
	}
	return 32;
};

Window_EnemyBook.prototype.drawEnemyBookNumber = function(text, x, y, width,) {
  this.resetTextColor();
  this.drawText(text , x, y, width,'right');
};

Window_EnemyBook.prototype.placeGauge = function(enemy, type, x, y, width) {
  const padding = this.itemPadding();
  const key = "enemyBook-gauge-%2".format(enemy.enemyId(), type);
  const sprite = this.createInnerSprite(key, Sprite_EnemyBookGauge);
  sprite.bitmap.width = width - padding;
  sprite.setup(enemy, type);
  sprite.move(x, y);
  sprite.show();
};

Window_EnemyBook.prototype.createInnerSprite = function(key, spriteClass) {
  const dict = this._additionalSprites;
  const sprite = new spriteClass();
  dict[key] = sprite;
  this.addInnerChild(sprite);
  return sprite;
};

Window_EnemyBook.prototype.removeInnerSprite = function(type) {
  const key = "enemyBook-gauge-%2".format(null, type);
  const dict = this._additionalSprites;
  if (dict[key]) {
    this._clientArea.removeChild(dict[key]);
    dict[key] = null;
  }
};

Window_EnemyBook.prototype.removeGauge = function() {
  this.removeInnerSprite('hp');
  this.removeInnerSprite('mp');
};


Window_EnemyBook.prototype.currencyUnit = function() {
  return TextManager.currencyUnit;
};


//Window_EnemyBookPageCategory
function Window_EnemyBookPageCategory() {
  this.initialize(...arguments);
}

Window_EnemyBookPageCategory.prototype = Object.create(Window_Selectable.prototype);
Window_EnemyBookPageCategory.prototype.constructor = Window_EnemyBookPageCategory;

Window_EnemyBookPageCategory.prototype.initialize = function(rect) {
  Window_Selectable.prototype.initialize.call(this, rect);
  this._list = [];
  this._categorySelect = 0;
  this.maxPageCols = 4;
  this.select(this._categorySelect);
};

Window_EnemyBookPageCategory.prototype.maxCols = function() {
  return this.maxPageCols;
};

Window_EnemyBookPageCategory.prototype.maxItems = function() {
  return this._list.length;
};

Window_EnemyBookPageCategory.prototype.setPageList = function(page, cols) {
  this._list = page;
  this.maxPageCols = cols;
};

Window_EnemyBookPageCategory.prototype.setPage = function() {
  this._categorySelect = 0;
  this.select(this._categorySelect);
  this.refresh();
};

Window_EnemyBookPageCategory.prototype.drawItem = function(index) {
  const rect = this.itemLineRect(index);
  const text = this._list[index].PageCategoryName ? this._list[index].PageCategoryName : "ページ"+ Number(index + 1);
  this.drawText(text, rect.x, rect.y, rect.width);
};

Window_EnemyBookPageCategory.prototype.itemClear = function() {
  if (this.contents) {
    this.contents.clear();
    this.contentsBack.clear();
  }
};

Window_EnemyBookPageCategory.prototype.select = function(index) {
  Window_Selectable.prototype.select.call(this, index);
  this.updateEnemyStatus();
};

Window_EnemyBookPageCategory.prototype.updateEnemyStatus = function() {
  if (this.index() >= 0) {
    this._categorySelect = this.index();
  }
  if (this._enemyWindow) {
    this._enemyWindow._pageMode = this._categorySelect;
    this._enemyWindow.refresh();
  }
};

Window_EnemyBookPageCategory.prototype.drawItemBackground = function(index) {
  if(!param.NoCursorBackground) {
    Window_Selectable.prototype.drawItemBackground.call(this, index);
  }
};

Window_EnemyBookPageCategory.prototype.setEnemyWindow = function(enemyWindow) {
  this._enemyWindow = enemyWindow;
};

Window_EnemyBookPageCategory.prototype.cursorDown = function(wrap) {
  
};

Window_EnemyBookPageCategory.prototype.cursorUp = function(wrap) {
  
};

Window_EnemyBookPageCategory.prototype.cursorPagedown = function() {
  
};

Window_EnemyBookPageCategory.prototype.cursorPageup = function() {
  
};

/////////////////////////////////////戦闘/////////////////////////////////////////
const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
  _Scene_Battle_createAllWindows.call(this);
  this.createEnemyBookWindow();
};

Scene_Battle.prototype.createEnemyBookWindow = function() {
  this.createEnemyBookBackGroundSprite();
  this.createEnemyBookPercentWindow();
  this.createEnemyPageWindow();
  //this.createEnemyBookDummyWindow();
  this.createEnemyBookIndexWindow();
  this.createEnemyBookEnemyWindow();
  this.createEnemyBookButton();
  if (param.CategoryOn && param.EnemyBookCategory) {
    this.createEnemyBookCategoryNameWindow();
    this.createEnemyBookCategoryWindow();
  }
};

Scene_Battle.prototype.createEnemyBookBackGroundSprite = function() {
  this._enemyBookBackGround = null;
  if (param.BackGroundImg || param.AnalyzeBackGroundImg) {
    const sprite = new Sprite();
    this._enemyBookBackGround = sprite;
    this.addChild(sprite);
    this.loadEnemyBookBackGround();
  }
};

Scene_Battle.prototype.createEnemyBookPercentWindow = function() {
  if (PercentContentLength) {
    const rect = this.percentEnemyBookWindowRect();
    this._enemyBookPercentWindow = new Window_EnemyBook_Percent(rect);
    this.createEnemyBookAddWindow(this._enemyBookPercentWindow, true);
    this._enemyBookPercentWindow.hide();
  }
};

Scene_Battle.prototype.createEnemyBookCategoryNameWindow = function() {
  const rect = this.enemyBookCategoryNameWindowRect();
  this._enemyBookCategoryNameWindow = new Window_EnemyBook_CategoryName(rect);
  this.createEnemyBookAddWindow(this._enemyBookCategoryNameWindow, false);
  this._enemyBookCategoryNameWindow.hide();
};

Scene_Battle.prototype.createEnemyBookCategoryWindow = function() {
  const rect = this.enemyBookIndexWindowRect();
  this._enemyBookCategoryWindow = new Window_EnemyBook_Category(rect);
  this._enemyBookCategoryWindow.setHandler("cancel",this.cancelEnemyBook.bind(this));
  this._enemyBookCategoryWindow.setHandler("ok", this.onEnemyBookCategoryOk.bind(this));
  this.createEnemyBookAddWindow(this._enemyBookCategoryWindow, true);
  this._enemyBookCategoryWindow.hide();
  this._enemyBookIndexWindow.setCategoryWindow(this._enemyBookCategoryWindow);
  this._enemyBookCategoryNameWindow.setCategoryWindow(this._enemyBookCategoryWindow);
};

Scene_Battle.prototype.createEnemyBookIndexWindow = function() {
  const rect = this.enemyBookIndexWindowRect();
  this._enemyBookIndexWindow = new Window_EnemyBook_Index(rect);
  this._enemyBookIndexWindow.setHandler("cancel", this.onEnemyBookIndexCancel.bind(this));
  this.createEnemyBookAddWindow(this._enemyBookIndexWindow, true);
  this._enemyBookIndexWindow.setPercentWindow(this._enemyBookPercentWindow);
  this._enemyBookIndexWindow.hide();
};

Scene_Battle.prototype.createEnemyPageWindow = function() {
  const rect = this.enemyBookPageWindowRect();
  this._enemyBookPageWindow = new Window_EnemyBookPageCategory(rect);
  this._enemyBookPageWindow.setHandler("cancel", this.onEnemyBookIndexCancel.bind(this));
  this.createEnemyBookAddWindow(this._enemyBookPageWindow, true);
  this._enemyBookPageWindow.hide();
  this._enemyBookPageWindow.setPageList(param.PageSetting, param.PageCols);
};
  
Scene_Battle.prototype.createEnemyBookEnemyWindow = function() {
  const rect = this.enemyBookWindowRect();
  this._enemyBookEnemyWindow = new Window_EnemyBook(rect);
  this.createEnemyBookAddWindow(this._enemyBookEnemyWindow, true);
  this._enemyBookIndexWindow.setEnemyWindow(this._enemyBookEnemyWindow);
  this._enemyBookPageWindow.setEnemyWindow(this._enemyBookEnemyWindow);
  this._enemyBookEnemyWindow.hide();
};

Scene_Battle.prototype.createEnemyBookAddWindow = function(windowDate, openness) {
  if (this._enemyBookBackGround) {
    this.addChild(windowDate);
    windowDate.x += (Graphics.width - Graphics.boxWidth) / 2;
    windowDate.y += (Graphics.height - Graphics.boxHeight) / 2;
    windowDate.opacity = 0;
  } else {
    this.addWindow(windowDate);
    if (openness) {
      windowDate.openness = 0;
    }
  }
};

Scene_Battle.prototype.percentEnemyBookWindowRect = function() {
  const wx = param.WindowMode === 0 ? 0 : this.enemyBookWindowWidth();
  const wy = this.enemyBookMainAreaTop();
  const ww = Graphics.boxWidth / 3;
  const wh = PercentContentLength ? this.calcWindowHeight(1, true) : 0;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.enemyBookPageWindowRect = function() {
  const wx = param.WindowMode === 0 ? Graphics.boxWidth / 3 : 0;
  const wy = this.enemyBookMainAreaTop();
  const ww = this.enemyBookWindowWidth();
  const wh = this.calcWindowHeight(1, true);
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.enemyBookIndexWindowRect = function() {
  const height = this.percentEnemyBookWindowRect().height;
  const wx = param.WindowMode === 0 ? 0 : this.enemyBookWindowWidth();
  const wy = this.enemyBookMainAreaTop() + height;
  const ww = Graphics.boxWidth / 3;
  const wh = this.enemyBookMainAreaHeight() - height;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.enemyBookWindowRect = function() {
  const wx = param.WindowMode === 0 ? Graphics.boxWidth / 3 : 0;
  const wy = this.enemyBookMainAreaTop();
  const ww = this.enemyBookWindowWidth();
  const wh = this.enemyBookMainAreaHeight();
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.enemyBookCategoryNameWindowRect = function() {
  const wx = param.WindowMode === 0 ? 0 : this.enemyBookWindowWidth();
  const wy = this.enemyBookMainAreaTop() + this.percentEnemyBookWindowRect().height;
  const ww = Graphics.boxWidth / 3;
  const wh = this.calcWindowHeight(1, true);
  this._enemyBookIndexWindow.y += wh;
  this._enemyBookIndexWindow.height -= wh;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.enemyBookWindowWidth = function() {
  return Graphics.boxWidth - Graphics.boxWidth / 3;
};

const _Scene_Battle_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow;
Scene_Battle.prototype.createPartyCommandWindow = function() {
  _Scene_Battle_createPartyCommandWindow.call(this);
  this._partyCommandWindow.setHandler("enemyBook", this.commandEnemyBook.bind(this));
};

const _Scene_Battle_hideSubInputWindows = Scene_Battle.prototype.hideSubInputWindows;
Scene_Battle.prototype.hideSubInputWindows = function() {
  _Scene_Battle_hideSubInputWindows.call(this);
  if (this._enemyBookIndexWindow.active || this._enemyBookPageWindow.active) {
  }
};

const _Scene_Battle_updateVisibility = Scene_Battle.prototype.updateVisibility;
Scene_Battle.prototype.updateVisibility = function() {
  _Scene_Battle_updateVisibility.call(this);
  if (BattleManager.isBattleEnd() && (this._enemyBookIndexWindow.active || this._enemyBookPageWindow.active)) {
    this.cancelEnemyBook();
  }
};

Scene_Battle.prototype.commandEnemyBook = function() {
  if (param.CategoryOn && param.EnemyBookCategory) {
    this.enemyBookCategorySelection();
  } else {
    this.enemyBookIndexSelection();
  }
  this._enemyBookEnemyWindow._bookMode = 0;
  this.setButtonY();
  this.setEnemyBookBackGround();
  this.setMaxPage(param.PageSetting);
  this._enemyBookPageWindow.setPageList(param.PageSetting, param.PageCols);
  this._enemyBookPageWindow.setPage();
  this._enemyBookEnemyWindow.x = (param.WindowMode === 0 ? Graphics.boxWidth / 3 : 0) + (this._enemyBookBackGround ? (Graphics.width - Graphics.boxWidth) / 2 : 0);
  const pageLength = this._enemyBookPageWindow._list.length;
  const rect = this.enemyBookWindowRect();
  this._enemyBookPageWindow.x = this._enemyBookEnemyWindow.x;
  this._enemyBookEnemyWindow.y = rect.y + (pageLength > 1 ? this._enemyBookPageWindow.height : 0) + (this._enemyBookBackGround ? (Graphics.height - Graphics.boxHeight) / 2 : 0);
  this._enemyBookEnemyWindow.height = rect.height - (pageLength > 1 ? this._enemyBookPageWindow.height : 0);
  if (PercentContentLength) {
    this._enemyBookPercentWindow.show();
    this._enemyBookPercentWindow.open();
  }
  if (pageLength > 1) {
    this._enemyBookPageWindow.show();
    this._enemyBookPageWindow.open();
  }
  this._enemyBookEnemyWindow.show();
  this._enemyBookEnemyWindow.open();
  this._enemyBookEnemyWindow.refresh();
};

Scene_Battle.prototype.cancelEnemyBook = function() {
  this._enemyBookIndexWindow.close();
  this._enemyBookEnemyWindow.close();
  this._enemyBookPageWindow.close();
  if (PercentContentLength) {
    this._enemyBookPercentWindow.close();
  }
  if (param.CategoryOn && param.EnemyBookCategory) {
    this._enemyBookCategoryWindow.close();
  }
  if (this._enemyBookBackGround) {
    this._enemyBookBackGround.hide();
  }
  this._enemyBookEnemyWindow._enemySprite.hide();
  if (this._enemyBookEnemyWindow._bookMode === 0) {
    this._partyCommandWindow.activate();
    this._enemyBookIndexWindow.deactivate();
    this._enemyBookEnemyWindow.selectEnemy = null;
  } else {
    this._enemyBookEnemyWindow.setEnemy(null);
    this._enemyBookPageWindow.deactivate();
    this._enemyBookEnemyWindow.setAnalyzeStatus(null);
  }
  openAnalyze = false;
};

Scene_Battle.prototype.enemyBookEnemyAnalyze = function(args) {
  openAnalyze = true;
  //this.userWindowDeactivate();
  this._enemyBookEnemyWindow._enemy = null;
  this._enemyBookEnemyWindow.setAnalyzeStatus(args);
  this._enemyBookEnemyWindow._bookMode = 1;
  this.setButtonY();
  this.setEnemyBookBackGround();
  this.setAnalyzeDate(args);  
  this._enemyBookEnemyWindow.x = ((Graphics.boxWidth - this._enemyBookEnemyWindow.width) / 2) + (this._enemyBookBackGround ? (Graphics.width - Graphics.boxWidth) / 2 : 0);
  const pageLength = this._enemyBookPageWindow._list.length;
  const rect = this.enemyBookWindowRect();
  this._enemyBookPageWindow.x = this._enemyBookEnemyWindow.x;
  this._enemyBookEnemyWindow.y = rect.y + (pageLength > 1 ? this._enemyBookPageWindow.height : 0) + (this._enemyBookBackGround ? (Graphics.height - Graphics.boxHeight) / 2 : 0);
  this._enemyBookEnemyWindow.height = rect.height - (pageLength > 1 ? this._enemyBookPageWindow.height : 0);
  this._enemyBookPageWindow.activate();
  this._enemyBookPageWindow.show();
  this._enemyBookPageWindow.open();
  this._enemyBookEnemyWindow.show();
  this._enemyBookEnemyWindow.open();
  this._enemyBookEnemyWindow.selectEnemy = BattleManager.analyzeTarget;
  const enemy = BattleManager.analyzeTarget.enemy();
  if (!$gameSystem.isInEnemyBook(enemy) && ($gameSystem.registrationTiming() === 2 || $gameSystem.registrationTiming() === 3)) {
    $gameSystem.addToEnemyBook(enemy.id);
  }
  if (!$gameSystem.isInEnemyBookStatus(enemy) && ($gameSystem.registrationStatusTiming() === 2 || $gameSystem.registrationStatusTiming() === 3)) {
    $gameSystem.addStatusToEnemyBook(enemy.id);
  }
  this._enemyBookPageWindow.refresh();
  this._enemyBookEnemyWindow.setEnemy(enemy);
};

Scene_Battle.prototype.setAnalyzeDate = function(args) {
  let list = null;
  if (args.Mode === 0) {
    list = param.PageSetting;
  } else if (args.Mode === 1) {
    list = param.AnalyzePageList1;
  } else if (args.Mode === 2) {
    list = param.AnalyzePageList2;
  }
  this.setMaxPage(list);
  this._enemyBookPageWindow.setPageList(list, args.PageCols);
  this._enemyBookPageWindow.setPage();
};

Scene_Battle.prototype.createEnemyBookButton = function() {
  if(ConfigManager.touchUI) {
    this._EnemyBook_cancelButton = new Sprite_Button("cancel");
    this._EnemyBook_cancelButton.x = Graphics.boxWidth - this._EnemyBook_cancelButton.width - 4;
    this._EnemyBook_cancelButton.y = 0;
    if (this._enemyBookBackGround) {
      this.addChild(this._EnemyBook_cancelButton);
      this._EnemyBook_cancelButton.x += (Graphics.width - Graphics.boxWidth) / 2;
    } else {
      this.addWindow(this._EnemyBook_cancelButton);
    }
    this.updatePageupdownButton();
  }
};

Scene_Battle.prototype.setButtonY = function() {
  if (this._EnemyBook_cancelButton) {
    this._EnemyBook_cancelButton.y = this.buttonY() + (this._enemyBookBackGround ? (Graphics.height - Graphics.boxHeight) / 2 : 0);
  }
};

Scene_Battle.prototype.loadEnemyBookBackGround = function() {
  if (this._enemyBookBackGround) {
    this._enemyBookBackBitmap = ImageManager.nuun_LoadPictures(param.BackGroundImg);
    this._analyzeBackBitmap = ImageManager.nuun_LoadPictures(param.AnalyzeBackGroundImg);
    this._enemyBookBackGround.hide();
  }
};

Scene_Battle.prototype.setEnemyBookBackGround = function() {
  if (!this._enemyBookBackGround) {
    return;
  }
  let bitmap = null;
  if (this._enemyBookEnemyWindow._bookMode === 0) {
    bitmap = this._enemyBookBackBitmap;
  } else if (this._enemyBookEnemyWindow._bookMode === 1) {
    bitmap = this._analyzeBackBitmap;
  }
  this._enemyBookBackGround.bitmap = bitmap;
  this._enemyBookBackGround.show();
  if (bitmap && !bitmap.isReady()) {
    bitmap.addLoadListener(this.setBackGround.bind(this));
  } else {
    this.setBackGround();
  }
};

Scene_Battle.prototype.setBackGround = function() {
  const sprite = this._enemyBookBackGround;
  if (param.BackUiWidth) {
    sprite.x = (Graphics.width - (Graphics.boxWidth + 8)) / 2;
    sprite.y = (Graphics.height - (Graphics.boxHeight + 8)) / 2;
    sprite.scale.x = (Graphics.boxWidth + 8 !== sprite.bitmap.width ? (Graphics.boxWidth + 8) / sprite.bitmap.width : 1);
    sprite.scale.y = (Graphics.boxHeight + 8!== sprite.bitmap.height ? (Graphics.boxHeight + 8) / sprite.bitmap.height : 1);
  } else {
    sprite.scale.x = (Graphics.width !== sprite.bitmap.width ? Graphics.width / sprite.bitmap.width : 1);
    sprite.scale.y = (Graphics.height !== sprite.bitmap.height ? Graphics.height / sprite.bitmap.height : 1);
  }
};

Scene_Battle.prototype.updatePageupdownButton = function() {
  if (this._EnemyBook_cancelButton) {
    this._EnemyBook_cancelButton.visible = this._enemyBookIndexWindow.active || this._enemyBookPageWindow.active || 
    (this._enemyBookCategoryWindow && this._enemyBookCategoryWindow.active) ? true : false;
  }
};

const _Scene_Battle_updateCancelButton = Scene_Battle.prototype.updateCancelButton;
Scene_Battle.prototype.updateCancelButton = function() {
  if (this._cancelButton) {
    _Scene_Battle_updateCancelButton.call(this);
    this._cancelButton.visible = this._cancelButton.visible && !this._EnemyBook_cancelButton.visible;
  }
};

Scene_Battle.prototype.setMaxPage = function(page) {
  this._enemyBookMaxPage = page.length;
  this._enemyBookEnemyWindow.displayList = page;
};

Scene_Battle.prototype.getMaxPage = function() {
  return this._enemyBookMaxPage;
};

const _Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
  _Scene_Battle_update.call(this);
  this.updatePageupdownButton();
};

const _Scene_Battle_buttonY = Scene_Battle.prototype.buttonY;
Scene_Battle.prototype.buttonY = function() {
  const y = _Scene_Battle_buttonY.call(this);
  if ((this._enemyBookIndexWindow && this._enemyBookIndexWindow.active) || (this._enemyBookCategoryWindow && this._enemyBookCategoryWindow.active)) {
    return y - this._helpWindow.height;
  }
  return y;
};

const _Scene_Battle_isAnyInputWindowActive  = Scene_Battle.prototype.isAnyInputWindowActive;
Scene_Battle.prototype.isAnyInputWindowActive = function() {
  return this._enemyBookIndexWindow.active || this._enemyBookPageWindow.active || (this._enemyBookCategoryWindow && this._enemyBookCategoryWindow.active) || _Scene_Battle_isAnyInputWindowActive.call(this);
};

const _Scene_Battle_isTimeActive = Scene_Battle.prototype.isTimeActive;
Scene_Battle.prototype.isTimeActive = function() {
  const result = !this._enemyBookIndexWindow.active && !this._enemyBookPageWindow.active &&  _Scene_Battle_isTimeActive.call(this);
  if (param.CategoryOn && param.EnemyBookCategory) {
    return result && (this._enemyBookCategoryWindow && !this._enemyBookCategoryWindow.active);
  }
  return result;
};

Scene_Battle.prototype.enemyBookMainAreaTop = function() {
  const y = 0;
  if (param.NoTouchUIWindow && !ConfigManager.touchUI) {
    return y;
  }
  return y + this.buttonAreaHeight();
};

Scene_Battle.prototype.enemyBookMainAreaHeight = function() {
  return Graphics.boxHeight - this.enemyBookMainAreaTop();
};

Scene_Battle.prototype.userWindowDeactivate = function() {//暫定競合対策
  if (typeof this.hideFormationWindows == 'function') {
    this.hideFormationWindows();//DarkPlasma_FormationInBattle
  }
};

Scene_Battle.prototype.onEnemyBookIndexCancel = function() {
  if (this._enemyBookEnemyWindow._bookMode === 0) {
    if (param.CategoryOn && param.EnemyBookCategory) {
      this._enemyBookIndexWindow.updateIndex();
      this.enemyBookCategorySelection();
    } else {
      this.cancelEnemyBook();
    }
  } else {
    this.cancelEnemyBook();
  }
  
};

Scene_Battle.prototype.onEnemyBookCategoryOk = function() {
  this._enemyBookIndexWindow.setCategory();
  this.enemyBookIndexSelection();
};

Scene_Battle.prototype.enemyBookIndexSelection = function() {
  this._enemyBookIndexWindow.show();
  if (param.CategoryOn && param.EnemyBookCategory) {
    this._enemyBookCategoryWindow.hide();
    this._enemyBookCategoryNameWindow.show();
    this._enemyBookCategoryWindow.deselect();
    this._enemyBookCategoryWindow.deactivate();
    this._enemyBookCategoryNameWindow.setName(this._enemyBookCategoryWindow.index());
    this._enemyBookIndexWindow.openness = 255;
  }
  this._enemyBookIndexWindow.refresh();
  this._enemyBookIndexWindow.open();
  this._enemyBookIndexWindow.activate();
  this._enemyBookPageWindow.setPage();
  this._enemyBookPageWindow.activate();
};

Scene_Battle.prototype.enemyBookCategorySelection = function() {
  this._enemyBookCategoryWindow.setSelect();
  this._enemyBookCategoryWindow.show();
  this._enemyBookCategoryWindow.open();
  this._enemyBookCategoryNameWindow.hide();
  this._enemyBookIndexWindow.hide();
  this._enemyBookCategoryWindow.activate();
  this._enemyBookIndexWindow.deselect();
  this._enemyBookIndexWindow.deactivate();
  this._enemyBookPageWindow.deselect();
  this._enemyBookPageWindow.deactivate();
  this._enemyBookPageWindow.itemClear();
};

const _Window_Selectable_initialize = Window_Selectable.prototype.initialize;
Window_Selectable.prototype.initialize = function(rect) {
  _Window_Selectable_initialize.call(this, rect);
  this.interruptWindow = false;
};

const _Window_Selectable_isOpenAndActive = Window_Selectable.prototype.isOpenAndActive;
Window_Selectable.prototype.isOpenAndActive = function() {
  if (openAnalyze && $gameParty.inBattle()) {
    return this.constructor === Window_EnemyBookPageCategory && this.active ? _Window_Selectable_isOpenAndActive.call(this) : false;
 }
  return _Window_Selectable_isOpenAndActive.call(this);
};

const _Window_PartyCommand_makeCommandList = Window_PartyCommand.prototype.makeCommandList;
Window_PartyCommand.prototype.makeCommandList = function() {
  _Window_PartyCommand_makeCommandList.call(this);
  if (param.ShowBattleCommand && ($gameSwitches.value(param.enemyBookBattleSwitch) || param.enemyBookBattleSwitch === 0)) {
    this.addCommand(param.CommandName, "enemyBook");
  }
};

const _BattleManager_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function() {
  _BattleManager_initMembers.call(this);
  this.analyzeMissMessage = null;
  BattleManager.analyzeTarget = null;
};

const _BattleManager_isBusy = BattleManager.isBusy;
BattleManager.isBusy = function() {
  return this.enemyBookIsBusy() || _BattleManager_isBusy.call(this);
};

BattleManager.enemyBookIsBusy = function() {
  return openAnalyze;
};

function Sprite_EnemyBookGauge() {
  this.initialize(...arguments);
}

Sprite_EnemyBookGauge.prototype = Object.create(Sprite_Gauge.prototype);
Sprite_EnemyBookGauge.prototype.constructor = Sprite_EnemyBookGauge;

Sprite_EnemyBookGauge.prototype.bitmapWidth = function() {
  if (this._statusType === 'hp') {
    return param.HPgaugeWidth > 0 ? param.HPgaugeWidth : 128;
  } else if (this._statusType === 'mp') {
    return param.MPgaugeWidth > 0 ? param.MPgaugeWidth : 128;
  }
  return 999;
};

const _Window_BattleLog_displayMiss =Window_BattleLog.prototype.displayMiss;
Window_BattleLog.prototype.displayMiss = function(target) {
  let fmt;
  if (BattleManager.analyzeMissMessage) {
    fmt = BattleManager.analyzeMissMessage;
    BattleManager.analyzeMissMessage = null;
    this.push("addText", fmt);
  } else {
    _Window_BattleLog_displayMiss.call(this, target);
  }
};


function Sprite_BookEnemy() {
  this.initialize(...arguments);
}

Sprite_BookEnemy.prototype = Object.create(Sprite.prototype);
Sprite_BookEnemy.prototype.constructor = Sprite_BookEnemy;

Sprite_BookEnemy.prototype.initialize = function() {
  Sprite.prototype.initialize.call(this);
  this.initMembers();
};

Sprite_BookEnemy.prototype.initMembers = function() {
  this.anchor.x = 0.5;
  this.anchor.y = 0.5;
  this._battler = null;
  this._svEnemy = false;
  this.maxWidth = 0;
  this.hide();
};

Sprite_BookEnemy.prototype.setup = function(battler,x, y) {
  this._battler = battler;
  this.x = x;
  this.y = y;
  this._svEnemy = battler.enemy().meta.EB_SVBattler ? true : false;
  this.refresh();
};

Sprite_BookEnemy.prototype.refresh = function() {
  let bitmap = null;
  if (this._svEnemy) {
    const sv_name = this.enemySVBattlerName();
    bitmap = ImageManager.loadSvActor(sv_name);
  } else {
    const name = this.enemyBattlerName();
    if ($gameSystem.isSideView()) {
      bitmap = ImageManager.loadSvEnemy(name);
    } else {
      bitmap = ImageManager.loadEnemy(name);
    }
  }
  this.bitmap = bitmap;
  this.show();
  if (bitmap && !bitmap.isReady()) {
    bitmap.addLoadListener(this.drawEnemy.bind(this));
  } else {
    this.drawEnemy();
  }
};

Sprite_BookEnemy.prototype.drawEnemy = function() {
  if (!this.bitmap) {
    return;
  }
  if (this._svEnemy) {
    this._pattern = 0;
    this._motionCount = 0;
    this.scale.x = param.SVEnemyMirror ? -1 : 1;
    this.scale.y = 1;
    this.setSvActor();
  } else {
    const hue = this._battler.battlerHue();
    Sprite_Battler.prototype.setHue.call(this, hue);
    const bitmapWidth = this.bitmap.width;
    const bitmapHeight = this.bitmap.height;
    const contentsWidth = this.maxWidth;
    const contentsHeight = this.maxHeight;
    let scale = 1.0;
    if (bitmapHeight > contentsHeight) {
      scale = Math.min((contentsHeight / bitmapHeight), 1.0);
    }
    if (bitmapWidth > contentsWidth) {
      scale = Math.min((contentsWidth / bitmapWidth), scale);
    }
    this.scale.x = scale;
    this.scale.y = scale;
    this.setFrame(0, 0, this.bitmap.width, this.bitmap.height);
  }
};

Sprite_BookEnemy.prototype.update = function() {
  if (this.bitmap && this._svEnemy) {
    if (++this._motionCount >= this.motionSpeed()) {
      this._pattern = (this._pattern + 1) % 4;
      this.setSvActor();
      this._motionCount = 0;
    }
  } else if (!this.bitmap && this._svEnemy) {
    this._svEnemy = false;
  }
};

Sprite_BookEnemy.prototype.setSvActor = function() {
  const motionIndex = this._battler.enemy().meta.EB_SVBattlerMotion ? Number(this._battler.enemy().meta.EB_SVBattlerMotion) : 0;
  const pattern = this._pattern < 3 ? this._pattern : 1;
  const cw = this.bitmap.width / 9;
  const ch = this.bitmap.height / 6;
  const cx = Math.floor(motionIndex / 6) * 3 + pattern;
  const cy = motionIndex % 6;
  this.setFrame(cx * cw, cy * ch, cw, ch);
};

Sprite_BookEnemy.prototype.motionSpeed = function() {
  return 12;
};

Sprite_BookEnemy.prototype.enemyBattlerName = function() {
	return this._battler.battlerName();
};

Sprite_BookEnemy.prototype.enemySVBattlerName = function() {
	return this._battler.enemy().meta.EB_SVBattler;
};

Sprite_BookEnemy.prototype.resetSVEnemy = function() {
  this._svEnemy = false;
};

Sprite_BookEnemy.prototype.setMaxWidth = function(width) {
  this.maxWidth = width;
};

Sprite_BookEnemy.prototype.setMaxHeight = function(height) {
  this.maxHeight = height;
};
})();