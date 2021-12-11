import StarRatings from 'react-star-ratings'

const RatingAvatar = ({ imagePath, details, title, rating, date, ...rest }) => {


    return (
        <div className="W-100 d-flex align-items-center rating">
            <img className="rating__avatar" src={imagePath} />
            <div className="rating__right">
                {
                    rating > 0 &&
                    <StarRatings
                        starDimension="30px"
                        starSpacing="4px"
                        rating={rating}
                        starRatedColor="#f6bf00"
                        starHoverColor="#f6bf00"
                        starEmptyColor="transparent"
                        // changeRating={(rating) => setRating(rating)}
                        numberOfStars={5}
                        name='rating'
                        {...rest}
                    />
                }
                <div className="d-flex align-items-center mt-4">
                    <p className="rating__title">{title}</p>
                    <p className="rating__info">{date}</p>
                </div>
                {
                    details &&
                    <p className="rating__title-2nd">{details}</p>
                }
            </div>
        </div>
    )
}

export default RatingAvatar