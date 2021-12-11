import PropTypes from 'prop-types'
import Head from 'next/head'

const PageHead = ({ title, description, children }) => {
  return (
    <Head>
      <title>{title}</title>
      {children}
      <meta name="description" content={description || ''} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
        key="viewport"
      />
    </Head>
  )
}

PageHead.defaultProps = {
  title: 'Gav',
}

PageHead.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
}

export default PageHead