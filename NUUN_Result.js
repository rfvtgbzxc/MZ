/*:-----------------------------------------------------------------------------------
 * NUUN_Result.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc リザルト
 * @author NUUN
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * @version 2.0.2
 * 
 * @help
 * 戦闘終了時にリザルト画面を表示します。
 * デフォルトのリザルトはメッセージウィンドウで表示されますが、入手EXP、獲得金額、ドロップアイテムを１画面にし、レベルアップしたアクターがいない場合は決定キー（ボタン）を
 * １回押しただけでリザルトが終了します。
 * 
 * 主な機能
 * ブロックごとに分かれており、アクター経験値、入手インフォ、ドロップアイテム、レベルアップアクターステータス、習得スキルごとに表示する座標を指定できます。
 * アクター経験値、入手インフォ、ドロップアイテム、レベルアップアクターステータス、習得スキルは項目ごとに座標、フォントサイズ等の変更ができます。
 * 戦闘終了後、勝利MEが流れた後に任意のBGMを再生できます。
 * 
 * 仕様
 * アクター経験値、レベルアップアクターステータスにサイドビューアクターを表示される場合、全ての項目よりも手前に表示されます。
 * 
 * 各項目の評価式のパラメータ
 * a:アクターのゲームデータ
 * d:アクターのデータベースデータ
 * 
 * 操作
 * ←→キー：入手アイテム、習得スキルのページ切り替え
 * 右クリック：ページ切り替え
 * 左クリック：クリック
 * 
 * プラグインコマンド
 * 「レベルアップ画面表示許可」
 * レベルアップ画面の表示の許可を設定できます。(注：このプラグインコマンドを実行後レベルアップ画面表示の設定が無効化されます）
 * 「勝利BGMの再生許可」
 * 勝利BGMの再生の許可を設定できます。
 * 「勝利BGMの変更」
 * 勝利BGMを変更することが出来ます。BGMに何も指定しないことでプラグインコマンドで指定したBGMは再生されなくなります。
 * 「レベルアップSEの変更」
 * レベルアップSEを変更することが出来ます。BGMに何も指定しないことでプラグインコマンドで指定したBGMは再生されなくなります。
 * 「レベルアップ画面アクター画像変更」
 * 立ち絵の画像を変更します。立ち絵顔グラ表示EXでの設定を有効にしている場合は適用されません。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/9/10 Ver.2.0.2
 * 経験値ブーストの色が黒い色で表示されてしまう問題を修正。
 * 2022/9/10 Ver.2.0.1
 * 戦闘終了時にエラーが出る問題を修正。
 * レベルアップアクターステータスウィンドウの項目の初期設定にアクター名を追加。
 * サポートアクターが表示されない問題を修正。
 * 2022/9/9 Ver.2.0.0
 * 全面改修。
 * 
 * @param CommonSetting
 * @text 共通設定
 * @default ------------------------------
 * 
 * @param ResultVisibleFrame
 * @desc 勝利後リザルト画面が表示されるまでのフレーム数
 * @text 勝利後リザルト画面遅延フレーム数
 * @type number
 * @default 0
 * @min 0
 * @parent CommonSetting
 * 
 * @param ResultFadein
 * @type boolean
 * @default false
 * @text フェードイン表示
 * @desc リザルト画面をフェードインで表示する。
 * @parent CommonSetting
 * 
 * @param Decimal
 * @text 小数点桁数
 * @desc 表示出来る小数点桁数。(経験値百分率等)
 * @type number
 * @default 0
 * @min 0
 * @parent CommonSetting
 * 
 * @param DecimalMode
 * @text 端数処理四捨五入
 * @desc 表示外小数点を四捨五入で丸める。（falseで切り捨て）(経験値百分率等)
 * @type boolean
 * @default true
 * @parent CommonSetting
 * 
 * @param BackUiWidth
 * @text 背景画像ウィンドウサイズ
 * @desc 背景画像をウィンドウサイズに合わせる。
 * @type boolean
 * @default true
 * @parent CommonSetting
 * 
 * @param BackFitWidth
 * @text 背景画像拡大
 * @desc 背景画像をウィンドウサイズまたは画面に合わせ拡大します。
 * @type boolean
 * @default false
 * @parent CommonSetting
 * 
 * @param WindowSetting
 * @text 共通ウィンドウ設定
 * @default ------------------------------
 * 
 * @param ResultWindowCenter
 * @type boolean
 * @default true
 * @text ウィンドウを中央表示
 * @desc ウィンドウを中央に表示します。ウィンドウのX座標はウィンドウ表示位置からの相対座標になります。
 * @parent WindowSetting
 * 
 * @param CloseActorStatusWindow
 * @type boolean
 * @default false
 * @text リザルト表示時アクターウィンドウ非表示
 * @desc リザルト画面表示時にアクターステータスウィンドウを非表示にします。
 * @parent WindowSetting
 * 
 * @param NoTouchUIWindow
 * @type boolean
 * @default false
 * @text タッチUI OFF時ウィンドウ上詰め
 * @desc タッチUIがOFFの時ウィンドウを上に詰めます。
 * @parent WindowSetting
 * 
 * @param ActorFace
 * @text 顔グラ設定
 * @default ------------------------------
 * 
 * @param ActorFaceHeight
 * @desc 顔グラの高さ
 * @text 顔グラ高さ
 * @type number
 * @default 144
 * @min 0
 * @parent ActorFace
 * 
 * @param LevelUpActorFaceHeight
 * @desc レベルアップウィンドウの顔グラの高さ
 * @text レベルアップ顔グラ高さ
 * @type number
 * @default 144
 * @min 0
 * @parent ActorFace
 * 
 * @param ActorCharacter
 * @text キャラチップ設定
 * @default ------------------------------
 * 
 * @param ActorSv
 * @text サイドビュー設定
 * @default ------------------------------
 * 
 * @param ButtonSetting
 * @text ボタン設定
 * @default ------------------------------
 * 
 * @param ButtonPosition
 * @desc ボタンの表示位置を指定します。
 * @text ボタン位置
 * @type select
 * @option 左
 * @value "left"
 * @option 右
 * @value "right"
 * @default "right"
 * @parent ButtonSetting
 * 
 * @param ResultButton_X
 * @desc ボタンのX座標。
 * @text ボタンX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent ButtonSetting
 * 
 * @param ResultButton_Y
 * @desc ボタンのY座標。
 * @text ボタンY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent ButtonSetting
 * 
 * @param HelpWindowSetting
 * @text 戦闘結果表示ウィンドウ設定
 * @default ------------------------------
 * 
 * @param HelpWindowVisible
 * @text 戦闘結果表示
 * @desc 戦闘結果を表示します。
 * @type boolean
 * @default true
 * @parent HelpWindowSetting
 * 
 * @param ResultHelpWindowVisible
 * @text ウィンドウ表示
 * @desc ウィンドウを表示します。
 * @type boolean
 * @default true
 * @parent HelpWindowSetting
 * 
 * @param ResultHelpWidth
 * @desc 戦闘結果ウィンドウの横幅。(0でUI横幅)
 * @text 戦闘結果ウィンドウ横幅
 * @type number
 * @default 0
 * @min 0
 * @parent HelpWindowSetting
 * 
 * @param ResultHelpWindow_X
 * @desc 戦闘結果ウィンドウのX座標。
 * @text 戦闘結果ウィンドウX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent HelpWindowSetting
 * 
 * @param ResultHelpWindow_Y
 * @desc 戦闘結果ウィンドウのY座標。
 * @text 戦闘結果ウィンドウY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent HelpWindowSetting
 * 
 * @param ResultTextPosition
 * @desc 戦闘結果の文字の表示位置を指定します。
 * @text 戦闘結果文字の位置
 * @type select
 * @option 左
 * @value "left"
 * @option 中央
 * @value "center"
 * @option 右
 * @value "right"
 * @default 'center'
 * @parent HelpWindowSetting
 * 
 * @param ResultName
 * @text 戦闘結果の名称
 * @desc 戦闘結果の名称を設定します。
 * @type string
 * @default 戦闘結果
 * @parent HelpWindowSetting
 * 
 * @param ResultHelpWindowsSkin
 * @desc 戦闘結果ウィンドウ（上部）のウィンドウスキンを指定します。
 * @text 戦闘結果ウィンドウのスキン
 * @type file
 * @dir img/system
 * @default 
 * @parent HelpWindowSetting
 * 
 * @param LevelUpHelpWindowSetting
 * @textレベルアップウィンドウ設定
 * @default ------------------------------
 * 
 * @param LevelUpHelpWindowVisible
 * @text レベルアップ表示
 * @desc レベルアップを表示します。
 * @type boolean
 * @default true
 * @parent LevelUpHelpWindowSetting
 * 
 * @param ResultLevelUpHelpWindowVisible
 * @text ウィンドウ表示
 * @desc ウィンドウを表示します。
 * @type boolean
 * @default true
 * @parent LevelUpHelpWindowSetting
 * 
 * @param LevelUpResultHelpWidth
 * @desc ウィンドウの横幅。(0でUI横幅)
 * @text ウィンドウ横幅
 * @type number
 * @default 0
 * @min 0
 * @parent LevelUpHelpWindowSetting
 * 
 * @param LevelUpResultHelpWindow_X
 * @desc ウィンドウのX座標。
 * @text ウィンドウX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent LevelUpHelpWindowSetting
 * 
 * @param LevelUpResultHelpWindow_Y
 * @desc ウィンドウのY座標。
 * @text ウィンドウY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent LevelUpHelpWindowSetting
 * 
 * @param LevelUpResultTextPosition
 * @desc レベルアップ画面の戦闘結果の文字の表示位置を指定します。
 * @text レベルアップ画面戦闘結果文字の位置
 * @type select
 * @option 制御文字使用可(左揃え)
 * @value "TextEx"
 * @option 左
 * @value "left"
 * @option 中央
 * @value "center"
 * @option 右
 * @value "right"
 * @default "TextEx"
 * @parent LevelUpHelpWindowSetting
 * 
 * @param LevelUpResultHelpName
 * @desc レベルアップ画面表示時の戦闘結果のテキストを設定します。%1:アクター名　%2:レベル(制御文字使用可(左揃え)時のみ)
 * @text レベルアップ画面表示時戦闘結果テキスト
 * @type string
 * @default %1は\c[16]レベル\c[17]%2\c[0]に上がった！
 * @parent LevelUpHelpWindowSetting
 * 
 * @param LevelUpResultHelpWindowsSkin
 * @desc レベルアップ画面ウィンドウ（上部）のウィンドウスキンを指定します。
 * @text レベルアップ画面ウィンドウのスキン
 * @type file
 * @dir img/system
 * @default 
 * @parent LevelUpHelpWindowSetting
 * 
 * @param GetWindowSetting
 * @text 入手ウィンドウ設定
 * @default ------------------------------
 * 
 * @param ResultWindowVisible
 * @text ウィンドウ表示
 * @desc ウィンドウを表示します。
 * @type boolean
 * @default true
 * @parent GetWindowSetting
 * 
 * @param ResultWindowPosition
 * @text ウィンドウ表示基準位置
 * @desc ウィンドウの表示基準位置を指定します。
 * @type select
 * @option ヘルプの下
 * @value 'help'
 * @option ボタンUIの下
 * @value 'button'
 * @option 画面UI上基準
 * @value 'top'
 * @default 'help'
 * @parent GetWindowSetting
 * 
 * @param ResultWidth
 * @desc ウィンドウの横幅。(0でUI横幅)
 * @text ウィンドウ横幅
 * @type number
 * @default 0
 * @min 0
 * @parent GetWindowSetting
 * 
 * @param ResultHeight
 * @desc ウィンドウの縦幅。(0でUI縦幅)
 * @text ウィンドウ縦幅
 * @type number
 * @default 0
 * @min 0
 * @parent GetWindowSetting
 * 
 * @param ResultWindow_X
 * @desc ウィンドウのX座標。
 * @text ウィンドウX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent GetWindowSetting
 * 
 * @param ResultWindow_Y
 * @desc ウィンドウのY座標。
 * @text ウィンドウY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent GetWindowSetting
 * 
 * @param GetWindowBackGroundImg
 * @desc 背景画像ファイル名を指定します。
 * @text 背景画像
 * @type file
 * @dir img/
 * @default 
 * @parent GetWindowSetting
 * 
 * @param GetWindowsSkin
 * @desc 入手メインウィンドウのウィンドウスキンを指定します。
 * @text 入手メインウィンドウのスキン
 * @type file
 * @dir img/system
 * @default 
 * @parent GetWindowSetting
 * 
 * @param GetActorExp
 * @text 経験値入手設定
 * @default ------------------------------
 * 
 * @param GetActorExpSetting
 * @text 経験値入手表示基本設定
 * @default ------------------------------
 * @parent GetActorExp
 * 
 * @param ActorExpDataList
 * @desc アクター獲得経験値の表示する項目。
 * @text アクター獲得経験値表示項目
 * @type struct<ActorExpList>[]
 * @default ["{\"DateSelect\":\"2\",\"X_Coordinate\":\"8\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"SystemNameColor\":\"16\",\"DetaEval\":\"\",\"FontSize\":\"0\",\"textMethod\":\"\"}","{\"DateSelect\":\"10\",\"X_Coordinate\":\"160\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"200\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"SystemNameColor\":\"16\",\"DetaEval\":\"\",\"FontSize\":\"-4\",\"textMethod\":\"\"}","{\"DateSelect\":\"11\",\"X_Coordinate\":\"370\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"100\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"SystemNameColor\":\"16\",\"DetaEval\":\"\",\"FontSize\":\"-4\",\"textMethod\":\"\"}","{\"DateSelect\":\"20\",\"X_Coordinate\":\"160\",\"Y_Coordinate\":\"62\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"SystemNameColor\":\"16\",\"DetaEval\":\"\",\"FontSize\":\"0\",\"textMethod\":\"\"}","{\"DateSelect\":\"12\",\"X_Coordinate\":\"160\",\"Y_Coordinate\":\"48\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"100\",\"ParamName\":\"獲得経験値\",\"SystemNameColor\":\"16\",\"DetaEval\":\"\",\"FontSize\":\"-4\",\"textMethod\":\"\"}","{\"DateSelect\":\"30\",\"X_Coordinate\":\"24\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"SystemNameColor\":\"16\",\"DetaEval\":\"\",\"FontSize\":\"0\",\"textMethod\":\"\"}"]
 * @parent GetActorExp
 * 
 * @param ActorExpWindowVisible
 * @text ウィンドウ表示
 * @desc ウィンドウを表示します。
 * @type boolean
 * @default false
 * @parent GetActorExp
 * 
 * @param ReserveMembers
 * @type boolean
 * @default false
 * @text 控えメンバー表示
 * @desc 控えメンバー表示。
 * @parent GetActorExp
 * 
 * @param ActorCols
 * @desc アクターの表示列数
 * @text アクター表示列数
 * @type number
 * @default 1
 * @min 1
 * @parent GetActorExp
 * 
 * @param DefaultActorVisible
 * @desc 経験値獲得時アクターのデフォルト表示数
 * @text デフォルトアクター表示数
 * @type number
 * @default 4
 * @min 0
 * @parent GetActorExp
 * 
 * @param ActorExpWidth
 * @desc アクター獲得経験値の横幅。(0でウィンドウ横幅/2)
 * @text アクター獲得経験値横幅
 * @type number
 * @default 0
 * @min 0
 * @parent GetActorExp
 * 
 * @param ActorExpHeight
 * @desc アクター獲得経験値の縦幅。(0でウィンドウ縦幅)
 * @text アクター獲得経験値縦幅
 * @type number
 * @default 0
 * @min 0
 * @parent GetActorExp
 * 
 * @param ActorExpWindow_X
 * @desc アクター獲得経験値のX座標。
 * @text アクター獲得経験値X座標
 * @type number
 * @default 0
 * @min -9999
 * @parent GetActorExp
 * 
 * @param ActorExpWindow_Y
 * @desc アクター獲得経験値のY座標。
 * @text アクター獲得経験値Y座標
 * @type number
 * @default 0
 * @min -9999
 * @parent GetActorExp
 * 
 * @param ResultActorLessThanSize
 * @type boolean
 * @default false
 * @text アクター数縦幅自動調整（未満）
 * @desc デフォルト表示数未満時にアクター表示縦幅を自動調整します。
 * @parent GetActorExp
 * 
 * @param ResultActorAutoSize
 * @type boolean
 * @default false
 * @text アクター数縦幅自動調整（より大きい）
 * @desc デフォルト表示数より大きいの時にアクター表示縦幅を自動調整します。
 * @parent GetActorExp
 * 
 * @param LevelUpNameColor
 * @desc レベルアップの文字色(システムカラーまたはカラーコード)
 * @text レベルアップ文字色
 * @type number
 * @default 17
 * @parent GetActorExp
 * 
 * @param LevelUpValueColor
 * @desc レベルアップした時のレベルの数値の色(システムカラーまたはカラーコード)
 * @text レベルアップ時の数値色
 * @type number
 * @default 17
 * @parent GetActorExp
 * 
 * @param EXPBoostValueColor
 * @desc 獲得経験値が通常より多い時の数値の色(システムカラーまたはカラーコード)
 * @text 獲得経験値ブースト時数値色
 * @type number
 * @default 0
 * @parent GetActorExp
 * 
 * @param EXPResistValueColor
 * @desc 獲得経験値が通常よりも少ない時の数値の色(システムカラーまたはカラーコード)
 * @text 獲得経験値レジスト時数値色
 * @type number
 * @default 0
 * @parent GetActorExp
 * 
 * @param EXPResistContentsBackVisible
 * @type boolean
 * @default true
 * @text コンテンツ背景表示
 * @desc コンテンツ背景を表示します。
 * @parent GetActorExp
 * 
 * @param EXPResistContentsBackGroundImg
 * @desc コンテンツ背景画像ファイル名を指定します。コンテンツ背景表示がONの時に有効
 * @text コンテンツ背景画像
 * @type file
 * @dir img/
 * @default 
 * @parent GetActorExp
 * 
 * @param EXPResistWindowsSkin
 * @desc アクター獲得経験値ウィンドウのウィンドウスキンを指定します。
 * @text アクター獲得経験値ウィンドウのスキン
 * @type file
 * @dir img/system
 * @default 
 * @parent GetActorExp
 * 
 * @param ExpSetting
 * @text EXPゲージ設定
 * @default ------------------------------
 * @parent GetActorExp
 * 
 * @param GaugeValueShow
 * @desc EXPゲージの数値を表示する。
 * @text EXPゲージ数値表示
 * @type select
 * @option 表示なし
 * @value 0
 * @option 現在の経験値を表示
 * @value 1
 * @option 目標経験値と現在値を表示
 * @value 2
 * @option 百分率で表示
 * @value 3
 * @default 1
 * @parent ExpSetting
 * 
 * @param Gauge_Width
 * @desc EXPゲージ横幅
 * @text EXPゲージ横幅
 * @type number
 * @default 300
 * @parent ExpSetting
 * 
 * @param Gauge_Height
 * @desc EXPゲージ縦幅
 * @text EXPゲージ縦幅
 * @type number
 * @default 12
 * @parent ExpSetting
 * 
 * @param GaugeRefreshFrame
 * @desc EXPゲージの更新フレーム
 * @text EXPゲージ更新フレーム
 * @type number
 * @default 100
 * @min 0
 * @parent ExpSetting
 * 
 * @param GaugeValueFontSize
 * @desc ゲージ現在値数値のフォントサイズ。（メインフォントサイズからの差）
 * @text ゲージ現在値数値のフォントサイズ
 * @type number
 * @default -6
 * @min -100
 * @parent ExpSetting
 * 
 * @param GaugeMaxValueFontSize
 * @desc ゲージ最大値数値のフォントサイズ。（メインフォントサイズからの差）
 * @text ゲージ最大値数値のフォントサイズ
 * @type number
 * @default -6
 * @min -100
 * @parent ExpSetting
 * 
 * @param GaugeValueY
 * @type number
 * @default 0
 * @text ゲージ獲得経験値Y座標調整
 * @desc ゲージ獲得経験値のY座標を調整します。
 * @min -9999
 * @parent ExpSetting
 * 
 * @param GaugeMaxValueY
 * @type number
 * @default 0
 * @text ゲージ目標経験値Y座標調整
 * @desc ゲージ目標経験値のY座標を調整します。「EXPゲージ数値表示」が目標経験値と現在値を表示指定時のみ
 * @min -9999
 * @parent ExpSetting
 * 
 * @param SeparationY
 * @type number
 * @default 0
 * @text /Y座標調整
 * @desc /のY座標を調整します。「EXPゲージ数値表示」が目標経験値と現在値を表示指定時のみ
 * @min -9999
 * @parent ExpSetting
 * 
 * @param GetInfo
 * @text 入手情報表示設定
 * @default ------------------------------
 * 
 * @param GainParam
 * @text 入手項目の設定
 * @desc 入手項目の設定。
 * @default ["{\"GainParamData\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"獲得金額\",\"SystemNameColor\":\"16\",\"DetaEval\":\"\",\"FontSize\":\"0\"}","{\"GainParamData\":\"2\",\"Y_Position\":\"2\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"獲得経験値\",\"SystemNameColor\":\"16\",\"DetaEval\":\"\",\"FontSize\":\"0\"}","{\"GainParamData\":\"1000\",\"Y_Position\":\"3\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"SystemNameColor\":\"16\",\"DetaEval\":\"\",\"FontSize\":\"0\"}"]
 * @type struct<GainParamList>[]
 * @parent GetInfo
 * 
 * @param GetInfoWindowVisible
 * @text ウィンドウ表示
 * @desc ウィンドウを表示します。
 * @type boolean
 * @default false
 * @parent GetInfo
 * 
 * @param GetInfoWidth
 * @desc 入手項目の横幅。(0でウィンドウ横幅/2)
 * @text 入手項目横幅
 * @type number
 * @default 0
 * @min 0
 * @parent GetInfo
 * 
 * @param GetInfoHeight
 * @desc 入手項目の縦幅。(0でウィンドウ縦幅)
 * @text 入手項目縦幅
 * @type number
 * @default 0
 * @min 0
 * @parent GetInfo
 * 
 * @param GetInfoWindow_X
 * @desc 入手項目のX座標。
 * @text 入手項目X座標
 * @type number
 * @default 484
 * @min -9999
 * @parent GetInfo
 * 
 * @param GetInfoWindow_Y
 * @desc 入手項目のY座標。
 * @text 入手項目Y座標
 * @type number
 * @default 0
 * @min -9999
 * @parent GetInfo
 * 
 * @param GetInfoContentsHeight
 * @desc 入手項目の項目高さ。
 * @text 入手項目項目高さ
 * @type number
 * @default 36
 * @min 0
 * @parent GetInfo
 * 
 * @param GetInfoWindowsSkin
 * @desc 入手項目ウィンドウのウィンドウスキンを指定します。
 * @text 入手項目ウィンドウのスキン
 * @type file
 * @dir img/system
 * @default 
 * @parent GetInfo
 * 
 * @param GetItemWindow
 * @text 入手、盗んだアイテム表示設定
 * @default ------------------------------
 * 
 * @param GetItemParam
 * @text アイテム、盗んだアイテムの表示設定
 * @desc アイテム、盗んだアイテム表示設定。
 * @default ["{\"GetItemParamData\":\"1\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ParamName\":\"入手アイテム\",\"SystemNameColor\":\"16\",\"FontSize\":\"0\",\"ItemCols\":\"1\",\"ItemRows\":\"0\"}"]
 * @type struct<GetItemParamList>[]
 * @parent GetItemWindow
 * 
 * @param GetItemWindowVisible
 * @text ウィンドウ表示
 * @desc ウィンドウを表示します。
 * @type boolean
 * @default false
 * @parent GetItemWindow
 * 
 * @param GetItemWidth
 * @desc アイテム、盗んだアイテムの横幅。(0でウィンドウ横幅/2)
 * @text アイテム、盗んだアイテム横幅
 * @type number
 * @default 0
 * @min 0
 * @parent GetItemWindow
 * 
 * @param GetItemHeight
 * @desc アイテム、盗んだアイテムの縦幅。(0でウィンドウ縦幅)
 * @text アイテム、盗んだアイテム縦幅
 * @type number
 * @default 0
 * @min 0
 * @parent GetItemWindow
 * 
 * @param GetItemWindow_X
 * @desc アイテム、盗んだアイテムのX座標。
 * @text アイテム、盗んだアイテムX座標
 * @type number
 * @default 484
 * @min -9999
 * @parent GetItemWindow
 * 
 * @param GetItemWindow_Y
 * @desc アイテム、盗んだアイテムのY座標。
 * @text アイテム、盗んだアイテムY座標
 * @type number
 * @default 108
 * @min -9999
 * @parent GetItemWindow
 * 
 * @param DropItemContentsHeight
 * @desc アイテム、盗んだアイテムの項目高さ。
 * @text アイテム、盗んだアイテム項目高さ
 * @type number
 * @default 36
 * @min 0
 * @parent GetItemWindow
 * 
 * @param DropItemMaxCols
 * @desc アイテム、盗んだアイテムの最大列数。
 * @text アイテム、盗んだアイテム最大列数
 * @type number
 * @default 1
 * @min 1
 * @parent GetItemWindow
 * 
 * @param DropItemRows
 * @desc アイテム、盗んだアイテムウィンドウの表示行（0でウィンドウ下まで）
 * @text アイテム、盗んだアイテム表示行
 * @type number
 * @default 0
 * @parent GetItemWindow
 * 
 * @param GetItemWindowsSkin
 * @desc ドロップアイテムウィンドウのウィンドウスキンを指定します。
 * @text ドロップアイテムウィンドウのスキン
 * @type file
 * @dir img/system
 * @default 
 * @parent GetItemWindow
 * 
 * @param GetItem
 * @text 入手アイテム表示設定
 * @default ------------------------------
 * @parent GetItemWindow
 * 
 * @param DropItemNumVisible
 * @type boolean
 * @default false
 * @text ドロップアイテム個数表示
 * @desc ドロップアイテムを個数表示します。OFFで個別表示
 * @parent GetItem
 * 
 * @param DropItemNumx
 * @desc ドロップアイテムの個数左の文字
 * @text 個数左の文字
 * @type string
 * @default x 
 * @parent GetItem
 * 
 * @param StealItemSetting
 * @text 盗みアイテム設定（要NUUN_StealableItems）
 * @default ------------------------------
 * @parent GetItemWindow
 * 
 * @param StealItemVisible
 * @type boolean
 * @default false
 * @text 盗んだアイテム表示
 * @desc 盗んだアイテムを表示します。
 * @parent StealItemSetting
 * 
 * @param StealItemNumVisible
 * @type boolean
 * @default false
 * @text 盗んだアイテム個数表示
 * @desc 盗んだアイテムを個数表示します。OFFで個別表示
 * @parent StealItemSetting
 * 
 * @param StealItemNumx
 * @desc 盗んだアイテムの個数左の文字
 * @text 個数左の文字
 * @type string
 * @default x 
 * @parent StealItemSetting
 * 
 * @param LevelUpActor
 * @text レベルアップ設定
 * @default ------------------------------
 * 
 * @param LevelUpWindowShow
 * @type boolean
 * @default true
 * @text レベルアップ画面表示
 * @desc レベルアップ画面表示します。falseでレベルアップ後のステータス差分、習得スキル演出をカットします。
 * @parent LevelUpActor
 * 
 * @param PartyPageRefreshFrame
 * @desc ページ切り替えまでの待機フレーム
 * @text 待機フレーム
 * @type number
 * @default 0
 * @parent LevelUpActor
 * 
 * @param LevelUpWindowSetting
 * @text レベルアップメインウィンドウ設定
 * @default ------------------------------
 * 
 * @param ResultLevelUpWindowVisible
 * @text ウィンドウ表示
 * @desc ウィンドウを表示します。
 * @type boolean
 * @default true
 * @parent LevelUpWindowSetting
 * 
 * @param ResultLevelUpWindowPosition
 * @text ウィンドウ表示基準位置
 * @desc ウィンドウの表示基準位置を指定します。
 * @type select
 * @option ヘルプの下
 * @value 'help'
 * @option ボタンUIの下
 * @value 'button'
 * @option 画面UI上基準
 * @value 'top'
 * @default 'help'
 * @parent LevelUpWindowSetting
 * 
 * @param ResultLevelUpWidth
 * @desc ウィンドウの横幅。(0でUI横幅)
 * @text ウィンドウ横幅
 * @type number
 * @default 0
 * @min 0
 * @parent LevelUpWindowSetting
 * 
 * @param ResultLevelUpHeight
 * @desc ウィンドウの縦幅。(0でUI縦幅)
 * @text ウィンドウ縦幅
 * @type number
 * @default 0
 * @min 0
 * @parent LevelUpWindowSetting
 * 
 * @param ResultLevelUpWindow_X
 * @desc ウィンドウのX座標。
 * @text ウィンドウX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent LevelUpWindowSetting
 * 
 * @param ResultLevelUpWindow_Y
 * @desc ウィンドウのY座標。
 * @text ウィンドウY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent LevelUpWindowSetting
 * 
 * @param LevelUpActorBackGroundImg
 * @desc 背景画像ファイル名を指定します。
 * @text 背景画像
 * @type file
 * @dir img/
 * @default 
 * @parent LevelUpWindowSetting
 * 
 * @param ResultLevelUpWindowsSkin
 * @desc レベルアップメインウィンドウのウィンドウスキンを指定します。
 * @text レベルアップメインウィンドウのスキン
 * @type file
 * @dir img/system
 * @default 
 * @parent LevelUpWindowSetting
 * 
 * @param LevelUpActorStatus
 * @text レベルアップ表示設定
 * @default ------------------------------
 * 
 * @param LevelUpActorParam
 * @text レベルアップステータスの表示設定
 * @desc レベルアップステータス表示設定。
 * @default ["{\"StatusParamDate\":\"21\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"SystemNameColor\":\"16\",\"DetaEval\":\"\",\"FontSize\":\"0\",\"DifferenceVisible\":\"true\"}","{\"StatusParamDate\":\"33\",\"X_Position\":\"1\",\"Y_Position\":\"5\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"SystemNameColor\":\"16\",\"DetaEval\":\"\",\"FontSize\":\"0\",\"DifferenceVisible\":\"true\"}","{\"StatusParamDate\":\"2\",\"X_Position\":\"1\",\"Y_Position\":\"6\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"SystemNameColor\":\"16\",\"DetaEval\":\"\",\"FontSize\":\"0\",\"DifferenceVisible\":\"true\"}","{\"StatusParamDate\":\"3\",\"X_Position\":\"1\",\"Y_Position\":\"7\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"SystemNameColor\":\"16\",\"DetaEval\":\"\",\"FontSize\":\"0\",\"DifferenceVisible\":\"true\"}","{\"StatusParamDate\":\"4\",\"X_Position\":\"1\",\"Y_Position\":\"8\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"SystemNameColor\":\"16\",\"DetaEval\":\"\",\"FontSize\":\"0\",\"DifferenceVisible\":\"true\"}","{\"StatusParamDate\":\"5\",\"X_Position\":\"1\",\"Y_Position\":\"9\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"SystemNameColor\":\"16\",\"DetaEval\":\"\",\"FontSize\":\"0\",\"DifferenceVisible\":\"true\"}","{\"StatusParamDate\":\"6\",\"X_Position\":\"1\",\"Y_Position\":\"10\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"SystemNameColor\":\"16\",\"DetaEval\":\"\",\"FontSize\":\"0\",\"DifferenceVisible\":\"true\"}","{\"StatusParamDate\":\"7\",\"X_Position\":\"1\",\"Y_Position\":\"11\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"SystemNameColor\":\"16\",\"DetaEval\":\"\",\"FontSize\":\"0\",\"DifferenceVisible\":\"true\"}","{\"StatusParamDate\":\"30\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"160\",\"Y_Coordinate\":\"0\",\"ItemWidth\":\"0\",\"SystemItemWidth\":\"0\",\"ParamName\":\"\",\"SystemNameColor\":\"16\",\"DetaEval\":\"\",\"FontSize\":\"0\",\"DifferenceVisible\":\"true\"}"]
 * @type struct<LevelUpActorParamList>[]
 * @parent LevelUpActorStatus
 * 
 * @param LevelUpActorWindowVisible
 * @text ウィンドウ表示
 * @desc ウィンドウを表示します。
 * @type boolean
 * @default false
 * @parent LevelUpActorStatus
 * 
 * @param LevelUpActorWidth
 * @desc レベルアップステータスの横幅。(0でウィンドウ横幅/2)
 * @text レベルアップステータス横幅
 * @type number
 * @default 0
 * @min 0
 * @parent LevelUpActorStatus
 * 
 * @param LevelUpActorHeight
 * @desc レベルアップステータスの縦幅。(0でウィンドウ縦幅)
 * @text レベルアップステータス縦幅
 * @type number
 * @default 0
 * @min 0
 * @parent LevelUpActorStatus
 * 
 * @param LevelUpActorWindow_X
 * @desc レベルアップステータスのX座標。
 * @text レベルアップステータスX座標
 * @type number
 * @default 0
 * @min -9999
 * @parent LevelUpActorStatus
 * 
 * @param LevelUpActorWindow_Y
 * @desc レベルアップステータスのY座標。
 * @text レベルアップステータスY座標
 * @type number
 * @default 0
 * @min -9999
 * @parent LevelUpActorStatus
 * 
 * @param LevelUpActorCols
 * @desc レベルアップステータスの表示列
 * @text レベルアップステータス表示列
 * @type number
 * @default 1
 * @min 1
 * @parent LevelUpActorStatus
 * 
 * @param LevelUpActorContentsHeight
 * @desc レベルアップステータスの項目高さ。
 * @text レベルアップステータス項目高さ
 * @type number
 * @default 36
 * @min -9999
 * @parent LevelUpActorStatus
 * 
 * @param DifferenceStatusColor
 * @desc レベルアップした後のステータスが上昇した時の数値の色(システムカラーまたはカラーコード)
 * @text レベルアップ後ステータス数値色
 * @type number
 * @default 24
 * @parent LevelUpActorStatus
 * 
 * @param DifferenceLevelColor
 * @desc レベルアップした後のレベルが上がった時の数値の色(システムカラーまたはカラーコード)
 * @text レベルアップ後レベル数値色
 * @type number
 * @default 17
 * @parent LevelUpActorStatus
 * 
 * @param LevelUpActorStatusWindowsSkin
 * @desc レベルアップステータスウィンドウのウィンドウスキンを指定します。
 * @text レベルアップステータスウィンドウのスキン
 * @type file
 * @dir img/system
 * @default 
 * @parent LevelUpActorStatus
 * 
 * @param LearnSkillWindow
 * @text 習得スキル表示設定
 * @default ------------------------------
 * 
 * @param LearnSkillParam
 * @text 習得スキルの表示設定
 * @desc 習得スキル表示設定。
 * @default ["{\"LearnSkillParamData\":\"1\",\"X_Position\":\"1\",\"Y_Position\":\"1\",\"X_Coordinate\":\"0\",\"Y_Coordinate\":\"0\",\"ParamName\":\"習得スキル\",\"SystemNameColor\":\"16\",\"FontSize\":\"0\",\"ItemCols\":\"1\"}"]
 * @type struct<LearnSkillParamList>[]
 * @parent LearnSkillWindow
 * 
 * @param LearnSkillWindowVisible
 * @text ウィンドウ表示
 * @desc ウィンドウを表示します。
 * @type boolean
 * @default false
 * @parent LearnSkillWindow
 * 
 * @param LearnSkillWidth
 * @desc 習得スキルの横幅。(0でウィンドウ横幅/2)
 * @text 習得スキル横幅
 * @type number
 * @default 0
 * @min 0
 * @parent LearnSkillWindow
 * 
 * @param LearnSkillHeight
 * @desc 習得スキルの縦幅。(0でウィンドウ縦幅)
 * @text 習得スキル縦幅
 * @type number
 * @default 0
 * @min 0
 * @parent LearnSkillWindow
 * 
 * @param LearnSkillWindow_X
 * @desc 習得スキルのX座標。
 * @text 習得スキルX座標
 * @type number
 * @default 404
 * @min -9999
 * @parent LearnSkillWindow
 * 
 * @param LearnSkillWindow_Y
 * @desc 習得スキルのY座標。
 * @text 習得スキルY座標
 * @type number
 * @default 144
 * @min -9999
 * @parent LearnSkillWindow
 * 
 * @param LearnSkillCols
 * @desc 習得スキルの表示列
 * @text 習得スキル表示列
 * @type number
 * @default 1
 * @min 1
 * @parent LearnSkillWindow
 * 
 * @param LearnSkillRows
 * @desc 習得スキルウィンドウの表示行（0でウィンドウ下まで）
 * @text 習得スキル表示行
 * @type number
 * @default 0
 * @parent LearnSkillWindow
 * 
 * @param LearnSkillContentsHeight
 * @desc 習得スキルの項目高さ。
 * @text 習得スキル項目高さ
 * @type number
 * @default 36
 * @min 0
 * @parent LearnSkillWindow
 * 
 * @param LearnSkillWindowsSkin
 * @desc 習得スキルウィンドウのウィンドウスキンを指定します。
 * @text 習得スキルウィンドウのスキン
 * @type file
 * @dir img/system
 * @default 
 * @parent LearnSkillWindow
 * 
 * @param ActorImg
 * @text アクター画像設定
 * @default ------------------------------
 * 
 * @param ButlerActors
 * @text 表示アクター設定
 * @desc 画像を表示するアクターを指定します。
 * @type struct<ActorButlerList>[]
 * @default []
 * @parent ActorImg
 * 
 * @param ActorPictureData
 * @text 立ち絵表示EX用画像設定
 * @desc 立ち絵表示EXでのアクターの画像設定
 * @default []
 * @type struct<ActorPictureDataList>[]
 * @parent ActorImg
 * 
 * @param ActorPictureEXApp
 * @text 立ち絵表示EX適用
 * @desc 立ち絵表示EXの画像変更を適用します。OFFにした場合はこのプラグインでの設定が適用されます。
 * @type boolean
 * @default true
 * @parent ActorImg
 * 
 * @param ButlerActors_X
 * @desc アクター画像のX座標。
 * @text アクター画像X座標
 * @type number
 * @default 0
 * @min -9999
 * @parent ActorImg
 * 
 * @param ButlerActors_Y
 * @desc アクター画像のY座標。
 * @text アクター画像Y座標
 * @type number
 * @default 0
 * @min -9999
 * @parent ActorImg
 * 
 * @param LevelUpActorArea
 * @desc レベルアップ時に表示されるアクターの表示範囲。
 * @text アクター表示範囲
 * @type select
 * @option ウィンドウ表示範囲内
 * @value 'window'
 * @option UI表示内
 * @value 'ui'
 * @option 画面内
 * @value 'screen'
 * @default 'window'
 * @parent ActorImg
 * 
 * @param ActorPosition
 * @text 立ち絵表示位置
 * @desc 立ち絵の表示位置を指定します
 * @type select
 * @option 左
 * @value 'left'
 * @option 中央
 * @value 'center'
 * @option 右
 * @value 'right'
 * @default 'right'
 * @parent ActorImg
 * 
 * @param SESetting
 * @text レベルアップSE設定
 * @default ------------------------------
 * 
 * @param LevelUpSe
 * @text レベルアップ時のSE
 * @desc レベルアップ時のSEを指定します。
 * @type file
 * @dir audio/se
 * @parent SESetting
 * 
 * @param volume
 * @text SEの音量
 * @desc SEを音量を設定します。
 * @default 90
 * @parent SESetting
 * @min 0
 * 
 * @param pitch
 * @text SEのピッチ
 * @desc SEをピッチを設定します。
 * @default 100
 * @parent SESetting
 * 
 * @param pan
 * @text SEの位相
 * @desc SEを位相を設定します。
 * @default 0
 * @parent SESetting
 * 
 * @param BGMSetting
 * @text 戦闘勝利BGM設定
 * @default ------------------------------
 * 
 * @param VictoryBGM
 * @text 戦闘勝利のBGM
 * @desc 戦闘勝利のBGMを指定します。
 * @type file
 * @dir audio/bgm
 * @parent BGMSetting
 * 
 * @param VictoryVolume
 * @text BGMの音量
 * @desc BGMを音量を設定します。
 * @default 90
 * @parent BGMSetting
 * @min 0
 * 
 * @param VictoryPitch
 * @text BGMのピッチ
 * @desc BGMをピッチを設定します。
 * @default 100
 * @parent BGMSetting
 * 
 * @param VictoryPan
 * @text BGMの位相
 * @desc BGMを位相を設定します。
 * @default 0
 * @parent BGMSetting
 * 
 * @param ExternalPluginSetting
 * @text 外部プラグイン設定
 * @default ------------------------------
 * 
 * @param ShowSupportActor
 * @text サポートアクター表示
 * @desc サポートアクターを表示します。(要NUUN_SupportActor)
 * @type boolean
 * @default true
 * @parent ExternalPluginSetting
 * 
 * 
 * @command LevelUP_SESelect
 * @desc レベルアップ時のSEを変更します。
 * @text レベルアップSEの変更
 * 
 * @arg LevelUP_SE
 * @text レベルアップSE
 * @desc レベルアップSEを指定します。何も指定しないことでMEが初期化されます。
 * @type file
 * @dir audio/se
 * 
 * @arg Volume
 * @text SEの音量
 * @desc SEを音量を設定します。
 * @default 90
 * 
 * @arg Pitch
 * @text SEのピッチ
 * @desc SEをピッチを設定します。
 * @default 100
 * 
 * @arg Pan
 * @text SEの位相
 * @desc SEを位相を設定します。
 * @default 0
 * 
 * @command VictoryBGM
 * @desc 勝利BGMの再生の許可を変更します。
 * @text 勝利BGM再生許可
 * 
 * @arg VictoryBGMEnable
 * @type boolean
 * @default true
 * @desc 勝利BGMの再生の許可します。
 * @text 勝利BGMの再生の許可
 * 
 * 
 * @command VictoryBGMSelect
 * @desc 勝利BGMを変更します。
 * @text 勝利BGMの変更
 * 
 * @arg _BGM
 * @text 勝利BGM
 * @desc 勝利BGMを変更します。何も指定しないことでBGMが初期化されます。
 * @type file
 * @dir audio/bgm
 * 
 * @arg Volume
 * @text BGMの音量
 * @desc BGMを音量を設定します。
 * @default 90
 * 
 * @arg Pitch
 * @text BGMのピッチ
 * @desc BGMをピッチを設定します。
 * @default 100
 * 
 * @arg Pan
 * @text BGMの位相
 * @desc BGMを位相を設定します。
 * @default 0
 * 
 * @arg NoVictoryME
 * @type boolean
 * @default false
 * @text 勝利ME再生なし
 * @desc 勝利MEを再生しません。
 * 
 * @command LevelUpPage
 * @desc レベルアップ画面の表示を許可を変更します。
 * @text レベルアップ画面表示許可
 * 
 * @arg LevelUpPageEnable
 * @type boolean
 * @default true
 * @desc レベルアップ画面の表示を許可します。(このプラグインコマンドを実行後レベルアップ画面表示の設定が無効化されます）
 * @text レベルアップ画面表示許可
 * 
 * @command ChangeActorImg
 * @desc レベルアップ画面のアクター画像を変更します。
 * @text レベルアップ画面アクター画像変更
 * 
 * @arg actorId
 * @type actor
 * @default 0
 * @desc アクターを指定します。
 * @text アクターID
 * 
 * @arg ChangeActorImgId
 * @type number
 * @default 1
 * @min 1
 * @desc 変更する立ち絵のIDを指定します。
 * @text 立ち絵ID
 * 
 */
/*~struct~ActorExpList:
 * 
 * @param DateSelect
 * @text 表示するステータス
 * @desc 表示するステータスを指定します。
 * @type select
 * @option なし
 * @value 0
 * @option キャラチップ(1)(2)
 * @value 1
 * @option 顔グラ(1)(2)
 * @value 2
 * @option SVアクター(1)(2)
 * @value 3
 * @option アクター名(1)(2)(3)(8)
 * @value 10
 * @option レベル(1)(2)(3)(4)(5)(6)(8)
 * @value 11
 * @option 入手経験値(1)(2)(3)(4)(5)(6)(8)
 * @value 12
 * @option 経験値ゲージ(1)(2)(3)(5)
 * @value 20
 * @option 任意パラメータ(1)(2)(3)(4)(5)(6)(7)(8)
 * @value 21
 * @option レベルアップ表示(1)(2)(5)(8)
 * @value 30
 * @option ライン(1)(2)(3)(6)
 * @value 1000
 * @default 0
 * 
 * @param X_Coordinate
 * @text X座標（相対）(1)
 * @desc X座標（相対座標）
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param Y_Coordinate
 * @text Y座標（相対）(2)
 * @desc Y座標（相対座標）
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param ItemWidth
 * @desc 項目横幅（0でデフォルト幅）
 * @text 項目横幅(3)
 * @type number
 * @default 0
 * @min 0
 * 
 * @param SystemItemWidth
 * @desc システム項目の横幅（0でデフォルト幅）
 * @text システム項目横幅(4)
 * @type number
 * @default 0
 * @min 0
 * 
 * @param ParamName
 * @desc 項目の名称を設定します。
 * @text 名称(5)
 * @type string
 * @default
 * 
 * @param SystemNameColor
 * @desc システム項目の文字色。テキストタブでカラーコードを入力できます。
 * @text システム項目文字色(6)
 * @type number
 * @default 16
 * @min 0
 * 
 * @param DetaEval
 * @desc 評価式または文字列を記入します。
 * @text 評価式or文字列(7)
 * @type combo
 * @default 
 * 
 * @param FontSize
 * @desc フォントサイズ（メインフォントからの差）
 * @text フォントサイズ(8)
 * @type number
 * @default 0
 * @min -99
 * 
 * @param textMethod
 * @desc タグ名
 * @text タグ名(9)
 * @type string
 * @default 
 *  
 */
/*~struct~GainParamList:
 * 
 * @param GainParamData
 * @text 表示項目
 * @desc 表示項目を指定します。
 * @type select
 * @option 表示なし
 * @value 0
 * @option 獲得金額
 * @value 1
 * @option 獲得経験値
 * @value 2
 * @option 任意パラメータ
 * @value 10
 * @option ライン
 * @value 1000
 * @default 0
 * 
 * @param Y_Position
 * @desc Y表示行位置
 * @text Y表示行位置(1)
 * @type number
 * @default 1
 * @min 1
 * @max 99
 * 
 * @param X_Coordinate
 * @text X座標（相対）(2)
 * @desc X座標（相対座標）
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param Y_Coordinate
 * @text Y座標（相対）(3)
 * @desc Y座標（相対座標）
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param ItemWidth
 * @desc 項目横幅（0でデフォルト幅）
 * @text 項目横幅(4)
 * @type number
 * @default 0
 * @min 0
 * 
 * @param SystemItemWidth
 * @desc システム項目の横幅（0でデフォルト幅）
 * @text システム項目横幅(5)
 * @type number
 * @default 0
 * @min 0
 * 
 * @param ParamName
 * @desc 項目の名称を設定します。
 * @text 名称(6)
 * @type string
 * @default
 * 
 * @param SystemNameColor
 * @desc システム項目の文字色。テキストタブでカラーコードを入力できます。
 * @text システム項目文字色(7)
 * @type number
 * @default 16
 * @min 0
 * 
 * @param DetaEval
 * @desc 評価式または文字列を記入します。
 * @text 評価式or文字列(9)
 * @type combo
 * @default 
 * 
 * @param FontSize
 * @desc フォントサイズ（メインフォントからの差）
 * @text フォントサイズ(9)
 * @type number
 * @default 0
 * @min -99
 * 
 */
/*~struct~GetItemParamList:
 * 
 * @param GetItemParamData
 * @text 表示項目
 * @desc 表示項目を指定します。
 * @type select
 * @option 表示なし
 * @value 0
 * @option 入手アイテム(1)(2)(3)(4)(5)(6)(7)(8)(9)
 * @value 1
 * @option 盗んだアイテム(1)(2)(3)(4)(5)(6)(7)(8)(9)
 * @value 2
 * @option 入手アイテム名称のみ(1)(2)(3)(4)(5)(6)(7)
 * @value 10
 * @option 盗んだアイテム名称のみ(1)(2)(3)(4)(5)(6)(7)
 * @value 11
 * @option ライン(1)(2)(3)(4)(6)(8)
 * @value 1000
 * @default 0
 * 
 * @param X_Position
 * @desc X表示行位置
 * @text X表示行位置(1)
 * @type number
 * @default 1
 * @min 1
 * @max 2
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
 * @desc X座標（相対座標）
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param Y_Coordinate
 * @text Y座標（相対）(4)
 * @desc Y座標（相対座標）
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param ParamName
 * @desc 項目の名称を設定します。空白の場合は名称が表示されません。
 * @text 名称(5)
 * @type string
 * @default
 * 
 * @param SystemNameColor
 * @desc システム項目の文字色。テキストタブでカラーコードを入力できます。
 * @text システム項目文字色(6)
 * @type number
 * @default 16
 * @min 0
 * 
 * @param FontSize
 * @desc フォントサイズ（メインフォントからの差）
 * @text フォントサイズ(7)
 * @type number
 * @default 0
 * @min -99
 * 
 * @param ItemCols
 * @desc 列数
 * @text 列数(8)
 * @type number
 * @default 1
 * @min 1
 * 
 * @param ItemRows
 * @desc 行数
 * @text 行数(9)
 * @type number
 * @default 0
 * @min 0
 * 
 */
/*~struct~LevelUpActorParamList:
 * 
 * @param StatusParamDate
 * @text 表示項目
 * @desc 表示項目を指定します。
 * @type select
 * @option HP(1)(2)(3)(4)(5)(6)(8)(10)(11)
 * @value 0
 * @option MP(1)(2)(3)(4)(5)(6)(8)(10)(11)
 * @value 1
 * @option 攻撃力(1)(2)(3)(4)(6)(5)(8)(10)(11)
 * @value 2
 * @option 防御力(1)(2)(3)(4)(6)(5)(8)(10)(11)
 * @value 3
 * @option 魔法力(1)(2)(3)(4)(6)(5)(8)(10)(11)
 * @value 4
 * @option 魔法防御(1)(2)(3)(4)(5)(6)(8)(10)(11)
 * @value 5
 * @option 敏捷性(1)(2)(3)(4)(5)(6)(8)(10)(11)
 * @value 6
 * @option 運(1)(2)(3)(4)(5)(6)(8)(10)(11)
 * @value 7
 * @option HP(装備補正等なし)(1)(2)(3)(4)(5)(6)(8)(10)(11)
 * @value 10
 * @option MP(装備補正等なし)(1)(2)(3)(4)(5)(6)(8)(10)(11)
 * @value 11
 * @option 攻撃力(装備補正等なし)(1)(2)(3)(4)(6)(5)(8)(10)(11)
 * @value 12
 * @option 防御力(装備補正等なし)(1)(2)(3)(4)(6)(5)(8)(10)(11)
 * @value 13
 * @option 魔法力(装備補正等なし)(1)(2)(3)(4)(6)(5)(8)(10)(11)
 * @value 14
 * @option 魔法防御(装備補正等なし)(1)(2)(3)(4)(5)(6)(8)(10)(11)
 * @value 15
 * @option 敏捷性(装備補正等なし)(1)(2)(3)(4)(5)(6)(8)(10)(11)
 * @value 16
 * @option 運(装備補正等なし)(1)(2)(3)(4)(5)(6)(8)(10)(11)
 * @value 17
 * @option キャラチップ(1)(2)(3)(4)
 * @value 20
 * @option 顔グラ(1)(2)(3)(4)
 * @value 21
 * @option SVアクター(1)(2)(3)(4)
 * @value 22
 * @option アクター名(1)(2)(3)(4)(5)(10)
 * @value 30
 * @option 職業(1)(2)(3)(4)(5)(10)
 * @value 31
 * @option 二つ名(ニックネーム)(1)(2)(3)(4)(5)(10)
 * @value 32
 * @option レベル(1)(2)(3)(4)(5)(6)(8)(10)(11)
 * @value 33
 * @option オリジナルパラメータ(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(11)
 * @value 40
 * @option ライン(1)(2)(3)(4)(5)(8)
 * @value 1000
 * @default 0
 * 
 * @param X_Position
 * @desc X表示行位置
 * @text X表示行位置(1)
 * @type number
 * @default 1
 * @min 1
 * @max 2
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
 * @desc X座標（相対座標）
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param Y_Coordinate
 * @text Y座標（相対）(4)
 * @desc Y座標（相対座標）
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
 * @param ParamName
 * @desc 項目の名称を設定します。
 * @text 名称(7)
 * @type string
 * @default
 * 
 * @param SystemNameColor
 * @desc システム項目の文字色。テキストタブでカラーコードを入力できます。
 * @text システム項目文字色(8)
 * @type number
 * @default 16
 * @min 0
 * 
 * @param DetaEval
 * @desc 評価式または文字列を記入します。
 * @text 評価式or文字列(9)
 * @type combo
 * @default 
 * 
 * @param FontSize
 * @desc フォントサイズ（メインフォントからの差）
 * @text フォントサイズ(10)
 * @type number
 * @default 0
 * @min -99
 * 
 * @param DifferenceVisible
 * @type boolean
 * @default true
 * @text 差分表示(11)
 * @desc 差分を表示します。
 *  
 */
/*~struct~LearnSkillParamList:
 * 
 * @param LearnSkillParamData
 * @text 表示項目
 * @desc 表示項目を指定します。
 * @type select
 * @option 表示なし
 * @value 0
 * @option 習得スキル(1)(2)(3)(4)(5)(6)(7)(8)(9)
 * @value 1
 * @option 習得スキル名称のみ(1)(2)(3)(4)(5)(6)(7)
 * @value 10
 * @option ライン(1)(2)(3)(4)(6)(8)
 * @value 1000
 * @default 0
 * 
 * @param X_Position
 * @desc X表示行位置
 * @text XS表示行位置(1)
 * @type number
 * @default 1
 * @min 1
 * @max 2
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
 * @desc X座標（相対座標）
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param Y_Coordinate
 * @text Y座標（相対）(4)
 * @desc Y座標（相対座標）
 * @type number
 * @default 0
 * @max 9999
 * @min -9999
 * 
 * @param ParamName
 * @desc 項目の名称を設定します。空白の場合は名称が表示されません。
 * @text 名称(5)
 * @type string
 * @default
 * 
 * @param SystemNameColor
 * @desc システム項目の文字色。テキストタブでカラーコードを入力できます。
 * @text システム項目文字色(6)
 * @type number
 * @default 16
 * @min 0
 * 
 * @param FontSize
 * @desc フォントサイズ（メインフォントからの差）
 * @text フォントサイズ(7)
 * @type number
 * @default 0
 * @min -99
 * 
 * @param ItemCols
 * @desc 列数
 * @text 列数(8)
 * @type number
 * @default 1
 * @min 1
 * 
 * @param ItemRows
 * @desc 行数
 * @text 行数(9)
 * @type number
 * @default 0
 * @min 0
 * 
 */
/*~struct~ActorButlerList:
 * 
 * @param actorId
 * @text アクター
 * @desc アクターを指定します。
 * @type actor
 * 
 * @param ActorImg
 * @text アクター画像
 * @desc アクターの画像を表示します。
 * @type file[]
 * @dir img/
 * @default ["{\"actorId\":\"0\",\"ActorImg\":\"[\\\"pictures\\\"]\",\"Actor_X\":\"0\",\"Actor_Y\":\"0\",\"Actor_Scale\":\"100\"}"]
 * 
 * @param Actor_X
 * @desc 画像の表示位置X座標。
 * @text 画像表示位置X座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param Actor_Y
 * @desc 画像の表示位置Y座標。
 * @text 画像表示位置Y座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param Actor_Scale
 * @desc 画像の拡大率。
 * @text 画像拡大率
 * @type number
 * @default 100
 * @min 0
 * @max 999
 * 
 * @param LevelUpActorBackGroundImg
 * @desc レベルアップ時のアクター毎の背景画像ファイル名を指定します。
 * @text 背景画像
 * @type file
 * @dir img/
 * @default 
 *  
 */
/*~struct~ActorPictureDataList:
 * 
 * @param actorId
 * @text アクター
 * @desc アクターを指定します。
 * @type actor
 * 
 * @param Actor_X
 * @desc 画像のX座標。
 * @text 画像X座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param Actor_Y
 * @desc 画像のY座標。
 * @text 画像Y座標
 * @type number
 * @default 0
 * @min -9999
 * @max 9999
 * 
 * @param Actor_Scale
 * @desc 画像の拡大率。
 * @text 画像拡大率
 * @type number
 * @default 100
 * @min 0
 * @max 999
 * 
 * @param LevelUpActorBackGroundImg
 * @desc レベルアップ時のアクター毎の背景画像ファイル名を指定します。
 * @text 背景画像
 * @type file
 * @dir img/
 * @default 
 * 
 */
var Imported = Imported || {};
Imported.NUUN_Result = true;

(() => {
const parameters = PluginManager.parameters('NUUN_Result');
const Decimal = Number(parameters['Decimal'] || 0);
const DecimalMode = Number(parameters['DecimalMode'] || 0);
const ResultVisibleFrame = Number(parameters['ResultVisibleFrame'] || 0);
const ResultFadein = eval(parameters['ResultFadein'] || 'false');
const PartyPageRefreshFrame = Number(parameters['PartyPageRefreshFrame'] || 0);
const ResultWindowCenter = eval(parameters['ResultWindowCenter'] || 'true');
const CloseActorStatusWindow = eval(parameters['CloseActorStatusWindow'] || 'false');
const NoTouchUIWindow = eval(parameters['NoTouchUIWindow'] || 'false');
const BackUiWidth = eval(parameters['BackUiWidth'] || 'true');
const BackFitWidth = eval(parameters['BackFitWidth'] || 'false');
const ButtonPosition = eval(parameters['ButtonPosition']) || "right";
const ResultButton_X = Number(parameters['ResultButton_X'] || 0);
const ResultButton_Y = Number(parameters['ResultButton_Y'] || 0);
const HelpWindowVisible = eval(parameters['HelpWindowVisible'] || 'true');
const ResultHelpWindowVisible = eval(parameters['ResultHelpWindowVisible'] || 'true');
const ResultTextPosition = eval(parameters['ResultTextPosition']) || 'center';
const ResultName = String(parameters['ResultName'] || '戦闘結果');
const ResultHelpWidth = Number(parameters['ResultHelpWidth'] || 0);
const ResultHelpWindow_X = Number(parameters['ResultHelpWindow_X'] || 0);
const ResultHelpWindow_Y = Number(parameters['ResultHelpWindow_Y'] || 0);
const ResultHelpWindowsSkin = String(parameters['ResultHelpWindowsSkin']);
const LevelUpHelpWindowVisible = eval(parameters['LevelUpHelpWindowVisible'] || 'true');
const LevelUpResultTextPosition = eval(parameters['LevelUpResultTextPosition']) || "TextEx";
const LevelUpResultHelpName = String(parameters['LevelUpResultHelpName'] || '%1は\c[16]レベル\c[17]%2\c[0]に上がった！');
const LevelUpResultHelpWindowsSkin = String(parameters['LevelUpResultHelpWindowsSkin']);
const LevelUpResultHelpWidth = Number(parameters['LevelUpResultHelpWidth'] || 0);
const LevelUpResultHelpWindow_X = Number(parameters['LevelUpResultHelpWindow_X'] || 0);
const LevelUpResultHelpWindow_Y = Number(parameters['LevelUpResultHelpWindow_Y'] || 0);
const ResultLevelUpHelpWindowVisible = eval(parameters['ResultLevelUpHelpWindowVisible'] || 'true');
const ResultWindowPosition = eval(parameters['ResultWindowPosition']) || "help";
const ResultWidth = Number(parameters['ResultWidth'] || 0);
const ResultHeight = Number(parameters['ResultHeight'] || 616);
const ResultWindow_X = Number(parameters['ResultWindow_X'] || 0);
const ResultWindow_Y = Number(parameters['ResultWindow_Y'] || 0);
const GetWindowsSkin = String(parameters['GetWindowsSkin']);
const ReserveMembers = eval(parameters['ReserveMembers'] || 'false');
const ActorCols = Number(parameters['ActorCols'] || 1);
const DefaultActorVisible = Number(parameters['DefaultActorVisible'] || 4);
const ResultActorLessThanSize = eval(parameters['ResultActorLessThanSize'] || 'false');
const ResultActorAutoSize = eval(parameters['ResultActorAutoSize'] || 'false');
const EXPResistContentsBackVisible = eval(parameters['EXPResistContentsBackVisible'] || 'true');
const EXPResistContentsBackGroundImg = String(parameters['EXPResistContentsBackGroundImg']);
const ActorExpWidth = Number(parameters['ActorExpWidth'] || 0);
const ActorExpHeight = Number(parameters['ActorExpHeight'] || 0);
const ActorExpWindow_X = Number(parameters['ActorExpWindow_X'] || 0);
const ActorExpWindow_Y = Number(parameters['ActorExpWindow_Y'] || 0);
const GaugeValueY = Number(parameters['GaugeValueY'] || 0);
const GaugeMaxValueY = Number(parameters['GaugeMaxValueY'] || 0);
const SeparationY = Number(parameters['SeparationY'] || 0);
const EXPResistWindowsSkin = String(parameters['EXPResistWindowsSkin']);
const ActorExpDataList = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ActorExpDataList'])) : [];
const ActorFaceHeight = Number(parameters['ActorFaceHeight'] || 144);
const LevelUpActorFaceHeight = Number(parameters['LevelUpActorFaceHeight'] || 144);
const LevelUpNameColor = (DataManager.nuun_structureData(parameters['LevelUpNameColor'])) || 17;
const LevelUpValueColor = (DataManager.nuun_structureData(parameters['LevelUpValueColor'])) || 17;
const EXPBoostValueColor = (DataManager.nuun_structureData(parameters['EXPBoostValueColor'])) || 0;
const EXPResistValueColor = (DataManager.nuun_structureData(parameters['EXPResistValueColor'])) || 0;
const GaugeValueShow = eval(parameters['GaugeValueShow']) || 1;
const Gauge_Width = Number(parameters['Gauge_Width'] || 300);
const Gauge_Height = Number(parameters['Gauge_Height'] || 12);
const GaugeRefreshFrame = Number(parameters['GaugeRefreshFrame'] || 100);
const GaugeValueFontSize = Number(parameters['GaugeValueFontSize'] || 0);
const GaugeMaxValueFontSize = Number(parameters['GaugeMaxValueFontSize'] || 0);
const GainParam = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['GainParam'])) : [];
const GetInfoWidth = Number(parameters['GetInfoWidth'] || 0);
const GetInfoHeight = Number(parameters['GetInfoHeight'] || 0);
const GetInfoWindow_X = Number(parameters['GetInfoWindow_X'] || 0);
const GetInfoWindow_Y = Number(parameters['GetInfoWindow_Y'] || 0);
const GetInfoWindowsSkin = String(parameters['GetInfoWindowsSkin']);
const GetInfoContentsHeight = Number(parameters['GetInfoContentsHeight'] || 36);
const GetItemParam = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['GetItemParam'])) : [];
const GetItemWidth = Number(parameters['GetItemWidth'] || 0);
const GetItemHeight = Number(parameters['GetItemHeight'] || 0);
const GetItemWindow_X = Number(parameters['GetItemWindow_X'] || 0);
const GetItemWindow_Y = Number(parameters['GetItemWindow_Y'] || 0);
const GetItemWindowsSkin = String(parameters['GetItemWindowsSkin']);
const DropItemContentsHeight = Number(parameters['DropItemContentsHeight'] || 36);
const DropItemRows = Number(parameters['DropItemRows'] || 0);
const DropItemNumVisible = eval(parameters['DropItemNumVisible'] || 'true');
const DropItemNumx = String(parameters['DropItemNumx'] || 'x');
const DropItemMaxCols = Number(parameters['DropItemMaxCols'] || 0);
const StealItemVisible = eval(parameters['StealItemVisible'] || 'false');
const StealItemNumVisible = eval(parameters['StealItemNumVisible'] || 'false');
const StealItemNumx = String(parameters['StealItemNumx'] || 'x');
const ResultLevelUpWindowPosition = eval(parameters['ResultLevelUpWindowPosition']) || "help";
const ResultLevelUpWidth = Number(parameters['ResultLevelUpWidth'] || 0);
const ResultLevelUpHeight = Number(parameters['ResultLevelUpHeight'] || 616);
const ResultLevelUpWindow_X = Number(parameters['ResultLevelUpWindow_X'] || 0);
const ResultLevelUpWindow_Y = Number(parameters['ResultLevelUpWindow_Y'] || 0);
const ResultLevelUpWindowsSkin = String(parameters['ResultLevelUpWindowsSkin']);
const LevelUpActorArea = eval(parameters['LevelUpActorArea']) || "window";
const LevelUpActorParam = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['LevelUpActorParam'])) : [];
const LevelUpActorWidth = Number(parameters['LevelUpActorWidth'] || 0);
const LevelUpActorHeight = Number(parameters['LevelUpActorHeight'] || 0);
const LevelUpActorWindow_X = Number(parameters['LevelUpActorWindow_X'] || 0);
const LevelUpActorWindow_Y = Number(parameters['LevelUpActorWindow_Y'] || 0);
const LevelUpActorStatusWindowsSkin = String(parameters['LevelUpActorStatusWindowsSkin']);
const LevelUpActorCols = Number(parameters['LevelUpActorCols'] || 1);
const DifferenceStatusColor = (DataManager.nuun_structureData(parameters['DifferenceStatusColor'])) || 24;
const DifferenceLevelColor = (DataManager.nuun_structureData(parameters['DifferenceLevelColor'])) || 17;
const LearnSkillWidth = Number(parameters['LearnSkillWidth'] || 0);
const LearnSkillHeight = Number(parameters['LearnSkillHeight'] || 0);
const LearnSkillWindow_X = Number(parameters['LearnSkillWindow_X'] || 0);
const LearnSkillWindow_Y = Number(parameters['LearnSkillWindow_Y'] || 0);
const LearnSkillWindowsSkin = String(parameters['LearnSkillWindowsSkin']);
const LearnSkillRows = Number(parameters['LearnSkillRows'] || 0);
const LearnSkillCols = Number(parameters['LearnSkillCols'] || 1);
const ResultWindowVisible = eval(parameters['ResultWindowVisible'] || 'true');
const ActorExpWindowVisible = eval(parameters['ActorExpWindowVisible'] || 'false');
const GetItemWindowVisible = eval(parameters['GetItemWindowVisible'] || 'false');
const GetInfoWindowVisible = eval(parameters['GetInfoWindowVisible'] || 'false');
const ResultLevelUpWindowVisible = eval(parameters['ResultLevelUpWindowVisible'] || 'true');
const LearnSkillParam = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['LearnSkillParam'])) : [];
const LevelUpActorWindowVisible = eval(parameters['LevelUpActorWindowVisible'] || 'false');
const LearnSkillWindowVisible = eval(parameters['LearnSkillWindowVisible'] || 'false');
const LearnSkillContentsHeight = Number(parameters['LearnSkillContentsHeight'] || 36);
const ButlerActors = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ButlerActors'])) : [];
const ActorPictureData = NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ActorPictureData'])) : [];
const ActorPictureEXApp = eval(parameters['ActorPictureEXApp'] || 'true');
const ButlerActors_X = Number(parameters['ButlerActors_X'] || 0);
const ButlerActors_Y = Number(parameters['ButlerActors_Y'] || 0);
const ActorPosition = eval(parameters['ActorPosition']) || "right";
const GetWindowBackGroundImg = String(parameters['GetWindowBackGroundImg']);
const LevelUpActorBackGroundImg = String(parameters['LevelUpActorBackGroundImg']);
const ShowSupportActor = eval(parameters['ShowSupportActor'] || 'true');
const LevelUpWindowShow = eval(parameters['LevelUpWindowShow'] || 'true');
const LevelUpSe = String(parameters['LevelUpSe']);
const volume = Number(parameters['volume'] || 90);
const pitch = Number(parameters['pitch'] || 100);
const pan = Number(parameters['pan'] || 0);
const VictoryBGM = String(parameters['VictoryBGM']);
const VictoryVolume = Number(parameters['VictoryVolume'] || 90);
const VictoryPitch = Number(parameters['VictoryPitch'] || 100);
const VictoryPan = Number(parameters['VictoryPan'] || 0);

let resultExpMaxWidth = 0;

const pluginName = "NUUN_Result";

PluginManager.registerCommand(pluginName, 'LevelUP_SESelect', args => {
  BattleManager.levelUpSeSelect(args);
});

PluginManager.registerCommand(pluginName, 'VictoryBGM', args => {
  BattleManager.victoryBGMEnable(eval(args.VictoryBGMEnable));
});

PluginManager.registerCommand(pluginName, 'VictoryBGMSelect', args => {
  BattleManager.victoryBGMSelect(args);
});

PluginManager.registerCommand(pluginName, 'LevelUpPage', args => {
  BattleManager.levelUpPageEnable(eval(args.LevelUpPageEnable));
});

PluginManager.registerCommand(pluginName, 'ChangeActorImg', args => {
  if ($gameActors._data[args.actorId]) {
    $gameActors._data[args.actorId].setResultActorImgId(args.ChangeActorImgId);
  }
});

    
const _Game_Actor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
  _Game_Actor_initMembers.call(this);
  this.resultLevelUp = false;
  this._learnSkill = [];
};

const _Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
  _Game_Actor_setup.call(this, actorId);
  this.initResultActorImg();
};

Game_Actor.prototype.initResultActorImg = function() {
  if (this.resultImgId === undefined) {
    this.resultImgId = 0;
  }
};

Game_Actor.prototype.setResultActorImgId = function(changeActorImgId) {
  this.resultImgId = Number(changeActorImgId) - 1;
};

Game_Actor.prototype.getResultActorImg = function(id) {
  this.initResultActorImg();
  const find = ButlerActors.find(actors => actors.actorId === id && actors.ActorImg);
  return find ? find.ActorImg[this.resultImgId] : null;
};

Game_Actor.prototype.getResultActorData = function(id) {
  this.initResultActorImg();
  return ButlerActors.find(actors => actors.actorId === id);
};

const _Game_Actor_requestMotionRefresh = Game_Actor.prototype.requestMotionRefresh;
Game_Actor.prototype.requestMotionRefresh = function() {
  if (!BattleManager._resultOn) {
    _Game_Actor_requestMotionRefresh.call(this);
  }
};

Game_Actor.prototype.resultGainExp = function(exp) {
  const newExp = Math.max(this.currentExp() + Math.round(exp * this.finalExpRate()), 0);
  let level = this._level;
  while (!this.resultIsMaxLevel(level) && newExp >= this.resultNextLevelExp(level)) {
    level++;
  }
  return level;
};

Game_Actor.prototype.resultIsMaxLevel = function(level) {
  return level >= this.maxLevel();
};

Game_Actor.prototype.resultNextLevelExp = function(level) {
  return this.expForLevel(level + 1);
};

const _Game_Actor_learnSkill = Game_Actor.prototype.learnSkill;
Game_Actor.prototype.learnSkill = function(skillId) {
  if (!this.isLearnedSkill(skillId) && this._learnSkill && BattleManager.resultMode) {
    this._learnSkill.push(skillId);
  }
  _Game_Actor_learnSkill.call(this, skillId);
};

const _Game_Actor_shouldDisplayLevelUp = Game_Actor.prototype.shouldDisplayLevelUp;
Game_Actor.prototype.shouldDisplayLevelUp = function() {
  return BattleManager.resultMode ? false : _Game_Actor_shouldDisplayLevelUp.call(this);
};

const _Game_Party_performVictory = Game_Party.prototype.performVictory;
Game_Party.prototype.performVictory = function() {
  if (!BattleManager._victoryStart) {
    _Game_Party_performVictory.call(this);
  }
};

Game_Party.prototype.resultMembers = function() {
  if (ReserveMembers) {
    return this.allMembers();
  } else {
    if (Imported.NUUN_SupportActor) {
      $gameParty.membersMode = true;
    }
    return this.battleMembers();
  }
};

Game_Party.prototype.resetLearnSkill = function() {
  for (const member of this.allMembers()) {
    member._learnSkill = [];
  }
};


const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
  _Scene_Battle_createAllWindows.call(this);
  this.createResultWindow();
};

Scene_Battle.prototype.createResultWindow = function() {
  this.createResultBackgroundSprite();
  this.createResultHelpWindow();
  this.createResultMainWindow();
  this.createResultActorExpWindow();
  this.createResultGetInfoWindow();
  this.createResultGetItemWindow();
  this.createResultLevelUpMainWindow();
  this.createResultLevelUpHelpWindow();
  this.createResultActorStatusWindow();
  this.createResultLearnSkillWindow();
  this.createResultButtons();
};

Scene_Battle.prototype.createResultBackgroundSprite = function() {
  const sprite = new Sprite();
  this.addChild(sprite);
  this.resultBackgroundSprite = sprite;
  sprite.hide();
};

Scene_Battle.prototype.createResultHelpWindow = function() {
  if (HelpWindowVisible) {
    const rect = this.resultHelpWindowRect();
    this._resultHelpWindow = new Window_ResultHelp(rect);
    this._resultHelpWindow.hide();
    this.addChild(this._resultHelpWindow);
    this._resultHelpWindow.setText(ResultName);
  } else {
    this._resultHelpWindow = null;
  }
};

Scene_Battle.prototype.createResultMainWindow = function() {
    const rect = this.resultWindowRect();
    this._resultWindow = new Window_Result(rect);
    this.addChild(this._resultWindow);
    this._resultWindow.setHandler("ok", this.onResultOk.bind(this));
    this._resultWindow.setHandler("cancel", this.onResultOk.bind(this));
    this._resultWindow.hide();
    this._resultWindow.setResultBackground(this.resultBackgroundSprite);
};

Scene_Battle.prototype.createResultActorExpWindow = function() {
    const rect = this.resultActorExpWindowRect();
    this._resultActorExpWindow = new Window_ResultActorExp(rect);
    this._resultActorExpWindow.hide();
    this.addChild(this._resultActorExpWindow);
};

Scene_Battle.prototype.createResultGetInfoWindow = function() {
  const rect = this.resultGetInfoWindowRect();
  this._resultGetInfoWindow = new Window_ResultGetInfo(rect);
  this._resultGetInfoWindow.hide();
  this.addChild(this._resultGetInfoWindow);
};

Scene_Battle.prototype.createResultGetItemWindow = function() {
  const rect = this.resultGetItemWindowRect();
  this._resultGetItemWindow = new Window_ResultGetItem(rect);
  this._resultGetItemWindow.hide();
  this.addChild(this._resultGetItemWindow);
};

Scene_Battle.prototype.createResultLevelUpHelpWindow = function() {
  if (LevelUpHelpWindowVisible) {
    const rect = this.resultLevelUpHelpWindowRect();
    this._resultLevelUpHelpWindow = new Window_ResultLevelUpHelp(rect);
    this.addChild(this._resultLevelUpHelpWindow);
    this._resultLevelUpHelpWindow.hide();
  } else {
    this._resultLevelUpHelpWindow = null;
  }
};

Scene_Battle.prototype.createResultLevelUpMainWindow = function() {
  const rect = this.resultLevelUpWindowRect();
  this._resultLevelUpMainWindow = new Window_ResultLevelUpMain(rect);
  this.addChild(this._resultLevelUpMainWindow);
  this._resultLevelUpMainWindow.setHandler("ok", this.onResultOk.bind(this));
  this._resultLevelUpMainWindow.setHandler("cancel", this.onResultOk.bind(this));
  this._resultLevelUpMainWindow.hide();
  this._resultLevelUpMainWindow.setResultBackground(this.resultBackgroundSprite);
};

Scene_Battle.prototype.createResultActorStatusWindow = function() {
  const rect = this.resultActorStatusWindowRect();
  this._resultActorStatusWindow = new Window_ResultActorStatus(rect);
  this.addChild(this._resultActorStatusWindow);
  this._resultActorStatusWindow.hide();
};

Scene_Battle.prototype.createResultLearnSkillWindow = function() {
  const rect = this.resultLearnSkillWindowRect();
  this._resultLearnSkillWindow = new Window_ResultLearnSkill(rect);
  this._resultLearnSkillWindow.hide();
  this.addChild(this._resultLearnSkillWindow);
};

Scene_Battle.prototype.resultHelpWindowRect = function() {
  const ww = ResultHelpWidth > 0 ? ResultHelpWidth : Graphics.boxWidth;
  const wx = (ResultWindowCenter ? (Graphics.width - ww) / 2 : (Graphics.width - Graphics.boxWidth) / 2) + ResultHelpWindow_X;
  const wy = this.resultHelpAreaTop() + ResultHelpWindow_Y + (Graphics.height - Graphics.boxHeight) / 2;
  const wh = this.resultHelpAreaHeight();
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.resultWindowRect = function() {
  const ww = ResultWidth > 0 ? ResultWidth : Graphics.boxWidth;
  const wx = (ResultWindowCenter ? (Graphics.width - ww) / 2 : (Graphics.width - Graphics.boxWidth) / 2) + ResultWindow_X;
  const wy = this.resultWindowY() + ResultWindow_Y;
  const wh = (ResultHeight > 0 ? ResultHeight : Graphics.boxHeight - wy);
  return new Rectangle(wx, wy + (Graphics.height - Graphics.boxHeight) / 2, ww, wh);
};

Scene_Battle.prototype.resultActorExpWindowRect = function() {
  const resultWindow = this._resultWindow;
  const wx = resultWindow.x + ActorExpWindow_X;
  const wy = resultWindow.y + ActorExpWindow_Y;
  const ww = ActorExpWidth > 0 ? ActorExpWidth : Math.floor(resultWindow.width * 0.6);
  const wh = ActorExpHeight > 0 ? ActorExpHeight : resultWindow.height;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.resultGetInfoWindowRect = function() {
  const resultWindow = this._resultWindow;
  const wx = resultWindow.x + GetInfoWindow_X;
  const wy = resultWindow.y + GetInfoWindow_Y;
  const ww = GetInfoWidth > 0 ? GetInfoWidth : Math.floor(resultWindow.width * 0.4);
  const wh = GetInfoHeight > 0 ? GetInfoHeight : Window_Selectable.prototype.resultGetInfoFittingHeight(GainParam.length);
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.resultGetItemWindowRect = function() {
  const resultWindow = this._resultWindow;
  const wx = resultWindow.x + GetItemWindow_X;
  const wy = resultWindow.y + GetItemWindow_Y;
  const ww = GetItemWidth > 0 ? GetItemWidth : Math.floor(resultWindow.width * 0.4);
  const wh = GetItemHeight > 0 ? GetItemHeight : this.getDropItemHeight(wx, wy);
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.resultLevelUpHelpWindowRect = function() {
  const ww = LevelUpResultHelpWidth > 0 ? LevelUpResultHelpWidth : Graphics.boxWidth;
  const wx = (ResultWindowCenter ? (Graphics.width - ww) / 2 : (Graphics.width - Graphics.boxWidth) / 2) + LevelUpResultHelpWindow_X;
  const wy = this.resultHelpAreaTop() + LevelUpResultHelpWindow_Y + (Graphics.height - Graphics.boxHeight) / 2;
  const wh = this.resultHelpAreaHeight();
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.resultLevelUpWindowRect = function() {
  const ww = ResultLevelUpWidth > 0 ? ResultLevelUpWidth : Graphics.boxWidth;
  const wx = (ResultWindowCenter ? (Graphics.width - ww) / 2 : (Graphics.width - Graphics.boxWidth) / 2) + ResultLevelUpWindow_X;
  const wy = this.resultLevelUpWindowY() + ResultLevelUpWindow_Y;
  const wh = ResultLevelUpHeight > 0 ? ResultLevelUpHeight : Graphics.boxHeight - wy;
  return new Rectangle(wx, wy + (Graphics.height - Graphics.boxHeight) / 2, ww, wh);
};

Scene_Battle.prototype.resultActorStatusWindowRect = function() {
  const resultWindow = this._resultLevelUpMainWindow;
  const wx = resultWindow.x + LevelUpActorWindow_X;
  const wy = resultWindow.y + LevelUpActorWindow_Y;
  const ww = LevelUpActorWidth > 0 ? LevelUpActorWidth : Math.floor(Graphics.boxWidth * 0.5);
  const wh = LevelUpActorHeight > 0 ? LevelUpActorHeight : Graphics.boxHeight - wy;
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.resultLearnSkillWindowRect = function() {
  const resultWindow = this._resultLevelUpMainWindow;
  const wx = resultWindow.x + LearnSkillWindow_X;
  const wy = resultWindow.y + LearnSkillWindow_Y;
  const ww = LearnSkillWidth > 0 ? LearnSkillWidth : Math.floor(Graphics.boxWidth * 0.5);
  const wh = LearnSkillHeight > 0 ? LearnSkillHeight : this.learnSkillHeight(wx, wy);
  return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.resultHelpAreaTop = function() {
  const y = ResultWindow_Y;
  if (NoTouchUIWindow && !ConfigManager.touchUI) {
    return y;
  }
  return y + this.buttonAreaHeight();
};

Scene_Battle.prototype.resultWindowY = function() {
  switch (ResultWindowPosition) {
    case 'help':
      return this.resultHelpAreaTop() + (HelpWindowVisible ? this.resultHelpAreaHeight() : 0);
    case 'button':
      return this.resultHelpAreaTop();
    case 'top':
      return 0;
  }
};

Scene_Battle.prototype.resultLevelUpWindowY = function() {
  switch (ResultLevelUpWindowPosition) {
    case 'help':
      return this.resultHelpAreaTop() + (HelpWindowVisible ? this.resultHelpAreaHeight() : 0);
    case 'button':
      return this.resultHelpAreaTop();
    case 'top':
      return 0;
  }
};

Scene_Battle.prototype.getDropItemHeight = function(x, y) {
  return DropItemRows > 0 ? Window_Selectable.prototype.resultDropItemFittingHeight(DropItemRows) : Graphics.boxHeight - y;
};

Scene_Battle.prototype.learnSkillHeight = function(x, y) {
  return LearnSkillRows > 0 ? Window_Selectable.prototype.resultLearnSkillFittingHeight(LearnSkillRows) : Graphics.boxHeight - y;
};

Scene_Battle.prototype.resultHelpAreaHeight = function() {
  return this.calcWindowHeight(1, false);
};

Scene_Battle.prototype.createResultButtons = function() {
  if (ConfigManager.touchUI) {
      this.createResultButton();
  }
};

Scene_Battle.prototype.createResultButton = function() {
  this._okResultButton = new Sprite_Button("ok");
  this._downResultButton = new Sprite_Button("pagedown");
  this._upResultButton = new Sprite_Button("pageup");
  let x = ResultButton_X
  const y = this.resultButtonY();
  this.addChild(this._okResultButton);
  this.addChild(this._downResultButton);
  this.addChild(this._upResultButton);
  if (ButtonPosition === 'right') {
    x += Graphics.boxWidth - this._okResultButton.width - 4;
    this._okResultButton.x = x + (Graphics.width - Graphics.boxWidth) / 2;
    this._downResultButton.x = this._okResultButton.x - (24 + this._downResultButton.width) + (Graphics.width - Graphics.boxWidth) / 2;
    this._upResultButton.x = this._downResultButton.x - (4 + this._upResultButton.width) + (Graphics.width - Graphics.boxWidth) / 2;
  } else {
    this._okResultButton.x = x + (Graphics.width - Graphics.boxWidth) / 2;
    this._upResultButton.x = this._okResultButton.x + (24 + this._upResultButton.width) + (Graphics.width - Graphics.boxWidth) / 2;
    this._downResultButton.x = this._upResultButton.x + (4 + this._upResultButton.width) + (Graphics.width - Graphics.boxWidth) / 2;
  }
  this._okResultButton.y = y + (Graphics.height - Graphics.boxHeight) / 2;
  this._downResultButton.y = y + (Graphics.height - Graphics.boxHeight) / 2;
  this._upResultButton.y = y + (Graphics.height - Graphics.boxHeight) / 2;
  this._upResultButton.setClickHandler(this.updatePageupButton.bind(this));
  this._downResultButton.setClickHandler(this.updatePagedownButton.bind(this));
};

const _Scene_Battle_updateInputWindowVisibility = Scene_Battle.prototype.updateInputWindowVisibility;
Scene_Battle.prototype.updateInputWindowVisibility = function() {
  _Scene_Battle_updateInputWindowVisibility.call(this);
  if (BattleManager._resultOn) {
      this.closeCommandWindows();
      this.hideSubInputWindows();
  }
};

const _Scene_Battle_updateVisibility = Scene_Battle.prototype.updateVisibility;
Scene_Battle.prototype.updateVisibility = function() {
  _Scene_Battle_updateVisibility.call(this);
  this.updateResultButton();
};

Scene_Battle.prototype.updateResultButton = function() {
  if (this._okResultButton) {
    this._okResultButton.visible = (this._resultWindow.active || this._resultLevelUpMainWindow.active);
  }
  if (this._upResultButton && this._downResultButton) {
    this._upResultButton.visible = (this._resultWindow.active && this._resultGetItemWindow.maxPages() > 1) ||
    (this._resultLevelUpMainWindow.active && this._resultLearnSkillWindow.maxPages() > 1);
    this._downResultButton.visible = (this._resultWindow.active && this._resultGetItemWindow.maxPages() > 1) ||
    (this._resultLevelUpMainWindow.active && this._resultLearnSkillWindow.maxPages() > 1);
  }
};

Scene_Battle.prototype.updatePageupButton = function() {
  if (this._resultWindow.active) {
    this.updateDorpItemPageup();
  } else if (this._resultLevelUpMainWindow.active) {
    this.updateLearnSkillPageup();
  }
};

Scene_Battle.prototype.updatePagedownButton = function() {
  if (this._resultWindow.active) {
    this.updateDorpItemPagedown();
  } else if (this._resultLevelUpMainWindow.active) {
    this.updateLearnSkillPagedown();
  }
};

Scene_Battle.prototype.resultButtonY = function() {
  return this.buttonY() - this.helpAreaBottom() + ResultButton_Y;
};

Scene_Battle.prototype.closeStatusWindow = function() {
  if (CloseActorStatusWindow) {
    this._statusWindow.close();
  }
};

Scene_Battle.prototype.resultOpen = function() {
  this.closeStatusWindow();
  this._resultWindow.activate();
  if (this._resultHelpWindow) {
    this._resultHelpWindow.show();
    this._resultHelpWindow.open();
  }
  this._resultWindow.show();
  this._resultActorExpWindow.show();
  this._resultGetInfoWindow.show();
  this._resultGetItemWindow.show();
  this._resultWindow.open();
  this._resultGetInfoWindow.open();
  this._resultGetItemWindow.open();
  this._resultActorExpWindow.open();
  this.resultRefresh();
  BattleManager.resultRefresh = PartyPageRefreshFrame;
};

Scene_Battle.prototype.resultRefresh = function() {
  this._resultWindow.refresh();
  this._resultActorExpWindow.refresh();
  this._resultGetInfoWindow.refresh();
  this._resultGetItemWindow.refresh();
};

Scene_Battle.prototype.resultLevelUpRefresh = function() {
  this._resultLevelUpMainWindow.refresh()
  this._resultActorStatusWindow.refresh();
  this._resultLearnSkillWindow.refresh();
};

Scene_Battle.prototype.onResultOk = function() {
  if (BattleManager.resultLevelUpActors.length > 0 && BattleManager.resultPage < BattleManager.resultLevelUpActors.length) {
    this.openLevelUpWindow()
  } else {
    this.closeResultWindow()
  }
};

Scene_Battle.prototype.openLevelUpWindow = function() {
  BattleManager.resultPage++;
  const actor = BattleManager.resultLevelUpActors[BattleManager.resultPage - 1];
  if (this._resultHelpWindow) {
    this._resultHelpWindow.hide();
  }
  if (this._resultLevelUpHelpWindow) {
    this._resultLevelUpHelpWindow.show();
    const text = LevelUpResultHelpName.format(actor.name(), actor._level);
    this._resultLevelUpHelpWindow.setText(text);
  }
  this._resultWindow.deactivate();
  this._resultLevelUpMainWindow.activate();
  this._resultGetItemWindow.page = 0;
  this._resultWindow.hide();
  this._resultActorExpWindow.hide();
  this._resultGetInfoWindow.hide();
  this._resultGetItemWindow.hide();
  this._resultLevelUpMainWindow.show()
  this._resultActorStatusWindow.show();
  this._resultLearnSkillWindow.show();
  this.resultLevelUpRefresh();
};

Scene_Battle.prototype.closeResultWindow = function() {
  if (this._resultHelpWindow) {
    this._resultHelpWindow.close();
  }
  if (this._resultLevelUpHelpWindow) {
    this._resultLevelUpHelpWindow.close();
  }
  this._resultWindow.close();
  this._resultLevelUpMainWindow.close();
  this._resultActorExpWindow.close();
  this._resultGetInfoWindow.close();
  this._resultGetItemWindow.close();
  this._resultActorStatusWindow.close();
  this._resultLearnSkillWindow.close();
  BattleManager.playMapBgm();
  BattleManager._resultOn = false;
};

const _Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
  _Scene_Battle_update.call(this);
  this.updateResultPage();
};

Scene_Battle.prototype.updateResultPage = function() {
  if (BattleManager._resultOn) {
    if (this._resultWindow.active) {
      if (Input.isRepeated('left')) {
        this.updateDorpItemPageup();
      } else if (Input.isRepeated('right')){
        this.updateDorpItemPagedown();
      }
    } else if (this._resultLevelUpMainWindow.active) {
      if (Input.isRepeated('left')) {
        this.updateLearnSkillPageup();
      } else if (Input.isRepeated('right')){
        this.updateLearnSkillPagedown();
      }
    }
  }
};

Scene_Battle.prototype.updateDorpItemPagedown = function() {
  const maxPage = this._resultGetItemWindow.maxPages();
  if (maxPage > 1) {
    SoundManager.playCursor();
    this._resultGetItemWindow.page = (this._resultGetItemWindow.page + 1) % maxPage;
    this._resultGetItemWindow.refresh();
    this._resultWindow.activate();
  }
};

Scene_Battle.prototype.updateDorpItemPageup = function() {
  const maxPage = this._resultGetItemWindow.maxPages();
  if (maxPage > 1) {
    SoundManager.playCursor();
    this._resultGetItemWindow.page = (this._resultGetItemWindow.page + (maxPage - 1)) % maxPage;
    this._resultGetItemWindow.refresh();
    this._resultWindow.activate();
  }
};

Scene_Battle.prototype.updateLearnSkillPagedown = function() {
  const maxPage = this._resultLearnSkillWindow.maxPages();
  if (maxPage > 1) {
    SoundManager.playCursor();
    this._resultLearnSkillWindow.page = (this._resultLearnSkillWindow.page + 1) % maxPage;
    this._resultLearnSkillWindow.refresh();
    this._resultActorStatusWindow.activate();
  }
};

Scene_Battle.prototype.updateLearnSkillPageup = function() {
  const maxPage = this._resultLearnSkillWindow.maxPages();
  if (maxPage > 1) {
    SoundManager.playCursor();
    this._resultLearnSkillWindow.page = (this._resultLearnSkillWindow.page + (maxPage - 1)) % maxPage;
    this._resultLearnSkillWindow.refresh();
    this._resultActorStatusWindow.activate();
  }
};

Scene_Battle.prototype.isActiveResult = function() {
  return this._resultWindow.active || this._resultLevelUpMainWindow.active;
};


Window_Selectable.prototype.resultGetInfoFittingHeight = function(numLines) {
  return numLines * (GetInfoContentsHeight || 36) + $gameSystem.windowPadding() * 2 + this.rowSpacing() / 2;
};

Window_Selectable.prototype.resultDropItemFittingHeight = function(numLines) {
  return numLines * (DropItemContentsHeight || 36) + $gameSystem.windowPadding() * 2 + this.rowSpacing() / 2;
};

Window_Selectable.prototype.resultLearnSkillFittingHeight = function(numLines) {
  return numLines * (LearnSkillContentsHeight || 36) + $gameSystem.windowPadding() * 2 + this.rowSpacing() / 2;
};

Window_Base.prototype.updateResultFadein = function() {
  if (this.isFadein() && this.resultFadein) {
    this.openness = 255;
    this.openOpacity += 32;
    this.opacity = this.openOpacity;
    if (this.isResultFadein()) {
      this.resultFadein = false;
    }
  }
};

Window_Base.prototype.onResultFadein = function() {
  if (this.isFadein() && !this.resultFadein) {
    this.resultFadein = true;
  }
};

Window_Base.prototype.isResultFadein = function() {
  return this.openOpacity >= 255;
};

Window_Base.prototype.isFadein = function() {
  return ResultFadein && !this.resultWindowVisible;
};

Window_Base.prototype.setResultWindowMode = function(mode) {
  if (!mode) {
    this.opacity = 0;
    this.frameVisible = false;
    this.resultWindowVisible = true;
  }
};


function Window_ResultHelp() {
  this.initialize(...arguments);
}

Window_ResultHelp.prototype = Object.create(Window_Help.prototype);
Window_ResultHelp.prototype.constructor = Window_ResultHelp;

Window_ResultHelp.prototype.initialize = function(rect) {
  Window_Help.prototype.initialize.call(this, rect);
  this.openness = 0;
  this.openOpacity = 0;
  this.resultFadein = false;
  this.setResultWindowMode(ResultHelpWindowVisible);
};

Window_ResultHelp.prototype.refresh = function() {
  const rect = this.baseTextRect();
  this.contents.clear();
  this.drawText(this._text, rect.x, rect.y, rect.width, ResultTextPosition);
};

const _Window_ResultHelp_updateOpen = Window_ResultHelp.prototype.updateOpen;
Window_ResultHelp.prototype.updateOpen = function() {
  this.updateResultFadein();
  _Window_ResultHelp_updateOpen.call(this);
};

const _Window_ResultHelp_isOpen = Window_ResultHelp.prototype.isOpen;
Window_ResultHelp.prototype.isOpen = function() {
  return this.isFadein() ? this.isResultFadein() && _Window_ResultHelp_isOpen.call(this) : 
  _Window_ResultHelp_isOpen.call(this);
};

const _Window_ResultHelp_open = Window_ResultHelp.prototype.open;
Window_ResultHelp.prototype.open = function() {
  _Window_ResultHelp_open.call(this);
  this.onResultFadein();
};

Window_ResultHelp.prototype.loadWindowskin = function() {
  if (ResultHelpWindowsSkin) {
    this.windowskin = ImageManager.loadSystem(ResultHelpWindowsSkin);
  } else {
    Window_Base.prototype.loadWindowskin.call(this);
  }
};


function Window_ResultLevelUpHelp() {
  this.initialize(...arguments);
}

Window_ResultLevelUpHelp.prototype = Object.create(Window_Help.prototype);
Window_ResultLevelUpHelp.prototype.constructor = Window_ResultLevelUpHelp;

Window_ResultLevelUpHelp.prototype.initialize = function(rect) {
  Window_Help.prototype.initialize.call(this, rect);
  this.openness = 255;
  this.openOpacity = 0;
  this.setResultWindowMode(ResultLevelUpHelpWindowVisible);
};

Window_ResultLevelUpHelp.prototype.refresh = function() {
  const rect = this.baseTextRect();
  this.contents.clear();
  if (LevelUpResultTextPosition === 'TextEx') {
    this.drawTextEx(this._text, rect.x, rect.y, rect.width);
  } else {
    this.drawText(this._text, rect.x, rect.y, rect.width, LevelUpResultTextPosition);
  }
};

Window_ResultLevelUpHelp.prototype.loadWindowskin = function() {
  if (LevelUpResultHelpWindowsSkin) {
    this.windowskin = ImageManager.loadSystem(LevelUpResultHelpWindowsSkin);
  } else {
    Window_Base.prototype.loadWindowskin.call(this);
  }
};


function Window_Result() {
  this.initialize(...arguments);
}

Window_Result.prototype = Object.create(Window_StatusBase.prototype);
Window_Result.prototype.constructor = Window_Result;

Window_Result.prototype.initialize = function(rect) {
  Window_StatusBase.prototype.initialize.call(this, rect);
  this.openness = 0;
  this.openOpacity = 0;
  this.resultFadein = false;
  this._canRepeat = false;
  this.resultBackgroundSprite = null;
  this.setResultWindowMode(ResultWindowVisible);
  this.loadResultBackground();
};

Window_Result.prototype.setResultBackground = function(sprite) {
  this.resultBackgroundSprite = sprite;
};

Window_Result.prototype.loadResultBackground = function() {
  if (GetWindowBackGroundImg) {
    ImageManager.nuun_LoadPictures(GetWindowBackGroundImg);
  }
};

Window_Result.prototype.loadWindowskin = function() {
  if (GetWindowsSkin) {
    this.windowskin = ImageManager.loadSystem(GetWindowsSkin);
  } else {
    Window_Base.prototype.loadWindowskin.call(this);
  }
};

Window_Result.prototype.refresh = function() {
  const sprite = this.resultBackgroundSprite;
  if (sprite) {
    sprite.bitmap = ImageManager.nuun_LoadPictures(GetWindowBackGroundImg);
    sprite.show();
    if (BackUiWidth) {
      sprite.x = (Graphics.width - Graphics.boxWidth) / 2 - 4;
      sprite.y = (Graphics.height - Graphics.boxHeight) / 2 - 4;
    } else {
      sprite.x = 0;
      sprite.y = 0;
    }
    if (BackFitWidth) {
      if(BackUiWidth) {
        sprite.scale.x = (this.width !== sprite.bitmap.width ? this.width / sprite.bitmap.width : 1);
        sprite.scale.y = (this.height !== sprite.height ? this.height / sprite.bitmap.height : 1);
      } else {
        sprite.scale.x = (Graphics.width !== sprite.bitmap.width ? Graphics.width / sprite.bitmap.width : 1);
        sprite.scale.y = (Graphics.height !== sprite.bitmap.height ? Graphics.height / sprite.bitmap.height : 1);
      }
    }
  }
};

Window_Result.prototype.processOk = function() {
  if (BattleManager.resultRefresh === 0) {
    Window_StatusBase.prototype.processOk.call(this);
  }
};

const _Window_Result_updateOpen = Window_Result.prototype.updateOpen;
Window_Result.prototype.updateOpen = function() {
  this.updateResultFadein();
  this.updateResultBackgrounfFadein();
  _Window_Result_updateOpen.call(this);
};

const _Window_Result_isOpen = Window_Result.prototype.isOpen;
Window_Result.prototype.isOpen = function() {
  return this.isFadein() ? this.isResultFadein() && _Window_Result_isOpen.call(this) : 
  _Window_Result_isOpen.call(this);
};

const _Window_Result_open = Window_Result.prototype.open;
Window_Result.prototype.open = function() {
  _Window_Result_open.call(this);
  this.onResultFadein();
};

Window_Result.prototype.updateResultBackgrounfFadein = function() {
  if (this.resultBackgroundSprite) {
    this.resultBackgroundSprite.opacity = this.opacity;
  }
};

Window_Result.prototype.processCancel = function() {
  SoundManager.playOk();
  this.updateInputData();
  this.deactivate();
  this.callCancelHandler();
};

function Window_ResultActorExp() {
  this.initialize(...arguments);
}

Window_ResultActorExp.prototype = Object.create(Window_StatusBase.prototype);
Window_ResultActorExp.prototype.constructor = Window_ResultActorExp;

Window_ResultActorExp.prototype.initialize = function(rect) {
  Window_StatusBase.prototype.initialize.call(this, rect);
  this.openOpacity = 0;
  this.openness = 0;
  this.resultFadein = false;
  this._isWindow = false;
  this._contentsBackVisible = !EXPResistContentsBackVisible;
  this.setResultWindowMode(ActorExpWindowVisible);
};

const _Window_ResultActorExp_updateOpen = Window_ResultActorExp.prototype.updateOpen;
Window_ResultActorExp.prototype.updateOpen = function() {
  this.updateResultFadein();
  _Window_ResultActorExp_updateOpen.call(this);
};

const _Window_ResultActorExp_isOpen = Window_ResultActorExp.prototype.isOpen;
Window_ResultActorExp.prototype.isOpen = function() {
  return this.isFadein() ? this.isResultFadein() && _Window_ResultActorExp_isOpen.call(this) : 
  _Window_ResultActorExp_isOpen.call(this);
};

const _Window_ResultActorExp_open = Window_ResultActorExp.prototype.open;
Window_ResultActorExp.prototype.open = function() {
  _Window_ResultActorExp_open.call(this);
  this.onResultFadein();
};

Window_ResultActorExp.prototype.drawItemBackground = function(index) {
  if (EXPResistContentsBackGroundImg) {
    const bitmap = ImageManager.nuun_LoadPictures(EXPResistContentsBackGroundImg);
    if (bitmap && !bitmap.isReady()) {
      bitmap.addLoadListener(this.drawContentsBack.bind(this, bitmap, index));
    } else {
      this.drawContentsBack(bitmap, index);
    }
  } else {
    Window_Selectable.prototype.drawItemBackground.call(this, index);
  }
};

Window_ResultActorExp.prototype.loadWindowskin = function() {
  if (EXPResistWindowsSkin) {
    this.windowskin = ImageManager.loadSystem(EXPResistWindowsSkin);
  } else {
    Window_Base.prototype.loadWindowskin.call(this);
  }
};

Window_ResultActorExp.prototype.drawContentsBack = function(bitmap, index) {
    const rect = this.itemRect(index);
    this.contentsBack.blt(bitmap, 0, 0, rect.width, rect.height, rect.x + 1, rect.y + 1, rect.width - 2, rect.height - 2);
};


Window_ResultActorExp.prototype.maxCols = function() {
  return ActorCols;
};

Window_ResultActorExp.prototype.itemHeight = function() {
  const showMembers = Math.ceil(this.actorMembers() / ActorCols);
  if (ResultActorAutoSize && DefaultActorVisible < showMembers) {
    return Math.floor(this.contentsHeight() / showMembers);
  } else if (ResultActorLessThanSize && DefaultActorVisible > showMembers) {
    return Math.floor(this.contentsHeight() / showMembers);
  } else {
    return Math.floor(this.contentsHeight() / DefaultActorVisible);
  }
};

Window_ResultActorExp.prototype.maxItems = function() {
  return this.members().length;
};

Window_ResultActorExp.prototype.contentsHeight = function() {
  return this.innerHeight;
};

Window_ResultActorExp.prototype.actor = function(index) {
  return this.members()[index];
};

Window_ResultActorExp.prototype.actorMembers = function() {
  return this.members().length;
};

Window_ResultActorExp.prototype.members = function() {
  if (ReserveMembers) {
    return $gameParty.allMembers();
  } else {
    if (Imported.NUUN_SupportActor && ShowSupportActor) {
      $gameParty.setWithSupportActorMember();
    }
    return $gameParty.battleMembers();
  }
};

Window_ResultActorExp.prototype.drawItem = function(index) {
  this.drawActorExp(index);
};

Window_ResultActorExp.prototype.drawActorExp = function(index) {
  const rect = this.itemRect(index);
  const actor = this.actor(index);
  for (const data of ActorExpDataList) {
    this.resetFontSettings();
    const x = rect.x + data.X_Coordinate;
    const y = rect.y + data.Y_Coordinate;
    const width = (data.ItemWidth && data.ItemWidth > 0 ? Math.min(data.ItemWidth, rect.width - x) : rect.width - x);
    this.dateDisplay(data, actor, x, y, width);
  }
};

Window_ResultActorExp.prototype.dateDisplay = function(data, actor, x, y, width) {
  switch (data.DateSelect) {
    case 0:
      break;
    case 1:
      this.drawActorCharacter(actor, x, y);
      break;
    case 2:
      this.drawActorFace(data, actor, x, y);
      break;
    case 3:
      this.drawSvActor(data, actor, x, y, width);
      break;
    case 10:
      this.drawActorName(data, actor, x, y, width);
      break;
    case 11:
      this.drawActorLevel(data, actor, x, y, width);
      break;
    case 12:
      this.drawGetActorExp(data, actor, x, y, width);
      break;
    case 20:
      this.drawExpGauge(data, actor, x, y, width);
      break;
    case 21:
      this.drawParams(data, actor, x, y, width);
      break;
    case 30:
      this.drawLevelUp(data, actor, x, y, width);
      break;
    case 31:
      //this.drawActorImg(data, actor, x, y, width);
      break;
    case 1000:
      this.horzLine(data, x, y, width);
      break;
    default:
      break;
  }
};

Window_ResultActorExp.prototype.drawActorFace = function(data, actor, x, y) {
  const rect = this.itemRect(0);
  const height = Math.min(ActorFaceHeight, rect.height, ImageManager.faceHeight);
  if (Imported.NUUN_ActorPicture && ActorPictureEXApp) {
    this.drawFace(actor.getActorGraphicFace(), actor.getActorGraphicFaceIndex(), x, y, ImageManager.faceWidth, height);
  } else {
    this.drawFace(actor.faceName(), actor.faceIndex(), x, y, ImageManager.faceWidth, height);
  }
};

Window_ResultActorExp.prototype.drawSvActor = function(data, actor, x, y, width) {
  const bitmap = ImageManager.loadSvActor(actor.battlerName());
  this.drawSvActorImg(actor, x, y);
};

Window_ResultActorExp.prototype.drawActorImg = function(data, actor, x, y, width) {
  const tag = actor.actor().meta[data.textMethod];
  const bitmap = ImageManager.nuun_LoadPictures(tag);

};

Window_ResultActorExp.prototype.drawActorName = function(data, actor, x, y, width) {
  if (actor.isDead()) {
    this.changeTextColor(ColorManager.deathColor());
  }
  this.contents.fontSize = $gameSystem.mainFontSize() + data.FontSize;
  Window_StatusBase.prototype.drawActorName.call(this, actor, x, y, width);
};

Window_ResultActorExp.prototype.drawActorLevel = function(data, actor, x, y, width) {
  const exp = BattleManager._rewards.exp;
  if (!isNaN(exp)) {
    const level = actor.resultGainExp(exp);
    const systemWidth = data.SystemItemWidth || 30;
    this.contents.fontSize = $gameSystem.mainFontSize() + data.FontSize;
    this.changeTextColor(NuunManager.getColorCode(data.SystemNameColor));
    this.drawText(TextManager.levelA, x, y, systemWidth);
    if (actor.resultLevelUp) {
      this.changeTextColor(NuunManager.getColorCode(LevelUpValueColor));
    } else {
      this.resetTextColor();
    }
    this.drawText(level, x + systemWidth + this.itemPadding(), y, width - (systemWidth + this.itemPadding()), "left");
  }
};

Window_ResultActorExp.prototype.drawGetActorExp = function(data, actor, x, y, width) {
  resultExpMaxWidth = width;
  const key = "resultActor%1-exp-%2".format(actor.actorId());
  const sprite = this.createInnerSprite(key, Sprite_ResultExpValue);
  sprite.setup(actor, data);
  sprite.move(x, y);
  sprite.show();
};

Window_ResultActorExp.prototype.drawParams = function(data, actor, x, y, width) {
  if (data.DetaEval) {
    const a = actor;
    const d = actor.actor();
    const systemWidth = data.SystemItemWidth || 60;
    this.changeTextColor(NuunManager.getColorCode(data.SystemNameColor));
    this.contents.fontSize = $gameSystem.mainFontSize() + data.FontSize;
    this.drawText(data.ParamName || '', x, y, systemWidth);
    this.resetTextColor();
    this.drawText(eval(data.DetaEval), x + systemWidth + this.itemPadding(), y, width - (systemWidth + this.itemPadding()), "right");
  }
};

Window_ResultActorExp.prototype.drawHorzLine = function(data, x, y, width) {
  const lineY = y + this.lineHeight() / 2 - 1;
  this.contents.paintOpacity = 48;
  this.contents.fillRect(x, lineY, width, 2, NuunManager.getColorCode(data.SystemNameColor));
  this.contents.paintOpacity = 255;
};

Window_ResultActorExp.prototype.drawExpGauge = function(data, actor, x, y, width) {
  resultExpMaxWidth = width;
  this.placeExpGauge(actor, x, y);
};

Window_ResultActorExp.prototype.drawLevelUp = function(data, actor, x, y, width) {
  if (actor.resultLevelUp) {
    this.changeTextColor(NuunManager.getColorCode(LevelUpNameColor));
    this.contents.fontSize = $gameSystem.mainFontSize() + data.FontSize;
    const text = data.ParamName || 'LEVEL UP!';
    const textWidth = this.textWidth(text);
    this.drawText(text, x, y, textWidth, 'center');
  }
};

Window_ResultActorExp.prototype.placeExpGauge = function(actor, x, y) {
  const type = 'result_exp'
  if (Imported.NUUN_GaugeImage) {//旧版要
    this.placeGaugeImg(actor, type, x, y);
  }
  const key = "resultActor%1-gauge-%2".format(actor.actorId(), type);
  const sprite = this.createInnerSprite(key, Sprite_ResultExpGauge);
  sprite.setup(actor, type);
  sprite.move(x, y);
  sprite.show();
};

Window_ResultActorExp.prototype.drawSvActorImg = function(actor, x, y) {
  const key = "resultSvActor%1".format(actor.actorId());
  const sprite = this.createInnerSprite(key, Sprite_ResultSvActor);
  sprite.setBattler(actor);
  sprite.show();
  sprite.setHome(x, y);
  sprite.startMotion();
};


function Window_ResultGetInfo() {
  this.initialize(...arguments);
}

Window_ResultGetInfo.prototype = Object.create(Window_Selectable.prototype);
Window_ResultGetInfo.prototype.constructor = Window_ResultGetInfo;

Window_ResultGetInfo.prototype.initialize = function(rect) {
  Window_Selectable.prototype.initialize.call(this, rect);
  this.openOpacity = 0;
  this.openness = 0;
  this.resultFadein = false;
  this._isWindow = false;
  this.setResultWindowMode(GetInfoWindowVisible);
};

const _Window_ResultGetInfo_updateOpen = Window_ResultGetInfo.prototype.updateOpen;
Window_ResultGetInfo.prototype.updateOpen = function() {
  this.updateResultFadein();
  _Window_ResultGetInfo_updateOpen.call(this);
};

const _Window_ResultGetInfo_isOpen = Window_ResultGetInfo.prototype.isOpen;
Window_ResultGetInfo.prototype.isOpen = function() {
  return this.isFadein() ? this.isResultFadein() && _Window_ResultGetInfo_isOpen.call(this) : 
  _Window_ResultGetInfo_isOpen.call(this);
};

const _Window_ResultGetInfo_open = Window_ResultGetInfo.prototype.open;
Window_ResultGetInfo.prototype.open = function() {
  _Window_ResultGetInfo_open.call(this);
  this.onResultFadein();
};

Window_ResultGetInfo.prototype.loadWindowskin = function() {
  if (GetInfoWindowsSkin) {
    this.windowskin = ImageManager.loadSystem(GetInfoWindowsSkin);
  } else {
    Window_Base.prototype.loadWindowskin.call(this);
  }
};

Window_ResultGetInfo.prototype.refresh = function() {
  this.contents.clear();
  this.drawGetInfo();
};

Window_ResultGetInfo.prototype.lineHeight = function() {
  return GetInfoContentsHeight || 36;
};

Window_ResultGetInfo.prototype.drawGetInfo = function() {
  const lineHeight = this.lineHeight();
  for (const data of GainParam) {
    this.resetFontSettings();
    const rect = this.itemRect(0);
    const x = rect.x + data.X_Coordinate;
    const y = (data.Y_Position - 1) * lineHeight + rect.y + data.Y_Coordinate;
    const width = data.ItemWidth && data.ItemWidth > 0 ? data.ItemWidth : rect.width;
    this.dateDisplay(data, x, y, width);
  }
};

Window_ResultGetInfo.prototype.dateDisplay = function(data, x, y, width) {
  switch (data.GainParamData) {
    case 0:
      break;
    case 1:
      this.drawGainGold(data, x, y, width)
      break;
    case 2:
      this.drawGainExp(data, x, y, width)
      break;
    case 10:
      this.drawPartyOriginalParam(data, x, y, width)
      break;
    case 1000:
      this.drawHorzLine(data, x, y, width);
      break;
  }
};

Window_ResultGetInfo.prototype.drawGainGold = function(data, x, y, width) {
  const gold = BattleManager._rewards.gold;
  if (!isNaN(gold)) {
    const gold = data.DataEval ? eval(data.DataEval) : BattleManager._rewards.gold;
    this.changeTextColor(NuunManager.getColorCode(data.SystemNameColor));
    this.contents.fontSize = $gameSystem.mainFontSize() + data.FontSize;
    let systemWidth = 0;
    if (data.ParamName) {
      systemWidth = data.SystemItemWidth || 120;
      this.drawText(data.ParamName, x, y, systemWidth, "left");
    }
    this.resetTextColor();
    this.drawCurrencyValue(gold, this.currencyUnit(), x + systemWidth, y, width - systemWidth);
  }
};

Window_ResultGetInfo.prototype.drawGainExp = function(data, x, y, width) {
  const exp = BattleManager._rewards.exp;
  if (!isNaN(exp)) {
    const exp = data.DataEval ? eval(data.DataEval) : BattleManager._rewards.exp;
    this.changeTextColor(NuunManager.getColorCode(data.SystemNameColor));
    this.contents.fontSize = $gameSystem.mainFontSize() + data.FontSize;
    let systemWidth = 0;
    if (data.ParamName) {
      systemWidth = data.SystemItemWidth || 120;
      this.drawText(data.ParamName, x, y, systemWidth, "left");
    }
    this.resetTextColor();
    this.drawText(exp, x + systemWidth, y,  width - systemWidth, "right");
  }
};

Window_ResultGetInfo.prototype.drawPartyOriginalParam = function(data, x, y, width) {
  const rewards = BattleManager._rewards;
  if (rewards) {
    const result = eval(data.DataEval);
    this.changeTextColor(NuunManager.getColorCode(data.SystemNameColor));
    this.contents.fontSize = $gameSystem.mainFontSize() + data.FontSize;
    let systemWidth = 0;
    if (data.ParamName) {
      systemWidth = data.SystemItemWidth || 120;
      this.drawText(data.ParamName, x, y, systemWidth, "left");
    }
    this.resetTextColor();
    this.drawText(result, x + systemWidth, y,  width - systemWidth, "right");
  }
};

Window_ResultGetInfo.prototype.drawHorzLine = function(data, x, y, width) {
  const lineY = y + this.lineHeight() / 2 - 1;
  this.contents.paintOpacity = 48;
  this.contents.fillRect(x, lineY, width, 2, NuunManager.getColorCode(data.SystemNameColor));
  this.contents.paintOpacity = 255;
};

Window_ResultGetInfo.prototype.currencyUnit = function() {
  return TextManager.currencyUnit;
};

function Window_ResultGetItem() {
  this.initialize(...arguments);
}

Window_ResultGetItem.prototype = Object.create(Window_Selectable.prototype);
Window_ResultGetItem.prototype.constructor = Window_ResultGetItem;

Window_ResultGetItem.prototype.initialize = function(rect) {
  Window_Selectable.prototype.initialize.call(this, rect);
  this.openOpacity = 0;
  this.resultFadein = false;
  this._isWindow = false;
  this.openness = 0;
  this.page = 0;
  this.maxPage = 0;
  this.dropList = [];
  this.stealList = [];
  this.dropItemRows = 1;
  this._dropItemMaxPage = 1;
  this._stealItemMaxPage = 1;
  this.setResultWindowMode(GetItemWindowVisible);
};

const _Window_ResultGetItem_updateOpen = Window_ResultGetItem.prototype.updateOpen;
Window_ResultGetItem.prototype.updateOpen = function() {
  this.updateResultFadein();
  _Window_ResultGetItem_updateOpen.call(this);
};

const _Window_ResultGetItem_isOpen = Window_ResultGetItem.prototype.isOpen;
Window_ResultGetItem.prototype.isOpen = function() {
  return this.isFadein() ? this.isResultFadein() && _Window_ResultGetItem_isOpen.call(this) : 
  _Window_ResultGetItem_isOpen.call(this);
};

const _Window_ResultGetItem_open = Window_ResultGetItem.prototype.open;
Window_ResultGetItem.prototype.open = function() {
  _Window_ResultGetItem_open.call(this);
  this.onResultFadein();
};

Window_ResultGetItem.prototype.loadWindowskin = function() {
  if (GetItemWindowsSkin) {
    this.windowskin = ImageManager.loadSystem(GetItemWindowsSkin);
  } else {
    Window_Base.prototype.loadWindowskin.call(this);
  }
};

Window_ResultGetItem.prototype.lineHeight = function() {
  return DropItemContentsHeight || 36;
};

Window_ResultGetItem.prototype.maxPages = function() {
  return this.maxPage;
};

Window_ResultGetItem.prototype.maxDropPages = function(items, rows, cols) {
  return Math.ceil(items.length / (rows * cols));
};

Window_ResultGetItem.prototype.getDropItemRows = function(y) {
  return Math.floor((this.innerHeight - y) / this.lineHeight());
};

Window_ResultGetItem.prototype.setMaxPage = function(items, rows, cols) {
  const pages = Math.ceil(items.length / (rows * cols));
  const maxPage = this.maxPages();
  if (maxPage < pages) {
    this.maxPage = pages;
  }
};

Window_ResultGetItem.prototype.maxCols = function() {
  return DropItemMaxCols;
};

Window_ResultGetItem.prototype.refresh = function() {
  this.contents.clear();
  this.drawGetItem(false);
  this.drawGetItem(true);
};

Window_ResultGetItem.prototype.drawGetItem = function(mode) {
  const lineHeight = this.lineHeight();
  for (const data of GetItemParam) {
    this.resetFontSettings();
    const x_Position = data.X_Position;
    const position = Math.min(x_Position, this.maxCols());
    const rect = this.itemRect(position - 1);
    const x = rect.x + (data.X_Coordinate + data.X_Position);
    const y = (data.Y_Position - 1) * lineHeight + rect.y + data.Y_Coordinate;
    const width = data.ItemWidth && data.ItemWidth > 0 ? data.ItemWidth : this.widthMode(rect, data);
    this.dateDisplay(data, x, y, width, mode);
  }
};

Window_ResultGetItem.prototype.widthMode = function(rect, data) {
  const colSpacing = this.colSpacing();
  const cols = Math.min(this.maxCols(), data.ItemCols);
  return (rect.width + colSpacing) * cols - colSpacing;
};

Window_ResultGetItem.prototype.dateDisplay = function(data, x, y, width, mode) {
  if (mode) {
    switch (data.GetItemParamData) {
      case 10:
        this.drawDropItemName(data, x, y, width);
        break;
      case 11:
        this.drawStealItemName(data, x, y, width);
        break;
    }
  } else {
    switch (data.GetItemParamData) {
      case 0:
        break;
      case 1:
        this.drawGetItems(data, x, y, width);
        break;
      case 2:
        this.drawGetStealItems(data, x, y, width);
        break;
      case 1000:
        this.drawHorzLine(data, x, y, width);
        break;
    }
  }
};

Window_ResultGetInfo.prototype.drawDropItemName = function(data, x, y, width) {
  if (data.ParamName) {
    this.changeTextColor(NuunManager.getColorCode(data.SystemNameColor));
    this.contents.fontSize = $gameSystem.mainFontSize() + data.FontSize;
    const systemWidth = data.SystemItemWidth || 160;
    this.drawText(data.ParamName, x, y, systemWidth, "left");
    this.resetTextColor();
    const maxPage = this._dropItemMaxPage;
    if (maxPage > 1) {
      this.drawText(this.page + 1 +"/"+maxPage, x, y, width, "right");
    }
  }
};

Window_ResultGetInfo.prototype.drawStealItemName = function(data, x, y, width) {
  if (data.ParamName) {
    this.changeTextColor(NuunManager.getColorCode(data.SystemNameColor));
    this.contents.fontSize = $gameSystem.mainFontSize() + data.FontSize;
    const systemWidth = data.SystemItemWidth || 160;
    this.drawText(data.ParamName, x, y, systemWidth, "left");
    this.resetTextColor();
    const maxPage = this._stealItemMaxPage;
    if (maxPage > 1) {
      this.drawText(this.page + 1 +"/"+maxPage, x, y, width, "right");
    }
  }
};

Window_ResultGetItem.prototype.getItemDropList = function() {
  const drop = BattleManager._rewards.items;
  const dropList = [];
  drop.forEach(item => {
    const index = dropList.findIndex(ditem => item.id === ditem.item.id);
    if (DropItemNumVisible && index >= 0) {
      dropList[index].num++;
    } else {
      dropList.push({item: item, num: 1});
    }
  });
  this.dropList = dropList;
};

Window_ResultGetItem.prototype.drawGetItems = function(data, x, y, width) {
  this.getItemDropList();
  const items = this.dropList;
  const lineHeight = this.lineHeight();
  const cols = Math.min(this.maxCols(), data.ItemCols);
  const contentsWidth = Math.floor(width / cols);
  const colSpacing = this.colSpacing();
  this.contents.fontSize = $gameSystem.mainFontSize() + data.FontSize;
  let y2 = y;
  if (data.ParamName) {
    const systemWidth = data.SystemItemWidth || 160;
    this.changeTextColor(NuunManager.getColorCode(data.SystemNameColor));
    this.drawText(data.ParamName, x, y, systemWidth, "left");
    y2 += lineHeight;
  }
  this.resetTextColor();
  const rows = data.ItemRows > 0 ? data.ItemRows : this.getDropItemRows(y2);
  this.dropItemRows = rows;
  this.setMaxPage(items, rows, cols)
  const maxPage = this.maxDropPages(items, rows, cols);
  this._dropItemMaxPage = maxPage;
  if (items.length > 0) {
    const index = (rows * cols) * Math.min(this.page, maxPage - 1);
    const maxItems = Math.min(rows * cols, items.length - index);
    if (maxPage > 1 && data.ParamName) {
      this.drawText(this.page + 1 +"/"+maxPage, x, y, width, "right");
    }
    for (let i = 0; maxItems > i; i++) {
      let y3 = y2 + lineHeight * Math.floor(i / cols);
      const x2 = contentsWidth * (i % cols) + x;
      this.resetTextColor();
      if (DropItemNumVisible) {
        const num = String(DropItemNumx + items[i + index].num);
        const textWidth = this.textWidth(num) + this.itemPadding();
        this.drawItemName(items[i + index].item, x2, y3, contentsWidth - textWidth - colSpacing);
        this.drawText(num, x2 + textWidth, y3, contentsWidth - textWidth - colSpacing, 'right');
      } else {
        this.drawItemName(items[i + index].item, x2, y3, contentsWidth - colSpacing);
      }
    }
  }
};

Window_ResultGetItem.prototype.drawGetStealItems = function(data, x, y, width) {
  if (StealItemVisible && Imported.NUUN_StealableItems) {
    this.getItemStealList();
    const items = this.stealList;
    const lineHeight = this.lineHeight();
    const cols = Math.min(this.maxCols(), data.ItemCols);
    const contentsWidth = Math.floor(width / cols);
    const colSpacing = this.colSpacing();
    this.contents.fontSize = $gameSystem.mainFontSize() + data.FontSize;
    let y2 = y;
    if (data.ParamName) {
      const systemWidth = data.SystemItemWidth || 160;
      this.changeTextColor(NuunManager.getColorCode(data.SystemNameColor));
      this.drawText(data.ParamName, x, y, systemWidth, "left");
      y2 += lineHeight;
    }
    this.resetTextColor();
    const rows = data.ItemRows > 0 ? data.ItemRows : this.getDropItemRows(y2);
    this.dropItemRows = rows;
    this.setMaxPage(items, rows, cols)
    const maxPage = this.maxDropPages(items, rows, cols);
    this._stealItemMaxPage = maxPage;
    if (items.length > 0) {
      const index = (rows * cols) * Math.min(this.page, maxPage - 1);
      const maxItems = Math.min(rows * cols, items.length - index);
      if (maxPage > 1 && data.ParamName) {
        this.drawText(this.page + 1 +"/"+maxPage, x, y, width, "right");
      }
      for (let i = 0; maxItems > i; i++) {
        let y3 = y2 + lineHeight * Math.floor(i / cols);
        const x2 = contentsWidth * (i % cols) + x;
        this.resetTextColor();
        if (StealItemNumVisible) {
          if (items[i + index].type === 'gold') {
            this.drawCurrencyValue(items[i + index].item, TextManager.currencyUnit, x2, y3, contentsWidth - colSpacing);
          } else {
            const num = String(StealItemNumx + items[i + index].num);
            const textWidth = this.textWidth(num) + this.itemPadding();
            this.drawItemName(items[i + index].item, x2, y3, contentsWidth - textWidth - colSpacing);
            this.drawText(num, x2 + textWidth, y3, contentsWidth - textWidth - colSpacing, 'right');
          }
        } else {
          if (items[i + index].type === 'gold') {
            this.drawCurrencyValue(items[i + index].item, TextManager.currencyUnit, x2, y3, contentsWidth - colSpacing);
          } else {
            this.drawItemName(items[i + index].item, x2, y3, contentsWidth - colSpacing);
          }
        }
      }
    }
  }
};

Window_ResultGetItem.prototype.getItemStealList = function() {
  const steal = BattleManager._rewards.stealItems;
  const stealList = [];
  steal.forEach(item => {
    if (item.money) {
      const index = stealList.findIndex(sitem => sitem.type === 'gold');
      if (StealItemNumVisible && index >= 0) {
        stealList[index].item += item.money;
      } else {
        stealList.push({item: item.money, type:'gold'});
      }
    } else {
      const index = stealList.findIndex(sitem => item.id === sitem.item.id);
      if (StealItemNumVisible && index >= 0) {
        stealList[index].num++;
      } else {
        stealList.push({item: item, num: 1, type:'item'});
      }
    }
  });
  this.stealList = stealList;
};

Window_ResultGetItem.prototype.drawCurrencyValue = function(value, unit, x, y, width) {
  const unitWidth = Math.min(80, this.textWidth(unit));
  const valueWidth = this.textWidth(value);
  this.resetTextColor();
  this.drawText(value, x, y, width - unitWidth - 6, "left");
  this.changeTextColor(ColorManager.systemColor());
  this.drawText(unit, x + valueWidth, y, unitWidth, "left");
};

Window_ResultGetItem.prototype.drawHorzLine = function(data, x, y, width) {
  const lineY = y + this.lineHeight() / 2 - 1;
  this.contents.paintOpacity = 48;
  this.contents.fillRect(x, lineY, width, 2, NuunManager.getColorCode(data.SystemNameColor));
  this.contents.paintOpacity = 255;
};


function Window_ResultLevelUpMain() {
  this.initialize(...arguments);
}

Window_ResultLevelUpMain.prototype = Object.create(Window_StatusBase.prototype);
Window_ResultLevelUpMain.prototype.constructor = Window_ResultLevelUpMain;

Window_ResultLevelUpMain.prototype.initialize = function(rect) {
  Window_StatusBase.prototype.initialize.call(this, rect);
  this._canRepeat = false;
  this.resultBackgroundSprite = null;
  this.setResultWindowMode(ResultLevelUpWindowVisible);
  this.setBaseActorSprite();
  this.loadBitmap();
};

Window_ResultLevelUpMain.prototype.loadWindowskin = function() {
  if (ResultLevelUpWindowsSkin) {
    this.windowskin = ImageManager.loadSystem(ResultLevelUpWindowsSkin);
  } else {
    Window_Base.prototype.loadWindowskin.call(this);
  }
};

Window_ResultLevelUpMain.prototype.setResultBackground = function(sprite) {
  this.resultBackgroundSprite = sprite;
};

Window_ResultLevelUpMain.prototype.setBaseActorSprite = function() {
  const sprite = new Sprite_ResultActor();
  this.addChild(sprite);
  this._actorSprite = sprite;
  sprite.hide();
};

Window_ResultLevelUpMain.prototype.loadBitmap = function() {
  let bitmap = null;
  ImageManager.nuun_LoadPictures(LevelUpActorBackGroundImg);
  for (const member of $gameParty.resultMembers()) {
    const data = Imported.NUUN_ActorPicture && ActorPictureEXApp ? battlreActorPicture(member.actorId()) : member.getResultActorData(member.actorId());
    if (data && data.LevelUpActorBackGroundImg) {
      ImageManager.nuun_LoadPictures(data.LevelUpActorBackGroundImg);
    }
    if (Imported.NUUN_ActorPicture && ActorPictureEXApp) {
      bitmap = member.getActorGraphicImg();
    } else {
      bitmap = member.getResultActorImg(member.actorId());
    }
    if (bitmap) {
      ImageManager.nuun_LoadPictures(bitmap);
    }
  }
};

Window_ResultLevelUpMain.prototype.resultBackgroundRefresh = function(data) {
  const img = data && data.LevelUpActorBackGroundImg ? data.LevelUpActorBackGroundImg : LevelUpActorBackGroundImg;
  if (img) {
    const bitmap = ImageManager.nuun_LoadPictures(img);
    this.resultBackgroundSprite.bitmap = bitmap;
    this.resultBackgroundSprite.show();
    if (bitmap && !bitmap.isReady()) {
      bitmap.addLoadListener(this.resultBackgroundScaleRefresh.bind(this, bitmap));
    } else if (bitmap) {
      this.resultBackgroundScaleRefresh(bitmap);
    }
  } else {
    this.resultBackgroundSprite.bitmap = null;
  }
};

Window_ResultLevelUpMain.prototype.resultBackgroundScaleRefresh = function() {
  const sprite = this.resultBackgroundSprite;
  if (BackUiWidth) {
    sprite.x = (Graphics.width - Graphics.boxWidth) / 2 - 4;
    sprite.y = (Graphics.height - Graphics.boxHeight) / 2 - 4;
  } else {
    sprite.x = 0;
    sprite.y = 0;
  }
  if (BackFitWidth) {
    if(BackUiWidth) {
      sprite.scale.x = (this.width !== sprite.bitmap.width ? this.width / sprite.bitmap.width : 1);
      sprite.scale.y = (this.height !== sprite.height ? this.height / sprite.bitmap.height : 1);
    } else {
      sprite.scale.x = (Graphics.width !== sprite.bitmap.width ? Graphics.width / sprite.bitmap.width : 1);
      sprite.scale.y = (Graphics.height !== sprite.bitmap.height ? Graphics.height / sprite.bitmap.height : 1);
    }
  }
};

Window_ResultLevelUpMain.prototype.refresh = function() {
  this.contents.clear();
  const actor = BattleManager.resultLevelUpActors[BattleManager.resultPage - 1];
  const data = Imported.NUUN_ActorPicture && ActorPictureEXApp ? battlreActorPicture(actor.actorId()) : actor.getResultActorData(actor.actorId());
  this.resultBackgroundRefresh(data);
  if (LevelUpActorArea === 'window') {
    this.setupBitmap(actor, data);
  } else {
    if (data) {
      this._actorSprite.setup(actor, data, this.windowFilterWidthArea());
      this._actorSprite.move(this.windowFilteX(), this.windowFilterHeightArea());
      this._actorSprite.show();
    } else {
      this._actorSprite.setup(null, null, this.windowFilterWidthArea());
    }
  }
};

Window_ResultLevelUpMain.prototype.setupBitmap = function(actor, data) {
  let bitmap = null;
  if (Imported.NUUN_ActorPicture && ActorPictureEXApp) {
    bitmap = actor.getActorGraphicImg();
  } else {
    bitmap = actor.getResultActorImg(actor.actorId());
  }
  if (bitmap) {
    bitmap = ImageManager.nuun_LoadPictures(bitmap);
    if (bitmap && !bitmap.isReady()) {
      bitmap.addLoadListener(this.setBitmap.bind(this, bitmap, data));
    } else if (bitmap) {
      this.setBitmap(bitmap, data);
    }
  }
};

Window_ResultLevelUpMain.prototype.setBitmap = function(bitmap, data) {
  let x = data.Actor_X;
  const scale = (data.Actor_Scale || 100) / 100;
  if(ActorPosition === 'left') {
    x += 0;
  } else if (ActorPosition === 'center') {
    x += Math.floor(this.width / 2 - ((bitmap.width * scale) / 2));
  } else {
    x += this.width - (bitmap.width * scale) - 24;
  }
  const dw = bitmap.width * scale;
  const dh = bitmap.height * scale;
  const y = data.Actor_Y + (this.height - (bitmap.height * scale)) - 24;
  this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y, dw, dh);
};

Window_ResultLevelUpMain.prototype.windowFilteX = function() {
  switch (LevelUpActorArea) {
    case 'ui':
      return 0;
    case 'screen':
      return 0 + (Graphics.boxWidth - Graphics.width) / 2;
  }
};

Window_ResultLevelUpMain.prototype.windowFilterWidthArea = function() {
  switch (LevelUpActorArea) {
    case 'window':
      return this.innerWidth;
    case 'ui':
      return this.width;
    case 'screen':
      return Graphics.width;
  }
};

Window_ResultLevelUpMain.prototype.windowFilterHeightArea = function() {
  switch (LevelUpActorArea) {
    case 'window':
      return this.innerHeight;
    case 'ui':
      return this.height;
    case 'screen':
      return Graphics.height - this.y;
  }
};

Window_ResultLevelUpMain.prototype.processCancel = function() {
  SoundManager.playOk();
  this.updateInputData();
  this.deactivate();
  this.callCancelHandler();
};

function Window_ResultActorStatus() {
  this.initialize(...arguments);
}

Window_ResultActorStatus.prototype = Object.create(Window_StatusBase.prototype);
Window_ResultActorStatus.prototype.constructor = Window_ResultActorStatus;

Window_ResultActorStatus.prototype.initialize = function(rect) {
  Window_StatusBase.prototype.initialize.call(this, rect);
  this._isWindow = false;
  this.openness = 255;
  this._oldLevelActorStatus = [];
  this.setResultWindowMode(LevelUpActorWindowVisible);
};

Window_ResultActorStatus.prototype.loadWindowskin = function() {
  if (LevelUpActorStatusWindowsSkin) {
    this.windowskin = ImageManager.loadSystem(LevelUpActorStatusWindowsSkin);
  } else {
    Window_Base.prototype.loadWindowskin.call(this);
  }
};

Window_ResultActorStatus.prototype.refresh = function() {
  this.contents.clear();
  this.drawActorStatus();
};

Window_ResultActorStatus.prototype.maxCols = function() {
  return LevelUpActorCols;
};

Window_ResultActorStatus.prototype.drawActorStatus = function() {
  const actor = BattleManager.resultLevelUpActors[BattleManager.resultPage - 1];
  this._oldLevelActorStatus = BattleManager.resultOldStatusActors[BattleManager.resultPage - 1];
  const lineHeight = this.lineHeight();
  for (const data of LevelUpActorParam) {
    this.resetFontSettings();
    const x_Position = data.X_Position;
    const position = Math.min(x_Position, this.maxCols());
    const rect = this.itemRect(position - 1);
    const x = rect.x + (data.X_Coordinate + data.X_Position);
    const y = (data.Y_Position - 1) * lineHeight + rect.y + data.Y_Coordinate;
    const width = (data.ItemWidth && data.ItemWidth > 0 ? Math.min(data.ItemWidth, rect.width - x) : rect.width - x);
    this.dateDisplay(data, actor, x, y, width);
  }
};

Window_ResultActorStatus.prototype.dateDisplay = function(data, actor, x, y, width) {
  switch (data.StatusParamDate) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
      this.drawStatusParam(data, actor, x, y, width);
      break;
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
      this.drawOriginalStatusParam(data, actor, x, y, width);
      break;
    case 20:
      this.drawActorCharacter(actor, x, y);
      break;
    case 21:
      this.drawActorFace(data, actor, x, y);
      break;
    case 22:
      this.drawSvActor(data, actor, x, y, width);
      break;
    case 30:
      this.drawActorName(data, actor, x, y, width);
      break;
    case 31:
      this.drawActorClass(data, actor, x, y, width);
      break;
    case 32:
      this.drawActorNickname(data, actor, x, y, width);
      break;
    case 33:
      this.drawActorLevel(data, actor, x, y, width);
      break;
    case 40:
      this.drawParams(data, actor, x, y, width);
    case 1000:
      this.drawHorzLine(data, x, y, width);
      break;
    default:
      break;
  }
};

Window_ResultActorStatus.prototype.paramText = function(params, paramName) {
  switch (params) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
      return TextManager.param(params);
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
      return TextManager.param(params - 10);
    case 40:
      return paramName;
    default:
      return null;
  }
};

Window_ResultActorStatus.prototype.paramValue = function(actor, param) {
  switch (param) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
      return actor.param(param);
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
      return actor.paramBase(param - 10);
    default:
      return 0;
  }
};

Window_ResultActorStatus.prototype.paramOld = function(param) {
  return this._oldLevelActorStatus[param];
};

Window_ResultActorStatus.prototype.drawStatusParam = function(data, actor, x, y, width) {
  let x2 = x;
  let systemWidth = data.SystemItemWidth || 160;
  this.changeTextColor(NuunManager.getColorCode(data.SystemNameColor));
  this.contents.fontSize = $gameSystem.mainFontSize() + data.FontSize;
  this.drawText(this.paramText(data.StatusParamDate, data.ParamName), x, y, systemWidth, "left");
  this.resetTextColor();
  x2 += systemWidth + this.itemPadding() * 2;
  if (actor) {
    const value = this.paramValue(actor, data.StatusParamDate);
    if (data.DifferenceVisible && this._oldLevelActorStatus) {
      const oldValue = this.paramOld(data.StatusParamDate);
      this.drawText(oldValue, x2, y, 48, 'right');
      x2 += 48;
      this.changeTextColor(ColorManager.systemColor());
      this.drawText("\u2192", x2, y, 32, "center");
      if (oldValue < value) {
        this.changeTextColor(NuunManager.getColorCode(DifferenceStatusColor));
      } else {
        this.resetTextColor();
      }
      x2 += 32;
    } else {
      x2 += 80;
    }
    this.drawText(value, x2, y, 48, "right");
  }
};

Window_ResultActorStatus.prototype.drawOriginalStatusParam = function(data, actor, x, y, width) {
  let x2 = x;
  let systemWidth = data.SystemItemWidth || 160;
  this.changeTextColor(NuunManager.getColorCode(data.SystemNameColor));
  this.contents.fontSize = $gameSystem.mainFontSize() + data.FontSize;
  this.drawText(this.paramText(data.StatusParamDate, data.ParamName), x, y, systemWidth, "left");
  this.resetTextColor();
  x2 += systemWidth + this.itemPadding() * 2;
  if (actor) {
    const value = this.paramValue(actor, data.StatusParamDate);
    if (data.DifferenceVisible && this._oldLevelActorStatus) {
      const oldValue = this.paramOld(data.StatusParamDate);
      this.drawText(oldValue, x2, y, 48, 'right');
      x2 += 48;
      this.changeTextColor(ColorManager.systemColor());
      this.drawText("\u2192", x2, y, 32, "center");
      if (oldValue < value) {
        this.changeTextColor(NuunManager.getColorCode(DifferenceStatusColor));
      } else {
        this.resetTextColor();
      }
      x2 += 32;
    } else {
      x2 += 80;
    }
    this.drawText(value, x2, y, 48, "right");
  }
};

Window_ResultActorStatus.prototype.drawActorLevel = function(data, actor, x, y, width) {
  let x2 = x;
  let systemWidth = data.SystemItemWidth || 160;
  this.changeTextColor(NuunManager.getColorCode(data.SystemNameColor));
  this.contents.fontSize = $gameSystem.mainFontSize() + data.FontSize;
  this.drawText(TextManager.levelA, x, y, systemWidth, "left");
  this.resetTextColor();
  x2 += systemWidth + this.itemPadding() * 2;
  if (actor) {
    const value = actor._level;
    if (data.DifferenceVisible && this._oldLevelActorStatus) {
      const oldValue = this.paramOld(data.StatusParamDate);
      this.drawText(oldValue, x2, y, 48, 'right');
      x2 += 48;
      this.changeTextColor(ColorManager.systemColor());
      this.drawText("\u2192", x2, y, 32, "center");
      if (oldValue < value) {
        this.changeTextColor(NuunManager.getColorCode(DifferenceLevelColor));
      } else {
        this.resetTextColor();
      }
      x2 += 32;
    } else {
      x2 += 80;
    }
    this.drawText(value, x2, y, 48, "right");
  }
};

Window_ResultActorExp.prototype.drawParams = function(data, actor, x, y, width) {
  if (!data.DetaEval) {
    return;
  }
  const a = actor;
  const d = actor.actor();
  let x2 = x;
  let systemWidth = data.SystemItemWidth || 160;
  if (data.ParamName) {
    this.changeTextColor(NuunManager.getColorCode(data.SystemNameColor));
    this.drawText(data.ParamName, x, y, systemWidth, "left");
  }
  this.resetTextColor();
  x2 += systemWidth + this.itemPadding() * 2;
  if (actor) {
    const value = eval(data.EvalData);
    if (data.DifferenceVisible && this._oldLevelActorStatus) {
      const oldValue = this.paramOld(data.StatusParamDate);
      this.drawText(oldValue, x2, y, 48, 'right');
      x2 += 48;
      this.changeTextColor(ColorManager.systemColor());
      this.drawText("\u2192", x2, y, 32, "center");
      if (oldValue < value) {
        this.changeTextColor(NuunManager.getColorCode(DifferenceStatusColor));
      } else {
        this.resetTextColor();
      }
      x2 += 32;
    } else {
      x2 += 80;
    }
    this.drawText(value, x2, y, 48, "right");
  }
};

Window_ResultActorStatus.prototype.drawActorFace = function(data, actor, x, y) {
  const rect = this.itemRect(0);
  const height = Math.min(LevelUpActorFaceHeight, ImageManager.faceHeight);
  if (Imported.NUUN_ActorPicture && ActorPictureEXApp) {
    this.drawFace(actor.getActorGraphicFace(), actor.getActorGraphicFaceIndex(), x, y, ImageManager.faceWidth, height);
  } else {
    this.drawFace(actor.faceName(), actor.faceIndex(), x, y, ImageManager.faceWidth, height);
  }
};

Window_ResultActorStatus.prototype.drawSvActor = function(data, actor, x, y, width) {
  const bitmap = ImageManager.loadSvActor(actor.battlerName());
  this.drawSvActorImg(actor, x, y);
};

Window_ResultActorStatus.prototype.drawActorName = function(data, actor, x, y, width) {
  if (actor.isDead()) {
    this.changeTextColor(ColorManager.deathColor());
  }
  this.contents.fontSize = $gameSystem.mainFontSize() + data.FontSize;
  Window_StatusBase.prototype.drawActorName.call(this, actor, x, y, width);
};

Window_ResultActorStatus.prototype.drawActorClass = function(data, actor, x, y, width) {
  this.contents.fontSize = $gameSystem.mainFontSize() + data.FontSize;
  Window_StatusBase.prototype.drawActorClas.call(this, actor, x, y, width);
};

Window_ResultActorStatus.prototype.drawActorNickname = function(data, actor, x, y, width) {
  this.contents.fontSize = $gameSystem.mainFontSize() + data.FontSize;
  Window_StatusBase.prototype.drawActorNickname.call(this, actor, x, y, width);
};

Window_ResultActorStatus.prototype.drawSvActorImg = function(actor, x, y) {
  const key = "resultLevelUpSvActor%1".format(actor.actorId());
  const sprite = this.createInnerSprite(key, Sprite_ResultSvActor);
  sprite.setBattler(actor);
  sprite.show();
  sprite.setHome(x, y);
  sprite.startMotion();
};

Window_ResultActorStatus.prototype.drawHorzLine = function(data, x, y, width) {
  const lineY = y + this.lineHeight() / 2 - 1;
  this.contents.paintOpacity = 48;
  this.contents.fillRect(x, lineY, width, 2, NuunManager.getColorCode(data.SystemNameColor));
  this.contents.paintOpacity = 255;
};


function Window_ResultLearnSkill() {
  this.initialize(...arguments);
}

Window_ResultLearnSkill.prototype = Object.create(Window_Selectable.prototype);
Window_ResultLearnSkill.prototype.constructor = Window_ResultLearnSkill;

Window_ResultLearnSkill.prototype.initialize = function(rect) {
  Window_Selectable.prototype.initialize.call(this, rect);
  this._isWindow = false;
  this.page = 0;
  this.maxPage = 0;
  this.skillRows = 1;
  this._learnSkillMaxPage = 1;
  this.setResultWindowMode(LearnSkillWindowVisible);
};

Window_ResultLearnSkill.prototype.loadWindowskin = function() {
  if (LearnSkillWindowsSkin) {
    this.windowskin = ImageManager.loadSystem(LearnSkillWindowsSkin);
  } else {
    Window_Base.prototype.loadWindowskin.call(this);
  }
};

Window_ResultLearnSkill.prototype.itemHeight = function() {
  return LearnSkillContentsHeight || 36;
};


Window_ResultLearnSkill.prototype.maxPages = function() {
  return this.maxPage;
};

Window_ResultLearnSkill.prototype.maxSkillPages = function(items, rows, cols) {
  return Math.ceil(items.length / (rows * cols));
};

Window_ResultLearnSkill.prototype.getLearnSkillRows = function(y) {
  return Math.floor((this.innerHeight - y) / this.lineHeight());
};

Window_ResultLearnSkill.prototype.setMaxPage = function(items, rows, cols) {
  const pages = Math.ceil(items.length / (rows * cols));
  const maxPage = this.maxPages();
  if (maxPage < pages) {
    this.maxPage = pages;
  }
};

Window_ResultLearnSkill.prototype.maxCols = function() {
  return LearnSkillCols;
};

Window_ResultLearnSkill.prototype.refresh = function() {
  this.contents.clear();
  this.drawLearnSkill(false);
  this.drawLearnSkill(true);
};

Window_ResultLearnSkill.prototype.drawLearnSkill = function(mode) {
  const lineHeight = this.lineHeight();
  const actor = BattleManager.resultLevelUpActors[BattleManager.resultPage - 1];
  for (const data of LearnSkillParam) {
    this.resetFontSettings();
    const x_Position = data.X_Position;
    const position = Math.min(x_Position, this.maxCols());
    const rect = this.itemRect(position - 1);
    const x = rect.x + (data.X_Coordinate + data.X_Position);
    const y = (data.Y_Position - 1) * lineHeight + rect.y + data.Y_Coordinate;
    const width = data.ItemWidth && data.ItemWidth > 0 ? data.ItemWidth : this.widthMode(rect, data);
    this.dateDisplay(data, actor, x, y, width, mode);
  }
};

Window_ResultLearnSkill.prototype.widthMode = function(rect, data) {
  const colSpacing = this.colSpacing();
  const cols = Math.min(this.maxCols(), data.ItemCols);
  return (rect.width + colSpacing) * cols - colSpacing;
};

Window_ResultLearnSkill.prototype.dateDisplay = function(data, actor, x, y, width, mode) {
  if (mode) {
    switch (data.LearnSkillParamData) {
      case 10:
        this.drawLearnSkillName(data, x, y, width);
        break;
    }
  } else {
    switch (data.LearnSkillParamData) {
      case 0:
        break;
      case 1:
        this.drawLearnSkillList(data, actor, x, y, width);
        break;
      case 1000:
        this.drawHorzLine(data, x, y, width);
        break;
    }
  }
};

Window_ResultLearnSkill.prototype.drawLearnSkillName = function(data, x, y, width) {
  if (data.ParamName) {
    this.changeTextColor(NuunManager.getColorCode(data.SystemNameColor));
    this.contents.fontSize = $gameSystem.mainFontSize() + data.FontSize;
    const systemWidth = data.SystemItemWidth || 160;
    this.drawText(data.ParamName, x, y, systemWidth, "left");
    this.resetTextColor();
    const maxPage = this._learnSkillMaxPage;
    if (maxPage > 1) {
      this.drawText(this.page + 1 +"/"+maxPage, x, y, width, "right");
    }
  }
};

Window_ResultLearnSkill.prototype.drawLearnSkillList = function(data, actor,  x, y, width) {
  const items = actor._learnSkill;
  const lineHeight = this.lineHeight();
  const cols = Math.min(this.maxCols(), data.ItemCols);
  const contentsWidth = Math.floor(width / cols);
  const colSpacing = this.colSpacing();
  this.contents.fontSize = $gameSystem.mainFontSize() + data.FontSize;
  let y2 = y;
  if (data.ParamName) {
    const systemWidth = data.SystemItemWidth || 160;
    this.changeTextColor(NuunManager.getColorCode(data.SystemNameColor));
    this.drawText(data.ParamName, x, y, systemWidth, "left");
    y2 += lineHeight;
  }
  this.resetTextColor();
  const rows = data.ItemRows > 0 ? data.ItemRows : this.getLearnSkillRows(y2);
  this.skillRows = rows;
  this.setMaxPage(items, rows, cols)
  const maxPage = this.maxSkillPages(items, rows, cols);
  this._learnSkillMaxPage = maxPage;
  if (items.length > 0) {
    const index = (rows * cols) * Math.min(this.page, maxPage - 1);
    const maxItems = Math.min(rows * cols, items.length - index);
    if (maxPage > 1 && data.ParamName) {
      this.drawText(this.page + 1 +"/"+maxPage, x, y, width, "right");
    }
    for (let i = 0; maxItems > i; i++) {
      let y3 = y2 + lineHeight * Math.floor(i / cols);
      const x2 = contentsWidth * (i % cols) + x;
      this.resetTextColor();
      this.drawItemName($dataSkills[items[i + index]], x2, y3, contentsWidth - colSpacing);
    }
  }
};

Window_ResultLearnSkill.prototype.drawHorzLine = function(data, x, y, width) {
  const lineY = y + this.lineHeight() / 2 - 1;
  this.contents.paintOpacity = 48;
  this.contents.fillRect(x, lineY, width, 2, NuunManager.getColorCode(data.SystemNameColor));
  this.contents.paintOpacity = 255;
};


const _BattleManager_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function() {
  _BattleManager_initMembers.call(this);
  this.resultMode = false;
  this._resultOn = false;
  this._victoryBGMOn = false;
  this._victoryStart = false;
  this.resultRefresh = 0;
  this.resultBusy = this.setResultBusy();
  this.resultPage = 0;
  this.resultLevelUpActors = [];
  this.resultOldStatusActors = [];
};

const _BattleManager_update = BattleManager.update;
BattleManager.update = function(timeActive) {
  _BattleManager_update.call(this, timeActive);
  if (this.resultRefresh > 0) {
    this.resultRefresh--;
  }
};

BattleManager.setResultBusy = function() {
  return this.resultBusy = ResultVisibleFrame || 0;
};

BattleManager.startResultBusy = function() {
  return this.resultBusy === ResultVisibleFrame || 0;
};

const _BattleManager_processVictory = BattleManager.processVictory;
BattleManager.processVictory = function() {
  if (this.startResultBusy()) {
    this._resultOn = true;
    if (this.resultBusy === 0) {
      _BattleManager_processVictory.call(this);
      return;
    }
    this.displayVictoryNoBusy();
  }
  if (this.resultBusy > 0) {
    this.resultBusy--;
  }
  if (this.resultBusy === 0) {
    _BattleManager_processVictory.call(this);
    this.displayVictoryOnBusy();
  }
};

BattleManager.displayVictoryNoBusy = function() {
  $gameParty.removeBattleStates();
  $gameParty.performVictory();
  this.playVictoryMe();
  this.replayBgmAndBgs();
  this.makeRewards();
  this._victoryStart = true;
};

BattleManager.displayVictoryOnBusy = function() {
  this._victoryStart = false;
};

const _BattleManager_makeRewards = BattleManager.makeRewards;
BattleManager.makeRewards = function() {
  if (!this._victoryStart) {
    _BattleManager_makeRewards.call(this);
    if (StealItemVisible && Imported.NUUN_StealableItems) {
      this._rewards.stealItems = $gameTroop.getStealItems();
    }
    this.actorLevelUpStatus();
  }
};

BattleManager.actorLevelUpStatus = function() {
  const exp = BattleManager._rewards.exp;
  for (const actor of $gameParty.resultMembers()) {
    const level = actor.resultGainExp(exp);
    if (level > actor._level) {
      actor.resultLevelUp = true;
      this._levelUpPageEnable = this._levelUpPageEnable === undefined || this._levelUpPageEnable === null ? LevelUpWindowShow : this._levelUpPageEnable;
      this.resultLevelUpActors.push(actor);
      this.resultOldStatusActors.push(this.getResultOldStatus(actor));
    }
  }
};

BattleManager.getResultOldStatus = function(actor) {
  const statusData = [];
  for (const data of LevelUpActorParam) {
    switch (data.StatusParamDate) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
        if (data.DifferenceVisible) {
          statusData[data.StatusParamDate] = actor.param(data.StatusParamDate);
        }
        break;
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
        if (data.DifferenceVisible) {
          statusData[data.StatusParamDate] = actor.paramBase(data.StatusParamDate - 10);
        }
        break;
      case 33:
        if (data.DifferenceVisible) {
          statusData[data.StatusParamDate] = actor._level;
        }
        break;
      case 40:
        if (data.DifferenceVisible) {
          const a = actor;
          const d = actor.actor();
          statusData[data.StatusParamDate] = eval(data.DataEval);
        }
        break;
    }
  }
  return statusData;
};

BattleManager.displayVictoryMessage = function() {
  //メッセージは表示しない。
};

BattleManager.displayRewards = function() {
  SceneManager._scene.resultOpen();
  this.resultMode = true;
};

const _BattleManager_gainRewards = BattleManager.gainRewards;
BattleManager.gainRewards = function() {
  $gameParty.resetLearnSkill();
  _BattleManager_gainRewards.call(this);
  this.resultMode = false;
};

const _BattleManager_isBusy = BattleManager.isBusy;
BattleManager.isBusy = function() {
  return SceneManager._scene.isActiveResult() || _BattleManager_isBusy.call(this);
};

const _BattleManager_replayBgmAndBgs = BattleManager.replayBgmAndBgs;
BattleManager.replayBgmAndBgs = function() {
  if (this._victoryStart) {
    return;
  }
  this._victoryBGMEnable = (this._victoryBGMEnable === undefined || this._victoryBGMEnable === null) ? true : this._victoryBGMEnable;
  if (this._victoryBGMEnable && this._resultOn) {
    if (this._victoryBgmDate && this._victoryBgmDate.name) {
      AudioManager.playBgm(this._victoryBgmDate);
      this._victoryBGMOn = true;
      return;
    } else if (VictoryBGM) {
      AudioManager.playBgm(this.playVictoryBgm());
      this._victoryBGMOn = true;
      return;
    }
  }
  _BattleManager_replayBgmAndBgs.call(this);
};

BattleManager.playVictoryBgm = function() {
  const _victoryBgm = {};
  _victoryBgm.name = VictoryBGM;
  _victoryBgm.volume = VictoryVolume;
  _victoryBgm.pitch = VictoryPitch;
  _victoryBgm.pan = VictoryPan;
  return _victoryBgm;
};

BattleManager.victoryBGMSelect = function(bgmDate) {
  if (!bgmDate._BGM) {
    this._victoryBgmDate = {};
    this._noVictoryME = false;
    return;
  }
  this._victoryBgmDate = {};
  this._victoryBgmDate.name = String(bgmDate._BGM);
  this._victoryBgmDate.volume = Number(bgmDate.Volume);
  this._victoryBgmDate.pitch = Number(bgmDate.Pitch);
  this._victoryBgmDate.pan = Number(bgmDate.Pan);
  this._noVictoryME = eval(bgmDate.NoVictoryME);
};

BattleManager.levelUpSeSelect = function(bgmSe) {
  if (!bgmSe.LevelUP_SE) {
    this._levelUpSeDate = {};
    return;
  }
  this._levelUpSeDate = {};
  this._levelUpSeDate.name = String(bgmSe.LevelUP_SE);
  this._levelUpSeDate.volume = Number(bgmSe.Volume);
  this._levelUpSeDate.pitch = Number(bgmSe.Pitch);
  this._levelUpSeDate.pan = Number(bgmSe.Pan);
};

const _BattleManager_playVictoryMe = BattleManager.playVictoryMe;
BattleManager.playVictoryMe = function() {
  if (this._victoryStart) {
    return;
  }
  if (!this._noVictoryME) {
    _BattleManager_playVictoryMe.call(this);
  }
};

BattleManager.playMapBgm = function() {
  if (!this._victoryBGMOn) {
    return;
  }
  if (this._mapBgm) {
    AudioManager.replayBgm(this._mapBgm);
  } else {
    AudioManager.stopBgm();
  }
  if (this._mapBgs) {
    AudioManager.replayBgs(this._mapBgs);
  }
};

BattleManager.victoryBGMEnable = function(enable) {
  this._victoryBGMEnable = enable;
};

BattleManager.levelUpPageEnable = function(enable) {
  this._levelUpPageEnable = enable;
};

const _BattleManager_isBattleEnd = BattleManager.isBattleEnd;
BattleManager.isBattleEnd = function() {
  return _BattleManager_isBattleEnd.call(this) || this._resultOn;
};

function battlreActorPicture(id) {//立ち絵表示EX用
  const actors = ActorPictureData;
  const find = actors.find(actor => actor.actorId === id);
  if (!find) {
    return {Actor_X: 0, Actor_Y: 0, Img_SX: 0, Img_SY: 0, Actor_Scale: 100};
  }
  return find;
};


function Sprite_ResultSvActor() {
  this.initialize(...arguments);
}

Sprite_ResultSvActor.prototype = Object.create(Sprite_Actor.prototype);
Sprite_ResultSvActor.prototype.constructor = Sprite_ResultSvActor;

Sprite_ResultSvActor.prototype.updateVisibility = function() {
  Sprite_Clickable.prototype.updateVisibility.call(this);
};

Sprite_ResultSvActor.prototype.initialize = function(battler) {
  Sprite_Actor.prototype.initialize.call(this, battler);

};

Sprite_ResultSvActor.prototype.moveToStartPosition = function() {
  this.startMove(0, 0, 0);
};

Sprite_ResultSvActor.prototype.updateMain = function() {
  this.updateBitmap();
  this.updateFrame();
  this.updateMove();
};

Sprite_ResultSvActor.prototype.startMotion = function() {
  if (this._actor.isDead()) {
    motionType = 'dead';
  } else {
    motionType = 'victory';
  }
  Sprite_Actor.prototype.startMotion.call(this, motionType);
};

Sprite_ResultSvActor.prototype.setupWeaponAnimation = function() {
  //if (this._actor.isWeaponAnimationRequested()) {
  //    this._weaponSprite.setup(this._actor.weaponImageId());
  //    this._actor.clearWeaponAnimation();
  //}
};


function Sprite_ResultExpGauge() {
  this.initialize(...arguments);
}

Sprite_ResultExpGauge.prototype = Object.create(Sprite_Gauge.prototype);
Sprite_ResultExpGauge.prototype.constructor = Sprite_ResultExpGauge;

Sprite_ResultExpGauge.prototype.initialize = function() {
  this._gaugeWidth = Math.min(Gauge_Width, resultExpMaxWidth);
  Sprite_Gauge.prototype.initialize.call(this);
  this._currentExp = 0;
  this._startCurrentExp = 0;
  this._resultExpMoveMode = false;
  this._resultExpMoveDelay = 0;
  this._resultExpMoveValue = NaN;
};

Sprite_ResultExpGauge.prototype.bitmapWidth = function() {
  return this._gaugeWidth;
};

Sprite_ResultExpGauge.prototype.gaugeHeight = function() {
  return Gauge_Height;
};

Sprite_ResultExpGauge.prototype.gaugeX = function() {
  return 0;
};

Sprite_ResultExpGauge.prototype.valueFontSize = function() {
  return $gameSystem.mainFontSize() + GaugeValueFontSize;
};

Sprite_ResultExpGauge.prototype.setup = function(battler, statusType) {
  this._nowLevel = battler._level;
  Sprite_Gauge.prototype.setup.call(this, battler, statusType);
  this._instant = false;
  this._startCurrentExp = battler.currentExp() - battler.currentLevelExp();
  this._resultExpMoveMode = false;
  this._resultExpMoveDelay = 0;
  this._resultExpMoveValue = isNaN(this._resultExpMoveValue) ? this.currentValue() : this._resultExpMoveValue;
};

Sprite_ResultExpGauge.prototype.updateBitmap = function() {
  Sprite_Gauge.prototype.updateBitmap.call(this);
  const value = this.currentValue();
  if (this._resultExpMoveValue !== value) {
    if (isNaN(this._resultExpMoveValue)) {
      this._resultExpMoveValue = this.currentValue();
    }
    this.valueRedraw();
  }
};

Sprite_ResultExpGauge.prototype.valueRedraw = function() {
  this.currentResultValueMove(this.currentValue());
  Sprite_Gauge.prototype.redraw.call(this);
};

Sprite_ResultExpGauge.prototype.drawValue = function() {
  const width = this.bitmapWidth();
  const height = this.textHeight ? this.textHeight() : this.bitmapHeight();
  this._resultExpMoveMode = (GaugeRefreshFrame > 0 && GaugeValueShow > 0);
  let expValue = this.currentValue();
  if (GaugeValueShow > 0) {
    this.setupValueFont();
    if (GaugeValueShow === 3) {
      expValue = this.maxLavel() ? this.currentMaxValue() : expValue;
      const rate = NuunManager.numPercentage(expValue / this.currentMaxValue() * 100, Decimal, DecimalMode);
      this.bitmap.drawText(rate +"%", 0, GaugeValueY, width, height, "right");
    } else if (GaugeValueShow === 1) {
      expValue = this.maxLavel() ? "----------" : expValue;
      this.bitmap.drawText(expValue, 0, GaugeValueY, width, height, "right");
    } else if (GaugeValueShow === 2) {
      expValue = this.maxLavel() ? "----------" : expValue;
      if (!this.maxLavel()) {
        this.bitmap.fontSize = $gameSystem.mainFontSize() + GaugeMaxValueFontSize;
        const textWidth = Math.min(this.bitmap.measureTextWidth(this.currentMaxValue()), 70);
        this.bitmap.drawText(this.currentMaxValue(), width - textWidth, GaugeValueY, textWidth, height, "right");
        this.bitmap.fontSize = this.valueFontSize();
        this.bitmap.drawText("/", width - (textWidth + 40), SeparationY, 36, height, "right");
        this.bitmap.drawText(expValue, width - (textWidth + 90), GaugeMaxValueY, 70, height, "right");
      } else {
        this.bitmap.drawText("----------", 0, GaugeValueY, width, height, "right");
      }
    }
  }
};

Sprite_ResultExpGauge.prototype.currentValue = function() {
  if (this._battler && this._resultExpMoveMode) {
    this._resultExpMoveMode = false;
    return Math.round(this._resultExpMoveValue);
  }
  return Sprite_Gauge.prototype.currentValue.call(this);
};

Sprite_ResultExpGauge.prototype.maxLavel = function() {
  return this._nowLevel >= this._battler.maxLevel();
};

const _Sprite_Gauge_currentValue = Sprite_Gauge.prototype.currentValue;
Sprite_Gauge.prototype.currentValue = function() {
  return this._battler && this._statusType === "result_exp" ? 
  this.maxLavel() ? this.currentMaxValue() : Math.min(this._battler.currentExp() - this._battler.expForLevel(this._nowLevel), this.currentMaxValue()) : _Sprite_Gauge_currentValue.call(this);
};

const _Sprite_Gauge_currentMaxValue = Sprite_Gauge.prototype.currentMaxValue;
Sprite_Gauge.prototype.currentMaxValue = function() {
  return this._battler && this._statusType === "result_exp" ? this._battler.expForLevel(this._nowLevel + 1) - this._battler.expForLevel(this._nowLevel) :
  _Sprite_Gauge_currentMaxValue.call(this);
};

Sprite_ResultExpGauge.prototype.currentResultValueMove = function(currentValue) {
  if (this._resultExpMoveDelay === 0) {
    this._resultExpMoveDelay = (currentValue - this._resultExpMoveValue) / (GaugeRefreshFrame > 0 ? this.smoothness() : 1);
  }
  if (this._resultExpMoveValue > currentValue) {
    if (this._resultExpMoveValue <= currentValue) {
      this._resultExpMoveValue = currentValue;
      this._resultExpMoveDelay = 0;
    }
  } else if (this._resultExpMoveValue < currentValue) {
      this._resultExpMoveValue += this._resultExpMoveDelay;
    if (this._resultExpMoveValue >= currentValue) {
      this._resultExpMoveValue = currentValue;
      this._resultExpMoveDelay = 0;
    }
  }
};

Sprite_ResultExpGauge.prototype.updateTargetValue = function(value, maxValue) {
  if (this._instant) {
    this._startCurrentExp = 0;
  }
  Sprite_Gauge.prototype.updateTargetValue.call(this, value, maxValue);
};

Sprite_ResultExpGauge.prototype.updateGaugeAnimation = function() {
  if (this._instant) {
    this._value = this.maxLavel() ? this._targetMaxValue : 0;
    this._maxValue = this._targetMaxValue;
    this.redraw();
    this._instant = false;
  } else {
    Sprite_Gauge.prototype.updateGaugeAnimation.call(this);
  }
  if (this._nowLevel < this._battler._level && this._duration === 0) {
    this._nowLevel++;
    this._instant = true;
    this._resultExpMoveValue = 0;
    if (BattleManager._levelUpSeDate) {
      AudioManager.playSe(BattleManager._levelUpSeDate);
    } else {
      AudioManager.playSe({"name":LevelUpSe,"volume":volume,"pitch":pitch,"pan":pan});
    }
  }
};

Sprite_ResultExpGauge.prototype.smoothSpeed = function() {
  return (this.currentValue() - this._startCurrentExp) / (BattleManager._rewards.exp * this._battler.finalExpRate());
};

Sprite_ResultExpGauge.prototype.smoothness = function() {
  return Math.max(Math.floor(GaugeRefreshFrame * this.smoothSpeed()), 1);
};

Sprite_ResultExpGauge.prototype.gaugeColor1 = function() {
  return ColorManager.resultExpGaugeColor1();
};

Sprite_ResultExpGauge.prototype.gaugeColor2 = function() {
  return ColorManager.resultExpGaugeColor2();
};

ColorManager.resultExpGaugeColor1 = function() {
  return this.textColor(17);
};

ColorManager.resultExpGaugeColor2 = function() {
  return this.textColor(6);
};


function Sprite_ResultActor() {
  this.initialize(...arguments);
}

Sprite_ResultActor.prototype = Object.create(Sprite.prototype);
Sprite_ResultActor.prototype.constructor = Sprite_ResultActor;

Sprite_ResultActor.prototype.initialize = function() {
  Sprite.prototype.initialize.call(this);
  this.initMembers();
};

Sprite_ResultActor.prototype.initMembers = function() {
  this._battler = null;
  this._data = null;
  this.anchor.x = 0.5;
  this.anchor.y = 1.0;
  this.createBitmap();
  
};

Sprite_ResultActor.prototype.createBitmap = function() {
  this.bitmap = new Bitmap(Graphics.width, Graphics.height);
};

Sprite_ResultActor.prototype.setup = function(battler, data, width) {
  if (this._battler !== battler) {
    this._data = data;
    this._battler = battler;
    this._areaWidth = width;
    if (battler && data) {
      this.setupBitmap();
      const scale = (data ? data.Actor_Scale : 100) / 100;
      this.scale.x = scale;
      this.scale.y = scale;
    } else {
      this.bitmap = null;
    }
  }
};

const _Sprite_ResultActor_move = Sprite_ResultActor.prototype.move;
Sprite_ResultActor.prototype.move = function(x, y) {
  x += this._data.Actor_X + ButlerActors_X + this.actorXPosition();
  y += this._data.Actor_Y + ButlerActors_Y;
  _Sprite_ResultActor_move.call(this, x, y);
};

Sprite_ResultActor.prototype.setupBitmap = function() {
  const actor = this._battler;
  let bitmap = null;
  if (Imported.NUUN_ActorPicture && ActorPictureEXApp) {
    bitmap = actor.getActorGraphicImg();
  } else {
    bitmap = actor.getResultActorImg(actor.actorId());
  }
  if (bitmap) {
    bitmap = ImageManager.nuun_LoadPictures(bitmap);
    if (bitmap && !bitmap.isReady()) {
      bitmap.addLoadListener(this.setBitmap.bind(this, bitmap));
    } else if (bitmap) {
      this.setBitmap(bitmap);
    }
  }
};

Sprite_ResultActor.prototype.setBitmap = function(bitmap) {
  this.bitmap = bitmap;
};

Sprite_ResultActor.prototype.actorXPosition = function() {
  switch (ActorPosition) {
    case 'left':
      return Math.floor(this.bitmap.width / 2);
    case 'center':
      return Math.floor(this._areaWidth / 2);
    case 'right':
      return this._areaWidth - Math.floor(this.bitmap.width / 2);
    default:
      return 0;
  }
};

function Sprite_ResultExpValue() {
  this.initialize(...arguments);
}

Sprite_ResultExpValue.prototype = Object.create(Sprite.prototype);
Sprite_ResultExpValue.prototype.constructor = Sprite_ResultExpValue;

Sprite_ResultExpValue.prototype.initialize = function() {
  this._gaugeWidth = resultExpMaxWidth;
  Sprite.prototype.initialize.call(this);
  this.initMembers();
};

Sprite_ResultExpValue.prototype.initMembers = function() {
  this._exp = 0;
  this.getMode = 0;
  this._updateflame = 0;
  this._battler = null;
  this._textColor = "";
  this._updateOn = true;
  this.createBitmap();
};

Sprite_ResultExpValue.prototype.setup = function(battler, data) {
  this._battler = battler;
  this._data = data;
  if (this._updateOn) {
    const exp = BattleManager._rewards.exp;
    this._exp = battler ? Math.round(exp * battler.finalExpRate()) : exp;
    this._textColor = this.setTextColorMode(exp);
    this._updateflame = this._exp / GaugeRefreshFrame;
    this.redraw();
    this._updateOn = false;
  }
};

Sprite_ResultExpValue.prototype.createBitmap = function() {
  const width = this.bitmapWidth();
  const height = this.bitmapHeight();
  this.bitmap = new Bitmap(width, height);
};

Sprite_ResultExpValue.prototype.setTextColorMode = function(exp) {
  if (exp > this._exp && this._exp > 0) {
    return NuunManager.getColorCode(EXPResistValueColor)
  } else if (exp < this._exp) {
    return NuunManager.getColorCode(EXPBoostValueColor)
  } else {
    return ColorManager.normalColor();
  }
};

Sprite_ResultExpValue.prototype.update = function() {
  Sprite.prototype.update.call(this);
  this.updateBitmap();
};

Sprite_ResultExpValue.prototype.bitmapWidth = function() {
  return this._gaugeWidth;
};

Sprite_ResultExpValue.prototype.bitmapHeight = function() {
  return 24;
};

Sprite_ResultExpValue.prototype.updateBitmap = function() {
  if (this._exp > 0) {
    this._exp -= this._updateflame;
    this._exp = Math.max(this._exp, 0);
    this.redraw();
  }
};

Sprite_ResultExpValue.prototype.expValue = function() {
  return this._battler ? Math.floor(this._exp) : "";
};

Sprite_ResultExpValue.prototype.redraw = function() {
  const data = this._data;
  const exp = this.expValue();
  const width = this.bitmapWidth();
  const height = this.bitmapHeight();
  this.setupFont();
  this.bitmap.clear();
  const systemWidth = data.SystemItemWidth || 60;
  this.bitmap.drawText(data.ParamName || '', 0, 0, systemWidth, height, "left");
  this.setupValueFont();
  this.bitmap.drawText('+'+ exp, systemWidth + 8, 0, width - systemWidth - 8, height, "left");
};

Sprite_ResultExpValue.prototype.setupFont = function() {
  this.bitmap.fontFace = this.textFontFace();
  this.bitmap.fontSize = this.fontSize();
  this.bitmap.textColor = NuunManager.getColorCode(this._data.SystemNameColor);
  this.bitmap.outlineColor = this.outlineColor();
  this.bitmap.outlineWidth = this.outlineWidth();
};

Sprite_ResultExpValue.prototype.setupValueFont = function() {
  this.bitmap.fontFace = this.valueFontFace();
  this.bitmap.fontSize = this.fontSize();
  this.bitmap.textColor = this.textColor();
  this.bitmap.outlineColor = this.outlineColor();
  this.bitmap.outlineWidth = this.outlineWidth();
};

Sprite_ResultExpValue.prototype.textFontFace = function() {
  return $gameSystem.mainFontFace();
};

Sprite_ResultExpValue.prototype.valueFontFace = function() {
  return $gameSystem.numberFontFace();
};

Sprite_ResultExpValue.prototype.fontSize = function() {
  return $gameSystem.mainFontSize() + (this._data ? this._data.FontSize : 0);
};

Sprite_ResultExpValue.prototype.textColor = function() {
  return this._textColor;
};

Sprite_ResultExpValue.prototype.outlineColor = function() {
  return ColorManager.outlineColor();
};

Sprite_ResultExpValue.prototype.outlineWidth = function() {
  return 3;
};

})();