export default function ChangePswInput({
    name,
    inputValue,
    handleChange,
    newUser,
}) {
    const { currPassword, newPassword, confirmPassword } = newUser;
    return (
        <>
            <input
                type="password"
                className="profile__input"
                autoComplete="on"
                name={name}
                value={inputValue}
                onChange={handleChange}
                minLength="3"
                maxLength="16"
                required={
                    currPassword || newPassword || confirmPassword
                        ? true
                        : false
                }
            />
        </>
    );
}
