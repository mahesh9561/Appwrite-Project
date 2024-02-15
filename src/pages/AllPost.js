import React, { useState, useEffect } from 'react'
import appwriteService from '../appwrite/config'
import { Containers, PostCard } from '../components'

function AllPost() {
    const [posts, setPost] = useState([])
    useEffect(() => {

    }, [])
    appwriteService.getPosts([]).then((posts) => {
        if (posts) {
            setPost(posts.documents)
        }
    })
    return (
        <div>
            <Containers>
                <div className=' flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard post={post} />
                        </div>
                    ))}
                </div>
            </Containers>
        </div>
    )
}

export default AllPost