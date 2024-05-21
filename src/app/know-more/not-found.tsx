import Link from 'next/link';
import React from 'react'

const NotFound = () => {
  return (
    <section className='p-24'>
        <div className="container">
            <h1>Error 404.</h1>
            <p className='mb-4'>Oops! We couldn&apos;t find the page you were looking for.</p>
              <Link className="px-4 py-2 bg-black text-white rounded-sm" href="/know-more">Know more</Link>
        </div>
    </section>
  )
}

export default NotFound;