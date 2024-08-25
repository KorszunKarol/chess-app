class StockfishService {
  constructor() {
    this.stockfish = null;
    this.init();
  }

  init() {
    // Use a CDN-hosted version of Stockfish
    this.stockfish = new Worker('/stockfish.js');
    this.stockfish.onmessage = this.onMessage.bind(this);
    this.sendCommand('uci');
  }

  onMessage(event) {

  }

  sendCommand(command) {
    if (this.stockfish) {
      this.stockfish.postMessage(command);
    } else {
      console.error('Stockfish not initialized');
    }
  }

  setPosition(fen) {
    this.sendCommand(`position fen ${fen}`);
  }

  getEvaluation(callback) {
    this.sendCommand('go depth 15');
    const originalOnMessage = this.stockfish.onmessage;

    this.stockfish.onmessage = (event) => {
      const message = event.data;
      if (typeof message === 'string' && message.includes('score cp')) {
        const evaluation = message.split(' ')[7];
        callback(evaluation); // Call the callback with the evaluation
        this.stockfish.onmessage = originalOnMessage; // Restore the original onmessage handler
      }
    };
  }

  getBestMove(callback) {
    this.sendCommand('go depth 15');
    const originalOnMessage = this.stockfish.onmessage;
    this.stockfish.onmessage = (event) => {
      const message = event.data;
      if (typeof message === 'string' && message.startsWith('bestmove')) {
        const bestMove = message.split(' ')[1];
        callback(bestMove);
        this.stockfish.onmessage = originalOnMessage;
      }
    };
  }
}

const stockfishService = new StockfishService();
export default stockfishService;