'use strict'

const WHICH_CLICK_LEFT = 1;
const WHICH_CLICK_RIGHT = 3;

$(function(){
    let is_mousedown = false;
    let from_point;

    let calcArea = function (from_point, to_point) {
        return {
            left: Math.min(from_point.x, to_point.x),
            top: Math.min(from_point.x, to_point.x),
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

    $('body').on('mousedown', function (ev) {
        if (ev.which == WHICH_CLICK_RIGHT) {
            // 処理やめる
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

    $('body').on('mousemove', function (ev) {
        if (! is_mousedown) {
            return;
        }
        drawDragArea ({
            x: ev.pageX,
            y: ev.pageY
        });
    });

    $('body').on('mouseup', function (ev) {
        if (! is_mousedown) {
            return;
        }

        $('.drag_area').hide();

        // @todo 画像送る

        is_mousedown = false;
    });
});