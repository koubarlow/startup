class JournalEvent {
  constructor(fromUserId, toUserId, timestamp, journalId) {
    this.fromUserId = fromUserId;
    this.toUserId = toUserId;
    this.timestamp = timestamp;
    this.journalId = journalId;
  }
}

class JournalReadNotifier {
    events = []
    handlers = []

    constructor() {
      let port = window.location.port;
      const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
      this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
      // this.socket.onopen = (event) => {
      //   this.receiveEvent(new EventMessage('Simon', GameEvent.System, { msg: 'connected' }));
      // };
      // this.socket.onclose = (event) => {
      //   this.receiveEvent(new EventMessage('Simon', GameEvent.System, { msg: 'disconnected' }));
      // };
      this.socket.onmessage = async (msg) => {
        try {
          const event = JSON.parse(await msg.data.text());
          this.receiveEvent(event);
        } catch {}
      };
  }

  broadcastEvent(fromUserId, toUserId, timestamp, journalId) {
    const event = new JournalEvent(fromUserId, toUserId, timestamp, journalId);
    this.receiveEvent(event);
  }

  addHandler(handler) {
    this.handlers.push(handler);
  }

  removeHandler(handler) {
    this.handlers.filter((h) => h !== handler);
  }

  receiveEvent(event) {
    const fromUserId = event.fromUserId;
    const toUserId = event.toUserId;
    console.log("From: " + fromUserId + ". To: " + toUserId);
    console.log("This user ID: " + localStorage.getItem('currentUserId'));
    this.events.push(event);

    this.handlers.forEach((handler) => {
      handler(event);
    });
  }
}

const JournalNotifier = new JournalReadNotifier();
export { JournalEvent, JournalNotifier };