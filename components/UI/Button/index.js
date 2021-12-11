import PropTypes from 'prop-types'
import { Button, Spinner } from 'react-bootstrap'

export const UiButton = ({ title, loading, size, loaderMsg, ...rest }) => {
    return (
        <Button {...rest}>
            {title}
            {
                loading && <Spinner className="ml-3 mb-1" animation="border" role="status" size={size}>
                    <span className="sr-only">{`${loaderMsg}`}</span>
                </Spinner>
            }
        </Button>
    )
}

UiButton.propTypes = {
    title: PropTypes.string,
    loading: PropTypes.bool,
    size: PropTypes.string,
    loaderMsg: PropTypes.string,
}

UiButton.defaultProps = {
    title: 'My Button',
    size: 'sm',
    variant: 'primary',
    loaderMsg: 'Loading...',
}




export const SocialButton = ({ title, icon, ...rest }) => {
    return (
        <Button variant="outline-primary" className="d-flex align-items-center justify-content-between w-100 social-btn px-3 pb-sm-2 pb-0 pt-sm-1 pt-0" {...rest}>
            <span className="social-btn-icon">{icon}</span>
            <span className="social-btn-title">{title}</span>
            <span></span>
        </Button>
    )
}

SocialButton.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.node,
}

SocialButton.defaultProps = {
    title: 'My Social Button',
}
