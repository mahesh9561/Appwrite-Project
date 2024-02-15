import React, { useState, useEffect } from 'react'
import { Containers, PostForm } from '../components'
import { useNavigate, useParams } from 'react-router-dom';
import appwriteService from '../appwrite/config'


function EditPost() {
    const [post, setPosts] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug)
                .then((post) => {
                    if (post) {
                        setPosts(post)
                    }
                })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
    return post ? (
        <div className='py-8'>
            <Containers>
                <PostForm post={post} />
            </Containers>
        </div>
    ) : null
}

export default EditPost