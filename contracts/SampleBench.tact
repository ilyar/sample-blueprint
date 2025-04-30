message(0x49533468) Incr {
    queryId: Int as uint64;
    change: Int as uint8;
}

message(0x0ee52db3) Decr {
    queryId: Int as uint64;
    change: Int as uint8;
}

struct State {
    id: Int as uint32;
    counter: Int as int32;
}

contract SampleBench(id: Int as uint32, counter: Int as int32) {
    // Empty receiver for the deployment, which expects the `null` message body
    receive() { }

    receive(msg: Incr) {
        self.counter += msg.change;
    }

    receive(msg: Decr) {
        self.counter -= msg.change;
    }

    get fun state(): State {
        return State {
            id: self.id,
            counter: self.counter,
        };
    }
}
