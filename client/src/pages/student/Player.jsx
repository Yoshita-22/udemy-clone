import React from 'react'
import YouTube from 'react-youtube'
const Player = () => {
  const opts = {
    width:"400",
    height:"400",
    playerVars:{
      autoplay:0,
      controls: 1,
      rel: 0,
      modestbranding: 1,
    }
  }
  return (
   <>
     <div className='p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36'>
      {/* left column */}
      <div className = "text-gray-600">
        <h2 className='text-rose-500 stroke-lime-50 shadow-pink-400 font-semibold'>Course Structure</h2>
      </div>

      {/* right column */}
      <div>
      <YouTube videoId={videoId} opts={opts}  />
      </div>
    </div>
   
   </>
  )
}

export default Player
