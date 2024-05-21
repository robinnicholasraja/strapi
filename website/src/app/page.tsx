import Link from "next/link"

const page = () => {
  return (
    <section className="p-24">
        <div className="container">
            <h1 className="mb-4">This is home page</h1>
            <Link className="px-4 py-2 bg-black text-white rounded-sm" href="/know-more">Know more</Link>
        </div>
    </section>
  )
}

export default page