import { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import axios from 'axios';
import { img_500, unavailable, unavailableLandscape } from "../../config/config";
import YouTubeIcon from '@mui/icons-material/YouTube';
import './ContentModal.css';
import Carousel from '../Carousel/Carousel';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "90%",
    height: "90%",
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: 10,
    boxShadow: 24,
    p: 4,
};

export default function ContentModal ({ children, media_type, id }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    const fetchData = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);

        setContent(data);
    }

    const fetchVideo = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);

        setVideo(data.results[0]?.key);
    }

    useEffect(() => {
        fetchData();
        fetchVideo();
        // eslint-disable-next-line
    }, [])

  return (
    <div>
        <div 
            className="media"
            style={{ cursor: "pointer" }}
            onClick={handleOpen}
        >
            {children}
        </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
        {content && (
            <Box sx={style}>
                <div className='ContentModal'>
                    <img 
                        className='Content_portrait'
                        alt={content.name || content.title}
                        src={content.poster_path ? `${img_500}/${content.poster_path}` : unavailable}
                    />
                    <img 
                        className='Content_landscape'
                        alt={content.name || content.title}
                        src={content.backdrop_path ? `${img_500}/${content.backdrop_path}` : unavailableLandscape}
                    />
                    <div className='Content_about'>
                        <span className='Content_title'>
                            {content.name || content.title} (
                                {(
                                    content.first_air_date || content.release_date || "-----"
                                ).substring(0, 4)}
                            )
                        </span>
                        {content.tagline && (
                            <i className='tagline'>{content.tagline}</i>
                        )}
                        <span className='Content_description'>{content.overview}</span>
                        <div>
                            <Carousel media_type={media_type} id={id} />
                        </div>
                        <Button 
                            variant='contained'
                            startIcon={<YouTubeIcon />}
                            color='secondary'
                            target="_blank"
                            href={`https://www.youtube.com/watch?v=${video}`}
                        >
                            Learn More
                        </Button>
                    </div>
                </div>
            </Box>
        )}
        </Fade>
      </Modal>
    </div>
  );
}