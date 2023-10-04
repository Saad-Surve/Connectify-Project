import Link from 'next/link';
import Image from "next/image";
import React from 'react'

interface Props{
id:string;
currentUserId:string;
parentId: string | null;
content: string;
author:{
    name:string;
    image:string;
    id:string;
}
community:{
    id:string;
    name:string;
    image:string;
} | null;
createdAt: string;
comments: {
    author: {
        image: string;
    }
}[]
isComment?:boolean;
}

const ThreadCard = ({
id,
currentUserId,
parentId,
content,
author,
community,
createdAt,
comments
}: Props) => {
  return (
    <article className='flex flex-col w-full rounded-xl bg-dark-2 p-7'>
        <div className='flex items-start justify-between'>
            <div className='flex flex-1 flex-row w-full gap-4'>
                <div className='flex flex-col items-center'>
                    <Link href={`/profile/${author.id}`} className='relative w-11 h-11'>
                        {/* <img src={author.image}/> */}
                        <Image 
                            src={author?.image}
                            alt='Profile image'
                            fill
                            className='cursor-pointer rounded-full'
                        />
                    </Link>

                    <div className='thread-card_bar'/>
                </div>

                <div className='w-full flex'>
                    <Link href={`/profile/${author.id}`} className='w-fit'>
                        <h4 className='cursor-pointer text-base-semibold text-light-1'>{author.name}</h4>
                    </Link>

                    <p className='mt-2 text-small-regular text-light-2'>{content}</p>
                </div>

            </div>
        </div>
    </article>
  )
}

export default ThreadCard