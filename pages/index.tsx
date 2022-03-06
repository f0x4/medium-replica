import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import { sanityClient, urlFor } from '../sanity'
import { Post } from '../typings'

interface Props {
  posts: [Post]
}

const Home = ({ posts }: Props) => {
  return (
    <div className="">
      <Head>
        <title>Medium – Where good ideas find you.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <section className="border-y border-black bg-blue-200">
        <div className="mx-auto flex min-h-[400px] max-w-7xl items-center justify-between bg-no-repeat py-10 lg:bg-[url('/banner.png')] lg:bg-[length:385px_341px] lg:bg-[bottom_1px_right_32px] lg:py-0">
          <div className="space-y-5 px-10">
            <h1 className="max-w-xl font-serif text-6xl">
              <span className="underline decoration-black decoration-4">
                Medium
              </span>{' '}
              is a place to write, read, and connect.
            </h1>
            <h2>
              It's easy and free to post your thinking on any topic and connect
              with millions of readers.
            </h2>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-3 p-2 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3">
        {posts.map((post: Post) => (
          <Link href={`/post/${post.slug.current}`} key={post._id}>
            <div className="cursor-pointer overflow-hidden rounded-lg border">
              <img
                className="h-60 w-full object-cover transition-transform duration-200 ease-in-out hover:scale-105"
                src={urlFor(post.mainImage).url()!}
                alt=""
              />
              <div className="flex justify-between bg-white p-5">
                <div>
                  <p className="text-lg font-bold">{post.title}</p>
                  <p className="text-xs">
                    {post.description} by {post.author.name}
                  </p>
                </div>
                <img
                  className="h-12 w-12 rounded-full"
                  src={urlFor(post.author.image).url()!}
                  alt=""
                />
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    author -> {
    name,
    image
  },
  description,
  mainImage,
  slug
  }`

  const posts = await sanityClient.fetch(query)

  return {
    props: {
      posts,
    },
  }
}
