import React from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import OutlinedInput from "@mui/material/OutlinedInput";
import MaskedInput from "react-text-mask";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import AppContext, { useAppContext } from "../AppContextCheckout";

const TextInput = ({
	label,
	errorMessage,
	leftIcon,
	rigthElement,
	autoComplete,
	...props
}) => {
	const adornament = {
		startAdornment: (
			<InputAdornment position="start" style={{ color: "#d3d3d3" }}>
				{leftIcon}
			</InputAdornment>
		),
		endAdornment: (
			<InputAdornment position="end" style={{ color: "#d3d3d3" }}>
				{rigthElement}
			</InputAdornment>
		),
	};
	return (
		<FormControl fullWidth error={errorMessage}>
			<TextField
				error={errorMessage}
				fullWidth
				label={'label'}
				variant="outlined"
				// placeholder={label}
				InputProps={leftIcon || (rigthElement && adornament)}
				autoComplete={
					autoComplete ? autoComplete : "transaction-amount"
				}
				{...props}
			/>

			{errorMessage && (
				<span
					id="component-error-text"
					className="error-msg"
					style={{ height: 0 }}
				>
					{/* {errorMessage} */} &nbsp;
				</span>
			)}
		</FormControl>
	);
};

export const TextInputPhone = ({
	label,
	errorMessage,
	leftIcon,
	rigthElement,
	...props
}) => {
	const { language } = useAppContext(AppContext);

	const getCountry = (lang) => {
		switch (lang) {
			case "pt-BR":
				return "br";

			case "fr":
				return "fr";

			default:
				return "br";
		}
	};

	return (
		<FormControl fullWidth error={errorMessage}>
			<PhoneInput
				inputStyle={{ borderColor: errorMessage && "#f44336" }}
				country={getCountry(language)}
				// onlyCountries={['fr', 'br']}
				specialLabel={label}
				inputProps={{
					autoComplete: 'tel'
				}}
				{...props}
			/>
			{errorMessage && (
				<span
					id="component-error-text"
					className="error-msg"
					style={{ height: 0 }}
				>
					{/* {errorMessage} */} &nbsp;
				</span>
			)}
		</FormControl>
	);
};

export const TextInputMasked = ({
	label,
	errorMessage,
	leftIcon,
	mask = [],
	rigthElement,
	autoComplete,
	labelProps,
	...props
}) => {
	const adornament = {
		startAdornment: (
			<InputAdornment position="start" style={{ color: "#d3d3d3" }}>
				{leftIcon}
			</InputAdornment>
		),
		endAdornment: (
			<InputAdornment position="end" style={{ color: "#d3d3d3" }}>
				{rigthElement}
			</InputAdornment>
		),
	};

	return (
		<FormControl variant="outlined" fullWidth error={errorMessage}>
			<InputLabel
				style={{ backgroundColor: "#fff", padding: "0 5px" }}
				htmlFor="formatted-text-mask-input"
				{...labelProps}
			>
				{label}
			</InputLabel>
			<OutlinedInput
				// InputProps={leftIcon || (rigthElement && adornament)}
				endAdornment={
					rigthElement && (
						<InputAdornment
							position="end"
							style={{ color: "#d3d3d3" }}
						>
							{rigthElement}
						</InputAdornment>
					)
				}
				id="formatted-text-mask-input"
				autoComplete={
					autoComplete ? autoComplete : "transaction-amount"
				}
				{...props}
			/>

			{errorMessage && (
				<span
					id="component-error-text"
					className="error-msg"
					style={{ height: 0 }}
				>
					{/* {errorMessage} */} &nbsp;
				</span>
			)}
		</FormControl>
	);
};

export default TextInput;
