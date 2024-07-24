"use client"
import {useState , useEffect} from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {/* it will reterive the data we get from the posts response */}
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const[posts,setPosts] =useState([]);
  
  // Search states
  const [searchText, setSearchText] = useState('');

  const handleSearchChange =(e)=>{

  }
  // From our feed we will have to make a get request to fetch the data, can be implemented by useEffect

  useEffect(()=>{
      const fetchPosts = async() =>{
          const response = await fetch('/api/prompt');
          const data = await response.json();

          setPosts(data);
      }
      fetchPosts();
  },[]);

  return (
    <section className='feed'>
      {/* Search box  */}
      <form className='relative w-full flex-center'>
          <input
              type='text'
              placeholder='Search for a tag or a username'
              value={searchText}
              onChange={handleSearchChange}
              required
              className='search_input peer'
          />
      </form>

      {/* Prompt card section */}
      <PromptCardList
        data={posts}
        handleTagClick={() => {}}
      />

    </section>
  )
}

export default Feed
