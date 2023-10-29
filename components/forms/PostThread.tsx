"use client"
import {useForm} from "react-hook-form";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {Textarea} from "@/components/ui/textarea";
import { usePathname, useRouter } from "next/navigation";
import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";
import { useOrganization } from "@clerk/nextjs";
import { Button } from "@nextui-org/react";
import { useState } from "react";

interface Props {
 user: {
   id: string;
   objectId: string;
   username: string;
   name: string;
   bio: string;
   image: string;
 };
 btnTitle: string;
}



function PostThread({userId}:{userId:string}){
    const router = useRouter();
    const pathname = usePathname();
    const form = useForm({
        resolver: zodResolver(ThreadValidation),
        defaultValues: {
            thread:'',
            accountId:userId
        }
    })
    const [isLoading, setIsLoading] = useState(false)
    const { organization } = useOrganization()

    const  onSubmit = async ( values : z.infer<typeof ThreadValidation> ) => {
        setIsLoading(true)
         await createThread({
            text : values.thread,
            author: userId,
            communityId: organization? organization.id : null,
            path : pathname
         })
         router.push('/')
         setIsLoading(false)
    }

    return(
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="mt-10 flex flex-col justify-start gap-10"
                >
                    <FormField
                        control={form.control}
                        name="thread"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-3 w-full">
                            <FormLabel className='text-base-semibold text-light-2'>
                                Content
                            </FormLabel>
                            <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                                <Textarea
                                    rows={15}
                                    className="account-form_input no-focus"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <Button className="bg-primary-500 hover:bg-primary-300" isLoading={isLoading} type="submit">
                       {!isLoading?'Post Thread':'Posting...'}
                    </Button>
                </form>
            </Form>
        </>
    )
}

export default PostThread;