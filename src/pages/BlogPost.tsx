import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactDialog } from "@/components/ContactDialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";

import hakimImage from "@/assets/hakim.jpg";
import yassineImage from "@/assets/yassine.png";
import yunusImage from "@/assets/yunus.jpg";

const authorImages: Record<string, string> = {
  "Hakim Cisse": hakimImage,
  "Yassine Diallo": yassineImage,
  "Yunus Kounkourou": yunusImage,
};

const getAuthorInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

interface Blog {
  id: string;
  title: string;
  body: string;
  author_name: string;
  image_url: string | null;
  created_at: string;
}

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [contactOpen, setContactOpen] = useState(false);

  const { data: blog, isLoading, error } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Blog;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header onContactClick={() => setContactOpen(true)} />
        <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-8" />
            <div className="h-12 bg-muted rounded w-3/4 mb-4" />
            <div className="h-64 bg-muted rounded mb-8" />
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-2/3" />
            </div>
          </div>
        </main>
        <Footer onContactClick={() => {}} />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-background">
        <Header onContactClick={() => setContactOpen(true)} />
        <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />
        <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Blog Post Not Found
            </h1>
            <p className="text-muted-foreground mb-8">
              The blog post you're looking for doesn't exist.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </main>
        <Footer onContactClick={() => setContactOpen(true)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onContactClick={() => setContactOpen(true)} />
      <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />

      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <article className="container mx-auto max-w-4xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            {blog.title}
          </h1>

          {blog.image_url && (
            <div className="aspect-video rounded-lg overflow-hidden mb-8">
              <img
                src={blog.image_url}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex items-center gap-4 mb-8">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={authorImages[blog.author_name]}
                alt={blog.author_name}
              />
              <AvatarFallback>
                {getAuthorInitials(blog.author_name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-foreground">{blog.author_name}</p>
              <p className="text-sm text-muted-foreground">
                {format(new Date(blog.created_at), "MMMM d, yyyy")}
              </p>
            </div>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary prose-code:text-foreground prose-blockquote:text-muted-foreground prose-li:text-muted-foreground">
            <ReactMarkdown>{blog.body}</ReactMarkdown>
          </div>
        </article>
      </main>

      <Footer onContactClick={() => setContactOpen(true)} />
    </div>
  );
};

export default BlogPost;
