// automatically generated from `contracts/SampleBench.tlb`
// _ id:uint32 counter:int32 = State;
global id: int;
global counter: int;
const STATE_ID_SIZE: int = 32;
const STATE_COUNTER_SIZE: int = 32;
fun loadState() {
    var ds = getContractData().beginParse();
    id = ds.loadUint(STATE_ID_SIZE);
    counter = ds.loadInt(STATE_COUNTER_SIZE);
    ds.assertEndOfSlice();
}
fun saveState() {
    setContractData(
        beginCell()
            .storeUint(id, STATE_ID_SIZE)
            .storeInt(counter, STATE_COUNTER_SIZE)
            .endCell()
    );
}
// action_incr#49533468 queryId:uint64 change:uint8 = IncrAction;
// action_decr#0ee52db3 queryId:uint64 change:uint8 = DecrAction;
// _ _:IncrAction = Action;
// _ _:DecrAction = Action;
const OP_INCR = 0x49533468;
const OP_DECR = 0x0ee52db3;
const MSG_CHANGE_SIZE: int = 8;
@inline
fun loadCgange(mutate self: slice): int {
    return self.loadUint(MSG_CHANGE_SIZE);
}
// get_state#12f15 result:State = GetState;
// _ _:GetState = Gertter;
get state(): (int, int) {
    loadState();
    return (id, counter);
}
