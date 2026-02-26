import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const CreatePosts = () => {
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();

        const formData = new FormData(e.target);
        try {
            
            const res = await axios.post('http://localhost:3000/create-post', formData, { });
            toast.success('Post created successfully!');
            navigate('/posts');
            e.target.reset();
        } catch (error) {
            console.error("Error creating post:", error);
            toast.error(error.response?.data?.error || 'Failed to create post');
        }
    }


  return (
   <section className='mainSection'>
    <h1>CreatePosts</h1>

    <form onSubmit={handleSubmit} >

        <input type="file" name='image' accept='image/*' />
        <input type="text" name='caption' placeholder='Caption' />
        <button type='submit'>Create Post</button>
    </form>
   </section>
  )
}


export default CreatePosts