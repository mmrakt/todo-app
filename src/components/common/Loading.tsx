import React from 'react'

const Loading: React.VFC = () => {
  return (
    <div className="flex justify-center">
      <div className="animate-spin h-10 w-10 border-4 rounded-full border-t-transparent"></div>
    </div>
  )
}

export default Loading
