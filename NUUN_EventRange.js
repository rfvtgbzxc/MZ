/*:-----------------------------------------------------------------------------------
 * NUUN_EventRange.js
 * 
 * Copyright (C) 2022 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc イベント接触判定拡張
 * @author NUUN
 * @version 1.2.0
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * イベントの接触判定を拡張します。
 * 
 * イベントのメモ欄
 * <EventRange:besideRange,[lx],[rx]>
 * [lx]:イベントの接触左側範囲
 * [ry]:イベントの接触右側範囲
 * 
 * <EventRange:verticalRange,[uy],[dy]>
 * [ux]:イベントの接触上側範囲
 * [dy]:イベントの接触下側範囲
 * 
 * <EventRange:range,[x],[y]> 指定した範囲を中心に接触判定を拡大します。4と記入した場合はイベントを中心に4マスの
 * 範囲(９マス)でトリガーが起動します。
 * [x]:イベントの接触横範囲
 * [y]:イベントの接触縦範囲
 * 
 * <EventRange:rangeEX,[x1],[y1],[x2],[y2],[x3],[y3],[x4],[y4]> イベントから指定した範囲内の接触判定を拡大します。
 * イベント座標より左、上を指定する場合はそのまま負の数で記入してください。
 * [x1]:イベントの接触範囲点AX座標
 * [y1]:イベントの接触範囲点AY座標
 * [x2]:イベントの接触範囲点BX座標
 * [y2]:イベントの接触範囲点BY座標
 * [x3]:イベントの接触範囲点CX座標
 * [y3]:イベントの接触範囲点CY座標
 * [x4]:イベントの接触範囲点DX座標
 * [y4]:イベントの接触範囲点DY座標
 * 
 * <EventRange:circle,[h],[rad]> 指定した半径からの接触判定を拡大します。角度を指定することで正面から角度に応じて接触判定を拡大します。
 * [h]:認識範囲
 * [rad]:角度(0～180°)※省略可　省略時は360°
 * 
 * <EventRange:triangle,[h],[rad]> 指定した認識範囲に対して、正面からの角度に応じて接触判定を拡大します。
 * [h]:正面からの認識範囲
 * [rad]:角度(0～180°)
 * 
 * <EventRecognition:[range]> 指定の範囲以上から離れている場合はイベント接触判定を行いません。
 * <EventRecognition:20> プレイヤーからイベントまでの距離が20マス以上なら接触判定処理を行いません。
 * 
 * イベントプレイヤー距離X変数ID、イベントプレイヤー距離Y変数ID
 * 接触拡張を持つイベント実行時にイベントからプレイヤーまでの距離を代入する変数を指定します。
 * プレイヤーがイベントより左、上にいる場合はマイナス座標が代入されます。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/7/14 Ver.1.2.0
 * 接触判定に横長、縦長を追加。
 * ペレイヤーからイベントまでの距離を代入する変数を指定できる機能を追加。
 * 2022/7/14 Ver.1.1.1
 * 円形、三角型の接触判定が正常に機能していなかった問題を修正。
 * 2022/7/11 Ver.1.1.0
 * 接触判定を行う範囲を設定する機能を追加。
 * 接触範囲モードに三角形型を追加。
 * 2022/7/11 Ver.1.0.0
 * 初版
 * 
 * @param EventRecognitionRange
 * @text 接触判定処理範囲
 * @desc 接触判定を行う範囲を指定します。イベントのメモ欄に<EventRecognition:[range]>がある場合は、そちらが優先されます。
 * @type number
 * @default 30
 * 
 * @param DistanceFromXVar
 * @text イベントプレイヤー距離X変数ID
 * @desc イベントからプレイヤーまでの差(X座標)を代入するゲーム変数を設定します。
 * @type variable
 * @default 0
 * 
 * @param DistanceFromYVar
 * @text イベントプレイヤー距離Y変数ID
 * @desc イベントからプレイヤーまでの差(Y座標)を代入するゲーム変数を設定します。
 * @type variable
 * @default 0
 * 
 */


var Imported = Imported || {};
Imported.NUUN_EventRange = true;

(() => {
    const parameters = PluginManager.parameters('NUUN_EventRange');
    const EventRecognitionRange = Number(parameters['EventRecognitionRange'] || 30);
    const DistanceFromXVar = Number(parameters['DistanceFromXVar'] || 0);
    const DistanceFromYVar = Number(parameters['DistanceFromYVar'] || 0);

    const _Game_Player_initMembers = Game_Player.prototype.initMembers;
    Game_Player.prototype.initMembers = function() {
        _Game_Player_initMembers.call(this);
        this._distanceFromX = 0;
        this._distanceFromY = 0;
    };

    Game_Player.prototype.setDistanceFrom = function(x, y) {
        this._distanceFromX = x;
        this._distanceFromY = y;
        $gameVariables.setValue(DistanceFromXVar, x);
        $gameVariables.setValue(DistanceFromYVar, y);
    };

    const _Game_Player_startMapEvent = Game_Player.prototype.startMapEvent;
    Game_Player.prototype.startMapEvent = function(x, y, triggers, normal) {
        this.setDistanceFrom(0, 0);
        _Game_Player_startMapEvent.call(this, x, y, triggers, normal);
        if (!$gameMap.isEventRunning()) {
            for (const event of $gameMap.eventsRangeXy(x, y)) {
                if (event.isTriggerIn(triggers)) {
                    this.setDistanceFrom(event.deltaXFrom(x) * -1, event.deltaYFrom(y) * -1);
                    event.start();
                }
            }
        }
    };

    Game_Map.prototype.eventsRangeXy = function(x, y) {
        return this.events().filter(event => {
            return event.range(x, y);
        });
    };

    const _Game_Map_eventsXy = Game_Map.prototype.eventsXy;
    Game_Map.prototype.eventsXy = function(x, y) {
        const events = _Game_Map_eventsXy.call(this, x, y);
        return events.filter(event => !event.event().meta.EventRange);
    };

    Game_Event.prototype.range = function(x, y) {
        const sx = Math.abs(this.deltaXFrom(x));
        const sy = Math.abs(this.deltaYFrom(y));
        const data = this.event().meta.EventRange;
        const recognition = this.event().meta.EventRecognition ? Number(this.event().meta.EventRecognition) : EventRecognitionRange;
        if (recognition > 0 && (sx >= recognition || sy >= recognition)) {
            return false;
        }
        if (data) {
            const arr = data.split(',');
            const mode = arr[0].trim();
            if (mode === 'range') {
                return (this.rangeX(x, Number(arr[1])) && this.rangeY(y, Number(arr[2])));
            } else if (mode === 'besideRange') {
                return this.besideRange(this.deltaXFrom(x), y, Number(arr[1]), Number(arr[2]));
            } else if (mode === 'verticalRange') {
                return this.verticalRange(x, this.deltaYFrom(y), Number(arr[1]), Number(arr[2]));
            } else if (mode === 'rangeEX') {
                return this.rangeEX(x, y, Number(arr[1]), Number(arr[2]), Number(arr[3]), Number(arr[4]),Number(arr[5]), Number(arr[6]), Number(arr[7]), Number(arr[8]));
            } else if (mode === 'circle') {
                return this.circleRange(x, y, Number(arr[1]), Number(arr[2]));
            } else if (mode === 'triangle') {
                return this.triangleRange(x, y, Number(arr[1]), Number(arr[2]));
            } else if (mode === 'donut') {
                return this.donutRange(x, y, Number(arr[1]));
            }
        } else {
            return false;
        }
    };

    Game_Event.prototype.rangeEX = function(x, y, x1, y1, x2, y2, x3, y3, x4, y4) {
        return (this.rangeCp(this.x + x1, this.y + y1, this.x + x2, this.y + y2, x, y) &&
        this.rangeCp(this.x + x2, this.y + y2, this.x + x3, this.y + y3, x, y) &&
        this.rangeCp(this.x + x3, this.y + y3, this.x + x4, this.y + y4, x, y) &&
        this.rangeCp(this.x + x4, this.y + y4, this.x + x1, this.y + y1, x, y));
    };

    Game_Event.prototype.besideRange = function(x, y, lx, rx) {
        return x <= lx && x >= rx * -1 && this.y === y;
    };

    Game_Event.prototype.verticalRange = function(x, y, uy, dy) {
        return y <= uy && y >= dy * -1 && this.x === x;
    };

    Game_Event.prototype.rangeCp = function(ax, ay, bx, by, x, y) {
        const x2 = ax - bx;
        const y2 = ay - by;
        const a = bx - x;
        const b = by - y;
        return (x2 * b - y2 * a) >= 0;
    };

    Game_Event.prototype.circleRange = function(x, y, r, rad) {
        const sx = this.deltaXFrom(x);
        const sy = this.deltaYFrom(y);
        const a = Math.abs(sx);
        const b = Math.abs(sy);
        const h = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        if (!rad) {
            return h <= r;
        }
        rad = Math.min(rad, 180);
        const radian = (rad / 2) * (Math.PI / 180);
        const ry = NuunManager.numPercentage(Math.abs(Math.tan(radian) * a), 6, true);
        const rx = NuunManager.numPercentage(Math.abs(Math.tan(radian) * b), 6, true);
        switch (this.direction()) {
            case 2:
                return b <= r && rx >= a && sy <= 0;
            case 4:
                return b <= r && ry >= b && sx >= 0;
            case 6:
                return b <= r && ry >= b && sx <= 0;
            case 8:
                return b <= r && rx >= a && sy >= 0;
        }
        return false;
    };

    Game_Event.prototype.triangleRange = function(x, y, r, rad) {
        const sx = this.deltaXFrom(x);
        const sy = this.deltaYFrom(y);
        const a = Math.abs(sx);
        const b = Math.abs(sy);
        rad = Math.min(rad, 180);
        const radian = (rad / 2) * (Math.PI / 180);
        const ry = NuunManager.numPercentage(Math.abs(Math.tan(radian) * a), 6, true);
        const rx = NuunManager.numPercentage(Math.abs(Math.tan(radian) * b), 6, true);
        switch (this.direction()) {
            case 2:
                return b <= r && rx >= a && sy <= 0;
            case 4:
                return b <= r && ry >= b && sx >= 0;
            case 6:
                return b <= r && ry >= b && sx <= 0;
            case 8:
                return b <= r && rx >= a && sy >= 0;
        }
        return false;
    };

    Game_Event.prototype.donutRange = function(x, y, r1, r2) {
        const a = Math.abs(this.deltaXFrom(x));
        const b = Math.abs(this.deltaYFrom(y));
        const h = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        return h <= r1 && h <= r2;
    };

    Game_Event.prototype.rangeX = function(x, x2) {
        return this.x >= x - Math.floor(x2 / 2) && this.x <= x + Math.floor(x2 / 2);
    };

    Game_Event.prototype.rangeY = function(y, y2) {
        return this.y >= y - Math.floor(y2 / 2) && this.y <= y + Math.floor(y2 / 2);
    };

})();