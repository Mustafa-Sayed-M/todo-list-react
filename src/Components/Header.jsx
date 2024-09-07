import { SignUpButton, UserButton, useUser } from '@clerk/clerk-react';
import React from 'react';

function Header() {

    const { user } = useUser();

    return (
        <div className='header flex items-center justify-between sticky top-0'>
            {/* Logo */}
            <div className='logo font-medium'>
                <i className="fa-solid fa-circle-check me-2"></i>
                <span>TODO LIST</span>
            </div>
            {/* User Auth */}
            {
                user ? (
                    <UserButton />
                ) : (
                    <SignUpButton
                        mode="modal"
                        signInFallbackRedirectUrl={'/todo-list-react/'}
                    />
                )
            }
        </div>
    )
}

export default Header;