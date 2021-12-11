import { Spinner } from "react-bootstrap"
import { FullPageLoader } from "../Loader"

export const UploadPhoto = ({ text, src, name, loading, id, onFileChange }) => {

    return (
        <div className="upload-photo text-md-left text-center">
            <p className="h4 mb-3">{text}</p>
            {
                loading ?
                    <div className="text-center">
                        <Spinner animation="border" role="status" />
                    </div> :
                    <label className="cursor-pointer" htmlFor={id}>
                        <img src={src ? src : '/images/upload.png'} className="img-fluid" />
                    </label>
            }
            <input type="file" id={id} name={name} onChange={onFileChange} style={{
                position: 'absolute',
                left: -100000
            }} />
        </div>
    )
}


export default UploadPhoto