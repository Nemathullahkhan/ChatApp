import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import LogoutButton from './LogoutButton'

const SideBar = () => {
  return (
    <div>
        <SearchInput/>
        <div className='divider p-4'></div>
        <Conversations/>
        <LogoutButton/>
    </div>
  )
}

export default SideBar