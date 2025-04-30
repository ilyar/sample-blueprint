// automatically generated from `contracts/SampleBench.tlb`
// _ id:uint32 counter:int32 = State;
export type State = {
    id: number;
    counter: number;
};
// action_incr#49533468 queryId:uint64 change:uint8 = IncrAction;
// action_decr#0ee52db3 queryId:uint64 change:uint8 = DecrAction;
// _ _:IncrAction = Action;
// _ _:DecrAction = Action;
export enum Action {
    Incr = 0x49533468,
    Decr = 0x0ee52db3,
}
