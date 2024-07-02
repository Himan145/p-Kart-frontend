import React from 'react';
import { Link } from 'react-router-dom';

export const Footer=()=>{
    return(
        <div className='footer fixed-bottom'>
            <p className='text-center mt-2'>
            <Link to='/about'>About</Link>|
            <Link to='/contact'>Contact</Link>|
            <Link to='/policy'>Policy</Link>
            </p>
        </div>
    )
}