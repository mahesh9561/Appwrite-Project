import React from 'react'
import { Logo, Containers, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()
    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: 'Login',
            slug: '/login',
            active: !authStatus
        },
        {
            name: 'Signup',
            slug: '/signup',
            active: !authStatus
        },
        {
            name: 'All Post',
            slug: '/all-post',
            active: authStatus
        }
    ]
    return (
        <div>
            <header className=' py-3 shadow bg-gray-500'>
                <Containers>
                    <nav className=' flex'>
                        <div className=' mr-4 '>
                            <Link to='/'>
                                <Logo />
                            </Link>
                        </div>

                        <ul className=' flex ml-auto'>
                            {navItems.map((items) =>
                                items.active ? (
                                    <li key={items.name}>
                                        <button
                                            onClick={() => navigate(items.slug)}
                                            className=' inline-block px-6 py-2 duration-200 hover: bg-blue-100 rounded-full'>
                                            {items.name}
                                        </button>
                                    </li>
                                ) : null
                            )}

                            {authStatus && (
                                <li>
                                    <LogoutBtn />
                                </li>
                            )}
                        </ul>

                    </nav>
                </Containers>
            </header>
        </div>
    )
}

export default Header