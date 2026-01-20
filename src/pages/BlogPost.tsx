import { useState, useMemo } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactDialog } from "@/components/ContactDialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ArrowLeft, Twitter, Linkedin, Facebook } from "lucide-react";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link_ from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import { extractIdFromSlug } from "@/lib/slug";

// Author images mapping
import hakimImage from "@/assets/hakim.jpg";
import yassineImage from "@/assets/yassine.png";
import yunusImage from "@/assets/yunus.jpg";

const authorImages: Record<string, string> = {
  "Hakim Cisse": hakimImage,
  "Yassine Diallo": yassineImage,
  "Yunus Kounkourou": yunusImage,
};

const API_BASE_URL = "https://taetntekartazcxgrawh.supabase.co/functions/v1/get-posts";

interface BlogPostData {
  id: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  published_at: string;
  content: object;
  author: {
    display_name: string | null;
    avatar_url: string | null;
  } | null;
}

const getAuthorInitials = (name: string | null) => {
  if (!name) return "A";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const getAuthorImage = (author: BlogPostData["author"]) => {
  if (!author?.display_name) return undefined;
  // First check our local mapping
  if (authorImages[author.display_name]) {
    return authorImages[author.display_name];
  }
  // Fall back to API avatar URL
  return author.avatar_url || undefined;
};

interface BlogListItem {
  id: string;
  title: string;
}

interface BlogListResponse {
  posts: BlogListItem[];
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const [contactOpen, setContactOpen] = useState(false);

  // Extract the ID from the slug format
  const extractedId = slug ? extractIdFromSlug(slug) : null;
  
  // Check if it's a valid UUID (new format) or just a short ID (old format)
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const isFullUuid = extractedId ? uuidRegex.test(extractedId) : false;

  // For old URLs with short IDs, fetch posts list to find matching post
  const { data: postsData } = useQuery({
    queryKey: ["blog-list-lookup"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}?limit=100&offset=0`);
      if (!response.ok) throw new Error("Failed to fetch posts");
      return response.json() as Promise<BlogListResponse>;
    },
    enabled: !isFullUuid && !!extractedId,
  });

  // Find matching post ID from short ID
  const postId = useMemo(() => {
    if (isFullUuid) return extractedId;
    if (!postsData?.posts || !extractedId) return null;
    
    const matchingPost = postsData.posts.find(post => 
      post.id.startsWith(extractedId)
    );
    return matchingPost?.id || null;
  }, [isFullUuid, extractedId, postsData]);

  const shareUrl = typeof window !== "undefined" 
    ? `${window.location.origin}${location.pathname}` 
    : "";

  const handleShare = (platform: "twitter" | "linkedin" | "facebook") => {
    const title = blog?.title || "";
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(title);

    const urls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    };

    window.open(urls[platform], "_blank", "noopener,noreferrer,width=600,height=400");
  };

  const { data: blog, isLoading, error } = useQuery({
    queryKey: ["blog", postId],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}?id=${postId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch blog post");
      }
      return response.json() as Promise<BlogPostData>;
    },
    enabled: !!postId,
  });

  const htmlContent = useMemo(() => {
    if (!blog?.content) return "";
    try {
      return generateHTML(blog.content as Parameters<typeof generateHTML>[0], [
        StarterKit,
        Image,
        Link_.configure({ openOnClick: false }),
        TextAlign.configure({ types: ["heading", "paragraph"] }),
        Underline,
        TextStyle,
      ]);
    } catch (e) {
      console.error("Failed to generate HTML from TipTap content:", e);
      return "";
    }
  }, [blog?.content]);

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

          {blog.cover_image_url && (
            <div className="aspect-video rounded-lg overflow-hidden mb-8">
              <img
                src={blog.cover_image_url}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={getAuthorImage(blog.author)}
                  alt={blog.author?.display_name || "Author"}
                />
                <AvatarFallback>
                  {getAuthorInitials(blog.author?.display_name || null)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-foreground">
                  {blog.author?.display_name || "Anonymous"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(blog.published_at), "MMMM d, yyyy")}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleShare("twitter")}
                className="h-9 w-9"
                aria-label="Share on Twitter"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleShare("linkedin")}
                className="h-9 w-9"
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleShare("facebook")}
                className="h-9 w-9"
                aria-label="Share on Facebook"
              >
                <Facebook className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div
            className="blog-content prose prose-lg dark:prose-invert max-w-none 
              prose-headings:text-foreground prose-headings:font-bold prose-headings:leading-tight
              prose-h1:text-3xl prose-h1:mt-10 prose-h1:mb-4
              prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-3
              prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-2
              prose-p:text-foreground prose-p:leading-relaxed prose-p:mb-4
              prose-strong:text-foreground prose-strong:font-semibold
              prose-a:text-primary prose-a:underline prose-a:underline-offset-2 hover:prose-a:text-primary/80
              prose-code:text-foreground prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-blockquote:text-muted-foreground prose-blockquote:border-l-primary prose-blockquote:italic
              prose-li:text-foreground prose-li:leading-relaxed
              prose-ul:my-4 prose-ol:my-4
              prose-img:rounded-lg prose-img:shadow-md prose-img:my-6
              [&>p:first-of-type]:first-letter:text-5xl [&>p:first-of-type]:first-letter:font-bold 
              [&>p:first-of-type]:first-letter:text-primary [&>p:first-of-type]:first-letter:float-left 
              [&>p:first-of-type]:first-letter:mr-3 [&>p:first-of-type]:first-letter:leading-none
              [&>p:not(:first-of-type)]:indent-6"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </article>
      </main>

      <Footer onContactClick={() => setContactOpen(true)} />
    </div>
  );
};

export default BlogPost;
