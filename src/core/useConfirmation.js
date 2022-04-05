import React from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import Button from "@mui/material/Button"
// import { useObjectState } from './useObjectState'
import useReduxState from "./useReduxState"
import { DialogTitle } from "@mui/material"
import SectionMain from "../layout/SectionMain"
import Title, { TitleSmall } from "../components/checkout-1.5.4/forms/Title"

export function useConfirmation() {
	const [getState, setState] = useReduxState({
		resolver: null,
		message: null,
		title: null,
		type: "default",
	})

	function showConfirm(title, message, type, backgroundColor) {
		return new Promise((resolver) => {
			setState({ message, title, type, backgroundColor, resolver })
		})
	}

	const { resolver, message, title, type, backgroundColor } = getState()

	function closeModal(value) {
		resolver(value)
		setState({ resolver: null })
	}

	const confirm = (
		<Dialog open={!!resolver} onClose={() => closeModal(false)}>
			<DialogTitle>
				<SectionMain noPadding position="center">
					<Title bold>{title}</Title>
				</SectionMain>
			</DialogTitle>
			<DialogContent>
				<SectionMain
					noPadding
					position="center"
					style={{ maxWidth: 397 }}
				>
					<TitleSmall align="center">{message}</TitleSmall>
				</SectionMain>
			</DialogContent>
			<DialogActions>
				{/* <div className="flex-row flex-end"> */}
				<Button
					color="secondary"
					variant="outlined"
					onClick={() => closeModal(false)}
				>
					{type === "portal" ? "Não" : "Não aceito"}
				</Button>
				<Button
					color="primary"
					style={{ backgroundColor: backgroundColor }}
					variant="contained"
					onClick={() => closeModal(true)}
				>
					{type === "portal" ? "Sim" : "Aceito"}
				</Button>
				{/* </div> */}
			</DialogActions>
		</Dialog>
	)

	return [confirm, showConfirm]
}
