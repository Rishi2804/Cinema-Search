import { Badge } from "@mui/material";
import { img_300, unavailable } from "../../config/config";
import ContentModal from "../ContentModal/ContentModal";
import './ContentView.css';

const ContentView = ({
    id, poster, title, date, media_type, rating
}) => {


    return (
        <ContentModal media_type={media_type} id={id} >
            <Badge badgeContent={rating} color={rating > 6 ? "primary" : "secondary"} />
            <img className="poster" src={poster ? `${img_300}/${poster}` : unavailable} alt={title} />
            <b className="title">{title}</b>
            <span className="subTitle">
                {media_type === "tv" ? "TV Series" : "Movie"}
                <span className="subTitle">{date}</span>
            </span>
        </ContentModal>
    )
}

export default ContentView;