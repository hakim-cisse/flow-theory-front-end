import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactDialog } from "@/components/ContactDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { createBlogPath } from "@/lib/slug";

const API_BASE_URL = "https://taetntekartazcxgrawh.supabase.co/functions/v1/get-posts";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  published_at: string;
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
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const Blog = () => {
  const [contactOpen, setContactOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}?limit=50&offset=0`);
      if (!response.ok) {
        throw new Error("Failed to fetch blog posts");
      }
      return response.json() as Promise<BlogListResponse>;
    },
  });

  const blogs = data?.posts || [];

  return (
    <div className="min-h-screen bg-background">
      <Header onContactClick={() => setContactOpen(true)} />
      <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />

      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Blog
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl">
            Insights, strategies, and case studies from the Flow Theory AI team.
          </p>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-muted rounded-t-lg" />
                  <CardHeader>
                    <div className="h-6 bg-muted rounded w-3/4" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded w-full" />
                      <div className="h-4 bg-muted rounded w-2/3" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">
                Failed to load blog posts. Please try again later.
              </p>
            </div>
          ) : blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <Link key={blog.id} to={createBlogPath(blog.id, blog.title)}>
                  <Card className="group h-full hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden flex flex-col">
                    {blog.cover_image_url && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={blog.cover_image_url}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {blog.title}
                      </CardTitle>
                      <div className="flex items-center gap-3 mt-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={blog.author?.avatar_url || undefined}
                            alt={blog.author?.display_name || "Author"}
                          />
                          <AvatarFallback>
                            {getAuthorInitials(blog.author?.display_name || null)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {blog.author?.display_name || "Anonymous"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(blog.published_at), "MMM d, yyyy")}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4 flex-1">
                      {blog.excerpt && (
                        <p className="text-muted-foreground line-clamp-3">
                          {blog.excerpt}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">
                No blog posts yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer onContactClick={() => setContactOpen(true)} />
    </div>
  );
};

export default Blog;
