import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import TwitCard from './TwitCard/TwitCard';
import ImageIcon from '@mui/icons-material/Image';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createTweet, getAllTweets } from '../../../Store/Tweet/Action';
import { uploadToCloudinary } from '../../../Utils/UploadToCloudinary';
import BackdropComponent from '../../Backdrop/Backdrop';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import EmojiPicker from 'emoji-picker-react';
// import ImageIcon from '@mui/icons-material/Image';

const validationSchema = Yup.object().shape({
  content: Yup.string().required('Post content is required'),
});

const MealSection = () => {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selsectedVideo, setSelectedVideo] = useState('');
  const dispatch = useDispatch();
  const { twit, auth, theme } = useSelector((store) => store);
  const jwt = localStorage.getItem('jwt');

  const [openEmoji, setOpenEmoji] = useState(false);
  const handleOpenEmoji = () => setOpenEmoji(!openEmoji);
  const handleCloseEmoji = () => setOpenEmoji(false);

  const handleSubmit = (values, actions) => {
    dispatch(createTweet(values));
    actions.resetForm();
    setSelectedImage('');
    setSelectedVideo('');
    handleCloseEmoji();
  };

  const formik = useFormik({
    initialValues: {
      content: '',
      image: '',
      video: '',
      isMeal: 'meal',
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

  const handleSelectVideo = async (event) => {
    const file = event.target.files[0];

    // 1. Check video duration before uploading
    const videoDuration = await getVideoDuration(file);

    if (videoDuration > 30) {
      alert('Video exceeds 30 seconds limit.');
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

  useEffect(() => {
    dispatch(getAllTweets());
  }, []);

  // console.log(twit);

  const handleEmojiClick = (value) => {
    const { emoji } = value;
    formik.setFieldValue('content', formik.values.content + emoji);
  };

  const [mealFoods, setMealFoods] = useState([]);

  useEffect(() => {
    // Filter foods where meal is true
    const filteredFoods = twit.twits.filter((food) => food.isMeal === 'meal');
    // Update mealFoods state with filtered foods
    setMealFoods(filteredFoods);
  }, [twit.twits]);

  console.log(mealFoods);

  return (
    <div className="space-y-5">
      <section>
        <h1 className="py-5 text-xl font-bold opacity-90">Meal Plans</h1>
      </section>
      <section
        className={`pb-10 ${
          theme.currentTheme === 'dark'
            ? ' bg-[#151515] p-10 rounded-md mb-10'
            : ''
        }`}
      >
        <div className="flex space-x-5 ">
          <Avatar alt="Avatar" src={auth.user?.image} />
          <div className="w-full">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <input
                  type="text"
                  name="content"
                  placeholder="Add New Meal Plan"
                  className={`border-none outline-none text-xl bg-transparent `}
                  {...formik.getFieldProps('content')}
                  style={{ minWidth: '400px' }}
                />
                {formik.errors.content && formik.touched.content && (
                  <div className="text-red-500">{formik.errors.content}</div>
                )}
              </div>

              <Box sx={{ display: 'none' }}>
                {/* <Checkbox {...formik.getFieldProps('meal')} defaultChecked /> */}
                <input
                  type="text"
                  // name="meal"
                  placeholder="Add New Meal Plan"
                  className={`border-none outline-none text-xl bg-transparent `}
                  {...formik.getFieldProps('isMeal')}
                  style={{ minWidth: '400px' }}
                  value="meal"
                />
              </Box>

              {!uploadingImage && (
                <div>
                  {selectedImage && (
                    <img
                      style={{ width: '400px' }}
                      src={selectedImage}
                      alt=""
                    />
                  )}

                  {selsectedVideo && (
                    <video autoPlay controls src={twit.video} />
                  )}
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
              <div className="flex justify-end items-center mt-5">
                <div>
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
                    Add Meal Plan
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* twit section */}
      <section
        className={`${theme.currentTheme === 'dark' ? 'pt-14' : ''} space-y-5`}
      >
        {mealFoods?.map((item) => (
          <TwitCard twit={item} />
        ))}
      </section>

      <section>
        <BackdropComponent open={uploadingImage} />
      </section>
    </div>
  );
};

export default MealSection;
