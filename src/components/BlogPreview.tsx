import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { createBlogPath } from "@/lib/slug";
import { calculateReadingTime, formatReadingTime } from "@/lib/readingTime";

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
  limit: number;
  offset: number;
}

const getAuthorInitials = (name: string | null) => {
  if (!name) return "A";
  return name.split(" ").map((n) => n[0]).join("").toUpperCase();
};

const getAuthorImage = (author: BlogPost["author"]): string | undefined => {
  if (!author?.display_name) return undefined;
  return authorImages[author.display_name] || author.avatar_url || undefined;
};

export const BlogPreview = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["blogs-preview"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}?limit=3&offset=0`);
      if (!response.ok) throw new Error("Failed to fetch blog posts");
      return response.json() as Promise<BlogListResponse>;
    },
  });

  const posts = data?.posts || [];

  if (!isLoading && posts.length === 0) return null;

  return (
    <section className="relative py-20 sm:py-32 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[120px]" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12 sm:mb-16">
            <span className="text-mono text-primary/70 block mb-4">// INSIGHTS</span>
            <h2 className="text-heading max-w-3xl">
              Latest from<br />
              <span className="text-gradient">our blog.</span>
            </h2>
            <div className="accent-bar mt-6" />
          </div>

          {/* Posts grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="aspect-video bg-muted rounded-t-lg" />
                  <CardHeader className="p-4 sm:p-6">
                    <div className="h-5 bg-muted rounded w-3/4" />
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded w-full" />
                      <div className="h-4 bg-muted rounded w-2/3" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {posts.map((post) => (
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
                    <CardHeader className="p-4 sm:p-6 pb-2">
                      <CardTitle className="text-lg sm:text-xl group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 sm:gap-3 mt-2">
                        <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                          <AvatarImage
                            src={getAuthorImage(post.author)}
                            alt={post.author?.display_name || "Author"}
                          />
                          <AvatarFallback className="text-xs">
                            {getAuthorInitials(post.author?.display_name || null)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-xs sm:text-sm font-medium text-foreground">
                            {post.author?.display_name || "Anonymous"}
                          </p>
                          <p className="text-[10px] sm:text-xs text-muted-foreground flex items-center gap-1 sm:gap-2 flex-wrap">
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
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 pt-2 sm:pt-4 flex-1">
                      {post.excerpt && (
                        <p className="text-sm sm:text-base text-muted-foreground line-clamp-2 sm:line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {/* View all link */}
          <div className="mt-10 sm:mt-12 text-center">
            <Button variant="outline" size="lg" className="group" asChild>
              <Link to="/blog">
                View all posts
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};
