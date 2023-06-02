import React from 'react'
import { commonInputClass } from '../utils/CommonTheme'

const LiveSearch = () => {
  return (
    <div className='relative'>
          <input type="text"
              className={commonInputClass + ' border-2 rounded p-1 text-lg'}
          placeholder='Search profile'
          />
          <div className='absolute right-0 left-0 top-10 bg-white dark:bg-secondary shadow-md p-2 max-h-64 overflow-auto space-y-2 mt-1'>
          <p>Hello </p>
          <p>Hello </p>
          <p>Hello </p>
          <p>Hello </p>
          <p>Hello </p>
          <p>Hello </p>
          <p>Hello </p>
          <p>Hello </p>
          <p>Hello </p>
          <p>Hello </p>
          <p>Hello </p>
          <p>Hello </p>
          </div>
    </div>
  )
}

export default LiveSearch
