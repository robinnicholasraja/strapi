"use client";
import { BASE_URL } from "@/constants";
import { useState } from "react";
import { useFormStatus } from "react-dom";

// https://www.restack.io/docs/strapi-knowledge-strapi-blog-comments-guide
const addComment = async (articleId:any,name:any,email:any,comment:any) => {
    try {
        await fetch(`${BASE_URL}/api/comments/api::article.article:${articleId}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "author": {
                    "id": "1",
                    "name": name,
                    "email": email
                },
                "content": comment
            })
        })
    }
    catch (e) {
        console.error("Failed to post");
        
    }
}

const CommentBox = ({articleId}:{articleId:number}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const {pending} = useFormStatus();

  const submitCommentHandler = (e:any) => {
    e.preventDefault();
    addComment(articleId, name,email,comment);
    setName("");
    setEmail("");
    setComment("");
  };

  return (
    <form className="py-5" onSubmit={submitCommentHandler}>
        <div className="flex gap-5 mb-3">
        <div>
            <label htmlFor="name">Name</label><br />
            <input type="text" className="border p-3 rounded" placeholder="Enter your name" value={name}
                onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
            <label htmlFor="name">Email</label><br />
            <input type="email" className="border p-3 rounded" placeholder="Enter your email" value={email}
                onChange={(e) => setEmail(e.target.value)} />
        </div>
        </div>
        <div className="mb-3">
            <label htmlFor="name">Comment</label><br />
            <textarea
                id="comment"
                name="comment"
                rows={3}
                cols={30}
                className="border p-3 rounded"
                placeholder="Leave a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
        </div>
      
      <button disabled={pending} className="px-4 py-2 bg-black text-white rounded-sm" type="submit">
        Post
      </button>
    </form>
  );
};

export default CommentBox;
