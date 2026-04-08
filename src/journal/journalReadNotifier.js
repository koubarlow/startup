class JournalEvent {
  constructor(fromUsername, toUserId, timestamp, readJournalDate, readJournalTopic) {
    this.fromUsername = fromUsername;
    this.toUserId = toUserId;
    this.timestamp = timestamp;
    this.readJournalDate = readJournalDate
    this.readJournalTopic = readJournalTopic;
  }
}

class JournalReadNotifier {
    events = []
    handlers = []

    constructor() {
      let port = window.location.port;
      const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
      this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
      this.socket.onmessage = async (msg) => {
        try {
          const event = JSON.parse(await msg.data.text());
          this.receiveEvent(event);
        } catch {}
      };
  }

  broadcastEvent(fromUsername, toUserId, timestamp, readJournalDate, readJournalTopic) {
    const event = new JournalEvent(fromUsername, toUserId, timestamp, readJournalDate, readJournalTopic);
    this.socket.send(JSON.stringify(event));
  }

  addHandler(handler) {
    this.handlers.push(handler);
  }

  removeHandler(handler) {
    this.handlers.filter((h) => h !== handler);
  }

  receiveEvent(event) {
    if (event.toUserId != localStorage.getItem('currentUserId')) { return }
    this.events.push(event);

    this.events.forEach((e) => {
      this.handlers.forEach((handler) => {
        handler(e);
      });
    });
  }
}

const JournalNotifier = new JournalReadNotifier();
export { JournalEvent, JournalNotifier };