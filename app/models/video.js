import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
});

const Video = mongoose.models.Video || mongoose.model('Video', videoSchema);

export default Video;
