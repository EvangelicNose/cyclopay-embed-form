import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";

const SelectedInput = ({
	label,
	arrayValues = [],
	errorMessage,
	notEmpty,
	firstElement,
	defaultValue,
	...props
}) => {
	return (
		<FormControl variant="outlined" fullWidth error={Boolean(errorMessage)}>
			<InputLabel>{label}</InputLabel>
			<Select defaultValue={defaultValue} label={label} {...props}>
				{!notEmpty && firstElement ? (
					<MenuItem value={firstElement.value}>
						{firstElement.label}
					</MenuItem>
				) : (
					<MenuItem value="">
						<em> </em>
					</MenuItem>
				)}

				{arrayValues.map(({ label, value }) => (
					<MenuItem value={value}>{label}</MenuItem>
				))}
			</Select>
			{/* {errorMessage && (
				<FormHelperText
					id="component-error-text"
					className="error-msg"
					style={{ height: 0 }}
				>
					{errorMessage}
				</FormHelperText>
			)} */}
		</FormControl>
	);
};

export default SelectedInput;
