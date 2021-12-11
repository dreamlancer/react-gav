import PropTypes from 'prop-types'

export const AuthInput = ({ label, type, name, value, onChange }) => {

    return (
        <div className="auth-input-container">
            <input autoComplete="off" name={name} type={type} required value={value} onChange={(event) => onChange(event)} />
            <label htmlFor="text" className="auth-input-label-container">
                <span className="auth-input-label-name">
                    {label}
                </span>
            </label>
        </div>
    )
}


AuthInput.propTypes = {
    label: PropTypes.string.isRequired,
}

AuthInput.defaultProps = {
    type: 'text',
}


export const WizardInput = ({ label, type, value, name, handleOwner, ...rest }) => {
    //console.log("props = ", label, type,value, handleOwner )
    return (
        <div className="reg-form-input d-xl-flex justify-content-between">
            <label className="d-lg-inline-block d-block">{label}</label>
            <input type={type} value={value} name={name} onChange={(e)=>handleOwner(e)} {...rest} />
        </div>
    )
}


WizardInput.propTypes = {
    label: PropTypes.string,
}

WizardInput.defaultProps = {
    type: 'text',
}