﻿/*:-----------------------------------------------------------------------------------
 * NUUN_BattlePosition.js
 * 
 * Copyright (C) 2020 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 * 更新履歴
 * 2020/12/15 Ver.1.0.0
 * 初版
 * 2020/12/16 Ver.1.0.1
 * UIサイズ変更時のエネミーの座標シフト方法にUIサイズに比例してシフトする機能を追加。
 */ 
/*:
 * @target MZ
 * @plugindesc 解像度変更時のアクター、エネミー座標調整、戦闘背景Y座標調整プラグイン
 * @author NUUN
 *            
 * @help UIサイズを変更した際、エネミー、アクターの表示座標がUI画面の左上基準に表示される問題を修正。
 * またアクターとエネミーの座標の調整が出来ます。
 * 
 * 戦闘背景のY座標を調整できます。
 * 
 * 画面上部に見切れて表示されてるエネミーにステートが付与された時のアイコン表示が、画面から見切れて表示される問題を修正。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 
 * @param ActorSideViewXPosition
 * @desc アクターの基本X座標を移動させます。
 * @text アクターXポジション
 * @type number
 * @default 0
 * 
 * @param ActorSideViewYPosition
 * @desc アクターの基本Y座標を移動させます。
 * @text アクターYポジション
 * @type number
 * @default 0
 * @min -999
 * 
 * @param EnemyXPositionMode
 * @desc UI横幅変更時のエネミーのシフト方法を指定します。（true:そのまま右にシフト　false:UI横幅サイズに比例してシフト）
 * @text UI横幅変更時エネミーXシフト座標モード
 * @type boolean
 * @default true
 * 
 * @param EnemyXPosition
 * @desc エネミーの基本X座標を移動させます。
 * @text エネミーXポジション
 * @type number
 * @default 0
 * @min -999
 * 
 * @param EnemyYPosition
 * @desc エネミーの基本Y座標を移動させます。
 * @text エネミーYポジション
 * @type number
 * @default 0
 * @min -999
 * 
 * @param BackgroundFit
 * @desc バトル背景を画面サイズに合わせる。(フロントビューのみ)
 * @text 画面サイズ調整
 * @type boolean
 * @default false
 * 
 * @param BackgroundPosition
 * @desc バトル背景のY座標を移動させます。
 * @text バトル背景Yポジション
 * @type number
 * @default 0
 * @min -999
 * 
 */
var Imported = Imported || {};
Imported.NUUN_BattlePosition = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_BattlePosition');
  const actorXPosition = Number(parameters['ActorSideViewXPosition'] || 0);
  const actorYPosition = Number(parameters['ActorSideViewYPosition'] || 0);
  const EnemyXPositionMode = eval(parameters['EnemyXPositionMode'] || true);
  const enemyXPosition = Number(parameters['EnemyXPosition'] || 0);
  const enemyYPosition = Number(parameters['EnemyYPosition'] || 0);
  const backgroundFit = eval(parameters['BackgroundFit'] || false);
  const backgroundPosition = Number(parameters['BackgroundPosition'] || 0);

  Sprite_Actor.prototype.setActorHome = function(index) {
    const x = ((Graphics.boxWidth - 808) / 2 + actorXPosition + 600) + index * 32;
    const y = ((Graphics.boxHeight - 616) / 2 + actorYPosition + 280) + index * 48;
    this.setHome(x, y);
  };
  
  Sprite_Enemy.prototype.setBattler = function(battler) {
    Sprite_Battler.prototype.setBattler.call(this, battler);
    this._enemy = battler;
    let x = this.setPosition(battler) + enemyXPosition;
    let y = battler.screenY() + (Graphics.boxHeight - 616) / 2 + enemyYPosition;
    this.setHome(x, y);
    this._stateIconSprite.setup(battler);
  };

  Sprite_Enemy.prototype.setPosition = function(battler) {
    return $gameSystem.isSideView() ? 0 : EnemyXPositionMode ? (Graphics.boxWidth - 808) / 2 + battler.screenX(): Graphics.boxWidth / 808 * battler.screenX();
  };

  const _Sprite_Battleback_adjustPosition = Sprite_Battleback.prototype.adjustPosition;
  Sprite_Battleback.prototype.adjustPosition = function() {
    _Sprite_Battleback_adjustPosition.call(this);
    if (backgroundFit && !$gameSystem.isSideView()){
      this.width = this.bitmap.width;
      this.height = this.bitmap.height;
      this.x = 0;
      this.scale.x = Graphics.width / this.bitmap.width;
      this.scale.y = Graphics.height / this.bitmap.height;
    }
    this.y += backgroundPosition;
  };

  Sprite_Enemy.prototype.updateStateSprite = function() {
    this._stateIconSprite.y = -Math.round((this.bitmap.height + 40) * 0.9);
    if (this._stateIconSprite.y < 20 - this.y) {
        this._stateIconSprite.y = 40 - this.y;
    }
  };
})();
