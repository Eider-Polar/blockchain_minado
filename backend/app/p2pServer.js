import WebSocket, { WebSocketServer } from 'ws';
import dotenv from 'dotenv';

dotenv.config();
// ws://192.168.101.3:12345
const initialPeers = process.env.PEERS ? process.env.PEERS.split(',') : [];
const P2P_PORT = process.env.P2P_PORT || process.argv[2] || 5004;

class P2PServer {
    constructor(blockchain) {
        this.blockchain = blockchain;
        this.sockets = [];
    }

    listen() {
        const server = new WebSocketServer({ port: P2P_PORT });
        server.on('connection', socket => this.connectSocket(socket));
        this.connectToPeers();
        console.log(`Listening for peer-to-peer connections on port ${P2P_PORT}. Initial peers: ${initialPeers}`);
    }

    connectToPeers() {
        initialPeers.forEach(peer => this.addPeer(peer));
    }

    addPeer(peer) {
        const socket = new WebSocket(peer);
        socket.on('open', () => {
            this.connectSocket(socket);
            this.broadcastNewPeer(peer); // Difundir el nuevo nodo a otros peers
        });
        socket.on('error', error => console.error(`Error connecting to peer ${peer}:`, error));
    }

    broadcastNewPeer(newPeer) {
        this.sockets.forEach(socket => socket.send(JSON.stringify({ type: 'newPeer', peer: newPeer })));
    }

    connectSocket(socket) {
        this.sockets.push(socket);
        console.log('[ + ] Socket connected');
        console.log(`Listening for peer-to-peer connections on port ${P2P_PORT}. Initial peers: ${initialPeers}`);
        this.messageHandler(socket);
        this.sendChain(socket);
    }

    messageHandler(socket) {
        socket.on('message', message => {
            const data = JSON.parse(message);

            switch (data.type) {
                case 'newPeer':
                    this.handleNewPeer(data.peer);
                    break;
                default:
                    this.blockchain.replaceChain(data);
                    break;
            }
        });
    }

    handleNewPeer(peer) {
        if (!this.sockets.find(s => s.url === peer)) { // Evitar conexiones duplicadas
            this.addPeer(peer);
        }
    }

    sendChain(socket) {
        socket.send(JSON.stringify(this.blockchain.chain));
    }

    syncChains() {
        this.sockets.forEach(socket => this.sendChain(socket));
    }
}

export default P2PServer;
