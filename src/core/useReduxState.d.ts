export declare enum ReduxStateActions {
    MERGE,
    OVERWRITE
}

export declare type useReduxStateTuple<StateModel extends { [key: string]: any }> = [
    () => StateModel,
    (payload: StateModel, type?: ReduxStateActions) => void,
    (field: keyof StateModel) => (value: any) => void
]

export default function useReduxState<StateModel>(initialState: StateModel): useReduxStateTuple<StateModel>