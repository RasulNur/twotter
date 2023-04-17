import Select from "react-select";

export default function ReactSelect({ currUsername, handleSelectChange }) {
    const options = [
        { value: "profile", label: "Edit profile" },
        { value: "logout", label: "Logout" },
    ];

    const colourStyles = {
        control: (styles) => ({
            ...styles,
            backgroundColor: "#1d9bf0",
            "&:hover": {
                backgroundColor: "#1a8cd8",
            },

            boxShadow: "rgba(0, 0, 0, 0.08) 0px 8px 28px",
            borderRadius: "5px",
            border: "none",
        }),
        placeholder: (styles) => ({
            ...styles,
            color: "#fff",
        }),
        option: (styles, state) => ({
            ...styles,
            color: state.isSelected ? "#fff" : "#000",
        }),
        singleValue: (styles) => ({
            ...styles,
            color: "#fff",
        }),
        dropdownIndicator: (styles) => ({
            ...styles,
            color: "#fff",
            "&:hover": {
                color: "#fff",
            },
        }),
        menu: (styles) => ({
            ...styles,
            width: "max-content",
        }),
    };

    return (
        <>
            <Select
                options={options}
                onChange={handleSelectChange}
                isSearchable={false}
                placeholder={currUsername && currUsername}
                components={{
                    IndicatorSeparator: () => null,
                }}
                styles={colourStyles}
                value={currUsername && currUsername}
            />
        </>
    );
}
