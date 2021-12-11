import { useState } from "react"
import StarRatings from 'react-star-ratings'

const ProfileAvatar = ({ name, avatarUrl, ratingCount }) => {

    const [rating, setRating] = useState()

    return (
        <div className="W-100 d-flex flex-column align-items-center">
            <img className="profile-area__avatar" src={avatarUrl}>
            </img>
            <p className="profile-area__title">{name}</p>
            <StarRatings
                starDimension="30px"
                rating={ratingCount}
                starSpacing="2px"
                starRatedColor="#f6bf00"
                starHoverColor="#f6bf00"
                starEmptyColor="gray"
                // changeRating={(rating) => setRating(rating)}
                numberOfStars={5}
                name='rating'
            />
        </div>
    )
}

export default ProfileAvatar