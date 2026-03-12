"use client";

import React, {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolver/zod";
import { ImageIcon, Upload} from "lucide-react";
import { UploadSchema } from "@/lib/zod";
import { BookUploadFormValues } from "@/types";
import { ACCEPTED_IMAGE_TYPES, ACCEPTED_PDF_TYPES, DEFAULT_VOICE } from "@/lib/constants";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import FileUploader from "./FileUploader";
import LoadingOverlay from "./LoadingOverlay";
import VoiceSelector from "./VoiceSelector";
import { Input } from "./ui/input";
import { Button } from "./ui/button";


const UploadForm = () => {
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true)
    },[])

    const form = useForm<BookUploadFormValues>({
        resolver: zodResolver(UploadSchema,
            defaultValues: {
                title: "",
                author: "",
                voice: DEFAULT_VOICE,
            }
        )
    })

    const onSubmit = async (values: BookUploadFormValues) => {
        setIsSubmiting(true);
        console.log(values);
        // simulate submission
        await new Promise((resolve)=> setTimeout(resolve, 3000));
        setIsSubmiting(false);
    }

    if(!isMounted) return null;


  return (
    <>
    {isSubmiting && <LoadingOverlay/>}
    <div className="new-book-wrapper">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/*1. PDF File Upload */}
                <FileUploader
                control={form.control}
                name="bookFile"
                label="Book PDF File"
                acceptTypes={ACCEPTED_PDF_TYPES}
                icon={Upload}
                placeholder="Click to upload PDF"
                hint="PDF file (max 50MB)"
                disabled={isSubmiting}
                />

                {/* 2. Cover Image Upload */}
                <FileUploader
                control={form.control}
                name="coverImage"
                label="Cover Image (Optional)"
                acceptTypes={ACCEPTED_IMAGE_TYPES}
                icon={ImageIcon}
                placeholder="Click to upload cover image"
                hint="Leave empty to auto-generate from PDF"
                disabled={isSubmiting}
                />

                {/* 3. Title Input */}
                <FormField
                control={form.control}
                name="title"
                render={({field})=>(
                    <FormItem>
                        <FormLabel className="form-lable">Title</FormLabel>
                        <FormControl>
                            <Input
                            className="form-input"
                            placeholder="ex: Rich Dad Poor Dad"
                            {...field}
                            disabled={isSubmiting}
                            />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
                />

                {/* 4. Author Input */}
                <FormField
                 control={form.control}
                name="author"
                render={({field})=>(
                    <FormItem>
                        <FormLabel className="form-lable">Author Name</FormLabel>
                        <FormControl>
                            <Input
                            className="form-input"
                            placeholder="ex: Robert Kiyosaki"
                            {...field}
                            disabled={isSubmiting}
                            />
                        </FormControl>
                         <FormMessage/>
                    </FormItem>
                 )}
                />

                {/* 5. Voice Selector */}
                <FormField
                 control={form.control}
                name="voice"
                render={({field})=>(
                    <FormItem>
                        <FormLabel className="form-lable">Choose Assistant Voice</FormLabel>
                        <FormControl>
                            <VoiceSelector
                            value={field.value}
                            onChange={field.onChange}
                            disabled={isSubmiting}
                            />
                        </FormControl>
                         <FormMessage/>
                    </FormItem>
                 )}
                />

                {/* 6. Submit Button */}
                <Button type="submit" className="form-btn" disabled={isSubmiting}>Begin Synthesis</Button>

            </form>

        </Form>
    </div>
    </>
  )
}

export default UploadForm