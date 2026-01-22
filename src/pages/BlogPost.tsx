import { useState, useMemo } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactDialog } from "@/components/ContactDialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Twitter, Linkedin, Facebook, Clock } from "lucide-react";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link_ from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import { extractIdFromSlug } from "@/lib/slug";
import { calculateReadingTime, formatReadingTime } from "@/lib/readingTime";
import { SEO } from "@/components/SEO";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArticleSchema, BreadcrumbSchema } from "@/components/StructuredData";
import { RelatedPosts } from "@/components/RelatedPosts";

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
const SITE_URL = "https://www.flowtheoryai.com";

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
  if (authorImages[author.display_name]) {
    return authorImages[author.display_name];
  }
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

  const extractedId = slug ? extractIdFromSlug(slug) : null;
  
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const isFullUuid = extractedId ? uuidRegex.test(extractedId) : false;

  const { data: postsData } = useQuery({
    queryKey: ["blog-list-lookup"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}?limit=100&offset=0`);
      if (!response.ok) throw new Error("Failed to fetch posts");
      return response.json() as Promise<BlogListResponse>;
    },
    enabled: !isFullUuid && !!extractedId,
  });

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

  // Generate breadcrumb data
  const breadcrumbItems = blog 
    ? [{ label: "Blog", href: "/blog" }, { label: blog.title }]
    : [{ label: "Blog", href: "/blog" }];
  
  const breadcrumbSchemaItems = blog
    ? [
        { name: "Home", url: SITE_URL },
        { name: "Blog", url: `${SITE_URL}/blog` },
        { name: blog.title, url: `${SITE_URL}${location.pathname}` },
      ]
    : [
        { name: "Home", url: SITE_URL },
        { name: "Blog", url: `${SITE_URL}/blog` },
      ];

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
        <SEO
          title="Blog Post Not Found"
          description="The blog post you're looking for doesn't exist."
          noIndex
        />
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
              Back to Blog
            </Link>
          </div>
        </main>
        <Footer onContactClick={() => setContactOpen(true)} />
      </div>
    );
  }

  const canonicalUrl = `${SITE_URL}${location.pathname}`;
  const authorName = blog.author?.display_name || "Flow Theory AI";
  const readingTime = calculateReadingTime(blog.content);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={blog.title}
        description={blog.excerpt || `Read ${blog.title} on the Flow Theory AI blog.`}
        canonicalUrl={canonicalUrl}
        ogTitle={blog.title}
        ogDescription={blog.excerpt || `Read ${blog.title} on the Flow Theory AI blog.`}
        ogImage={blog.cover_image_url || undefined}
        ogType="article"
        article={{
          publishedTime: blog.published_at,
          author: authorName,
          section: "AI & Business",
        }}
      />
      <ArticleSchema
        title={blog.title}
        description={blog.excerpt || `Read ${blog.title} on the Flow Theory AI blog.`}
        url={canonicalUrl}
        imageUrl={blog.cover_image_url || undefined}
        publishedTime={blog.published_at}
        authorName={authorName}
      />
      <BreadcrumbSchema items={breadcrumbSchemaItems} />
      
      <Header onContactClick={() => setContactOpen(true)} />
      <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />

      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <article className="container mx-auto max-w-4xl">
          <Breadcrumbs items={breadcrumbItems} />

          <header>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              {blog.title}
            </h1>

            {blog.cover_image_url && (
              <figure className="aspect-video rounded-lg overflow-hidden mb-8">
                <img
                  src={blog.cover_image_url}
                  alt={blog.title}
                  loading="eager"
                  className="w-full h-full object-cover"
                />
              </figure>
            )}

            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={getAuthorImage(blog.author)}
                    alt={authorName}
                  />
                  <AvatarFallback>
                    {getAuthorInitials(blog.author?.display_name || null)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground">{authorName}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <time dateTime={blog.published_at}>
                      {format(new Date(blog.published_at), "MMMM d, yyyy")}
                    </time>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      {formatReadingTime(readingTime)}
                    </span>
                  </p>
                </div>
              </div>
              
              <nav aria-label="Share this article" className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleShare("twitter")}
                  className="h-9 w-9"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleShare("linkedin")}
                  className="h-9 w-9"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleShare("facebook")}
                  className="h-9 w-9"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="h-4 w-4" aria-hidden="true" />
                </Button>
              </nav>
            </div>
          </header>

          <section
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          <RelatedPosts currentPostId={postId!} />
        </article>
      </main>

      <Footer onContactClick={() => setContactOpen(true)} />
    </div>
  );
};

export default BlogPost;
