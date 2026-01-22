import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Clock } from "lucide-react";
import { createBlogPath } from "@/lib/slug";
import { calculateReadingTime, formatReadingTime } from "@/lib/readingTime";

// Import author images
import hakimImage from "@/assets/hakim.jpg";
import yassineImage from "@/assets/yassine.png";
import yunusImage from "@/assets/yunus.jpg";

const API_BASE_URL = "https://taetntekartazcxgrawh.supabase.co/functions/v1/get-posts";

const authorImages: Record<string, string> = {
  "Hakim Cisse": hakimImage,
  "Yassine Diallo": yassineImage,
  "Yunus Kounkourou": yunusImage,
};

interface BlogPost {
  id: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  published_at: string;
  content?: object;
  author: {
    display_name: string | null;
    avatar_url: string | null;
  } | null;
}

interface BlogListResponse {
  posts: BlogPost[];
  total: number;
}

interface RelatedPostsProps {
  currentPostId: string;
  maxPosts?: number;
}

const getAuthorInitials = (name: string | null) => {
  if (!name) return "A";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const getAuthorImage = (author: BlogPost["author"]): string | undefined => {
  if (!author?.display_name) return undefined;
  return authorImages[author.display_name] || author.avatar_url || undefined;
};

export const RelatedPosts = ({ currentPostId, maxPosts = 3 }: RelatedPostsProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["related-posts", currentPostId],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}?limit=20&offset=0`);
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      return response.json() as Promise<BlogListResponse>;
    },
  });

  // Filter out the current post and get random related posts
  const relatedPosts = data?.posts
    .filter((post) => post.id !== currentPostId)
    .slice(0, maxPosts) || [];

  if (isLoading) {
    return (
      <section className="mt-16 pt-12 border-t border-border">
        <h2 className="text-2xl font-bold text-foreground mb-8">Related Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-40 bg-muted rounded-t-lg" />
              <CardHeader className="pb-2">
                <div className="h-5 bg-muted rounded w-3/4" />
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-muted rounded w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-12 border-t border-border">
      <h2 className="text-2xl font-bold text-foreground mb-8">Related Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Link
            key={post.id}
            to={createBlogPath(post.id, post.title)}
            title={post.title}
          >
            <Card className="group h-full hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden flex flex-col">
              {post.cover_image_url && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.cover_image_url}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <CardHeader className="pb-2">
                <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src={getAuthorImage(post.author)}
                      alt={post.author?.display_name || "Author"}
                    />
                    <AvatarFallback className="text-xs">
                      {getAuthorInitials(post.author?.display_name || null)}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-xs text-muted-foreground flex items-center gap-2">
                    <time dateTime={post.published_at}>
                      {format(new Date(post.published_at), "MMM d, yyyy")}
                    </time>
                    {post.content && (
                      <>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" aria-hidden="true" />
                          {formatReadingTime(calculateReadingTime(post.content))}
                        </span>
                      </>
                    )}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="pt-2 flex-1">
                {post.excerpt && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedPosts;
