import React, { useState, useEffect } from 'react'
import appwriteService from '../appwrite/config'
import { Containers, PostCard } from '../components'

function Home() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])


    if (posts.length === 0) {
        return (
            <div className=' w-full py-8 mt-4 text-center'>
                <Containers>
                    <div className=' flex flex-wrap'>
                        <div className=' p-2 w-full'>
                            <h1 className=' text-2xl font-bold hover:text-gray-500'>
                                Login to Read Post -
                            </h1>
                        </div>
                    </div>
                </Containers>
            </div>
        )
    }
    return (
        <div className=' flex flex-wrap'>
            {posts.map((post) => {
                <div className=' p-2 w-1/4' key={post.$id}>
                    {/* <PostCard post={post} /> */}
                    <PostCard {...post} />
                </div>
            })}
        </div>
    )
}

export default Home