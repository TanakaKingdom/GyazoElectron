'use strict'

const electron = require('electron');
// アプリケーションを操作するモジュール
const app = electron.app;
// ネイティブブラウザウィンドウを作成するモジュール
const BrowserWindow = electron.BrowserWindow;

// ウィンドウオブジェクトをグローバル参照をしておくこと。
// しないと、ガベージコレクタにより自動的に閉じられてしまう。
let window_list = [];

function createWindow () {

    electron.screen.getAllDisplays().forEach(function(display) {
        let workArea = display.workArea;

        // ブラウザウィンドウの作成
        let win = new BrowserWindow({
            x: workArea.x,
            y: workArea.y,
            width: workArea.width,
            height: workArea.height,
            frame: false,
            transparent: true,
            resizable: false,
            titleBarStyle: 'hidden',
            thickFrame : false
        });

        // win.setAlwaysOnTop(true);
        //win.maximize();

        win.loadURL(`file://${__dirname}/cupture/cupture.html`);

        // ウィンドウが閉じられた時に発行される
        win.on('closed', () => {
            // ウィンドウオブジェクトを参照から外す。
            // もし何個かウィンドウがあるならば、配列として持っておいて、対応するウィンドウのオブジェクトを消去するべき。
            win = null;
        });

        win.show();

        window_list.push(win);
    });    
}

// このメソッドはElectronが初期化を終えて、ブラウザウィンドウを作成可能になった時に呼び出される。
// 幾つかのAPIはこのイベントの後でしか使えない。
app.on('ready', createWindow);

// すべてのウィンドウが閉じられた時にアプリケーションを終了する。
app.on('window-all-closed', () => {
    // macOSでは、Cmd + Q(終了)をユーザーが実行するまではウィンドウが全て閉じられても終了しないでおく。
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// app.on('activate', () => {
//     // macOS では、ドックをクリックされた時にウィンドウがなければ新しく作成する。
//     if (win === null) {
//         createWindow();
//     }
// })

// このファイルでアプリケーション固有のメインプロセスのコードを読み込むことができる。
// ファイルを別に分けておいてここでrequireすることもできる。
