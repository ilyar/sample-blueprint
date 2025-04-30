import "lib/SampleBench.auto.tolk"

// onInternalMessage is the main entrypoint
// it's called when a contract receives an internal message from other contracts
fun onInternalMessage(msg: cell, body: slice) {
    // ignore all empty messages
    if (body.isEndOfSlice()) {
        return;
    }
    var cs: slice = msg.beginParse();
    val flags = cs.loadMessageFlags();
    // ignore all bounced messages
    if (isMessageBounced(flags)) {
        return;
    }
    // here we populate the storage variables
    loadState();
    // by convention, the first 32 bits of incoming message is the op
    val op = body.loadMessageOp();
    // by convention, the next 64 bits contain the "query id", although this is not always the case
    body.skipMessageQueryId();
    // actiom message procesed
    val change = body.loadCgange();
    if (op == OP_INCR) {
        counter += change;
        saveState();
        return;
    } else if (op == OP_DECR) {
        counter -= change;
        saveState();
        return;
    }
    // if the message contains an op that is not known to this contract, we throw
    throw 0xffff;
}
