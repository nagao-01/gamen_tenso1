const express = require('express');
const { ExpressPeerServer } = require('peer');
const path = require('path');

const app = express();

// HTTPサーバー作成
const server = app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});

// PeerJSサーバーを /peerjs にマウント
const peerServer = ExpressPeerServer(server, {
    debug: true
});
app.use('/peerjs', peerServer);

// 静的ファイルの提供（例: CSSやJSが別ファイルの場合に備えて）
app.use(express.static(path.join(__dirname)));

// index.html を返す
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
