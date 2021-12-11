import Link from "next/link"
import { UiButton } from "../UI/Button"

const SingleChoice = ({ imgUrl, btnTitle, spanText, text, onClick }) => {
  return (
    <div className="single-choice-container">
      <div className="img-container">
        <img className="w-100" src={imgUrl} alt="" />
      </div>
      <h3 className="single-choice-header text-center">
        Você é <span>{spanText}</span> {text}
      </h3>

        <UiButton onClick={onClick} title={btnTitle} className="single-choice-btn py-2 w-100" size="lg" />
    </div>
  );
};

export default SingleChoice;
