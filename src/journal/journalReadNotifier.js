class JournalEvent {
  constructor(userId, timestamp, journalId) {
    this.userId = userId;
    this.timestamp = timestamp;
    this.journalId = journalId;
  }
}

class JournalReadNotifier {
    events = []
    handlers = []

    constructor() {
    // Simulate notifications that will eventually come over WebSocket
    setInterval(() => {
      const userId = 1;
      const timestamp = new Date().toLocaleDateString();
      const journalId = 1;
      this.broadcastEvent(userId, timestamp, journalId);
    }, 5000);
  }

  broadcastEvent(userId, timestamp, journalId) {
    const event = new EventMessage(userId, timestamp, journalId);
    this.receiveEvent(event);
  }

  addHandler(handler) {
    this.handlers.push(handler);
  }

  removeHandler(handler) {
    this.handlers.filter((h) => h !== handler);
  }

  receiveEvent(event) {
    this.events.push(event);

    this.handlers.forEach((handler) => {
      handler(event);
    });
  }
}

const JournalNotifier = new JournalReadNotifier();
export { JournalNotifier };