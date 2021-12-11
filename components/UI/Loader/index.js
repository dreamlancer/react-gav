import PropTypes from 'prop-types'
import { Spinner } from 'react-bootstrap'

export const FullPageLoader = ({ loading, animation, ...rest }) => {
    return (
        <div className="text-center my-5 py-5">
            <Spinner animation={loading ? animation : ''} role="status" />
        </div>
    )
}

FullPageLoader.propTypes = {
    loading: PropTypes.bool.isRequired,
    animation: PropTypes.string,
}

FullPageLoader.defaultProps = {
    animation: 'border',
}