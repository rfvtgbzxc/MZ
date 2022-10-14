/*:-----------------------------------------------------------------------------------
 * NUUN_SaveScreen.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */ 
/*:
 * @target MZ
 * @plugindesc セーブ画面拡張
 * @author NUUN
 * @version 2.0.0
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * セーブ画面にいくつかの項目を追加します。
 * このプラグインでは通常のキャラチップ、プレイ時間の他顔グラ、サイドビューアクター、セーブ時の現在値、セーブ日時、所持金、
 * レベル、独自のパラメータ、スナップショット等が表示可能です。
 * 
 * 設定
 * セーブ画面に表示する項目を設定するにはプラグインパラメータの表示項目から設定します。
 * 
 * X表示列位置
 * 表示する列番号を指定します。最大列は2です。
 * 
 * Y表示行位置
 * 表示する行番号を指定します。
 * 
 * X座標（相対）
 * X表示列位置からのX方向の座標を指定します。
 * 
 * Y座標（相対）
 * Y表示列位置からのY方向の座標を指定します。
 * 
 * 項目横幅
 * 表示項目全体の横幅を指定します。サイドビューアクター、レベル、アクター名、クラス名、二つ名は１キャラ毎の横幅を指定します。
 * 
 * システム項目横幅
 * システム文字の横幅を指定します。
 * 
 * システム項目文字色
 * システム文字の文字色をシステムカラーまたはカラーコードで記入します。
 * 
 * フォントサイズ
 * フォントサイズをメインフォントからの差で変更します。
 * 
 * 名称
 * 項目の名称を設定します。
 * 
 * 評価式
 * 評価式を記入します。
 * 
 * 文字揃え
 * 文字揃えを指定します。TextExはタイトル、章、行動目標でのみ指定できます。
 * 
 * 
 * drawTextEx表示はプラグインパラメータのフォントサイズが適用されません。
 * テキストに\FS[x]で設定してください。
 * 
 * 背景画像の変更
 * ゲームの進行によって背景画像を変更出来ます。
 * 初期設定ではプラグインコマンド「背景画像変更」で変更したたびに背景IDが変更されます。
 * 背景IDはロード画面でIDの一番高いセーブデータの背景が表示されます。
 * 
 * オリジナルパラメータ
 * 
 * 
 * オートセーブ時のスナップショット
 * オートセーブ時のスナップショットは戦闘開始直前のマップ、移動直前のマップが撮影されます。
 * 
 * スナップショットを表示するとセーブ容量が大きります。
 * アツマールで公開する場合は最大セーブ数を減らすこと推奨いたします。
 * 
 * 
 * Ver.1.3.0からNUUN_Base Ver.1.1.3以降が必要となります。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/9/24 Ver.2.0.0
 * 全ての項目の配置の自由化。
 * 一部不具合修正。
 * 2022/7/4 Ver.1.9.0
 * チャプターテキスト、メニュー画面行動目標表示プラグインでのテキスト表示の処理追加。
 * コンテンツ背景をゲーム途中で変更できる機能を追加。
 * オリジナルパラメータの一部のテキストのフォントが適用されない問題を修正。
 * 2022/5/28 Ver.1.8.5
 * ファイル名に座標時を指定できる機能を追加。
 * ファイル名横文字列に座標、表示横幅、文字揃えを指定できる機能を追加。
 * 2022/5/14 Ver.1.8.4
 * コンテンツ背景画像非表示をOFFに設定しても背景画像が適用しない問題を修正。
 * コンテンツ背景画像非表示をコンテンツ背景画像表示に仕様変更。
 * 2022/5/11 Ver.1.8.3
 * 戦闘終了時にオートセーブがされない問題を修正。
 * マップ移動時、戦闘終了時に、オートセーブでのマップショットが黒い画像になる問題を修正。
 * 2022/1/5 Ver.1.8.2
 * 名称が取得できない問題を修正。
 * オリジナルパラメータの設定方法を変更。
 * 2021/12/30 Ver.1.8.1
 * コンテンツ背景を独自の画像を設定できる機能を追加。
 * 2021/12/12 Ver.1.8.0
 * コンテンツの表示設定を変更。
 * プラグインコマンドが適用されていなかった問題を修正。
 * ファイル名横の表示する文字の設定方法を変更。
 * 2021/7/16 Ver.1.7.0
 * セーブ日時を表示する機能を追加。
 * 2021/5/29 Ver.1.6.0
 * サイドビューアクターを表示する機能を追加。
 * 2021/5/27 Ver.1.5.2
 * スクリーンショットの処理を修正。
 * 一部プラグインコマンドを削除。
 * 2021/5/15 Ver.1.5.1
 * スクリーンショットの処理方法を変更。
 * 2021/5/14 Ver.1.5.0
 * セーブスクリーンショットを表示する機能を追加。
 * 2021/5/11 Ver.1.4.1
 * 前バージョンから引き継いだセーブデータがあるセーブ画面を開くとエラーが出る問題を修正。
 * 2021/5/11 Ver.1.4.0
 * ゲームの進行度に応じて背景画像を変更できる機能を追加。
 * 2021/5/8 Ver.1.3.0
 * 任意の背景画像を表示できる機能を追加。
 * アクター画像の表示の設定方法を変更。
 * レベルのYを調整できるように変更。
 * キャラチップ表示時のアクターY座標を相対座標に変更。
 * 表示できるセーブ数、セーブできる最大数を指定できる機能を追加。
 * 選択画面のコンテンツ背後に表示される黒い背景画像（デフォルトの場合）を非表示にする機能を追加。
 * 2021/1/30 Ver.1.2.1
 * コンテンツエリアX座標の設定方法を変更
 * 2021/1/29 Ver.1.2.0
 * 顔グラの横幅、縦幅、拡大率を指定できるように変更。
 * セーブインフォがないファイルでファイル名が表示されない問題を修正。
 * 2021/1/26 Ver.1.1.1
 * 顔グラを表示時、ファイルタイトルが隠れて表示されてしまう問題を修正。
 * 2021/1/26 Ver.1.1.0
 * 顔グラを表示できる機能を追加。
 * 2021/1/24 Ver.1.0.0
 * 初版
 * 
 * @command ChangeBackground
 * @desc 背景画像を変更します。
 * @text 背景画像変更
 * 
 * @arg BackGroundImg
 * @desc 背景画像ファイル名を指定します。
 * @text 背景画像
 * @type file
 * @dir img/
 * @default 
 * 
 * @arg BackGroundId
 * @desc 背景画像IDを設定します。IDの高いセーブデータの背景がロード画面で表示されます。背景画像ID自動設定がOFFの時有効です。
 * @text 背景画像ID
 * @type number
 * @default 0
 * @min 0
 * 
 * 
 * @command ChangeContentsBackground
 * @desc コンテンツ背景画像を変更します。
 * @text コンテンツ背景画像変更
 * 
 * @arg BackGroundImg
 * @desc 背景画像ファイル名を指定します。
 * @text 背景画像
 * @type file
 * @dir img/
 * @default 
 * 
 * 
 * @command UserAutoSave
 * @desc オートセーブ時のスナップショットを許可します。OFFで無効にします。
 * @text オートセーブ時SS許可
 * 
 * @arg OnSaveSnap
 * @text スクリーンショット許可
 * @desc オートセーブ時のスクリーンショットを許可します。
 * @type boolean
 * @default true
 * 
 * @command SnapShot
 * @desc 次回セーブ時のスナップショットを撮影します。
 * @text スナップショット撮影
 * 
 * @command SetAnyName
 * @desc 章の名称を記入します。
 * @text 章
 * 
 * @arg AnyName
 * @text 表示文字列
 * @desc 表示文字列を記入します。現在のキャプターを表示したい時に設定します。
 * @type string
 * @default 
 * 
 * @command SpecifyActor
 * @desc 指定のアクターのみ表示させるアクターを設定します。
 * @text 指定のアクター変更
 * 
 * @arg ActorId
 * @text アクター
 * @desc アクターを指定します。0の場合はリーダーが表示されます。
 * @type actor
 * @default 0
 * 
 * 
 * @param BasicSetting
 * @text 基本設定
 * @default ------------------------------
 * 
 * @param PartyActorMode
 * @desc 表示するアクター
 * @text 表示アクター
 * @type select
 * @option バトルメンバー
 * @value 1
 * @option パーティメンバー(控え含む)
 * @value 2
 * @default 1
 * @parent BasicSetting
 * 
 * @param SaveFileWindow
 * @text セーブファイルウィンドウ設定
 * @default ------------------------------
 * 
 * @param ContentsList
 * @desc 表示する項目。
 * @text 表示項目
 * @type struct<ContentsListData>[]
 * @default ["{\"DateSelect\":\"50\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"SystemNameColor\":\"16\",\"FontSize\":\"-6\",\"ParamName\":\"\",\"DetaEval\":\"\",\"Align\":\"\\\"left\\\"\"}","{\"DateSelect\":\"23\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"60\",\"ItemWidth\":\"48\",\"SystemItemWidth\":\"0\",\"SystemNameColor\":\"16\",\"FontSize\":\"-12\",\"ParamName\":\"\",\"DetaEval\":\"\",\"Align\":\"\\\"right\\\"\"}","{\"DateSelect\":\"10\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"2\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"SystemNameColor\":\"16\",\"FontSize\":\"-4\",\"ParamName\":\"\",\"DetaEval\":\"\",\"Align\":\"\\\"left\\\"\"}","{\"DateSelect\":\"12\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"230\",\"Y_Coordinate\":\"2\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"SystemNameColor\":\"16\",\"FontSize\":\"-6\",\"ParamName\":\"\",\"DetaEval\":\"\",\"Align\":\"\\\"TextEx\\\"\"}","{\"DateSelect\":\"3\",\"X_Position\":\"1\",\"Y_Position\":\"2\",\"X_Coordinate\":\"230\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"520\",\"SystemItemWidth\":\"0\",\"SystemNameColor\":\"16\",\"FontSize\":\"-6\",\"ParamName\":\"現在地\",\"DetaEval\":\"\",\"Align\":\"\\\"left\\\"\"}","{\"DateSelect\":\"1\",\"X_Position\":\"1\",\"Y_Position\":\"3\",\"X_Coordinate\":\"230\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"260\",\"SystemItemWidth\":\"0\",\"SystemNameColor\":\"16\",\"FontSize\":\"-6\",\"ParamName\":\"プレイ時間\",\"DetaEval\":\"\",\"Align\":\"\\\"left\\\"\"}","{\"DateSelect\":\"4\",\"X_Position\":\"1\",\"Y_Position\":\"3\",\"X_Coordinate\":\"500\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"SystemNameColor\":\"16\",\"FontSize\":\"-6\",\"ParamName\":\"所持金\",\"DetaEval\":\"\",\"Align\":\"\\\"left\\\"\"}"]
 * @parent SaveFileWindow
 * 
 * @param NumSaveRows
 * @desc 画面に表示するセーブ数
 * @text 表示セーブ数
 * @type number
 * @default 5
 * @parent SaveFileWindow
 * 
 * @param MaxSave
 * @desc 最大セーブ数
 * @text 最大セーブ数
 * @type number
 * @default 20
 * @parent SaveFileWindow
 * 
 * @param Contents
 * @text 各コンテンツ設定
 * @default ------------------------------
 * 
 * @param DayTime
 * @desc 表示する日時フォーマット
 * @text 日時フォーマット
 * @type select
 * @option 標準（年/月/日 時：分：秒）
 * @value 
 * @option 英表記（日/月/年 時：分：秒）
 * @value 'en-GB'
 * @option 元号表記（日表記）
 * @value 'ja-JP-u-ca-japanese'
 * @default 
 * @parent Contents
 * 
 * @param CharacterSpecifyActorOnry
 * @desc キャラクターを指定アクターのみ表示します。指定アクターが0の場合はリーダーのみ表示されます。
 * @text キャラクター指定アクター表示
 * @type boolean
 * @default false
 * @parent Contents
 * 
 * @param FaceSpecifyActorOnry
 * @desc 顔グラを指定アクターのみ表示します。指定アクターが0の場合はリーダーのみ表示されます。
 * @text 顔グラ指定アクター表示
 * @type boolean
 * @default false
 * @parent Contents
 * 
 * @param SvSpecifyActorOnry
 * @desc サイドビューアクターを指定アクターのみ表示します。指定アクターが0の場合はリーダーのみ表示されます。
 * @text SVアクター指定アクター表示
 * @type boolean
 * @default false
 * @parent Contents
 * 
 * @param NameSpecifyActorOnry
 * @desc アクター名を指定アクターのみ表示します。指定アクターが0の場合はリーダーのみ表示されます。
 * @text アクター名指定アクター表示
 * @type boolean
 * @default false
 * @parent Contents
 * 
 * @param ClassSpecifyActorOnry
 * @desc クラス名を指定アクターのみ表示します。指定アクターが0の場合はリーダーのみ表示されます。
 * @text クラス名指定アクター表示
 * @type boolean
 * @default false
 * @parent Contents
 * 
 * @param NickNameSpecifyActorOnry
 * @desc 二つ名(ニックネーム)を指定アクターのみ表示します。指定アクターが0の場合はリーダーのみ表示されます。
 * @text 二つ名指定アクター表示
 * @type boolean
 * @default false
 * @parent Contents
 * 
 * @param LevelSpecifyActorOnry
 * @desc レベルを指定アクターのみ表示します。指定アクターが0の場合はリーダーのみ表示されます。
 * @text レベル指定アクター表示
 * @type boolean
 * @default false
 * @parent Contents
 * 
 * @param SaveSnapSetting
 * @text セーブスナップショット設定
 * @default ------------------------------
 * 
 * @param InfoSaveSnap
 * @text スナップショット有効化
 * @desc スナップショットを有効にします。
 * @type boolean
 * @default false
 * @parent SaveSnapSetting
 * 
 * @param SaveSnapQuality
 * @desc スナップショットの画質。(デフォルト値0.92)
 * @text スナップショット画質
 * @type string
 * @default 0.92
 * @max 1
 * @parent SaveSnapSetting
 * 
 * @param SaveSnapScale
 * @desc スナップショットの拡大率（％）
 * @text スナップショット拡大率（％）
 * @type number
 * @default 12
 * @min 0
 * @parent SaveSnapSetting
 * 
 * @param AnyName
 * @text 章設定
 * @default ------------------------------
 * 
 * @param AnyNameVariable
 * @desc ファイル名横文字列変数番号。プラグインコマンド「ファイル名横表示文字列」で設定している場合は表示されません。
 * @text ファイル名横文字列表示変数番号
 * @type variable
 * @default 0
 * @parent AnyName
 * 
 * @param Actor
 * @text アクター設定
 * @default ------------------------------
 * 
 * @param FaceWidth
 * @desc 顔グラの横幅
 * @text 顔グラの横幅
 * @type number
 * @default 144
 * @min 0
 * @parent Actor
 * 
 * @param FaceHeight
 * @desc 顔グラの縦幅
 * @text 顔グラの縦幅
 * @type number
 * @default 144
 * @parent Actor
 * 
 * @param FaceScale
 * @desc 顔グラの拡大率
 * @text 拡大率
 * @type number
 * @default 100
 * @parent Actor
 * 
 * @param BackGround
 * @text 背景、ウィンドウスキン設定
 * @default ------------------------------
 * 
 * @param BackGroundImg
 * @desc 背景画像ファイル名を指定します。
 * @text 背景画像
 * @type file
 * @dir img/
 * @default 
 * @parent BackGround
 * 
 * @param BackUiWidth
 * @text 背景画像ウィンドウUIサイズ
 * @desc 背景画像をウィンドウUIサイズに合わせる。
 * @type boolean
 * @default true
 * @parent BackGround
 * 
 * @param BackFitWidth
 * @text 背景画像拡大
 * @desc 背景画像をウィンドウサイズまたは画面に合わせ拡大します。
 * @type boolean
 * @default false
 * @parent BackGround
 * 
 * @param AutomaticSetting
 * @text 背景画像ID自動設定
 * @desc 背景画像IDを自動で設定します。背景画像を変更した際、IDの高いセーブデータの背景がロード画面で表示されます。
 * @type boolean
 * @default true
 * @parent BackGround
 * 
 * @param ContentsBackVisible
 * @text コンテンツ背景画像非表示
 * @desc コンテンツの背景画像を表示しません。
 * @type boolean
 * @default false
 * @parent BackGround
 * 
 * @param ContentsBackGroundImg
 * @desc コンテンツ背景画像ファイル名を指定します。(複数指定可能)
 * @text コンテンツ背景画像
 * @type file
 * @dir img/
 * @default 
 * @parent BackGround
 * 
 */
/*~struct~ContentsListData:
 * 
 * @param DateSelect
 * @text 表示するステータス
 * @desc 表示するステータスを指定します。
 * @type select
 * @option なし
 * @value 0
 * @option プレイ時間(1)(2)(3)(4)(5)(6)(7)(8)(9)(11)
 * @value 1
 * @option セーブ時刻(1)(2)(3)(4)(5)(6)(7)(8)(9)(11)
 * @value 2
 * @option 現在地(1)(2)(3)(4)(5)(6)(7)(8)(9)(11)
 * @value 3
 * @option 所持金(1)(2)(3)(4)(5)(6)(7)(8)(9)(11)
 * @value 4
 * @option オリジナル項目(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)
 * @value 5
 * @option ファイル名(1)(2)(3)(4)(5)(8)
 * @value 10
 * @option タイトル(1)(2)(3)(4)(5)(8)(11)
 * @value 11
 * @option 章(1)(2)(3)(4)(5)(8)(11)
 * @value 12
 * @option 行動目標(1)(2)(3)(4)(5)(8)(11)
 * @value 13
 * @option アクター名(1)(2)(3)(4)(5)(8)
 * @value 20
 * @option クラス(1)(2)(3)(4)(5)(8)
 * @value 21
 * @option 二つ名(Nickname)(1)(2)(3)(4)(5)(8)
 * @value 22
 * @option レベル(1)(2)(3)(4)(5)(8)(11)
 * @value 23
 * @option キャラチップ(1)(2)(3)(4)(5)
 * @value 50
 * @option 顔グラ(1)(2)(3)(4)
 * @value 51
 * @option SVアクター(1)(2)(3)(4)(5)
 * @value 52
 * @option スナップショット(1)(2)(3)(4)
 * @value 90
 * @option ライン(1)(2)(3)(4)(5)(7)
 * @value 100
 * @default 0
 * 
 * @param X_Position
 * @text X表示列位置(1)
 * @desc X表示列位置
 * @type number
 * @default 1
 * @min 1
 * @max 3
 * 
 * @param Y_Position
 * @desc Y表示行位置
 * @text Y表示行位置(2)
 * @type number
 * @default 1
 * @min 1
 * @max 99
 * 
 * @param X_Coordinate
 * @text X座標（相対）(3)
 * @desc X座標（X表示列位置からの相対座標）
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param Y_Coordinate
 * @text Y座標（相対）(4)
 * @desc Y座標（Y表示列位置からの相対座標）
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param ItemWidth
 * @desc 項目横幅（0でデフォルト幅）
 * @text 項目横幅(5)
 * @type number
 * @default 0
 * @min 0
 * 
 * @param SystemItemWidth
 * @desc システム項目の横幅（0でデフォルト幅）
 * @text システム項目横幅(6)
 * @type number
 * @default 0
 * @min 0
 * 
 * @param SystemNameColor
 * @desc システム項目の文字色。テキストタブでカラーコードを入力できます。
 * @text システム項目文字色(7)
 * @type number
 * @default 16
 * @min 0
 * 
 * @param FontSize
 * @desc フォントサイズ（メインフォントからの差）
 * @text フォントサイズ(8)
 * @type number
 * @default -6
 * @min -99
 * 
 * @param ParamName
 * @desc 項目の名称を設定します。
 * @text 名称(9)
 * @type string
 * @default
 * 
 * @param DetaEval
 * @desc 評価式。
 * @text 評価式(javaScript)(10)
 * @type combo
 * @option '$gameParty.steps();//歩数'
 * @option '$gameSystem.battleCount();//戦闘回数'
 * @option '$gameSystem.escapeCount();//逃走回数'
 * @option '$gameSystem.saveCount();//セーブ回数'
 * @option '$gameVariables.value(0);//ゲーム変数'
 * @option '$gameSystem.chronus().getDateFormat(1);//ゲーム内時間の導入プラグイン日時フォーマット1'
 * @option '$gameSystem.chronus().getDateFormat(2);//ゲーム内時間の導入プラグイン日時フォーマット2'
 * @default 
 * 
 * @param Align
 * @desc 文字揃え。
 * @text 文字揃え(11)
 * @type select
 * @option 制御文字使用可(左揃え)
 * @value "TextEx"
 * @option 左
 * @value "left"
 * @option 中央
 * @value "center"
 * @option 右
 * @value "right"
 * @default "left"
 * 
 */

var Imported = Imported || {};
Imported.NUUN_SaveScreen = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_SaveScreen');
  const BackUiWidth = eval(parameters['BackUiWidth'] || 'true');
  const BackFitWidth = eval(parameters['BackFitWidth'] || 'false');
  const ContentsBackVisible = eval(parameters['ContentsBackVisible'] || "false");
  const AutomaticSetting = eval(parameters['AutomaticSetting'] || "true");
  const PartyActorMode = Number(parameters['PartyActorMode'] || 1);
  const FaceWidth = Number(parameters['FaceWidth'] || 144);
  const FaceHeight = Number(parameters['FaceHeight'] || 144);
  const FaceScale = Number(parameters['FaceScale'] || 100);
  const NumSaveRows = Number(parameters['NumSaveRows'] || 5);
  const MaxSave = Number(parameters['MaxSave'] || 20);
  const AnyNameVariable = Number(parameters['AnyNameVariable'] || 0);
  const InfoSaveSnap = eval(parameters['InfoSaveSnap'] || "true");
  const SaveSnapQuality = eval(parameters['SaveSnapQuality'] || 0.92);
  const SaveSnapScale = Number(parameters['SaveSnapScale'] || 15);
  const DayTime = String(parameters['DayTime']);
  const BackGroundImg = String(parameters['BackGroundImg']);
  const ContentsBackGroundImg = String(parameters['ContentsBackGroundImg'])
  const ContentsList = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ContentsList'])) : null) || [];
  const CharacterSpecifyActorOnry = eval(parameters['CharacterSpecifyActorOnry'] || "false");
  const FaceSpecifyActorOnry = eval(parameters['FaceSpecifyActorOnry'] || "false");
  const SvSpecifyActorOnry = eval(parameters['SvSpecifyActorOnry'] || "false");
  const NameSpecifyActorOnry = eval(parameters['NameSpecifyActorOnry'] || "false");
  const ClassSpecifyActorOnry = eval(parameters['ClassSpecifyActorOnry'] || "false");
  const NickNameSpecifyActorOnry = eval(parameters['NickNameSpecifyActorOnry'] || "false");
  const LevelSpecifyActorOnry = eval(parameters['LevelSpecifyActorOnry'] || "false");

  let saveInfoSnapShot = null;

  const pluginName = "NUUN_SaveScreen";
  PluginManager.registerCommand(pluginName, 'ChangeBackground', args => {
    const data = String(args.BackGroundImg);
    if (data) {
      $gameSystem.setSaveBuckGround(data, Number(args.BackGroundId));
    }
  });

  PluginManager.registerCommand(pluginName, 'ChangeContentsBackground', args => {
    const data = String(args.BackGroundImg);
    if (data) {
      $gameSystem.setSaveContentsBuckGround(data);
    }
  });

  PluginManager.registerCommand(pluginName, 'UserAutoSave', args => {
    SceneManager.snapSaveBitmap(eval(args.OnSaveSnap));
    SceneManager._scene.executeAutosave();
  });
  
  PluginManager.registerCommand(pluginName, 'SetAnyName', args => {
    $gameSystem.saveAnyName = args.AnyName;
  });

  PluginManager.registerCommand(pluginName, 'SpecifyActor', args => {
    $gameParty.setSaveFileSpecifyActorOnry(Number(args.ActorId));
  });


  const _DataManager_loadSavefileImages = DataManager.loadSavefileImages;
  DataManager.loadSavefileImages = function(info) {
    _DataManager_loadSavefileImages.call(this, info);
    if (info.svActor && Symbol.iterator in info.svActor) {
      for (const character of info.svActor) {
        ImageManager.loadSvActor(character[0]);
      }
    }
    if (info.snap) {
      ImageManager.loadSaveSnapBitmap(info.snap);
    }
  };

  DataManager.loadSnap = function(info) {
    if ($gameSystem.onSnap) {
      DataManager.urlBitmapData();
      info.snap = this.urlBitmap;
    } else {
      saveInfoSnapShot = null;
      info.snap = null;
    }
  };

  const _DataManager_makeSavefileInfo = DataManager.makeSavefileInfo ;
  DataManager.makeSavefileInfo = function() {
    const info = _DataManager_makeSavefileInfo.call(this);
    this.setPartyData(info);
    info.background = $gameSystem.saveBuckgroundImg;
    info.contentsBuck = $gameSystem.saveContentsBuckgroundImg;
    info.mapname = !!$dataMap ? $gameMap.displayName() : '';
    info.gold = $gameParty._gold;
    if (Imported.NUUN_Chapter) {
      info.AnyName = $gameSystem.getChapter();
    } else {
      info.AnyName = $gameSystem.saveAnyName ? $gameSystem.saveAnyName : $gameVariables.value(AnyNameVariable);
    }
    if (Imported.NUUN_Destination) {
      info.destinationName = $gameSystem.getDestinationList();
    }
    this.setOrgParams(info);
    this.loadSnap(info);
    console.log(info)
    return info;
  };

  DataManager.setOrgParams = function(info) {
    ContentsList.forEach((data, index)=> {
      if (data.DateSelect === 5 && data.DetaEval) {
        info["orgParam_"+ String(index)] = eval(data.DetaEval);
      }
    });
  };

  DataManager.setPartyData = function(info, data) {
    const actorId = $gameParty.getSaveFileSpecifyActorOnry();
    const actor = actorId > 0 ? $gameActors.actor(actorId) : $gameParty.leader();
    if (CharacterSpecifyActorOnry) {
      info.characters = [actor.characterName(), actor.characterIndex()];
    }
    if (FaceSpecifyActorOnry) {
      info.faces = [actor.faceName(), actor.faceIndex()];
    }
    info.svActor = SvSpecifyActorOnry ? [actor.battlerName()] : $gameParty.svActorForSavefile();
    info.actorName = NameSpecifyActorOnry ? [actor.name()] : $gameParty.actorNameForSavefile();
    info.actorClass = ClassSpecifyActorOnry ? [actor.currentClass().name] : $gameParty.actorClassForSavefile();
    info.actorNickName = NickNameSpecifyActorOnry ? [actor.nickname()] : $gameParty.actorNickNameForSavefile();
    info.levelActor = LevelSpecifyActorOnry ? [actor._level] : $gameParty.actorLevelForSavefile();
  };

  DataManager.loadBackground = function() {
    const globalInfo = this._globalInfo;
    const validInfo = globalInfo.slice(1).filter(x => x);
    const id = Math.max(...validInfo.map(x => this.backgroundId(x)));
    const index = globalInfo.findIndex(x => x && this.backgroundId(x) === id);
    return globalInfo[index].background ? globalInfo[index].background[0] : null;
  };

  DataManager.backgroundId = function(x) {
    return x.background ? x.background[1] : 0;
  };

  DataManager.snapBitmap = function() {
    return SceneManager.getSnapBitmap();
  };

  DataManager.urlBitmapData = function() {
    this.urlBitmap = this.toDataURL();
  };

  DataManager.toDataURL = function() {
    const png = this.svaeSnapBitmap()._canvas.toDataURL('image/png', SaveSnapQuality);
    const jpeg = this.svaeSnapBitmap()._canvas.toDataURL('image/jpeg', SaveSnapQuality);
    return (png.length < jpeg.length) ? png : jpeg;
  };

  DataManager.svaeSnapBitmap = function(){
    const bitmap = this.snapBitmap();
    if (bitmap) {
      const width = bitmap.width * SaveSnapScale / 100;
      const height = bitmap.height * SaveSnapScale / 100;
      const snapBitmap = new Bitmap(width, height);
      snapBitmap.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0, snapBitmap.width, snapBitmap.height);
      return snapBitmap;
    }
    return null;
  };

  SceneManager.snapSaveBitmap = function(mode) {
    $gameSystem.onSnap = mode;
    if (mode) {
      if (this._snapBitmap) {
        this._snapBitmap.destroy();
      }
      this._snapBitmap = this.snap();
      SceneManager.snapAutoSave();
    }
  };

  SceneManager.snapAutoSave = function() {
    this._snapAutoSave = true;
  };

  SceneManager.getSnapBitmap = function() {
    return this._snapBitmap;
  };

  SceneManager.snapSaveBackground = function() {
    $gameSystem.onSnap = InfoSaveSnap;
    if (InfoSaveSnap) {
      if (this._snapAutoSave) {
        this._snapAutoSave = false;
        return;
      }
      if (this._snapBitmap) {
        this._snapBitmap.destroy();
      }
      this._snapBitmap = this._backgroundBitmap;
    }
  };

  const _SceneManager_push = SceneManager.push;
  SceneManager.push = function(sceneClass) {
    if (sceneClass.name === 'Scene_Battle') {
      if ($gameSystem.isAutosaveEnabled()) {
        SceneManager.snapSaveBitmap(true);
      }
    }
    _SceneManager_push.call(this, sceneClass);
  };

  const _SceneManager_snapForBackground = SceneManager.snapForBackground;
  SceneManager.snapForBackground = function() {
    _SceneManager_snapForBackground.call(this);
    this.snapSaveBackground();
  };

  ImageManager.loadSaveSnapBitmap = function(url) {
    const has = Utils.hasEncryptedImages();
    let bitmap = null;
    if (has) {
      Utils._hasEncryptedImages = false;
      bitmap = ImageManager.loadBitmapFromUrl(url);
      Utils._hasEncryptedImages = true;
    } else {
      bitmap = ImageManager.loadBitmapFromUrl(url);
    }
    return bitmap;
  };

  const _DataManager_maxSavefiles = DataManager.maxSavefiles;
  DataManager.maxSavefiles = function() {
    return MaxSave ? MaxSave : _DataManager_maxSavefiles.call(this);
  };


  const _Scene_Map_updateTransferPlayer = Scene_Map.prototype.updateTransferPlayer;
  Scene_Map.prototype.updateTransferPlayer = function() {
    if ($gamePlayer.isTransferring()) {
      if ($gameSystem.isAutosaveEnabled()) {
        SceneManager.snapSaveBitmap(true);
      }
    }
    _Scene_Map_updateTransferPlayer.call(this);
  };
  

  const _Scene_File_create = Scene_File.prototype.create;
  Scene_File.prototype.create = function() {
    this.createBackground();
    _Scene_File_create.call(this);
  };

  const _Scene_File_createListWindow = Scene_File.prototype.createListWindow;
  Scene_File.prototype.createListWindow = function() {
    _Scene_File_createListWindow.call(this);
    if ($gameSystem.getSaveBuckGround()) {
      this._listWindow.opacity = 0;
    }
  };

  const _Scene_File_createHelpWindow = Scene_File.prototype.createHelpWindow;
  Scene_File.prototype.createHelpWindow = function() {
    _Scene_File_createHelpWindow.call(this);
    if ($gameSystem.getSaveBuckGround()) {
      this._helpWindow.opacity = 0;
    }
  };

  Scene_File.prototype.createBackground = function() {
    Scene_MenuBase.prototype.createBackground.call(this);
    if (BackGroundImg) {
      let data = null;
      if (this.mode() === 'save') {
        data = $gameSystem.getSaveBuckGround();
      } else {
        data = DataManager.loadBackground() || BackGroundImg;
      }
      if (data) {
        const sprite = new Sprite();
        sprite.bitmap = ImageManager.nuun_LoadPictures(data);
        if (data) {
          this.addChild(sprite);
          if (sprite.bitmap && !sprite.bitmap.isReady()) {
            sprite.bitmap.addLoadListener(this.setBackGround.bind(this, sprite));
          } else {
            this.setBackGround(sprite);
          }
        }
      }
    }
  };

  Scene_File.prototype.setBackGround = function(sprite) {
    if (BackUiWidth) {
      sprite.x = (Graphics.width - Graphics.boxWidth) / 2 - 4;
      sprite.y = (Graphics.height - Graphics.boxHeight) / 2 - 4;
    } else {
      sprite.x = 0;
      sprite.y = 0;
    }
    if (BackFitWidth) {
      if(BackUiWidth) {
        sprite.scale.x = (Graphics.boxWidth + 8 !== sprite.bitmap.width ? (Graphics.boxWidth + 8) / sprite.bitmap.width : 1);
        sprite.scale.y = (Graphics.boxHeight + 8 !== sprite.bitmap.height ? (Graphics.boxHeight + 8) / sprite.bitmap.height : 1);
      } else {
        sprite.scale.x = (Graphics.width !== sprite.bitmap.width ? Graphics.width / sprite.bitmap.width : 1);
        sprite.scale.y = (Graphics.height !== sprite.bitmap.height ? Graphics.height / sprite.bitmap.height : 1);
      }
    }
  };

  const _Window_SavefileList_initialize = Window_SavefileList.prototype.initialize;
  Window_SavefileList.prototype.initialize = function(rect) {
    _Window_SavefileList_initialize.call(this, rect);
    this._contentsBackVisible = ContentsBackVisible;
  };

  Window_SavefileList.prototype.maxContentsCols = function() {
    return 2;
  };

  Window_SavefileList.prototype.lineHeight = function() {
    return 30;
  };

  const _Window_SavefileList_numVisibleRows = Window_SavefileList.prototype.numVisibleRows;
  Window_SavefileList.prototype.numVisibleRows = function() {
    return NumSaveRows ? NumSaveRows : _Window_SavefileList_numVisibleRows.call(this);
  };

  const _Window_SavefileList_drawItemBackground = Window_SavefileList.prototype.drawItemBackground;
  Window_SavefileList.prototype.drawItemBackground = function(index) {
    const savefileId = this.indexToSavefileId(index);
    const info = DataManager.savefileInfo(savefileId);
    const buckgroundImg = info && !!info.contentsBuck ? info.contentsBuck : ContentsBackGroundImg;
    if (buckgroundImg) {
      const bitmap = ImageManager.nuun_LoadPictures(buckgroundImg);
      if (bitmap && !bitmap.isReady()) {
        bitmap.addLoadListener(this.drawContentsBack.bind(this, bitmap, index));
      } else {
        this.drawContentsBack(bitmap, index);
      }
    } else {
      _Window_SavefileList_drawItemBackground.call(this, index);
    }
  };

  Window_SavefileList.prototype.drawContentsBack = function(bitmap, index) {
    const rect = this.itemRect(index);
    this.contentsBack.blt(bitmap, 0, 0, rect.width, rect.height, rect.x + 1, rect.y + 1, rect.width - 2, rect.height - 2);
  };

  Window_SavefileList.prototype.drawItem = function(index) {
    const savefileId = this.indexToSavefileId(index);
    const info = DataManager.savefileInfo(savefileId);
    const rect = this.itemRectWithPadding(index);
    this.resetTextColor();
    this.changePaintOpacity(this.isEnabled(savefileId));
    this.drawContents(info, rect, savefileId);
  };

  Window_SavefileList.prototype.drawContents = function(info, rect, savefileId) {
    const lineHeight = this.lineHeight();
    const colSpacing = this.colSpacing();
    const itemWidth = this.itemContentsWidth(rect.width);
    ContentsList.forEach((data, r) => {
      this.resetFontSettings();
      const position = Math.min(data.X_Position, this.maxContentsCols());
      const x = rect.x + data.X_Coordinate + (itemWidth + colSpacing) * (position - 1);
      const y = rect.y + data.Y_Coordinate + lineHeight * (data.Y_Position - 1);
      const width = Math.min((data.ItemWidth && data.ItemWidth > 0 ? data.ItemWidth : this.widthMode(data.WideMode, itemWidth)) - colSpacing / 2, rect.width - x);
      if (info) {
        this.drawContentsBase(info, x, y, width, data, savefileId, r);
      } else {
        this.drawContentsNotData(info, x, y, width, data, savefileId, r);
      }
      
    });
  };

  Window_SavefileList.prototype.widthMode = function(mode, width) {
    if (mode) {
      width = width * 2 + this.colSpacing();
    }
    return width;
  };

  Window_SavefileList.prototype.itemContentsWidth = function(width) {
    return Math.floor(width / this.maxContentsCols()) - this.colSpacing();
  };

  Window_SavefileList.prototype.drawContentsBase = function(info, x, y, width, data, savefileId, r) {
    switch (data.DateSelect) {
      case 0:
        break;
      case 1:
        this.drawPlaytime(info, x, y, width, data);
        break;
      case 2:
        this.drawDayTime(info, x, y, width, data);
        break;
      case 3:
        this.drawMapName(info, x, y, width, data);
        break;
      case 4:
        this.drawGold(info, x, y, width, data);
        break;
      case 5:
        this.drawOriginal(info, x, y, width, data, r);
        break;
      case 10:
        this.drawTitle(info, x, y, width, data, savefileId);
        break;
      case 11:
        this.drawTitleName(info, x, y, width, data);
        break;
      case 12:
        this.drawAnyName(info, x, y, width, data);
        break;
      case 13:
        this.drawDestination(info, x, y, width, data);
        break;
      case 20:
        this.drawActorName(info, x, y, width, data);
        break;
      case 21:
        this.drawActorClass(info, x, y, width, data);
        break;
      case 22:
        this.drawActorNickName(info, x, y, width, data);
        break;
      case 23:
        this.drawActorLeval(info, x, y, width, data);
        break;
      case 50:
        this.drawCharacters(info, x, y, width, data);
        break;
      case 51:
        this.drawFaceActors(info, x, y, width, data);
        break;
      case 52:
        this.drawSvActors(info, x, y, width, data);
        break;
      case 90:
        this.drawSnapBitmap(info, x, y, width, data);
        break;
      case 100:
        this.horzLine(info, x, y, width, data);;
        break;
    }
  };

  Window_SavefileList.prototype.drawContentsNotData = function(info, x, y, width, data, savefileId, r) {
    switch (data.DateSelect) {
      case 10:
        this.drawTitle(info, x, y, width, data, savefileId);
        break;
      case 14:
        this.drawNotFileText(info, x, y, width, data, savefileId);
        break;
    }
  };

  Window_SavefileList.prototype.drawNotFileText = function(info, x, y, width, data) {
    if (savefileId <= 0) {
      this.drawTextEx(info.AnyName, x, y, width);
    }
  };

  Window_SavefileList.prototype.drawPlaytime = function(info, x, y, width, data) {
    const systemWidth = data.ParamName ? (data.SystemItemWidth || 100) : 0;
    const padding = this.itemPadding();
    this.contents.fontSize = $gameSystem.mainFontSize() + data.FontSize;
    this.drawSystemText(x, y , systemWidth, data);
    if (info.playtime) {
      this.drawText(info.playtime, x + systemWidth + padding, y, width - (systemWidth + padding), data.Align);
    }
  };

  Window_SavefileList.prototype.drawDayTime = function(info, x, y, width, data) {
    const systemWidth = data.ParamName ? (data.SystemItemWidth || 100) : 0;
    const padding = this.itemPadding();
    this.contents.fontSize = $gameSystem.mainFontSize() + data.FontSize;
    this.drawSystemText(x, y , systemWidth, data);
    if (info.timestamp) {
      const _dayTime = new Date(info.timestamp);
      const format = _dayTime.toLocaleString(eval(DayTime));
      this.drawText(format, x + systemWidth + padding, y, width - (systemWidth + padding), data.Align);
    }
  };

  Window_SavefileList.prototype.drawMapName = function(info, x, y, width, data) {
    const systemWidth = data.ParamName ? (data.SystemItemWidth || 100) : 0;
    const padding = this.itemPadding();
    this.contents.fontSize = $gameSystem.mainFontSize() + data.FontSize;
    this.drawSystemText(x, y , systemWidth, data);
    if (info.mapname) {
      this.drawText(info.mapname, x + systemWidth + padding, y, width - (systemWidth + padding), data.Align);
    }
  };

  Window_SavefileList.prototype.drawGold = function(info, x, y, width, data) {
    const systemWidth = data.ParamName ? (data.SystemItemWidth || 100) : 0;
    const padding = this.itemPadding();
    this.contents.fontSize = $gameSystem.mainFontSize() + data.FontSize;
    this.drawSystemText(x, y , systemWidth, data);
    if (info.gold !== undefined) {
      const unit = TextManager.currencyUnit;
      this.drawCurrencyValue(info.gold, unit, x, y, width)
    }
  };

  Window_SavefileList.prototype.drawOriginal = function(info, x, y, width, data, index) {
    const systemWidth = data.ParamName ? (data.SystemItemWidth || 100) : 0;
    const padding = this.itemPadding();
    this.contents.fontSize = $gameSystem.mainFontSize() + data.FontSize;
    this.drawSystemText(x, y , systemWidth, data);
    const text = info["orgParam_"+ String(index)];
    if (text) {
      this.drawText(text, x + systemWidth + padding, y, width - (systemWidth + padding), data.Align);
    }
  };

  const _Window_SavefileList_drawTitle = Window_SavefileList.prototype.drawTitle;
  Window_SavefileList.prototype.drawTitle = function(info, x, y, width, data, savefileId) {
    this.contents.fontSize = $gameSystem.mainFontSize() + data.FontSize;
    _Window_SavefileList_drawTitle.call(this, savefileId, x, y);
  };

  Window_SavefileList.prototype.drawTitleName = function(info, x, y, width, data) {
    this.contents.fontSize = $gameSystem.mainFontSize() + data.FontSize;
    this.drawText(info.title, x, y, width);
  };

  Window_SavefileList.prototype.drawAnyName = function(info, x, y, width, data) {
    if (info.AnyName) {
      this.contents.fontSize = $gameSystem.mainFontSize() + data.FontSize;
      this.resetTextColor();
      if (data.Align === 'TextEx') {
        this.drawTextEx(info.AnyName, x, y, width);
      } else {
        this.drawText(info.AnyName , x, y, width, data.Align);
      }
    }
  };

  Window_SavefileList.prototype.drawDestination = function(info, x, y, width, data) {
    if (info.destinationName) {
      this.contents.fontSize = $gameSystem.mainFontSize() + data.FontSize;
      this.resetTextColor();
      if (data.Align === 'TextEx') {
        this.drawTextEx(info.destinationName, x, y, width);
      } else {
        this.drawText(info.destinationName , x, y, width, data.Align);
      }
    }
  };

  Window_SavefileList.prototype.drawCharacters = function(info, x, y, width, data) {
    const rect = this.itemRectWithPadding(0);
    const bottom = y + rect.height;
    if (CharacterSpecifyActorOnry) {
      this.drawSpecifyActorOnryCharacter(info, x + 24, bottom - 8);
    } else {
      this.drawPartyCharacters(info, x + 24, bottom - 8);
    }
  };

  Window_SavefileList.prototype.drawFaceActors = function(info, x, y, width, data) {
    if (info.faces) {
      const colSpacing = this.colSpacing();
      width += colSpacing / 2;
      if (FaceSpecifyActorOnry) {
        const data = info.faces[0];
        this.drawFace(data[0], data[1], x, y, FaceWidth, FaceHeight);
      } else {
        let faceX = x;
        for (const data of info.faces) {
          this.drawFace(data[0], data[1], faceX, y, FaceWidth, FaceHeight);
          faceX += FaceWidth;
        }
      }
    }
  };

  Window_SavefileList.prototype.drawFace = function(faceName, faceIndex, x, y, width, height) {
    const rect = this.itemRectWithPadding(0);
    const scale = FaceScale / 100;
    const scale2 = 100 / (100 * scale);
    width = width || ImageManager.faceWidth;
    height = Math.min((height || ImageManager.faceHeight), (rect.height - 2) * scale2);
    const bitmap = ImageManager.loadFace(faceName);
    const pw = ImageManager.faceWidth;
    const ph = ImageManager.faceHeight;
    const sw = Math.min(width, pw);
    const sh = Math.min(height, ph);
    const dx = Math.floor(x + Math.max(width - pw, 0) / 2);
    const dy = Math.floor(y + Math.max(height - ph, 0) / 2);
    const sx = Math.floor((faceIndex % 4) * pw + (pw - sw) / 2);
    const sy = Math.floor(Math.floor(faceIndex / 4) * ph + (ph - sh) / 2);
    const dw = Math.floor(sw * scale);
    const dh = Math.floor(sh * scale);
    this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, dw, dh);
  };

  Window_SavefileList.prototype.drawSvActors = function(info, x, y, width) {
    if (info.svActor) {
      const colSpacing = this.colSpacing();
      width += colSpacing / 2;
      if (SvSpecifyActorOnry) {
        const data = info.svActor[0];
        this.drawSvActor(data, characterX, y);
      } else {
        let svX = x;
        for (const data of info.svActor) {
          this.drawSvActor(data[0], svX, y);
          svX += width;
        }
      }
    }
  };

  Window_SavefileList.prototype.drawSvActor = function(data, x, y) {
    if (data) {
      const motionIndex = 0;
      const bitmap = ImageManager.loadSvActor(data);
      const pw = Math.floor(bitmap.width / 9);
      const ph = Math.floor(bitmap.height / 6);
      const sx = Math.floor(motionIndex / 6) * 3;
      const sy = motionIndex % 6;
      this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
    }
  };

  Window_SavefileList.prototype.drawActorName = function(info, x, y, width, data) {
    if (info.actorName) {
      const colSpacing = this.colSpacing();
      width += colSpacing / 2;
      this.contents.fontSize = $gameSystem.mainFontSize() + data.FontSize;
      this.resetTextColor();
      if (NameSpecifyActorOnry) {
        const name = info.actorName[0];
        this.drawText(name , x, y, width, data.Align);
      } else {
        let nameX = x;
        for (const name of info.actorName) {
          this.drawText(name , nameX, y, width, data.Align);
          nameX += width;
        }
      }
    }
  };

  Window_SavefileList.prototype.drawActorClass = function(info, x, y, width, data) {
    if (info.actorClass) {
      const colSpacing = this.colSpacing();
      width += colSpacing / 2;
      this.contents.fontSize = $gameSystem.mainFontSize() + data.FontSize;
      this.resetTextColor();
      if (ClassSpecifyActorOnry) {
        const name = info.actorClasse[0];
        this.drawText(name , x, y, width, data.Align);
      } else {
        let nameX = x;
        for (const name of info.actorClass) {
          this.drawText(name , nameX, y, width, data.Align);
          nameX += width;
        }
      }
    }
  };

  Window_SavefileList.prototype.drawActorNickName = function(info, x, y, width, data) {
    if (info.actorNickName) {
      const colSpacing = this.colSpacing();
      width += colSpacing / 2;
      this.contents.fontSize = $gameSystem.mainFontSize() + data.FontSize;
      this.resetTextColor();
      if (NickNameSpecifyActorOnry) {
        const name = info.actorNickName[0];
        this.drawText(name , x, y, width, data.Align);
      } else {
        let nameX = x;
        for (const name of info.actorNickName) {
          this.drawText(name , nameX, y, width, data.Align);
          nameX += width;
        }
      }
    }
  };

  Window_SavefileList.prototype.drawActorLeval = function(info, x, y, width, data) {
    if (info.levelActor) {
      this.contents.fontSize = $gameSystem.mainFontSize() + data.FontSize;
      const textWidth = this.textWidth(TextManager.levelA);
      const padding = this.itemPadding();
      const colSpacing = this.colSpacing();
      width += colSpacing / 2;
      if (LevelSpecifyActorOnry) {
        this.changeTextColor(NuunManager.getColorCode(data.SystemNameColor));
        this.drawText(TextManager.levelA, x, y, textWidth);
        this.resetTextColor();
        this.resetTextColor();
        this.drawText(data, x + textWidth + padding, y, width - (textWidth + padding), data.Align);
      } else {
        let levelActorX = x;
        for (const name of info.levelActor) {
          this.changeTextColor(NuunManager.getColorCode(data.SystemNameColor));
          this.drawText(TextManager.levelA, levelActorX + padding / 4, y, textWidth);
          this.resetTextColor();
          this.resetTextColor();
          this.drawText(name, levelActorX + textWidth + padding , y, width - (textWidth + padding), data.Align);
          levelActorX += width;
        }
      }
    }
  };

  Window_SavefileList.prototype.drawSpecifyActorOnryCharacter = function(info, x, y) {
    if (info.characters) {
      const data = info.characters[0];
      this.drawCharacter(data[0], data[1], x, y);
    }
  };

  Window_SavefileList.prototype.drawSnapBitmap = function(info, x, y, width, data) {
    if (info.snap) {
      const bitmap = ImageManager.loadSaveSnapBitmap(info.snap);
      this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y);
    }
  };

  Window_SavefileList.prototype.drawSystemText = function(x, y, width, data) {
    if (data.ParamName) {
      this.changeTextColor(NuunManager.getColorCode(data.SystemNameColor));
      this.drawText(data.ParamName || '', x, y, width);
      this.resetTextColor();
    }
  };

  Window_SavefileList.prototype.systemWidth = function(swidth, width) {
    return swidth > 0 ? swidth : Math.floor(width / 2);
  };

  const _Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    _Game_System_initialize.call(this);
    this.saveBuckgroundImg = [BackGroundImg, 0];
    this.saveContentsBuckgroundImg = ContentsBackGroundImg;
    this.onSnap = false;
  };

  Game_System.prototype.setSaveBuckGround = function(img, id) {
    const buckgroundId = AutomaticSetting ? (this.buckgroundId || 0) + 1 : id;
    this.saveBuckgroundImg = [img, buckgroundId];
  };

  Game_System.prototype.getSaveBuckGround = function() {
    this.saveBuckgroundImg = this.saveBuckgroundImg || [BackGroundImg, 0];
    return this.saveBuckgroundImg[0];
  };

  Game_System.prototype.getSaveBuckGroundId = function() {
    return this.saveBuckgroundImg[1] || 0;
  };

  Game_System.prototype.setSaveContentsBuckGround = function(img) {
    this.saveContentsBuckgroundImg = img ? img : ContentsBackGroundImg;
  };

  const _Game_Party_initialize = Game_Party.prototype.initialize;
  Game_Party.prototype.initialize = function() {
    _Game_Party_initialize.call(this);
    this._saveFileSpecifyActorOnry = 0;
  };

  Game_Party.prototype.setSaveFileSpecifyActorOnry = function(id) {
    this._saveFileSpecifyActorOnry = id;
  };

  Game_Party.prototype.getSaveFileSpecifyActorOnry = function() {
    return this._saveFileSpecifyActorOnry;
  };

  const _Game_Party_charactersForSavefile = Game_Party.prototype.charactersForSavefile;
  Game_Party.prototype.charactersForSavefile = function() {
    if (PartyActorMode === 1) {
      return _Game_Party_charactersForSavefile.call(this);
    } else if (PartyActorMode === 2) {
      return this.members().map(actor => [
        actor.characterName(),
        actor.characterIndex()
      ]);
    }
  };

  const _Game_Party_facesForSavefile = Game_Party.prototype.facesForSavefile;
  Game_Party.prototype.facesForSavefile = function() {
    if (PartyActorMode === 1) {
      return _Game_Party_facesForSavefile.call(this);
    } else if (PartyActorMode === 2) {
      return this.members().map(actor => [
        actor.faceName(),
        actor.faceIndex()
      ]);
    }
  };

  Game_Party.prototype.actorLevelForSavefile = function() {
    if (PartyActorMode === 1) {
      return this.battleMembers().map(actor => actor._level);
    } else if (PartyActorMode === 2) {
      return this.members().map(actor => actor._level);
    }
  };

  Game_Party.prototype.actorNameForSavefile = function() {
    if (PartyActorMode === 1) {
      return this.battleMembers().map(actor => actor.name());
    } else if (PartyActorMode === 2) {
      return this.members().map(actor => actor.name());
    }
  };

  Game_Party.prototype.svActorForSavefile = function() {
    if (PartyActorMode === 1) {
      return this.battleMembers().map(actor => [actor.battlerName()]);
    } else if (PartyActorMode === 2) {
      return this.members().map(actor => [actor.battlerName()]);
    }
  };

  Game_Party.prototype.actorClassForSavefile = function() {
    if (PartyActorMode === 1) {
      return this.battleMembers().map(actor => actor.currentClass().name);
    } else if (PartyActorMode === 2) {
      return this.members().map(actor => actor.currentClass().name);
    }
  };

  Game_Party.prototype.actorNickNameForSavefile = function() {
    if (PartyActorMode === 1) {
      return this.battleMembers().map(actor => actor.nickname());
    } else if (PartyActorMode === 2) {
      return this.members().map(actor => actor.nickname());
    }
  };

})();
