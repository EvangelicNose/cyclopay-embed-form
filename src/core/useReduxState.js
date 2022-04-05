/* eslint-disable */
/// <reference path="./useReduxState.d.ts" />

import { useReducer, useMemo } from 'react'
import { createStore } from 'redux'

export const MERGE = 'MERGE'
export const OVERWRITE = 'OVERWRITE'

/**
 * @type {UseReduxStateHook}
*/
const useReduxState = (initialState = {}) => {
	const reducer = (state = initialState, action) =>
		action.type === 'MERGE' ? { ...state, ...action.payload } : action.type === 'OVERWRITE' ? action.payload : state

	const [ , forceUpdate ] = useReducer((x) => x + 1, 0)
	const store = useMemo(() => createStore(reducer), [])

	const getState = store.getState.bind(store)
	const dispatch = (payload, type = MERGE) => {
		const state = store.getState()
		store.dispatch({ type, payload })
		if (state !== store.getState()) {
			forceUpdate()
		}
	}

	const createFieldUpdater = (field) => (value) => dispatch({ [field]: value })

	return [ getState, dispatch, createFieldUpdater ]
}

export default useReduxState
