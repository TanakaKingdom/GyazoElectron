'use strict'

const electron = require('electron');

// アプリケーションを操作するモジュール
const app = electron.app;
// ネイティブブラウザウィンドウを作成するモジュール
const BrowserWindow = electron.BrowserWindow;

// プロセス間通信
// http://electron.atom.io/docs/api/ipc-main/
const ipcMain = electron.ipcMain;

var fs = require('fs');

// ホットキー
// http://electron.atom.io/docs/api/global-shortcut/

// トレイ
// http://electron.atom.io/docs/api/tray/

// ウィンドウオブジェクトをグローバル参照をしておくこと。
// しないと、ガベージコレクタにより自動的に閉じられてしまう。
let win;

let isDebug = (typeof process.env.NODE_ENV) != 'undefined' && process.env.NODE_ENV == 'development';

function createWindow() {

    // let workArea;

    // electron.screen.getAllDisplays().forEach(function (display) {
    //     if (workArea == null) {
    //         workArea = display.workArea;
    //         return;
    //     }

    //     workArea = {
    //         x: Math.min(workArea.x, display.workArea.x),
    //         y: Math.min(workArea.y, display.workArea.y),
    //         width: workArea.width + display.workArea.width,
    //         height: workArea.height + display.workArea.height
    //     };
    // });

    // ブラウザウィンドウの作成
    win = new BrowserWindow({
        transparent: true,
        resizable: false,
        titleBarStyle: 'hidden',
        frame: false,
        thickFrame: false,
        enableLargerThanScreen: true
    });

    // コンストラクタで指定すると enableLargerThanScreen が利かないのでここで指定する
    win.setSize(800, 600);

    // win.setAlwaysOnTop(true);

    // デバッグ時のみ
    
    win.webContents.openDevTools({mode: "undocked"});


    // setIgnoreMouseEvents() を使うことでshow() hide() 切り替える必要がなくなる
    // win.setIgnoreMouseEvents(true);

    win.loadURL(`file://${__dirname}/cupture/cupture.html`);

    // ウィンドウが閉じられた時に発行される
    win.on('closed', () => {
        // ウィンドウオブジェクトを参照から外す。
        // もし何個かウィンドウがあるならば、配列として持っておいて、対応するウィンドウのオブジェクトを消去するべき。
        win = null;
    });

    win.show();
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

app.on('activate', () => {
    // macOS では、ドックをクリックされた時にウィンドウがなければ新しく作成する。
    if (win == 0) {
        createWindow();
    }
})

ipcMain.on('cancel-capture', (event, arg) => {
    // @todo Trayに入れる処理が完了次第Windowをhideするだけに変更する
    app.quit();
    event.returnValue = 'event';
});

ipcMain.on('exec-capture', (event, arg) => {
    event.returnValue = 'event';
});