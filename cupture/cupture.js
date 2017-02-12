'use strict'

const WHICH_CLICK_LEFT = 1;
const WHICH_CLICK_RIGHT = 3;

// http://faq.creasus.net/04/0131/CharCode.html
const KEY_CODE_ESC = 27;

$(function(){
    let is_mousedown = false;
    let from_point;

    let calcArea = function (from_point, to_point) {
        return {
            left: Math.min(from_point.x, to_point.x),
            top: Math.min(from_point.y, to_point.y),
            width: Math.abs(from_point.x - to_point.x),
            height: Math.abs(to_point.y - from_point.y)
        };
    };

    let drawDragArea = function (to_point) {
        let area = calcArea(from_point, to_point);
        $('.drag_area')
            .css('left', area.left)
            .css('top', area.top)
            .css('width', area.width)
            .css('height', area.height)
            .show()
        ;
    };

    let cancelCupture = function () {
        require('electron').ipcRenderer.sendSync('cancel-capture');
    };

    // マウスクリック
    $('body').on('mousedown', (ev) => {
        if (ev.which == WHICH_CLICK_RIGHT) {
            cancelCupture();
            return;
        }
        
        if (is_mousedown) {
            return;
        }
        
        from_point = {
            x: ev.pageX,
            y: ev.pageY
        };

        drawDragArea (from_point);

        is_mousedown = true;
    });

    // ドラッグ中
    $('body').on('mousemove', (ev) => {
        if (! is_mousedown) {
            return;
        }
        drawDragArea ({
            x: ev.pageX,
            y: ev.pageY
        });
    });

    // ドロップ
    $('body').on('mouseup', (ev) => {
        if (! is_mousedown) {
            return;
        }

        $('.drag_area').hide();

        // @todo 画像送る

        is_mousedown = false;
    });

    // キーボードイベント
    $('body').on('keyup', (ev) => {
        console.log(ev);

        if (ev.keyCode == KEY_CODE_ESC) {
            cancelCupture();
            return;
        }
    });
});