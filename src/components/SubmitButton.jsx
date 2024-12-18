'use client'
import { useFormStatus } from 'react-dom'

function SubmitButton({ children, animate = 'animate-pulse' }) {

    const { pending } = useFormStatus()
    return (
        <button className={`${pending ? animate : ''}`}>
            {children}
        </button>
    );
}

export default SubmitButton;