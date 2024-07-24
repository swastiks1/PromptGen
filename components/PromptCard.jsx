"use client"

import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';


const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {

  const { data: session } = useSession();
  const router = useRouter();
  const pathName = usePathname()

  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(post.prompt)
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  }

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
          {/* containing the image of the author */}
          <Image
            src={post.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />

          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {post.creator.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>{post.creator.email}</p>

          </div>
        </div>

        {/* Copy button */}
        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={copied === post.prompt
              ? '/assets/icons/tick.svg'
              : '/assets/icons/copy.svg'
            }
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
      <p className='font-inter text-sm blue_gradient cursor-pointer'
        // click the handletags if they exists
        onClick={() => handleTagClick && handleTagClick(post.tag)}>
        {post.tag}
      </p>

      {/* if the currently logged in user is the creator of the post and they are on the profile page */}
      {session?.user.id === post.creator._id &&
        pathName === '/profile' && (
          <div className='mt-5 flex-between gap-6 border-t border-gray-200 pt-3'>
            {/* <p className='font-inter text-sm green_gradient cursor-pointer' 
              onClick={handleEdit}>
                Edit
              </p>   */}
            <a href="#_" class="relative inline-flex items-center justify-center p-2 px-4 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-emerald-500  rounded-full shadow-md group"
             onClick ={handleEdit}>
              <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-emerald-500 group-hover:translate-x-0 ease">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </span>
              <span class="absolute flex items-center justify-center w-full h-full green_gradient transition-all duration-300 transform group-hover:translate-x-full font-semibold ease cursor-pointer">Edit</span>
              <span class="relative invisible ">Edit</span>
              
            </a>

            {/* <p className='font-inter text-sm orange_gradient cursor-pointer'
              onClick={handleDelete}>
              Delete
            </p> */}
            <a href="#_" class="relative inline-flex items-center justify-center p-2 px-4 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-orange-400  rounded-full shadow-md group"
             onClick ={handleDelete}>
              <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-orange-400 group-hover:translate-x-0 ease">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </span>
              <span class="absolute flex items-center justify-center w-full h-full  transition-all duration-300 transform group-hover:translate-x-full font-semibold ease orange_gradient cursor-pointer">Delete</span>
              <span class="relative invisible ">Delete</span>
              
            </a>

          </div>
        )}
    </div>
  )
}

export default PromptCard
