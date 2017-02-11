'use strict'

$(function(){
    let is_mousedown = false;
    let from_point;

    let calcArea = function (from_point, to_point) {
        return {
            left: from_point.x < to_point.x ? from_point.x : to_point.x,
            top: from_point.y < to_point.y ? from_point.y : to_point.y,
            width: from_point.x < to_point.x ? (to_point.x - from_point.x) : (from_point.x - to_point.x),
            height: from_point.y < to_point.y ? (to_point.y - from_point.y) : (from_point.y - to_point.y),
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