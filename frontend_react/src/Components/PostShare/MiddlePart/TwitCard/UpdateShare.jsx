import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { createTweet, findTwitsById, updateMeal } from '../../../../Store/Tweet/Action';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { uploadToCloudinary } from '../../../../Utils/UploadToCloudinary';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import ImageIcon from '@mui/icons-material/Image';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import EmojiPicker from 'emoji-picker-react';
import DeleteIcon from '@mui/icons-material/Delete';
import BackdropComponent from '../../../Backdrop/Backdrop';

const validationSchema = Yup.object().shape({
  content: Yup.string().required('Post content is required'),
});

export default function UpdateMeal({ open, handleClose, twitData }) {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(twitData.image);
  const [selsectedVideo, setSelectedVideo] = useState(twitData.video);
  const dispatch = useDispatch();

  const [openEmoji, setOpenEmoji] = useState(false);
  const handleOpenEmoji = () => setOpenEmoji(!openEmoji);
  const handleCloseEmoji = () => setOpenEmoji(false);

  const { twit, theme, auth } = useSelector((store) => store);


  const removeMedia = () => {
    setSelectedImage('');
    setSelectedVideo('');
    formik.setFieldValue('image', '');
    formik.setFieldValue('video', '');
    console.log(selectedImage);
  }

  const handleSubmit = (values, actions) => {
    dispatch(updateMeal(values, twitData.id));
    actions.resetForm();
    handleCloseEmoji();
    window.location.reload();
  };

  const formik = useFormik({
    initialValues: {
      content: twitData.content,
      image: twitData.image,
      video: twitData.video,
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const handleSelectImage = async (event) => {
    setUploadingImage(true);
    const imgUrl = await uploadToCloudinary(event.target.files[0], 'image');
    formik.setFieldValue('image', imgUrl);
    setSelectedImage(imgUrl);
    setUploadingImage(false);
  };

  // const handleSelectVideo = async (event) => {
  //   setUploadingImage(true);
  //   const videoUrl = await uploadToCloudinary(event.target.files[0], 'video');
  //   formik.setFieldValue('video', videoUrl);
  //   setSelectedVideo(videoUrl);
  //   setUploadingImage(false);

  //   // console.log()
  // };

  const handleEmojiClick = (value) => {
    const { emoji } = value;
    formik.setFieldValue('content', formik.values.content + emoji);
  };

  const handleSelectVideo = async (event) => {
    const file = event.target.files[0];
  
    // 1. Check video duration before uploading
    const videoDuration = await getVideoDuration(file);
  
    if (videoDuration > 30) {
      alert("Video exceeds 30 seconds limit.");
      return; // Prevent upload
    }
  
    setUploadingImage(true);
    const videoUrl = await uploadToCloudinary(file, 'video');
    formik.setFieldValue('video', videoUrl);
    setSelectedVideo(videoUrl);
    setUploadingImage(false);
  };

  async function getVideoDuration(file) {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
  
      video.onloadedmetadata = () => {
        resolve(video.duration);
        video.src = ''; // Free resources
      };
  
      video.onerror = reject;
      video.src = URL.createObjectURL(file);
    });
  }

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Dialog
          sx={{ padding: '1rem', width: '100%' }}
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const email = formJson.email;
              console.log(email);
              handleClose();
            },
          }}
        >
          <DialogTitle className="fill-black">Update Shared Post</DialogTitle>
          <DialogContent>
            <div>
              <input
                type="text"
                name="content"
                placeholder="Add New Post"
                className={`border-none outline-none text-xl bg-transparent `}
                {...formik.getFieldProps('content')}
                style={{ width: '500px' }}
              />
              {formik.errors.content && formik.touched.content && (
                <div className="text-red-500">{formik.errors.content}</div>
              )}
            </div>

            {!uploadingImage && (
              <div className="relative">
                <IconButton
                  aria-label="delete"
                  size="medium"
                  sx={{
                    position: 'absolute',
                    top: '-20px',
                    right: '0',
                    bgcolor: '#495dcc',
                    borderRadius: '200px',
                    color: 'white',
                    '&:hover': {
                      bgcolor: '#ec2416', // change to blue on hover
                    },
                  }}
                  onClick={removeMedia}
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
                {selectedImage && (
                  <img className="w-[28rem]" src={selectedImage} alt="" />
                )}

                {selsectedVideo && <video autoPlay controls src={twit.video} />}
              </div>
            )}

            <div className="flex justify-between items-center mt-5">
              <div className="flex space-x-5 items-center">
                <label className="flex items-center space-x-2  rounded-md cursor-pointer">
                  <ImageIcon className="text-[#495dcc]" />
                  <input
                    type="file"
                    name="imageFile"
                    className="hidden"
                    onChange={handleSelectImage}
                  />
                </label>

                <label className="flex items-center space-x-2  rounded-md cursor-pointer">
                  <SlideshowIcon className="text-[#495dcc]" />
                  <input
                    type="file"
                    name="videoFile"
                    className="hidden"
                    onChange={handleSelectVideo}
                  />
                </label>

                <FmdGoodIcon className="text-[#495dcc]" />
                <div className="relative">
                  <TagFacesIcon
                    onClick={handleOpenEmoji}
                    className="text-[#495dcc] cursor-pointer"
                  />
                  {openEmoji && (
                    <div className="absolute top-10 z-50 ">
                      <EmojiPicker
                        theme={theme.currentTheme}
                        onEmojiClick={handleEmojiClick}
                        lazyLoadEmojis={true}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} sx={{ color: '#000' }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: '#1c6cb8',
                borderRadius: '20px',
                paddingY: '8px',
                paddingX: '20px',
                color: 'white',
                '&:hover': {
                  bgcolor: '#7331ec', // change to blue on hover
                },
              }}
            >
              update Plan
            </Button>
          </DialogActions>
        </Dialog>
      </form>
      <section>
        <BackdropComponent open={uploadingImage} />
      </section>
    </Box>
  );
}
